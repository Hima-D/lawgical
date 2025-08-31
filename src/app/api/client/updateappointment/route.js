// app/api/appointments/[appointmentId]/route.js
import { PrismaClient } from '@/generated/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// Middleware to verify JWT and get user
async function verifyAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Update appointment status or details
export async function PUT(request, { params }) {
  try {
    const user = await verifyAuth();
    const appointmentId = parseInt(params.appointmentId);
    
    const { 
      status, 
      lawyerNotes, 
      clientNotes, 
      meetingLink, 
      meetingType,
      appointmentDate,
      appointmentTime 
    } = await request.json();

    // Get the appointment with all related data
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        client: {
          select: {
            id: true,
            email: true,
            displayName: true
          }
        },
        lawyerProfile: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                displayName: true
              }
            }
          }
        },
        service: true,
        availabilitySlot: true
      }
    });

    if (!appointment) {
      return Response.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Check permissions
    const isClient = user.userId === appointment.clientId;
    const isLawyer = user.userId === appointment.lawyerProfile.userId;
    
    if (!isClient && !isLawyer) {
      return Response.json(
        { error: 'You do not have permission to update this appointment' },
        { status: 403 }
      );
    }

    // Validate status transitions
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return Response.json(
        { error: 'Invalid appointment status' },
        { status: 400 }
      );
    }

    // Status change business rules
    if (status) {
      const currentStatus = appointment.status;
      
      // Only lawyers can confirm appointments
      if (status === 'confirmed' && !isLawyer) {
        return Response.json(
          { error: 'Only lawyers can confirm appointments' },
          { status: 403 }
        );
      }

      // Only lawyers can mark as completed
      if (status === 'completed' && !isLawyer) {
        return Response.json(
          { error: 'Only lawyers can mark appointments as completed' },
          { status: 403 }
        );
      }

      // Cannot change status of completed appointments
      if (currentStatus === 'completed' && status !== 'completed') {
        return Response.json(
          { error: 'Cannot change status of completed appointments' },
          { status: 400 }
        );
      }

      // Cannot confirm cancelled appointments
      if (currentStatus === 'cancelled' && status === 'confirmed') {
        return Response.json(
          { error: 'Cannot confirm cancelled appointments' },
          { status: 400 }
        );
      }
    }

    // Validate date/time changes (only for pending appointments)
    if ((appointmentDate || appointmentTime) && appointment.status !== 'pending') {
      return Response.json(
        { error: 'Can only reschedule pending appointments' },
        { status: 400 }
      );
    }

    // Validate future date if rescheduling
    if (appointmentDate && appointmentTime) {
      const newDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
      if (newDateTime <= new Date()) {
        return Response.json(
          { error: 'New appointment time must be in the future' },
          { status: 400 }
        );
      }

      // Check for conflicts with lawyer's other appointments
      const conflict = await prisma.appointment.findFirst({
        where: {
          id: { not: appointmentId },
          lawyerProfileId: appointment.lawyerProfileId,
          appointmentDate: new Date(appointmentDate),
          appointmentTime,
          status: { in: ['pending', 'confirmed'] }
        }
      });

      if (conflict) {
        return Response.json(
          { error: 'The new time slot conflicts with another appointment' },
          { status: 409 }
        );
      }
    }

    // Prepare update data
    const updateData = {};
    
    if (status) updateData.status = status;
    if (appointmentDate) updateData.appointmentDate = new Date(appointmentDate);
    if (appointmentTime) updateData.appointmentTime = appointmentTime;
    if (meetingLink !== undefined) updateData.meetingLink = meetingLink;
    if (meetingType) updateData.meetingType = meetingType;
    
    // Only allow relevant parties to update notes
    if (isLawyer && lawyerNotes !== undefined) {
      updateData.lawyerNotes = lawyerNotes;
    }
    if (isClient && clientNotes !== undefined) {
      updateData.clientNotes = clientNotes;
    }

    // Use transaction for complex updates
    const result = await prisma.$transaction(async (tx) => {
      // Update appointment
      const updatedAppointment = await tx.appointment.update({
        where: { id: appointmentId },
        data: updateData,
        include: {
          client: {
            select: {
              id: true,
              email: true,
              displayName: true
            }
          },
          lawyerProfile: {
            include: {
              user: {
                select: {
                  displayName: true,
                  email: true
                }
              }
            }
          },
          service: true
        }
      });

      // Handle availability slot updates
      if (status === 'cancelled' && appointment.availabilitySlotId) {
        // Free up the availability slot
        await tx.availabilitySlot.update({
          where: { id: appointment.availabilitySlotId },
          data: { isBooked: false }
        });
      }

      // Create notifications based on the update
      const notifications = [];
      
      if (status && status !== appointment.status) {
        const statusMessages = {
          confirmed: {
            client: `Your appointment with ${appointment.lawyerProfile.user.displayName} has been confirmed`,
            lawyer: `You confirmed the appointment with ${appointment.client.displayName}`
          },
          completed: {
            client: `Your appointment with ${appointment.lawyerProfile.user.displayName} has been marked as completed`,
            lawyer: `You marked the appointment with ${appointment.client.displayName} as completed`
          },
          cancelled: {
            client: `Your appointment with ${appointment.lawyerProfile.user.displayName} has been cancelled`,
            lawyer: `The appointment with ${appointment.client.displayName} has been cancelled`
          }
        };

        if (statusMessages[status]) {
          notifications.push(
            {
              userId: appointment.clientId,
              title: 'Appointment Status Update',
              message: statusMessages[status].client,
              type: 'appointment'
            },
            {
              userId: appointment.lawyerProfile.userId,
              title: 'Appointment Status Update',
              message: statusMessages[status].lawyer,
              type: 'appointment'
            }
          );
        }
      }

      // Reschedule notifications
      if (appointmentDate || appointmentTime) {
        const rescheduleMessage = `Appointment rescheduled to ${appointmentDate || appointment.appointmentDate} at ${appointmentTime || appointment.appointmentTime}`;
        notifications.push(
          {
            userId: appointment.clientId,
            title: 'Appointment Rescheduled',
            message: rescheduleMessage,
            type: 'appointment'
          },
          {
            userId: appointment.lawyerProfile.userId,
            title: 'Appointment Rescheduled', 
            message: rescheduleMessage,
            type: 'appointment'
          }
        );
      }

      // Create notifications if any
      if (notifications.length > 0) {
        await tx.notification.createMany({
          data: notifications
        });
      }

      return updatedAppointment;
    });

    return Response.json({
      message: 'Appointment updated successfully',
      appointment: result
    });

  } catch (error) {
    console.error('Update appointment error:', error);
    
    if (error.message === 'Invalid token' || error.message === 'No token provided') {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Cancel/Delete appointment
export async function DELETE(request, { params }) {
  try {
    const user = await verifyAuth();
    const appointmentId = parseInt(params.appointmentId);

    // Get the appointment
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        client: {
          select: {
            displayName: true,
            email: true
          }
        },
        lawyerProfile: {
          include: {
            user: {
              select: {
                displayName: true,
                email: true
              }
            }
          }
        },
        availabilitySlot: true
      }
    });

    if (!appointment) {
      return Response.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Check permissions
    const isClient = user.userId === appointment.clientId;
    const isLawyer = user.userId === appointment.lawyerProfile.userId;
    
    if (!isClient && !isLawyer) {
      return Response.json(
        { error: 'You do not have permission to cancel this appointment' },
        { status: 403 }
      );
    }

    // Cannot cancel completed appointments
    if (appointment.status === 'completed') {
      return Response.json(
        { error: 'Cannot cancel completed appointments' },
        { status: 400 }
      );
    }

    // Use transaction to cancel appointment
    const result = await prisma.$transaction(async (tx) => {
      // Update appointment status to cancelled
      await tx.appointment.update({
        where: { id: appointmentId },
        data: { status: 'cancelled' }
      });

      // Free up availability slot if it was booked
      if (appointment.availabilitySlotId) {
        await tx.availabilitySlot.update({
          where: { id: appointment.availabilitySlotId },
          data: { isBooked: false }
        });
      }

      // Create cancellation notifications
      await tx.notification.createMany({
        data: [
          {
            userId: appointment.clientId,
            title: 'Appointment Cancelled',
            message: `Your appointment with ${appointment.lawyerProfile.user.displayName} has been cancelled`,
            type: 'appointment'
          },
          {
            userId: appointment.lawyerProfile.userId,
            title: 'Appointment Cancelled',
            message: `The appointment with ${appointment.client.displayName} has been cancelled`,
            type: 'appointment'
          }
        ]
      });

      return appointment;
    });

    return Response.json({
      message: 'Appointment cancelled successfully',
      appointmentId: appointmentId
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    
    if (error.message === 'Invalid token' || error.message === 'No token provided') {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Get specific appointment details
export async function GET(request, { params }) {
  try {
    const user = await verifyAuth();
    const appointmentId = parseInt(params.appointmentId);

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        client: {
          select: {
            id: true,
            email: true,
            displayName: true,
            phoneNumber: true,
            photoUrl: true
          }
        },
        lawyerProfile: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                displayName: true,
                phoneNumber: true,
                photoUrl: true
              }
            }
          }
        },
        service: true,
        availabilitySlot: true,
        messages: {
          include: {
            sender: {
              select: {
                displayName: true,
                photoUrl: true
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        },
        documents: {
          include: {
            uploader: {
              select: {
                displayName: true,
                email: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!appointment) {
      return Response.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Check permissions
    const isClient = user.userId === appointment.clientId;
    const isLawyer = user.userId === appointment.lawyerProfile.userId;
    
    if (!isClient && !isLawyer) {
      return Response.json(
        { error: 'You do not have permission to view this appointment' },
        { status: 403 }
      );
    }

    return Response.json({
      appointment
    });

  } catch (error) {
    console.error('Get appointment error:', error);
    
    if (error.message === 'Invalid token' || error.message === 'No token provided') {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
// app/api/appointments/route.js
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

export async function POST(request) {
  try {
    // Verify authentication
    const user = await verifyAuth();
    
    const { 
      lawyerProfileId, 
      serviceId, 
      appointmentDate, 
      appointmentTime, 
      clientNotes,
      meetingType,
      availabilitySlotId 
    } = await request.json();

    // Validation
    if (!lawyerProfileId || !serviceId || !appointmentDate || !appointmentTime) {
      return Response.json(
        { error: 'Lawyer profile ID, service ID, appointment date, and time are required' },
        { status: 400 }
      );
    }

    // Validate date format and ensure it's in the future
    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    if (isNaN(appointmentDateTime.getTime())) {
      return Response.json(
        { error: 'Invalid date or time format' },
        { status: 400 }
      );
    }

    if (appointmentDateTime <= new Date()) {
      return Response.json(
        { error: 'Appointment must be scheduled for a future date and time' },
        { status: 400 }
      );
    }

    // Validate meeting type
    const validMeetingTypes = ['in-person', 'virtual', 'phone'];
    if (meetingType && !validMeetingTypes.includes(meetingType)) {
      return Response.json(
        { error: 'Invalid meeting type' },
        { status: 400 }
      );
    }

    // Check if service exists and is active
    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) },
      include: {
        lawyerProfile: {
          include: {
            user: {
              select: {
                displayName: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!service) {
      return Response.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    if (!service.isActive) {
      return Response.json(
        { error: 'Service is no longer available' },
        { status: 400 }
      );
    }

    if (service.lawyerProfileId !== parseInt(lawyerProfileId)) {
      return Response.json(
        { error: 'Service does not belong to the specified lawyer' },
        { status: 400 }
      );
    }

    // Check for existing appointment conflicts
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        lawyerProfileId: parseInt(lawyerProfileId),
        appointmentDate: new Date(appointmentDate),
        appointmentTime: appointmentTime,
        status: {
          in: ['pending', 'confirmed']
        }
      }
    });

    if (existingAppointment) {
      return Response.json(
        { error: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    // Check if availability slot exists and is available (if provided)
    if (availabilitySlotId) {
      const availabilitySlot = await prisma.availabilitySlot.findUnique({
        where: { id: parseInt(availabilitySlotId) }
      });

      if (!availabilitySlot) {
        return Response.json(
          { error: 'Availability slot not found' },
          { status: 404 }
        );
      }

      if (availabilitySlot.isBooked) {
        return Response.json(
          { error: 'This availability slot is already booked' },
          { status: 409 }
        );
      }
    }

    // Create appointment using transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create appointment
      const appointment = await tx.appointment.create({
        data: {
          clientId: user.userId,
          lawyerProfileId: parseInt(lawyerProfileId),
          serviceId: parseInt(serviceId),
          availabilitySlotId: availabilitySlotId ? parseInt(availabilitySlotId) : null,
          appointmentDate: new Date(appointmentDate),
          appointmentTime: appointmentTime,
          clientNotes: clientNotes?.trim() || null,
          meetingType: meetingType || 'virtual',
          status: 'pending'
        },
        include: {
          client: {
            select: {
              id: true,
              email: true,
              displayName: true,
              phoneNumber: true
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

      // Mark availability slot as booked if provided
      if (availabilitySlotId) {
        await tx.availabilitySlot.update({
          where: { id: parseInt(availabilitySlotId) },
          data: { isBooked: true }
        });
      }

      // Create notifications for both client and lawyer
      await tx.notification.createMany({
        data: [
          {
            userId: user.userId,
            title: 'Appointment Booked',
            message: `Your appointment with ${service.lawyerProfile.user.displayName} has been booked for ${appointmentDate} at ${appointmentTime}`,
            type: 'appointment'
          },
          {
            userId: service.lawyerProfile.userId,
            title: 'New Appointment Request',
            message: `You have a new appointment request from ${appointment.client.displayName || appointment.client.email} for ${appointmentDate} at ${appointmentTime}`,
            type: 'appointment'
          }
        ]
      });

      return appointment;
    });

    return Response.json(
      {
        message: 'Appointment booked successfully',
        appointment: result
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Book appointment error:', error);
    
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

// Get appointments
export async function GET(request) {
  try {
    const user = await verifyAuth();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'client' or 'lawyer'
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    let whereClause = {};
    let include = {};

    if (type === 'client' || user.userType === 'client') {
      whereClause.clientId = user.userId;
      include = {
        lawyerProfile: {
          include: {
            user: {
              select: {
                displayName: true,
                email: true,
                photoUrl: true
              }
            }
          }
        },
        service: true
      };
    } else if (type === 'lawyer' || user.userType === 'lawyer') {
      // Get lawyer profile first
      const lawyerProfile = await prisma.lawyerProfile.findUnique({
        where: { userId: user.userId }
      });

      if (!lawyerProfile) {
        return Response.json(
          { error: 'Lawyer profile not found' },
          { status: 404 }
        );
      }

      whereClause.lawyerProfileId = lawyerProfile.id;
      include = {
        client: {
          select: {
            id: true,
            email: true,
            displayName: true,
            phoneNumber: true,
            photoUrl: true
          }
        },
        service: true
      };
    }

    if (status) {
      whereClause.status = status;
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include,
      orderBy: {
        appointmentDate: 'asc'
      },
      skip,
      take: limit
    });

    const totalCount = await prisma.appointment.count({
      where: whereClause
    });

    return Response.json({
      appointments,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    
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
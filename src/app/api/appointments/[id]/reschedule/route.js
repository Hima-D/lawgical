// ==================== APPOINTMENT RESCHEDULING ====================

// app/api/appointments/[id]/reschedule/route.js - Reschedule appointment
export async function POST(request, { params }) {
  try {
    const user = await verifyAuth();
    const { id } = await params;
    const { newDate, newTime, reason } = await request.json();

    if (!newDate || !newTime) {
      return Response.json(
        { error: 'New date and time are required' },
        { status: 400 }
      );
    }

    // Validate new date/time
    const newDateTime = new Date(`${newDate}T${newTime}`);
    if (isNaN(newDateTime.getTime()) || newDateTime <= new Date()) {
      return Response.json(
        { error: 'Invalid or past date/time provided' },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
      include: {
        lawyerProfile: true,
        client: {
          select: {
            displayName: true,
            email: true
          }
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
    const isClient = appointment.clientId === user.userId;
    const isLawyer = appointment.lawyerProfile.userId === user.userId;

    if (!isClient && !isLawyer) {
      return Response.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    if (appointment.status === 'completed' || appointment.status === 'cancelled') {
      return Response.json(
        { error: 'Cannot reschedule completed or cancelled appointments' },
        { status: 400 }
      );
    }

    // Check for conflicts at new time
    const conflict = await prisma.appointment.findFirst({
      where: {
        lawyerProfileId: appointment.lawyerProfileId,
        appointmentDate: new Date(newDate),
        appointmentTime: newTime,
        status: {
          in: ['pending', 'confirmed']
        },
        id: {
          not: parseInt(id)
        }
      }
    });

    if (conflict) {
      return Response.json(
        { error: 'The new time slot is already booked' },
        { status: 409 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Free up old availability slot
      if (appointment.availabilitySlotId) {
        await tx.availabilitySlot.update({
          where: { id: appointment.availabilitySlotId },
          data: { isBooked: false }
        });
      }

      // Update appointment with new date/time
      const updatedAppointment = await tx.appointment.update({
        where: { id: parseInt(id) },
        data: {
          appointmentDate: new Date(newDate),
          appointmentTime: newTime,
          status: 'pending', // Reset to pending for lawyer confirmation
          availabilitySlotId: null, // Remove old slot reference
          lawyerNotes: isLawyer ? reason : appointment.lawyerNotes,
          clientNotes: isClient ? reason : appointment.clientNotes
        }
      });

      // Create notifications for both parties
      const otherUserId = isClient ? appointment.lawyerProfile.userId : appointment.clientId;
      const rescheduledBy = isClient ? 'client' : 'lawyer';
      
      await tx.notification.createMany({
        data: [
          {
            userId: otherUserId,
            title: 'Appointment Rescheduled',
            message: `Your appointment has been rescheduled to ${newDate} at ${newTime} by the ${rescheduledBy}${reason ? `. Reason: ${reason}` : ''}`,
            type: 'appointment'
          },
          {
            userId: user.userId,
            title: 'Appointment Rescheduled',
            message: `You have successfully rescheduled your appointment to ${newDate} at ${newTime}`,
            type: 'appointment'
          }
        ]
      });

      return updatedAppointment;
    });

    return Response.json({
      message: 'Appointment rescheduled successfully',
      appointment: result
    });

  } catch (error) {
    console.error('Reschedule appointment error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


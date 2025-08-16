// app/api/appointments/[id]/cancel/route.js - Cancel appointment
export async function POST(request, { params }) {
  try {
    const user = await verifyAuth();
    const { id } = await params;
    const { reason } = await request.json();

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

    // Check if user can cancel this appointment
    const isClient = appointment.clientId === user.userId;
    const isLawyer = appointment.lawyerProfile.userId === user.userId;

    if (!isClient && !isLawyer) {
      return Response.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    if (appointment.status === 'cancelled') {
      return Response.json(
        { error: 'Appointment is already cancelled' },
        { status: 400 }
      );
    }

    if (appointment.status === 'completed') {
      return Response.json(
        { error: 'Cannot cancel completed appointment' },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Update appointment status
      const updatedAppointment = await tx.appointment.update({
        where: { id: parseInt(id) },
        data: { 
          status: 'cancelled',
          lawyerNotes: isLawyer ? reason : appointment.lawyerNotes,
          clientNotes: isClient ? reason : appointment.clientNotes
        }
      });

      // Free up the availability slot if it was booked
      if (appointment.availabilitySlotId) {
        await tx.availabilitySlot.update({
          where: { id: appointment.availabilitySlotId },
          data: { isBooked: false }
        });
      }

      // Create notifications
      const otherUserId = isClient ? appointment.lawyerProfile.userId : appointment.clientId;
      const otherUserType = isClient ? 'lawyer' : 'client';
      
      await tx.notification.create({
        data: {
          userId: otherUserId,
          title: 'Appointment Cancelled',
          message: `Your appointment on ${appointment.appointmentDate.toDateString()} at ${appointment.appointmentTime} has been cancelled by the ${isClient ? 'client' : 'lawyer'}${reason ? `. Reason: ${reason}` : ''}`,
          type: 'appointment'
        }
      });

      return updatedAppointment;
    });

    return Response.json({
      message: 'Appointment cancelled successfully',
      appointment: result
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


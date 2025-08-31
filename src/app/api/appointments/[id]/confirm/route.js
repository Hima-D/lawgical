// ==================== APPOINTMENT STATUS MANAGEMENT ====================

// app/api/appointments/[id]/confirm/route.js - Confirm appointment
export async function POST(request, { params }) {
  try {
    const user = await verifyAuth();
    const { id } = await params;

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

    // Only lawyer can confirm appointments
    if (appointment.lawyerProfile.userId !== user.userId) {
      return Response.json(
        { error: 'Only the assigned lawyer can confirm appointments' },
        { status: 403 }
      );
    }

    if (appointment.status !== 'pending') {
      return Response.json(
        { error: 'Appointment is not in pending status' },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Update appointment status
      const updatedAppointment = await tx.appointment.update({
        where: { id: parseInt(id) },
        data: { status: 'confirmed' }
      });

      // Create notification for client
      await tx.notification.create({
        data: {
          userId: appointment.clientId,
          title: 'Appointment Confirmed',
          message: `Your appointment on ${appointment.appointmentDate.toDateString()} at ${appointment.appointmentTime} has been confirmed`,
          type: 'appointment'
        }
      });

      return updatedAppointment;
    });

    return Response.json({
      message: 'Appointment confirmed successfully',
      appointment: result
    });

  } catch (error) {
    console.error('Confirm appointment error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

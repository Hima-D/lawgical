// app/api/appointments/[id]/complete/route.js - Mark appointment as completed
export async function POST(request, { params }) {
  try {
    const user = await verifyAuth();
    const { id } = await params;
    const { notes } = await request.json();

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

    // Only lawyer can mark as completed
    if (appointment.lawyerProfile.userId !== user.userId) {
      return Response.json(
        { error: 'Only the assigned lawyer can mark appointments as completed' },
        { status: 403 }
      );
    }

    if (appointment.status !== 'confirmed') {
      return Response.json(
        { error: 'Only confirmed appointments can be marked as completed' },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Update appointment status
      const updatedAppointment = await tx.appointment.update({
        where: { id: parseInt(id) },
        data: { 
          status: 'completed',
          lawyerNotes: notes || appointment.lawyerNotes
        }
      });

      // Create notification for client
      await tx.notification.create({
        data: {
          userId: appointment.clientId,
          title: 'Appointment Completed',
          message: `Your appointment on ${appointment.appointmentDate.toDateString()} at ${appointment.appointmentTime} has been marked as completed. You can now leave a review.`,
          type: 'appointment'
        }
      });

      return updatedAppointment;
    });

    return Response.json({
      message: 'Appointment marked as completed',
      appointment: result
    });

  } catch (error) {
    console.error('Complete appointment error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


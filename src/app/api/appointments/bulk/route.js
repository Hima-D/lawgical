// ==================== BULK APPOINTMENT OPERATIONS ====================

// app/api/appointments/bulk/route.js - Bulk operations on appointments
export async function POST(request) {
  try {
    const user = await verifyAuth();
    const { action, appointmentIds, data } = await request.json();

    if (!action || !appointmentIds || !Array.isArray(appointmentIds)) {
      return Response.json(
        { error: 'Action and appointment IDs array are required' },
        { status: 400 }
      );
    }

    // Verify user has access to all appointments
    const appointments = await prisma.appointment.findMany({
      where: {
        id: { in: appointmentIds.map(id => parseInt(id)) }
      },
      include: {
        lawyerProfile: true
      }
    });

    if (appointments.length !== appointmentIds.length) {
      return Response.json(
        { error: 'Some appointments not found' },
        { status: 404 }
      );
    }

    // Check permissions for all appointments
    const hasPermission = appointments.every(apt => {
      return apt.clientId === user.userId || apt.lawyerProfile.userId === user.userId;
    });

    if (!hasPermission) {
      return Response.json(
        { error: 'Access denied to one or more appointments' },
        { status: 403 }
      );
    }

    let result;

    switch (action) {
      case 'cancel':
        result = await prisma.$transaction(async (tx) => {
          const updated = await tx.appointment.updateMany({
            where: {
              id: { in: appointmentIds.map(id => parseInt(id)) },
              status: { not: 'completed' }
            },
            data: { status: 'cancelled' }
          });

          // Free up availability slots
          await tx.availabilitySlot.updateMany({
            where: {
              appointments: {
                some: {
                  id: { in: appointmentIds.map(id => parseInt(id)) }
                }
              }
            },
            data: { isBooked: false }
          });

          return updated;
        });
        break;

      case 'confirm':
        if (user.userType !== 'lawyer') {
          return Response.json(
            { error: 'Only lawyers can confirm appointments' },
            { status: 403 }
          );
        }
        
        result = await prisma.appointment.updateMany({
          where: {
            id: { in: appointmentIds.map(id => parseInt(id)) },
            status: 'pending'
          },
          data: { status: 'confirmed' }
        });
        break;

      case 'update_notes':
        if (!data || !data.notes) {
          return Response.json(
            { error: 'Notes are required for update action' },
            { status: 400 }
          );
        }

        const noteField = user.userType === 'lawyer' ? 'lawyerNotes' : 'clientNotes';
        result = await prisma.appointment.updateMany({
          where: {
            id: { in: appointmentIds.map(id => parseInt(id)) }
          },
          data: { [noteField]: data.notes }
        });
        break;

      default:
        return Response.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return Response.json({
      message: `Bulk ${action} completed successfully`,
      affectedCount: result.count
    });

  } catch (error) {
    console.error('Bulk appointment operation error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
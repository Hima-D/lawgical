// ==================== APPOINTMENT REMINDERS ====================

// app/api/appointments/reminders/route.js - Send appointment reminders
import { PrismaClient } from '@/generated/prisma'; // or '@prisma/client' if you're using the standard path
const prisma = new PrismaClient();
export async function POST(request) {
  try {
    const { type } = await request.json(); // '24h', '1h', etc.
    
    let timeThreshold;
    let reminderMessage;
    
    switch (type) {
      case '24h':
        timeThreshold = new Date(Date.now() + 24 * 60 * 60 * 1000);
        reminderMessage = 'You have an appointment tomorrow';
        break;
      case '1h':
        timeThreshold = new Date(Date.now() + 60 * 60 * 1000);
        reminderMessage = 'You have an appointment in 1 hour';
        break;
      default:
        return Response.json(
          { error: 'Invalid reminder type' },
          { status: 400 }
        );
    }

    // Find appointments that need reminders
    const appointmentsNeedingReminders = await prisma.appointment.findMany({
      where: {
        status: 'confirmed',
        appointmentDate: {
          lte: timeThreshold,
          gte: new Date()
        }
        // Add additional logic to check if reminder already sent
      },
      include: {
        client: {
          select: {
            id: true,
            displayName: true,
            email: true
          }
        },
        lawyerProfile: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                email: true
              }
            }
          }
        },
        service: {
          select: {
            name: true
          }
        }
      }
    });

    const remindersSent = [];

    // Send reminders using transaction
    for (const appointment of appointmentsNeedingReminders) {
      await prisma.$transaction(async (tx) => {
        // Create notifications for both client and lawyer
        await tx.notification.createMany({
          data: [
            {
              userId: appointment.clientId,
              title: 'Appointment Reminder',
              message: `${reminderMessage}: ${appointment.service.name} with ${appointment.lawyerProfile.user.displayName} on ${appointment.appointmentDate.toDateString()} at ${appointment.appointmentTime}`,
              type: 'appointment'
            },
            {
              userId: appointment.lawyerProfile.userId,
              title: 'Appointment Reminder',
              message: `${reminderMessage}: ${appointment.service.name} with ${appointment.client.displayName} on ${appointment.appointmentDate.toDateString()} at ${appointment.appointmentTime}`,
              type: 'appointment'
            }
          ]
        });

        remindersSent.push(appointment.id);
      });
    }

    return Response.json({
      message: `${remindersSent.length} reminders sent successfully`,
      appointmentIds: remindersSent,
      reminderType: type
    });

  } catch (error) {
    console.error('Send reminders error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


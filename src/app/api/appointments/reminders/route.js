import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@/generated/prisma';
import { addHours, isWithinInterval, startOfHour, endOfHour } from 'date-fns';

const prisma = new PrismaClient();

// Helper function to authenticate the JWT token
const authenticateToken = (request) => {
  const authHeader = request.headers.get('authorization');
  let token;

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    console.log('Token found in Authorization header');
  } else {
    const cookieHeader = request.headers.get('cookie');
    token = cookieHeader?.match(/token=([^;]+)/)?.[1];
    console.log('Token found in cookie:', token ? 'present' : 'not found');
  }

  if (!token) {
    console.log('Authentication failed: No token provided');
    return null;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded.userId || !decoded.userType) {
      console.log('Invalid token payload:', decoded);
      throw new Error('Invalid token payload: Missing userId or userType');
    }
    console.log('Token verified successfully:', decoded);
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return null;
  }
};

// POST: Create reminder notifications for appointments within a time window
export async function POST(request) {
  console.log('Received POST request for /api/appointments/reminders');

  const user = authenticateToken(request);
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  console.log(`Authenticated user: ID ${user.userId}, type: ${user.userType}`);

  try {
    const { reminderType } = await request.json();
    console.log(`Reminder request for type: ${reminderType}`);

    // Validate reminderType
    if (!['24h', '1h'].includes(reminderType)) {
      console.log('Invalid reminderType:', reminderType);
      return NextResponse.json(
        { success: false, error: 'Invalid reminder type. Use "24h" or "1h"' },
        { status: 400 }
      );
    }

    // Calculate time window
    const now = new Date();
    const timeWindowHours = reminderType === '24h' ? 24 : 1;
    const startTime = startOfHour(now);
    const endTime = endOfHour(addHours(now, timeWindowHours));

    console.log(`Fetching appointments in window: ${startTime.toISOString()} to ${endTime.toISOString()}`);

    // Fetch appointments for the lawyer
    const appointments = await prisma.appointment.findMany({
      where: {
        lawyerProfile: { userId: user.userId },
        status: { in: ['confirmed', 'pending'] },
        appointmentDate: {
          gte: startTime,
          lte: endTime
        }
      },
      include: {
        lawyerProfile: { select: { userId: true } },
        client: { select: { id: true, displayName: true } },
        service: { select: { name: true } }
      }
    });

    if (appointments.length === 0) {
      console.log('No eligible appointments found for reminders');
      return NextResponse.json(
        { success: true, message: 'No eligible appointments found for reminders' },
        { status: 200 }
      );
    }

    console.log(`Found ${appointments.length} eligible appointments`);

    // Create notifications for each appointment
    const notifications = await prisma.$transaction(
      appointments.map(appointment => {
        const reminderTime = addHours(new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`), -timeWindowHours);
        return prisma.notification.create({
          data: {
            userId: appointment.clientId, // Notify client
            title: 'Appointment Reminder',
            message: `Reminder: Your appointment for ${appointment.service.name} with ${appointment.lawyerProfile.userId === user.userId ? 'your lawyer' : appointment.client.displayName} on ${new Date(appointment.appointmentDate).toDateString()} at ${appointment.appointmentTime} is scheduled. Reminder set for ${reminderTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}.`,
            type: 'reminder',
            isRead: false
          }
        });
      })
    );

    console.log(`Created ${notifications.length} reminder notifications`);

    return NextResponse.json({
      success: true,
      message: `Successfully sent ${reminderType} reminders for ${notifications.length} appointments`,
      notifications
    }, { status: 201 });

  } catch (error) {
    console.error(`Error creating reminders for user ID ${user?.userId}:`, error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: error.message.includes('Unauthorized') ? 401 : error.message.includes('Invalid') ? 400 : 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

import { PrismaClient } from '@/generated/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// Helper function to authenticate the JWT token
const verifyAuth = async () => {
  const cookieStore = await cookies();
  let token = cookieStore.get('token')?.value;

  if (!token) {
    const authHeader = await (await headers()).get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
      console.log('Token found in Authorization header');
    }
  }

  if (!token) {
    console.log('Authentication failed: No token provided');
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId || !decoded.userType) {
      console.log('Invalid token payload:', decoded);
      throw new Error('Invalid token payload: Missing userId or userType');
    }
    console.log('Token verified successfully:', decoded);
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    throw new Error('Invalid token');
  }
};

// Get single appointment
export async function GET(request, { params }) {
  try {
    const user = await verifyAuth();
    const { id } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
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
                displayName: true,
                email: true,
                photoUrl: true
              }
            }
          }
        },
        service: true,
        messages: {
          orderBy: {
            createdAt: 'asc'
          },
          include: {
            sender: {
              select: {
                displayName: true,
                photoUrl: true
              }
            }
          }
        },
        documents: true
      }
    });

    if (!appointment) {
      return Response.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Check if user has permission to view this appointment
    const isClient = appointment.clientId === user.userId;
    const isLawyer = appointment.lawyerProfile.userId === user.userId;

    if (!isClient && !isLawyer) {
      return Response.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return Response.json({ appointment });

  } catch (error) {
    console.error('Get appointment error:', error);
    return Response.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'No token provided' || error.message === 'Invalid token' ? 401 : 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update appointment
export async function PUT(request, { params }) {
  try {
    const user = await verifyAuth();
    const { id } = await params;
    const updateData = await request.json();

    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
      include: {
        lawyerProfile: true
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

    // Prepare update data based on user role
    let allowedUpdates = {};

    if (isClient) {
      if (updateData.clientNotes !== undefined) {
        allowedUpdates.clientNotes = updateData.clientNotes;
      }
      if (updateData.meetingType !== undefined) {
        allowedUpdates.meetingType = updateData.meetingType;
      }
    } else if (isLawyer) {
      if (updateData.lawyerNotes !== undefined) {
        allowedUpdates.lawyerNotes = updateData.lawyerNotes;
      }
      if (updateData.meetingLink !== undefined) {
        allowedUpdates.meetingLink = updateData.meetingLink;
      }
      if (updateData.status !== undefined) {
        allowedUpdates.status = updateData.status;
      }
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return Response.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: allowedUpdates,
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
        service: true
      }
    });

    return Response.json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment
    });

  } catch (error) {
    console.error('Update appointment error:', error);
    return Response.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'No token provided' || error.message === 'Invalid token' ? 401 : 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

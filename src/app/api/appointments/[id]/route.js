// ==================== SINGLE APPOINTMENT OPERATIONS ====================

// app/api/appointments/[id]/route.js - Single appointment operations
import { PrismaClient } from '@/generated/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

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
      { error: 'Internal server error' },
      { status: 500 }
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
      // Client can only update certain fields
      if (updateData.clientNotes !== undefined) {
        allowedUpdates.clientNotes = updateData.clientNotes;
      }
      if (updateData.meetingType !== undefined) {
        allowedUpdates.meetingType = updateData.meetingType;
      }
    } else if (isLawyer) {
      // Lawyer can update more fields
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
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


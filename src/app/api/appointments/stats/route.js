// app/api/appointments/stats/route.js - Get appointment statistics
import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Get token from cookies
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Verify and decode JWT token
    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // Default to 30 days

    // Calculate date range
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - parseInt(period));

    let baseWhere = {};

    // Determine if user is client or lawyer
    if (user.userType === 'client') {
      baseWhere.clientId = user.userId;
    } else if (user.userType === 'lawyer') {
      const lawyerProfile = await prisma.lawyerProfile.findUnique({
        where: { userId: user.userId },
      });

      if (!lawyerProfile) {
        return NextResponse.json({ error: 'Lawyer profile not found' }, { status: 404 });
      }
      baseWhere.lawyerProfileId = lawyerProfile.id;
    } else {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    // Get stats by status
    const stats = await prisma.appointment.groupBy({
      by: ['status'],
      where: {
        ...baseWhere,
        createdAt: {
          gte: dateFrom,
        },
      },
      _count: {
        id: true,
      },
    });

    // Get upcoming appointments
    const upcomingAppointments = await prisma.appointment.count({
      where: {
        ...baseWhere,
        appointmentDate: {
          gte: new Date(),
        },
        status: {
          in: ['pending', 'confirmed'],
        },
      },
    });

    // Get total appointments
    const totalAppointments = await prisma.appointment.count({
      where: baseWhere,
    });

    // Format stats
    const formattedStats = {
      total: totalAppointments,
      upcoming: upcomingAppointments,
      period: parseInt(period),
      statusBreakdown: stats.reduce((acc, stat) => {
        acc[stat.status] = stat._count.id;
        return acc;
      }, {}),
      periodTotal: stats.reduce((total, stat) => total + stat._count.id, 0),
    };

    return NextResponse.json({ stats: formattedStats });
  } catch (error) {
    console.error('Get appointment stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
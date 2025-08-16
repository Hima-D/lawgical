// app/api/appointments/search/route.js
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Initialize Prisma client directly
const prisma = new PrismaClient();

// Helper function to get user from JWT token
async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export async function GET(request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
        
    const query = searchParams.get('q');
    const status = searchParams.get('status');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const lawyerId = searchParams.get('lawyerId');
    const serviceCategory = searchParams.get('serviceCategory');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    let whereClause = {};
    let include = {
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
      service: true
    };

    // Base filter based on user type
    if (user.userType === 'client') {
      whereClause.clientId = user.userId;
    } else if (user.userType === 'lawyer') {
      const lawyerProfile = await prisma.lawyerProfile.findUnique({
        where: { userId: user.userId }
      });
            
      if (lawyerProfile) {
        whereClause.lawyerProfileId = lawyerProfile.id;
      }
    }

    // Apply filters
    if (status) {
      whereClause.status = status;
    }

    if (dateFrom) {
      whereClause.appointmentDate = {
        ...whereClause.appointmentDate,
        gte: new Date(dateFrom)
      };
    }

    if (dateTo) {
      whereClause.appointmentDate = {
        ...whereClause.appointmentDate,
        lte: new Date(dateTo)
      };
    }

    if (lawyerId && user.userType === 'client') {
      whereClause.lawyerProfileId = parseInt(lawyerId);
    }

    if (serviceCategory) {
      whereClause.service = {
        category: serviceCategory
      };
    }

    // Search in client notes, lawyer notes, or lawyer name
    if (query) {
      whereClause.OR = [
        { clientNotes: { contains: query, mode: 'insensitive' } },
        { lawyerNotes: { contains: query, mode: 'insensitive' } },
        { 
          lawyerProfile: {
            user: {
              displayName: { contains: query, mode: 'insensitive' }
            }
          }
        },
        {
          service: {
            name: { contains: query, mode: 'insensitive' }
          }
        }
      ];
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include,
      orderBy: {
        appointmentDate: 'desc'
      },
      skip,
      take: limit
    });

    const totalCount = await prisma.appointment.count({
      where: whereClause
    });

    return Response.json({
      appointments,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      },
      filters: {
        query,
        status,
        dateFrom,
        dateTo,
        lawyerId,
        serviceCategory
      }
    });

  } catch (error) {
    console.error('Search appointments error:', error);
    
    // Handle auth errors specifically
    if (error.message.includes('token') || error.message.includes('Invalid')) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return Response.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
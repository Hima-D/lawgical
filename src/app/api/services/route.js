// app/api/services/route.js
import { PrismaClient } from '@/generated/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// Middleware to verify JWT and get user
async function verifyAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// GET /api/services - Get services by lawyer profile ID
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lawyerProfileId = searchParams.get('lawyerProfileId');
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Validate required parameter
    if (!lawyerProfileId) {
      return Response.json(
        { error: 'lawyerProfileId query parameter is required' },
        { status: 400 }
      );
    }

    // Validate lawyerProfileId
    const profileId = parseInt(lawyerProfileId);
    if (isNaN(profileId) || profileId <= 0) {
      return Response.json(
        { error: 'lawyerProfileId must be a valid positive number' },
        { status: 400 }
      );
    }

    // Check if lawyer profile exists
    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { id: profileId }
    });

    if (!lawyerProfile) {
      return Response.json(
        { error: `No lawyer found with profile ID ${profileId}` },
        { status: 404 }
      );
    }

    // Build where clause
    const whereClause = {
      lawyerProfileId: profileId,
    };

    if (category && category !== 'all') {
      whereClause.category = category;
    }

    if (isActive !== null && isActive !== undefined) {
      whereClause.isActive = isActive === 'true';
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get services with pagination
    const [services, totalCount] = await Promise.all([
      prisma.service.findMany({
        where: whereClause,
        include: {
          lawyerProfile: {
            select: {
              id: true,
              specialization: true,
              user: {
                select: {
                  displayName: true,
                  email: true
                }
              }
            }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip: skip,
        take: limit
      }),
      prisma.service.count({
        where: whereClause
      })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return Response.json({
      services,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        limit
      },
      meta: {
        lawyerProfileId: profileId,
        filters: {
          category: category || 'all',
          isActive: isActive || 'all'
        }
      }
    });

  } catch (error) {
    console.error('Get services error:', error);
    
    if (error.message === 'Invalid token' || error.message === 'No token provided') {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/services - Create new service
export async function POST(request) {
  try {
    // Verify authentication
    const user = await verifyAuth();
    
    if (user.userType !== 'lawyer') {
      return Response.json(
        { error: 'Only lawyers can add services' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, price, durationMinutes, category } = body;

    // Validation
    if (!name || !description || !price || !durationMinutes) {
      return Response.json(
        { error: 'Name, description, price, and duration are required' },
        { status: 400 }
      );
    }

    if (price <= 0 || durationMinutes <= 0) {
      return Response.json(
        { error: 'Price and duration must be positive numbers' },
        { status: 400 }
      );
    }

    if (name.trim().length < 3) {
      return Response.json(
        { error: 'Service name must be at least 3 characters long' },
        { status: 400 }
      );
    }

    if (description.trim().length < 10) {
      return Response.json(
        { error: 'Service description must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Get lawyer profile
    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.userId }
    });

    if (!lawyerProfile) {
      return Response.json(
        { error: 'Lawyer profile not found. Please create your profile first.' },
        { status: 400 }
      );
    }

    // Check for duplicate service name for this lawyer
    const existingService = await prisma.service.findFirst({
      where: {
        lawyerProfileId: lawyerProfile.id,
        name: name.trim(),
        isActive: true
      }
    });

    if (existingService) {
      return Response.json(
        { error: 'A service with this name already exists' },
        { status: 409 }
      );
    }

    // Create service
    const service = await prisma.service.create({
      data: {
        lawyerProfileId: lawyerProfile.id,
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        durationMinutes: parseInt(durationMinutes),
        category: category?.trim() || null,
        isActive: true,
      },
      include: {
        lawyerProfile: {
          select: {
            id: true,
            specialization: true,
            user: {
              select: {
                displayName: true,
                email: true
              }
            }
          }
        }
      }
    });

    return Response.json(
      {
        message: 'Service created successfully',
        service
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Create service error:', error);
    
    if (error.message === 'Invalid token' || error.message === 'No token provided') {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (error.code === 'P2002') {
      return Response.json(
        { error: 'Service with this name already exists' },
        { status: 409 }
      );
    }

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

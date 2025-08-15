// app/api/lawyers/search/route.js
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Search parameters
    const specialization = searchParams.get('specialization');
    const location = searchParams.get('location');
    const minRate = searchParams.get('minRate');
    const maxRate = searchParams.get('maxRate');
    const minExperience = searchParams.get('minExperience');
    const language = searchParams.get('language');
    const isVerified = searchParams.get('isVerified');
    const sortBy = searchParams.get('sortBy') || 'createdAt'; // 'rating', 'experience', 'rate', 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Build where clause
    let whereClause = {};

    if (specialization) {
      whereClause.specialization = {
        contains: specialization,
        mode: 'insensitive'
      };
    }

    if (location) {
      whereClause.address = {
        contains: location,
        mode: 'insensitive'
      };
    }

    if (minRate || maxRate) {
      whereClause.hourlyRate = {};
      if (minRate) whereClause.hourlyRate.gte = parseFloat(minRate);
      if (maxRate) whereClause.hourlyRate.lte = parseFloat(maxRate);
    }

    if (minExperience) {
      whereClause.yearsExperience = {
        gte: parseInt(minExperience)
      };
    }

    if (language) {
      whereClause.languages = {
        has: language
      };
    }

    if (isVerified === 'true') {
      whereClause.isVerified = true;
    }

    // Build orderBy clause
    let orderBy = {};
    switch (sortBy) {
      case 'experience':
        orderBy = { yearsExperience: sortOrder };
        break;
      case 'rate':
        orderBy = { hourlyRate: sortOrder };
        break;
      case 'rating':
        // For rating, we'll handle this separately as it requires aggregation
        orderBy = { createdAt: 'desc' };
        break;
      default:
        orderBy = { [sortBy]: sortOrder };
    }

    // Get lawyers with their profiles and stats
    const lawyers = await prisma.lawyerProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoUrl: true,
            createdAt: true
          }
        },
        services: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            durationMinutes: true,
            category: true
          }
        },
        reviews: {
          where: { isVisible: true },
          select: {
            rating: true,
            comment: true,
            createdAt: true,
            client: {
              select: {
                displayName: true,
                photoUrl: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 5 // Show latest 5 reviews
        },
        _count: {
          select: {
            appointments: {
              where: { status: 'completed' }
            },
            reviews: {
              where: { isVisible: true }
            }
          }
        }
      },
      orderBy,
      skip,
      take: limit
    });

    // Calculate average rating and enrich data
    const enrichedLawyers = lawyers.map(lawyer => {
      const avgRating = lawyer.reviews.length > 0
        ? lawyer.reviews.reduce((sum, review) => sum + review.rating, 0) / lawyer.reviews.length
        : 0;

      return {
        ...lawyer,
        averageRating: Math.round(avgRating * 10) / 10,
        completedAppointments: lawyer._count.appointments,
        totalReviews: lawyer._count.reviews,
        // Remove _count from response
        _count: undefined
      };
    });

    // Sort by rating if requested (since we can't do this in SQL easily)
    if (sortBy === 'rating') {
      enrichedLawyers.sort((a, b) => {
        if (sortOrder === 'desc') {
          return b.averageRating - a.averageRating;
        }
        return a.averageRating - b.averageRating;
      });
    }

    // Get total count for pagination
    const totalCount = await prisma.lawyerProfile.count({
      where: whereClause
    });

    // Get available specializations for filtering
    const specializations = await prisma.lawyerProfile.groupBy({
      by: ['specialization'],
      _count: {
        specialization: true
      },
      orderBy: {
        _count: {
          specialization: 'desc'
        }
      }
    });

    return Response.json({
      lawyers: enrichedLawyers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      },
      filters: {
        availableSpecializations: specializations.map(s => ({
          name: s.specialization,
          count: s._count.specialization
        }))
      }
    });

  } catch (error) {
    console.error('Search lawyers error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
// app/api/lawyers/search/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

// Create a single Prisma instance
const prisma = new PrismaClient();

// Helper function to build where clause
function buildWhereClause(params) {
  const {
    search,
    specialization,
    location,
    minRate,
    maxRate,
    minExperience,
    language,
    isVerified
  } = params;

  let whereClause = {};

  // Handle general search across multiple fields
  if (search) {
    whereClause.OR = [
      {
        user: {
          displayName: {
            contains: search,
            mode: 'insensitive'
          }
        }
      },
      {
        specialization: {
          contains: search,
          mode: 'insensitive'
        }
      },
      {
        firmName: {
          contains: search,
          mode: 'insensitive'
        }
      },
      {
        bio: {
          contains: search,
          mode: 'insensitive'
        }
      }
    ];
  }

  // Handle specific specialization filter
  if (specialization && specialization !== search) {
    const specializationFilter = {
      specialization: {
        contains: specialization,
        mode: 'insensitive'
      }
    };

    if (whereClause.OR) {
      whereClause = {
        AND: [
          { OR: whereClause.OR },
          specializationFilter
        ]
      };
      delete whereClause.OR;
    } else {
      whereClause = specializationFilter;
    }
  }

  // Location filter
  if (location) {
    const locationFilter = {
      address: {
        contains: location,
        mode: 'insensitive'
      }
    };

    if (whereClause.AND) {
      whereClause.AND.push(locationFilter);
    } else if (whereClause.OR) {
      whereClause = {
        AND: [
          { OR: whereClause.OR },
          locationFilter
        ]
      };
      delete whereClause.OR;
    } else {
      whereClause = { ...whereClause, ...locationFilter };
    }
  }

  // Rate filter
  if (minRate || maxRate) {
    const rateFilter = { hourlyRate: {} };
    if (minRate) rateFilter.hourlyRate.gte = parseFloat(minRate);
    if (maxRate) rateFilter.hourlyRate.lte = parseFloat(maxRate);

    if (whereClause.AND) {
      whereClause.AND.push(rateFilter);
    } else if (whereClause.OR) {
      whereClause = {
        AND: [
          { OR: whereClause.OR },
          rateFilter
        ]
      };
      delete whereClause.OR;
    } else {
      whereClause = { ...whereClause, ...rateFilter };
    }
  }

  // Experience filter
  if (minExperience) {
    const experienceFilter = {
      yearsExperience: {
        gte: parseInt(minExperience)
      }
    };

    if (whereClause.AND) {
      whereClause.AND.push(experienceFilter);
    } else if (whereClause.OR) {
      whereClause = {
        AND: [
          { OR: whereClause.OR },
          experienceFilter
        ]
      };
      delete whereClause.OR;
    } else {
      whereClause = { ...whereClause, ...experienceFilter };
    }
  }

  // Language filter
  if (language) {
    const languageFilter = {
      languages: {
        has: language
      }
    };

    if (whereClause.AND) {
      whereClause.AND.push(languageFilter);
    } else if (whereClause.OR) {
      whereClause = {
        AND: [
          { OR: whereClause.OR },
          languageFilter
        ]
      };
      delete whereClause.OR;
    } else {
      whereClause = { ...whereClause, ...languageFilter };
    }
  }

  // Verified filter
  if (isVerified === 'true') {
    const verifiedFilter = { isVerified: true };

    if (whereClause.AND) {
      whereClause.AND.push(verifiedFilter);
    } else if (whereClause.OR) {
      whereClause = {
        AND: [
          { OR: whereClause.OR },
          verifiedFilter
        ]
      };
      delete whereClause.OR;
    } else {
      whereClause = { ...whereClause, ...verifiedFilter };
    }
  }

  return whereClause;
}

// Helper function to build order by clause
function buildOrderBy(sortBy, sortOrder) {
  switch (sortBy) {
    case 'experience':
      return { yearsExperience: sortOrder };
    case 'rate':
      return { hourlyRate: sortOrder };
    case 'rating':
      return { createdAt: 'desc' }; // We'll sort by calculated rating in memory
    case 'name':
      return { user: { displayName: sortOrder } };
    case 'createdAt':
    default:
      return { createdAt: sortOrder };
  }
}

// Helper function to validate and sanitize parameters
function validateSearchParams(searchParams) {
  const search = searchParams.get('search')?.trim() || '';
  const specialization = searchParams.get('specialization')?.trim() || '';
  const location = searchParams.get('location')?.trim() || null;
  const language = searchParams.get('language')?.trim() || null;
  const isVerified = searchParams.get('isVerified');

  // Validate and parse numeric parameters
  let minRate = searchParams.get('minRate');
  let maxRate = searchParams.get('maxRate');
  let minExperience = searchParams.get('minExperience');

  if (minRate) {
    const parsed = parseFloat(minRate);
    minRate = !isNaN(parsed) && parsed >= 0 ? parsed : null;
  }

  if (maxRate) {
    const parsed = parseFloat(maxRate);
    maxRate = !isNaN(parsed) && parsed >= 0 ? parsed : null;
  }

  if (minExperience) {
    const parsed = parseInt(minExperience);
    minExperience = !isNaN(parsed) && parsed >= 0 ? parsed : null;
  }

  // Validate sort parameters
  const sortBy = ['experience', 'rate', 'rating', 'name', 'createdAt'].includes(searchParams.get('sortBy')) 
    ? searchParams.get('sortBy') 
    : 'createdAt';
  
  const sortOrder = ['asc', 'desc'].includes(searchParams.get('sortOrder')) 
    ? searchParams.get('sortOrder') 
    : 'desc';

  // Validate pagination parameters
  let page = parseInt(searchParams.get('page'));
  let limit = parseInt(searchParams.get('limit'));
  
  page = !isNaN(page) && page > 0 ? page : 1;
  limit = !isNaN(limit) && limit > 0 && limit <= 50 ? limit : 6; // Max limit of 50

  return {
    search,
    specialization,
    location,
    minRate,
    maxRate,
    minExperience,
    language,
    isVerified,
    sortBy,
    sortOrder,
    page,
    limit,
    skip: (page - 1) * limit
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate and sanitize parameters
    const params = validateSearchParams(searchParams);
    
    console.log('Search params:', {
      search: params.search,
      specialization: params.specialization,
      page: params.page,
      limit: params.limit
    });

    // Build where clause
    const whereClause = buildWhereClause(params);
    console.log('Where clause:', JSON.stringify(whereClause, null, 2));

    // Build orderBy clause
    const orderBy = buildOrderBy(params.sortBy, params.sortOrder);

    // Execute queries in parallel for better performance
    const [lawyers, totalCount] = await Promise.all([
      prisma.lawyerProfile.findMany({
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
            take: 5
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
        skip: params.skip,
        take: params.limit
      }),
      
      prisma.lawyerProfile.count({
        where: whereClause
      })
    ]);

    console.log(`Found ${lawyers.length} lawyers out of ${totalCount} total`);

    // Calculate average rating and enrich data
    const enrichedLawyers = lawyers.map(lawyer => {
      const avgRating = lawyer.reviews.length > 0
        ? lawyer.reviews.reduce((sum, review) => sum + review.rating, 0) / lawyer.reviews.length
        : 0;

      return {
        id: lawyer.id,
        userId: lawyer.userId,
        bio: lawyer.bio,
        specialization: lawyer.specialization,
        yearsExperience: lawyer.yearsExperience,
        hourlyRate: lawyer.hourlyRate,
        address: lawyer.address,
        phoneNumber: lawyer.phoneNumber,
        firmName: lawyer.firmName,
        languages: lawyer.languages,
        isVerified: lawyer.isVerified,
        isAvailable: lawyer.isAvailable,
        createdAt: lawyer.createdAt,
        updatedAt: lawyer.updatedAt,
        user: lawyer.user,
        services: lawyer.services,
        reviews: lawyer.reviews,
        averageRating: Math.round(avgRating * 10) / 10,
        completedAppointments: lawyer._count.appointments,
        totalReviews: lawyer._count.reviews
      };
    });

    // Sort by rating if requested (since we calculate it in memory)
    if (params.sortBy === 'rating') {
      enrichedLawyers.sort((a, b) => {
        if (params.sortOrder === 'desc') {
          return b.averageRating - a.averageRating;
        }
        return a.averageRating - b.averageRating;
      });
    }

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / params.limit);
    const hasMore = params.skip + params.limit < totalCount;

    console.log(`Returning ${enrichedLawyers.length} lawyers, hasMore: ${hasMore}`);

    return NextResponse.json({
      success: true,
      data: {
        lawyers: enrichedLawyers,
        pagination: {
          page: params.page,
          limit: params.limit,
          total: totalCount,
          totalPages,
          hasNext: params.page < totalPages,
          hasPrev: params.page > 1
        },
        hasMore,
        appliedFilters: {
          search: params.search || null,
          specialization: params.specialization || null,
          location: params.location,
          minRate: params.minRate,
          maxRate: params.maxRate,
          minExperience: params.minExperience,
          language: params.language,
          isVerified: params.isVerified === 'true' ? true : null,
          sortBy: params.sortBy,
          sortOrder: params.sortOrder
        }
      }
    });

  } catch (error) {
    console.error('Search lawyers error:', error);
    
    // Return more specific error messages
    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (error.code === 'P2002') {
      errorMessage = 'Database constraint error';
    } else if (error.code === 'P2025') {
      errorMessage = 'Record not found';
      statusCode = 404;
    } else if (error.message.includes('Invalid')) {
      errorMessage = 'Invalid query parameters';
      statusCode = 400;
    }

    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        message: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: error.code || undefined
      },
      { status: statusCode }
    );
  }
}

// Cleanup function for graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
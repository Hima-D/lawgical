// app/api/lawyers/route.js (or pages/api/lawyers.js if using pages router)
import { NextResponse } from "next/server";
import LawyerService from "@/lib/lawyers";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const params = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '6'),
      search: searchParams.get('search') || '',
      specialization: searchParams.get('specialization') || '',
      minRating: parseFloat(searchParams.get('minRating') || '0'),
      minHourlyRate: searchParams.get('minHourlyRate') ? parseInt(searchParams.get('minHourlyRate')) : null,
      maxHourlyRate: searchParams.get('maxHourlyRate') ? parseInt(searchParams.get('maxHourlyRate')) : null,
      location: searchParams.get('location') || '',
      sortBy: searchParams.get('sortBy') || 'rating',
      sortOrder: searchParams.get('sortOrder') || 'desc',
      verified: searchParams.get('verified') !== 'false'
    };

    // Use LawyerService to get lawyers
    const result = await LawyerService.getLawyers(params);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in lawyers API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch lawyers',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST method for advanced filtering
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      page = 1,
      limit = 6,
      search = '',
      specialization = '',
      minRating = 0,
      maxHourlyRate = null,
      minHourlyRate = null,
      location = '',
      sortBy = 'rating', // 'rating', 'price', 'experience', 'reviews'
      sortOrder = 'desc'
    } = body;

    const skip = (page - 1) * limit;

    const where = {
      user: {
        userType: 'lawyer',
      },
      isVerified: true,
    };

    // Add all filters
    if (search) {
      where.OR = [
        { user: { displayName: { contains: search, mode: 'insensitive' } } },
        { specialization: { contains: search, mode: 'insensitive' } },
        { firmName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (specialization) {
      where.specialization = { equals: specialization, mode: 'insensitive' };
    }

    if (location) {
      where.address = { contains: location, mode: 'insensitive' };
    }

    if (minHourlyRate !== null) {
      where.hourlyRate = { ...where.hourlyRate, gte: minHourlyRate };
    }

    if (maxHourlyRate !== null) {
      where.hourlyRate = { ...where.hourlyRate, lte: maxHourlyRate };
    }

    const lawyers = await prisma.lawyerProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true,
            photoUrl: true,
          }
        },
        services: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            price: true,
            category: true,
          }
        },
        reviews: {
          select: {
            rating: true,
            createdAt: true,
          }
        }
      },
      skip,
      take: limit,
    });

    // Filter by rating and sort
    const enrichedLawyers = lawyers
      .map(lawyer => {
        const avgRating = lawyer.reviews.length > 0
          ? lawyer.reviews.reduce((sum, review) => sum + review.rating, 0) / lawyer.reviews.length
          : 0;

        return {
          ...lawyer,
          averageRating: parseFloat(avgRating.toFixed(1)),
        };
      })
      .filter(lawyer => lawyer.averageRating >= minRating);

    // Sort results
    enrichedLawyers.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'rating':
          comparison = a.averageRating - b.averageRating;
          break;
        case 'price':
          comparison = (a.hourlyRate || 0) - (b.hourlyRate || 0);
          break;
        case 'experience':
          comparison = (a.yearsExperience || 0) - (b.yearsExperience || 0);
          break;
        case 'reviews':
          comparison = a.reviews.length - b.reviews.length;
          break;
        default:
          comparison = a.averageRating - b.averageRating;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    const total = enrichedLawyers.length;
    const hasMore = skip + limit < total;

    return NextResponse.json({
      lawyers: enrichedLawyers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasMore
      },
      hasMore,
    });

  } catch (error) {
    console.error('Error in advanced lawyer search:', error);
    return NextResponse.json(
      { error: 'Failed to search lawyers' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
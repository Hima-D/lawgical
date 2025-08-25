// app/api/lawyers/recommended/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

// Create a single Prisma instance
const prisma = new PrismaClient();

// Helper function to calculate average rating
function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const limit = Math.min(parseInt(searchParams.get('limit')) || 6, 20);
    const specialization = searchParams.get('specialization');
    const location = searchParams.get('location');
    
    console.log('Fetching recommended lawyers with params:', { limit, specialization, location });

    // Build base query for verified lawyers
    let whereClause = {
      isVerified: true,
      user: {
        isActive: true
      }
    };

    // Add filters if provided
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

    // Get lawyers with their related data
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
        reviews: {
          where: { isVisible: true },
          select: {
            rating: true,
            createdAt: true
          }
        },
        services: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            price: true,
            category: true
          },
          take: 3
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
      take: limit * 2,
      orderBy: [
        { isVerified: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    console.log(`Found ${lawyers.length} lawyers from database`);

    // Calculate recommendation scores
    const enrichedLawyers = lawyers.map(lawyer => {
      const averageRating = calculateAverageRating(lawyer.reviews);
      const reviewCount = lawyer._count.reviews;
      const completedAppointments = lawyer._count.appointments;

      // Simple recommendation score calculation
      let recommendationScore = 0;
      recommendationScore += averageRating * 10; // Rating factor
      recommendationScore += Math.min(reviewCount * 2, 20); // Review count factor
      recommendationScore += Math.min(lawyer.yearsExperience || 0, 15); // Experience factor
      recommendationScore += Math.min(completedAppointments, 5); // Appointments factor

      return {
        id: lawyer.id,
        userId: lawyer.userId,
        name: lawyer.user?.displayName || 'Legal Professional',
        email: lawyer.user?.email,
        photoUrl: lawyer.user?.photoUrl,
        specialization: lawyer.specialization || 'General Practice',
        bio: lawyer.bio,
        yearsExperience: lawyer.yearsExperience,
        hourlyRate: lawyer.hourlyRate,
        address: lawyer.address,
        firmName: lawyer.firmName,
        languages: lawyer.languages || [],
        isVerified: lawyer.isVerified,
        averageRating,
        totalReviews: reviewCount,
        completedAppointments,
        services: lawyer.services,
        recommendationScore
      };
    });

    // Sort by recommendation score and take the requested limit
    const recommendedLawyers = enrichedLawyers
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, limit);

    console.log(`Returning ${recommendedLawyers.length} recommended lawyers`);

    return NextResponse.json({
      success: true,
      data: {
        lawyers: recommendedLawyers,
        metadata: {
          limit,
          count: recommendedLawyers.length,
          specialization: specialization || null,
          location: location || null
        }
      }
    });

  } catch (error) {
    console.error('Recommended lawyers error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch recommended lawyers',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, preferences = {}, limit = 6 } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user's appointment history for personalization
    const userAppointments = await prisma.appointment.findMany({
      where: { clientId: userId },
      include: {
        lawyer: {
          select: {
            specialization: true,
            address: true
          }
        }
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });

    // Build personalized query
    let whereClause = {
      isVerified: true,
      user: { isActive: true }
    };

    // Add preference filters
    if (preferences.specialization) {
      whereClause.specialization = {
        contains: preferences.specialization,
        mode: 'insensitive'
      };
    }

    if (preferences.location) {
      whereClause.address = {
        contains: preferences.location,
        mode: 'insensitive'
      };
    }

    if (preferences.maxRate) {
      whereClause.hourlyRate = {
        lte: parseFloat(preferences.maxRate)
      };
    }

    const lawyers = await prisma.lawyerProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoUrl: true
          }
        },
        reviews: {
          where: { isVisible: true },
          select: { rating: true, createdAt: true }
        },
        services: {
          where: { isActive: true },
          select: { id: true, name: true, price: true, category: true },
          take: 3
        },
        _count: {
          select: {
            appointments: { where: { status: 'completed' } },
            reviews: { where: { isVisible: true } }
          }
        }
      },
      take: limit * 2,
      orderBy: [
        { isVerified: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    // Enrich with recommendation scores
    const enrichedLawyers = lawyers.map(lawyer => {
      const averageRating = calculateAverageRating(lawyer.reviews);
      const reviewCount = lawyer._count.reviews;
      const completedAppointments = lawyer._count.appointments;
      
      let recommendationScore = averageRating * 10 + Math.min(reviewCount * 2, 20);

      return {
        id: lawyer.id,
        userId: lawyer.userId,
        name: lawyer.user?.displayName || 'Legal Professional',
        email: lawyer.user?.email,
        photoUrl: lawyer.user?.photoUrl,
        specialization: lawyer.specialization || 'General Practice',
        bio: lawyer.bio,
        yearsExperience: lawyer.yearsExperience,
        hourlyRate: lawyer.hourlyRate,
        address: lawyer.address,
        firmName: lawyer.firmName,
        languages: lawyer.languages || [],
        isVerified: lawyer.isVerified,
        averageRating,
        totalReviews: reviewCount,
        completedAppointments,
        services: lawyer.services,
        recommendationScore
      };
    });

    const recommendedLawyers = enrichedLawyers
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      data: {
        lawyers: recommendedLawyers,
        metadata: {
          limit,
          count: recommendedLawyers.length,
          isPersonalized: true,
          userId
        }
      }
    });

  } catch (error) {
    console.error('Personalized recommendations error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch personalized recommendations'
      },
      { status: 500 }
    );
  }
}

// Cleanup function for graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
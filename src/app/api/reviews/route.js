// app/api/reviews/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET - Fetch reviews with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const lawyerProfileId = searchParams.get('lawyerProfileId');
    const clientId = searchParams.get('clientId');
    const limit = Math.min(parseInt(searchParams.get('limit')) || 10, 50);
    const page = Math.max(parseInt(searchParams.get('page')) || 1, 1);
    const sortBy = searchParams.get('sortBy') || 'createdAt'; // 'createdAt', 'rating'
    const order = searchParams.get('order') || 'desc'; // 'asc', 'desc'
    const minRating = parseInt(searchParams.get('minRating')) || 1;
    const isVisible = searchParams.get('isVisible') !== 'false'; // Default to true

    console.log('Fetching reviews with params:', {
      lawyerProfileId, clientId, limit, page, sortBy, order, minRating, isVisible
    });

    // Build where clause
    let whereClause = {
      isVisible,
      rating: { gte: minRating }
    };

    if (lawyerProfileId) {
      whereClause.lawyerProfileId = parseInt(lawyerProfileId);
    }

    if (clientId) {
      whereClause.clientId = parseInt(clientId);
    }

    // Calculate offset for pagination
    const skip = (page - 1) * limit;

    // Fetch reviews with related data
    const [reviews, totalCount] = await Promise.all([
      prisma.review.findMany({
        where: whereClause,
        include: {
          client: {
            select: {
              id: true,
              displayName: true,
              email: true,
              photoUrl: true
            }
          },
          lawyerProfile: {
            select: {
              id: true,
              user: {
                select: {
                  id: true,
                  displayName: true,
                  email: true,
                  photoUrl: true
                }
              },
              specialization: true,
              firmName: true
            }
          }
        },
        orderBy: {
          [sortBy]: order
        },
        skip,
        take: limit
      }),
      prisma.review.count({ where: whereClause })
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    console.log(`Found ${reviews.length} reviews out of ${totalCount} total`);

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage,
          hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Fetch reviews error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch reviews',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// // POST - Create a new review
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { clientId, lawyerProfileId, rating, comment } = body;

//     // Validate required fields
//     if (!clientId || !lawyerProfileId || !rating) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Client ID, Lawyer Profile ID, and rating are required' 
//         },
//         { status: 400 }
//       );
//     }

//     // Validate rating range
//     if (rating < 1 || rating > 5) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Rating must be between 1 and 5' 
//         },
//         { status: 400 }
//       );
//     }

//     console.log('Creating review:', { clientId, lawyerProfileId, rating, comment });

//     // Check if client and lawyer profile exist
//     const [client, lawyerProfile] = await Promise.all([
//       prisma.user.findUnique({
//         where: { id: parseInt(clientId) },
//         select: { id: true, userType: true }
//       }),
//       prisma.lawyerProfile.findUnique({
//         where: { id: parseInt(lawyerProfileId) },
//         select: { id: true }
//       })
//     ]);

//     if (!client) {
//       return NextResponse.json(
//         { success: false, error: 'Client not found' },
//         { status: 404 }
//       );
//     }

//     if (client.userType !== 'client') {
//       return NextResponse.json(
//         { success: false, error: 'Only clients can leave reviews' },
//         { status: 403 }
//       );
//     }

//     if (!lawyerProfile) {
//       return NextResponse.json(
//         { success: false, error: 'Lawyer profile not found' },
//         { status: 404 }
//       );
//     }

//     // Check if client has had an appointment with this lawyer
//     const hasAppointment = await prisma.appointment.findFirst({
//       where: {
//         clientId: parseInt(clientId),
//         lawyerProfileId: parseInt(lawyerProfileId),
//         status: 'completed'
//       }
//     });

//     if (!hasAppointment) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'You can only review lawyers after completing an appointment' 
//         },
//         { status: 403 }
//       );
//     }

//     // Create the review (this will update if already exists due to unique constraint)
//     const review = await prisma.review.upsert({
//       where: {
//         clientId_lawyerProfileId: {
//           clientId: parseInt(clientId),
//           lawyerProfileId: parseInt(lawyerProfileId)
//         }
//       },
//       update: {
//         rating: parseInt(rating),
//         comment: comment || null,
//         updatedAt: new Date()
//       },
//       create: {
//         clientId: parseInt(clientId),
//         lawyerProfileId: parseInt(lawyerProfileId),
//         rating: parseInt(rating),
//         comment: comment || null
//       },
//       include: {
//         client: {
//           select: {
//             id: true,
//             displayName: true,
//             email: true,
//             photoUrl: true
//           }
//         },
//         lawyerProfile: {
//           select: {
//             id: true,
//             user: {
//               select: {
//                 id: true,
//                 displayName: true,
//                 email: true
//               }
//             },
//             specialization: true,
//             firmName: true
//           }
//         }
//       }
//     });

//     console.log(`Review created/updated for client ${clientId} and lawyer ${lawyerProfileId}`);

//     return NextResponse.json({
//       success: true,
//       message: 'Review submitted successfully',
//       data: { review }
//     });

//   } catch (error) {
//     console.error('Create review error:', error);

//     // Handle unique constraint violation
//     if (error.code === 'P2002') {
//       return NextResponse.json(
//         { 
//           success: false,
//           error: 'You have already reviewed this lawyer'
//         },
//         { status: 409 }
//       );
//     }

//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Failed to create review',
//         message: process.env.NODE_ENV === 'development' ? error.message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

// // Cleanup function for graceful shutdown
// process.on('beforeExit', async () => {
//   await prisma.$disconnect();
// });


// // app/api/reviews/[reviewId]/route.js
// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@/generated/prisma';

// const prisma = new PrismaClient();

// // GET - Fetch a specific review
// export async function GET(request, { params }) {
//   try {
//     const { reviewId } = params;

//     if (!reviewId) {
//       return NextResponse.json(
//         { success: false, error: 'Review ID is required' },
//         { status: 400 }
//       );
//     }

//     const review = await prisma.review.findUnique({
//       where: { id: parseInt(reviewId) },
//       include: {
//         client: {
//           select: {
//             id: true,
//             displayName: true,
//             email: true,
//             photoUrl: true
//           }
//         },
//         lawyerProfile: {
//           select: {
//             id: true,
//             user: {
//               select: {
//                 id: true,
//                 displayName: true,
//                 email: true,
//                 photoUrl: true
//               }
//             },
//             specialization: true,
//             firmName: true
//           }
//         }
//       }
//     });

//     if (!review) {
//       return NextResponse.json(
//         { success: false, error: 'Review not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: { review }
//     });

//   } catch (error) {
//     console.error('Fetch review error:', error);
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Failed to fetch review',
//         message: process.env.NODE_ENV === 'development' ? error.message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

// // PUT - Update a specific review
// export async function PUT(request, { params }) {
//   try {
//     const { reviewId } = params;
//     const body = await request.json();
//     const { rating, comment, isVisible, clientId } = body;

//     if (!reviewId) {
//       return NextResponse.json(
//         { success: false, error: 'Review ID is required' },
//         { status: 400 }
//       );
//     }

//     // Check if review exists
//     const existingReview = await prisma.review.findUnique({
//       where: { id: parseInt(reviewId) }
//     });

//     if (!existingReview) {
//       return NextResponse.json(
//         { success: false, error: 'Review not found' },
//         { status: 404 }
//       );
//     }

//     // Check if the client owns this review
//     if (clientId && existingReview.clientId !== parseInt(clientId)) {
//       return NextResponse.json(
//         { success: false, error: 'You can only update your own reviews' },
//         { status: 403 }
//       );
//     }

//     // Validate rating if provided
//     if (rating && (rating < 1 || rating > 5)) {
//       return NextResponse.json(
//         { success: false, error: 'Rating must be between 1 and 5' },
//         { status: 400 }
//       );
//     }

//     // Build update data
//     const updateData = {};
//     if (rating) updateData.rating = parseInt(rating);
//     if (comment !== undefined) updateData.comment = comment;
//     if (isVisible !== undefined) updateData.isVisible = isVisible;

//     const updatedReview = await prisma.review.update({
//       where: { id: parseInt(reviewId) },
//       data: updateData,
//       include: {
//         client: {
//           select: {
//             id: true,
//             displayName: true,
//             email: true,
//             photoUrl: true
//           }
//         },
//         lawyerProfile: {
//           select: {
//             id: true,
//             user: {
//               select: {
//                 id: true,
//                 displayName: true,
//                 email: true
//               }
//             },
//             specialization: true,
//             firmName: true
//           }
//         }
//       }
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Review updated successfully',
//       data: { review: updatedReview }
//     });

//   } catch (error) {
//     console.error('Update review error:', error);
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Failed to update review',
//         message: process.env.NODE_ENV === 'development' ? error.message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

// // DELETE - Delete a specific review
// export async function DELETE(request, { params }) {
//   try {
//     const { reviewId } = params;
//     const { searchParams } = new URL(request.url);
//     const clientId = searchParams.get('clientId');

//     if (!reviewId) {
//       return NextResponse.json(
//         { success: false, error: 'Review ID is required' },
//         { status: 400 }
//       );
//     }

//     // Check if review exists
//     const existingReview = await prisma.review.findUnique({
//       where: { id: parseInt(reviewId) }
//     });

//     if (!existingReview) {
//       return NextResponse.json(
//         { success: false, error: 'Review not found' },
//         { status: 404 }
//       );
//     }

//     // Check if the client owns this review
//     if (clientId && existingReview.clientId !== parseInt(clientId)) {
//       return NextResponse.json(
//         { success: false, error: 'You can only delete your own reviews' },
//         { status: 403 }
//       );
//     }

//     await prisma.review.delete({
//       where: { id: parseInt(reviewId) }
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Review deleted successfully'
//     });

//   } catch (error) {
//     console.error('Delete review error:', error);
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Failed to delete review',
//         message: process.env.NODE_ENV === 'development' ? error.message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }


// // app/api/reviews/lawyer/[lawyerProfileId]/stats/route.js
// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@/generated/prisma';

// const prisma = new PrismaClient();

// // GET - Get review statistics for a lawyer
// export async function GET(request, { params }) {
//   try {
//     const { lawyerProfileId } = params;

//     if (!lawyerProfileId) {
//       return NextResponse.json(
//         { success: false, error: 'Lawyer Profile ID is required' },
//         { status: 400 }
//       );
//     }

//     // Get all reviews for the lawyer
//     const reviews = await prisma.review.findMany({
//       where: {
//         lawyerProfileId: parseInt(lawyerProfileId),
//         isVisible: true
//       },
//       select: {
//         rating: true,
//         createdAt: true
//       }
//     });

//     if (reviews.length === 0) {
//       return NextResponse.json({
//         success: true,
//         data: {
//           totalReviews: 0,
//           averageRating: 0,
//           ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
//           recentReviews: 0
//         }
//       });
//     }

//     // Calculate statistics
//     const totalReviews = reviews.length;
//     const sumRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const averageRating = Math.round((sumRating / totalReviews) * 10) / 10;

//     // Rating distribution
//     const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//     reviews.forEach(review => {
//       ratingDistribution[review.rating]++;
//     });

//     // Recent reviews (last 30 days)
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//     const recentReviews = reviews.filter(review => 
//       new Date(review.createdAt) > thirtyDaysAgo
//     ).length;

//     return NextResponse.json({
//       success: true,
//       data: {
//         totalReviews,
//         averageRating,
//         ratingDistribution,
//         recentReviews
//       }
//     });

//   } catch (error) {
//     console.error('Fetch review stats error:', error);
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Failed to fetch review statistics',
//         message: process.env.NODE_ENV === 'development' ? error.message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }
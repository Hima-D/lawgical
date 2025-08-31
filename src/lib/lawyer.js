// // lib/lawyers.js - Utility functions for lawyer operations
// import { PrismaClient } from "@/generated/prisma";

// const prisma = new PrismaClient();

// export class LawyerService {
//   /**
//    * Get paginated lawyers with search and filter options
//    */
//   static async getLawyers({
//     page = 1,
//     limit = 6,
//     search = '',
//     specialization = '',
//     minRating = 0,
//     maxHourlyRate = null,
//     minHourlyRate = null,
//     location = '',
//     sortBy = 'rating',
//     sortOrder = 'desc',
//     verified = true
//   } = {}) {
//     try {
//       const skip = (page - 1) * limit;

//       // Build dynamic where clause
//       const where = {
//         user: {
//           userType: 'lawyer',
//         },
//       };

//       if (verified) {
//         where.isVerified = true;
//       }

//       // Search across multiple fields
//       if (search.trim()) {
//         where.OR = [
//           {
//             user: {
//               displayName: {
//                 contains: search,
//                 mode: 'insensitive'
//               }
//             }
//           },
//           {
//             specialization: {
//               contains: search,
//               mode: 'insensitive'
//             }
//           },
//           {
//             firmName: {
//               contains: search,
//               mode: 'insensitive'
//             }
//           },
//           {
//             bio: {
//               contains: search,
//               mode: 'insensitive'
//             }
//           }
//         ];
//       }

//       // Specialization filter
//       if (specialization) {
//         where.specialization = {
//           equals: specialization,
//           mode: 'insensitive'
//         };
//       }

//       // Location filter
//       if (location) {
//         where.address = {
//           contains: location,
//           mode: 'insensitive'
//         };
//       }

//       // Hourly rate filters
//       if (minHourlyRate !== null || maxHourlyRate !== null) {
//         where.hourlyRate = {};
//         if (minHourlyRate !== null) {
//           where.hourlyRate.gte = minHourlyRate;
//         }
//         if (maxHourlyRate !== null) {
//           where.hourlyRate.lte = maxHourlyRate;
//         }
//       }

//       // Fetch lawyers with all related data
//       const [lawyers, totalCount] = await Promise.all([
//         prisma.lawyerProfile.findMany({
//           where,
//           include: {
//             user: {
//               select: {
//                 id: true,
//                 displayName: true,
//                 email: true,
//                 photoUrl: true,
//                 createdAt: true,
//               }
//             },
//             services: {
//               where: {
//                 isActive: true
//               },
//               select: {
//                 id: true,
//                 name: true,
//                 price: true,
//                 category: true,
//                 durationMinutes: true,
//               },
//               orderBy: {
//                 price: 'asc'
//               }
//             },
//             reviews: {
//               select: {
//                 id: true,
//                 rating: true,
//                 comment: true,
//                 createdAt: true,
//                 client: {
//                   select: {
//                     displayName: true,
//                     photoUrl: true,
//                   }
//                 }
//               },
//               orderBy: {
//                 createdAt: 'desc'
//               },
//               take: 5 // Limit reviews for performance
//             },
//             appointments: {
//               where: {
//                 status: 'completed'
//               },
//               select: {
//                 id: true,
//               }
//             },
//             availability: {
//               select: {
//                 dayOfWeek: true,
//                 startTime: true,
//                 endTime: true,
//                 isAvailable: true,
//               }
//             }
//           },
//           skip,
//           take: limit,
//         }),
//         prisma.lawyerProfile.count({ where })
//       ]);

//       // Enrich lawyer data with calculated fields
//       const enrichedLawyers = lawyers.map(lawyer => {
//         const reviews = lawyer.reviews || [];
//         const avgRating = reviews.length > 0
//           ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
//           : 0;

//         const totalAppointments = lawyer.appointments?.length || 0;
//         const totalReviews = reviews.length;

//         // Calculate availability score (mock - you can implement real logic)
//         const availabilityScore = lawyer.availability?.filter(a => a.isAvailable).length || 0;

//         // Get minimum service price
//         const minServicePrice = lawyer.services.length > 0
//           ? Math.min(...lawyer.services.map(s => s.price))
//           : null;

//         return {
//           id: lawyer.id,
//           user: lawyer.user,
//           specialization: lawyer.specialization,
//           licenseNumber: lawyer.licenseNumber,
//           firmName: lawyer.firmName,
//           address: lawyer.address,
//           websiteUrl: lawyer.websiteUrl,
//           hourlyRate: lawyer.hourlyRate,
//           yearsExperience: lawyer.yearsExperience,
//           bio: lawyer.bio,
//           isVerified: lawyer.isVerified,
//           createdAt: lawyer.createdAt,
//           // Calculated fields
//           averageRating: parseFloat(avgRating.toFixed(1)),
//           totalReviews,
//           totalAppointments,
//           availabilityScore,
//           minServicePrice,
//           services: lawyer.services,
//           reviews: reviews.slice(0, 3), // Limit reviews
//           hasAvailability: availabilityScore > 0,
//           // Response time estimation (you can implement actual logic)
//           estimatedResponseTime: LawyerService.calculateResponseTime(totalAppointments, avgRating),
//         };
//       });

//       // Apply rating filter after calculation
//       const filteredLawyers = enrichedLawyers.filter(
//         lawyer => lawyer.averageRating >= minRating
//       );

//       // Sort lawyers
//       LawyerService.sortLawyers(filteredLawyers, sortBy, sortOrder);

//       const hasMore = skip + limit < totalCount;

//       return {
//         lawyers: filteredLawyers,
//         pagination: {
//           page,
//           limit,
//           total: totalCount,
//           pages: Math.ceil(totalCount / limit),
//           hasMore
//         },
//         hasMore,
//         filters: {
//           search,
//           specialization,
//           minRating,
//           location
//         }
//       };

//     } catch (error) {
//       console.error('Error in LawyerService.getLawyers:', error);
//       throw new Error(`Failed to fetch lawyers: ${error.message}`);
//     }
//   }

//   /**
//    * Sort lawyers based on criteria
//    */
//   static sortLawyers(lawyers, sortBy, sortOrder = 'desc') {
//     lawyers.sort((a, b) => {
//       let comparison = 0;

//       switch (sortBy) {
//         case 'rating':
//           // Primary: rating, Secondary: review count
//           comparison = a.averageRating - b.averageRating;
//           if (comparison === 0) {
//             comparison = a.totalReviews - b.totalReviews;
//           }
//           break;
//       }

//       return sortOrder === 'desc' ? -comparison : comparison;
//     });
//   }

//   /**
//    * Calculate estimated response time based on lawyer activity
//    */
//   static calculateResponseTime(totalAppointments, avgRating) {
//     // Mock calculation - you can implement actual logic based on:
//     // - Last login time
//     // - Average response to messages
//     // - Appointment booking patterns
    
//     let baseTime = 24; // 24 hours default
    
//     // More active lawyers respond faster
//     if (totalAppointments > 50) {
//       baseTime = 2;
//     } else if (totalAppointments > 20) {
//       baseTime = 6;
//     } else if (totalAppointments > 10) {
//       baseTime = 12;
//     }
    
//     // Higher rated lawyers tend to be more responsive
//     if (avgRating >= 4.5) {
//       baseTime = Math.max(1, baseTime - 4);
//     } else if (avgRating >= 4.0) {
//       baseTime = Math.max(2, baseTime - 2);
//     }
    
//     const hours = Math.floor(Math.random() * baseTime) + 1;
//     return hours <= 1 ? '1 hour' : `${hours} hours`;
//   }

//   /**
//    * Get unique specializations from database
//    */
//   static async getSpecializations() {
//     try {
//       const specializations = await prisma.lawyerProfile.findMany({
//         where: {
//           isVerified: true,
//           specialization: {
//             not: null
//           }
//         },
//         select: {
//           specialization: true
//         },
//         distinct: ['specialization']
//       });

//       return specializations
//         .map(item => item.specialization)
//         .filter(Boolean)
//         .sort();
//     } catch (error) {
//       console.error('Error fetching specializations:', error);
//       return [];
//     }
//   }

//   /**
//    * Get lawyer statistics for admin/analytics
//    */
//   static async getLawyerStats() {
//     try {
//       const [
//         totalLawyers,
//         verifiedLawyers,
//         activeLawyers,
//         avgRating,
//         topSpecializations
//       ] = await Promise.all([
//         prisma.lawyerProfile.count(),
//         prisma.lawyerProfile.count({ where: { isVerified: true } }),
//         prisma.lawyerProfile.count({
//           where: {
//             appointments: {
//               some: {
//                 createdAt: {
//                   gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
//                 }
//               }
//             }
//           }
//         }),
//         prisma.review.aggregate({
//           _avg: {
//             rating: true
//           },
//           where: {
//             lawyerProfile: {
//               isVerified: true
//             }
//           }
//         }),
//         prisma.lawyerProfile.groupBy({
//           by: ['specialization'],
//           _count: {
//             specialization: true
//           },
//           where: {
//             isVerified: true,
//             specialization: {
//               not: null
//             }
//           },
//           orderBy: {
//             _count: {
//               specialization: 'desc'
//             }
//           },
//           take: 5
//         })
//       ]);

//       return {
//         total: totalLawyers,
//         verified: verifiedLawyers,
//         active: activeLawyers,
//         averageRating: avgRating._avg.rating ? parseFloat(avgRating._avg.rating.toFixed(2)) : 0,
//         verificationRate: totalLawyers > 0 ? (verifiedLawyers / totalLawyers * 100).toFixed(1) : 0,
//         topSpecializations: topSpecializations.map(item => ({
//           name: item.specialization,
//           count: item._count.specialization
//         }))
//       };
//     } catch (error) {
//       console.error('Error fetching lawyer stats:', error);
//       throw error;
//     }
//   }

//   /**
//    * Get similar lawyers based on specialization and rating
//    */
//   static async getSimilarLawyers(lawyerId, limit = 4) {
//     try {
//       const lawyer = await prisma.lawyerProfile.findUnique({
//         where: { id: lawyerId },
//         select: { specialization: true }
//       });

//       if (!lawyer) {
//         throw new Error('Lawyer not found');
//       }

//       const similarLawyers = await prisma.lawyerProfile.findMany({
//         where: {
//           AND: [
//             { id: { not: lawyerId } },
//             { specialization: lawyer.specialization },
//             { isVerified: true }
//           ]
//         },
//         include: {
//           user: {
//             select: {
//               id: true,
//               displayName: true,
//               photoUrl: true,
//             }
//           },
//           reviews: {
//             select: {
//               rating: true
//             }
//           }
//         },
//         take: limit
//       });

//       return similarLawyers.map(lawyer => ({
//         ...lawyer,
//         averageRating: lawyer.reviews.length > 0
//           ? parseFloat((lawyer.reviews.reduce((sum, r) => sum + r.rating, 0) / lawyer.reviews.length).toFixed(1))
//           : 0,
//         totalReviews: lawyer.reviews.length,
//         reviews: undefined // Remove reviews from response
//       }));

//     } catch (error) {
//       console.error('Error fetching similar lawyers:', error);
//       throw error;
//     }
//   }
// }

// // Export individual functions for direct use
// export const {
//   getLawyers,
//   getSpecializations,
//   getLawyerStats,
//   getSimilarLawyers,
//   sortLawyers,
//   calculateResponseTime
// } = LawyerService;

// export default LawyerService;
          
//         case 'price':
//           const aPrice = a.hourlyRate || a.minServicePrice || 99999;
//           const bPrice = b.hourlyRate || b.minServicePrice || 99999;
//           comparison = aPrice - bPrice;
//           break;
          
//         case 'experience':
//           comparison = (a.yearsExperience || 0) - (b.yearsExperience || 0);
//           break;
          
//         case 'reviews':
//           comparison = a.totalReviews - b.totalReviews;
//           break;
          
//         case 'appointments':
//           comparison = a.totalAppointments - b.totalAppointments;
//           break;
          
//         case 'availability':
//           comparison = a.availabilityScore - b.availabilityScore;
//           break;
          
//         default:
//           // Default sort: verified -> rating -> reviews
//           if (a.isVerified !== b.isVerified) {
//             comparison = a.isVerified ? -1 : 1;
//           } else {
//             comparison = a.averageRating - b.averageRating;
//             if (comparison === 0) {
//               comparison = a.totalReviews - b.totalReviews;
//             }
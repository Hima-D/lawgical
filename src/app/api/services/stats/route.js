
// app/api/services/stats/route.js
// GET /api/services/stats - Get service statistics for a lawyer
export async function GET(request) {
  try {
    const user = await verifyAuth();
    
    if (user.userType !== 'lawyer') {
      return Response.json(
        { error: 'Only lawyers can view service statistics' },
        { status: 403 }
      );
    }

    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.userId }
    });

    if (!lawyerProfile) {
      return Response.json(
        { error: 'Lawyer profile not found' },
        { status: 404 }
      );
    }

    // Get service statistics
    const [
      totalServices,
      activeServices,
      totalEarnings,
      totalAppointments,
      categoryStats,
      recentServices
    ] = await Promise.all([
      prisma.service.count({
        where: { lawyerProfileId: lawyerProfile.id }
      }),
      prisma.service.count({
        where: { 
          lawyerProfileId: lawyerProfile.id,
          isActive: true 
        }
      }),
      prisma.appointment.aggregate({
        where: {
          service: {
            lawyerProfileId: lawyerProfile.id
          },
          status: 'completed'
        },
        _sum: {
          amount: true
        }
      }),
      prisma.appointment.count({
        where: {
          service: {
            lawyerProfileId: lawyerProfile.id
          }
        }
      }),
      prisma.service.groupBy({
        by: ['category'],
        where: { 
          lawyerProfileId: lawyerProfile.id,
          isActive: true
        },
        _count: {
          category: true
        },
        orderBy: {
          _count: {
            category: 'desc'
          }
        }
      }),
      prisma.service.findMany({
        where: { lawyerProfileId: lawyerProfile.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          price: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: {
              appointments: true
            }
          }
        }
      })
    ]);

    return Response.json({
      overview: {
        totalServices,
        activeServices,
        inactiveServices: totalServices - activeServices,
        totalEarnings: totalEarnings._sum.amount || 0,
        totalAppointments
      },
      categoryBreakdown: categoryStats.map(stat => ({
        category: stat.category || 'Uncategorized',
        count: stat._count.category
      })),
      recentServices: recentServices.map(service => ({
        ...service,
        appointmentCount: service._count.appointments
      }))
    });

  } catch (error) {
    console.error('Get service stats error:', error);
    
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
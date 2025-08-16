// ==================== APPOINTMENT CALENDAR VIEW ====================

// app/api/appointments/calendar/route.js - Get appointments in calendar format
export async function GET(request) {
  try {
    const user = await verifyAuth();
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year')) || new Date().getFullYear();
    const month = parseInt(searchParams.get('month')) || new Date().getMonth() + 1;

    // Calculate date range for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    let whereClause = {
      appointmentDate: {
        gte: startDate,
        lte: endDate
      }
    };

    // Filter based on user type
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

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        client: {
          select: {
            id: true,
            displayName: true,
            email: true
          }
        },
        lawyerProfile: {
          include: {
            user: {
              select: {
                displayName: true,
                email: true
              }
            }
          }
        },
        service: {
          select: {
            name: true,
            durationMinutes: true
          }
        }
      },
      orderBy: [
        { appointmentDate: 'asc' },
        { appointmentTime: 'asc' }
      ]
    });

    // Group appointments by date
    const calendarData = {};
    
    appointments.forEach(appointment => {
      const dateKey = appointment.appointmentDate.toISOString().split('T')[0];
      
      if (!calendarData[dateKey]) {
        calendarData[dateKey] = [];
      }
      
      calendarData[dateKey].push({
        id: appointment.id,
        time: appointment.appointmentTime,
        status: appointment.status,
        service: appointment.service.name,
        duration: appointment.service.durationMinutes,
        client: user.userType === 'lawyer' ? appointment.client.displayName : null,
        lawyer: user.userType === 'client' ? appointment.lawyerProfile.user.displayName : null,
        meetingType: appointment.meetingType
      });
    });

    return Response.json({
      year,
      month,
      calendarData,
      totalAppointments: appointments.length
    });

  } catch (error) {
    console.error('Get calendar data error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


// ==================== AVAILABILITY CHECKING ====================

// app/api/appointments/availability/route.js - Check lawyer availability
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lawyerProfileId = searchParams.get('lawyerProfileId');
    const date = searchParams.get('date');

    if (!lawyerProfileId || !date) {
      return Response.json(
        { error: 'Lawyer profile ID and date are required' },
        { status: 400 }
      );
    }

    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return Response.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Get lawyer's availability slots for the specific date or day of week
    const dayOfWeek = targetDate.getDay();
    
    const availabilitySlots = await prisma.availabilitySlot.findMany({
      where: {
        lawyerProfileId: parseInt(lawyerProfileId),
        OR: [
          {
            // Specific date slots
            date: targetDate,
            isRecurring: false
          },
          {
            // Recurring weekly slots
            dayOfWeek: dayOfWeek,
            isRecurring: true,
            date: null
          }
        ],
        isBooked: false
      },
      orderBy: {
        startTime: 'asc'
      }
    });

    // Get existing appointments for the date
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        lawyerProfileId: parseInt(lawyerProfileId),
        appointmentDate: targetDate,
        status: {
          in: ['pending', 'confirmed']
        }
      },
      select: {
        appointmentTime: true,
        service: {
          select: {
            durationMinutes: true
          }
        }
      }
    });

    // Generate available time slots
    const availableSlots = [];
    
    for (const slot of availabilitySlots) {
      const startTime = slot.startTime; // e.g., "09:00"
      const endTime = slot.endTime;     // e.g., "17:00"
      
      // Convert to minutes for easier calculation
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      const slotDuration = 60; // Default 1 hour slots
      
      // Generate time slots
      for (let current = startMinutes; current < endMinutes; current += slotDuration) {
        const timeSlot = minutesToTime(current);
        
        // Check if this slot conflicts with existing appointments
        const hasConflict = existingAppointments.some(apt => {
          const aptStartMinutes = timeToMinutes(apt.appointmentTime);
          const aptEndMinutes = aptStartMinutes + (apt.service.durationMinutes || 60);
          
          return (current >= aptStartMinutes && current < aptEndMinutes) ||
                 (current + slotDuration > aptStartMinutes && current + slotDuration <= aptEndMinutes);
        });
        
        if (!hasConflict) {
          availableSlots.push({
            time: timeSlot,
            availabilitySlotId: slot.id,
            duration: slotDuration
          });
        }
      }
    }

    return Response.json({
      date: date,
      lawyerProfileId: parseInt(lawyerProfileId),
      availableSlots: availableSlots,
      totalSlots: availableSlots.length
    });

  } catch (error) {
    console.error('Check availability error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Helper functions for time conversion
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}


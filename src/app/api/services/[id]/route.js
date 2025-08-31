
// app/api/services/[id]/route.js
// GET /api/services/[id] - Get single service by ID
export async function GET(request, { params }) {
  try {
    const serviceId = parseInt(params.id);

    if (isNaN(serviceId) || serviceId <= 0) {
      return Response.json(
        { error: 'Valid service ID is required' },
        { status: 400 }
      );
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        lawyerProfile: {
          select: {
            id: true,
            specialization: true,
            experience: true,
            hourlyRate: true,
            user: {
              select: {
                displayName: true,
                email: true,
                profileImage: true
              }
            }
          }
        }
      }
    });

    if (!service) {
      return Response.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return Response.json({ service });

  } catch (error) {
    console.error('Get service error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT /api/services/[id] - Update service
export async function PUT(request, { params }) {
  try {
    const user = await verifyAuth();
    const serviceId = parseInt(params.id);

    if (isNaN(serviceId) || serviceId <= 0) {
      return Response.json(
        { error: 'Valid service ID is required' },
        { status: 400 }
      );
    }

    // Get existing service
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        lawyerProfile: {
          select: {
            userId: true
          }
        }
      }
    });

    if (!existingService) {
      return Response.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Check if user owns this service
    if (existingService.lawyerProfile.userId !== user.userId) {
      return Response.json(
        { error: 'You can only update your own services' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updateData = {};

    // Validate and prepare update data
    if (body.name !== undefined) {
      if (!body.name.trim() || body.name.trim().length < 3) {
        return Response.json(
          { error: 'Service name must be at least 3 characters long' },
          { status: 400 }
        );
      }
      updateData.name = body.name.trim();
    }

    if (body.description !== undefined) {
      if (!body.description.trim() || body.description.trim().length < 10) {
        return Response.json(
          { error: 'Service description must be at least 10 characters long' },
          { status: 400 }
        );
      }
      updateData.description = body.description.trim();
    }

    if (body.price !== undefined) {
      const price = parseFloat(body.price);
      if (isNaN(price) || price <= 0) {
        return Response.json(
          { error: 'Price must be a positive number' },
          { status: 400 }
        );
      }
      updateData.price = price;
    }

    if (body.durationMinutes !== undefined) {
      const duration = parseInt(body.durationMinutes);
      if (isNaN(duration) || duration <= 0) {
        return Response.json(
          { error: 'Duration must be a positive number' },
          { status: 400 }
        );
      }
      updateData.durationMinutes = duration;
    }

    if (body.category !== undefined) {
      updateData.category = body.category?.trim() || null;
    }

    if (body.isActive !== undefined) {
      updateData.isActive = Boolean(body.isActive);
    }

    // Check for duplicate name if name is being updated
    if (updateData.name && updateData.name !== existingService.name) {
      const duplicateService = await prisma.service.findFirst({
        where: {
          lawyerProfileId: existingService.lawyerProfileId,
          name: updateData.name,
          id: { not: serviceId },
          isActive: true
        }
      });

      if (duplicateService) {
        return Response.json(
          { error: 'A service with this name already exists' },
          { status: 409 }
        );
      }
    }

    // Update service
    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        ...updateData,
        updatedAt: new Date()
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

    return Response.json({
      message: 'Service updated successfully',
      service: updatedService
    });

  } catch (error) {
    console.error('Update service error:', error);
    
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

// DELETE /api/services/[id] - Delete service
export async function DELETE(request, { params }) {
  try {
    const user = await verifyAuth();
    const serviceId = parseInt(params.id);

    if (isNaN(serviceId) || serviceId <= 0) {
      return Response.json(
        { error: 'Valid service ID is required' },
        { status: 400 }
      );
    }

    // Get existing service
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        lawyerProfile: {
          select: {
            userId: true
          }
        },
        _count: {
          select: {
            appointments: true
          }
        }
      }
    });

    if (!existingService) {
      return Response.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Check if user owns this service
    if (existingService.lawyerProfile.userId !== user.userId) {
      return Response.json(
        { error: 'You can only delete your own services' },
        { status: 403 }
      );
    }

    // Check if service has appointments
    if (existingService._count.appointments > 0) {
      return Response.json(
        { 
          error: 'Cannot delete service with existing appointments. Deactivate it instead.',
          hasAppointments: true,
          appointmentCount: existingService._count.appointments
        },
        { status: 409 }
      );
    }

    // Soft delete (mark as inactive) or hard delete based on your preference
    const { searchParams } = new URL(request.url);
    const hardDelete = searchParams.get('hard') === 'true';

    if (hardDelete) {
      await prisma.service.delete({
        where: { id: serviceId }
      });

      return Response.json({
        message: 'Service deleted permanently'
      });
    } else {
      // Soft delete - just deactivate
      const updatedService = await prisma.service.update({
        where: { id: serviceId },
        data: {
          isActive: false,
          updatedAt: new Date()
        }
      });

      return Response.json({
        message: 'Service deactivated successfully',
        service: updatedService
      });
    }

  } catch (error) {
    console.error('Delete service error:', error);
    
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


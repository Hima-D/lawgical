// app/api/client/lawyer/[lawyerId]/services/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  console.log(`Received GET request for /api/client/lawyer/${params.lawyerId}/services`);

  try {
    const { lawyerId } = params;

    // Validate lawyerId
    if (!lawyerId || isNaN(parseInt(lawyerId))) {
      console.log(`Invalid lawyerId: ${lawyerId}`);
      return NextResponse.json(
        { success: false, error: 'Invalid lawyer ID' },
        { status: 400 }
      );
    }

    // Check user type header
    const userType = request.headers.get('X-User-Type');
    console.log(`X-User-Type header: ${userType}`);
    if (userType !== 'client') {
      console.log('Unauthorized: Client access required');
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Client access required' },
        { status: 401 }
      );
    }

    // Fetch the lawyer profile to ensure it exists
    console.log(`Checking for lawyer with ID: ${lawyerId}`);
    const lawyer = await prisma.lawyerProfile.findUnique({
      where: { id: parseInt(lawyerId) },
      select: { id: true }
    });

    if (!lawyer) {
      console.log(`Lawyer with ID ${lawyerId} not found`);
      return NextResponse.json(
        { success: false, error: 'Lawyer not found' },
        { status: 404 }
      );
    }

    // Fetch active services for the lawyer
    console.log(`Fetching active services for lawyer ID ${lawyerId}`);
    const services = await prisma.service.findMany({
      where: {
        lawyerProfileId: parseInt(lawyerId),
        isActive: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        durationMinutes: true,
        category: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { name: 'asc' }
    });

    console.log(`Found ${services.length} active services for lawyer ID ${lawyerId}`);

    return NextResponse.json({
      success: true,
      services
    }, { status: 200 });

  } catch (error) {
    console.error(`Error fetching services for lawyer ID ${params.lawyerId}:`, error);

    // Return specific error messages
    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (error.code === 'P2025') {
      errorMessage = 'Lawyer not found';
      statusCode = 404;
    } else if (error.message.includes('Invalid')) {
      errorMessage = 'Invalid request parameters';
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

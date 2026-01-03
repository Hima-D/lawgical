import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  console.log('Received GET request for /api/client/lawyer/[lawyerId]/services');

  try {
    const { lawyerId } = await params; // Await params to resolve the Promise
    console.log(`Processing request for lawyer ID: ${lawyerId}`);

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

    // Fetch active services with lawyer validation
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

    // Check if lawyer exists by verifying services
    if (!services) {
      console.log(`No services found for lawyer ID ${lawyerId}, implying lawyer may not exist`);
      return NextResponse.json(
        { success: false, error: 'Lawyer not found' },
        { status: 404 }
      );
    }

    console.log(`Found ${services.length} active services for lawyer ID ${lawyerId}`);
    return NextResponse.json({
      success: true,
      services
    }, { status: 200 });

  } catch (error) {
    console.error(`Error fetching services for lawyer ID ${lawyerId}:`, error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

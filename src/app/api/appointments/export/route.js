import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { parse } from 'json2csv';

// Helper function to authenticate the JWT token
const verifyAuth = async () => {
  const cookieStore = await cookies();
  let token = cookieStore.get('token')?.value;

  if (!token) {
    const authHeader = await (await headers()).get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
      console.log('Token found in Authorization header');
    }
  }

  if (!token) {
    console.log('Authentication failed: No token provided');
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId || !decoded.userType) {
      console.log('Invalid token payload:', decoded);
      throw new Error('Invalid token payload: Missing userId or userType');
    }
    console.log('Token verified successfully:', decoded);
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    throw new Error('Invalid token');
  }
};

export async function GET(request) {
  try {
    const user = await verifyAuth();
    if (user.userType !== 'lawyer') {
      return Response.json(
        { error: 'Access denied: Only lawyers can export appointments' },
        { status: 403 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        lawyerProfile: { userId: user.userId },
      },
      include: {
        client: { select: { displayName: true, email: true } },
        service: { select: { name: true, price: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!appointments.length) {
      return Response.json(
        { error: 'No appointments found' },
        { status: 404 }
      );
    }

    // Prepare CSV data
    const csvData = appointments.map(apt => ({
      id: apt.id,
      clientName: apt.client.displayName,
      clientEmail: apt.client.email,
      serviceName: apt.service.name,
      price: apt.service.price,
      status: apt.status,
      appointmentDate: new Date(apt.appointmentDate).toISOString(),
      createdAt: new Date(apt.createdAt).toISOString(),
    }));

    const csv = parse(csvData, {
      fields: ['id', 'clientName', 'clientEmail', 'serviceName', 'price', 'status', 'appointmentDate', 'createdAt'],
    });

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=appointments_export.csv',
      },
    });

  } catch (error) {
    console.error('Export appointments error:', error);
    return Response.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'No token provided' || error.message === 'Invalid token' ? 401 : 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

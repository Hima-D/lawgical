import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// Helper function to authenticate the JWT token
const authenticateToken = (request) => {
  const authHeader = request.headers.get('authorization');
  let token;

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    console.log('Token found in Authorization header');
  } else {
    const cookieHeader = request.headers.get('cookie');
    token = cookieHeader?.match(/token=([^;]+)/)?.[1];
    console.log('Token found in cookie:', token ? 'present' : 'not found');
  }

  if (!token) {
    console.log('Authentication failed: No token provided');
    return null;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded.userId || !decoded.userType) {
      console.log('Invalid token payload:', decoded);
      throw new Error('Invalid token payload: Missing userId or userType');
    }
    console.log('Token verified successfully:', decoded);
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return null;
  }
};

// GET: Fetch notifications for the authenticated user
export async function GET(request) {
  console.log('Received GET request for /api/notifications');
  
  const user = authenticateToken(request);
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  console.log(`Fetching notifications for user ID: ${user.userId}`);

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' }
    });
    console.log(`Found ${notifications.length} notifications for user ID: ${user.userId}`);

    return NextResponse.json({
      success: true,
      notifications
    }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching notifications for user ID ${user.userId}:`, error);
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

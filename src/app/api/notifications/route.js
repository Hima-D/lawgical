import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken'; 
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// Helper function to authenticate the JWT token
const authenticateToken = (request) => {
  const authHeader = request.headers.get('authorization');
  let token;

  // Extract token from Bearer header or cookie
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    const cookieHeader = request.headers.get('cookie');
    token = cookieHeader?.match(/token=([^;]+)/)?.[1];
  }

  if (!token) return null;

  try {
    return verify(token, process.env.JWT_SECRET);  // Verify token using the secret
  } catch (error) {
    return null;
  }
};

// GET request: Fetch notifications for the authenticated user
export async function GET(request) {
  const user = authenticateToken(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH request: Mark all unread notifications as read
export async function PATCH(request) {
  const user = authenticateToken(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.notification.updateMany({
      where: {
        userId: user.id,
        isRead: false
      },
      data: { isRead: true }
    });

    return NextResponse.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// app/api/auth/verify/route.js
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return Response.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, userType, email } = decoded;

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        userType: true,
        displayName: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return Response.json({ error: 'Invalid or inactive user' }, { status: 401 });
    }

    return Response.json({
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        displayName: user.displayName,
      },
      isAuthenticated: true,
    });
  } catch (error) {
    console.error('Verify token error:', error);
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  } finally {
    await prisma.$disconnect();
  }
}

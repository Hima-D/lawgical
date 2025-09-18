import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Error verifying token:', error);
      return new Response(JSON.stringify({ success: false, message: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        userType: true,
        displayName: true,
        phoneNumber: true,
        photoUrl: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        googleId: true,
        lawyerProfile: {
          select: {
            id: true,
            bio: true,
            specialization: true,
            licenseNumber: true,
            firmName: true,
            isVerified: true,
            yearsExperience: true,
            hourlyRate: true,
          },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!user.isActive) {
      return new Response(JSON.stringify({ success: false, message: 'Account is deactivated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userData = {
      id: user.id,
      email: user.email,
      userType: user.userType,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      photoUrl: user.photoUrl,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    };

    if (user.userType === 'lawyer' && user.lawyerProfile) {
      userData.lawyerProfile = user.lawyerProfile;
    }

    return new Response(JSON.stringify({ success: true, user: userData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}
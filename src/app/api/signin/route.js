// app/api/signin/route.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user and include relevant fields from updated schema
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        userType: true,
        displayName: true,
        phoneNumber: true,
        photoUrl: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        // Include lawyer profile if user is a lawyer
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
          }
        }
      }
    });

    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Check if user account is active
    if (!user.isActive) {
      return Response.json({ error: 'Account is deactivated. Please contact support.' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT with additional user info
    const token = jwt.sign(
      { 
        userId: user.id,
        userType: user.userType,
        email: user.email 
      },
      process.env.JWT_SECRET, // Make sure JWT_SECRET is set in .env
      { expiresIn: '1d' }
    );

    // Await cookies() before setting the cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 1 day
      path: '/',
    });

    // Prepare user data for response (exclude passwordHash)
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

    // Add lawyer profile data if user is a lawyer
    if (user.userType === 'lawyer' && user.lawyerProfile) {
      userData.lawyerProfile = user.lawyerProfile;
    }

    return Response.json({
      message: 'Sign-in successful',
      user: userData
    });

  } catch (error) {
    console.error('Sign-in error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
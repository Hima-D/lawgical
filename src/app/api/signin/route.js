// app/api/signin/route.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { PrismaClient } from '@/generated/prisma';
import { OAuth2Client } from 'google-auth-library';

const prisma = new PrismaClient();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to verify Google token
async function verifyGoogleToken(token) {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error('Google token verification failed:', error);
    return null;
  }
}

// Helper function to create or update user from Google data
async function handleGoogleUser(googlePayload) {
  const { sub: googleId, email, name, picture, email_verified } = googlePayload;

  // Check if user exists with this Google ID
  let user = await prisma.user.findUnique({
    where: { googleId },
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
        }
      }
    }
  });

  if (!user) {
    // Check if user exists with this email (linking existing account)
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      // Link Google account to existing user
      user = await prisma.user.update({
        where: { email },
        data: {
          googleId,
          photoUrl: picture || existingUser.photoUrl,
          emailVerified: email_verified || existingUser.emailVerified,
        },
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
            }
          }
        }
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          googleId,
          displayName: name,
          photoUrl: picture,
          emailVerified: email_verified,
          userType: 'client', // Default to client, can be changed later
          isActive: true,
        },
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
            }
          }
        }
      });
    }
  } else {
    // Update existing Google user's info
    user = await prisma.user.update({
      where: { googleId },
      data: {
        photoUrl: picture || user.photoUrl,
        displayName: name || user.displayName,
        emailVerified: email_verified || user.emailVerified,
      },
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
          }
        }
      }
    });
  }

  return user;
}

// Helper function to generate JWT and set cookie
async function authenticateUser(user) {
  const token = jwt.sign(
    {
      userId: user.id,
      userType: user.userType,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 1 day
    path: '/',
  });

  // Prepare user data for response
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

  return userData;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, googleToken, authType } = body;

    // Handle Google OAuth signin
    if (authType === 'google' && googleToken) {
      const googlePayload = await verifyGoogleToken(googleToken);
      
      if (!googlePayload) {
        return Response.json({ error: 'Invalid Google token' }, { status: 401 });
      }

      const user = await handleGoogleUser(googlePayload);

      if (!user.isActive) {
        return Response.json({ error: 'Account is deactivated. Please contact support.' }, { status: 401 });
      }

      const userData = await authenticateUser(user);

      return Response.json({
        message: 'Google sign-in successful',
        user: userData
      });
    }

    // Handle traditional email/password signin
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
        googleId: true,
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

    // If user has Google account but no password, suggest Google signin
    if (user.googleId && !user.passwordHash) {
      return Response.json({ 
        error: 'This account uses Google Sign-In. Please sign in with Google.',
        suggestGoogleAuth: true 
      }, { status: 400 });
    }

    // Verify password
    if (!user.passwordHash) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const userData = await authenticateUser(user);

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
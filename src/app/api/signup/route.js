// app/api/signup/route.js
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@/generated/prisma'; // or '@prisma/client' if not using custom output
import { sendWelcomeEmail } from '@/lib/resend';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password, userType, displayName, phoneNumber } = await request.json();

    // Basic validation
    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 8) {
      return Response.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Validate user type - note: schema shows "lawyer" | "client" in comments
    const validUserTypes = ['client', 'lawyer'];
    if (userType && !validUserTypes.includes(userType)) {
      return Response.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return Response.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        userType: userType || 'client',
        displayName: displayName || null,
        phoneNumber: phoneNumber || null,
        // New fields with defaults from schema
        isActive: true,
        emailVerified: false,
      },
      select: {
        id: true,
        email: true,
        userType: true,
        displayName: true,
        phoneNumber: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
      }
    });

    // Send welcome email (async, don't wait for it)
    let emailSent = false;
    try {
      const emailResult = await sendWelcomeEmail(user.email, user.displayName, user.userType);
      
      if (emailResult.success) {
        console.log(`Welcome email sent to ${user.email}:`, emailResult.data.id);
        emailSent = true;
      } else {
        console.error('Failed to send welcome email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }

    return Response.json(
      {
        message: 'User created successfully',
        user,
        emailSent
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return Response.json(
        { error: 'Email already exists' },
        { status: 400 }
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
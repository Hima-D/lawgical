// app/api/signin/route.js
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@/generated/prisma';
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // You can create a session or JWT here if needed
    return Response.json({ message: 'Sign-in successful', user: { id: user.id, email: user.email } });

  } catch (error) {
    console.error('Sign-in error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

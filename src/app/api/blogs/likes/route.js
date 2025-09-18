import { PrismaClient } from '@/generated/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// GET /api/blogs/likes?userId=X - Fetch user’s liked blogs
export async function GET(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!token) {
    return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let user;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true },
    });

    if (!user || !userId || parseInt(userId) !== user.id) {
      return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return new Response(JSON.stringify({ success: false, message: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const likes = await prisma.blogLike.findMany({
      where: { userId: parseInt(userId) },
      select: { blogId: true },
    });

    return new Response(JSON.stringify({ success: true, data: likes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error fetching likes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/blogs/likes - Add a like
export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let user;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return new Response(JSON.stringify({ success: false, message: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { blogId, userId } = body;

    if (!blogId || !userId || isNaN(parseInt(blogId)) || parseInt(userId) !== user.id) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid request: blogId and userId are required and userId must match authenticated user' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if blog exists
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(blogId) },
    });

    if (!blog) {
      return new Response(JSON.stringify({ success: false, message: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const existingLike = await prisma.blogLike.findUnique({
      where: { blogId_userId: { blogId: parseInt(blogId), userId: parseInt(userId) } },
    });

    if (existingLike) {
      return new Response(JSON.stringify({ success: false, message: 'Already liked' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.blogLike.create({
      data: { blogId: parseInt(blogId), userId: parseInt(userId) },
    });

    return new Response(JSON.stringify({ success: true, message: 'Like added successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding like:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error adding like' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE /api/blogs/likes - Remove a like
export async function DELETE(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let user;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return new Response(JSON.stringify({ success: false, message: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { blogId, userId } = body;

    if (!blogId || !userId || isNaN(parseInt(blogId)) || parseInt(userId) !== user.id) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid request: blogId and userId are required and userId must match authenticated user' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const existingLike = await prisma.blogLike.findUnique({
      where: { blogId_userId: { blogId: parseInt(blogId), userId: parseInt(userId) } },
    });

    if (!existingLike) {
      return new Response(JSON.stringify({ success: false, message: 'Like not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.blogLike.delete({
      where: { blogId_userId: { blogId: parseInt(blogId), userId: parseInt(userId) } },
    });

    return new Response(JSON.stringify({ success: true, message: 'Like removed successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error removing like:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error removing like' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}
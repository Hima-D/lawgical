import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// GET /api/blogs - Fetch all published blogs (public)
// GET /api/blogs?slug=<slug> - Fetch a single blog by slug (public)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  try {
    if (slug) {
      // Fetch single blog by slug
      const blog = await prisma.blog.findUnique({
        where: { slug, isPublished: true },
        include: {
          author: { select: { displayName: true } },
          likes: { select: { id: true } },
        },
      });

      if (!blog) {
        return new Response(JSON.stringify({ success: false, message: 'Blog not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({ success: true, data: { ...blog, likeCount: blog.likes.length } }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      // Fetch all published blogs
      const blogs = await prisma.blog.findMany({
        where: { isPublished: true },
        include: {
          author: { select: { displayName: true } },
          likes: { select: { id: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      const blogsWithLikeCount = blogs.map((blog) => ({
        ...blog,
        likeCount: blog.likes.length,
        likes: undefined,
      }));

      return new Response(JSON.stringify({ success: true, data: blogsWithLikeCount }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error fetching blogs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/blogs - Create a new blog (lawyers only)
export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let user;
  try {
    if (!token) {
      return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, userType: true },
    });

    if (!user || user.userType !== 'lawyer') {
      return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await req.json();
    const { title, content, tags, coverImage, isPublished, authorId, slug } = data;

    // Validate required fields
    if (!title || !content || !authorId || !slug) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Ensure authorId matches authenticated user
    if (parseInt(authorId) !== user.id) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid author' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check for unique slug
    const existingSlug = await prisma.blog.findUnique({ where: { slug } });
    if (existingSlug) {
      return new Response(JSON.stringify({ success: false, message: 'Slug already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        tags,
        coverImage,
        isPublished,
        slug,
        authorId: parseInt(authorId),
      },
      include: {
        author: { select: { displayName: true } },
        likes: { select: { id: true } },
      },
    });

    return new Response(
      JSON.stringify({ success: true, data: { ...blog, likeCount: blog.likes.length } }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error creating blog' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {
  Heart,
  Share2,
  Calendar,
  User,
  Tag,
  AlertCircle,
  CheckCircle,
  Twitter,
  Linkedin,
  MessageCircle,
} from 'lucide-react';

const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [likedBlogs, setLikedBlogs] = useState(new Set());
  const [user, setUser] = useState(null);
  const { slug } = useParams(); // Get the slug from the URL
  const router = useRouter();

  // Fetch blog and user data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs?slug=${slug}`);
        const data = await response.json();
        if (data.success && data.data) {
          setBlog(data.data);
        } else {
          setErrorMessage('Blog post not found');
        }
      } catch (error) {
        setErrorMessage('Error fetching blog post');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          // Fetch user likes if authenticated
          const likesResponse = await fetch(`/api/blogs/likes?userId=${data.user.id}`);
          const likesData = await likesResponse.json();
          if (likesData.success) {
            setLikedBlogs(new Set(likesData.data.map((like) => like.blogId)));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchBlog();
    fetchUser();
  }, [slug]);

  // Handle like/unlike
  const handleLike = async (blogId) => {
    if (!user) {
      setErrorMessage('Please sign in to like a blog');
      return;
    }

    try {
      const response = await fetch('/api/blogs/likes', {
        method: likedBlogs.has(blogId) ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId, userId: user.id }),
      });
      const data = await response.json();
      if (data.success) {
        setLikedBlogs((prev) => {
          const newSet = new Set(prev);
          if (likedBlogs.has(blogId)) {
            newSet.delete(blogId);
          } else {
            newSet.add(blogId);
          }
          return newSet;
        });
        setBlog((prev) => ({
          ...prev,
          likeCount: likedBlogs.has(blogId) ? prev.likeCount - 1 : prev.likeCount + 1,
        }));
      } else {
        setErrorMessage(data.message || 'Failed to update like');
      }
    } catch (error) {
      setErrorMessage('Error updating like');
    }
  };

  // Handle social media sharing
  const handleShare = (blog, platform) => {
    const url = `${window.location.origin}/blogs/${blog.slug}`;
    const title = encodeURIComponent(blog.title);
    let shareUrl;

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800">
            <AlertCircle className="w-6 h-6" />
            <AlertDescription className="ml-3">{errorMessage}</AlertDescription>
          </Alert>
        </div>
        <Footer className="mt-16 bg-white shadow-lg border-t border-gray-200" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Header />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-white shadow-lg border border-gray-100">
          <CardHeader>
            {blog.coverImage && (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-t-lg mb-4"
              />
            )}
            <CardTitle className="text-3xl text-gray-900">{blog.title}</CardTitle>
            <CardDescription className="text-gray-600 flex items-center space-x-4">
              <span className="flex items-center">
                <User size={16} className="mr-1" />
                {blog.author.displayName || 'Anonymous'}
              </span>
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-gray-700 mb-6">
              {blog.content}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  <Tag size={14} className="mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLike(blog.id)}
                  className={`${
                    likedBlogs.has(blog.id)
                      ? 'bg-red-100 text-red-600 border-red-300'
                      : 'border-gray-300 text-gray-700'
                  } hover:bg-red-50`}
                  disabled={!user}
                >
                  <Heart
                    size={16}
                    className={likedBlogs.has(blog.id) ? 'fill-red-600' : ''}
                  />
                  <span className="ml-1">{blog.likeCount || 0}</span>
                </Button>
                <span className="text-sm text-gray-500">
                  {blog.likeCount ? `${blog.likeCount} people found this helpful` : 'Be the first to like!'}
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(blog, 'twitter')}
                  className="border-gray-300 text-gray-700 hover:bg-blue-50"
                >
                  <Twitter size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(blog, 'linkedin')}
                  className="border-gray-300 text-gray-700 hover:bg-blue-50"
                >
                  <Linkedin size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(blog, 'whatsapp')}
                  className="border-gray-300 text-gray-700 hover:bg-green-50"
                >
                  <MessageCircle size={16} />
                </Button>
              </div>
            </div>
            {errorMessage && (
              <Alert className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800">
                <AlertCircle className="w-6 h-6" />
                <AlertDescription className="ml-3">{errorMessage}</AlertDescription>
              </Alert>
            )}
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Back to Blogs
            </Button>
          </CardContent>
        </Card>
      </section>
      <Footer className="mt-16 bg-white shadow-lg border-t border-gray-200" />
    </div>
  );
};

export default BlogDetailPage;
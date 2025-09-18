'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  PlusCircle,
  Twitter,
  Linkedin,
  MessageCircle,
} from 'lucide-react';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [likedBlogs, setLikedBlogs] = useState(new Set());
  const [user, setUser] = useState(null);
  const router = useRouter();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      tags: '',
      coverImage: '',
      isPublished: false,
    },
  });

  // Fetch blogs and user data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        if (data.success) {
          setBlogs(data.data);
        } else {
          setErrorMessage('Failed to fetch blogs');
        }
      } catch (error) {
        setErrorMessage('Error fetching blogs');
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

    fetchBlogs();
    fetchUser();
  }, []);

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
        setBlogs((prev) =>
          prev.map((blog) =>
            blog.id === blogId
              ? { ...blog, likeCount: likedBlogs.has(blogId) ? blog.likeCount - 1 : blog.likeCount + 1 }
              : blog
          )
        );
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

  // Handle blog submission
  const onSubmit = async (data) => {
    if (!user || user.userType !== 'lawyer') {
      setErrorMessage('Only lawyers can post blogs');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
          authorId: user.id,
          slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSuccessMessage('Blog posted successfully!');
        setBlogs((prev) => [result.data, ...prev]);
        reset();
        setIsModalOpen(false);
      } else {
        setErrorMessage(result.message || 'Failed to post blog');
      }
    } catch (error) {
      setErrorMessage('Error posting blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Legal Insights{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore expert legal advice, updates, and insights from our experienced attorneys to stay informed and empowered.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Blog Button (Lawyers Only) */}
        {user?.userType === 'lawyer' && (
          <div className="flex justify-end mb-8">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <PlusCircle size={18} className="mr-2" />
                  Add New Blog
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                  <DialogTitle>Create a New Blog Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: 'Title is required', minLength: { value: 5, message: 'Title must be at least 5 characters' } }}
                      render={({ field }) => (
                        <Input
                          placeholder="Enter blog title"
                          {...field}
                          className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Content</label>
                    <Controller
                      name="content"
                      control={control}
                      rules={{ required: 'Content is required', minLength: { value: 50, message: 'Content must be at least 50 characters' } }}
                      render={({ field }) => (
                        <Textarea
                          placeholder="Write your blog content..."
                          rows={8}
                          {...field}
                          className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      )}
                    />
                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="e.g., legal, business, compliance"
                          {...field}
                          className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Cover Image URL (optional)</label>
                    <Controller
                      name="coverImage"
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Enter image URL"
                          {...field}
                          className="mt-1 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    />
                  </div>
                  <div className="flex items-center">
                    <Controller
                      name="isPublished"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      )}
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Publish immediately</label>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Posting...' : 'Post Blog'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Messages */}
        {successMessage && (
          <Alert className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800">
            <CheckCircle className="w-6 h-6" />
            <AlertDescription className="ml-3">{successMessage}</AlertDescription>
          </Alert>
        )}
        {errorMessage && (
          <Alert className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800">
            <AlertCircle className="w-6 h-6" />
            <AlertDescription className="ml-3">{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Blog List */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => router.push(`/blogs/${blog.slug}`)}
            >
              <CardHeader>
                {blog.coverImage && (
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                )}
                <CardTitle className="text-xl text-gray-900">{blog.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  By {blog.author.displayName || 'Anonymous'} •{' '}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-4">{blog.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      <Tag size={14} className="mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from navigating
                        handleLike(blog.id);
                      }}
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
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from navigating
                        handleShare(blog, 'twitter');
                      }}
                      className="border-gray-300 text-gray-700 hover:bg-blue-50"
                    >
                      <Twitter size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from navigating
                        handleShare(blog, 'linkedin');
                      }}
                      className="border-gray-300 text-gray-700 hover:bg-blue-50"
                    >
                      <Linkedin size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from navigating
                        handleShare(blog, 'whatsapp');
                      }}
                      className="border-gray-300 text-gray-700 hover:bg-green-50"
                    >
                      <MessageCircle size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer className="mt-16 bg-white shadow-lg border-t border-gray-200" />
    </div>
  );
};

export default BlogPage;
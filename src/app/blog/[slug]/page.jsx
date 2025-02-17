"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'Understanding Your Legal Rights',
    date: 'February 17, 2025',
    content: 'Full content of Understanding Your Legal Rights...',
    slug: 'understanding-your-legal-rights',
  },
  {
    title: 'How to Protect Your Business Legally',
    date: 'February 10, 2025',
    content: 'Full content of How to Protect Your Business Legally...',
    slug: 'how-to-protect-your-business-legally',
  },
  {
    title: 'The Importance of Contract Law',
    date: 'January 25, 2025',
    content: 'Full content of The Importance of Contract Law...',
    slug: 'importance-of-contract-law',
  },
];

const BlogPostPage = () => {
  const { slug } = useParams();  // Using useParams to get the slug parameter from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) {
      // Find the selected post by slug
      const selectedPost = blogPosts.find((post) => post.slug === slug);
      setPost(selectedPost);
    }
  }, [slug]);

  if (!slug) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-white">
        <p className="text-lg">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-4">{post.title}</h1>
      
      {/* Date */}
      <p className="text-sm text-gray-400 text-center mb-6">{post.date}</p>
      
      {/* Content */}
      <div className="text-lg text-gray-200 leading-relaxed mb-8">
        {post.content}
      </div>
      
      {/* Back to Blog Link */}
      <div className="text-center">
        <Link href="/blog" className="inline-block text-lg text-blue-500 hover:text-blue-700 font-semibold py-2 px-4 rounded-md border border-blue-500 hover:bg-blue-500 transition-all duration-300">
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogPostPage;

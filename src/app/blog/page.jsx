import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'Understanding Your Legal Rights',
    date: 'February 17, 2025',
    description: 'An in-depth guide on understanding your legal rights in various situations.',
    slug: 'understanding-your-legal-rights',
  },
  {
    title: 'How to Protect Your Business Legally',
    date: 'February 10, 2025',
    description: 'Learn about important legal steps to take when starting or protecting a business.',
    slug: 'how-to-protect-your-business-legally',
  },
  {
    title: 'The Importance of Contract Law',
    date: 'January 25, 2025',
    description: 'Why understanding contract law is crucial for both individuals and businesses.',
    slug: 'importance-of-contract-law',
  },
];

const BlogPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <Header />

      <div className="max-w-4xl mx-auto p-6">
        {/* Blog Title */}
        <h1 className="text-4xl font-extrabold text-center text-white bg-gray-800 py-6 mb-6 rounded-lg shadow-lg">
          Law Firm Blog
        </h1>

        {/* Blog Introduction */}
        <p className="text-lg text-center text-gray-400 mb-12">
          Stay informed with the latest legal insights, tips, and news.
        </p>

        {/* Blog Posts */}
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-gray-100"
            >
              <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{post.date}</p>
              <p className="text-lg text-gray-700 mt-4">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 mt-4 inline-block hover:text-blue-800 transition-colors"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogPage;

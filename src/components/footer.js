"use client";
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatusMessage('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setStatusMessage('Subscription successful! Thank you for joining our newsletter.');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  const services = [
    { name: 'POCSO', href: '/pocso' },
    { name: 'POSH', href: '/posh' },
    { name: 'Corporate Law', href: '/corporate-law' },
    { name: 'Litigation Services', href: '/litigation' },
    { name: 'Contract Law', href: '/contract-law' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '/aboutus' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' }
  ];

  const resourceLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Legal Resources', href: '/resources' }
  ];

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-8">
          <div>
            <Link href="/">
              <h2 className="text-3xl font-bold text-white">
                <span className="text-blue-400">Law</span>gical
              </h2>
            </Link>
            <p className="mt-4 text-white max-w-md">
              Expert legal services focused on transparency, ethics, and client success.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="mt-8 md:mt-0">
            <h4 className="text-lg font-bold mb-4 text-center md:text-right">Connect With Us</h4>
            <div className="flex gap-4">
              {[
                { platform: 'linkedin', icon: <FaLinkedin size={18} />, color: 'hover:bg-gray-700', url: 'https://www.linkedin.com/company/lawkaro/' },
                { platform: 'twitter', icon: <FaTwitter size={18} />, color: 'hover:bg-gray-700', url: 'https://twitter.com' },
                { platform: 'facebook', icon: <FaFacebook size={18} />, color: 'hover:bg-gray-700', url: 'https://facebook.com' },
                { platform: 'instagram', icon: <FaInstagram size={18} />, color: 'hover:bg-gray-700', url: 'https://instagram.com' }
              ].map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.platform}
                  className={`bg-gray-900 p-3 rounded-full ${item.color} transition-all duration-300`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white hover:text-gray-300 transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2 text-white">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="text-white hover:text-gray-300 transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2 text-white">›</span> {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-white hover:text-gray-300 transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2 text-white">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Stay Updated</h4>
            <div className="bg-gray-900 p-5 rounded-lg shadow-lg">
              <p className="mb-4 text-white">Subscribe to our newsletter for legal tips, updates, and exclusive insights.</p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 pl-4 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black py-3 rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-gray-200 font-medium"
                >
                  {loading ? (
                    <span className="animate-pulse">Subscribing...</span>
                  ) : (
                    <span className="flex items-center">
                      Subscribe <FaArrowRight className="ml-2" size={14} />
                    </span>
                  )}
                </button>
                {statusMessage && (
                  <div className={`mt-3 text-sm ${statusMessage.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
                    {statusMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Lawgical Legal Services. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-x-6">
              {['Sitemap', 'Accessibility', 'Legal Disclaimer', 'Cookie Policy'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, '-')}`} 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
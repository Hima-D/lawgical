"use client";
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusType, setStatusType] = useState('');

  // Clear status message after 5 seconds
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage('');
        setStatusType('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');
    setStatusType('');

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatusMessage('Please enter a valid email address.');
      setStatusType('error');
      setLoading(false);
      return;
    }

    try {
      // For demo purposes - would connect to actual API in production
      setTimeout(() => {
        setStatusMessage('Subscription successful! Thank you for joining our newsletter.');
        setStatusType('success');
        setEmail('');
        setLoading(false);
      }, 1000);
      
      // Uncomment for real API implementation
      /*
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatusMessage('Subscription successful! Thank you for joining our newsletter.');
        setStatusType('success');
        setEmail('');
      } else {
        setStatusMessage(data.error || 'Something went wrong, please try again.');
        setStatusType('error');
      }
      */
    } catch (error) {
      setStatusMessage('Failed to subscribe. Please try again.');
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  // Services data
  const services = [
    { name: 'POCSO (Prevention of Sexual Offenses)', href: '/pocso' },
    { name: 'POSH (Prevention of Sexual Harassment)', href: '/posh' },
    { name: 'Corporate Law', href: '/corporate-law' },
    { name: 'Litigation Services', href: '/litigation' },
    { name: 'Contract Law', href: '/contract-law' }
  ];

  // Company links
  const companyLinks = [
    { name: 'About Us', href: '/aboutus' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' }
  ];

  // Resources links
  const resourceLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Legal Resources', href: '/resources' }
  ];

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Top Section with Logo and Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-8">
          <div>
            <Link href="/">
              <Image 
                src="/next.svg" 
                alt="Lawgical"
                width={140}
                height={50}
                priority
                className="invert" // Makes logo white on dark background
              />
            </Link>
            <p className="mt-4 text-gray-300 max-w-md">
              Expert legal services with a focus on transparency, ethics, and client success.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mt-8 md:mt-0">
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+911234567890" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaPhone className="mr-3" size={16} />
                <span>+91 1234 567 890</span>
              </a>
              <a href="mailto:contact@lawgical.com" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaEnvelope className="mr-3" size={16} />
                <span>contact@lawgical.com</span>
              </a>
              <div className="flex items-start text-gray-300">
                <FaMapMarkerAlt className="mr-3 mt-1" size={16} />
                <span>123 Legal Avenue, Bangalore, Karnataka 560001</span>
              </div>
            </div>
          </div>

          {/* Social Media Links - Modern Design */}
          <div className="mt-8 md:mt-0">
            <h4 className="text-lg font-bold mb-4 text-center md:text-right">Connect With Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-all duration-300"
              >
                <FaLinkedin size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 transition-all duration-300"
              >
                <FaTwitter size={18} />
              </a>
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-800 transition-all duration-300"
              >
                <FaFacebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="text-blue-500 mr-2 transform group-hover:translate-x-1 transition-transform duration-300">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="text-blue-500 mr-2 transform group-hover:translate-x-1 transition-transform duration-300">›</span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="text-blue-500 mr-2 transform group-hover:translate-x-1 transition-transform duration-300">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section - Enhanced with better styling */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-800">Stay Updated</h4>
            <div className="bg-gray-900 p-5 rounded-lg">
              <p className="mb-4 text-gray-300">
                Subscribe to our newsletter for legal tips, regulatory updates, and exclusive insights.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 pl-4 pr-12 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-label="Email address for newsletter"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 py-3 px-4 rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-blue-700 focus:outline-none disabled:opacity-70"
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
                  <div className={`mt-3 text-sm ${statusType === 'success' ? 'text-green-400' : 'text-red-400'}`}>
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
              <Link href="/sitemap" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                Accessibility
              </Link>
              <Link href="/legal-disclaimer" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                Legal Disclaimer
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
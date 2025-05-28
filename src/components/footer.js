"use client";
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaArrowRight, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useState, useCallback, useRef, useEffect } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success', 'error', 'loading'
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const formRef = useRef(null);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  // Handle newsletter subscription with better UX
  const handleSubscribe = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');
    setStatusType('loading');

    // Enhanced email validation
    if (!email.trim()) {
      setStatusMessage('Email address is required.');
      setStatusType('error');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setStatusMessage('Please enter a valid email address.');
      setStatusType('error');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatusMessage('Thank you! You\'ve successfully subscribed to our newsletter.');
      setStatusType('success');
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatusMessage('');
        setStatusType('');
      }, 5000);
    } catch (error) {
      setStatusMessage('Something went wrong. Please try again later.');
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  }, [email]);

  // Clear status message when user starts typing
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    if (statusMessage && statusType === 'error') {
      setStatusMessage('');
      setStatusType('');
    }
  }, [statusMessage, statusType]);

  // Data arrays with enhanced information
  const services = [
    { name: 'POCSO (Prevention of Sexual Offenses)', href: '/pocso', shortName: 'POCSO' },
    { name: 'POSH (Prevention of Sexual Harassment)', href: '/posh', shortName: 'POSH' },
    { name: 'Corporate Law', href: '/corporate-law', shortName: 'Corporate Law' },
    { name: 'Litigation Services', href: '/litigation', shortName: 'Litigation' },
    { name: 'Contract Law', href: '/contract-law', shortName: 'Contract Law' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '/aboutus' },
    { name: 'Our Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' }
  ];

  const resourceLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Legal Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Legal Resources', href: '/resources' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Legal Disclaimer', href: '/legal-disclaimer' }
  ];

  const socialLinks = [
    { 
      platform: 'LinkedIn', 
      icon: <FaLinkedin size={20} />, 
      url: 'https://www.linkedin.com/company/lawkaro/',
      hoverColor: 'hover:bg-[#0077B5]'
    },
    { 
      platform: 'Twitter', 
      icon: <FaTwitter size={20} />, 
      url: 'https://twitter.com',
      hoverColor: 'hover:bg-[#1DA1F2]'
    },
    { 
      platform: 'Facebook', 
      icon: <FaFacebook size={20} />, 
      url: 'https://facebook.com',
      hoverColor: 'hover:bg-[#1877F2]'
    },
    { 
      platform: 'Instagram', 
      icon: <FaInstagram size={20} />, 
      url: 'https://instagram.com',
      hoverColor: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500'
    }
  ];

  const contactInfo = [
    { icon: <FaPhone size={16} />, text: '+91 (123) 456-7890', href: 'tel:+911234567890' },
    { icon: <FaEnvelope size={16} />, text: 'info@lawgical.com', href: 'mailto:info@lawgical.com' },
    { icon: <FaMapMarkerAlt size={16} />, text: 'Delhi, India', href: '#' }
  ];

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-16 pb-8">
          {/* Top Section with Logo and Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link href="/" className="inline-block group">
                <h2 className="text-4xl font-bold text-white transition-all duration-300 group-hover:scale-105">
                  <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    Law
                  </span>
                  <span className="group-hover:text-gray-200 transition-colors duration-300">
                    gical
                  </span>
                </h2>
              </Link>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Your trusted partner for comprehensive legal services. We provide expert guidance with 
                transparency, integrity, and unwavering commitment to your success.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <span className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </span>
                    <span>{contact.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Stay Informed</h3>
                <p className="text-gray-300">
                  Get the latest legal insights, case studies, and industry updates delivered to your inbox.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full p-4 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    required
                    disabled={loading}
                    aria-describedby={statusMessage ? "status-message" : undefined}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe to Newsletter</span>
                      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                    </>
                  )}
                </button>

                {/* Status Message */}
                {statusMessage && (
                  <div 
                    id="status-message"
                    className={`flex items-center gap-2 p-3 rounded-lg text-sm transition-all duration-300 ${
                      statusType === 'success' 
                        ? 'bg-green-900/50 text-green-300 border border-green-700/50' 
                        : 'bg-red-900/50 text-red-300 border border-red-700/50'
                    }`}
                    role={statusType === 'error' ? 'alert' : 'status'}
                  >
                    {statusType === 'success' ? (
                      <FaCheckCircle className="flex-shrink-0" />
                    ) : (
                      <FaExclamationTriangle className="flex-shrink-0" />
                    )}
                    <span>{statusMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Links */}
            <div>
              <h4 className="text-xl font-bold mb-6 pb-2 border-b-2 border-blue-400 text-white">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                    >
                      <span className="mr-3 text-blue-400 transition-transform duration-300 group-hover:translate-x-1">›</span> 
                      <span className="border-b border-transparent group-hover:border-blue-400 transition-all duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Section */}
            <div>
              <h4 className="text-xl font-bold mb-6 pb-2 border-b-2 border-blue-400 text-white">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link 
                      href={service.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                      title={service.name}
                    >
                      <span className="mr-3 text-blue-400 transition-transform duration-300 group-hover:translate-x-1">›</span> 
                      <span className="border-b border-transparent group-hover:border-blue-400 transition-all duration-300">
                        {service.shortName}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h4 className="text-xl font-bold mb-6 pb-2 border-b-2 border-blue-400 text-white">Resources</h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                    >
                      <span className="mr-3 text-blue-400 transition-transform duration-300 group-hover:translate-x-1">›</span> 
                      <span className="border-b border-transparent group-hover:border-blue-400 transition-all duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media Section */}
            <div>
              <h4 className="text-xl font-bold mb-6 pb-2 border-b-2 border-blue-400 text-white">Connect With Us</h4>
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Follow us for legal updates and insights
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.platform}`}
                      className={`bg-gray-800 p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.hoverColor} group`}
                    >
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-center lg:text-left">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Lawgical Legal Services. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Professional legal services with integrity and excellence.
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-end gap-6">
                {legalLinks.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href} 
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 border-b border-transparent hover:border-gray-400"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Additional Bottom Text */}
            <div className="mt-6 pt-6 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-xs">
                This website is for informational purposes only and does not constitute legal advice. 
                Consult with a qualified attorney for specific legal matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
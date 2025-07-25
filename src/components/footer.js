"use client";
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white text-gray-800 py-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <Link href="/" className="text-3xl font-extrabold text-gray-800 tracking-wide">
            <span className="text-blue-600">Law</span>gical
          </Link>
          <p className="text-sm text-gray-500 mt-1 font-light">
            Trusted Legal & Compliance Solutions
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-8 text-sm font-medium flex-wrap text-gray-700">
          <Link href="/aboutus" className="hover:text-blue-600 transition duration-200">About</Link>
          <Link href="/contact" className="hover:text-blue-600 transition duration-200">Contact</Link>
          <Link href="/privacy-policy" className="hover:text-blue-600 transition duration-200">Privacy</Link>
          <Link href="/terms-of-service" className="hover:text-blue-600 transition duration-200">Terms</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-end gap-5 text-gray-700">
          <a href="https://www.linkedin.com/company/lawkaro/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaLinkedin size={22} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaTwitter size={22} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram size={22} />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-300 pt-4">
        © {currentYear} Lawgical Legal Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

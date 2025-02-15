"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-primary text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/lawyer-portal-logo.svg"  // Update with your actual logo
            alt="Lawyer Portal Logo"
            width={150}
            height={40}
            priority
          />
          <span className="font-bold text-2xl">Lawyer Portal</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden sm:block">
          <ul className="flex gap-8 text-lg font-medium">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cases" className="hover:text-gray-300">
                Cases
              </Link>
            </li>
            <li>
              <Link href="/discussions" className="hover:text-gray-300">
                Discussions
              </Link>
            </li>
            <li>
              <Link href="/aboutus" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Profile or Authentication Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/signin" className="px-4 py-2 bg-white text-primary rounded-full hover:bg-gray-100">
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-transparent border-2 border-white text-white rounded-full hover:bg-gray-700"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="sm:hidden flex items-center">
          <button
            aria-label="Menu"
            onClick={toggleMenu}
            className="text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Toggle visibility */}
      {isMenuOpen && (
        <div className="sm:hidden bg-primary text-white py-4 px-6">
          <ul className="space-y-4">
            <li>
              <Link href="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link href="/cases" className="hover:text-gray-300">Cases</Link>
            </li>
            <li>
              <Link href="/discussions" className="hover:text-gray-300">Discussions</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">Contact</Link>
            </li>
            <li>
              <Link href="/signin" className="block py-2 text-center bg-transparent border-2 border-white text-white rounded-full">Login</Link>
            </li>
            <li>
              <Link href="/signup" className="block py-2 text-center bg-transparent border-2 border-white text-white rounded-full">Sign Up</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Handle search input change
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Submit search (you can integrate actual search functionality here)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add search functionality here
  };

  return (
    <header className="bg-primary text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/lawyer-portal-logo.svg"  // Update with your actual logo path
            alt="Logo"
            width={150}
            height={40}
            priority
          />
        </div>

        {/* Navigation Links, Search, and Get Started Button */}
        <nav className="hidden sm:flex items-center gap-8 text-lg font-medium">
          <ul className="flex gap-8">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            {/* Removed Discussions link, added Book Service link */}
            <li>
              <Link href="/bookservice" className="hover:text-gray-300">
                Book Service
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="px-4 py-2 bg-transparent border-2 border-white text-white rounded-full hover:bg-gray-700"
              >
                Get Started
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center relative ml-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-white text-black py-2 px-4 rounded-lg shadow-md w-48 sm:w-72"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3a8 8 0 100 16 8 8 0 000-16zm0 3a5 5 0 110 10 5 5 0 010-10zm8 9l-4.35-4.35"></path>
              </svg>
            </button>
          </form>
        </nav>

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
            {/* Mobile menu: Removed Discussions link, added Book Service link */}
            <li>
              <Link href="/bookservice" className="hover:text-gray-300">Book Service</Link>
            </li>
            <li>
              <Link href="/signup" className="block py-2 text-center bg-transparent border-2 border-white text-white rounded-full">Get Started</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

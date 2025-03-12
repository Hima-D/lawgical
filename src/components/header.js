"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle search input change
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Simulating a search function (this can be connected to a backend or database later)
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Simulating search results (you can replace this with an actual search query to an API or database)
    const simulatedResults = [
      'Corporate Law Guide',
      'POCSO Legal Procedures',
      'POSH Workplace Guidelines',
      'Contract Law Best Practices',
      'Litigation Services Overview',
    ].filter((result) =>
      result.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(simulatedResults);
  };

  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/next.svg"  // Update with your actual logo path
            alt="Lawgical"
            width={150}
            height={40}
            priority
          />
        </div>

        {/* Navigation Links, Search, and Get Started Button */}
        <nav className="hidden sm:flex items-center gap-8 text-lg font-semibold">
          <ul className="flex gap-8">
            {/* Home */}
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">
                Home
              </Link>
            </li>

            {/* Services with Hover Dropdown */}
            <li className="relative group">
              <Link href="#" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">
                Services
              </Link>
              <div className="absolute left-0 hidden bg-primary text-white py-2 px-4 w-48 group-hover:block shadow-lg rounded-lg">
                <ul>
                  <li>
                    <Link href="/posco" className="block py-2 hover:text-gray-300">POSCO (Prevention of Sexual Offenses)</Link>
                  </li>
                  <li>
                    <Link href="/posh" className="block py-2 hover:text-gray-300">POSH (Prevention of Sexual Harassment)</Link>
                  </li>
                  <li>
                    <Link href="/corporate-law" className="block py-2 hover:text-gray-300">Corporate Law</Link>
                  </li>
                  <li>
                    <Link href="/litigation" className="block py-2 hover:text-gray-300">Litigation Services</Link>
                  </li>
                  <li>
                    <Link href="/contract-law" className="block py-2 hover:text-gray-300">Contract Law</Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Book Service */}
            <li>
              <Link href="/bookservice" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">
                Book Service
              </Link>
            </li>

            {/* Get Started Button */}
            <li>
              <Link
                href="/signup"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out"
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
              className="bg-white text-black py-2 px-4 rounded-lg shadow-md w-48 sm:w-72 transition-all duration-300 ease-in-out"
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

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute mt-2 bg-white text-black rounded-lg shadow-lg w-72 z-10">
              <ul className="max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <li key={index} className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
                    <Link href={`/search-results?query=${result}`} className="block">
                      {result}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
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

      {/* Mobile Menu - Toggle visibility */}
      {isMenuOpen && (
        <div className="sm:hidden bg-black text-white py-4 px-6">
          <ul className="space-y-4">
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">Home</Link>
            </li>
            <li>
              <Link href="/bookservice" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">Book Service</Link>
            </li>
            <li>
              <Link href="/signup" className="block py-2 text-center bg-transparent border-2 border-white text-white rounded-full hover:bg-gray-700 transition-colors duration-300 ease-in-out">Get Started</Link>
            </li>
            {/* Mobile Services */}
            <li className="relative group">
              <Link href="#" className="hover:text-gray-300 transition-colors duration-300 ease-in-out">
                Services
              </Link>
              <div className="absolute left-0 hidden bg-primary text-white py-2 px-4 w-48 group-hover:block shadow-lg rounded-lg">
                <ul>
                  <li>
                    <Link href="/posco" className="block py-2 hover:text-gray-300">POSCO (Prevention of Sexual Offenses)</Link>
                  </li>
                  <li>
                    <Link href="/posh" className="block py-2 hover:text-gray-300">POSH (Prevention of Sexual Harassment)</Link>
                  </li>
                  <li>
                    <Link href="/corporate-law" className="block py-2 hover:text-gray-300">Corporate Law</Link>
                  </li>
                  <li>
                    <Link href="/litigation" className="block py-2 hover:text-gray-300">Litigation Services</Link>
                  </li>
                  <li>
                    <Link href="/contract-law" className="block py-2 hover:text-gray-300">Contract Law</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

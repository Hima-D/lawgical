"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const mobileMenuRef = useRef(null);
  const searchResultsRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileServices = () => setIsMobileServicesOpen(!isMobileServicesOpen);

  // Handle search input change
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Simulating a search function
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Simulating search results
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

  // Services list - centralized for reuse
  const servicesList = [
    { name: 'POCSO (Prevention of Sexual Offenses)', href: '/pocso' },
    { name: 'POSH (Prevention of Sexual Harassment)', href: '/posh' },
    { name: 'Corporate Law', href: '/corporate-law' },
    { name: 'Litigation Services', href: '/litigation' },
    { name: 'Contract Law', href: '/contract-law' },
  ];

  return (
    <header className="bg-black text-white py-4 shadow-md relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/next.svg"  // Update with your actual logo path
              alt="Lawgical"
              width={150}
              height={40}
              priority
              className="transition-transform transform hover:scale-105 duration-300"
            />
          </Link>
        </div>

        {/* Navigation Links, Search, and Get Started Button */}
        <nav className="hidden sm:flex items-center gap-8 text-lg font-semibold">
          <ul className="flex gap-8">
            {/* Home */}
            <li>
              <Link href="/" className="hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                Home
              </Link>
            </li>

            {/* Services with Hover Dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1 hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-gradient-to-t from-black via-gray-800 to-black text-white py-3 px-6 w-60 shadow-xl rounded-lg z-50 transition-all duration-300 ease-in-out transform origin-top scale-95 group-hover:scale-100">
                <ul className="space-y-1">
                  {servicesList.map((service, index) => (
                    <li key={index}>
                      <Link 
                        href={service.href} 
                        className="block py-2 px-3 rounded hover:bg-gray-700 transition-all duration-300 ease-in-out"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Book Service */}
            <li>
              <Link href="/bookservice" className="hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                Book Service
              </Link>
            </li>

            {/* Get Started Button */}
            <li>
              <Link
                href="/signup"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Get Started
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="relative ml-6">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
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
                <svg className="w-6 h-6 transition-all duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3a8 8 0 100 16 8 8 0 000-16zm0 3a5 5 0 110 10 5 5 0 010-10zm8 9l-4.35-4.35"></path>
                </svg>
              </button>
            </form>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div 
                ref={searchResultsRef}
                className="absolute top-full mt-2 bg-white text-black rounded-lg shadow-lg w-full z-10"
              >
                <ul className="max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <li key={index} className="py-2 px-4 hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
                      <Link href={`/search-results?query=${encodeURIComponent(result)}`} className="block">
                        {result}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="sm:hidden">
          <button
            aria-label="Menu"
            onClick={toggleMenu}
            className="text-white p-2 transition-transform transform hover:scale-105 duration-300"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide in from top */}
      {isMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="sm:hidden fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto"
          style={{ top: '76px' }} // Adjust based on your header height
        >
          <div className="px-6 py-6 flex flex-col gap-6">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-white text-black py-3 px-4 rounded-lg shadow-md"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3a8 8 0 100 16 8 8 0 000-16zm0 3a5 5 0 110 10 5 5 0 010-10zm8 9l-4.35-4.35"></path>
                </svg>
              </button>
            </form>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="bg-white text-black rounded-lg shadow-lg w-full">
                <ul className="max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <li key={index} className="py-3 px-4 hover:bg-gray-200 cursor-pointer border-b border-gray-200 last:border-b-0">
                      <Link href={`/search-results?query=${encodeURIComponent(result)}`} className="block">
                        {result}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="text-white font-medium">
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/" 
                    className="block py-3 px-4 hover:bg-gray-800 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                
                {/* Services Dropdown */}
                <li>
                  <button 
                    onClick={toggleMobileServices}
                    className="flex items-center justify-between w-full py-3 px-4 hover:bg-gray-800 rounded-lg transition-all duration-300"
                  >
                    <span>Services</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {/* Expanded Services Menu */}
                  {isMobileServicesOpen && (
                    <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-700 pl-4">
                      {servicesList.map((service, index) => (
                        <li key={index}>
                          <Link 
                            href={service.href} 
                            className="block py-2 px-3 hover:bg-gray-800 rounded-lg transition-all duration-300"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                
                <li>
                  <Link 
                    href="/bookservice" 
                    className="block py-3 px-4 hover:bg-gray-800 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book Service
                  </Link>
                </li>
                
                <li className="pt-4">
                  <Link 
                    href="/signup"
                    className="block py-3 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
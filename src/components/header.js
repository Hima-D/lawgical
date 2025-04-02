"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const { setTheme } = useTheme();

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click was outside the menu and menu is open
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label]')) {
        setIsMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle menu functions
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false); // Also close the services submenu
  };
  const toggleMobileServices = () => setIsMobileServicesOpen(!isMobileServicesOpen);

  // Services list - centralized for reuse
  const servicesList = [
    { name: 'POCSO (Prevention of Sexual Offenses)', href: '/pocso' },
    { name: 'POSH (Prevention of Sexual Harassment)', href: '/posh' },
    { name: 'Corporate Law', href: '/corporate-law' },
    { name: 'Litigation Services', href: '/litigation' },
    { name: 'Contract Law', href: '/contract-law' },
  ];

  // Close menu when route changes
  const handleLinkClick = () => {
    closeMenu();
  };

  // Theme toggle component
  const ThemeToggle = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="bg-transparent border-gray-700 hover:bg-gray-800">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
          <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-gray-800">
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-gray-800">
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-gray-800">
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="bg-black text-white py-4 shadow-md relative z-40">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12">
        {/* Text Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" onClick={handleLinkClick}>
            <h2 className="text-3xl font-bold text-white">
              <span className="text-blue-400">Law</span>gical
            </h2>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden sm:flex items-center gap-8 text-lg font-semibold">
          <ul className="flex gap-8 items-center">
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

            {/* Team - Added as requested */}
            <li>
              <Link href="/team" className="hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                Team
              </Link>
            </li>

            {/* Book Service */}
            <li>
              <Link href="/bookservice" className="hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105">
                Book Service
              </Link>
            </li>
            
            {/* Theme Toggle */}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button (Hamburger/Close) and Theme Toggle */}
        <div className="sm:hidden flex items-center gap-3">
          <ThemeToggle />
          
          <button
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
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
            {/* Navigation Links */}
            <nav className="text-white font-medium">
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/" 
                    className="block py-3 px-4 hover:bg-gray-800 rounded-lg transition-all duration-300"
                    onClick={handleLinkClick}
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
                            onClick={handleLinkClick}
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                
                {/* Team - Added to mobile menu */}
                <li>
                  <Link 
                    href="/team" 
                    className="block py-3 px-4 hover:bg-gray-800 rounded-lg transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    Team
                  </Link>
                </li>
                
                <li>
                  <Link 
                    href="/bookservice" 
                    className="block py-3 px-4 hover:bg-gray-800 rounded-lg transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    Book Service
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
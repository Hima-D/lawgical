"use client";
import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Moon, Sun, ChevronDown } from "lucide-react";
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
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const mobileMenuRef = useRef(null);
  const servicesTimeoutRef = useRef(null);
  const { setTheme, theme } = useTheme();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Services list - centralized for reuse
  const servicesList = [
    { name: 'POCSO (Prevention of Sexual Offenses)', href: '/pocso', description: 'Legal protection for minors' },
    { name: 'POSH (Prevention of Sexual Harassment)', href: '/posh', description: 'Workplace harassment law' },
    { name: 'Corporate Law', href: '/corporate-law', description: 'Business legal services' },
    { name: 'Litigation Services', href: '/litigation', description: 'Court representation' },
    { name: 'Contract Law', href: '/contract-law', description: 'Agreement drafting & review' },
  ];

  // Navigation items
  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Team', href: '/team' },
    { name: 'Book Service', href: '/bookservice' },
  ];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label]')) {
        setIsMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle menu functions
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    setIsMobileServicesOpen(false);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, []);

  const toggleMobileServices = useCallback(() => {
    setIsMobileServicesOpen(prev => !prev);
  }, []);

  // Services hover handlers with delay
  const handleServicesMouseEnter = useCallback(() => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setIsServicesHovered(true);
  }, []);

  const handleServicesMouseLeave = useCallback(() => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesHovered(false);
    }, 150);
  }, []);

  // Close menu when route changes
  const handleLinkClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current);
      }
    };
  }, []);

  // Theme toggle component
  const ThemeToggle = () => {
    if (!mounted) {
      return (
        <Button variant="outline" size="icon" className="bg-transparent border-gray-700 hover:bg-gray-800">
          <div className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-transparent border-gray-700 hover:bg-gray-800 transition-all duration-200"
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
          <DropdownMenuItem 
            onClick={() => setTheme("light")} 
            className="hover:bg-gray-800 focus:bg-gray-800"
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("dark")} 
            className="hover:bg-gray-800 focus:bg-gray-800"
          >
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("system")} 
            className="hover:bg-gray-800 focus:bg-gray-800"
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="bg-black text-white py-4 shadow-lg relative z-40 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12">
        {/* Logo */}
        <div className="flex items-center">
          <Link 
            href="/" 
            onClick={handleLinkClick}
            className="group transition-transform duration-200 hover:scale-105"
          >
            <h1 className="text-3xl font-bold text-white">
              <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-200">
                Law
              </span>
              <span className="group-hover:text-gray-200 transition-colors duration-200">
                gical
              </span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-lg font-medium" role="navigation">
          <ul className="flex gap-8 items-center">
            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="relative py-2 hover:text-blue-400 transition-all duration-200 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
            ))}

            {/* Services Dropdown */}
            <li className="relative">
              <div
                className="group"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button 
                  className="flex items-center gap-1 py-2 hover:text-blue-400 transition-all duration-200 group"
                  aria-expanded={isServicesHovered}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isServicesHovered ? 'rotate-180' : ''
                    }`} 
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                </button>

                {/* Desktop Services Dropdown */}
                <div 
                  className={`absolute left-0 mt-2 bg-gray-900 border border-gray-700 text-white py-3 px-1 w-80 shadow-2xl rounded-lg z-50 transition-all duration-200 origin-top ${
                    isServicesHovered 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <ul className="space-y-1">
                    {servicesList.map((service, index) => (
                      <li key={index}>
                        <Link 
                          href={service.href} 
                          className="block py-3 px-4 rounded-md hover:bg-gray-800 transition-all duration-200 group"
                        >
                          <div className="font-medium text-white group-hover:text-blue-400 transition-colors duration-200">
                            {service.name}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {service.description}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            
            {/* Theme Toggle */}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          
          <button
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="text-white p-2 rounded-md hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 top-3' : 'top-1'
              }`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 top-3 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 top-3' : 'top-5'
              }`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black transition-all duration-300 z-50 ${
          isMenuOpen 
            ? 'bg-opacity-95 backdrop-blur-sm' 
            : 'bg-opacity-0 pointer-events-none backdrop-blur-none'
        }`}
        style={{ top: '84px' }}
      >
        <div 
          ref={mobileMenuRef}
          className={`h-full overflow-y-auto transition-all duration-300 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="px-6 py-6">
            <nav className="text-white" role="navigation">
              <ul className="space-y-2">
                {/* Mobile Navigation Items */}
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                
                {/* Mobile Services Dropdown */}
                <li>
                  <button 
                    onClick={toggleMobileServices}
                    className="flex items-center justify-between w-full py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
                    aria-expanded={isMobileServicesOpen}
                  >
                    <span>Services</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isMobileServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {/* Mobile Services Submenu */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isMobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <ul className="mt-2 ml-4 space-y-1 border-l-2 border-gray-700 pl-4">
                      {servicesList.map((service, index) => (
                        <li key={index}>
                          <Link 
                            href={service.href} 
                            className="block py-2 px-3 rounded-lg hover:bg-gray-800 transition-all duration-200"
                            onClick={handleLinkClick}
                          >
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-400 mt-1">
                              {service.description}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
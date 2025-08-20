"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  ChevronDown,
  ShieldCheck,
  Users,
  Briefcase,
  Gavel,
  FileText,
  ExternalLink,
  Phone,
  Mail
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const servicesList = [
  { 
    name: "POCSO", 
    href: "/pocso", 
    description: "Legal protection for minors", 
    icon: ShieldCheck,
    color: "text-red-500"
  },
  { 
    name: "POSH", 
    href: "/posh", 
    description: "Workplace harassment law", 
    icon: Users,
    color: "text-purple-500"
  },
  { 
    name: "Corporate Law", 
    href: "/corporate-law", 
    description: "Business legal services", 
    icon: Briefcase,
    color: "text-blue-500"
  },
  { 
    name: "Litigation", 
    href: "/litigation", 
    description: "Court representation", 
    icon: Gavel,
    color: "text-orange-500"
  },
  { 
    name: "Contract Law", 
    href: "/contract-law", 
    description: "Agreement drafting & review", 
    icon: FileText,
    color: "text-green-500"
  },
];

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/service" },
  { name: "Consultation", href: "/consultation" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header 
      className={`fixed top-0 w-full border-b bg-white/95 backdrop-blur-sm text-black z-50 transition-all duration-300 ${
        isScrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 group"
          aria-label="Lawgical Home"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Gavel className="w-4 h-4 text-white" />
          </div>
          <span className="text-2xl font-bold">
            <span className="text-blue-600 group-hover:text-blue-700 transition-colors">Law</span>
            <span className="group-hover:text-gray-700 transition-colors">gical</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
            >
              {item.name}
            </Link>
          ))}

          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 h-auto font-medium transition-all duration-200"
              >
                Legal Services <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-white border border-gray-100 shadow-xl rounded-xl p-2"
            >
              <div className="px-3 py-2 border-b border-gray-100 mb-2">
                <h3 className="font-semibold text-gray-900">Our Legal Services</h3>
                <p className="text-sm text-gray-500">Expert legal assistance across domains</p>
              </div>
              {servicesList.map(({ name, href, description, icon: Icon, color }) => (
                <DropdownMenuItem key={name} className="p-0">
                  <Link
                    href={href}
                    className="flex items-start gap-3 w-full px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <Icon className={`w-5 h-5 ${color} mt-0.5 group-hover:scale-110 transition-transform`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {name}
                      </div>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        {description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <div className="px-3 py-2">
                <Link
                  href="/services"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  View all services →
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Button 
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                    <Gavel className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-blue-600">Law</span>gical
                </SheetTitle>
              </SheetHeader>
              
              <nav className="mt-6 space-y-2">
                {navigationItems.map((item) => (
                  <SheetClose key={item.name} asChild>
                    <Link
                      href={item.href}
                      className="flex items-center rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="mb-3 px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Legal Services
                  </p>
                  <div className="space-y-1">
                    {servicesList.map(({ name, href, icon: Icon, color }) => (
                      <SheetClose key={name} asChild>
                        <Link
                          href={href}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors group"
                        >
                          <Icon className={`w-4 h-4 ${color} flex-shrink-0 group-hover:scale-110 transition-transform`} />
                          <span className="font-medium">{name}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                  <SheetClose asChild>
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Link href="/signin">Sign In</Link>
                    </Button>
                  </SheetClose>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <a href="tel:+91-123-456-7890" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <Phone className="w-3 h-3" />
                      Call Us
                    </a>
                    <a href="mailto:support@lawgical.tech" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <Mail className="w-3 h-3" />
                      Email
                    </a>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header> 
  );
};

export default Header;
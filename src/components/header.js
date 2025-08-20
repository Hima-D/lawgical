"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Menu,
  ChevronDown,
  ShieldCheck,
  Users,
  Briefcase,
  Gavel,
  FileText,
  Monitor
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";

const servicesList = [
  { name: "POCSO", href: "/pocso", description: "Legal protection for minors", icon: ShieldCheck },
  { name: "POSH", href: "/posh", description: "Workplace harassment law", icon: Users },
  { name: "Corporate Law", href: "/corporate-law", description: "Business legal services", icon: Briefcase },
  { name: "Litigation", href: "/litigation", description: "Court representation", icon: Gavel },
  { name: "Contract Law", href: "/contract-law", description: "Agreement drafting & review", icon: FileText },
];

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Service", href: "/service" },
  { name: "Consultation", href: "/consultation" },
  { name: "Signup", href: "/signup" },

];

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <header className="w-full border-b border-gray-200 bg-white text-black z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-black">
          <span className="text-blue-600">Law</span>gical
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-black hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-black hover:text-blue-600 hover:bg-transparent p-0 h-auto font-normal"
              >
                Explore <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-80 bg-white border border-gray-200"
            >
              {servicesList.map(({ name, href, description, icon: Icon }) => (
                <DropdownMenuItem key={name} className="p-0">
                  <Link
                    href={href}
                    className="flex items-start gap-3 w-full px-3 py-3 hover:bg-gray-100 rounded-sm"
                  >
                    <Icon className="w-5 h-5 text-blue-500 mt-1" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{name}</div>
                      <p className="text-sm text-gray-600 mt-1 leading-snug">
                        {description}
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <nav className="mt-6 space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="mb-3 px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Services
                  </p>
                  <div className="space-y-1">
                    {servicesList.map(({ name, href, icon: Icon }) => (
                      <Link
                        key={name}
                        href={href}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="font-medium">{name}</span>
                      </Link>
                    ))}
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

const ThemeToggle = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      
    </DropdownMenu>
  );
};
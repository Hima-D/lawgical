"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { 
  Star, 
  CheckCircle, 
  FileText, 
  Gavel, 
  Users, 
  Shield, 
  Search,
  ArrowLeft,
  MessageCircle,
  Zap,
  Award,
  ChevronRight
} from "lucide-react";

// Enhanced Button Component with better mobile touch targets
const Button = ({ children, variant = "default", size = "default", className = "", asChild = false, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-95 touch-manipulation";

  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl",
    destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white backdrop-blur-sm",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "underline-offset-4 hover:underline text-blue-600",
    gradient: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl",
  };

  const sizes = {
    default: "h-12 py-3 px-6 text-base min-w-[120px]",
    sm: "h-10 px-4 text-sm min-w-[100px]",
    lg: "h-14 px-8 text-lg min-w-[140px]",
    icon: "h-12 w-12",
  };

  if (asChild) {
    const child = children;
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        className: `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${child.props.className || ''}`,
        ...props
      });
    }
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced Card Component with better mobile design
const Card = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm hover:shadow-md",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl",
    gradient: "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg",
  };

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, className = "" }) => {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Error Boundary with better mobile UX
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      console.error("ErrorBoundary caught:", error);
      setHasError(true);
    };
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
        <Card className="text-center p-8 max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">Please refresh the page or try again later.</p>
          <Button
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Refresh Page
          </Button>
        </Card>
      </div>
    );
  }

  return children;
};

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add custom animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(1deg); }
        66% { transform: translateY(-5px) rotate(-1deg); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
      }
      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!mounted) return null;

  const quickActions = [
    {
      icon: Search,
      title: "Search Legal Services",
      description: "Find the exact legal help you need",
      color: "blue",
      link: "/search",
    },
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Get instant help from our experts",
      color: "green",
      link: "/chat",
    },
    {
      icon: Gavel,
      title: "Free Consultation",
      description: "Book a consultation with our lawyers",
      color: "purple",
      link: "/consultation",
    },
  ];

  const stats = [
    { icon: Users, value: "1M+", label: "Happy Clients", color: "text-blue-600" },
    { icon: Award, value: "500+", label: "Legal Experts", color: "text-green-600" },
    { icon: Shield, value: "99.9%", label: "Success Rate", color: "text-purple-600" },
    { icon: Zap, value: "24/7", label: "Support", color: "text-orange-600" },
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement delay={0} className="absolute top-20 left-10 opacity-20">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl"></div>
          </FloatingElement>
          <FloatingElement delay={2} className="absolute top-40 right-20 opacity-20">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-xl"></div>
          </FloatingElement>
          <FloatingElement delay={4} className="absolute bottom-40 left-1/4 opacity-20">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl"></div>
          </FloatingElement>
        </div>

        <Head>
          <title>404 - Page Not Found | Lawgical</title>
          <meta
            name="description"
            content="The legal document or page you are looking for cannot be found. Our legal experts at Lawgical are ready to assist you."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        {/* Main 404 Section - Mobile First Design */}
        <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Content Section */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                    <Zap className="w-4 h-4 mr-2" />
                    Error 404
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Page{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 animate-pulse-glow">
                    Not Found
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  The legal document or page you&apos;re looking for doesn&apos;t exist, but don&apos;t worry! 
                  Our expert legal team is here to guide you to the right solution.
                </p>

                {/* Action Buttons - Responsive Stack */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <Link href="/" className="flex items-center justify-center">
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <Link href="/consultation" className="flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Free Consultation
                    </Link>
                  </Button>
                </div>

                {/* Stats Grid - Mobile Optimized */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
                      <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-1`} />
                      <div className="font-bold text-lg text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Section */}
              <div className="relative order-1 lg:order-2">
                <Card variant="glass" className="p-6 sm:p-8">
                  {/* 404 Illustration */}
                  <div className="text-center mb-6">
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
                      <div className="absolute inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl sm:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                          404
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
                    Let&apos;s Get You Back on Track
                  </h3>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    {quickActions.map((action, index) => (
                      <Link 
                        key={index} 
                        href={action.link}
                        className="group block p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md active:scale-98"
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 w-12 h-12 bg-${action.color}-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-${action.color}-200 transition-colors`}>
                            <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {action.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                              {action.description}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Help Section */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-1">Need Immediate Help?</h4>
                      <p className="text-sm text-gray-600 mb-3">Our support team is available 24/7</p>
                      <Button size="sm" variant="gradient" className="w-full">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </ErrorBoundary>
  );
}
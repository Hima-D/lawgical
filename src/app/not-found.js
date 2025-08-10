"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Star, CheckCircle, FileText, Gavel, Users, Shield } from "lucide-react";

// shadcn/ui Components (custom implementations as in homepage)
const Button = ({ children, variant = "default", size = "default", className = "", asChild = false, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  // Fixed: Handle asChild prop properly without Slot dependency
  if (asChild) {
    // If asChild is true, we expect children to be a single React element
    // that we can clone with additional props
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

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Error Boundary (reused from homepage for consistency)
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">Please refresh the page or try again later.</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default function NotFoundPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
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

        {/* Main 404 Section - Styled similarly to Hero section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  404 - Page{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Not Found
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Oops! The legal document or page you&apos;re looking for doesn&apos;t exist. Don&apos;t worry, our legal experts at Lawgical are here to help you find what you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-blue-600 text-white px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                    asChild
                  >
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all"
                    asChild
                  >
                    <Link href="/consultation">Free Consultation</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>1M+ Happy Clients</span>
                  </div>
                  <div className="flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>500+ Legal Experts</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <Image
                    src="/images/lawgical-404.svg"
                    alt="404 - Page Not Found"
                    width={400}
                    height={400}
                    className="mx-auto mb-6"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">We&apos;re Here to Help</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <FileText className="h-8 w-8 text-blue-600 mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Search Our Services</h4>
                        <p className="text-sm text-gray-600">Explore legal solutions tailored for you</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                      <Users className="h-8 w-8 text-green-600 mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Contact Support</h4>
                        <p className="text-sm text-gray-600">24/7 expert assistance available</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <Shield className="h-8 w-8 text-purple-600 mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Secure & Reliable</h4>
                        <p className="text-sm text-gray-600">Your privacy is our priority</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { User, Mail, MessageSquare, Shield, ChevronRight } from "lucide-react";

// Button Component
const Button = ({ children, variant = "default", size = "default", className = "", asChild = false, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-95 touch-manipulation";

  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white backdrop-blur-sm",
    gradient: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl",
  };

  const sizes = {
    default: "h-12 py-3 px-6 text-base min-w-[120px]",
    sm: "h-10 px-4 text-sm min-w-[100px]",
    lg: "h-14 px-8 text-lg min-w-[140px]",
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

// Card Component
const Card = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm hover:shadow-md",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl",
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
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

// Error Boundary Component
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(1deg); }
        66% { transform: translateY(-5px) rotate(-1deg); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      @keyframes text-glow {
        0%, 100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(147, 51, 234, 0.4); }
        50% { text-shadow: 0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(147, 51, 234, 0.6); }
      }
      .animate-text-glow {
        animation: text-glow 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        <Head>
          <title>Contact Us | Lawgical</title>
          <meta
            name="description"
            content="Get in touch with Lawgical. Fill out our contact form or reach us via email or phone."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement delay={0} className="absolute top-20 left-10 opacity-20">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl"></div>
          </FloatingElement>
          <FloatingElement delay={2} className="absolute top-40 right-20 opacity-20">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-xl"></div>
          </FloatingElement>
        </div>

        <Header />

        <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card variant="glass" className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Get In{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-text-glow">
                    Touch
                  </span>
                </h2>
                <p className="text-lg text-gray-600">
                  We'd love to hear from you. Fill out the form and we'll get back to you soon.
                </p>
              </div>

              {status && (
                <div className={`mb-6 p-4 rounded-xl border flex items-center ${status.includes('successfully') ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                  {status.includes('successfully') ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  )}
                  <p>{status}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name Field */}
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="block w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      aria-invalid={status.includes('required') ? "true" : "false"}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      aria-invalid={status.includes('required') ? "true" : "false"}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      className="block w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      required
                      placeholder="Your message..."
                      aria-invalid={status.includes('required') ? "true" : "false"}
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  variant="gradient"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
                      </svg>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Prefer another way?{" "}
                  <a href="/careers" className="text-blue-600 hover:underline">
                    View Career Opportunities
                  </a>
                </p>
              </div>
            </Card>

            {/* Contact Information Section */}
            <div className="mt-12 grid sm:grid-cols-3 gap-6 text-gray-700">
              <Card className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p>
                  <a href="mailto:support@lawgical.tech" className="text-blue-600 hover:underline">
                    support@lawgical.tech
                  </a>
                </p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p>
                  <a href="tel:+918383801899" className="text-blue-600 hover:underline">
                    +91 838 380 1899
                  </a>
                </p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
                <p>Mon – Fri: 9 AM – 6 PM</p>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
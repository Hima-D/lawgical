"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Shield,
  ChevronRight
} from "lucide-react";

// Enhanced Button Component
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

// Enhanced Card Component
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

export default function Careers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const departments = ["Legal", "Business", "Technology", "Management", "Market", "Research"];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !email || !phone || !department || !resume) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("department", department);
      formData.append("resume", resume);

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }

      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setResume(null);
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        <Head>
          <title>Join Our Team | Lawgical Careers</title>
          <meta
            name="description"
            content="Join the Lawgical team and make a difference in the legal industry. Apply now for exciting career opportunities."
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
                  Join Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-text-glow">
                    Lawgical Team
                  </span>
                </h2>
                <p className="text-lg text-gray-600">
                  Be part of our mission to revolutionize legal services. Apply now and start your journey with us.
                </p>
              </div>

              {success && (
                <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <p>Thank you for applying! We will review your application and get back to you soon.</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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
                      className="block w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your full name"
                      aria-invalid={error ? "true" : "false"}
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
                      className="block w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                      aria-invalid={error ? "true" : "false"}
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="relative">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      className="block w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="Enter your phone number"
                      aria-invalid={error ? "true" : "false"}
                    />
                  </div>
                </div>

                {/* Department Selection */}
                <div className="relative">
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Department
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 appearance-none"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Resume Upload Field */}
                <div className="relative">
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Your Resume
                  </label>
                  <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 bg-white/50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {resume ? resume.name : "Drag and drop your resume or click to browse"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                    </div>
                    <input
                      type="file"
                      id="resume"
                      className="hidden"
                      onChange={(e) => setResume(e.target.files[0])}
                      required
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
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
                    "Apply Now"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Need assistance?{" "}
                  <a href="/contact" className="text-blue-600 hover:underline">
                    Contact Us
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
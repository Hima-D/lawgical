"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { CheckCircle, User, Mail, Lock, UserCheck, Shield, Zap, Clock } from 'lucide-react';

// Card component matching main page style
const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-xl border bg-white text-gray-900 shadow-lg ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Button component matching main page style
const Button = ({ children, variant = "default", size = "default", className = "", disabled = false, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  const sizes = {
    default: "h-12 px-6 py-3",
    lg: "h-14 px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'transform-none hover:scale-100' : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [userType, setUserType] = useState('client');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // Set mounted state after the component has been mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType, displayName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error creating account");
        return;
      }

      // Show success message
      setIsSuccess(true);
      
      // Redirect to signin after 3 seconds
      setTimeout(() => {
        router.push("/signin");
      }, 3000);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null; // Ensure the page renders correctly on the client-side
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Include Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Marketing Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Join{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  India's Leading
                </span>{" "}
                Legal Platform
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Get started with Lawgical today and access expert legal services, trusted by over 1 million+ clients across India.
              </p>
              
              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Access to 500+ legal experts</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Quick turnaround time</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Bank-level security</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>1M+ Happy Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>500+ Legal Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>99% Success Rate</span>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="relative">
              <Card className="p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                    <p className="text-gray-600">Join thousands of satisfied clients</p>
                  </div>

                  {/* Show Success Message */}
                  {isSuccess && (
                    <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Welcome to Lawgical! 🎉</h3>
                      <p className="text-green-700 mb-2">Your account has been created successfully!</p>
                      <p className="text-sm text-green-600">Check your email for a welcome message. Redirecting to sign in...</p>
                      <div className="mt-4 bg-green-200 rounded-full h-1 overflow-hidden">
                        <div className="bg-green-500 h-1 rounded-full animate-pulse w-full"></div>
                      </div>
                    </div>
                  )}

                  {/* Show Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-center">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="font-medium">{error}</span>
                      </div>
                    </div>
                  )}

                  {/* Form */}
                  {!isSuccess && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Display Name Field */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Display Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            id="displayName"
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                              error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white focus:bg-white'
                            }`}
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                              error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white focus:bg-white'
                            }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="password"
                            id="password"
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                              error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white focus:bg-white'
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a secure password"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Minimum 8 characters required</p>
                      </div>

                      {/* User Type Field */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Account Type
                        </label>
                        <div className="relative">
                          <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <select
                            id="userType"
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none ${
                              error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white focus:bg-white'
                            }`}
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                          >
                            <option value="client">Client - Seeking Legal Services</option>
                            <option value="lawyer">Lawyer - Providing Legal Services</option>
                          </select>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Creating Account...
                          </div>
                        ) : (
                          <>
                            <Shield className="h-5 w-5 mr-2" />
                            Create My Account
                          </>
                        )}
                      </Button>

                      {/* Terms */}
                      <p className="text-xs text-gray-500 text-center leading-relaxed">
                        By creating an account, you agree to our{' '}
                        <Link href="/terms" className="text-blue-600 hover:underline font-medium">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                          Privacy Policy
                        </Link>
                      </p>
                    </form>
                  )}

                  {/* Sign In Link */}
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <span className="text-gray-600">
                      Already have an account?{' '}
                      <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                        Sign In
                      </Link>
                    </span>
                  </div>
                </div>
              </Card>

              {/* Feature cards below form */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <Card className="p-4 text-center border border-gray-100 hover:shadow-lg transition-all">
                  <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-700">Quick Setup</p>
                </Card>
                <Card className="p-4 text-center border border-gray-100 hover:shadow-lg transition-all">
                  <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-700">Secure Data</p>
                </Card>
                <Card className="p-4 text-center border border-gray-100 hover:shadow-lg transition-all">
                  <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-700">24/7 Support</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted by Leading Companies</h3>
            <p className="text-gray-600">Join thousands of businesses that rely on Lawgical</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-60">
            {/* Placeholder for company logos */}
            <div className="bg-gray-200 h-12 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">Company</span>
            </div>
            <div className="bg-gray-200 h-12 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">Startup</span>
            </div>
            <div className="bg-gray-200 h-12 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">Business</span>
            </div>
            <div className="bg-gray-200 h-12 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">Enterprise</span>
            </div>
          </div>
        </div>
      </section>

      {/* Include Footer */}
      <Footer />
    </div>
  );
};

export default SignUp;
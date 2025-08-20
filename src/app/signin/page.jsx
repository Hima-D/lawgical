"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Mail, Lock, LogIn, Shield, Zap, Clock, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';

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
const Button = ({ children, variant = "default", size = "default", className = "", disabled = false, asChild = false, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "text-blue-600 hover:bg-blue-50",
  };

  const sizes = {
    default: "h-12 px-6 py-3",
    lg: "h-14 px-8 py-4 text-lg",
  };

  const finalClassName = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'transform-none hover:scale-100' : ''}`;

  // If asChild is true, clone the first child and apply the button styles to it
  if (asChild && children) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: `${child.props.className || ''} ${finalClassName}`,
      disabled: disabled || child.props.disabled,
      ...props
    });
  }

  // Otherwise, render as a regular button
  return (
    <button
      className={finalClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showGoogleSuggestion, setShowGoogleSuggestion] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setShowGoogleSuggestion(false);

    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        if (data.suggestGoogleAuth) {
          setShowGoogleSuggestion(true);
        }
      } else {
        // Store user/session in localStorage or cookie if needed
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredentialResponse = async (response) => {
    setError(null);

    try {
      const result = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authType: 'google',
          googleToken: response.credential,
        }),
      });

      const data = await result.json();

      if (result.ok) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Google sign-in failed');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Network error during Google sign-in');
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Load Google Sign-In script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Sign-In script loaded successfully');
          // Initialize and render Google Sign-In button
          if (window.google && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
            try {
              window.google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleGoogleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true,
              });
              
              // Render the Google Sign-In button immediately
              const buttonContainer = document.getElementById('google-signin-button');
              if (buttonContainer) {
                window.google.accounts.id.renderButton(buttonContainer, {
                  theme: 'outline',
                  size: 'large',
                  width: 320, // Fixed width for consistency
                  text: 'signin_with',
                  shape: 'rectangular',
                  logo_alignment: 'left'
                });
                console.log('Google Sign-In button rendered successfully');
              }
              
              console.log('Google Sign-In initialized successfully');
            } catch (error) {
              console.error('Failed to initialize Google Sign-In:', error);
            }
          }
        }}
        onError={(error) => {
          console.error('Failed to load Google Sign-In script:', error);
        }}
      />
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100">
        {/* Include Header */}
        <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Welcome Back Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Welcome Back to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Lawgical
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Sign in to access your account and continue your legal journey with India's most trusted platform.
                </p>
                
                {/* Quick Access Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <span>Access your ongoing cases</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Connect with your legal experts</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                    <span>Track your document status</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <span>Manage your legal portfolio</span>
                  </div>
                </div>

                {/* New User CTA */}
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">New to Lawgical?</h3>
                      <p className="text-gray-600 text-sm">Join 1M+ satisfied clients today</p>
                    </div>
                    <Button variant="ghost" size="default" asChild>
                      <Link href="/signup" className="flex items-center gap-2">
                        Create Account <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Right Side - Sign In Form */}
              <div className="relative">
                <Card className="p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogIn className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                      <p className="text-gray-600">Access your legal dashboard</p>
                    </div>

                    {/* Google Sign-In Button - Single Button Only */}
                    <div className="mb-6">
                      <div 
                        id="google-signin-button" 
                        className="w-full flex justify-center"
                      ></div>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                      </div>
                    </div>

                    {/* Show Error Message */}
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl">
                        <div className="flex items-center justify-center gap-2">
                          <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="font-medium">{error}</span>
                        </div>
                      </div>
                    )}

                    {/* Email/Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            disabled={loading}
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
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                              error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white focus:bg-white'
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            disabled={loading}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Remember Me & Forgot Password */}
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={loading}
                          />
                          <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                          Forgot password?
                        </Link>
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
                            Signing In...
                          </div>
                        ) : (
                          <>
                            <LogIn className="h-5 w-5 mr-2" />
                            Sign In to Dashboard
                          </>
                        )}
                      </Button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                      <span className="text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                          Create Account
                        </Link>
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Security features below form */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <Card className="p-4 text-center border border-gray-100 hover:shadow-lg transition-all">
                    <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-xs font-medium text-gray-700">Bank-Level Security</p>
                  </Card>
                  <Card className="p-4 text-center border border-gray-100 hover:shadow-lg transition-all">
                    <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs font-medium text-gray-700">Instant Access</p>
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

        {/* Recent Activity or Quick Stats */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Users Choose Lawgical</h3>
              <p className="text-gray-600">Join millions who trust us with their legal needs</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
                <div className="text-gray-600 font-medium">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Legal Experts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
                <div className="text-gray-600 font-medium">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Include Footer */}
        <Footer />
      </div>
    </>
  );
};

export default SignIn;
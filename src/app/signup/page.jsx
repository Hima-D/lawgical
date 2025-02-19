"use client";
import { useState, useEffect } from 'react'; // Add this import for useEffect
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseclient'; // Ensure this is correctly set up
import Header from '@/components/header';
import Footer from '@/components/footer';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // For SSR issue with Next.js
  const [isSuccess, setIsSuccess] = useState(false); // State for success message
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
      // Sign up the user with email and password
      const { user, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        // After successful signup, show success message and ask user to check email
        setIsSuccess(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null; // Ensure the page renders correctly on the client-side
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Include Header */}
      <Header />

      <div className="flex-grow flex items-center justify-center py-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-6 text-black">Sign Up</h2>

          {/* Show Success Message */}
          {isSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md text-center">
              <p>We have sent a confirmation link to your email. Please check your inbox to confirm your account.</p>
            </div>
          )}

          {/* Show Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-800 rounded-md text-center">
              {error}
            </div>
          )}

          {/* Form */}
          {!isSuccess && (
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4 relative">
                <label
                  htmlFor="email"
                  className="absolute text-sm font-medium text-gray-700 left-4 -top-3 bg-white px-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500' : ''} text-black`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  aria-describedby="emailHelp"
                  aria-invalid={error ? "true" : "false"}
                />
              </div>

              {/* Password Field */}
              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="absolute text-sm font-medium text-gray-700 left-4 -top-3 bg-white px-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500' : ''} text-black`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  aria-describedby="passwordHelp"
                  aria-invalid={error ? "true" : "false"}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-2 px-4 bg-black text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'} focus:outline-none`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
                    </svg>
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>
          )}

          {/* Sign In Link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/signin" className="text-black hover:underline">
                Sign In
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Include Footer */}
      <Footer />
    </div>
  );
};

export default SignUp;

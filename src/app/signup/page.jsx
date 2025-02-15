"use client";
import { useState, useEffect } from 'react';  // Add this import for useEffect
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
        // After successful signup, redirect user to login or dashboard
        router.push('/signin');
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
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-black py-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-6 text-black">Sign Up</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 bg-black text-white rounded-md ${loading ? 'opacity-50' : 'hover:bg-gray-800'} focus:outline-none`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

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
      <Footer />
    </div>
  );
};

export default SignUp;

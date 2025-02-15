"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import { supabase } from '@/lib/supabaseclient';
import Header from '@/components/header';
import Footer from '@/components/footer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 

  const router = useRouter(); // Now using the new useRouter from next/navigation

  useEffect(() => {
    setIsMounted(true); // Set to true after the component has mounted
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { user, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
    } else {
      router.push('/dashboard'); // This now works with next/navigation
    }
    setLoading(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Include Header */}
      <Header />

      <div className="flex-grow flex items-center justify-center py-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-6 text-black">Sign In</h2>
          
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
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-black hover:underline">
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default SignIn;

"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure to navigate correctly after form submission
import Header from '@/components/header';
import Footer from '@/components/footer';

const Careers = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Department options
  const departments = ['Legal', 'Compliance', 'Litigation', 'Corporate Law', 'Intellectual Property', 'Research', 'Admin'];

  const router = useRouter();

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
      // Simulate submission process
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <div className="flex-grow flex items-center justify-center py-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-6 text-black">Join Our Team</h2>

          {success && (
            <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-md text-center">
              <p>Thank you for applying! We will review your application and get back to you soon.</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-800 rounded-md text-center">
              {error}
            </div>
          )}

          {/* Careers Application Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div className="mb-4 relative">
              <label htmlFor="name" className="absolute text-sm font-medium text-gray-700 left-4 -top-3 bg-white px-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500' : ''} text-black`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                aria-describedby="nameHelp"
                aria-invalid={error ? "true" : "false"}
              />
            </div>

            {/* Email Field */}
            <div className="mb-4 relative">
              <label htmlFor="email" className="absolute text-sm font-medium text-gray-700 left-4 -top-3 bg-white px-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500' : ''} text-black`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                aria-describedby="emailHelp"
                aria-invalid={error ? "true" : "false"}
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-4 relative">
              <label htmlFor="phone" className="absolute text-sm font-medium text-gray-700 left-4 -top-3 bg-white px-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500' : ''} text-black`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter your phone number"
                aria-describedby="phoneHelp"
                aria-invalid={error ? "true" : "false"}
              />
            </div>

            {/* Department Selection */}
            <div className="mb-4 relative">
              <label htmlFor="department" className="absolute text-sm font-medium text-gray-700 left-4 -top-3 bg-white px-1">
                Select Department
              </label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500' : ''} text-black`}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Resume Upload Field */}
            <div className="mb-6 relative">
              <label htmlFor="resume" className="absolute text-sm font-medium text-gray-700 left-4 -top-3 bg-white px-1">
                Upload Your Resume
              </label>
              <input
                type="file"
                id="resume"
                onChange={(e) => setResume(e.target.files[0])}
                required
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${error ? 'border-red-500' : ''}`}
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
                'Apply Now'
              )}
            </button>
          </form>

          {/* Optional: Add Sign Up or Contact Us link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Need assistance?{' '}
              <a href="/contact" className="text-black hover:underline">
                Contact Us
              </a>
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;

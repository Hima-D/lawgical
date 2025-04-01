"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
      // Create form data for submission
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('department', department);
      formData.append('resume', resume);

      // Submit to API
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary for FormData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit application');
      }

      setLoading(false);
      setSuccess(true);
      
      // Optional: Clear form after successful submission
      setName('');
      setEmail('');
      setPhone('');
      setDepartment('');
      setResume(null);
      
      // Optional: redirect after delay
      // setTimeout(() => {
      //   router.push('/thank-you');
      // }, 3000);
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <div className="flex-grow flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-700">
          <h2 className="text-2xl font-semibold text-center mb-6 text-white">Join Our Team</h2>

          {success && (
            <div className="mb-4 p-3 bg-green-800 text-green-100 rounded-md text-center">
              <p>Thank you for applying! We will review your application and get back to you soon.</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-900 text-red-100 rounded-md text-center">
              {error}
            </div>
          )}

          {/* Careers Application Form */}
          <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
            {/* Full Name Field */}
            <div className="relative">
              <label htmlFor="name" className="absolute text-sm font-medium text-gray-300 left-4 -top-3 bg-gray-900 px-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                aria-describedby="nameHelp"
                aria-invalid={error ? "true" : "false"}
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="absolute text-sm font-medium text-gray-300 left-4 -top-3 bg-gray-900 px-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                aria-describedby="emailHelp"
                aria-invalid={error ? "true" : "false"}
              />
            </div>

            {/* Phone Number Field */}
            <div className="relative">
              <label htmlFor="phone" className="absolute text-sm font-medium text-gray-300 left-4 -top-3 bg-gray-900 px-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter your phone number"
                aria-describedby="phoneHelp"
                aria-invalid={error ? "true" : "false"}
              />
            </div>

            {/* Department Selection */}
            <div className="relative">
              <label htmlFor="department" className="absolute text-sm font-medium text-gray-300 left-4 -top-3 bg-gray-900 px-1">
                Select Department
              </label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Resume Upload Field */}
            <div className="relative">
              <label htmlFor="resume" className="absolute text-sm font-medium text-gray-300 left-4 -top-3 bg-gray-900 px-1">
                Upload Your Resume
              </label>
              <div className="mt-1 flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-800 bg-gray-800">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-xs text-gray-400 mt-2">
                      {resume ? resume.name : "Drag and drop your resume or click to browse"}
                    </p>
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 px-4 bg-white text-black font-medium rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'} focus:outline-none transition-colors duration-200`}
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
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-400">
              Need assistance?{' '}
              <a href="/contact" className="text-white hover:underline">
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
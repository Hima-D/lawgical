"use client";
import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus('Sending...');

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
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header Component */}
      <Header />

      {/* Contact Form Section */}
      <div className="flex-grow flex items-center justify-center py-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-6 text-black">Get In Touch</h2>

          <p className="text-center text-lg text-gray-600 mb-6">
            We’d love to hear from you. Fill out the form below and we’ll respond shortly.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4 relative">
              <label
                htmlFor="name"
                className="absolute text-sm font-medium text-gray-700 left-4 -top-3 bg-white px-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black ${status === 'Sending...' ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Input */}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black ${status === 'Sending...' ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your email"
              />
            </div>

            {/* Message Textarea */}
            <div className="mb-6 relative">
              <label
                htmlFor="message"
                className="absolute text-sm font-medium text-gray-700 left-4 -top-3 bg-white px-1"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black ${status === 'Sending...' ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className={`w-full py-2 px-4 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black ${status === 'Sending...' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                disabled={status === 'Sending...'}
              >
                {status === 'Sending...' ? (
                  <div className="flex justify-center items-center">
                    <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
                    </svg>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>

          {/* Status Message */}
          {status && status !== 'Sending...' && (
            <div className="mt-4 text-center text-lg">
              <p className={`${status === 'Message sent successfully!' ? 'text-green-600' : 'text-red-600'}`}>{status}</p>
            </div>
          )}
        </div>
      </div>

      {/* Optional Info Section */}
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold text-white mb-4">Need Help Immediately?</h2>
        <p className="text-lg text-gray-300">
          Reach out to us at <a href="mailto:advocatechahat@gmail.com" className="text-white">advocatechahat@gmail.com</a>
        </p>
        <p className="text-lg text-gray-300 mt-2">
          Or give us a call at <span className="text-white">+918383801899</span>
        </p>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Contact;

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
      const response = await fetch('/api/contact', { // Change the endpoint to match the app/api/contact route
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
    <div className="min-h-screen bg-black text-white px-6 sm:px-12">
      {/* Header Component */}
      <Header />

      {/* Contact Form Section */}
      <div className="max-w-4xl mx-auto pt-16 pb-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 animate__animated animate__fadeIn">
          Get In Touch
        </h1>

        <div className="text-center mb-8 animate__animated animate__fadeIn animate__delay-1s">
          <p className="text-lg text-gray-300">
            We’d love to hear from you. Fill out the form below and we’ll respond shortly.
          </p>
        </div>

        <div className="bg-black p-8 rounded-lg shadow-xl border border-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Name Input */}
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-lg font-semibold text-white mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 text-lg bg-black border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                />
              </div>

              {/* Email Input */}
              <div className="sm:col-span-1">
                <label htmlFor="email" className="text-lg font-semibold text-white mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 text-lg bg-black border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="mb-6">
              <label htmlFor="message" className="text-lg font-semibold text-white mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full p-3 text-lg bg-black border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-white text-black text-lg py-3 px-8 rounded-lg hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Send Message
              </button>
            </div>
          </form>

          {status && (
            <div className="mt-4 text-center text-lg">
              <p>{status}</p>
            </div>
          )}
        </div>

        {/* Optional Info Section */}
        <div className="mt-12 text-center animate__animated animate__fadeIn animate__delay-2s">
          <h2 className="text-xl font-semibold text-white mb-4">Need Help Immediately?</h2>
          <p className="text-lg text-gray-300">
            Reach out to us at <a href="mailto:advocatechahat@gmail.com" className="text-white">advocatechahat@gmail.com</a>
          </p>
          <p className="text-lg text-gray-300 mt-2">
            Or give us a call at <span className="text-white">+918383801899</span>
          </p>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Contact;

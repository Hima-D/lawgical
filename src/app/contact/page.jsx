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
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">Get In Touch</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              We'd love to hear from you. Fill out the form and we'll get back to you soon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    placeholder="Your message..."
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'Sending...'}
                  className={`w-full py-3 px-4 rounded-md text-white font-semibold transition duration-300 
                    ${status === 'Sending...' ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
                >
                  {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                </button>

                {status && status !== 'Sending...' && (
                  <p className={`text-center text-sm ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{status}</p>
                )}
              </form>
            </div>

            <div className="flex flex-col gap-6 justify-center text-gray-700">
              <div>
                <h2 className="text-xl font-semibold mb-2">Email</h2>
                <p><a href="mailto:advocatechahat@gmail.com" className="text-blue-600 hover:underline">support@lawgical.tech</a></p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Phone</h2>
                <p><a href="tel:+918383801899" className="text-blue-600 hover:underline">+91 838 380 1899</a></p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Office Hours</h2>
                <p>Mon – Fri: 9 AM – 6 PM</p>
              </div>

              
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
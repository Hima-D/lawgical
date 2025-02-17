"use client";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useState } from 'react';
import Link from 'next/link';

const BookServicePage = () => {
  const [service, setService] = useState('');
  const [attorney, setAttorney] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an API call or form submission
    setTimeout(() => {
      alert('Your booking has been submitted successfully!');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header /> {/* Include the Header Component */}

      <div className="p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Book a Legal Service</h1>
        <p className="text-lg text-center text-gray-400 mb-12">
          Get expert legal advice from our experienced attorneys. Follow the steps below to book your consultation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
          {/* Step 1: Select Service */}
          <div>
            <label htmlFor="service" className="block text-lg font-medium text-gray-200">
              Select Service
            </label>
            <select
              id="service"
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose a service</option>
              <option value="initial-consultation">Initial Consultation</option>
              <option value="case-evaluation">Case Evaluation</option>
              <option value="business-legal-services">Business Legal Services</option>
              <option value="family-law-consultation">Family Law Consultation</option>
            </select>
          </div>

          {/* Step 2: Select Attorney */}
          <div>
            <label htmlFor="attorney" className="block text-lg font-medium text-gray-200">
              Choose Attorney
            </label>
            <select
              id="attorney"
              name="attorney"
              value={attorney}
              onChange={(e) => setAttorney(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select an attorney</option>
              <option value="attorney1">Attorney Name 1</option>
              <option value="attorney2">Attorney Name 2</option>
              <option value="attorney3">Attorney Name 3</option>
            </select>
          </div>

          {/* Step 3: Select Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-lg font-medium text-gray-200">
                Pick a Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 block w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-lg font-medium text-gray-200">
                Pick a Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-2 block w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Step 4: Personal Details */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-200">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-200">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-200">
              Brief Description of Your Legal Issue
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full bg-white text-black py-3 rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Book Your Appointment'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>

      <Footer /> {/* Include the Footer Component */}
    </div>
  );
};

export default BookServicePage;

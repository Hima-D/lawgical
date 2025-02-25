"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header"; // Ensure the path is correct
import Footer from "@/components/footer"; // Ensure the path is correct
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/solid"; // Corrected import for Heroicons v2.x

export default function ScheduleConsultation() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [todayDate, setTodayDate] = useState("");

  // Set today's date (to disable past dates in the calendar)
  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    setTodayDate(date);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    let formErrors = {};
    if (!fullName) formErrors.fullName = "Full name is required";
    if (!email || !/\S+@\S+\.\S+/.test(email)) formErrors.email = "Valid email is required";
    if (!selectedDate) formErrors.selectedDate = "Date is required";
    if (!selectedTime) formErrors.selectedTime = "Time is required";

    // Check if the selected date is not in the past
    if (selectedDate && new Date(selectedDate) < new Date(todayDate)) {
      formErrors.selectedDate = "Date cannot be in the past";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate sending the data to your backend or third-party service
    setTimeout(() => {
      // Assuming success
      setConfirmationMessage("Your consultation has been scheduled successfully!");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <div className="flex flex-col items-center justify-center p-8 sm:p-16 gap-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center sm:text-left text-primary">
          Schedule Your Online Consultation
        </h1>
        <p className="text-base sm:text-lg text-center sm:text-left font-medium text-gray-400">
          Choose a convenient time and date for your video consultation with one of our expert lawyers.
        </p>

        {/* Description about Lawyers */}
        <div className="mt-8 text-center text-gray-400">
          <p>
            Our team of highly experienced and dedicated lawyers is ready to assist you with any legal matters. Whether it’s business law, family disputes, or criminal defense, we have the expertise to guide you through the most complex legal challenges. Book your consultation today with the best in the field!
          </p>
        </div>

        {/* Consultation Scheduling Form */}
        <form onSubmit={handleFormSubmit} className="w-full max-w-lg mt-8">
          {/* Full Name Field */}
          <div className="mb-6">
            <label htmlFor="fullName" className="block text-xl font-semibold text-primary mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full p-3 text-black rounded-lg ${errors.fullName ? "border-red-500" : ""}`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-xl font-semibold text-primary mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 text-black rounded-lg ${errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Date Field */}
          <div className="mb-6">
            <label htmlFor="selectedDate" className="block text-xl font-semibold text-primary mb-2">
              Select a Date
            </label>
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-6 w-6 text-primary" />
              <input
                id="selectedDate"
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={todayDate}  // Disable past dates
                className={`w-full p-3 text-black rounded-lg ${errors.selectedDate ? "border-red-500" : ""}`}
              />
            </div>
            {errors.selectedDate && (
              <span className="text-red-500 text-sm">{errors.selectedDate}</span>
            )}
          </div>

          {/* Time Field */}
          <div className="mb-6">
            <label htmlFor="selectedTime" className="block text-xl font-semibold text-primary mb-2">
              Select a Time
            </label>
            <div className="flex items-center gap-3">
              <ClockIcon className="h-6 w-6 text-primary" />
              <input
                id="selectedTime"
                type="time"
                required
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className={`w-full p-3 text-black rounded-lg ${errors.selectedTime ? "border-red-500" : ""}`}
              />
            </div>
            {errors.selectedTime && (
              <span className="text-red-500 text-sm">{errors.selectedTime}</span>
            )}
          </div>

          {/* Additional Message Field */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-xl font-semibold text-primary mb-2">
              Additional Message (Optional)
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 text-black rounded-lg"
              placeholder="Provide any additional information"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-4 bg-primary text-white rounded-lg font-semibold transition-all duration-300 ease-in-out ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
          </button>
        </form>

        {/* Confirmation Message */}
        {confirmationMessage && (
          <div className="mt-8 text-lg font-semibold text-green-400">
            {confirmationMessage}
          </div>
        )}

        {/* Alternative Links */}
        <div className="mt-8 text-center">
          <p className="text-gray-400">Or</p>
          <Link href="/contact" className="text-primary hover:underline mt-4 inline-block">
            Contact Us for More Information
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

"use client";
import React, { use, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Briefcase,
  Users,
  Home
} from 'lucide-react';

// Mock services data
const services = [
  { id: 'immigration', name: 'Immigration Law', title: 'Immigration Law' },
  { id: 'corporate', name: 'Corporate Law', title: 'Corporate Law' },
  { id: 'family', name: 'Family Law', title: 'Family Law' },
  { id: 'criminal', name: 'Criminal Law', title: 'Criminal Law' },
  { id: 'personal-injury', name: 'Personal Injury', title: 'Personal Injury' }
];

const BookServicePage = () => {
  const [formState, setFormState] = useState({
    service: "",
    attorney: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    description: ""
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  // Get today's date and format it as yyyy-mm-dd
  const today = new Date().toISOString().split("T")[0];

  // Generate time slots from 9 AM to 5 PM in half-hour increments
  const generateTimeSlots = (startHour = 9, endHour = 17) => {
    const timeSlots = [];
    let currentTime = new Date();
    currentTime.setHours(startHour, 0, 0, 0);

    while (currentTime.getHours() < endHour) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const timeSlot = `${hours % 12 || 12}:${minutes === 0 ? "00" : "30"} ${
        hours >= 12 ? "PM" : "AM"
      }`;
      timeSlots.push(timeSlot);

      // Move to the next half-hour slot
      currentTime = new Date(currentTime.setMinutes(currentTime.getMinutes() + 30));
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  // Helper function to format phone number for WhatsApp
  const formatPhoneNumber = (phone) => {
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Add country code if not present (assuming US +1)
    let formattedPhone = cleanPhone;
    if (!cleanPhone.startsWith('1') && cleanPhone.length === 10) {
      formattedPhone = '1' + cleanPhone;
    }
    
    // Ensure it starts with whatsapp: prefix
    return `whatsapp:+${formattedPhone}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formState.service) newErrors.service = "Please select a service";
      if (!formState.attorney) newErrors.attorney = "Please select an attorney";
    } else if (step === 2) {
      if (!formState.date) newErrors.date = "Please select a date";
      if (!formState.time) newErrors.time = "Please select a time";
    } else if (step === 3) {
      if (!formState.name.trim()) newErrors.name = "Please enter your full name";
      if (!formState.email.trim()) {
        newErrors.email = "Please enter your email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formState.phone.trim()) {
        newErrors.phone = "Please enter your phone number";
      } else {
        const cleanPhone = formState.phone.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
          newErrors.phone = "Phone number must have at least 10 digits";
        }
      }
      if (!formState.description.trim()) {
        newErrors.description = "Please describe your legal issue";
      } else if (formState.description.trim().length < 10) {
        newErrors.description = "Please provide more details (at least 10 characters)";
      }
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Format phone number for WhatsApp
    const formattedPhone = formatPhoneNumber(formState.phone);

    // Prepare form data to be sent
    const formData = {
      ...formState,
      phone: formattedPhone
    };

    try {
      // Simulate API call (replace with actual endpoint)
      const response = await fetch("/api/bookservice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || "Your booking has been submitted successfully!");
        // Reset form after success
        setFormState({
          service: "",
          attorney: "",
          date: "",
          time: "",
          name: "",
          email: "",
          phone: "",
          description: ""
        });
        setCurrentStep(1);
        window.scrollTo(0, 0);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "There was an issue with your submission.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("There was an error submitting your form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get attorneys based on selected service
  const getAttorneys = () => {
    const attorneyMap = {
      'Immigration Law': [
        { id: "attorney1", name: "Jessica Rodriguez", specialty: "Immigration Law" },
        { id: "attorney2", name: "Carlos Martinez", specialty: "Immigration Law" }
      ],
      'Corporate Law': [
        { id: "attorney3", name: "Michael Chang", specialty: "Corporate Law" },
        { id: "attorney4", name: "David Kim", specialty: "Corporate Law" }
      ],
      'Family Law': [
        { id: "attorney5", name: "Sarah Williams", specialty: "Family Law" },
        { id: "attorney6", name: "Emma Johnson", specialty: "Family Law" }
      ],
      'Criminal Law': [
        { id: "attorney7", name: "Robert Brown", specialty: "Criminal Law" },
        { id: "attorney8", name: "Lisa Davis", specialty: "Criminal Law" }
      ],
      'Personal Injury': [
        { id: "attorney9", name: "James Wilson", specialty: "Personal Injury" },
        { id: "attorney10", name: "Maria Garcia", specialty: "Personal Injury" }
      ]
    };

    return attorneyMap[formState.service] || [];
  };

  // Render progress steps
  const renderProgressSteps = () => {
    return (
      <div className="flex justify-center items-center mb-10">
        <div className="flex items-center w-full max-w-2xl">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-1 items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep === step
                  ? "bg-blue-600 border-blue-600 text-white"
                  : currentStep > step
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-gray-800 border-gray-600 text-gray-400"
              }`}>
                {currentStep > step ? <CheckCircle size={18} /> : step}
              </div>
              <div className={`flex-1 h-1 ${
                step < 3
                  ? currentStep > step
                    ? "bg-green-500"
                    : "bg-gray-600"
                  : "hidden"
              }`}></div>
              <div className="mx-2 hidden sm:block text-sm text-gray-400">
                {step === 1 ? "Choose Service" : step === 2 ? "Schedule" : "Your Details"}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Step 1: Select Service and Attorney
  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Service Selection */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <div className="flex items-center mb-4">
          <Briefcase className="mr-2 text-blue-500" />
          <label htmlFor="service" className="block text-lg font-medium text-gray-200">
            Select Legal Service
          </label>
        </div>
        <select
          id="service"
          name="service"
          value={formState.service}
          onChange={handleChange}
          className={`mt-2 block w-full px-4 py-3 bg-gray-800 text-white border ${
            formErrors.service ? "border-red-500" : "border-gray-600"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        >
          <option value="">Choose a service</option>
          {services.map((serviceItem) => (
            <option key={serviceItem.id} value={serviceItem.name}>
              {serviceItem.title}
            </option>
          ))}
        </select>
        {formErrors.service && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle size={16} className="mr-1" /> {formErrors.service}
          </p>
        )}
      </div>

      {/* Attorney Selection */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <div className="flex items-center mb-4">
          <Users className="mr-2 text-blue-500" />
          <label htmlFor="attorney" className="block text-lg font-medium text-gray-200">
            Choose Attorney
          </label>
        </div>
        <select
          id="attorney"
          name="attorney"
          value={formState.attorney}
          onChange={handleChange}
          disabled={!formState.service}
          className={`mt-2 block w-full px-4 py-3 bg-gray-800 text-white border ${
            formErrors.attorney ? "border-red-500" : "border-gray-600"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            !formState.service ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <option value="">
            {!formState.service ? "Select a service first" : "Select an attorney"}
          </option>
          {getAttorneys().map((attorney) => (
            <option key={attorney.id} value={attorney.name}>
              {attorney.name} - {attorney.specialty}
            </option>
          ))}
        </select>
        {formErrors.attorney && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle size={16} className="mr-1" /> {formErrors.attorney}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  // Step 2: Date and Time Selection
  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <div className="flex items-center mb-4">
          <Calendar className="mr-2 text-blue-500" />
          <label htmlFor="date" className="block text-lg font-medium text-gray-200">
            Select Date
          </label>
        </div>
        <input
          type="date"
          id="date"
          name="date"
          value={formState.date}
          onChange={handleChange}
          className={`mt-2 block w-full px-4 py-3 bg-gray-800 text-white border ${
            formErrors.date ? "border-red-500" : "border-gray-600"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          min={today}
        />
        {formErrors.date && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle size={16} className="mr-1" /> {formErrors.date}
          </p>
        )}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <div className="flex items-center mb-4">
          <Clock className="mr-2 text-blue-500" />
          <label htmlFor="time" className="block text-lg font-medium text-gray-200">
            Select Time
          </label>
        </div>
        <select
          id="time"
          name="time"
          value={formState.time}
          onChange={handleChange}
          className={`mt-2 block w-full px-4 py-3 bg-gray-800 text-white border ${
            formErrors.time ? "border-red-500" : "border-gray-600"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        >
          <option value="">Choose a time</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        {formErrors.time && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle size={16} className="mr-1" /> {formErrors.time}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" /> Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  // Step 3: Personal Details
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <div className="flex items-center mb-4">
          <User className="mr-2 text-blue-500" />
          <label htmlFor="name" className="block text-lg font-medium text-gray-200">
            Full Name
          </label>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={`mt-2 block w-full px-4 py-3 bg-gray-800 text-white border ${
            formErrors.name ? "border-red-500" : "border-gray-600"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
        {formErrors.name && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle size={16} className="mr-1" /> {formErrors.name}
          </p>
        )}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <div className="flex items-center mb-4">
          <Mail className="mr-2 text-blue-500" />
          <label htmlFor="email" className="block text-lg font-medium text-gray-200">
            Email Address
          </label>
        </div>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className={`mt-2 block w-full px-4 py-3 bg-gray-800 text-white border ${
            formErrors.email ? "border-red-500" : "border-gray-600"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
        {formErrors.email && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle size={16} className="mr-1" /> {formErrors.email}
          </p>
        )}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <div className="flex items-center mb-4">
          <Phone className="mr-2 text-blue-500" />
          <label htmlFor="phone" className="block text-lg font-medium text-gray-200">
            Phone Number
          </label>
        </div>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          placeholder="(123) 456-7890"
          className={`mt-2 block w-full px-4 py-3 bg-gray-800 text-white border ${
            formErrors.phone ? "border-red-500" : "border-gray-600"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
        <p className="mt-1 text-xs text-gray-400">
          We'll send booking confirmation via WhatsApp to this number
        </p>
        {formErrors.phone && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle size={16} className="mr-1" /> {formErrors.phone}
          </p>
        )}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <div className="flex items-center mb-4">
          <FileText className="mr-2 text-blue-500" />
          <label htmlFor="description" className="block text-lg font-medium text-gray-200">
            Brief Description of Your Legal Issue
          </label>
        </div>
        <textarea
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          placeholder="Please provide details about your legal issue so we can better assist you..."
          rows={5}
          className={`mt-2 block w-full px-4 py-3 bg-gray-800 text-white border ${
            formErrors.description ? "border-red-500" : "border-gray-600"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
        <p className="mt-1 text-xs text-gray-400">
          {formState.description.length}/500 characters
        </p>
        {formErrors.description && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle size={16} className="mr-1" /> {formErrors.description}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" /> Previous
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className={`bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Book Your Appointment"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Use Header Component */}
      <Header />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-2">Book a Legal Service</h1>
        <p className="text-lg text-center text-gray-400 mb-10">
          Get expert legal advice from our experienced attorneys. Follow the steps below to book your consultation.
        </p>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-600 text-white p-4 rounded-lg mb-6 flex items-start">
            <CheckCircle className="mr-2 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-lg">{successMessage}</p>
              <p className="mt-2">We'll be in touch with you shortly to confirm your appointment.</p>
              <button 
                onClick={() => {
                  setSuccessMessage("");
                  setCurrentStep(1);
                }} 
                className="mt-4 bg-white text-green-700 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6 flex items-start">
            <AlertCircle className="mr-2 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium">{errorMessage}</p>
              <p className="mt-2">Please try again or contact us directly for assistance.</p>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        {!successMessage && renderProgressSteps()}

        {/* Form Steps */}
        <div className="mt-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex justify-center">
          <button className="text-blue-500 hover:text-blue-400 flex items-center transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            View All Legal Services
          </button>
        </div>
      </div>

      {/* Use Footer Component */}
      <Footer />
    </div>
  );
};

export default BookServicePage;
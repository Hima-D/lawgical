"use client";
import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import services from '@/components/services';
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
  Home,
  Star,
  Shield,
  Zap,
  Award
} from 'lucide-react';

const Consultation = () => {
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

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccessMessage("Your consultation has been booked successfully! We'll contact you shortly to confirm the details.");
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
    } catch (error) {
      setErrorMessage("There was an error submitting your form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get attorneys based on selected service
  const getAttorneys = () => {
    const attorneyMap = {
      'Immigration Law': [
        { id: "attorney1", name: "Jessica Rodriguez", specialty: "Immigration Law", rating: 4.9, experience: "8 Years" },
        { id: "attorney2", name: "Carlos Martinez", specialty: "Immigration Law", rating: 4.8, experience: "12 Years" }
      ],
      'Corporate Law': [
        { id: "attorney3", name: "Michael Chang", specialty: "Corporate Law", rating: 4.9, experience: "10 Years" },
        { id: "attorney4", name: "David Kim", specialty: "Corporate Law", rating: 4.7, experience: "15 Years" }
      ],
      'Family Law': [
        { id: "attorney5", name: "Sarah Williams", specialty: "Family Law", rating: 4.8, experience: "9 Years" },
        { id: "attorney6", name: "Emma Johnson", specialty: "Family Law", rating: 4.9, experience: "11 Years" }
      ],
      'Criminal Law': [
        { id: "attorney7", name: "Robert Brown", specialty: "Criminal Law", rating: 4.9, experience: "13 Years" },
        { id: "attorney8", name: "Lisa Davis", specialty: "Criminal Law", rating: 4.8, experience: "7 Years" }
      ],
      'Personal Injury': [
        { id: "attorney9", name: "James Wilson", specialty: "Personal Injury", rating: 4.7, experience: "14 Years" },
        { id: "attorney10", name: "Maria Garcia", specialty: "Personal Injury", rating: 4.9, experience: "6 Years" }
      ]
    };

    return attorneyMap[formState.service] || [];
  };

  // Render progress steps
  const renderProgressSteps = () => {
    const steps = [
      { number: 1, title: "Choose Service", icon: Briefcase },
      { number: 2, title: "Schedule", icon: Calendar },
      { number: 3, title: "Your Details", icon: User }
    ];

    return (
      <div className="flex justify-center items-center mb-12">
        <div className="flex items-center w-full max-w-3xl">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex flex-1 items-center">
                <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                  <div className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 ${
                    currentStep === step.number
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg scale-110"
                      : currentStep > step.number
                      ? "bg-gradient-to-r from-green-400 to-green-600 border-transparent text-white shadow-lg"
                      : "bg-white border-gray-300 text-gray-400 shadow-sm"
                  }`}>
                    {currentStep > step.number ? <CheckCircle size={20} /> : <Icon size={20} />}
                  </div>
                  <div className={`mt-3 text-center transition-colors duration-300 ${
                    currentStep >= step.number ? "text-gray-900" : "text-gray-400"
                  }`}>
                    <div className="text-sm font-semibold">{step.title}</div>
                    <div className="text-xs">Step {step.number}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                    currentStep > step.number ? "bg-gradient-to-r from-green-400 to-green-600" : "bg-gray-200"
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Step 1: Select Service and Attorney
  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Service Selection */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white mr-4">
              <Briefcase size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Select Legal Service</h3>
              <p className="text-gray-600">Choose the area of law you need assistance with</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((serviceItem) => (
              <button
                key={serviceItem.id}
                onClick={() => handleChange({ target: { name: 'service', value: serviceItem.name } })}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-lg ${
                  formState.service === serviceItem.name
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="text-3xl mb-2">{serviceItem.icon}</div>
                <div className="font-semibold text-gray-900">{serviceItem.title}</div>
                <div className="text-sm text-gray-600 mt-1">Expert legal guidance</div>
              </button>
            ))}
          </div>
          {formErrors.service && (
            <p className="mt-4 text-sm text-red-500 flex items-center bg-red-50 p-3 rounded-lg">
              <AlertCircle size={16} className="mr-2" /> {formErrors.service}
            </p>
          )}
        </div>
      </div>

      {/* Attorney Selection */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white mr-4">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Choose Your Attorney</h3>
              <p className="text-gray-600">Select from our expert legal professionals</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          {!formState.service ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">👨‍💼</div>
              <p className="text-gray-500">Please select a service first to see available attorneys</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {getAttorneys().map((attorney) => (
                <button
                  key={attorney.id}
                  onClick={() => handleChange({ target: { name: 'attorney', value: attorney.name } })}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-lg ${
                    formState.attorney === attorney.name
                      ? "border-green-500 bg-gradient-to-br from-green-50 to-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-green-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-gray-900">{attorney.name}</div>
                    <div className="flex items-center text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm ml-1">{attorney.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{attorney.specialty}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center">
                    <Award size={12} className="mr-1" />
                    {attorney.experience} Experience
                  </div>
                </button>
              ))}
            </div>
          )}
          {formErrors.attorney && (
            <p className="mt-4 text-sm text-red-500 flex items-center bg-red-50 p-3 rounded-lg">
              <AlertCircle size={16} className="mr-2" /> {formErrors.attorney}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Continue to Schedule
        </button>
      </div>
    </div>
  );

  // Step 2: Date and Time Selection
  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white mr-4">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Select Date</h3>
                <p className="text-gray-600">Choose your preferred consultation date</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <input
              type="date"
              id="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
              className={`w-full px-4 py-4 bg-gray-50 text-gray-900 border-2 ${
                formErrors.date ? "border-red-300" : "border-gray-200"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
              min={today}
            />
            {formErrors.date && (
              <p className="mt-3 text-sm text-red-500 flex items-center bg-red-50 p-3 rounded-lg">
                <AlertCircle size={16} className="mr-2" /> {formErrors.date}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white mr-4">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Select Time</h3>
                <p className="text-gray-600">Pick your preferred time slot</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleChange({ target: { name: 'time', value: slot } })}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-300 ${
                    formState.time === slot
                      ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {formErrors.time && (
              <p className="mt-3 text-sm text-red-500 flex items-center bg-red-50 p-3 rounded-lg">
                <AlertCircle size={16} className="mr-2" /> {formErrors.time}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" /> Previous Step
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Continue to Details
        </button>
      </div>
    </div>
  );

  // Step 3: Personal Details
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-gray-100">
            <div className="flex items-center">
              <User className="mr-3 text-green-600" size={20} />
              <label htmlFor="name" className="font-semibold text-gray-900">Full Name</label>
            </div>
          </div>
          <div className="p-4">
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border-2 ${
                formErrors.name ? "border-red-300" : "border-gray-200"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300`}
            />
            {formErrors.name && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <AlertCircle size={14} className="mr-1" /> {formErrors.name}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border-b border-gray-100">
            <div className="flex items-center">
              <Mail className="mr-3 text-blue-600" size={20} />
              <label htmlFor="email" className="font-semibold text-gray-900">Email Address</label>
            </div>
          </div>
          <div className="p-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border-2 ${
                formErrors.email ? "border-red-300" : "border-gray-200"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
            />
            {formErrors.email && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <AlertCircle size={14} className="mr-1" /> {formErrors.email}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 border-b border-gray-100">
          <div className="flex items-center">
            <Phone className="mr-3 text-purple-600" size={20} />
            <label htmlFor="phone" className="font-semibold text-gray-900">Phone Number</label>
          </div>
        </div>
        <div className="p-4">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border-2 ${
              formErrors.phone ? "border-red-300" : "border-gray-200"
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300`}
          />
          <p className="mt-2 text-xs text-gray-500 flex items-center">
            <Shield size={12} className="mr-1" />
            We'll send booking confirmation via WhatsApp to this number
          </p>
          {formErrors.phone && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
              <AlertCircle size={14} className="mr-1" /> {formErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 border-b border-gray-100">
          <div className="flex items-center">
            <FileText className="mr-3 text-orange-600" size={20} />
            <label htmlFor="description" className="font-semibold text-gray-900">Brief Description of Your Legal Issue</label>
          </div>
        </div>
        <div className="p-4">
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={handleChange}
            placeholder="Please provide details about your legal issue so we can better assist you..."
            rows={5}
            className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border-2 ${
              formErrors.description ? "border-red-300" : "border-gray-200"
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300`}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              {formState.description.length}/500 characters
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <Shield size={12} className="mr-1" />
              Your information is secure and confidential
            </div>
          </div>
          {formErrors.description && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
              <AlertCircle size={14} className="mr-1" /> {formErrors.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" /> Previous Step
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Booking...
            </>
          ) : (
            <>
              <CheckCircle size={18} className="mr-2" />
              Book Your Consultation
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Legal Consultation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get expert legal advice from our experienced attorneys. Connect with qualified professionals 
              who understand your needs and provide personalized solutions.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span>500+ Expert Lawyers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Zap className="w-4 h-4 text-purple-600" />
                </div>
                <span>Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 p-6 rounded-2xl mb-8 shadow-lg">
            <div className="flex items-start">
              <div className="p-2 bg-green-100 rounded-full mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Consultation Booked Successfully!</h3>
                <p className="mb-4">{successMessage}</p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      setSuccessMessage("");
                      setCurrentStep(1);
                    }} 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Book Another Consultation
                  </button>
                  <button className="bg-white text-green-700 border border-green-300 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                    View Booking Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800 p-6 rounded-2xl mb-8 shadow-lg">
            <div className="flex items-start">
              <div className="p-2 bg-red-100 rounded-full mr-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Booking Failed</h3>
                <p className="mb-4">{errorMessage}</p>
                <button 
                  onClick={() => setErrorMessage("")}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
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

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white w-fit mx-auto mb-4">
              <Shield size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Secure & Confidential</h4>
            <p className="text-gray-600 text-sm">Your information is protected with bank-level security</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white w-fit mx-auto mb-4">
              <Zap size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Quick Response</h4>
            <p className="text-gray-600 text-sm">Get connected with an attorney within 24 hours</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white w-fit mx-auto mb-4">
              <Award size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Expert Attorneys</h4>
            <p className="text-gray-600 text-sm">Work with qualified and experienced legal professionals</p>
           </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <button className="text-blue-600 hover:text-blue-700 flex items-center mx-auto transition-colors font-medium">
            <ArrowLeft size={16} className="mr-2" />
            Back to Legal Services
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Consultation;
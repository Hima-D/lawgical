"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Calendar,
  ArrowRight,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Slot } from "@radix-ui/react-slot"; // For asChild support
import Header from "@/components/header";
import Footer from "@/components/footer";

// Error Boundary Component
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      console.error("ErrorBoundary caught:", error);
      setHasError(true);
    };
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">Please refresh the page or try again later.</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return children;
};

// Button Component with asChild Support
const Button = ({ children, variant = "default", size = "default", className = "", asChild = false, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
};

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Input = ({ className = "", type = "text", label, id, ...props }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  </div>
);

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    jobTitle: "",
    country: "",
    referralSource: "",
    batchPreference: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.batchPreference) newErrors.batchPreference = "Please select a batch";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log("Validation errors:", formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      console.log("Submitting form data:", formData);
      const response = await fetch("/api/posh/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setSubmitMessage("Registration successful! We'll contact you soon with confirmation details.");
      setShowConfirmation(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        organization: "",
        jobTitle: "",
        country: "",
        referralSource: "",
        batchPreference: "",
        termsAccepted: false,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitMessage(error.message || "An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitClick = () => {
    console.log("Submit button clicked");
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  // Animation for hero section
  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (hero) {
      hero.classList.add("animate-fade-in");
    }
  }, []);

  // Debug logging
  useEffect(() => {
    console.log("RegisterPage rendered, formData:", formData);
  }, [formData]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <Head>
          <title>Register for POSH Trainer Certification | POSHTraining Pro</title>
          <meta
            name="description"
            content="Sign up for our CPD-accredited POSH Trainer Certification program to lead workplace compliance with confidence."
          />
          <meta name="keywords" content="POSH training, POSH certification, workplace compliance, trainer program" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        {/* Hero Section */}
        <section
          id="hero-section"
          className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24 opacity-0 transition-opacity duration-1000"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Register for Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  POSH Trainer Certification
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our CPD-accredited program to become a certified POSH trainer and lead workplace compliance with confidence.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Registration Form */}
              <Card className="bg-white shadow-xl border border-gray-100">
                <CardHeader>
                  <CardTitle>Registration Form</CardTitle>
                  <CardDescription>
                    Fill out the details below to secure your spot in our next batch starting July 22nd, 2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <Input
                      name="fullName"
                      id="fullName"
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="text-sm text-red-500 mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> {errors.fullName}
                      </p>
                    )}

                    <Input
                      name="email"
                      id="email"
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-500 mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
                      </p>
                    )}

                    <Input
                      name="phone"
                      id="phone"
                      label="Phone Number"
                      placeholder="e.g., +91 123 456 7890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-sm text-red-500 mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> {errors.phone}
                      </p>
                    )}

                    <Input
                      name="organization"
                      id="organization"
                      label="Organization (Optional)"
                      placeholder="Enter your organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                    />

                    <Input
                      name="jobTitle"
                      id="jobTitle"
                      label="Job Title"
                      placeholder="Enter your job title"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      required
                      aria-invalid={!!errors.jobTitle}
                      aria-describedby={errors.jobTitle ? "jobTitle-error" : undefined}
                      className={errors.jobTitle ? "border-red-500" : ""}
                    />
                    {errors.jobTitle && (
                      <p id="jobTitle-error" className="text-sm text-red-500 mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> {errors.jobTitle}
                      </p>
                    )}

                    <Input
                      name="country"
                      id="country"
                      label="Country"
                      placeholder="Enter your country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      aria-invalid={!!errors.country}
                      aria-describedby={errors.country ? "country-error" : undefined}
                      className={errors.country ? "border-red-500" : ""}
                    />
                    {errors.country && (
                      <p id="country-error" className="text-sm text-red-500 mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> {errors.country}
                      </p>
                    )}

                    <div className="space-y-1">
                      <label htmlFor="referralSource" className="text-sm font-medium text-gray-700">
                        How Did You Hear About Us?
                      </label>
                      <select
                        name="referralSource"
                        id="referralSource"
                        value={formData.referralSource}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="Social Media">Social Media</option>
                        <option value="Colleague/Friend">Colleague/Friend</option>
                        <option value="Website">Website</option>
                        <option value="Event/Conference">Event/Conference</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="batchPreference" className="text-sm font-medium text-gray-700">
                        Batch Preference
                      </label>
                      <select
                        name="batchPreference"
                        id="batchPreference"
                        value={formData.batchPreference}
                        onChange={handleInputChange}
                        required
                        aria-invalid={!!errors.batchPreference}
                        aria-describedby={errors.batchPreference ? "batchPreference-error" : undefined}
                        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.batchPreference ? "border-red-500" : ""}`}
                      >
                        <option value="" disabled>
                          Select Batch Preference
                        </option>
                        <option value="July 22-23, 2025">July 22-23, 2025</option>
                        <option value="August 19-20, 2025">August 19-20, 2025</option>
                        <option value="September 16-17, 2025">September 16-17, 2025</option>
                      </select>
                      {errors.batchPreference && (
                        <p id="batchPreference-error" className="text-sm text-red-500 mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" /> {errors.batchPreference}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        id="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleInputChange}
                        required
                        aria-invalid={!!errors.termsAccepted}
                        aria-describedby={errors.termsAccepted ? "termsAccepted-error" : undefined}
                        className={errors.termsAccepted ? "border-red-500" : ""}
                      />
                      <label htmlFor="termsAccepted" className="text-sm text-gray-600">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                    {errors.termsAccepted && (
                      <p id="termsAccepted-error" className="text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> {errors.termsAccepted}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 shadow-lg"
                      disabled={isSubmitting}
                      onClick={handleSubmitClick}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <>
                          Register Now
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                  {submitMessage && (
                    <p
                      className={`mt-4 text-center text-sm ${
                        submitMessage.includes("successful") ? "text-green-600" : "text-red-500"
                      } flex items-center justify-center`}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" /> {submitMessage}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Program Highlights */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Why Register?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">CPD-Accredited Certification</h4>
                      <p className="text-sm text-gray-600">
                        Earn a globally recognized credential to advance your career in compliance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert-Led Training</h4>
                      <p className="text-sm text-gray-600">
                        Learn from certified POSH advocates and psychologists with over 15 years of experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Practical Skills</h4>
                      <p className="text-sm text-gray-600">
                        Master real-world scenarios to implement effective POSH policies.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Flexible Batch Options</h4>
                      <p className="text-sm text-gray-600">
                        Choose from multiple batch dates to suit your schedule.
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg py-6"
                  asChild
                >
                  <Link href="/posh#contact">Contact Us for More Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Registering!</h3>
              <p className="text-gray-600 mb-6">
                Your registration for the POSH Trainer Certification has been successfully submitted. We'll reach out soon with confirmation details and next steps.
              </p>
              <div className="flex justify-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={closeConfirmation}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Workplaces?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join our POSH Trainer Certification program and become a leader in creating safe and inclusive workplaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                asChild
              >
                <Link href="#register">Register Now</Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                asChild
              >
                <Link href="/posh">Learn More</Link>
              </Button>
            </div>
            <div className="mt-8 text-blue-100 text-sm">
              <span>✓ Expert Guidance</span>
              <span className="mx-4">✓ CPD Accredited</span>
              <span>✓ Secure Registration</span>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* CSS for Animation */}
      <style jsx>{`
        .animate-fade-in {
          opacity: 1 !important;
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default RegisterPage;

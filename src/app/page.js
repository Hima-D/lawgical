"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slot } from "@radix-ui/react-slot";
import {
  Star,
  CheckCircle,
  FileText,
  Gavel,
  Users,
  Shield,
  X,
  Phone,
  Mail,
  User,
  MessageCircle,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// shadcn/ui Components
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  asChild = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background dark:ring-offset-gray-800";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white",
    link: "underline-offset-4 hover:underline text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-6 sm:px-8 rounded-md",
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
    className={`rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Consultation Modal Component
const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    serviceType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (submitError) {
      setSubmitError("");
    }
  };

  const submitToHubSpot = async (data) => {
    try {
      const response = await fetch("/api/hubspot-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: data.message,
          service_type: data.serviceType,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          contactId: result.contactId,
          message: result.message,
        };
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("HubSpot submission error:", error);
      return {
        success: false,
        error: error.message || "Network error occurred",
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitToHubSpot(formData);

      if (result.success) {
        setIsSuccess(true);

        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "G-4H1WL5DLNM/consultation_request",
            value: 1,
            currency: "USD",
          });
        }

        if (typeof window !== "undefined" && window.analytics) {
          window.analytics.track("Consultation Requested", {
            service_type: formData.serviceType,
            company: formData.company,
            contact_id: result.contactId,
            timestamp: new Date().toISOString(),
          });
        }

        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", {
            content_name: "Legal Consultation",
            content_category: formData.serviceType,
            value: 1,
            currency: "USD",
          });
        }

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          serviceType: "",
        });
      } else {
        setSubmitError(result.error);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsSuccess(false);
    setSubmitError("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      serviceType: "",
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Free Legal Consultation</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 sm:h-6 w-5 sm:w-6" />
            </button>
          </div>

          {isSuccess ? (
            <div className="text-center py-6 sm:py-8">
              <CheckCircle className="h-12 sm:h-16 w-12 sm:w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Your consultation request has been submitted successfully. Our legal expert will contact you within 24 hours.
              </p>
              <div className="space-y-2 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  📧 Confirmation email sent to: <strong>{formData.email}</strong>
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  We&apos;ll call you at: <strong>{formData.phone}</strong>
                </p>
              </div>
              <Button
                onClick={handleClose}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
              >
                Close
              </Button>
            </div>
          ) : (
            <div>
              {submitError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <X className="h-5 w-5 text-red-400 dark:text-red-300" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 dark:text-red-300">{submitError}</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        Please try again or contact us at +91-XXXXXXXXX
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Service Required *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  >
                    <option value="">Select a service</option>
                    <option value="company-registration">Company Registration</option>
                    <option value="gst-services">GST Services</option>
                    <option value="trademark">Trademark Registration</option>
                    <option value="legal-consultation">Legal Consultation</option>
                    <option value="compliance">Compliance Services</option>
                    <option value="contract-drafting">Contract Drafting</option>
                    <option value="intellectual-property">Intellectual Property</option>
                    <option value="tax-planning">Tax Planning</option>
                    <option value="labor-law">Labor Law</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your legal requirements..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  ></textarea>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800 dark:text-blue-300">
                      <p className="font-medium">Your information is secure</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        We use bank-level encryption and never share your data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                      </div>
                    ) : (
                      "Request Free Consultation"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    Cancel
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                  By submitting this form, you agree to our{" "}
                  <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms-of-service" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Terms of Service
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EXPERT_CONSULTATION = [
  {
    title: "Talk to a Lawyer",
    subtitle: "Expert legal advice",
    icon: "⚖️",
    color: "bg-blue-500",
  },
  {
    title: "Talk to a CA",
    subtitle: "Chartered Accountant consultation",
    icon: "📊",
    color: "bg-green-500",
  },
  {
    title: "Talk to a CS",
    subtitle: "Company Secretary guidance",
    icon: "📋",
    color: "bg-purple-500",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Choose Your Service",
    description: "Select from our range of legal and compliance services",
    icon: "🎯",
  },
  {
    step: "02",
    title: "Get Expert Consultation",
    description: "Connect with our qualified professionals",
    icon: "👥",
  },
  {
    step: "03",
    title: "Documentation & Filing",
    description: "We handle all paperwork and filings",
    icon: "📋",
  },
  {
    step: "04",
    title: "Completion & Support",
    description: "Receive documents and ongoing support",
    icon: "✅",
  },
];

const FEATURES = [
  {
    title: "Expert Team",
    description: "500+ qualified lawyers, CAs, and CS professionals",
    icon: "👨‍💼",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Quick Turnaround",
    description: "Fast processing with guaranteed timelines",
    icon: "⚡",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs, clear pricing structure",
    icon: "💰",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support",
    icon: "🔄",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Secure Platform",
    description: "Bank-level security for your data",
    icon: "🛡️",
    color: "from-red-500 to-red-600",
  },
  {
    title: "Delhi-NCR Focus",
    description: "Specialized services for Delhi-NCR businesses",
    icon: "🌍",
    color: "from-indigo-500 to-indigo-600",
  },
];

const STATS = [
  { number: "1M+", label: "Happy Clients", icon: Users },
  { number: "500+", label: "Expert Professionals", icon: Shield },
  { number: "15+", label: "Years Experience", icon: FileText },
  { number: "99%", label: "Success Rate", icon: CheckCircle },
];

const INDUSTRIES = [
  {
    name: "Startups",
    icon: "🚀",
    description: "End-to-end startup legal solutions",
  },
  { name: "E-commerce", icon: "🛒", description: "Online business compliance" },
  {
    name: "Healthcare",
    icon: "🏥",
    description: "Medical practice regulations",
  },
  {
    name: "Education",
    icon: "🎓",
    description: "Educational institution setup",
  },
  { name: "Real Estate", icon: "🏢", description: "Property legal services" },
  { name: "Manufacturing", icon: "🏭", description: "Industrial compliance" },
];

const FAQS = [
  {
    question: "What services does Lawgical provide?",
    answer:
      "Lawgical offers legal and compliance services, including contract drafting, business registration, tax filing, POSH training, and expert consultations.",
  },
  {
    question: "How can I book a free consultation?",
    answer:
      "Click the 'Free Consultation' button to schedule a session with our experts for personalized guidance.",
  },
  {
    question: "Is my data secure with Lawgical?",
    answer:
      "Yes, we use bank-level security measures to protect your data and ensure confidentiality.",
  },
  {
    question: "How long does it take to process my legal requirements?",
    answer:
      "Processing times vary, but we ensure quick turnarounds, typically 7-15 days for registrations and filings.",
  },
  {
    question: "Do you serve clients outside major cities?",
    answer:
      "Yes, while we specialize in Delhi-NCR, our services are available across India via online consultations.",
  },
];

// Error Boundary
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
            Please refresh the page or try again later.
          </p>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return children;
};

export default function LawgicalHomepage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [counters, setCounters] = useState({
    clients: 0,
    experts: 0,
    experience: 0,
    success: 0,
  });

  useEffect(() => {
    const animateCounter = (target, key, suffix = "") => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters((prev) => ({
          ...prev,
          [key]: Math.floor(current) + suffix,
        }));
      }, 20);
    };

    animateCounter(1000000, "clients", "+");
    animateCounter(500, "experts", "+");
    animateCounter(15, "experience", "+");
    animateCounter(99, "success", "%");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % FEATURES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Head>
          <title>
            Lawgical | India&apos;s Leading Legal & Compliance Platform
          </title>
          <meta
            name="description"
            content="Simplify your legal, tax, and compliance needs with Lawgical. Trusted by over 1M+ clients."
          />
          <meta
            name="keywords"
            content="legal services, compliance, tax filing, contract law, POSH training, business registration"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
        />

        {/* Hero Section - Mobile Optimized */}
        <section
          id="home"
          className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 pb-8 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div className="text-center lg:text-left order-1">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    India&apos;s Leading
                  </span>{" "}
                  Legal & Compliance Platform
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                  Simplifying legal, tax, and compliance services for individuals and businesses across India.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
                  <Button
                    size="lg"
                    onClick={() => setIsConsultationOpen(true)}
                    className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
                  >
                    Free Consultation
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white transition-all w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/services">View Services</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>1M+ Happy Clients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>500+ Legal Experts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>15+ Years Experience</span>
                  </div>
                </div>
              </div>
              <div className="relative order-2">
                <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Start Your Legal Journey
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-700">
                      <FileText className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                          Quick Registration
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Business registration in 7-15 days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-100 dark:border-green-700">
                      <Users className="h-5 sm:h-6 w-5 sm:w-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                          Expert Support
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          24/7 support from professionals
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-100 dark:border-purple-700">
                      <Shield className="h-5 sm:h-6 w-5 sm:w-6 text-purple-600 dark:text-purple-400 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                          100% Secure
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Your data is safe and confidential
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Consultation Banner - Mobile Optimized */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {EXPERT_CONSULTATION.map((expert, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => setIsConsultationOpen(true)}
                  className="flex items-center justify-center p-4 bg-white/10 dark:bg-white/5 backdrop-blur rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all group"
                >
                  <span className="text-xl sm:text-2xl mr-3">{expert.icon}</span>
                  <div className="text-white text-left">
                    <h3 className="font-semibold text-sm sm:text-base group-hover:text-yellow-200 dark:group-hover:text-yellow-300 transition-colors">
                      {expert.title}
                    </h3>
                    <p className="text-xs opacity-90">{expert.subtitle}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Mobile Optimized */}
        <section id="stats" className="py-8 sm:py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 sm:mb-3">
                    <stat.icon className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600 dark:text-blue-400 mx-auto" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {index === 0
                      ? counters.clients
                      : index === 1
                        ? counters.experts
                        : index === 2
                          ? counters.experience
                          : counters.success}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Mobile Optimized */}
        <section
          id="process"
          className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                How Lawgical Works
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Simple, transparent process to get your legal work done
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {PROCESS_STEPS.map((step, index) => (
                <div key={index} className="relative text-center">
                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div className="text-3xl sm:text-4xl mb-3">{step.icon}</div>
                    <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {step.step}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                  </Card>
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <svg
                        className="w-6 h-6 text-blue-300 dark:text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Lawgical - Mobile Optimized */}
        <section id="features" className="py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Why Choose Lawgical
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Accessible, affordable, and efficient legal services
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {FEATURES.map((feature, index) => (
                <Card
                  key={index}
                  className={`p-4 sm:p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white transform scale-105 shadow-2xl"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700"
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="text-2xl sm:text-3xl mb-3">{feature.icon}</div>
                  <h3
                    className={`text-base sm:text-lg font-semibold mb-2 ${
                      activeFeature === index ? "text-white" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm ${
                      activeFeature === index
                        ? "text-blue-100"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Mobile Optimized */}
        <section
          id="testimonials"
          className="py-8 sm:py-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                What Our Clients Say
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Trusted by clients for their legal and compliance needs
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  name: "Priya Sharma",
                  role: "Startup Founder",
                  content: "Lawgical made our business registration seamless.",
                  rating: 5,
                },
                {
                  name: "Rahul Mehta",
                  role: "E-commerce Entrepreneur",
                  content: "Tax filing services saved us time and ensured compliance.",
                  rating: 5,
                },
                {
                  name: "Sneha Gupta",
                  role: "HR Manager",
                  content: "POSH training helped us create a safer workplace.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic mb-3 sm:mb-4 text-xs sm:text-sm">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="border-t pt-3">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industries We Serve - Mobile Optimized */}
        <section
          id="industries"
          className="py-8 sm:py-12 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Industries We Serve
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Specialized legal solutions for every industry
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {INDUSTRIES.map((industry, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {industry.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1">
                    {industry.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {industry.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Mobile Optimized */}
        <section
          id="faq"
          className="py-8 sm:py-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Answers to common questions about our services
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                  >
                    <AccordionTrigger className="px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section - Mobile Optimized */}
        <section
          id="cta"
          className="py-8 sm:py-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700"
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 mb-4 sm:mb-6 leading-relaxed">
              Join over 1 million+ clients trusting Lawgical for their legal needs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => setIsConsultationOpen(true)}
                className="bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                Start Your Legal Journey
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsConsultationOpen(true)}
                className="border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-white hover:text-blue-600 dark:hover:bg-gray-100 dark:hover:text-blue-600 transition-all w-full sm:w-auto"
              >
                Book Free Consultation
              </Button>
            </div>
            <div className="mt-4 sm:mt-6 text-blue-100 text-xs sm:text-sm">
              <span>✓ No hidden fees</span>
              <span className="mx-3 sm:mx-4">✓ Expert guidance</span>
              <span>✓ 100% secure</span>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
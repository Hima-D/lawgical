"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Scale,
  Shield,
  FileText,
  Phone,
  Mail,
  CheckCircle,
  Users,
  Clock,
  Award,
  Star,
  Gavel,
  Search,
  Target,
  MessageCircle,
  ArrowRight,
  X,
  User,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slot } from "@radix-ui/react-slot";
import TestimonialsSlider from "@/components/testimonials";

// Simplified shadcn/ui Components to match LitigationHomepage
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  asChild = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border-2 border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 rounded-md",
    lg: "h-12 px-8 text-lg",
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
    className={`rounded-lg border bg-white text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-input",
  };
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

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
      <Card className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Free Legal Consultation</h2>
            <Button
              variant="ghost"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-6">
                Your consultation request has been submitted successfully. Our legal expert will contact you within 24 hours.
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-500">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Confirmation email sent to: <strong>{formData.email}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  <Phone className="h-4 w-4 inline mr-2" />
                  We&apos;ll call you at: <strong>{formData.phone}</strong>
                </p>
              </div>
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Close
              </Button>
            </div>
          ) : (
            <div>
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="text-sm text-red-700">{submitError}</p>
                      <p className="text-xs text-red-600 mt-1">
                        Please try again or contact us at +91-8383801899
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Required *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
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
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your legal requirements..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  ></textarea>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Your information is secure</p>
                      <p className="text-xs text-blue-600 mt-1">
                        We use bank-level encryption and never share your data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
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
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500 mt-4">
                  By submitting this form, you agree to our{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms-of-service" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

const EXPERT_CONSULTATION = [
  {
    title: "Talk to a Lawyer",
    subtitle: "Expert legal advice",
    icon: Gavel,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Talk to a CA",
    subtitle: "Chartered Accountant consultation",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Talk to a CS",
    subtitle: "Company Secretary guidance",
    icon: Users,
    color: "from-purple-500 to-violet-500",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Choose Your Service",
    description: "Select from our range of legal and compliance services",
    icon: Target,
  },
  {
    step: "02",
    title: "Get Expert Consultation",
    description: "Connect with our qualified professionals",
    icon: Users,
  },
  {
    step: "03",
    title: "Documentation & Filing",
    description: "We handle all paperwork and filings",
    icon: FileText,
  },
  {
    step: "04",
    title: "Completion & Support",
    description: "Receive documents and ongoing support",
    icon: CheckCircle,
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Expert Team",
    description: "500+ qualified lawyers, CAs, and CS professionals",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Fast processing with guaranteed timelines",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Award,
    title: "Transparent Pricing",
    description: "No hidden costs, clear pricing structure",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Shield,
    title: "24/7 Support",
    description: "Round-the-clock customer support",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Scale,
    title: "Secure Platform",
    description: "Bank-level security for your data",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "Delhi-NCR Focus",
    description: "Specialized services for Delhi-NCR businesses",
    color: "from-pink-500 to-rose-500",
  },
];

const STATS = [
  { number: "1M+", label: "Happy Clients", icon: Users },
  { number: "500+", label: "Expert Professionals", icon: Shield },
  { number: "15+", label: "Years Experience", icon: Clock },
  { number: "99%", label: "Success Rate", icon: CheckCircle },
];

const INDUSTRIES = [
  {
    name: "Startups",
    icon: Target,
    description: "End-to-end startup legal solutions",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "E-commerce",
    icon: FileText,
    description: "Online business compliance",
    color: "from-purple-500 to-violet-500",
  },
  {
    name: "Healthcare",
    icon: CheckCircle,
    description: "Medical practice regulations",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Education",
    icon: Users,
    description: "Educational institution setup",
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Real Estate",
    icon: Scale,
    description: "Property legal services",
    color: "from-teal-500 to-cyan-500",
  },
  {
    name: "Manufacturing",
    icon: Gavel,
    description: "Industrial compliance",
    color: "from-pink-500 to-rose-500",
  },
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4 text-base">
            Please refresh the page or try again later.
          </p>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
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
      <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-100">
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

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <Badge className="mb-6">
                  ⚖️ Expert Legal Services
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  India&apos;s Leading
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {" "}Legal & Compliance Platform
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Simplifying legal, tax, and compliance services for individuals and businesses across India with expert guidance and seamless processes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
                    onClick={() => setIsConsultationOpen(true)}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Free Consultation
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    asChild
                  >
                    <Link href="/service">
                      View Services
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start space-x-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>1M+ Happy Clients</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>500+ Legal Experts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>15+ Years Experience</span>
                  </div>
                </div>
              </div>
              <div>
                <Card className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Scale className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Start Your Legal Journey
                    </h3>
                    <p className="text-gray-600 mt-2">Simplify your legal needs today</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <FileText className="h-8 w-8 text-blue-600 mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Quick Registration</h4>
                        <p className="text-sm text-gray-600">
                          Business registration in 7-15 days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <Users className="h-8 w-8 text-purple-600 mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Expert Support</h4>
                        <p className="text-sm text-gray-600">
                          24/7 support from professionals
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                      <Shield className="h-8 w-8 text-green-600 mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-900">100% Secure</h4>
                        <p className="text-sm text-gray-600">
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

        {/* Expert Consultation Banner */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {EXPERT_CONSULTATION.map((expert, index) => (
                <Card
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div
                    className={`bg-gradient-to-r ${expert.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <expert.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{expert.title}</h3>
                  <p className="text-gray-600 text-sm">{expert.subtitle}</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={() => setIsConsultationOpen(true)}
                  >
                    Consult Now
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {index === 0
                      ? counters.clients
                      : index === 1
                      ? counters.experts
                      : index === 2
                      ? counters.experience
                      : counters.success}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">How Lawgical Works</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Simple, transparent process to get your legal work done
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {PROCESS_STEPS.map((step, index) => (
                <Card
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <step.icon className="h-6 w-6 text-blue-600 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Lawgical */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Lawgical</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Accessible, affordable, and efficient legal services
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature, index) => (
                <Card
                  key={index}
                  className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group ${
                    activeFeature === index
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "bg-white"
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-4 ${
                          activeFeature === index ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`leading-relaxed ${
                          activeFeature === index ? "text-blue-100" : "text-gray-600"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSlider/>
        {/* Testimonials Slider Component */}

        {/* Industries We Serve */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Industries We Serve</h2>
              <p className="text-xl text-gray-600">Specialized legal solutions for every industry</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {INDUSTRIES.map((industry, index) => (
                <Card
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div
                    className={`bg-gradient-to-r ${industry.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <industry.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.name}</h3>
                  <p className="text-gray-600 text-sm">{industry.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Answers to common questions about our services
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white rounded-xl shadow-lg border border-gray-100"
                  >
                    <AccordionTrigger className="px-6 py-4 text-base font-semibold text-gray-900 hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Join over 1 million+ clients trusting Lawgical for their legal needs
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Legal Hotline</h3>
                <a
                  href="tel:+918383801899"
                  className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  +91 8383801899
                </a>
                <p className="text-sm text-gray-600 mt-2">(Immediate Response)</p>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200 text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Consultation</h3>
                <a
                  href="mailto:support@lawgical.tech"
                  className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors"
                >
                  support@lawgical.tech
                </a>
                <p className="text-sm text-gray-600 mt-2">(Free Case Review)</p>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl border border-green-200 text-center">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Consultation</h3>
                <p className="text-xl font-bold text-green-600">Online Booking</p>
                <p className="text-sm text-gray-600 mt-2">Schedule Now</p>
              </Card>
            </div>
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg text-lg px-12 py-4"
                onClick={() => setIsConsultationOpen(true)}
              >
                <Phone className="h-5 w-5 mr-2" />
                Schedule Free Consultation
              </Button>
              <p className="text-sm text-gray-500 mt-4">No obligation • Confidential • Expert legal advice</p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

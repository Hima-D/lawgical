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
  Gavel,
  Search,
  Target,
  ArrowRight,
  X,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TestimonialsSlider from "@/components/testimonials";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Card, CardContent } from "@/components/ui/card"; // shadcn/ui Card
import { Badge } from "@/components/ui/badge"; // shadcn/ui Badge

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
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Free Legal Consultation in India</h2>
            <Button
              variant="ghost"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close consultation modal"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Thank You for Your Request!
              </h3>
              <p className="text-gray-600 mb-6">
                Your consultation request has been submitted successfully. Our legal expert will contact you within 24 hours.
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-500">
                  <Mail className="h-4 w-4 inline mr-2" aria-hidden="true" />
                  Confirmation email sent to: <strong>{formData.email}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  <Phone className="h-4 w-4 inline mr-2" aria-hidden="true" />
                  We&apos;ll call you at: <strong>{formData.phone}</strong>
                </p>
              </div>
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                aria-label="Close modal after successful submission"
              >
                Close
              </Button>
            </div>
          ) : (
            <div>
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-3" aria-hidden="true" />
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
                      aria-required="true"
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
                      aria-required="true"
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
                    placeholder="john.doe@domain.com"
                    aria-required="true"
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
                    aria-required="true"
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
                    aria-required="true"
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
                    <Shield className="h-5 w-5 text-blue-600 mt-1 mr-3" aria-hidden="true" />
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
                    aria-label="Submit consultation request"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
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
                    aria-label="Cancel consultation request"
                  >
                    Cancel
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500 mt-4">
                  By submitting this form, you agree to our{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline" prefetch={false}>
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms-of-service" className="text-blue-600 hover:underline" prefetch={false}>
                    Terms of Service
                  </Link>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const EXPERT_CONSULTATION = [
  {
    title: "Talk to a Lawyer",
    subtitle: "Expert Legal Advice in India",
    icon: Gavel,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Talk to a CA",
    subtitle: "Chartered Accountant for GST & Tax",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Talk to a CS",
    subtitle: "Company Secretary for Compliance",
    icon: Users,
    color: "from-purple-500 to-violet-500",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Choose Your Service",
    description: "Select from our range of legal and compliance services, including company incorporation and GST registration",
    icon: Target,
  },
  {
    step: "02",
    title: "Get Expert Consultation",
    description: "Connect with our qualified lawyers, CAs, and CS professionals",
    icon: Users,
  },
  {
    step: "03",
    title: "Documentation & Filing",
    description: "We handle all paperwork for business registration, tax filing, and compliance",
    icon: FileText,
  },
  {
    step: "04",
    title: "Completion & Support",
    description: "Receive your documents and ongoing support for legal needs",
    icon: CheckCircle,
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Expert Team",
    description: "100+ qualified lawyers, CAs, and CS professionals for startups and businesses",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Fast company incorporation and GST registration in 7-15 days",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Award,
    title: "Transparent Pricing",
    description: "No hidden costs for legal and compliance services",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Shield,
    title: "24/7 Support",
    description: "Round-the-clock support for your legal queries",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Scale,
    title: "Secure Platform",
    description: "Bank-level security for your business data",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "India-Focused Services",
    description: "Specialized legal services for startups and businesses across India",
    color: "from-pink-500 to-rose-500",
  },
];

const STATS = [
  { number: "10+", label: "Happy Clients", icon: Users },
  { number: "10+", label: "Expert Professionals", icon: Shield },
  { number: "2+", label: "Years Experience", icon: Clock },
  { number: "99%", label: "Success Rate", icon: CheckCircle },
];

const INDUSTRIES = [
  {
    name: "Startups",
    icon: Target,
    description: "End-to-end startup legal solutions, including company incorporation",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "E-commerce",
    icon: FileText,
    description: "Compliance and tax solutions for online businesses",
    color: "from-purple-500 to-violet-500",
  },
  {
    name: "Healthcare",
    icon: CheckCircle,
    description: "Regulatory compliance for medical practices",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Education",
    icon: Users,
    description: "Legal setup for educational institutions",
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Real Estate",
    icon: Scale,
    description: "Property legal services and documentation",
    color: "from-teal-500 to-cyan-500",
  },
  {
    name: "Manufacturing",
    icon: Gavel,
    description: "Industrial compliance and contract drafting",
    color: "from-pink-500 to-rose-500",
  },
];

const FAQS = [
  {
    question: "What legal services does Lawgical provide in India?",
    answer:
      "Lawgical offers company incorporation, GST registration, tax filing, POSH compliance, contract drafting, and expert consultations for businesses and individuals across India.",
  },
  {
    question: "How can I book a free legal consultation?",
    answer:
      "Click the 'Free Consultation' button to schedule a session with our expert lawyers, CAs, or CS professionals.",
  },
  {
    question: "Is my business data secure with Lawgical?",
    answer:
      "Yes, we use bank-level encryption to ensure the confidentiality and security of your data.",
  },
  {
    question: "How long does company incorporation take in India?",
    answer:
      "Company incorporation typically takes 7-15 days with Lawgical’s streamlined process.",
  },
  {
    question: "Does Lawgical serve clients outside major cities?",
    answer:
      "Yes, while we specialize in Delhi-NCR, our services, including GST registration and legal consultations, are available across India via online platforms.",
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
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => window.location.reload()}
            aria-label="Refresh page"
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

    animateCounter(10, "clients", "+");
    animateCounter(10, "experts", "+");
    animateCounter(2, "experience", "+");
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
        {/* SEO: Enhanced Head section with meta tags and schema markup */}
        <Head>
          <title>Lawgical: Legal Services & Company Incorporation in India</title>
          <meta
            name="description"
            content="Lawgical offers expert legal services, company incorporation, GST registration, and compliance solutions across India. Trusted by 1M+ clients. Book a free consultation today!"
          />
          <meta
            name="keywords"
            content="legal services India, company incorporation, GST registration, POSH compliance, tax filing, contract drafting, startup legal services, Delhi NCR legal experts"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Lawgical" />
          <meta property="og:title" content="Lawgical: Legal Services & Company Incorporation in India" />
          <meta
            property="og:description"
            content="Expert legal, tax, and compliance services for startups and businesses in India. Book a free consultation with Lawgical today!"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.lawgical.tech" />
          <meta property="og:image" content="https://www.lawgical.tech/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Lawgical: Legal Services & Company Incorporation in India" />
          <meta
            name="twitter:description"
            content="Simplify your legal needs with Lawgical’s expert services in India. Company incorporation, GST registration, and more."
          />
          <meta name="twitter:image" content="https://www.lawgical.tech/og-image.jpg" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://www.lawgical.tech" />
          {/* Schema Markup for Organization */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Lawgical",
                "url": "https://www.lawgical.tech",
                "logo": "https://www.lawgical.tech/logo.png",
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+91-8383801899",
                    "contactType": "Customer Service",
                    "areaServed": "IN",
                    "availableLanguage": ["English", "Hindi"]
                  },
                  {
                    "@type": "ContactPoint",
                    "email": "support@lawgical.tech",
                    "contactType": "Customer Support"
                  }
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Delhi",
                  "addressRegion": "Delhi NCR",
                  "addressCountry": "IN"
                },
                "sameAs": [
                  "https://www.facebook.com/lawgical",
                  "https://twitter.com/lawgicaltech",
                  "https://www.linkedin.com/company/lawgical"
                ]
              }
            `}
          </script>
          {/* Schema Markup for LocalBusiness */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Lawgical",
                "url": "https://www.lawgical.tech",
                "telephone": "+91-8383801899",
                "email": "support@lawgical.tech",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Delhi",
                  "addressRegion": "Delhi NCR",
                  "addressCountry": "IN"
                },
                "openingHours": "Mo-Su 00:00-23:59",
                "description": "Lawgical provides legal, tax, and compliance services including company incorporation, GST registration, and POSH compliance across India."
              }
            `}
          </script>
        </Head>

        <Header />

        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
        />

        {/* Hero Section: Optimized for keywords */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <Badge className="mb-6 bg-blue-100 text-blue-800">⚖️ Legal Services India</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Expert
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {" "}Legal & Compliance Services
                  </span>{" "}
                  in India
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Lawgical simplifies company incorporation, GST registration, POSH compliance, and legal services for startups and businesses across India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
                    onClick={() => setIsConsultationOpen(true)}
                    aria-label="Book free legal consultation"
                  >
                    <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                    Free Legal Consultation
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    asChild
                  >
                    <Link href="/service" prefetch={false}>
                      Explore Legal Services
                      <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start space-x-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>10+ Happy Clients</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>10+ Legal Experts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>2+ Years Experience</span>
                  </div>
                </div>
              </div>
              <div>
                <Card className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <CardContent className="text-center">
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Scale className="h-8 w-8 text-white" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Start Your Legal Journey in India
                      </h2>
                      <p className="text-gray-600 mt-2">Expert legal solutions for startups and businesses</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <FileText className="h-8 w-8 text-blue-600 mr-4" aria-hidden="true" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Company Incorporation</h3>
                          <p className="text-sm text-gray-600">
                            Register your business in India in 7-15 days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <Users className="h-8 w-8 text-purple-600 mr-4" aria-hidden="true" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Expert Legal Support</h3>
                          <p className="text-sm text-gray-600">
                            24/7 consultations with lawyers and CAs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                        <Shield className="h-8 w-8 text-green-600 mr-4" aria-hidden="true" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Secure GST Registration</h3>
                          <p className="text-sm text-gray-600">
                            Safe and confidential compliance services
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Consultation Banner: Keyword-optimized subtitles */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {EXPERT_CONSULTATION.map((expert, index) => (
                <Card
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <CardContent>
                    <div
                      className={`bg-gradient-to-r ${expert.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <expert.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{expert.title}</h2>
                    <p className="text-gray-600 text-sm">{expert.subtitle}</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      onClick={() => setIsConsultationOpen(true)}
                      aria-label={`Consult with ${expert.title}`}
                    >
                      Consult Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 hidden">
              Our Achievements
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <stat.icon className="h-8 w-8 text-white" aria-hidden="true" />
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

        {/* How It Works: Keyword-optimized descriptions */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">How Lawgical Simplifies Legal Services</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Streamlined process for company incorporation, GST registration, and compliance in India
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {PROCESS_STEPS.map((step, index) => (
                <Card
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          <step.icon className="h-6 w-6 text-blue-600 mr-2" aria-hidden="true" />
                          <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Lawgical: Keyword-optimized descriptions */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Lawgical for Legal Services</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Trusted legal solutions for startups, compliance, and tax filing in India
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
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div
                        className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section: Add schema markup */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Client Testimonials
            </h2>
            <TestimonialsSlider />
            {/* Schema Markup for Reviews */}
            <script type="application/ld+json">
              {`
                [
                  {
                    "@context": "https://schema.org",
                    "@type": "Review",
                    "itemReviewed": {
                      "@type": "Organization",
                      "name": "Lawgical"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "4.8",
                      "bestRating": "5"
                    },
                    "author": {
                      "@type": "Person",
                      "name": "Priya Sharma"
                    },
                    "reviewBody": "Lawgical made our company incorporation seamless and fast. Highly recommend their services!",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Lawgical"
                    }
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "Review",
                    "itemReviewed": {
                      "@type": "Organization",
                      "name": "Lawgical"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "4.9",
                      "bestRating": "5"
                    },
                    "author": {
                      "@type": "Person",
                      "name": "Rahul Mehta"
                    },
                    "reviewBody": "Their GST registration and tax filing services saved us time and ensured compliance.",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Lawgical"
                    }
                  }
                ]
              `}
            </script>
          </div>
        </section>

        {/* Industries We Serve: Keyword-optimized headings */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Legal Solutions for Every Industry</h2>
              <p className="text-xl text-gray-600">Tailored compliance and legal services for startups, e-commerce, and more</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {INDUSTRIES.map((industry, index) => (
                <Card
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <CardContent>
                    <div
                      className={`bg-gradient-to-r ${industry.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <industry.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.name} Legal Services</h3>
                    <p className="text-gray-600 text-sm">{industry.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section: Optimized questions for search intent */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions About Legal Services</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Answers to common questions about company incorporation, GST registration, and compliance
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
            {/* Schema Markup for FAQ */}
            <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    ${FAQS.map(
                      (faq, index) => `
                        {
                          "@type": "Question",
                          "name": "${faq.question}",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "${faq.answer}"
                          }
                        }${index < FAQS.length - 1 ? "," : ""}`
                    ).join("")}
                  ]
                }
              `}
            </script>
          </div>
        </section>

        {/* CTA Section: Emphasize keywords */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Start Your Legal Journey in India</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Trusted by 1M+ clients for company incorporation, GST registration, and compliance
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200 text-center">
                <CardContent>
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Legal Hotline</h3>
                  <a
                    href="tel:+918383801899"
                    className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    aria-label="Call Lawgical at +91 8383801899"
                  >
                    +91 8383801899
                  </a>
                  <p className="text-sm text-gray-600 mt-2">(Immediate Response)</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200 text-center">
                <CardContent>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Consultation</h3>
                  <a
                    href="mailto:support@lawgical.tech"
                    className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors"
                    aria-label="Email Lawgical at support@lawgical.tech"
                  >
                    support@lawgical.tech
                  </a>
                  <p className="text-sm text-gray-600 mt-2">(Free Case Review)</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl border border-green-200 text-center">
                <CardContent>
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Legal Consultation</h3>
                  <p className="text-xl font-bold text-green-600">Online Booking</p>
                  <p className="text-sm text-gray-600 mt-2">Schedule Now</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg text-lg px-12 py-4"
                onClick={() => setIsConsultationOpen(true)}
                aria-label="Schedule free legal consultation"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                Schedule Free Legal Consultation
              </Button>
              <p className="text-sm text-gray-500 mt-4">No obligation • Confidential • Expert legal advice in India</p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

// Next.js Static Generation for SEO


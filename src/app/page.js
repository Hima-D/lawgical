
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
import { Star, CheckCircle, FileText, Gavel, Users, Shield } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
// shadcn/ui Components
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



const EXPERT_CONSULTATION = [
  { title: "Talk to a Lawyer", subtitle: "Get expert legal advice", icon: "⚖️", color: "bg-blue-500" },
  { title: "Talk to a CA", subtitle: "Chartered Accountant consultation", icon: "📊", color: "bg-green-500" },
  { title: "Talk to a CS", subtitle: "Company Secretary guidance", icon: "📋", color: "bg-purple-500" },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Choose Your Service",
    description: "Select from our comprehensive range of legal and compliance services",
    icon: "🎯",
  },
  {
    step: "02",
    title: "Get Expert Consultation",
    description: "Connect with our qualified professionals for personalized guidance",
    icon: "👥",
  },
  {
    step: "03",
    title: "Documentation & Filing",
    description: "We handle all paperwork and regulatory filings on your behalf",
    icon: "📋",
  },
  {
    step: "04",
    title: "Completion & Support",
    description: "Receive your documents and ongoing support for compliance",
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
  { number: "2+", label: "Years Experience", icon: FileText },
  { number: "99%", label: "Success Rate", icon: CheckCircle },
];

const INDUSTRIES = [
  { name: "Startups", icon: "🚀", description: "End-to-end startup legal solutions" },
  { name: "E-commerce", icon: "🛒", description: "Online business compliance" },
  { name: "Healthcare", icon: "🏥", description: "Medical practice regulations" },
  { name: "Education", icon: "🎓", description: "Educational institution setup" },
  { name: "Real Estate", icon: "🏢", description: "Property legal services" },
  { name: "Manufacturing", icon: "🏭", description: "Industrial compliance" },
];

const FAQS = [
  {
    question: "What services does Lawgical provide?",
    answer:
      "Lawgical offers a wide range of legal and compliance services, including contract drafting, business registration, tax filing, POSH training, and expert consultations with lawyers, CAs, and CS professionals.",
  },
  {
    question: "How can I book a free consultation?",
    answer:
      "Click the 'Free Consultation' button on our homepage or navigate to the consultation page to schedule a session with one of our experts. You'll receive personalized guidance tailored to your needs.",
  },
  {
    question: "Is my data secure with Lawgical?",
    answer:
      "Yes, we use bank-level security measures to protect your data, ensuring confidentiality and compliance with privacy regulations.",
  },
  {
    question: "How long does it take to process my legal requirements?",
    answer:
      "Processing times vary by service, but we guarantee quick turnaround times, typically 7-15 days for registrations and filings, with ongoing support for compliance.",
  },
  {
    question: "Do you serve clients outside major cities?",
    answer:
      "Certainly! While we specialize in Delhi-NCR, our services are available across India. We can assist clients in remote areas through online consultations and digital documentation.",
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

export default function LawgicalHomepage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [counters, setCounters] = useState({ clients: 0, experts: 0, experience: 0, success: 0 });

  // Animate counters
  useEffect(() => {
    console.log("LawgicalHomepage rendered, starting counter animation");
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

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % FEATURES.length);
    }, 3000); // Increased to 3s for better UX
    return () => clearInterval(interval);
  }, []);

  // Debug button clicks
  const handleGetStartedClick = () => {
    console.log("Get Started Today button clicked");
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <Head>
          <title>Lawgical | India's Leading Legal & Compliance Platform</title>
          <meta
            name="description"
            content="Simplify your legal, tax, and compliance needs with Lawgical. Trusted by over 1M+ clients with expert lawyers, CAs, and CS professionals."
          />
          <meta
            name="keywords"
            content="legal services, compliance, tax filing, contract law, POSH training, business registration"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        {/* Hero Section */}
        <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  India&apos;s Leading{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Legal & Compliance
                  </span>{" "}
                  Platform
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Simplifying legal, tax, and compliance services for individuals and businesses. Trusted by over 1 million+ clients across India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    className="bg-blue-600 text-white px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                    asChild
                    onClick={handleGetStartedClick}
                  >
                    <Link href="/get-started">Get Started Today</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all"
                    asChild
                  >
                    <Link href="/consultation">Free Consultation</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>1M+ Happy Clients</span>
                  </div>
                  <div className="flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>500+ Legal Experts</span>
                  </div>
                  <div className="flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>15+ Years Experience</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Start Your Legal Journey</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <FileText className="h-8 w-8 text-blue-600 mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Quick Registration</h4>
                        <p className="text-sm text-gray-600">Get your business registered in 7-15 days</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                      <Users className="h-8 w-8 text-green-600 mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Expert Support</h4>
                        <p className="text-sm text-gray-600">24/7 support from legal professionals</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <Shield className="h-8 w-8 text-purple-600 mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-900">100% Secure</h4>
                        <p className="text-sm text-gray-600">Your data is safe and confidential</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Consultation Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {EXPERT_CONSULTATION.map((expert, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="flex items-center justify-center p-6 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all group"
                  asChild
                >
                  <Link href="/consultation">
                    <span className="text-3xl mr-4">{expert.icon}</span>
                    <div className="text-white text-left">
                      <h3 className="font-semibold text-lg group-hover:text-yellow-200 transition-colors">
                        {expert.title}
                      </h3>
                      <p className="text-sm opacity-90">{expert.subtitle}</p>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <stat.icon className="h-12 w-12 text-blue-600 mx-auto" />
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
        <section id="process" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How Lawgical Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple, transparent process to get your legal work done efficiently
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((step, index) => (
                <div key={index} className="relative text-center">
                  <Card className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="text-5xl mb-4">{step.icon}</div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{step.step}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </Card>
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Lawgical */}
        <section id="features" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Lawgical</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We make legal services accessible, affordable, and efficient for everyone
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature, index) => (
                <Card
                  key={index}
                  className={`p-8 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white transform scale-105 shadow-2xl"
                      : "bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100"
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      activeFeature === index ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p className={activeFeature === index ? "text-blue-100" : "text-gray-600"}>
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Hear from those who trust us with their legal and compliance needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  role: "Startup Founder",
                  content: "Lawgical made our business registration seamless and provided expert legal advice.",
                  rating: 5,
                },
                {
                  name: "Rahul Mehta",
                  role: "E-commerce Entrepreneur",
                  content: "Their tax filing services saved us time and ensured compliance with all regulations.",
                  rating: 5,
                },
                {
                  name: "Sneha Gupta",
                  role: "HR Manager",
                  content: "The POSH training was comprehensive and helped us create a safer workplace.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section id="industries" className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
              <p className="text-lg text-gray-600">Specialized legal solutions for every industry</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INDUSTRIES.map((industry, index) => (
                <Card
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group border border-gray-100"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{industry.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{industry.name}</h3>
                  <p className="text-gray-600 text-sm">{industry.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

   

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get answers to common questions about our legal and compliance services
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white rounded-xl shadow-lg border border-gray-100"
                  >
                    <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-900 hover:text-blue-600">
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
        <section id="cta" className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join over 1 million+ satisfied clients who trust Lawgical for their legal and compliance needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                asChild
              >
                <Link href="/get-started">Start Your Legal Journey</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                asChild
              >
                <Link href="/consultation">Book Free Consultation</Link>
              </Button>
            </div>
            <div className="mt-8 text-blue-100 text-sm">
              <span>✓ No hidden fees</span>
              <span className="mx-4">✓ Expert guidance</span>
              <span>✓ 100% secure</span>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

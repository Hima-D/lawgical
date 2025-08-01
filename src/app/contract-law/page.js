"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  FileText,
  Gavel,
  Users,
  AlertCircle,
} from "lucide-react";
import { Slot } from "@radix-ui/react-slot";

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

const Textarea = ({ className = "", label, id, ...props }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={id}
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  </div>
);

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

const ContractLawPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [counters, setCounters] = useState({
    contractsDrafted: 0,
    disputesResolved: 0,
    clientsServed: 0,
    yearsExperience: 0,
  });

  // Animate counters
  useEffect(() => {
    console.log("ContractLawPage rendered, starting counter animation");
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

    animateCounter(1200, "contractsDrafted", "+");
    animateCounter(850, "disputesResolved", "+");
    animateCounter(500, "clientsServed", "+");
    animateCounter(15, "yearsExperience", "+");
  }, []);

  const stats = [
    { label: "Contracts Drafted", value: counters.contractsDrafted, icon: FileText },
    { label: "Disputes Resolved", value: counters.disputesResolved, icon: Gavel },
    { label: "Clients Served", value: counters.clientsServed, icon: Users },
    { label: "Years of Experience", value: counters.yearsExperience, icon: Shield },
  ];

  const testimonials = [
    {
      name: "Anita Desai",
      role: "Business Owner, Retail",
      content: "The team at Lawgical drafted our supplier contracts with precision, saving us from potential disputes.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "Corporate Counsel, Tech",
      content: "Their expertise in contract review helped us negotiate better terms with our partners.",
      rating: 5,
    },
    {
      name: "Meera Patel",
      role: "Freelancer",
      content: "Lawgical's consultation was clear and actionable, ensuring my freelance agreements were watertight.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "What makes a contract legally binding?",
      answer: "A contract is legally binding if it includes an offer, acceptance, consideration, and mutual intent. Our team ensures all elements are met for enforceability.",
    },
    {
      question: "Can you help with contract disputes?",
      answer: "Yes, we provide expert dispute resolution services, including mediation and litigation, to enforce your rights and recover losses.",
    },
    {
      question: "Do you offer contract drafting for startups?",
      answer: "Absolutely, we tailor contracts for startups, ensuring compliance and protection as you scale your business.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contract/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || "Failed to send message");
      setSubmitMessage("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <Head>
          <title>Contract Law Services | Lawgical</title>
          <meta
            name="description"
            content="Expert contract law services for drafting, reviewing, and resolving disputes. Ensure your agreements are clear, fair, and legally binding."
          />
          <meta
            name="keywords"
            content="contract law, legal agreements, contract drafting, dispute resolution, legal consultation"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        {/* Hero Section */}
        <section
          id="home"
          className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Contract Law: Protect Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Legal Agreements
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                From drafting to dispute resolution, our expert legal team ensures your contracts are clear, fair, and enforceable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg transform hover:scale-105 shadow-lg"
                  asChild
                >
                  <Link href="/contact">Get Legal Help Now</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 text-lg hover:bg-blue-600 hover:text-white"
                  asChild
                >
                  <Link href="#contact">Request Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <stat.icon className="h-12 w-12 text-blue-600 mx-auto" />
                  </div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is Contract Law? */}
        <section id="about" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What is Contract Law?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understand the foundation of legally binding agreements and how we can help you navigate them.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 mb-6">
                  Contract law governs agreements between parties, ensuring fairness and enforceability. It covers contract formation, execution, and breach resolution.
                </p>
                <p className="text-lg text-gray-600">
                  Our team provides expert guidance to create, review, and enforce contracts, protecting your interests in personal and professional dealings.
                </p>
              </div>
              <div>
                <img
                  src="https://picsum.photos/800/400"
                  alt="Contract Law Illustration"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Types of Contracts */}
        <section id="types" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Types of Contracts</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore the various types of contracts we handle to meet your specific needs.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Written Contracts</h4>
                      <p className="text-gray-600">Formal documents with clear, enforceable terms.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Oral Contracts</h4>
                      <p className="text-gray-600">Spoken agreements, often requiring legal expertise to enforce.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Implied Contracts</h4>
                      <p className="text-gray-600">Formed through actions or circumstances, not explicit terms.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Unilateral Contracts</h4>
                      <p className="text-gray-600">One-sided promises contingent on specific actions.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://picsum.photos/800/400?random=1"
                  alt="Types of Contracts"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section id="services" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Contract Law Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive support to ensure your contracts are robust and enforceable.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Contract Drafting", description: "Custom contracts tailored to your needs and compliant with legal standards.", icon: FileText },
                { title: "Review & Negotiation", description: "Detailed analysis and negotiation to protect your interests.", icon: Gavel },
                { title: "Dispute Resolution", description: "Swift legal action to enforce contracts and resolve disputes.", icon: Shield },
                { title: "Consultation", description: "Expert advice to avoid pitfalls and ensure clarity.", icon: Users },
              ].map((service, index) => (
                <Card key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                      <service.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
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
              <p className="text-xl text-gray-600">Hear from those who trust us with their contract law needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
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

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get answers to common questions about our contract law services.
              </p>
            </div>
            <div className="space-y-6 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us for Expert Legal Help</h2>
                <p className="text-lg text-gray-600">Need assistance with contracts? Reach out to our team today.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span>+91 8383801899</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span>help@lawgical.io</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>Lawgical Avenue, Sec 12, Gurugram</span>
                    </div>
                  </div>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>Fill out the form below, and we'll get back to you shortly.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        name="name"
                        id="name"
                        label="Your Name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="email"
                        id="email"
                        label="Your Email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="phone"
                        id="phone"
                        label="Your Phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      <Textarea
                        name="message"
                        id="message"
                        label="Your Message"
                        placeholder="Tell us about your needs"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                      />
                      <Button
                        type="submit"
                        className="w-full border-2 border-blue-600 text-blue-600 px-8 py-4 text-lg hover:bg-blue-600 hover:text-white shadow-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-2 text-blue-600"
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
                            Send Message
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                    {submitMessage && (
                      <p
                        className={`mt-4 text-center text-sm ${
                          submitMessage.includes("success") ? "text-green-600" : "text-red-500"
                        } flex items-center justify-center`}
                      >
                        <AlertCircle className="h-4 w-4 mr-1" /> {submitMessage}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Contracts?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Partner with Lawgical to ensure your agreements are robust and legally sound.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                asChild
              >
                <Link href="/contact">Get Started Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                asChild
              >
                <Link href="/posh">Explore POSH Training</Link>
              </Button>
            </div>
            <div className="mt-8 text-blue-100 text-sm">
              <span>✓ Expert Guidance</span>
              <span className="mx-4">✓ Trusted by 500+ Clients</span>
              <span>✓ Secure Process</span>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default ContractLawPage;

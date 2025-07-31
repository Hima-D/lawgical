"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CALCULATORS = [
  { name: "GST Calculator", icon: "📊", link: "/calculators/gst" },
  { name: "Income Tax Calculator", icon: "💰", link: "/calculators/income-tax" },
  { name: "EMI Calculator", icon: "🏦", link: "/calculators/emi" },
  { name: "Salary Calculator", icon: "💼", link: "/calculators/salary" }
];

const EXPERT_CONSULTATION = [
  { title: "Talk to a Lawyer", subtitle: "Get expert legal advice", icon: "⚖️", color: "bg-blue-500" },
  { title: "Talk to a CA", subtitle: "Chartered Accountant consultation", icon: "📊", color: "bg-green-500" },
  { title: "Talk to a CS", subtitle: "Company Secretary guidance", icon: "📋", color: "bg-purple-500" }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Choose Your Service",
    description: "Select from our comprehensive range of legal and compliance services",
    icon: "🎯"
  },
  {
    step: "02", 
    title: "Get Expert Consultation",
    description: "Connect with our qualified professionals for personalized guidance",
    icon: "👥"
  },
  {
    step: "03",
    title: "Documentation & Filing",
    description: "We handle all paperwork and regulatory filings on your behalf",
    icon: "📋"
  },
  {
    step: "04",
    title: "Completion & Support",
    description: "Receive your documents and ongoing support for compliance",
    icon: "✅"
  }
];

const FEATURES = [
  {
    title: "Expert Team",
    description: "500+ qualified lawyers, CAs, and CS professionals",
    icon: "👨‍💼",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Quick Turnaround", 
    description: "Fast processing with guaranteed timelines",
    icon: "⚡",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs, clear pricing structure",
    icon: "💰",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support",
    icon: "🔄",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Secure Platform",
    description: "Bank-level security for your data",
    icon: "🛡️",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Pan-India Service",
    description: "Services available across all states",
    icon: "🌍",
    color: "from-indigo-500 to-indigo-600"
  }
];

const STATS = [
  { number: "1M+", label: "Happy Clients", icon: "😊" },
  { number: "500+", label: "Expert Professionals", icon: "👨‍💼" },
  { number: "15+", label: "Years Experience", icon: "📅" },
  { number: "99%", label: "Success Rate", icon: "🎯" }
];

const INDUSTRIES = [
  { name: "Startups", icon: "🚀", description: "End-to-end startup legal solutions" },
  { name: "E-commerce", icon: "🛒", description: "Online business compliance" },
  { name: "Healthcare", icon: "🏥", description: "Medical practice regulations" },
  { name: "Education", icon: "🎓", description: "Educational institution setup" },
  { name: "Real Estate", icon: "🏢", description: "Property legal services" },
  { name: "Manufacturing", icon: "🏭", description: "Industrial compliance" }
];

export default function LawgicalHomepage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [counters, setCounters] = useState({ clients: 0, experts: 0, experience: 0, success: 0 });

  // Animate counters
  useEffect(() => {
    const animateCounter = (target, key, suffix = '') => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ 
          ...prev, 
          [key]: Math.floor(current) + suffix 
        }));
      }, 20);
    };

    animateCounter(1000000, 'clients', '+');
    animateCounter(500, 'experts', '+');
    animateCounter(15, 'experience', '+');
    animateCounter(99, 'success', '%');
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % FEATURES.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                India&apos;s Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Legal & Compliance</span> Platform
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Simplifying legal, tax, and compliance services for individuals and businesses. 
                Trusted by over 1 million+ clients across India.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/get-started" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
                  Get Started Today
                </Link>
                <Link href="/consultation" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
                  Free Consultation
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>1M+ Happy Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>500+ Legal Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>15+ Years Experience</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Start Your Legal Journey</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="text-2xl mr-4">📋</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Quick Registration</h4>
                      <p className="text-sm text-gray-600">Get your business registered in 7-15 days</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <span className="text-2xl mr-4">⚡</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert Support</h4>
                      <p className="text-sm text-gray-600">24/7 support from legal professionals</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <span className="text-2xl mr-4">🛡️</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">100% Secure</h4>
                      <p className="text-sm text-gray-600">Your data is safe and confidential</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Expert Consultation Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {EXPERT_CONSULTATION.map((expert, index) => (
              <Link key={index} href="/consultation" className="flex items-center justify-center p-6 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all group">
                <span className="text-3xl mr-4">{expert.icon}</span>
                <div className="text-white">
                  <h3 className="font-semibold text-lg group-hover:text-yellow-200 transition-colors">{expert.title}</h3>
                  <p className="text-sm opacity-90">{expert.subtitle}</p>
                </div>
              </Link>
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
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {index === 0 ? counters.clients : 
                   index === 1 ? counters.experts :
                   index === 2 ? counters.experience :
                   counters.success}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
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
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{step.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
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
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Lawgical</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make legal services accessible, affordable, and efficient for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div 
                key={index}
                className={`p-8 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeFeature === index 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white transform scale-105 shadow-2xl' 
                    : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  activeFeature === index ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`${
                  activeFeature === index ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-lg text-gray-600">Specialized legal solutions for every industry</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group border border-gray-100">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{industry.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-gray-600 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators & Tools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Calculators & Tools</h2>
            <p className="text-lg text-gray-600">Make informed financial and legal decisions with our free tools</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CALCULATORS.map((calc, index) => (
              <Link
                key={index}
                href={calc.link}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center group border border-blue-100"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{calc.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {calc.name}
                </h3>
                <div className="mt-4 text-blue-600 group-hover:translate-x-1 transition-transform">
                  Calculate Now →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join over 1 million+ satisfied clients who trust Lawgical for their legal and compliance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Legal Journey
            </Link>
            <Link
              href="/consultation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Book Free Consultation
            </Link>
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
  );
}
"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

// Service categories inspired by VakilSearch
const SERVICE_CATEGORIES = [
  {
    id: 1,
    title: "Business Setup",
    icon: "🏢",
    description: "Complete business registration and incorporation services",
    services: ["Company Registration", "LLP Registration", "Partnership Firm", "Sole Proprietorship", "Section 8 Company"],
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 2,
    title: "Legal Consultation",
    icon: "⚖️",
    description: "Expert legal advice from qualified professionals",
    services: ["Civil Lawyer", "Criminal Lawyer", "Corporate Lawyer", "Family Lawyer", "Property Lawyer"],
    color: "from-green-500 to-green-700"
  },
  {
    id: 3,
    title: "Tax & Compliance",
    icon: "📊",
    description: "Comprehensive tax planning and compliance solutions",
    services: ["GST Registration", "Income Tax Filing", "TDS Returns", "Annual Filings", "Tax Planning"],
    color: "from-purple-500 to-purple-700"
  },
  {
    id: 4,
    title: "Trademark & IP",
    icon: "©️",
    description: "Protect your intellectual property rights",
    services: ["Trademark Registration", "Copyright Registration", "Patent Filing", "Design Registration", "IP Licensing"],
    color: "from-orange-500 to-orange-700"
  },
  {
    id: 5,
    title: "Documentation",
    icon: "📄",
    description: "Legal document drafting and review services",
    services: ["Contracts", "Agreements", "Legal Notices", "Wills", "Power of Attorney"],
    color: "from-red-500 to-red-700"
  },
  {
    id: 6,
    title: "Licenses & Permits",
    icon: "🏆",
    description: "Obtain necessary licenses for your business",
    services: ["FSSAI License", "Trade License", "Professional Tax", "ESI & PF", "Labor License"],
    color: "from-indigo-500 to-indigo-700"
  }
];

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

const TESTIMONIALS = [
  {
    id: 1,
    testimonial: "Lawgical helped me register my startup in just 7 days. Their team was incredibly professional and guided me through every step of the process.",
    authorName: "Priya Sharma",
    authorPosition: "Founder, TechStart Solutions",
    authorImage: "https://picsum.photos/100/100?random=1",
    rating: 5
  },
  {
    id: 2,
    testimonial: "The trademark registration process was seamless. I got regular updates and the entire process was completed faster than expected.",
    authorName: "Rajesh Kumar",
    authorPosition: "Business Owner",
    authorImage: "https://picsum.photos/100/100?random=2",
    rating: 5
  },
  {
    id: 3,
    testimonial: "Excellent legal consultation service. The lawyer was very knowledgeable and helped me resolve my property dispute efficiently.",
    authorName: "Anjali Mehta",
    authorPosition: "Property Investor",
    authorImage: "https://picsum.photos/100/100?random=3",
    rating: 5
  }
];

export default function LawgicalHomepage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Lawgical</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
            <Link href="/calculators" className="text-gray-700 hover:text-blue-600 transition-colors">Calculators</Link>
            <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors">Resources</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Login</Link>
            <Link href="/contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Talk to Expert
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                India's Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Legal & Compliance</span> Platform
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

      {/* Service Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Legal Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From business registration to legal consultation, we provide end-to-end solutions for all your legal needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer transform hover:scale-105"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <div className="p-8">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  
                  <div className={`space-y-2 overflow-hidden transition-all duration-300 ${
                    activeCategory === category.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {category.services.map((service, index) => (
                      <Link 
                        key={index} 
                        href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-sm text-blue-600 hover:text-blue-800 transition-colors hover:underline"
                      >
                        • {service}
                      </Link>
                    ))}
                  </div>
                  
                  <Link
                    href={`/services/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-colors group-hover:translate-x-1"
                  >
                    View All Services
                    <svg className="w-4 h-4 ml-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators & Tools */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Free Calculators & Tools
            </h2>
            <p className="text-lg text-gray-600">
              Make informed financial and legal decisions with our free tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CALCULATORS.map((calc, index) => (
              <Link
                key={index}
                href={calc.link}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center group border border-gray-100"
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

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by thousands of businesses and individuals across India
            </p>
          </div>

          <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-xl lg:text-2xl text-gray-900 font-medium mb-8 leading-relaxed">
                  "{TESTIMONIALS[currentTestimonial].testimonial}"
                </blockquote>
                
                <div className="flex items-center justify-center">
                  <Image
                    src={TESTIMONIALS[currentTestimonial].authorImage}
                    alt={TESTIMONIALS[currentTestimonial].authorName}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-lg"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {TESTIMONIALS[currentTestimonial].authorName}
                    </div>
                    <div className="text-gray-600">
                      {TESTIMONIALS[currentTestimonial].authorPosition}
                    </div>
                  </div>
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center mt-8 space-x-2">
                  {TESTIMONIALS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentTestimonial === index 
                          ? 'bg-blue-600 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <span className="text-xl font-bold">Lawgical</span>
              </div>
              <p className="text-gray-400 mb-4">
                Making legal, tax, and compliance simple for everyone.
              </p>
              <div className="text-sm text-gray-500">
                © 2025 Lawgical. All rights reserved.
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/business-setup" className="block hover:text-white transition-colors">Business Setup</Link>
                <Link href="/legal-consultation" className="block hover:text-white transition-colors">Legal Consultation</Link>
                <Link href="/tax-compliance" className="block hover:text-white transition-colors">Tax & Compliance</Link>
                <Link href="/trademark-ip" className="block hover:text-white transition-colors">Trademark & IP</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/calculators" className="block hover:text-white transition-colors">Calculators</Link>
                <Link href="/blog" className="block hover:text-white transition-colors">Blog</Link>
                <Link href="/guides" className="block hover:text-white transition-colors">Legal Guides</Link>
                <Link href="/templates" className="block hover:text-white transition-colors">Document Templates</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/contact" className="block hover:text-white transition-colors">Contact Us</Link>
                <Link href="/help" className="block hover:text-white transition-colors">Help Center</Link>
                <Link href="/privacy" className="block hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            <p>Legal disclaimer: We are a facilitating platform connecting you with reliable professionals. We do not provide legal services ourselves.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
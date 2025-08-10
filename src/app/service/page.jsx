"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Service categories with expanded details
const SERVICE_CATEGORIES = [
  {
    id: 1,
    title: "Business Setup",
    icon: "🏢",
    description: "Complete business registration and incorporation services with end-to-end support",
    services: [
      { name: "Private Limited Company", price: "₹6,999", duration: "7-15 days", features: ["ROC Filing", "DIN & DSC", "Current Account Opening"] },
      { name: "LLP Registration", price: "₹4,999", duration: "10-15 days", features: ["LLPIN", "Agreement Drafting", "Compliance Kit"] },
      { name: "Partnership Firm", price: "₹2,999", duration: "5-7 days", features: ["Partnership Deed", "PAN Registration", "Bank Account Opening"] },
      { name: "Sole Proprietorship", price: "₹1,999", duration: "3-5 days", features: ["MSME Registration", "Shop License", "Basic Compliance"] },
      { name: "Section 8 Company", price: "₹8,999", duration: "15-30 days", features: ["NGO Registration", "12A & 80G", "FCRA Consultation"] }
    ],
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    title: "Legal Consultation",
    icon: "⚖️",
    description: "Expert legal advice from qualified professionals across all practice areas",
    services: [
      { name: "Civil Lawyer Consultation", price: "₹999", duration: "30 mins", features: ["Property Disputes", "Contract Review", "Legal Notice"] },
      { name: "Criminal Lawyer", price: "₹1,499", duration: "45 mins", features: ["Bail Applications", "Court Representation", "Case Strategy"] },
      { name: "Corporate Lawyer", price: "₹1,999", duration: "60 mins", features: ["Business Agreements", "Compliance Review", "M&A Advice"] },
      { name: "Family Lawyer", price: "₹899", duration: "30 mins", features: ["Divorce Proceedings", "Child Custody", "Property Settlement"] },
      { name: "Property Lawyer", price: "₹1,299", duration: "45 mins", features: ["Title Verification", "Sale Deed", "Property Registration"] }
    ],
    color: "from-green-500 to-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    id: 3,
    title: "Tax & Compliance",
    icon: "📊",
    description: "Comprehensive tax planning and compliance solutions for individuals and businesses",
    services: [
      { name: "GST Registration", price: "₹2,499", duration: "3-7 days", features: ["GSTIN Certificate", "Digital Signature", "Return Filing Setup"] },
      { name: "Income Tax Filing", price: "₹999", duration: "1-3 days", features: ["ITR Preparation", "Tax Optimization", "Refund Processing"] },
      { name: "TDS Returns", price: "₹1,499", duration: "2-5 days", features: ["Quarterly Filing", "TDS Certificates", "Compliance Check"] },
      { name: "Annual Filings", price: "₹4,999", duration: "7-15 days", features: ["ROC Compliance", "Board Resolutions", "Financial Statements"] },
      { name: "Tax Planning", price: "₹2,999", duration: "Consultation", features: ["Investment Strategy", "Tax Savings", "Restructuring Advice"] }
    ],
    color: "from-purple-500 to-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    id: 4,
    title: "Trademark & IP",
    icon: "©️",
    description: "Protect your intellectual property rights with comprehensive IP services",
    services: [
      { name: "Trademark Registration", price: "₹6,999", duration: "12-18 months", features: ["Search Report", "Application Filing", "Objection Handling"] },
      { name: "Copyright Registration", price: "₹4,999", duration: "4-6 months", features: ["Work Registration", "Certificate Issue", "Infringement Support"] },
      { name: "Patent Filing", price: "₹24,999", duration: "18-36 months", features: ["Patent Search", "Specification Draft", "Prosecution Support"] },
      { name: "Design Registration", price: "₹8,999", duration: "6-12 months", features: ["Design Search", "Application Filing", "Certificate Issue"] },
      { name: "IP Licensing", price: "₹9,999", duration: "15-30 days", features: ["Agreement Drafting", "Due Diligence", "Registration Support"] }
    ],
    color: "from-orange-500 to-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    id: 5,
    title: "Documentation",
    icon: "📄",
    description: "Legal document drafting and review services for all your business needs",
    services: [
      { name: "Business Contracts", price: "₹3,999", duration: "3-7 days", features: ["Custom Drafting", "Legal Review", "Amendment Support"] },
      { name: "Employment Agreements", price: "₹1,999", duration: "2-5 days", features: ["Offer Letters", "Service Agreements", "NDA Templates"] },
      { name: "Legal Notices", price: "₹2,499", duration: "1-3 days", features: ["Notice Drafting", "Legal Dispatch", "Follow-up Support"] },
      { name: "Will & Testament", price: "₹4,999", duration: "5-10 days", features: ["Will Drafting", "Registration", "Witness Arrangement"] },
      { name: "Power of Attorney", price: "₹1,499", duration: "2-4 days", features: ["Document Drafting", "Notarization", "Registration"] }
    ],
    color: "from-red-500 to-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  {
    id: 6,
    title: "Licenses & Permits",
    icon: "🏆",
    description: "Obtain all necessary licenses and permits for your business operations",
    services: [
      { name: "FSSAI License", price: "₹3,999", duration: "15-30 days", features: ["Application Filing", "Document Verification", "License Issue"] },
      { name: "Trade License", price: "₹2,999", duration: "10-20 days", features: ["Municipal Approval", "Document Support", "Renewal Reminders"] },
      { name: "Professional Tax", price: "₹1,999", duration: "7-15 days", features: ["State Registration", "Certificate Issue", "Compliance Support"] },
      { name: "ESI & PF Registration", price: "₹4,999", duration: "10-20 days", features: ["Employee Registration", "Digital Setup", "Monthly Returns"] },
      { name: "Labor License", price: "₹5,999", duration: "20-30 days", features: ["Factory License", "Contract Labor", "Compliance Kit"] }
    ],
    color: "from-indigo-500 to-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  }
];

const POPULAR_SERVICES = [
  { name: "Private Limited Company", originalPrice: "₹8,999", currentPrice: "₹6,999", discount: "22%", category: "Business Setup" },
  { name: "Trademark Registration", originalPrice: "₹9,999", currentPrice: "₹6,999", discount: "30%", category: "IP Protection" },
  { name: "GST Registration", originalPrice: "₹3,499", currentPrice: "₹2,499", discount: "29%", category: "Tax & Compliance" },
  { name: "Legal Consultation", originalPrice: "₹1,499", currentPrice: "₹999", discount: "33%", category: "Legal Advice" }
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [selectedService, setSelectedService] = useState(null);

  const currentCategory = SERVICE_CATEGORIES.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Legal Services</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From business registration to legal consultation, we provide end-to-end solutions for all your legal and compliance needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
              Free Consultation
            </Link>
            <Link href="#services" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Most Popular Services</h2>
            <p className="text-lg text-gray-600">Get started with our most sought-after services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_SERVICES.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{service.category}</span>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{service.discount} OFF</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-blue-600">{service.currentPrice}</span>
                  <span className="text-lg text-gray-400 line-through">{service.originalPrice}</span>
                </div>
                
                <Link href="/signin" 
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all text-center block">
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section id="services" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of legal and compliance services
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Navigation */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Service Categories</h3>
                <div className="space-y-2">
                  {SERVICE_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                        activeCategory === category.id
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        <div>
                          <div className="font-semibold">{category.title}</div>
                          <div className={`text-sm ${
                            activeCategory === category.id ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {category.services.length} services
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="lg:w-2/3">
              {currentCategory && (
                <div className={`${currentCategory.bgColor} rounded-xl p-8 ${currentCategory.borderColor} border-2`}>
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">{currentCategory.icon}</span>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{currentCategory.title}</h3>
                      <p className="text-gray-600 mt-2">{currentCategory.description}</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {currentCategory.services.map((service, index) => (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h4>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                                {service.price}
                              </span>
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                {service.duration}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {service.features.map((feature, featureIndex) => (
                                <span key={featureIndex} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                            <Link
                              href="/signin"
                              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all text-center"
                            >
                              Get Started
                            </Link>
                            <button
                              onClick={() => setSelectedService(selectedService === service.name ? null : service.name)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                            >
                              {selectedService === service.name ? 'Hide Details' : 'View Details'}
                            </button>
                          </div>
                        </div>
                        
                        {selectedService === service.name && (
                          <div className="mt-6 pt-6 border-t border-gray-200 bg-gray-50 rounded-lg p-4">
                            <h5 className="font-semibold text-gray-900 mb-3">What's Included:</h5>
                            <ul className="space-y-2">
                              {service.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                  </svg>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                <strong>Note:</strong> All services include dedicated support, regular updates, and post-completion assistance for 30 days.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Services</h2>
            <p className="text-lg text-gray-600">We make legal services simple, transparent, and affordable</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Qualified lawyers, CAs, and CS professionals with 15+ years experience</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Processing</h3>
              <p className="text-gray-600">Fast turnaround times with guaranteed delivery dates</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden costs, clear pricing structure with no surprises</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Secure</h3>
              <p className="text-gray-600">Your data and documents are completely safe and confidential</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Need Help Choosing?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Our experts are here to guide you through the right service for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consultation"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Us
            </Link>
          </div>
          
          <div className="mt-8 text-blue-100 text-sm">
            <span>✓ Free consultation</span>
            <span className="mx-4">✓ Expert guidance</span>
            <span>✓ Custom solutions</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
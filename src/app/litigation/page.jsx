// app/litigation/page.js
import React from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function LitigationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header Component */}
      <Header />

      <main className="relative">
        {/* Hero Section with Enhanced Design */}
        <section className="relative px-6 sm:px-12 py-32 max-w-7xl mx-auto overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full border border-blue-500/30 mb-8">
              <span className="text-sm font-medium text-blue-300">⚖️ Legal Excellence</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
              Litigation Services
            </h1>
            <p className="text-2xl font-light text-gray-300 mb-4">
              Protecting Your Legal Rights
            </p>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Whether you're facing a legal dispute or need expert representation in court, our litigation services ensure you have the best possible outcome with unwavering dedication.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link href="/contact">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                  Schedule Free Consultation
                </button>
              </Link>
              <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300">
                View Case Studies
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Cases Won" },
              { number: "98%", label: "Success Rate" },
              { number: "15+", label: "Years Experience" },
              { number: "24/7", label: "Legal Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What is Litigation Section - Enhanced */}
        <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">What is Litigation?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="lg:flex lg:space-x-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Litigation refers to the process of resolving legal disputes through the court system. Whether it's a civil, criminal, or business-related case, litigation involves the filing of a lawsuit, gathering evidence, and presenting a case in front of a judge or jury.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our litigation services cover a wide range of legal matters, from contract disputes to personal injury claims. With our skilled legal team, you can be confident that your case will be handled with the utmost professionalism and expertise.
                </p>
              </div>
              
              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Expert Legal Representation",
                  "Comprehensive Case Analysis",
                  "Strategic Court Advocacy",
                  "Personalized Legal Solutions"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <img
                  src="https://picsum.photos/800/500?random=1"
                  alt="Litigation Process"
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Litigation Process - Enhanced with Timeline */}
        <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Our Litigation Process</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We provide a clear and structured process to guide you through every step of the litigation journey with transparency and expertise.
            </p>
          </div>

          {/* Timeline Process */}
          <div className="relative">
            {/* Vertical line for desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            
            <div className="space-y-16">
              {[
                {
                  step: "01",
                  title: "Initial Consultation",
                  description: "We begin by understanding the nature of your dispute, assessing the situation, and discussing potential legal options with complete confidentiality.",
                  side: "left"
                },
                {
                  step: "02", 
                  title: "Case Assessment",
                  description: "After understanding your case, we conduct a thorough legal analysis to assess the merits and identify possible outcomes with strategic planning.",
                  side: "right"
                },
                {
                  step: "03",
                  title: "Filing the Lawsuit",
                  description: "Once we've prepared the case, we file the necessary paperwork to begin formal litigation proceedings and notify all involved parties professionally.",
                  side: "left"
                },
                {
                  step: "04",
                  title: "Court Representation",
                  description: "Our experienced attorneys will represent you in court, presenting evidence and arguments to support your case with compelling advocacy.",
                  side: "right"
                }
              ].map((process, index) => (
                <div key={index} className={`lg:flex items-center ${process.side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`lg:w-1/2 ${process.side === 'right' ? 'lg:pl-16' : 'lg:pr-16'}`}>
                    <div className="group p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:from-gray-800/80 hover:to-gray-900/80 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                          {process.step}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{process.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{process.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden lg:block w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-black absolute left-1/2 transform -translate-x-1/2"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <img
              src="https://picsum.photos/1200/400?random=2"
              alt="Court Litigation"
              className="relative w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </section>

        {/* Why Choose Us - Enhanced Grid */}
        <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Why Choose Our Litigation Services?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our commitment to excellence and client success sets us apart in the legal industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "⚖️",
                title: "Expert Legal Team",
                description: "Our litigation attorneys are highly experienced, with expertise in various areas of law, including business disputes, civil claims, and personal injury cases."
              },
              {
                icon: "🎯",
                title: "Personalized Approach", 
                description: "We understand that each case is unique. Our team provides tailored strategies to address your specific needs, ensuring the best outcome for you."
              },
              {
                icon: "🏆",
                title: "Commitment to Success",
                description: "We are dedicated to achieving favorable results for our clients, and we work relentlessly to protect your rights and interests."
              },
              {
                icon: "💬",
                title: "Transparent Communication",
                description: "We believe in clear, honest communication. You'll always know where your case stands and what to expect at every stage."
              }
            ].map((feature, index) => (
              <div key={index} className="group p-8 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:from-gray-800/60 hover:to-gray-900/60 hover:border-blue-500/30 transition-all duration-300">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section - Enhanced */}
        <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
            
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-700/50 p-12 text-center backdrop-blur-sm">
              <h2 className="text-5xl font-bold text-white mb-6">Get Legal Representation Today</h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                If you're facing a legal dispute, don't navigate it alone. Reach out to our expert litigation team for professional support and representation.
              </p>

              {/* Contact Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: "📞", label: "Phone", value: "+91 8383801899", href: "tel:+918383801899" },
                  { icon: "✉️", label: "Email", value: "help@lawgical.io", href: "mailto:help@lawgical.io" },
                  { icon: "📍", label: "Address", value: "Lawgical Avenue, Sec 12 Gurugram", href: "#" }
                ].map((contact, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300 group">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">{contact.label}</div>
                    <a href={contact.href} className="text-white hover:text-blue-300 transition-colors duration-300 font-medium">
                      {contact.value}
                    </a>
                  </div>
                ))}
              </div>

              {/* Enhanced CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 text-lg">
                    Schedule Free Consultation
                  </button>
                </Link>
                <button className="px-10 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 text-lg">
                  Call Now: +91 8383801899
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
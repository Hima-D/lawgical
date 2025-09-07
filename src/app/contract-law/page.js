"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  FileText, 
  Gavel, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Users, 
  Clock, 
  Award,
  BookOpen,
  AlertCircle,
  ArrowRight,
  Star,
  Scale
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

// shadcn/ui Components (simplified)
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 rounded-md",
    lg: "h-12 px-8 text-lg",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-input",
  };
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const STATS = [
  { number: "1200+", label: "Contracts Drafted", icon: FileText },
  { number: "850+", label: "Disputes Resolved", icon: Gavel },
  { number: "500+", label: "Clients Served", icon: Users },
  { number: "15+", label: "Years Experience", icon: Award },
];

const SERVICES = [
  {
    icon: FileText,
    title: "Contract Drafting & Review",
    description: "Expert drafting of airtight contracts tailored to your business needs, including comprehensive review to identify risks and ensure enforceability from the outset.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Gavel,
    title: "Breach Investigation & Litigation",
    description: "Thorough investigation of contract breaches, followed by strategic litigation to enforce terms, recover damages, and hold counterparties accountable in court.",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Scale,
    title: "Dispute Resolution & Negotiation",
    description: "Mediation, arbitration, and negotiation services to resolve contract disputes efficiently, minimizing costs and time while achieving optimal outcomes for our clients.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Enforcement & Compliance",
    description: "Ongoing support for contract enforcement, regulatory compliance audits, and defensive strategies to protect your interests against potential claims or violations.",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: BookOpen,
    title: "Risk Assessment & Advisory",
    description: "Proactive legal advisory on contract risks, including scenario planning, clause optimization, and training for your team to prevent future disputes.",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Corporate Contract Management",
    description: "End-to-end management of corporate agreements, from vendor contracts to partnerships, ensuring seamless integration with your business operations and legal strategy.",
    color: "from-pink-500 to-rose-500"
  }
];

const FEATURES = [
  {
    title: "Comprehensive Contract Analysis",
    description: "Our litigation team conducts in-depth analysis of contract terms, identifying ambiguities, enforceability issues, and strategic advantages for court proceedings.",
    icon: FileText
  },
  {
    title: "Strategic Litigation Planning",
    description: "From filing suits to trial preparation, we develop tailored litigation strategies that maximize recovery and minimize exposure in contract disputes.",
    icon: Gavel
  },
  {
    title: "Evidence Preservation & Discovery",
    description: "Expert handling of evidence collection, e-discovery, and documentation to build ironclad cases for contract enforcement or defense in litigation.",
    icon: Scale
  },
  {
    title: "Alternative Dispute Resolution",
    description: "When litigation is not ideal, we leverage mediation and arbitration to resolve disputes swiftly while preserving business relationships.",
    icon: Shield
  }
];

const TESTIMONIALS = [
  {
    name: "Anita Desai",
    role: "Business Owner, Retail",
    content: "The team at Lawgical drafted our supplier contracts with precision and resolved a major dispute through expert litigation, saving our business significantly.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Corporate Counsel, Tech",
    content: "Their strategic approach to contract review and negotiation turned potential litigation into a favorable settlement, protecting our company's interests.",
    rating: 5,
  },
  {
    name: "Meera Patel",
    role: "Freelancer",
    content: "Lawgical handled my contract breach case with professionalism and care, ensuring I received the compensation I deserved through efficient litigation.",
    rating: 5,
  },
];

const ContractLawPage = () => {
  const [counters, setCounters] = useState({ contracts: 0, disputes: 0, clients: 0, experience: 0 });

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
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(current) + suffix,
        }));
      }, 20);
    };

    animateCounter(1200, "contracts", "+");
    animateCounter(850, "disputes", "+");
    animateCounter(500, "clients", "+");
    animateCounter(15, "experience", "+");
  }, []);

  const litigationProcess = [
    {
      step: 1,
      title: "Initial Assessment",
      description: "We begin with a thorough review of your contract and circumstances to evaluate breach claims, potential liabilities, and viable legal pathways."
    },
    {
      step: 2,
      title: "Strategy Development",
      description: "Our experts craft a customized litigation strategy, including negotiation attempts, evidence gathering, and preparation for court if necessary."
    },
    {
      step: 3,
      title: "Execution & Representation",
      description: "We handle all aspects of the process, from filing claims to court representation, ensuring aggressive advocacy and compliance with legal timelines."
    },
    {
      step: 4,
      title: "Resolution & Enforcement",
      description: "Whether through settlement or judgment, we secure enforceable outcomes and assist with post-resolution enforcement to achieve full recovery."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-blue-100 text-blue-800">
                Expert Contract Litigation
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Contract Law: Securing Agreements,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Delivering Justice
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Specialized litigation services for contract disputes, breaches, and enforcement. Our experienced team protects your business interests through strategic legal advocacy, negotiation, and courtroom representation when every agreement counts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg">
                  <Phone className="h-5 w-5 mr-2" />
                  Urgent Consultation
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Explore Our Process
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Confidential</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Proven Track Record</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Litigation-Ready Support</h3>
                  <p className="text-gray-600 mt-2">From breach to resolution, we&apos;re prepared to fight for your rights</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <FileText className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Contract Analysis</h4>
                      <p className="text-sm text-gray-600">Identify strengths and weaknesses</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <Gavel className="h-8 w-8 text-purple-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Court Representation</h4>
                      <p className="text-sm text-gray-600">Aggressive advocacy in litigation</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <Shield className="h-8 w-8 text-green-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Risk Mitigation</h4>
                      <p className="text-sm text-gray-600">Protect against future disputes</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Contact Banner */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center text-white">
            <AlertCircle className="h-6 w-6 mr-3 animate-pulse" />
            <span className="text-lg font-semibold">Facing a Contract Dispute? Contact us immediately at </span>
            <a href="tel:+918383801899" className="ml-2 text-xl font-bold hover:text-yellow-200 transition-colors">
              +91 8383801899
            </a>
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
                  {stat.number === "1200+" ? counters.contracts : 
                   stat.number === "850+" ? counters.disputes : 
                   stat.number === "500+" ? counters.clients : 
                   counters.experience}
                  {stat.number.includes("+") ? "+" : ""}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Contract Law Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Understanding Contract Law Litigation</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Contract law forms the backbone of business transactions, governing agreements from simple deals to complex partnerships. When disputes arise—through breaches, misinterpretations, or non-performance—our litigation expertise ensures your rights are vigorously defended in court or through alternative resolutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Card className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Elements of Effective Contract Litigation</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Clear identification of breach types, from material violations to anticipatory repudiation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Strategic use of evidence, including emails, documents, and witness testimonies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Pursuit of remedies like damages, specific performance, or injunctions tailored to your case</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Compliance with jurisdictional rules and timelines to avoid procedural pitfalls</span>
                  </li>
                </ul>
              </Card>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {FEATURES.map((feature, index) => (
                <Card key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Litigation Process */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Complete Litigation Process</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
              We guide you through every stage of contract litigation with transparency and expertise, ensuring a structured approach from assessment to resolution.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {litigationProcess.map((stepItem, index) => (
              <Card key={index} className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {stepItem.step}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{stepItem.title}</h4>
                <p className="text-sm text-gray-600">{stepItem.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Comprehensive Contract Law Services</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From preventive drafting to aggressive litigation, our services cover the full spectrum of contract law needs, delivered by seasoned litigators who understand the nuances of commercial disputes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <Card key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className={`bg-gradient-to-r ${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-8">Our Commitment to Litigation Excellence</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
              <p>
                At Lawgical, we treat every contract dispute as a critical battle for your business&lsquo;s future. Our litigators bring decades of courtroom experience, combining aggressive advocacy with meticulous preparation to secure favorable verdicts and settlements.
              </p>
              <p>
                We understand that litigation can disrupt operations, which is why we prioritize efficient strategies that resolve matters swiftly while maximizing your recovery. Whether defending against unfounded claims or pursuing justice for breaches, our focus remains on protecting your assets, reputation, and long-term success.
              </p>
              <p>
                With a client-centric approach, we provide transparent updates, strategic counsel, and unwavering support throughout the process, ensuring you feel confident and informed at every turn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real stories from businesses that trusted us with their contract litigation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">{testimonial.content}</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready for Litigation Support?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Whether you&apos;re facing a potential breach or need proactive contract advice, our litigation specialists are here to provide confidential, expert guidance tailored to your situation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Urgent Helpline</h3>
              <a href="tel:+918383801899" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                +91 8383801899
              </a>
              <p className="text-sm text-gray-600 mt-2">(Available 24/7)</p>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200 text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Contact</h3>
              <a href="mailto:help@lawgical.io" className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
                help@lawgical.io
              </a>
              <p className="text-sm text-gray-600 mt-2">(Response within 24 hours)</p>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl border border-green-200 text-center">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Location</h3>
              <p className="text-xl font-bold text-green-600">Lawgical Office</p>
              <p className="text-sm text-gray-600 mt-2">Lawgical Avenue, Sec 12, Gurugram</p>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg text-lg px-12 py-4">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContractLawPage;
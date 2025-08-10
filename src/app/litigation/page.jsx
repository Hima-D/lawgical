"use client";
import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Shield, 
  FileText, 
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
  Gavel,
  Search,
  TrendingUp,
  Building,
  UserCheck,
  Eye,
  Briefcase,
  Target,
  MessageCircle
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

// Simplified shadcn/ui Components
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
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
  <div className={`rounded-lg border bg-white text-card-foreground shadow-sm ${className}`} {...props}>
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
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const STATS = [
  { number: "500+", label: "Cases Won", icon: Award },
  { number: "98%", label: "Success Rate", icon: TrendingUp },
  { number: "15+", label: "Years Experience", icon: Clock },
  { number: "24/7", label: "Legal Support", icon: Shield },
];

const LITIGATION_TYPES = [
  {
    icon: Building,
    title: "Commercial Litigation",
    description: "Complex business disputes, contract breaches, partnership conflicts, and corporate legal matters requiring strategic court representation.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Users,
    title: "Civil Litigation",
    description: "Personal disputes, property matters, family conflicts, and individual rights protection through comprehensive legal advocacy.",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: FileText,
    title: "Contract Disputes",
    description: "Breach of contract cases, agreement violations, and commercial contract enforcement with expert legal analysis.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Employment Litigation",
    description: "Workplace disputes, wrongful termination, discrimination cases, and labor law violations requiring specialized expertise.",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: Search,
    title: "Intellectual Property Disputes",
    description: "Patent infringement, trademark violations, copyright disputes, and IP protection through strategic litigation.",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: Gavel,
    title: "Appeals & Appellate Practice",
    description: "Higher court appeals, case review processes, and appellate advocacy for complex legal matters.",
    color: "from-pink-500 to-rose-500"
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initial Case Evaluation",
    description: "Comprehensive assessment of your legal matter, including merit analysis, potential outcomes, and strategic options with complete confidentiality.",
    icon: Search
  },
  {
    step: "02", 
    title: "Strategic Planning & Discovery",
    description: "Development of litigation strategy, evidence gathering, witness identification, and comprehensive case preparation for optimal results.",
    icon: Target
  },
  {
    step: "03",
    title: "Filing & Court Proceedings",
    description: "Professional filing of legal documents, court appearances, and aggressive advocacy throughout all phases of litigation.",
    icon: FileText
  },
  {
    step: "04",
    title: "Resolution & Enforcement",
    description: "Achieving favorable outcomes through trial, settlement negotiation, or alternative dispute resolution, followed by enforcement.",
    icon: CheckCircle
  }
];

const WHY_CHOOSE_US = [
  {
    icon: UserCheck,
    title: "Expert Legal Team",
    description: "Our litigation attorneys bring decades of combined experience across diverse legal specializations, ensuring comprehensive expertise for your case."
  },
  {
    icon: Eye,
    title: "Transparent Communication", 
    description: "Regular updates, clear explanations of legal processes, and honest assessment of your case status at every stage of litigation."
  },
  {
    icon: Target,
    title: "Strategic Approach",
    description: "Customized litigation strategies tailored to your specific circumstances, designed to achieve the most favorable outcome possible."
  },
  {
    icon: Briefcase,
    title: "Comprehensive Services",
    description: "End-to-end litigation support from initial consultation through final resolution, including post-judgment enforcement when needed."
  }
];

const TESTIMONIALS = [
  {
    name: "Rajesh Sharma",
    role: "Business Owner",
    content: "Lawgical's litigation team successfully resolved our complex commercial dispute. Their strategic approach and expert advocacy saved our business millions.",
    rating: 5,
  },
  {
    name: "Priya Mehta",
    role: "Individual Client",
    content: "Professional, dedicated, and results-oriented. They fought tirelessly for my rights and achieved an outcome beyond my expectations.",
    rating: 5,
  },
  {
    name: "Corporate Legal Head",
    role: "Fortune 500 Company",
    content: "We trust Lawgical with our most complex litigation matters. Their expertise and commitment to excellence make them invaluable partners.",
    rating: 5,
  },
];

export default function LitigationHomepage() {
  const [counters, setCounters] = useState({ cases: 0, success: 0 });

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

    animateCounter(500, "cases", "+");
    animateCounter(98, "success", "%");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {      /* Header Component */}
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6">
                ⚖️ Expert Legal Advocacy
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Litigation Services
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}That Win Cases
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Expert legal representation for complex disputes. Our experienced litigation attorneys provide strategic advocacy, comprehensive case management, and unwavering dedication to protecting your rights and interests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg">
                  <Phone className="h-5 w-5 mr-2" />
                  Free Case Consultation
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  View Case Studies
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>98% Success Rate</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Ready to Fight for Your Rights?</h3>
                  <p className="text-gray-600 mt-2">Get expert litigation support today</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <Gavel className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert Court Representation</h4>
                      <p className="text-sm text-gray-600">Aggressive advocacy in all court levels</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <Target className="h-8 w-8 text-purple-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Strategic Case Planning</h4>
                      <p className="text-sm text-gray-600">Customized approach for every case</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <MessageCircle className="h-8 w-8 text-green-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Clear Communication</h4>
                      <p className="text-sm text-gray-600">Regular updates throughout the process</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
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
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Litigation Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What is Litigation?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Litigation is the formal legal process of resolving disputes through the court system. It involves presenting evidence, legal arguments, and advocacy to achieve favorable outcomes for our clients.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Card className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Understanding Litigation</h3>
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    Litigation encompasses the entire process of legal dispute resolution through courts, from initial case assessment through final judgment and enforcement. It's a complex process that requires strategic thinking, thorough preparation, and skilled advocacy.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our litigation services cover all phases of legal disputes, whether civil, commercial, or specialized matters. We combine legal expertise with strategic thinking to achieve the best possible outcomes for our clients.
                  </p>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Litigation Elements:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Comprehensive case analysis and strategy development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Evidence gathering and witness preparation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Court appearances and legal advocacy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Settlement negotiations and alternative dispute resolution</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <Scale className="h-8 w-8 text-blue-600 mr-4" />
                  <h4 className="text-xl font-semibold text-gray-900">Civil Litigation</h4>
                </div>
                <p className="text-gray-700">Disputes between individuals, businesses, or organizations seeking monetary compensation or specific performance.</p>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 border border-purple-200">
                <div className="flex items-center mb-4">
                  <Building className="h-8 w-8 text-purple-600 mr-4" />
                  <h4 className="text-xl font-semibold text-gray-900">Commercial Litigation</h4>
                </div>
                <p className="text-gray-700">Business-related disputes including contract breaches, partnership conflicts, and corporate governance issues.</p>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <Gavel className="h-8 w-8 text-green-600 mr-4" />
                  <h4 className="text-xl font-semibold text-gray-900">Appellate Practice</h4>
                </div>
                <p className="text-gray-700">Higher court appeals challenging lower court decisions through comprehensive legal research and argumentation.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Comprehensive Litigation Services</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From complex commercial disputes to individual civil matters, our experienced litigation team provides strategic legal advocacy across all court levels and legal specializations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LITIGATION_TYPES.map((service, index) => (
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

      {/* Litigation Process */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Strategic Litigation Process</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              A systematic approach to legal advocacy that maximizes your chances of success while keeping you informed at every step of the journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <Card key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
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

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Litigation Services?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our commitment to excellence, strategic thinking, and client success sets us apart in the competitive legal landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {WHY_CHOOSE_US.map((feature, index) => (
              <Card key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Client Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from clients who trusted us with their most important legal matters.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
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

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Fight for Your Rights?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Don't face legal disputes alone. Our expert litigation team is ready to provide the strategic advocacy and dedicated representation you need to achieve favorable outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Legal Hotline</h3>
              <a href="tel:+918383801899" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                +91 8383801899
              </a>
              <p className="text-sm text-gray-600 mt-2">(Immediate Response)</p>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200 text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Consultation</h3>
              <a href="mailto:help@lawgical.io" className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
                help@lawgical.io
              </a>
              <p className="text-sm text-gray-600 mt-2">(Free Case Review)</p>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl border border-green-200 text-center">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Location</h3>
              <p className="text-xl font-bold text-green-600">Lawgical Avenue</p>
              <p className="text-sm text-gray-600 mt-2">Sector 12, Gurugram, Haryana</p>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg text-lg px-12 py-4">
              <Phone className="h-5 w-5 mr-2" />
              Schedule Free Consultation
            </Button>
            <p className="text-sm text-gray-500 mt-4">No obligation • Confidential • Expert legal advice</p>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
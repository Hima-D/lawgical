"use client";
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Heart, 
  Scale, 
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
  FileText,
  Gavel
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';


// shadcn/ui Components (simplified for artifact)
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
  { number: "1000+", label: "Cases Handled", icon: FileText },
  { number: "15+", label: "Years Experience", icon: Award },
  { number: "24/7", label: "Emergency Support", icon: Clock },
  { number: "100%", label: "Confidential", icon: Shield },
];

const SERVICES = [
  {
    icon: Heart,
    title: "Trauma-Informed Legal Consultation",
    description: "Confidential, sensitive first consultations conducted by lawyers trained in trauma-informed approaches to minimize distress to child survivors and their families.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: FileText,
    title: "Case Building & Evidence Preservation",
    description: "Expert assistance with documentation, evidence collection, and case building in coordination with medical professionals, child psychologists, and law enforcement.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Scale,
    title: "Court Representation",
    description: "Dedicated legal representation before Special Courts, ensuring the child's testimony is recorded in a supportive environment with minimal trauma.",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Shield,
    title: "Rehabilitation & Compensation",
    description: "Assistance with applications for victim compensation schemes and connecting families with appropriate support services for long-term recovery.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: BookOpen,
    title: "Preventive Education & Training",
    description: "We conduct workshops for schools, organizations, and parents on POCSO provisions, prevention strategies, and creating safe environments for children.",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: Users,
    title: "Family Support Services",
    description: "Comprehensive support for families throughout the legal process, including counseling referrals and ongoing case management.",
    color: "from-teal-500 to-cyan-500"
  }
];

const FEATURES = [
  {
    title: "Child-Centric Procedures",
    description: "The Act mandates child-friendly reporting, recording of evidence, investigation, and trial processes. Special provisions ensure the child's comfort, dignity, and privacy throughout legal proceedings.",
    icon: Heart
  },
  {
    title: "Special Courts & Personnel",
    description: "Dedicated Special Courts handle POCSO cases to expedite trials and ensure sensitivity. Special Public Prosecutors, support persons, and trained professionals assist children through the process.",
    icon: Gavel
  },
  {
    title: "Comprehensive Definitions",
    description: "The Act precisely defines various forms of sexual abuse including penetrative and non-penetrative assault, sexual harassment, and pornography, addressing gaps in existing laws.",
    icon: FileText
  },
  {
    title: "Mandatory Reporting",
    description: "The law places an obligation on every person, including parents, teachers, and medical professionals, to report cases of child sexual abuse, with penalties for non-reporting or false reporting.",
    icon: AlertCircle
  }
];

const TESTIMONIALS = [
  {
    name: "Anonymous Client",
    role: "Parent",
    content: "The team at Lawgical helped us through the most difficult time in our lives with compassion and expertise. They made sure our child felt safe throughout the entire process.",
    rating: 5,
  },
  {
    name: "Social Worker",
    role: "Child Protection Services",
    content: "We regularly refer families to Lawgical for POCSO cases. Their trauma-informed approach and legal expertise make them our trusted partners in child protection.",
    rating: 5,
  },
  {
    name: "Anonymous Guardian",
    role: "Legal Guardian",
    content: "Professional, caring, and thorough. They fought for justice while ensuring our child's wellbeing was the top priority at every step.",
    rating: 5,
  },
];

export default function POCSOHomepage() {
  const [counters, setCounters] = useState({ cases: 0, experience: 0 });

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

    animateCounter(1000, "cases", "+");
    animateCounter(15, "experience", "+");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Header */}
      <Header />

      {/* Meta Tags */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-blue-100 text-blue-800">
                POCSO Act Legal Support
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Protecting Children,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Ensuring Justice
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Dedicated legal advocacy for children affected by abuse and exploitation under the Protection of Children from Sexual Offences Act. We provide compassionate, expert legal support when you need it most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg">
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Consultation
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Learn About POCSO Act
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
                  <span>Confidential</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Expert Legal Team</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Immediate Support Available</h3>
                  <p className="text-gray-600 mt-2">We understand the urgency of child protection cases</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <Phone className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">24/7 Emergency Helpline</h4>
                      <p className="text-sm text-gray-600">Immediate response for urgent cases</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <Heart className="h-8 w-8 text-purple-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Trauma-Informed Care</h4>
                      <p className="text-sm text-gray-600">Specialized approach for sensitive cases</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <Shield className="h-8 w-8 text-green-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Complete Confidentiality</h4>
                      <p className="text-sm text-gray-600">Your privacy and safety are our priority</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center text-white">
            <AlertCircle className="h-6 w-6 mr-3 animate-pulse" />
            <span className="text-lg font-semibold">Emergency? Call us immediately at </span>
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
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About POCSO Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Understanding the POCSO Act</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              The Protection of Children from Sexual Offences (POCSO) Act, 2012 is landmark legislation in India specifically designed to protect children under 18 years from sexual assault, sexual harassment, and pornography.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Card className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Principles of POCSO</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Child-friendly system for reporting and recording evidence</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Speedy trial through designated Special Courts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Provisions for avoiding re-victimization during judicial process</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Stringent punishment graded by gravity of offense</span>
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
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Specialized POCSO Legal Services</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              At Lawgical, our team of experienced lawyers specializes in handling sensitive POCSO cases with the utmost professionalism, empathy, and legal expertise.
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
            <h2 className="text-4xl font-bold mb-8">Our Commitment to Child Protection</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
              <p>
                At Lawgical, we are unwavering in our commitment to protect children's rights and dignity. We understand that cases involving child sexual abuse require not just legal expertise, but also exceptional sensitivity, patience, and dedication.
              </p>
              <p>
                Our team approaches each POCSO case with the understanding that behind every legal file is a child whose life has been profoundly affected. We strive to create a supportive environment where children and their families feel safe, respected, and empowered throughout the legal process.
              </p>
              <p>
                We believe in both justice and healing—working diligently to hold offenders accountable while ensuring that child survivors have access to the support they need for recovery and reintegration.
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
            <p className="text-xl text-gray-600">Hear from those who trust us with their most sensitive cases.</p>
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
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Confidential Consultation</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              If you need to report a POCSO case or seek legal guidance regarding child protection matters, our specialized legal team is available for strictly confidential consultations. We prioritize your child's safety and wellbeing above all else.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Helpline</h3>
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
              <p className="text-sm text-gray-600 mt-2">Sector 12, Gurugram, Haryana</p>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg text-lg px-12 py-4">
              Schedule a Confidential Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

     
      

    </div>
  );
}
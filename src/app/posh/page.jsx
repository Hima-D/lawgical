"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Calendar,
  Shield,
  Target,
  Briefcase,
  Globe,
} from "lucide-react";

// shadcn/ui component implementations
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
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

const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline:
      "text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};





const POSH = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });

  const [counters, setCounters] = useState({
    organizations: 0,
    inquiries: 0,
    programs: 0,
    individuals: 0,
  });

  // Animate counters
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

    animateCounter(500, "organizations", "+");
    animateCounter(1500, "inquiries", "+");
    animateCounter(2790, "programs", "+");
    animateCounter(317527, "individuals", "+");
  }, []);

  const stats = [
    {
      label: "Organizations Served",
      value: counters.organizations,
      displayValue: "500+",
      icon: "🏢",
    },
    {
      label: "Inquiries Conducted",
      value: counters.inquiries,
      displayValue: "1,500+",
      icon: "🎯",
    },
    {
      label: "Training Programs",
      value: counters.programs,
      displayValue: "2,790+",
      icon: "📚",
    },
    {
      label: "Individuals Trained",
      value: counters.individuals,
      displayValue: "317,527+",
      icon: "👥",
    },
  ];

  const features = [
    {
      title: "Expert-Led Training",
      description:
        "Gain insights from seasoned professionals with over 15 years of combined legal and psychosocial expertise. Our trainers, including certified POSH advocates and psychologists, deliver practical knowledge through real-world case studies, ensuring you master compliance with confidence.",
      icon: Award,
    },
    {
      title: "Intersectional Framework",
      description:
        "Our multidisciplinary approach blends legal compliance with psychosocial strategies, addressing diverse workplace dynamics. Learn to navigate complex scenarios with a holistic perspective, fostering inclusive and equitable environments tailored to India's unique cultural context.",
      icon: Globe,
    },
    {
      title: "Engaging Interactive Sessions",
      description:
        "Participate in dynamic workshops featuring role-playing, multimedia case studies, interactive quizzes, and group discussions. Designed for active learning, these sessions enhance retention and equip you with practical skills to conduct impactful POSH training.",
      icon: Users,
    },
    {
      title: "Real-World Scenario Training",
      description:
        "Apply your knowledge through immersive, scenario-based exercises reflecting actual workplace challenges. From handling complaints to drafting policies, our training prepares you to implement POSH compliance effectively in diverse organizational settings.",
      icon: Target,
    },
    {
      title: "CPD-Accredited Certification",
      description:
        "Earn a globally recognized, CPD-accredited certificate upon program completion. This verifiable credential enhances your professional credibility, opening doors to opportunities as a certified POSH trainer across industries.",
      icon: Award,
    },
    {
      title: "Inclusive & Accessible Design",
      description:
        "Our courses are crafted to meet diverse learning needs, adhering to WCAG accessibility standards. With flexible formats, multilingual support, and accommodations for visual and auditory impairments, we ensure every participant thrives in our training environment.",
      icon: Shield,
    },
    {
      title: "Ongoing Support & Resources",
      description:
        "Access a wealth of post-training resources, including toolkits, policy templates, and a dedicated trainer community. Benefit from continuous mentorship and quarterly webinars to stay updated on POSH law amendments and best practices.",
      icon: MessageCircle,
    },
    {
      title: "Customizable Training Modules",
      description:
        "Tailor your learning experience with modular content designed for various industries, such as IT, healthcare, and manufacturing. Choose specialized tracks to address sector-specific compliance needs, ensuring relevance and applicability.",
      icon: Briefcase,
    },
  ];
  
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "HR Director, Tech Corp",
      content:
        "The POSH training was comprehensive and engaging. Our team gained valuable insights into creating a safer workplace.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Legal Head, Finance Ltd",
      content:
        "Excellent program with practical scenarios. The trainers were knowledgeable and professional.",
      rating: 5,
    },
    {
      name: "Anjali Patel",
      role: "Compliance Manager, Healthcare Inc",
      content:
        "Highly recommend this certification program. It's well-structured and addresses all key aspects of POSH law.",
      rating: 5,
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
                <Calendar className="h-3 w-3 mr-1" />
                Next Batch: July 22nd, 2025
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Become A Certified{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  POSH Trainer
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Lead workplace change with clarity and confidence through our
                comprehensive POSH Train the Trainer Certification Program
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg transform hover:scale-105 shadow-lg"
                  aschild
                >
                  <Link href="/posh/register">Register Now</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 text-lg hover:bg-blue-600 hover:text-white"
                  aschild
                >
                  <Link href="#contact">Request Call Back</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>500+ Organizations Served</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>317K+ Individuals Trained</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>CPD Accredited Program</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Start Your POSH Training Journey
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="text-2xl mr-4">⚖️</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Legal Expertise
                      </h4>
                      <p className="text-sm text-gray-600">
                        Comprehensive coverage of POSH Law 2013
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <span className="text-2xl mr-4">🎓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Expert Training
                      </h4>
                      <p className="text-sm text-gray-600">
                        Learn from industry professionals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <span className="text-2xl mr-4">🏆</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Certification
                      </h4>
                      <p className="text-sm text-gray-600">
                        Get CPD accredited certification
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.displayValue}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About Our Program
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive training program designed to equip you with the
              knowledge and skills to conduct effective POSH awareness sessions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Why Choose Our Certification?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Industry Expert Faculty
                    </h4>
                    <p className="text-gray-600">
                      Learn from professionals with extensive legal and
                      psychosocial experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Comprehensive Curriculum
                    </h4>
                    <p className="text-gray-600">
                      In-depth coverage of POSH Law 2013 and practical
                      implementation strategies
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Interactive Learning
                    </h4>
                    <p className="text-gray-600">
                      Hands-on sessions with real-world scenarios and case studies
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Certification & Support
                    </h4>
                    <p className="text-gray-600">
                      Receive official certification and ongoing support for your
                      training initiatives
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Program Highlights
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">2-Day Intensive Workshop</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">CPD Accredited Program</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Interactive Group Sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">
                    Comprehensive Study Materials
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">
                    Legal & Psychological Perspectives
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures you receive the best training
              experience with practical, actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-16 bg-gradient-to-br from-slate-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Our Participants Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from professionals who have transformed their organizations
              through our training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground">
                Ready to become a certified POSH trainer? Contact us today to
                learn more
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+918383801899</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>connect@lawgical.io</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <span>
                      lawgical, Gurgaon
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Youtube className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you shortly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="organization"
                      placeholder="Organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                    />
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                    />
                    <Button type="submit" className="w-full">
                      Send Message
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
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
            Join thousands of professionals who trust lawgical for their
            workplace compliance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              asChild
            >
              <Link href="#register">Start Your Journey</Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
              asChild
            >
              <Link href="#contact">Book Free Consultation</Link>
            </Button>
          </div>

          <div className="mt-8 text-blue-100 text-sm">
            <span>✓ Expert guidance</span>
            <span className="mx-4">✓ CPD accredited</span>
            <span>✓ 100% secure</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default POSH;
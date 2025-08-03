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
  AlertTriangle,
  Scale,
  Heart,
  Eye,
  UserCheck,
  FileText,
} from "lucide-react";
import { Slot } from "@radix-ui/react-slot"; // For asChild support

// shadcn/ui component implementations
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
  const [counters, setCounters] = useState({
    organizations: 0,
    inquiries: 0,
    programs: 0,
    individuals: 0,
  });

  // Animate counters
  useEffect(() => {
    console.log("POSH page rendered, starting counter animation");
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

  const keyPrinciples = [
    {
      title: "Prevention",
      description: "Creating awareness and preventive measures to stop sexual harassment before it occurs",
      icon: Shield,
    },
    {
      title: "Protection",
      description: "Safeguarding employees through robust policies and safe reporting mechanisms",
      icon: Heart,
    },
    {
      title: "Prompt Response",
      description: "Swift and fair investigation of complaints with timely resolution",
      icon: AlertTriangle,
    },
    {
      title: "Punishment",
      description: "Appropriate disciplinary action against offenders to maintain accountability",
      icon: Scale,
    },
  ];

  const harassmentTypes = [
    {
      type: "Physical",
      examples: ["Unwelcome touching", "Physical intimacy", "Inappropriate gestures"],
      color: "bg-red-50 border-red-200 text-red-800",
    },
    {
      type: "Verbal",
      examples: ["Sexual jokes", "Comments on appearance", "Unwelcome advances"],
      color: "bg-orange-50 border-orange-200 text-orange-800",
    },
    {
      type: "Non-verbal",
      examples: ["Staring", "Display of pornographic material", "Suggestive emails"],
      color: "bg-yellow-50 border-yellow-200 text-yellow-800",
    },
    {
      type: "Quid Pro Quo",
      examples: ["Job benefits for sexual favors", "Promotion promises", "Threat of job loss"],
      color: "bg-purple-50 border-purple-200 text-purple-800",
    },
  ];

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
                <Scale className="h-3 w-3 mr-1" />
                Sexual Harassment of Women at Workplace Act, 2013
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Understanding{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  POSH
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Prevention of Sexual Harassment - Creating safer, more inclusive workplaces 
                through awareness, education, and proper implementation of the law
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 text-lg hover:bg-blue-600 hover:text-white"
                  asChild
                >
                  <Link href="/posh/register">Get Certified</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 text-lg hover:bg-blue-600 hover:text-white"
                  asChild
                >
                  <Link href="#learn-more">Learn More</Link>
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
                  <span>Legal Compliance Experts</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  What is POSH?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="text-2xl mr-4">⚖️</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Legal Framework
                      </h4>
                      <p className="text-sm text-gray-600">
                        Mandatory compliance under Indian law since 2013
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <span className="text-2xl mr-4">🛡️</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Workplace Safety
                      </h4>
                      <p className="text-sm text-gray-600">
                        Protecting women from sexual harassment at work
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <span className="text-2xl mr-4">👥</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Inclusive Environment
                      </h4>
                      <p className="text-sm text-gray-600">
                        Creating respectful and dignified workplaces
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is POSH - Detailed Definition */}
      <section id="learn-more" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Does POSH Mean to Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              POSH stands for <strong>Prevention of Sexual Harassment</strong> - a comprehensive legal framework 
              established by the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. 
              At Lawgical, we believe POSH is more than just compliance; it's about creating workplaces where every individual 
              can work with dignity, respect, and safety.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Philosophy</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We view POSH as a fundamental pillar of workplace equality and human rights. 
                It's not just about avoiding legal penalties, but about fostering an environment 
                where talent thrives regardless of gender.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our approach combines legal expertise with psychological understanding, 
                ensuring that POSH implementation creates genuine cultural change, not just procedural compliance.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Legal Mandate</h4>
                <p className="text-gray-600">
                  Every organization with 10 or more employees must comply with POSH Act 2013, 
                  establishing Internal Committees and implementing proper redressal mechanisms.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Cultural Transformation</h4>
                <p className="text-gray-600">
                  Beyond compliance, POSH creates a culture of respect, inclusion, and zero tolerance 
                  for any form of harassment or discrimination.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Business Impact</h4>
                <p className="text-gray-600">
                  Proper POSH implementation enhances employee satisfaction, reduces attrition, 
                  and creates a competitive advantage in talent acquisition and retention.
                </p>
              </div>
            </div>
          </div>

          {/* The 4 P's of POSH */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              The Four Pillars of POSH
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
                    <principle.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Types of Sexual Harassment */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Understanding Sexual Harassment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognizing different forms of sexual harassment is crucial for prevention and proper response
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {harassmentTypes.map((type, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 ${type.color} transition-all duration-300 hover:shadow-lg`}
              >
                <h3 className="text-xl font-bold mb-4">{type.type} Harassment</h3>
                <ul className="space-y-2">
                  {type.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-sm mt-1">•</span>
                      <span className="text-sm">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Remember: Intent vs. Impact
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              Sexual harassment is determined by the impact on the recipient, not the intent of the perpetrator. 
              What matters is whether the behavior creates an intimidating, hostile, or offensive work environment 
              for the person experiencing it.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600">Creating safer workplaces across India</p>
          </div>
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

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our POSH Training
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures effective implementation and lasting cultural change
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
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Our Participants Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from professionals who have transformed their organizations through our training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create a Safer Workplace?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of professionals who trust Lawgical for their POSH compliance and training needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              asChild
            >
              <Link href="/posh/register">Become a POSH Trainer</Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
              asChild
            >
              <Link href="/contact">Get Organization Training</Link>
            </Button>
          </div>

          <div className="mt-8 text-blue-100 text-sm">
            <span>✓ Expert guidance</span>
            <span className="mx-4">✓ Legal compliance</span>
            <span>✓ Cultural transformation</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default POSH;
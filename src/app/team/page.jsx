"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
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
  GraduationCap,
  Scale,
  ChevronRight,
  Building,
  Clock,
  FileText,
  UserCheck,
  Search,
  Filter,
  ExternalLink,
  Download,
  Share2,
  Heart,
  Eye,
  Zap,
} from "lucide-react";

// Enhanced UI Components with Mobile-First Design
const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 touch-manipulation";

  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl",
    destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white backdrop-blur-sm",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "underline-offset-4 hover:underline text-blue-600",
    gradient: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl",
    glass: "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30",
  };

  const sizes = {
    default: "h-12 py-3 px-6 text-base min-w-[120px]",
    sm: "h-10 px-4 text-sm min-w-[100px]",
    lg: "h-14 px-8 text-lg min-w-[140px]",
    icon: "h-12 w-12",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", variant = "default", hover = false, ...props }) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl",
    gradient: "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg",
    elevated: "bg-white border border-gray-200 shadow-md hover:shadow-xl",
  };

  const hoverEffect = hover ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer" : "";

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${variants[variant]} ${hoverEffect} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-4 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 sm:p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "", size = "default" }) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "text-gray-900 border border-gray-300 bg-white hover:bg-gray-50",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    gradient: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
  };

  const sizes = {
    default: "px-3 py-1 text-xs",
    sm: "px-2 py-0.5 text-xs",
    lg: "px-4 py-2 text-sm",
  };

  return (
    <div className={`inline-flex items-center rounded-full font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, className = "" }) => {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Enhanced team members data with better mobile-friendly content
const teamMembers = [
  {
    id: 1,
    name: "Adv. Priya Sharma",
    title: "Managing Partner",
    specialty: "POSH & Employment Law",
    experience: "15+ years",
    rating: 4.9,
    cases: 1200,
    description: "Priya is a leading expert in workplace harassment prevention and employment law compliance. She has trained over 50,000+ professionals across India and has been instrumental in helping organizations create safer workplaces.",
    shortBio: "Leading POSH expert with 15+ years of experience in employment law and workplace safety.",
    education: "LL.M., Faculty of Law, University of Delhi; Certified POSH Trainer",
    barAdmissions: ["Delhi High Court", "Supreme Court of India"],
    languages: ["English", "Hindi", "Punjabi"],
    achievements: ["Best Employment Lawyer 2023", "POSH Expert of the Year", "Women Leader in Law"],
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "priya.sharma@lawgical.io",
      phone: "+91 9876543210"
    },
    practiceAreas: ["POSH Compliance", "Employment Law", "Workplace Investigations", "HR Legal Advisory"],
    socialProof: {
      clientReviews: 248,
      winRate: 96,
      yearsActive: 15
    }
  },
  {
    id: 2,
    name: "Adv. Rajesh Kumar",
    title: "Senior Partner",
    specialty: "Corporate Law & Compliance",
    experience: "20+ years",
    rating: 4.8,
    cases: 800,
    description: "Rajesh is a seasoned corporate lawyer specializing in mergers, acquisitions, and regulatory compliance. He has advised Fortune 500 companies on complex legal matters and corporate governance.",
    shortBio: "Corporate law veteran with 20+ years advising Fortune 500 companies on M&A and compliance.",
    education: "LL.B., National Law School of India University (NLSIU), Bangalore; MBA Finance",
    barAdmissions: ["Karnataka High Court", "Delhi High Court", "Supreme Court of India"],
    languages: ["English", "Hindi", "Kannada"],
    achievements: ["Corporate Lawyer of the Year 2022", "Legal Excellence Award", "Top 40 Under 40 Lawyers"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "rajesh.kumar@lawgical.io",
      phone: "+91 9876543211"
    },
    practiceAreas: ["Mergers & Acquisitions", "Corporate Governance", "Securities Law", "Regulatory Compliance"],
    socialProof: {
      clientReviews: 195,
      winRate: 94,
      yearsActive: 20
    }
  },
  {
    id: 3,
    name: "Adv. Anjali Menon",
    title: "Associate Partner",
    specialty: "Criminal Defense & Litigation",
    experience: "12+ years",
    rating: 4.9,
    cases: 950,
    description: "Anjali is a formidable litigator with expertise in criminal defense and civil litigation. She has successfully defended clients in high-profile cases and is known for her meticulous preparation and courtroom advocacy.",
    shortBio: "Formidable criminal defense attorney with 95% success rate in high-profile cases.",
    education: "LL.B., Gujarat National Law University (GNLU), Gandhinagar; Diploma in Criminal Law",
    barAdmissions: ["Kerala High Court", "Madras High Court", "Gujarat High Court"],
    languages: ["English", "Hindi", "Malayalam", "Tamil"],
    achievements: ["Best Criminal Lawyer 2023", "Outstanding Advocate Award", "Pro Bono Champion"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "anjali.menon@lawgical.io",
      phone: "+91 9876543212"
    },
    practiceAreas: ["Criminal Defense", "White Collar Crimes", "Civil Litigation", "Appeals"],
    socialProof: {
      clientReviews: 312,
      winRate: 95,
      yearsActive: 12
    }
  },
  {
    id: 4,
    name: "Adv. Vikram Singh",
    title: "Legal Consultant",
    specialty: "Intellectual Property Law",
    experience: "10+ years",
    rating: 4.7,
    cases: 600,
    description: "Vikram is an IP law specialist with extensive experience in patent prosecution, trademark registration, and IP litigation. He helps tech companies and startups protect their intellectual assets.",
    shortBio: "IP law specialist helping tech companies and startups protect their intellectual assets.",
    education: "LL.M., Indian Law Institute (ILI), New Delhi; B.Tech Computer Science",
    barAdmissions: ["Delhi High Court", "Bombay High Court"],
    languages: ["English", "Hindi", "Marathi"],
    achievements: ["IP Lawyer of the Year 2022", "Tech Law Expert", "Innovation Legal Award"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "vikram.singh@lawgical.io",
      phone: "+91 9876543213"
    },
    practiceAreas: ["Patent Law", "Trademark Registration", "Copyright Protection", "IP Litigation"],
    socialProof: {
      clientReviews: 156,
      winRate: 92,
      yearsActive: 10
    }
  },
  {
    id: 5,
    name: "Adv. Sneha Patel",
    title: "Senior Associate",
    specialty: "Family Law & Matrimonial",
    experience: "8+ years",
    rating: 4.8,
    cases: 750,
    description: "Sneha specializes in family law matters including divorce, child custody, and matrimonial disputes. She is known for her compassionate approach and expertise in alternative dispute resolution.",
    shortBio: "Compassionate family law expert specializing in matrimonial disputes and mediation.",
    education: "LL.B., Faculty of Law, M.S. University of Baroda; Diploma in Family Counseling",
    barAdmissions: ["Gujarat High Court", "Rajasthan High Court"],
    languages: ["English", "Hindi", "Gujarati"],
    achievements: ["Family Lawyer Excellence Award", "Mediation Expert", "Women Rights Advocate"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "sneha.patel@lawgical.io",
      phone: "+91 9876543214"
    },
    practiceAreas: ["Divorce Proceedings", "Child Custody", "Domestic Violence", "Family Mediation"],
    socialProof: {
      clientReviews: 203,
      winRate: 93,
      yearsActive: 8
    }
  },
  {
    id: 6,
    name: "Adv. Arjun Reddy",
    title: "Associate",
    specialty: "Real Estate & Property Law",
    experience: "6+ years",
    rating: 4.6,
    cases: 450,
    description: "Arjun handles complex real estate transactions and property disputes. He assists clients with due diligence, title verification, and regulatory approvals for real estate projects.",
    shortBio: "Real estate law expert specializing in property transactions and dispute resolution.",
    education: "LL.B., Symbiosis Law School, Pune; Diploma in Real Estate Law",
    barAdmissions: ["Telangana High Court", "Karnataka High Court"],
    languages: ["English", "Hindi", "Telugu", "Kannada"],
    achievements: ["Rising Star in Real Estate Law", "Property Law Expert", "Young Achiever Award"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "arjun.reddy@lawgical.io",
      phone: "+91 9876543215"
    },
    practiceAreas: ["Property Transactions", "Real Estate Disputes", "Title Verification", "RERA Compliance"],
    socialProof: {
      clientReviews: 128,
      winRate: 89,
      yearsActive: 6
    }
  }
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add custom animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(1deg); }
        66% { transform: translateY(-5px) rotate(-1deg); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      @keyframes slide-up {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-slide-up {
        animation: slide-up 0.5s ease-out forwards;
      }
      .animate-stagger {
        animation: slide-up 0.6s ease-out forwards;
      }
      .animate-stagger:nth-child(2) { animation-delay: 0.1s; }
      .animate-stagger:nth-child(3) { animation-delay: 0.2s; }
      .animate-stagger:nth-child(4) { animation-delay: 0.3s; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const specialties = ["All", ...new Set(teamMembers.map(member => member.specialty))];
  
  const filteredMembers = teamMembers.filter(member => {
    const matchesFilter = activeFilter === "All" || member.specialty === activeFilter;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.practiceAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} className="absolute top-20 left-4 sm:left-10 opacity-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={2} className="absolute top-40 right-4 sm:right-20 opacity-20">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={4} className="absolute bottom-40 left-1/4 opacity-20">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl"></div>
        </FloatingElement>
      </div>

      <Header />

      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200" size="lg">
              <Users className="h-4 w-4 mr-2" />
              Expert Legal Team
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                Legal Experts
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Our distinguished team of attorneys brings decades of combined experience 
              and unwavering commitment to delivering exceptional legal services across diverse practice areas.
            </p>
            
            {/* Stats Grid - Mobile Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mt-8 sm:mt-12">
              {[
                { value: "71+", label: "Years Combined Experience", icon: Clock, color: "text-blue-600" },
                { value: "4350+", label: "Cases Won", icon: Award, color: "text-green-600" },
                { value: "95%", label: "Average Win Rate", icon: Target, color: "text-purple-600" },
                { value: "24/7", label: "Support Available", icon: Shield, color: "text-orange-600" }
              ].map((stat, index) => (
                <Card key={index} className="p-4 sm:p-6 text-center bg-white/60 backdrop-blur-sm animate-stagger">
                  <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 leading-tight">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section - Mobile First */}
      <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search attorneys by name, specialty, or practice area..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Buttons - Mobile Scrollable */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex-shrink-0 sm:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <div className={`flex gap-2 overflow-x-auto scrollbar-hide pb-2 ${showFilters ? 'flex' : 'hidden sm:flex'}`}>
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={activeFilter === specialty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(specialty)}
                  className={`flex-shrink-0 ${
                    activeFilter === specialty
                      ? "bg-blue-600 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-3 text-sm text-gray-600">
            {filteredMembers.length} attorney{filteredMembers.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </section>

      {/* Team Grid - Mobile Optimized */}
      <section id="team" className="py-8 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredMembers.map((member, index) => (
              <Card
                key={member.id}
                hover
                className="group bg-white border border-gray-100 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Overlay Info */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <Badge variant="gradient" size="sm">
                      {member.experience}
                    </Badge>
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-semibold ml-1">{member.rating}</span>
                    </div>
                  </div>

                  {/* Quick Stats Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-between text-xs">
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{member.cases}+</div>
                        <div className="text-gray-600">Cases</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600">{member.socialProof.winRate}%</div>
                        <div className="text-gray-600">Win Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-600">{member.socialProof.clientReviews}</div>
                        <div className="text-gray-600">Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-1 text-sm sm:text-base">{member.title}</p>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3">{member.specialty}</p>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {member.shortBio}
                  </p>
                  
                  {/* Practice Areas Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.practiceAreas.slice(0, 2).map((area, idx) => (
                      <Badge key={idx} variant="secondary" size="sm" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                    {member.practiceAreas.length > 2 && (
                      <Badge variant="outline" size="sm" className="text-xs">
                        +{member.practiceAreas.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Scale className="h-3 w-3 mr-1" />
                        <span>{member.practiceAreas.length} Areas</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        <span>{member.languages.length} Languages</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:bg-blue-50 p-2"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No attorneys found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Member Details Modal - Mobile Optimized */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Attorney Profile</h2>
                <p className="text-sm text-gray-600 mt-1">Detailed information and contact</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMember(null)}
                className="hover:bg-white/50 mt-2 sm:mt-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="max-h-[calc(90vh-100px)] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Left column - Profile - Mobile First */}
                <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-8">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{selectedMember.name}</h3>
                    <p className="text-blue-600 font-semibold mb-1 text-sm sm:text-base">{selectedMember.title}</p>
                    <p className="text-gray-600 text-sm mb-3">{selectedMember.specialty}</p>
                    
                    <div className="flex justify-center gap-2 mb-4">
                      <Badge className="bg-blue-600 text-white">{selectedMember.experience}</Badge>
                      <Badge variant="success">
                        <Star className="h-3 w-3 mr-1" />
                        {selectedMember.rating}
                      </Badge>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                      <div className="bg-white/50 rounded-lg p-2">
                        <div className="font-bold text-blue-600 text-sm">{selectedMember.cases}+</div>
                        <div className="text-xs text-gray-600">Cases</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-2">
                        <div className="font-bold text-green-600 text-sm">{selectedMember.socialProof.winRate}%</div>
                        <div className="text-xs text-gray-600">Win Rate</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-2">
                        <div className="font-bold text-purple-600 text-sm">{selectedMember.socialProof.clientReviews}</div>
                        <div className="text-xs text-gray-600">Reviews</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm bg-white/30 rounded-lg p-3">
                      <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700 break-all">{selectedMember.contactInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm bg-white/30 rounded-lg p-3">
                      <Phone className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{selectedMember.contactInfo.phone}</span>
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-6">
                      <Button fullWidth className="bg-blue-600 hover:bg-blue-700">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Consultation
                      </Button>
                      <Button variant="outline" fullWidth>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Quick Chat
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Right column - Details - Mobile Optimized */}
                <div className="lg:col-span-3 p-4 sm:p-8 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Biography</h4>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedMember.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Education</h4>
                    <div className="flex items-start space-x-3 bg-gray-50 rounded-lg p-3">
                      <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm leading-relaxed">{selectedMember.education}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Bar Admissions</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.barAdmissions.map((bar, index) => (
                        <Badge key={index} variant="outline" className="border-blue-200 text-blue-800 text-xs">
                          {bar}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.languages.map((language, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Practice Areas</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedMember.practiceAreas.map((area, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-blue-50 rounded-lg p-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Achievements</h4>
                    <div className="space-y-2">
                      {selectedMember.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-yellow-50 rounded-lg p-2">
                          <Award className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons - Mobile */}
                  <div className="lg:hidden flex flex-col gap-2 pt-4 border-t border-gray-200">
                    <Button fullWidth variant="gradient">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" fullWidth>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" fullWidth>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Work With Our Expert Team?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
            Our experienced attorneys are ready to review your case and provide the expertise you need.
            Schedule a consultation today and let us help you navigate your legal challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              variant="glass" 
              size="lg" 
              fullWidth={true}
              className="sm:w-auto bg-white text-blue-600 hover:bg-gray-100"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button
              variant="glass"
              size="lg"
              fullWidth={true}
              className="sm:w-auto"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now: +91 8383801899
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-blue-100 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Free initial consultation</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Expert legal advice</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Personalized solutions</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Team;
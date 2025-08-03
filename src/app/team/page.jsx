"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";
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
} from "lucide-react";




// UI Components
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 hover:bg-gray-50 hover:text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "underline-offset-4 hover:underline text-blue-600",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "text-gray-900 border border-gray-300 bg-white hover:bg-gray-50",
  };

  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Enhanced team members data
const teamMembers = [
  {
    id: 1,
    name: "Adv. Priya Sharma",
    title: "Managing Partner",
    specialty: "POSH & Employment Law",
    experience: "15+ years",
    description: "Priya is a leading expert in workplace harassment prevention and employment law compliance. She has trained over 50,000+ professionals across India and has been instrumental in helping organizations create safer workplaces.",
    education: "LL.M., Faculty of Law, University of Delhi; Certified POSH Trainer",
    barAdmissions: ["Delhi High Court", "Supreme Court of India"],
    languages: ["English", "Hindi", "Punjabi"],
    achievements: ["Best Employment Lawyer 2023", "POSH Expert of the Year", "Women Leader in Law"],
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "priya.sharma@lawgical.io",
      phone: "+91 9876543210"
    },
    practiceAreas: ["POSH Compliance", "Employment Law", "Workplace Investigations", "HR Legal Advisory"]
  },
  {
    id: 2,
    name: "Adv. Rajesh Kumar",
    title: "Senior Partner",
    specialty: "Corporate Law & Compliance",
    experience: "20+ years",
    description: "Rajesh is a seasoned corporate lawyer specializing in mergers, acquisitions, and regulatory compliance. He has advised Fortune 500 companies on complex legal matters and corporate governance.",
    education: "LL.B., National Law School of India University (NLSIU), Bangalore; MBA Finance",
    barAdmissions: ["Karnataka High Court", "Delhi High Court", "Supreme Court of India"],
    languages: ["English", "Hindi", "Kannada"],
    achievements: ["Corporate Lawyer of the Year 2022", "Legal Excellence Award", "Top 40 Under 40 Lawyers"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "rajesh.kumar@lawgical.io",
      phone: "+91 9876543211"
    },
    practiceAreas: ["Mergers & Acquisitions", "Corporate Governance", "Securities Law", "Regulatory Compliance"]
  },
  {
    id: 3,
    name: "Adv. Anjali Menon",
    title: "Associate Partner",
    specialty: "Criminal Defense & Litigation",
    experience: "12+ years",
    description: "Anjali is a formidable litigator with expertise in criminal defense and civil litigation. She has successfully defended clients in high-profile cases and is known for her meticulous preparation and courtroom advocacy.",
    education: "LL.B., Gujarat National Law University (GNLU), Gandhinagar; Diploma in Criminal Law",
    barAdmissions: ["Kerala High Court", "Madras High Court", "Gujarat High Court"],
    languages: ["English", "Hindi", "Malayalam", "Tamil"],
    achievements: ["Best Criminal Lawyer 2023", "Outstanding Advocate Award", "Pro Bono Champion"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "anjali.menon@lawgical.io",
      phone: "+91 9876543212"
    },
    practiceAreas: ["Criminal Defense", "White Collar Crimes", "Civil Litigation", "Appeals"]
  },
  {
    id: 4,
    name: "Adv. Vikram Singh",
    title: "Legal Consultant",
    specialty: "Intellectual Property Law",
    experience: "10+ years",
    description: "Vikram is an IP law specialist with extensive experience in patent prosecution, trademark registration, and IP litigation. He helps tech companies and startups protect their intellectual assets.",
    education: "LL.M., Indian Law Institute (ILI), New Delhi; B.Tech Computer Science",
    barAdmissions: ["Delhi High Court", "Bombay High Court"],
    languages: ["English", "Hindi", "Marathi"],
    achievements: ["IP Lawyer of the Year 2022", "Tech Law Expert", "Innovation Legal Award"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "vikram.singh@lawgical.io",
      phone: "+91 9876543213"
    },
    practiceAreas: ["Patent Law", "Trademark Registration", "Copyright Protection", "IP Litigation"]
  },
  {
    id: 5,
    name: "Adv. Sneha Patel",
    title: "Senior Associate",
    specialty: "Family Law & Matrimonial",
    experience: "8+ years",
    description: "Sneha specializes in family law matters including divorce, child custody, and matrimonial disputes. She is known for her compassionate approach and expertise in alternative dispute resolution.",
    education: "LL.B., Faculty of Law, M.S. University of Baroda; Diploma in Family Counseling",
    barAdmissions: ["Gujarat High Court", "Rajasthan High Court"],
    languages: ["English", "Hindi", "Gujarati"],
    achievements: ["Family Lawyer Excellence Award", "Mediation Expert", "Women Rights Advocate"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "sneha.patel@lawgical.io",
      phone: "+91 9876543214"
    },
    practiceAreas: ["Divorce Proceedings", "Child Custody", "Domestic Violence", "Family Mediation"]
  },
  {
    id: 6,
    name: "Adv. Arjun Reddy",
    title: "Associate",
    specialty: "Real Estate & Property Law",
    experience: "6+ years",
    description: "Arjun handles complex real estate transactions and property disputes. He assists clients with due diligence, title verification, and regulatory approvals for real estate projects.",
    education: "LL.B., Symbiosis Law School, Pune; Diploma in Real Estate Law",
    barAdmissions: ["Telangana High Court", "Karnataka High Court"],
    languages: ["English", "Hindi", "Telugu", "Kannada"],
    achievements: ["Rising Star in Real Estate Law", "Property Law Expert", "Young Achiever Award"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    contactInfo: {
      email: "arjun.reddy@lawgical.io",
      phone: "+91 9876543215"
    },
    practiceAreas: ["Property Transactions", "Real Estate Disputes", "Title Verification", "RERA Compliance"]
  }
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const specialties = ["All", ...new Set(teamMembers.map(member => member.specialty))];
  
  const filteredMembers = activeFilter === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.specialty === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
              <Users className="h-3 w-3 mr-1" />
              Expert Legal Team
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Legal Experts
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Our distinguished team of attorneys brings decades of combined experience 
              and unwavering commitment to delivering exceptional legal services across diverse practice areas.
            </p>
            
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Years Combined Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Cases Won</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={activeFilter === specialty ? "default" : "outline"}
                onClick={() => setActiveFilter(specialty)}
                className={`${
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
      </section>

      {/* Team Grid */}
      <section id="team" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <Card
                key={member.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border border-gray-100 overflow-hidden"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="default" className="bg-white text-blue-600 border border-blue-200">
                      {member.experience}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-1">{member.title}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.specialty}</p>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {member.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Scale className="h-4 w-4" />
                      <span>{member.practiceAreas.length} Practice Areas</span>
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
        </div>
      </section>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Attorney Profile</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMember(null)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-5 gap-0 max-h-[calc(90vh-80px)] overflow-y-auto">
              {/* Left column - Profile */}
              <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 p-8">
                <div className="text-center mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMember.name}</h3>
                  <p className="text-blue-600 font-semibold mb-1">{selectedMember.title}</p>
                  <p className="text-gray-600 text-sm">{selectedMember.specialty}</p>
                  <Badge className="mt-2 bg-blue-600 text-white">{selectedMember.experience}</Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">{selectedMember.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">{selectedMember.contactInfo.phone}</span>
                  </div>
                  
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Consultation
                  </Button>
                </div>
              </div>
              
              {/* Right column - Details */}
              <div className="md:col-span-3 p-8 space-y-8">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Biography</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedMember.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Education</h4>
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5" />
                    <p className="text-gray-700">{selectedMember.education}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Bar Admissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.barAdmissions.map((bar, index) => (
                      <Badge key={index} variant="outline" className="border-blue-200 text-blue-800">
                        {bar}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.languages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Practice Areas</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedMember.practiceAreas.map((area, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Achievements</h4>
                  <div className="space-y-2">
                    {selectedMember.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Work With Our Expert Team?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Our experienced attorneys are ready to review your case and provide the expertise you need.
            Schedule a consultation today and let us help you navigate your legal challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
          <div className="mt-8 text-blue-100 text-sm">
            <span>✓ Free initial consultation</span>
            <span className="mx-4">✓ Expert legal advice</span>
            <span>✓ Personalized solutions</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
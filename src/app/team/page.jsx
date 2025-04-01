"use client";
import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { UserCircleIcon, X, ChevronRight, Calendar, Mail, Phone } from 'lucide-react';

// Sample data for team members
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Partner",
    specialty: "Corporate Law",
    description: "John is an experienced corporate lawyer with over 15 years of experience handling mergers, acquisitions, and corporate compliance.",
    education: "J.D., Harvard Law School",
    barAdmissions: ["New York", "California"],
    contactInfo: {
      email: "john.doe@lawfirm.com",
      phone: "(555) 123-4567"
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Associate Attorney",
    specialty: "Criminal Defense",
    description: "Jane specializes in criminal defense and has successfully defended clients in numerous high-profile cases.",
    education: "J.D., Yale Law School",
    barAdmissions: ["Pennsylvania", "New Jersey"],
    contactInfo: {
      email: "jane.smith@lawfirm.com",
      phone: "(555) 234-5678"
    }
  },
  {
    id: 3,
    name: "Michael Brown",
    title: "Legal Consultant",
    specialty: "Family Law",
    description: "Michael offers expert legal consultation on family law matters, including divorce and child custody.",
    education: "J.D., Stanford Law School",
    barAdmissions: ["Texas", "Florida"],
    contactInfo: {
      email: "michael.brown@lawfirm.com",
      phone: "(555) 345-6789"
    }
  },
  {
    id: 4,
    name: "Emily White",
    title: "Managing Partner",
    specialty: "Intellectual Property",
    description: "Emily provides legal counsel on intellectual property rights, patents, and trademarks.",
    education: "J.D., Columbia Law School",
    barAdmissions: ["Washington", "Oregon"],
    contactInfo: {
      email: "emily.white@lawfirm.com",
      phone: "(555) 456-7890"
    }
  },
];

const Team = () => {
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [activeFilter, setActiveFilter] = React.useState("All");

  const specialties = ["All", ...new Set(teamMembers.map(member => member.specialty))];
  
  const filteredMembers = activeFilter === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.specialty === activeFilter);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Our Legal Team</h1>
          <div className="w-24 h-1 bg-white mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl">
            Meet our team of distinguished attorneys bringing decades of experience and unwavering 
            commitment to every case we handle.
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                className={`px-6 py-2 mr-4 whitespace-nowrap ${
                  activeFilter === specialty
                    ? "border-b-2 border-white font-medium"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveFilter(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <div 
              key={member.id} 
              className="group relative bg-gray-900 overflow-hidden cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="h-72 bg-gray-800 flex items-center justify-center">
                <UserCircleIcon className="w-32 h-32 text-gray-700" />
              </div>
              <div className="p-6 border-t border-gray-800">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-400">{member.title}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{member.specialty}</span>
                  <span className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                    <ChevronRight size={18} />
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-end p-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                  <button className="px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member details modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-gray-800 max-w-4xl w-full overflow-hidden">
            <div className="flex justify-end p-4 border-b border-gray-800">
              <button 
                className="p-2 hover:bg-gray-900 rounded-full transition-colors"
                onClick={() => setSelectedMember(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
              {/* Left column */}
              <div className="md:col-span-2 bg-gray-900 p-8 flex flex-col items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-black border border-gray-800 flex items-center justify-center mb-6">
                  <UserCircleIcon className="w-32 h-32 text-gray-800" />
                </div>
                <h2 className="text-2xl font-bold text-center">{selectedMember.name}</h2>
                <p className="text-gray-400 text-center">{selectedMember.title}</p>
                <div className="w-16 h-px bg-gray-700 my-4"></div>
                <p className="text-sm text-gray-500 text-center">{selectedMember.specialty}</p>
                
                <div className="mt-8 w-full space-y-4">
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-500 mr-3" />
                    <span className="text-sm text-gray-400">{selectedMember.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-500 mr-3" />
                    <span className="text-sm text-gray-400">{selectedMember.contactInfo.phone}</span>
                  </div>
                  <button className="w-full mt-4 px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors text-sm font-medium flex items-center justify-center">
                    <Calendar size={16} className="mr-2" />
                    Schedule Meeting
                  </button>
                </div>
              </div>
              
              {/* Right column */}
              <div className="md:col-span-3 p-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Biography</h3>
                    <p className="text-gray-300">{selectedMember.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Education</h3>
                    <p className="text-gray-300">{selectedMember.education}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Bar Admissions</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.barAdmissions.map((bar, index) => (
                        <span key={index} className="px-3 py-1 border border-gray-800 text-sm text-gray-300">
                          {bar}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Areas of Practice</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['Contract Negotiations', 'Business Formation', 'Mergers & Acquisitions', 'Legal Compliance'].map((practice, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-300">{practice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Call to action section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Work With Our Team?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Our attorneys are ready to review your case and provide the expertise you need.
              Contact us today to schedule your consultation.
            </p>
            <button className="px-8 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
import Link from 'next/link';
import Image from 'next/image';

const Services = () => {
  // Services data array for easier management and mapping
  const legalServices = [
    {
      id: 'pocso',
      title: 'POCSO (Protection of Children from Sexual Offences)',
      description: 'Our specialized team provides comprehensive legal support under the POCSO Act, representing child survivors with sensitivity and expertise. We offer trauma-informed legal counsel, court representation in Special Courts, and assistance with rehabilitation and compensation processes.',
      image: '/images/services/pocso.jpg',
      link: '/pocso'
    },
    {
      id: 'posh',
      title: 'POSH (Prevention of Sexual Harassment)',
      description: 'We help organizations build safe workplaces through comprehensive POSH compliance services. Our offerings include policy development, mandatory committee formation, employee awareness training, complaint mechanism implementation, and independent investigations of workplace harassment cases.',
      image: '/images/services/posh.jpg',
      link: '/posh'
    },
    {
      id: 'corporate',
      title: 'Corporate Law',
      description: 'Our corporate legal team offers end-to-end services including business incorporation, mergers & acquisitions, corporate restructuring, regulatory compliance, due diligence, board advisory, and corporate governance frameworks. We partner with businesses from startups to established corporations.',
      image: '/images/services/corporate.jpg',
      link: '/corporate-law'
    },
    {
      id: 'litigation',
      title: 'Litigation & Dispute Resolution',
      description: 'From pre-litigation strategy to courtroom advocacy, our litigation experts handle civil, criminal, and commercial disputes with precision. We specialize in alternative dispute resolution methods including arbitration, mediation, and negotiated settlements to achieve optimal outcomes.',
      image: '/images/services/litigation.jpg',
      link: '/litigation'
    },
    {
      id: 'contract',
      title: 'Contract Law',
      description: 'Our contract specialists draft, review, and negotiate airtight agreements tailored to your specific business needs. We handle commercial contracts, employment agreements, NDAs, partnership agreements, licensing contracts, and provide contract breach remediation services.',
      image: '/images/services/contract.jpg',
      link: '/contract-law'
    },
    {
      id: 'ip',
      title: 'Intellectual Property',
      description: 'Protect your innovations and creative works with our comprehensive IP services. We handle trademark registration, patent applications, copyright protection, IP portfolio management, licensing agreements, and enforcement against infringement to safeguard your valuable intellectual assets.',
      image: '/images/services/intellectual-property.jpg',
      link: '/intellectual-property'
    },
    {
      id: 'employment',
      title: 'Employment Law',
      description: 'Our employment law experts provide guidance on hiring practices, employment contracts, workplace policies, termination procedures, and employee benefits. We help businesses maintain compliance with labor regulations while managing workforce-related legal challenges effectively.',
      image: '/images/services/employment.jpg',
      link: '/employment-law'
    },
    {
      id: 'cyber',
      title: 'Cyber Law & Data Protection',
      description: 'Navigate the complex digital legal landscape with our specialized cyber law services. We offer data protection compliance, privacy policy development, cybercrime representation, digital evidence handling, IT contract review, and response strategies for data breaches.',
      image: '/images/services/cyber-law.jpg',
      link: '/cyber-law'
    },
    {
      id: 'immigration',
      title: 'Immigration Law',
      description: 'Our immigration specialists assist with visa applications, work permits, residence permits, citizenship applications, deportation defense, and corporate immigration planning. We provide personalized guidance through complex immigration systems for individuals and businesses.',
      image: '/images/services/immigration.jpg',
      link: '/immigration-law'
    },
    {
      id: 'family',
      title: 'Family Law',
      description: 'We offer compassionate legal support for divorce proceedings, child custody arrangements, adoption processes, marital agreements, domestic violence protection, and property division. Our family law team prioritizes sensitive resolution of personal legal matters.',
      image: '/images/services/family-law.jpg',
      link: '/family-law'
    }
  ];

  return (
    <div className="bg-black text-white py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Comprehensive Legal Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert legal solutions tailored to your specific needs. Our team of specialized attorneys brings decades of combined experience across multiple practice areas.
          </p>
        </div>
        
        {/* Services Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button className="px-6 py-2 bg-blue-900 hover:bg-blue-800 rounded-full text-white transition-all">
            All Services
          </button>
          <button className="px-6 py-2 hover:bg-blue-900 rounded-full text-gray-300 hover:text-white transition-all">
            Individual
          </button>
          <button className="px-6 py-2 hover:bg-blue-900 rounded-full text-gray-300 hover:text-white transition-all">
            Corporate
          </button>
          <button className="px-6 py-2 hover:bg-blue-900 rounded-full text-gray-300 hover:text-white transition-all">
            Litigation
          </button>
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          {legalServices.map((service, index) => (
            <div key={service.id}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-semibold text-white mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <Link
                    href={service.link}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg text-white font-medium hover:from-blue-700 hover:to-purple-800 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </div>
                <div className="flex justify-center items-center rounded-xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-gray-800">
                  <div className="relative w-full h-80">
                    {/* Using placeholder images since actual images aren't available */}
                    <Image
                      src={`https://picsum.photos/800/600?random=${index + 1}`}
                      alt={service.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              {index < legalServices.length - 1 && (
                <hr className="my-16 border-gray-800" />
              )}
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-10 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Legal Team?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black bg-opacity-30 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Expertise</h3>
              <p className="text-gray-300">With decades of specialized experience, our attorneys have successfully handled thousands of cases across diverse practice areas.</p>
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsive Service</h3>
              <p className="text-gray-300">We prioritize clear communication and prompt responses, ensuring you're never left waiting during critical legal situations.</p>
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-300">Our fee structures are clear and predictable with no hidden costs, allowing you to plan your legal expenses with confidence.</p>
            </div>
            
            <div className="bg-black bg-opacity-30 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Results-Driven</h3>
              <p className="text-gray-300">Our strategic approach focuses on achieving optimal outcomes efficiently, minimizing costs while maximizing legal protection.</p>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our expert legal team to discuss your specific needs and how we can help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg text-white font-medium hover:from-blue-700 hover:to-purple-800 transition-all duration-300">
              Contact Us
            </Link>
            <Link href="/about" className="px-8 py-4 bg-transparent border border-blue-600 rounded-lg text-white font-medium hover:bg-blue-900/30 transition-all duration-300">
              Meet Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
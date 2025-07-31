import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredService, setHoveredService] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  // Track mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Services data with enhanced categorization
  const legalServices = [
    {
      id: 'pocso',
      title: 'POCSO Act Representation',
      shortTitle: 'Child Protection',
      description: 'Specialized legal support under the POCSO Act with trauma-informed counsel, Special Court representation, and comprehensive rehabilitation assistance for child survivors.',
      category: 'individual',
      icon: '🛡️',
      color: 'from-rose-500 to-pink-600',
      image: '/images/services/pocso.jpg',
      link: '/pocso',
      stats: '500+ Cases',
      highlight: 'Specialized Team'
    },
    {
      id: 'posh',
      title: 'POSH Compliance & Training',
      shortTitle: 'Workplace Safety',
      description: 'Complete workplace harassment prevention through policy development, committee formation, training programs, and independent investigation services.',
      category: 'corporate',
      icon: '🏢',
      color: 'from-emerald-500 to-teal-600',
      image: '/images/services/posh.jpg',
      link: '/posh',
      stats: '200+ Organizations',
      highlight: '24/7 Support'
    },
    {
      id: 'corporate',
      title: 'Corporate Legal Services',
      shortTitle: 'Business Law',
      description: 'End-to-end corporate solutions including incorporation, M&A, compliance, governance, and strategic legal advisory for businesses of all sizes.',
      category: 'corporate',
      icon: '💼',
      color: 'from-blue-500 to-indigo-600',
      image: '/images/services/corporate.jpg',
      link: '/corporate-law',
      stats: '1000+ Transactions',
      highlight: 'Fortune 500 Clients'
    },
    {
      id: 'litigation',
      title: 'Litigation & Dispute Resolution',
      shortTitle: 'Court Advocacy',
      description: 'Strategic litigation across civil, criminal, and commercial matters with expertise in ADR methods including arbitration and mediation.',
      category: 'litigation',
      icon: '⚖️',
      color: 'from-purple-500 to-violet-600',
      image: '/images/services/litigation.jpg',
      link: '/litigation',
      stats: '95% Success Rate',
      highlight: 'Senior Advocates'
    },
    {
      id: 'contract',
      title: 'Contract Law & Negotiation',
      shortTitle: 'Contract Drafting',
      description: 'Comprehensive contract services including drafting, review, negotiation, and breach remediation for commercial and employment agreements.',
      category: 'corporate',
      icon: '📄',
      color: 'from-amber-500 to-orange-600',
      image: '/images/services/contract.jpg',
      link: '/contract-law',
      stats: '5000+ Contracts',
      highlight: 'AI-Assisted Review'
    },
    {
      id: 'ip',
      title: 'Intellectual Property Protection',
      shortTitle: 'IP Rights',
      description: 'Complete IP portfolio management including patents, trademarks, copyrights, licensing, and enforcement against infringement.',
      category: 'corporate',
      icon: '💡',
      color: 'from-cyan-500 to-blue-600',
      image: '/images/services/intellectual-property.jpg',
      link: '/intellectual-property',
      stats: '2000+ Registrations',
      highlight: 'Global Filing'
    },
    {
      id: 'employment',
      title: 'Employment Law Advisory',
      shortTitle: 'HR Legal',
      description: 'Comprehensive employment guidance covering hiring, policies, terminations, benefits, and compliance with evolving labor regulations.',
      category: 'corporate',
      icon: '👥',
      color: 'from-green-500 to-emerald-600',
      image: '/images/services/employment.jpg',
      link: '/employment-law',
      stats: '800+ Employees',
      highlight: 'Policy Templates'
    },
    {
      id: 'cyber',
      title: 'Cyber Law & Data Protection',
      shortTitle: 'Digital Security',
      description: 'Navigate digital legal complexities with data protection compliance, cybercrime defense, and comprehensive breach response strategies.',
      category: 'corporate',
      icon: '🔒',
      color: 'from-red-500 to-rose-600',
      image: '/images/services/cyber-law.jpg',
      link: '/cyber-law',
      stats: '99.9% Compliance',
      highlight: 'GDPR Certified'
    },
    {
      id: 'immigration',
      title: 'Immigration Law Services',
      shortTitle: 'Visa & Permits',
      description: 'Expert immigration assistance for visas, work permits, citizenship applications, deportation defense, and corporate immigration planning.',
      category: 'individual',
      icon: '🌍',
      color: 'from-indigo-500 to-purple-600',
      image: '/images/services/immigration.jpg',
      link: '/immigration-law',
      stats: '3000+ Visas',
      highlight: 'Multi-Country'
    },
    {
      id: 'family',
      title: 'Family Law & Personal Matters',
      shortTitle: 'Family Support',
      description: 'Compassionate legal support for divorce, custody, adoption, domestic violence protection, and sensitive family legal matters.',
      category: 'individual',
      icon: '❤️',
      color: 'from-pink-500 to-rose-600',
      image: '/images/services/family-law.jpg',
      link: '/family-law',
      stats: '1500+ Families',
      highlight: 'Mediation First'
    }
  ];

  const filterCategories = [
    { id: 'all', label: 'All Services', icon: '🏛️' },
    { id: 'individual', label: 'Individual', icon: '👤' },
    { id: 'corporate', label: 'Corporate', icon: '🏢' },
    { id: 'litigation', label: 'Litigation', icon: '⚖️' }
  ];

  const whyChooseFeatures = [
    {
      icon: '🏆',
      title: 'Proven Excellence',
      description: 'Award-winning legal team with 25+ years of combined experience and industry recognition.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '⚡',
      title: 'Rapid Response',
      description: '24/7 availability with guaranteed response within 2 hours for urgent legal matters.',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: '💎',
      title: 'Transparent Value',
      description: 'Clear pricing structure with no hidden fees and performance-based billing options.',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: '🎯',
      title: 'Strategic Results',
      description: 'Data-driven approach with 95% success rate and optimal outcome achievement.',
      color: 'from-green-400 to-emerald-500'
    }
  ];

  const filteredServices = activeFilter === 'all' 
    ? legalServices 
    : legalServices.filter(service => service.category === activeFilter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const serviceCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x * 0.02}%`,
            top: `${mousePosition.y * 0.02}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-64 h-64 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-full blur-2xl right-0 bottom-0"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 py-20 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Hero Section */}
          <motion.div 
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-4">
                ⚖️ Legal Excellence Since 1999
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight"
              variants={itemVariants}
            >
              Comprehensive
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Legal Services
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Expert legal solutions powered by innovation and decades of proven expertise. 
              <br className="hidden md:block" />
              Your trusted partner in navigating complex legal challenges.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-12"
              variants={itemVariants}
            >
              {[
                { label: '25+ Years', sublabel: 'Experience' },
                { label: '10,000+', sublabel: 'Cases Won' },
                { label: '500+', sublabel: 'Corporate Clients' },
                { label: '95%', sublabel: 'Success Rate' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.label}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.sublabel}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Filter Navigation */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filterCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg shadow-blue-500/25'
                    : 'border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Services Grid */}
          <motion.div 
            className="mb-20"
            layout
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeFilter}
                className="space-y-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    variants={serviceCardVariants}
                    layout
                    className="group"
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      index % 2 !== 0 ? 'lg:grid-cols-2' : ''
                    }`}>
                      {/* Content */}
                      <div className={`space-y-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div 
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl shadow-lg`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            {service.icon}
                          </motion.div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-3 py-1 bg-gradient-to-r ${service.color} bg-opacity-20 rounded-full text-xs font-medium`}>
                                {service.highlight}
                              </span>
                              <span className="text-gray-400 text-sm">{service.stats}</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                              {service.title}
                            </h2>
                          </div>
                        </div>
                        
                        <p className="text-lg text-gray-300 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                              href={service.link}
                              className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${service.color} rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
                            >
                              Learn More
                              <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </motion.div>
                          
                          <motion.button 
                            className="px-6 py-3 border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300 hover:bg-gray-800/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Quick Consultation
                          </motion.button>
                        </div>
                      </div>
                      
                      {/* Enhanced Image */}
                      <div className={`relative ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                        <motion.div 
                          className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-700 group-hover:border-gray-500 transition-all duration-500"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent z-10" />
                          <motion.div 
                            className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}
                          />
                          <div className="relative w-full h-80 lg:h-96">
                            <Image
                              src={`https://picsum.photos/800/600?random=${index + 1}`}
                              alt={service.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                          
                          {/* Overlay info */}
                          <motion.div 
                            className="absolute bottom-4 left-4 right-4 z-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: hoveredService === service.id ? 1 : 0,
                              y: hoveredService === service.id ? 0 : 20
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
                              <h3 className="font-semibold text-white mb-1">{service.shortTitle}</h3>
                              <p className="text-sm text-gray-300">{service.stats} • {service.highlight}</p>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {index < filteredServices.length - 1 && (
                      <motion.div 
                        className="mt-16 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Enhanced Why Choose Us Section */}
          <motion.div
            className="bg-gradient-to-br from-gray-900/80 to-blue-900/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-20 border border-gray-700 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
            
            <motion.div className="relative z-10">
              <motion.div className="text-center mb-12" variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Why Choose Our Legal Team?
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Experience the difference of working with industry-leading legal professionals who combine traditional expertise with modern innovation.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyChooseFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all duration-300 group cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Call to Action */}
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-gray-700 relative overflow-hidden"
              variants={itemVariants}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl" />
              
              <div className="relative z-10">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  variants={itemVariants}
                >
                  Ready to Get Started?
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                  variants={itemVariants}
                >
                  Schedule a confidential consultation with our expert legal team. We&#39;ll analyze your situation and provide strategic guidance tailored to your specific needs.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row justify-center gap-6"
                  variants={itemVariants}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    >
                      <span>Start Your Consultation</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="/about" 
                      className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-gray-400 rounded-xl text-white font-bold text-lg hover:bg-gray-800/30 transition-all duration-300"
                    >
                      <span>Meet Our Experts</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="mt-8 flex justify-center gap-8 text-sm text-gray-400"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Free Initial Consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>24/7 Emergency Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>Confidential & Secure</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
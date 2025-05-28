"use client";
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotFoundClient() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse movement for interactive effects
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
  
  // Enhanced countdown with redirect state
  useEffect(() => {
    if (countdown === 0) {
      setIsRedirecting(true);
      setTimeout(() => router.push('/'), 500);
      return;
    }
    
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown, router]);

  // Advanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glitchVariants = {
    animate: {
      x: [0, -2, 2, 0],
      textShadow: [
        "0 0 0 transparent",
        "2px 0 0 #ff0000, -2px 0 0 #00ff00",
        "-2px 0 0 #ff0000, 2px 0 0 #00ff00",
        "0 0 0 transparent"
      ],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x * 0.02}%`,
            top: `${mousePosition.y * 0.02}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-64 h-64 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-2xl right-0 bottom-0"
          style={{
            right: `${mousePosition.x * 0.01}%`,
            bottom: `${mousePosition.y * 0.01}%`,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <Header />

      <motion.div 
        className="flex-grow flex items-center justify-center p-4 md:p-8 lg:p-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div className="relative">
                <motion.h1 
                  className="text-8xl md:text-9xl font-black bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent leading-none"
                  variants={glitchVariants}
                  animate="animate"
                >
                  404
                </motion.h1>
                <div className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500/20 blur-sm">
                  404
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
                variants={itemVariants}
              >
                Legal Logic Error
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-300 leading-relaxed max-w-lg"
                variants={itemVariants}
              >
                Our advanced legal algorithms have encountered an unexpected case. Even our most experienced digital attorneys couldn't locate this page in our vast legal database.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={itemVariants}
              >
                <Link href="/" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Return Home
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <Link href="/search" className="group border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-gray-600/20 backdrop-blur-sm">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search Database
                  </span>
                </Link>
              </motion.div>
              
              <AnimatePresence>
                {!isRedirecting ? (
                  <motion.div
                    className="flex items-center gap-3 text-gray-400 mt-8"
                    variants={itemVariants}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Auto-redirecting in</span>
                    <motion.span 
                      className="font-bold text-2xl text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                      key={countdown}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      {countdown}
                    </motion.span>
                    <span>seconds</span>
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex items-center gap-3 text-blue-400 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-semibold">Redirecting to dashboard...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Right illustration */}
            <motion.div 
              className="relative flex justify-center"
              variants={floatingVariants}
              animate="animate"
            >
              <div className="relative w-full max-w-md">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Image
                  src="/images/lawgical-error.svg"
                  alt="Legal Error Illustration"
                  width={500}
                  height={400}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
          
          {/* Quick links section */}
          <motion.div 
            className="mt-20 space-y-8"
            variants={itemVariants}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Popular Lawgical Resources</h3>
              <p className="text-gray-400">Get back on track with these frequently accessed tools</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { title: "Legal Templates", url: "/templates", icon: "📄" },
                { title: "Document Analysis", url: "/analysis", icon: "🔍" },
                { title: "Case Manager", url: "/cases", icon: "📁" },
                { title: "Attorney Connect", url: "/connect", icon: "🤝" },
                { title: "Contract Builder", url: "/contracts", icon: "📝" },
                { title: "Help Center", url: "/help", icon: "💡" }
              ].map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={link.url}
                    className="block bg-gray-800/50 hover:bg-gray-700/70 backdrop-blur-sm border border-gray-700 hover:border-gray-600 p-6 rounded-xl transition-all duration-300 text-center group"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {link.title}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Support section */}
          <motion.div
            className="mt-16 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl"
            variants={itemVariants}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Need Technical Support?</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our dedicated support team is standing by 24/7 to help resolve any technical issues or answer questions about the Lawgical platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a 
                href="tel:+18005551234"
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                24/7 Support Hotline
              </motion.a>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/support/chat"
                  className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Live Chat Support
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
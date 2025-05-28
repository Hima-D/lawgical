"use client";
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NotFoundClient() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  
  // Automatically redirect after countdown
  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    if (countdown === 0) {
      router.push('/');
    }
    
    return () => clearInterval(timer);
  }, [countdown, router]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header Component */}
      <Header />

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
          >
            <div className="order-2 md:order-1 text-left">
              <motion.h1 
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4"
                variants={fadeIn}
                custom={1}
              >
                404
              </motion.h1>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-semibold text-gray-300 mb-6"
                variants={fadeIn}
                custom={2}
              >
                Case Logic Error
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-400 mb-8"
                variants={fadeIn}
                custom={3}
              >
                It seems our legal algorithms couldn't find the page you're looking for. No objection needed — our Lawgical team is already investigating this matter.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeIn}
                custom={4}
              >
                <Link href="/" className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                  Return to Dashboard
                </Link>
                
                <Link href="/search" className="border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white font-medium py-3 px-6 rounded-md transition duration-300 ease-in-out">
                  Search Lawgical Database
                </Link>
              </motion.div>
              
              <motion.p
                className="mt-6 text-gray-500"
                variants={fadeIn}
                custom={5}
              >
                Auto-redirecting in <span className="font-bold text-white">{countdown}</span> seconds
              </motion.p>
            </div>
            
            <motion.div 
              className="order-1 md:order-2 relative"
              variants={fadeIn}
              custom={1}
            >
              <div className="relative w-full h-64 md:h-96">
                <Image
                  src="/images/lawgical-error.svg"
                  alt="Lawgical Error Illustration"
                  width={500}
                  height={400}
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-16 border-t border-gray-700 pt-8"
            variants={fadeIn}
            custom={6}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Popular Lawgical Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
              {[
                { title: "Legal Templates", url: "/templates" },
                { title: "Document Analysis", url: "/analysis" },
                { title: "Case Manager", url: "/cases" },
                { title: "Attorney Connect", url: "/connect" },
                { title: "Contract Builder", url: "/contracts" },
                { title: "Help Center", url: "/help" }
              ].map((link, index) => (
                <Link 
                  href={link.url} 
                  key={index}
                  className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition duration-300"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="mt-12 bg-gray-800 p-6 rounded-lg"
            variants={fadeIn}
            custom={7}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Need Assistance with Lawgical?</h3>
            <p className="text-gray-400 mb-4">
              Our support team is available to help you navigate any technical issues or questions about the platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+18005551234" className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Support Hotline
              </a>
              <Link href="/support/chat" className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Live Chat Support
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

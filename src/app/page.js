"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Testimonial from "@/components/testimonial";
import Services from "@/components/service";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // State and refs
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialRef = useRef(null);
  const scrollButtonRef = useRef(null);
  const heroActionRef = useRef(null);
  const heroLawgicalRef = useRef(null);
  const quickLinksRef = useRef(null);
  const ctaRef = useRef(null);

  // Service card refs - improved initialization
  const cardRefs = useRef([]);
  
  // Testimonial data
  const testimonials = [
    {
      testimonial:
        "This platform has been an indispensable resource for my legal practice. It not only connects me with fellow attorneys, but it also allows me to access key legal resources and share insights.",
      authorName: "Jason Perez",
      authorPosition: "Corporate Lawyer",
      authorImage: "https://picsum.photos/100/100?random=1",
    },
    {
      testimonial:
        "I wholeheartedly recommend this platform for any legal professional. It provides an excellent space for networking, learning, and accessing expert legal advice.",
      authorName: "Jane Smith",
      authorPosition: "Family Law Attorney",
      authorImage: "https://picsum.photos/100/100?random=2",
    },
    {
      testimonial:
        "This platform is an essential tool for collaboration. The legal resources offered have significantly streamlined my practice and increased efficiency.",
      authorName: "Robert Brown",
      authorPosition: "Criminal Defense Attorney",
      authorImage: "https://picsum.photos/100/100?random=3",
    },
    {
      testimonial:
        "The platform has truly transformed how I interact with clients and fellow professionals. The resources are top-notch, and the community is incredibly supportive.",
      authorName: "Arvind Kumar",
      authorPosition: "Corporate Lawyer",
      authorImage: "https://picsum.photos/100/100?random=4",
    },
    {
      testimonial:
        "As a family lawyer, this platform has provided me with a network of like-minded professionals and valuable insights. Highly recommend it for any legal practitioner.",
      authorName: "Priya Desai",
      authorPosition: "Family Lawyer",
      authorImage: "https://picsum.photos/100/100?random=5",
    },
    {
      testimonial:
        "I've found this platform to be a game changer for criminal law cases. The tools provided here have helped me prepare better and stay ahead in my field.",
      authorName: "Rajesh Gupta",
      authorPosition: "Criminal Defense Attorney",
      authorImage: "https://picsum.photos/100/100?random=6",
    },
    {
      testimonial:
        "This platform has helped me connect with professionals across the country. The resources provided are indispensable for anyone in the legal field.",
      authorName: "Anjali Mehta",
      authorPosition: "Civil Lawyer",
      authorImage: "https://picsum.photos/100/100?random=7",
    },
    {
      testimonial:
        "I've been able to grow my network significantly thanks to this platform. It has made collaboration easier and more efficient, especially with the legal tools provided.",
      authorName: "Suresh Iyer",
      authorPosition: "Tax Consultant",
      authorImage: "https://picsum.photos/100/100?random=8",
    },
    {
      testimonial:
        "The resources and networking options available on this platform have been incredibly helpful. As an intellectual property lawyer, this platform has significantly improved my practice.",
      authorName: "Meera Reddy",
      authorPosition: "Intellectual Property Lawyer",
      authorImage: "https://picsum.photos/100/100?random=9",
    },
    {
      testimonial:
        "I am so glad I joined this platform. It's easy to use, and the resources provided are always up-to-date and relevant to my practice in environmental law.",
      authorName: "Vikram Sharma",
      authorPosition: "Environmental Lawyer",
      authorImage: "https://picsum.photos/100/100?random=10",
    },
  ];

  // Quick Links data - extracted for better maintainability
  const quickLinks = [
    {
      title: "Manage Ongoing Legal Cases",
      description:
        "Track, manage, and efficiently handle all your active legal cases, all from one intuitive platform.",
      link: "/cases",
      linkText: "View My Cases",
      icon: "📁", // Added icons for better visual hierarchy
    },
    {
      title: "Explore Legal Insights and Articles",
      description:
        "Stay informed with the latest legal insights, trends, and expertly curated resources.",
      link: "/resources",
      linkText: "Read Articles",
      icon: "📚",
    },
    {
      title: "Join Our Legal Discussions",
      description:
        "Engage with professionals, exchange advice, and keep up with the latest developments in the legal world.",
      link: "/community",
      linkText: "Start Discussing",
      icon: "💬",
    },
  ];

  // Testimonial navigation
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-advance testimonials - new feature
  useEffect(() => {
    const autoAdvanceInterval = setInterval(() => {
      nextTestimonial();
    }, 8000); // Change testimonial every 8 seconds
    
    return () => clearInterval(autoAdvanceInterval);
  }, []);

  // Enhanced word animation function - improved with smoother transitions
  const setupEnhancedWordAnimation = () => {
    const actionWords = ["Connect", "Collaborate", "Grow", "Succeed"];
    const constantPhrase = "with Lawgical";
    let index = 0;
    
    const animatePhrase = () => {
      const tl = gsap.timeline();
      
      // More refined animation with better easing
      tl.to(heroActionRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out"
      });
      
      tl.to(heroLawgicalRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.4");
      
      tl.call(() => {
        heroActionRef.current.textContent = actionWords[index];
        index = (index + 1) % actionWords.length;
      });
      
      tl.to(heroActionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.inOut"
      });
      
      tl.to(heroLawgicalRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, "-=0.3");
    };
    
    animatePhrase();
    const wordInterval = setInterval(animatePhrase, 3500);
    return wordInterval;
  };

  // Main animation setup - optimized for performance
  useEffect(() => {
    // Ensure visibility
    if (quickLinksRef.current) {
      quickLinksRef.current.style.opacity = "1";
    }
    
    // Create a main timeline for better sequencing
    const mainTl = gsap.timeline();
    
    // Hero section animation - improved sequence
    mainTl.from(heroRef.current, { 
      opacity: 0, 
      y: -30, 
      duration: 1,
      ease: "power3.out",
    });
    
    mainTl.from(".hero-logo", { 
      opacity: 0, 
      x: -30, 
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.6");
    
    mainTl.from(".hero-description", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.4");

    // Quick links animation with staggered effect
    mainTl.from(quickLinksRef.current, { 
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        if (quickLinksRef.current) {
          quickLinksRef.current.style.opacity = "1";
        }
      }
    }, "-=0.2");

    // Service cards with enhanced staggered animations
    gsap.from(".service-card", {
      opacity: 0,
      y: 40,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: ".service-card",
        start: "top bottom-=100",
        toggleActions: "play none none none"
      },
      onComplete: (i) => {
        document.querySelectorAll('.service-card').forEach(card => {
          card.style.opacity = "1";
        });
      }
    });

    // Services and testimonials sections - scroll-based animations
    gsap.from(servicesRef.current, { 
      opacity: 0, 
      y: 40, 
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      }
    });

    gsap.from(testimonialRef.current, { 
      opacity: 0, 
      y: 40, 
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: testimonialRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      }
    });
    
    // CTA section animation
    gsap.from(ctaRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none"
      }
    });

    // Scroll button animation - improved with better trigger
    gsap.from(scrollButtonRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      scrollTrigger: {
        trigger: "main",
        start: "10% center",
        toggleActions: "play none none reverse",
      },
    });

    // Start the enhanced word animation
    const wordInterval = setupEnhancedWordAnimation();

    // Cleanup animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(wordInterval);
    };
  }, []);

  // Handle smooth testimonial transitions
  useEffect(() => {
    gsap.from(".testimonial-content", {
      opacity: 0,
      x: -20,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white">
      <Header />

      <main className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 gap-8 flex-grow">
        {/* Hero Section with improved layout and animations */}
        <section
          className="hero-section w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 mb-16 py-8"
          ref={heroRef}
        >
          <div className="flex flex-col text-center md:text-left max-w-2xl">
            <Image
              className="hero-logo mx-auto md:mx-0 mb-6"
              src="/next.svg"
              alt="Lawgical Logo"
              width={180}
              height={38}
              priority
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 flex flex-wrap justify-center md:justify-start gap-2">
              <span ref={heroActionRef} className="text-blue-500 bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Connect</span>
              <span ref={heroLawgicalRef} className="text-white">with Lawgical</span>
            </h1>
            <p className="hero-description text-base md:text-lg font-medium text-gray-300 max-w-lg">
              Join a dynamic community of legal professionals, collaborate on
              cases, and access the resources you need to elevate your practice.
            </p>
            
            {/* Added CTA button in hero section for better conversion */}
            <div className="mt-8">
              <Link href="/signup" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Join Our Community
              </Link>
            </div>
          </div>
          
          {/* Added hero illustration for visual appeal */}
          <div className="hidden md:block relative w-full max-w-sm">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/20 to-purple-600/20 rounded-xl blur-lg"></div>
            <div className="relative z-10 p-6">
              <Image
                src="/api/placeholder/400/300"
                alt="Legal professionals collaborating"
                width={400}
                height={300}
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Quick Access Links - Improved card design */}
        <section 
          className="quick-links w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 my-16"
          ref={quickLinksRef}
        >
          {quickLinks.map(({ title, description, link, linkText, icon }, index) => (
            <div
              key={index}
              className="service-card bg-gray-800/80 backdrop-blur-sm p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-102 hover:translate-y-[-5px]"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">{title}</h3>
              <p className="text-gray-300 mb-6 text-sm lg:text-base">{description}</p>
              <Link
                href={link}
                className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors group"
              >
                {linkText}
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
            </div>
          ))}
        </section>

        {/* Services Section */}
        <section className="service-section w-full max-w-6xl" ref={servicesRef}>
          <Services />
        </section>

        {/* Testimonial Section - Improved carousel UI */}
        <section
          className="testimonial-section w-full max-w-6xl my-16 py-8"
          ref={testimonialRef}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            What Legal Professionals <span className="text-blue-400">Say About Us</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
            Trusted by thousands of legal professionals across the country
          </p>
          
          {/* Testimonial carousel with dots indicator */}
          <div className="relative overflow-hidden bg-gray-800/50 rounded-xl p-6 shadow-xl border border-gray-700">
            <div
              className="flex transition-transform duration-500 ease-in-out testimonial-content"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Testimonial
                    testimonial={testimonial.testimonial}
                    authorName={testimonial.authorName}
                    authorPosition={testimonial.authorPosition}
                    authorImage={testimonial.authorImage}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows - Improved styling */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full transition-all duration-300 hover:bg-blue-600 opacity-80 hover:opacity-100 shadow-lg"
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full transition-all duration-300 hover:bg-blue-600 opacity-80 hover:opacity-100 shadow-lg"
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            
            {/* Added pagination dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "bg-blue-500 w-6" : "bg-gray-500 opacity-50 hover:opacity-75"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section - Enhanced with better visual design */}
        <section 
          ref={ctaRef}
          className="w-full max-w-4xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-8 lg:p-12 mb-12 text-center border border-blue-500/30 shadow-xl"
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Transform Your Legal Practice?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Join thousands of legal professionals who've enhanced their practice with our platform.
          </p>
          <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
            <Link href="/contact">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg transform hover:scale-105 font-medium">
                Get Legal Support
              </button>
            </Link>
            <Link href="/learn-more">
              <button className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105 mt-4 sm:mt-0">
                Learn More
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Scroll to Top Button - Improved styling */}
      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out opacity-90 hover:opacity-100 z-50"
        ref={scrollButtonRef}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to Top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </div>
  );
}
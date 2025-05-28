"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

// Constants
const ANIMATION_TIMINGS = {
  wordChange: 3500,
  testimonialAuto: 8000,
  transitionDuration: 0.6,
};

const ACTION_WORDS = ["Connect", "Collaborate", "Grow", "Succeed"];

const TESTIMONIALS = [
  {
    id: 1,
    testimonial: "This platform has been an indispensable resource for my legal practice. It not only connects me with fellow attorneys, but it also allows me to access key legal resources and share insights.",
    authorName: "Jason Perez",
    authorPosition: "Corporate Lawyer",
    authorImage: "https://picsum.photos/100/100?random=1",
  },
  {
    id: 2,
    testimonial: "I wholeheartedly recommend this platform for any legal professional. It provides an excellent space for networking, learning, and accessing expert legal advice.",
    authorName: "Jane Smith",
    authorPosition: "Family Law Attorney",
    authorImage: "https://picsum.photos/100/100?random=2",
  },
  {
    id: 3,
    testimonial: "This platform is an essential tool for collaboration. The legal resources offered have significantly streamlined my practice and increased efficiency.",
    authorName: "Robert Brown",
    authorPosition: "Criminal Defense Attorney",
    authorImage: "https://picsum.photos/100/100?random=3",
  },
  {
    id: 4,
    testimonial: "The platform has truly transformed how I interact with clients and fellow professionals. The resources are top-notch, and the community is incredibly supportive.",
    authorName: "Arvind Kumar",
    authorPosition: "Corporate Lawyer",
    authorImage: "https://picsum.photos/100/100?random=4",
  },
  {
    id: 5,
    testimonial: "As a family lawyer, this platform has provided me with a network of like-minded professionals and valuable insights. Highly recommend it for any legal practitioner.",
    authorName: "Priya Desai",
    authorPosition: "Family Lawyer",
    authorImage: "https://picsum.photos/100/100?random=5",
  },
  {
    id: 6,
    testimonial: "I've found this platform to be a game changer for criminal law cases. The tools provided here have helped me prepare better and stay ahead in my field.",
    authorName: "Rajesh Gupta",
    authorPosition: "Criminal Defense Attorney",
    authorImage: "https://picsum.photos/100/100?random=6",
  },
  {
    id: 7,
    testimonial: "This platform has helped me connect with professionals across the country. The resources provided are indispensable for anyone in the legal field.",
    authorName: "Anjali Mehta",
    authorPosition: "Civil Lawyer",
    authorImage: "https://picsum.photos/100/100?random=7",
  },
  {
    id: 8,
    testimonial: "I've been able to grow my network significantly thanks to this platform. It has made collaboration easier and more efficient, especially with the legal tools provided.",
    authorName: "Suresh Iyer",
    authorPosition: "Tax Consultant",
    authorImage: "https://picsum.photos/100/100?random=8",
  },
  {
    id: 9,
    testimonial: "The resources and networking options available on this platform have been incredibly helpful. As an intellectual property lawyer, this platform has significantly improved my practice.",
    authorName: "Meera Reddy",
    authorPosition: "Intellectual Property Lawyer",
    authorImage: "https://picsum.photos/100/100?random=9",
  },
  {
    id: 10,
    testimonial: "I am so glad I joined this platform. It's easy to use, and the resources provided are always up-to-date and relevant to my practice in environmental law.",
    authorName: "Vikram Sharma",
    authorPosition: "Environmental Lawyer",
    authorImage: "https://picsum.photos/100/100?random=10",
  },
];

const QUICK_LINKS = [
  {
    id: 1,
    title: "Manage Ongoing Legal Cases",
    description: "Track, manage, and efficiently handle all your active legal cases, all from one intuitive platform.",
    link: "/cases",
    linkText: "View My Cases",
    icon: "📁",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: 2,
    title: "Explore Legal Insights and Articles",
    description: "Stay informed with the latest legal insights, trends, and expertly curated resources.",
    link: "/resources",
    linkText: "Read Articles",
    icon: "📚",
    color: "from-green-500 to-green-700",
  },
  {
    id: 3,
    title: "Join Our Legal Discussions",
    description: "Engage with professionals, exchange advice, and keep up with the latest developments in the legal world.",
    link: "/community",
    linkText: "Start Discussing",
    icon: "💬",
    color: "from-purple-500 to-purple-700",
  },
];

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

// Custom hook for reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

export default function Home() {
  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Refs
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialRef = useRef(null);
  const scrollButtonRef = useRef(null);
  const heroActionRef = useRef(null);
  const heroLawgicalRef = useRef(null);
  const quickLinksRef = useRef(null);
  const ctaRef = useRef(null);
  const timelineRef = useRef(null);

  // Custom hooks
  const prefersReducedMotion = useReducedMotion();
  const [heroIntersectionRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });

  // Memoized values
  const currentTestimonial = useMemo(() => TESTIMONIALS[currentIndex], [currentIndex]);
  
  // Testimonial navigation functions
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const goToTestimonial = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-playing after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;

    const autoAdvanceInterval = setInterval(() => {
      nextTestimonial();
    }, ANIMATION_TIMINGS.testimonialAuto);
    
    return () => clearInterval(autoAdvanceInterval);
  }, [nextTestimonial, isAutoPlaying, prefersReducedMotion]);

  // Enhanced word animation with better performance
  const setupEnhancedWordAnimation = useCallback(() => {
    if (prefersReducedMotion) return null;

    let index = 0;
    
    const animatePhrase = () => {
      if (!heroActionRef.current || !heroLawgicalRef.current) return;

      const tl = gsap.timeline();
      
      tl.to(heroActionRef.current, {
        opacity: 0,
        y: -20,
        duration: ANIMATION_TIMINGS.transitionDuration,
        ease: "power3.out"
      });
      
      tl.to(heroLawgicalRef.current, {
        opacity: 0,
        y: -20,
        duration: ANIMATION_TIMINGS.transitionDuration,
        ease: "power3.out",
      }, "-=0.4");
      
      tl.call(() => {
        if (heroActionRef.current) {
          heroActionRef.current.textContent = ACTION_WORDS[index];
          index = (index + 1) % ACTION_WORDS.length;
        }
      });
      
      tl.to(heroActionRef.current, {
        opacity: 1,
        y: 0,
        duration: ANIMATION_TIMINGS.transitionDuration,
        ease: "power2.inOut"
      });
      
      tl.to(heroLawgicalRef.current, {
        opacity: 1,
        y: 0,
        duration: ANIMATION_TIMINGS.transitionDuration,
        ease: "power2.inOut"
      }, "-=0.3");
    };
    
    animatePhrase();
    return setInterval(animatePhrase, ANIMATION_TIMINGS.wordChange);
  }, [prefersReducedMotion]);

  // Main animation setup with performance optimizations
  useEffect(() => {
    if (prefersReducedMotion) {
      // Set immediate visibility for reduced motion users
      setIsVisible(true);
      return;
    }

    // Create main timeline
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        onComplete: () => setIsVisible(true)
      });
      
      // Hero section animations
      if (heroRef.current) {
        mainTl.from(heroRef.current, { 
          opacity: 0, 
          y: -30, 
          duration: 1,
          ease: "power3.out",
        });
      }
      
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

      // Quick links animation
      if (quickLinksRef.current) {
        mainTl.from(quickLinksRef.current, { 
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.2");
      }

      // Service cards with ScrollTrigger
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
        }
      });

      // Scroll-triggered animations
      [servicesRef, testimonialRef, ctaRef].forEach(ref => {
        if (ref.current) {
          gsap.from(ref.current, { 
            opacity: 0, 
            y: 40, 
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom-=50",
              toggleActions: "play none none none"
            }
          });
        }
      });

      // Scroll button animation
      if (scrollButtonRef.current) {
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
      }

      timelineRef.current = mainTl;
    });

    // Start word animation
    const wordInterval = setupEnhancedWordAnimation();

    return () => {
      ctx.revert();
      if (wordInterval) clearInterval(wordInterval);
    };
  }, [setupEnhancedWordAnimation, prefersReducedMotion]);

  // Testimonial transition animation
  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.from(".testimonial-content", {
      opacity: 0,
      x: -20,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [currentIndex, prefersReducedMotion]);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Keyboard navigation for testimonials
  const handleKeyNavigation = useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      prevTestimonial();
      setIsAutoPlaying(false);
    } else if (event.key === 'ArrowRight') {
      nextTestimonial();
      setIsAutoPlaying(false);
    }
  }, [nextTestimonial, prevTestimonial]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Header />

      <main className="flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 gap-8 flex-grow">
        {/* Hero Section */}
        <section
          className="hero-section w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 mb-16 py-8"
          ref={(el) => {
            heroRef.current = el;
            heroIntersectionRef.current = el;
          }}
          aria-label="Hero section"
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
              <span 
                ref={heroActionRef} 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                aria-live="polite"
              >
                Connect
              </span>
              <span ref={heroLawgicalRef} className="text-white">
                with Lawgical
              </span>
            </h1>
            <p className="hero-description text-base md:text-lg font-medium text-gray-300 max-w-lg leading-relaxed">
              Join a dynamic community of legal professionals, collaborate on
              cases, and access the resources you need to elevate your practice.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signup" 
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg font-medium text-center"
              >
                Join Our Community
              </Link>
              <Link 
                href="/demo" 
                className="inline-block px-8 py-3 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105 font-medium text-center"
              >
                Watch Demo
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block relative w-full max-w-sm">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-600/20 to-indigo-600/20 rounded-xl blur-lg animate-pulse"></div>
            <div className="relative z-10 p-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-8 shadow-2xl border border-gray-600">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded w-1/2"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded w-2/3"></div>
                  <div className="flex gap-2 mt-6">
                    <div className="h-10 w-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                    <div className="h-10 w-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                    <div className="h-10 w-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Links */}
        <section 
          className="quick-links w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 my-16"
          ref={quickLinksRef}
          aria-label="Quick access links"
        >
          {QUICK_LINKS.map(({ id, title, description, link, linkText, icon, color }) => (
            <article
              key={id}
              className="service-card group bg-gray-800/80 backdrop-blur-sm p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-102 hover:translate-y-[-5px]"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" role="img" aria-label={title}>
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">{title}</h3>
              <p className="text-gray-300 mb-6 text-sm lg:text-base leading-relaxed">{description}</p>
              <Link
                href={link}
                className={`inline-flex items-center bg-gradient-to-r ${color} text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
              >
                {linkText}
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
            </article>
          ))}
        </section>

        {/* Services Section */}
        <section 
          className="service-section w-full max-w-6xl" 
          ref={servicesRef}
          aria-label="Our services"
        >
          <Services />
        </section>

        {/* Testimonial Section */}
        <section
          className="testimonial-section w-full max-w-6xl my-16 py-8"
          ref={testimonialRef}
          aria-label="Client testimonials"
          onKeyDown={handleKeyNavigation}
          tabIndex={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            What Legal Professionals <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Say About Us</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
            Trusted by thousands of legal professionals across the country
          </p>
          
          <div className="relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700">
            <div
              className="flex transition-transform duration-500 ease-in-out testimonial-content"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              role="region"
              aria-live="polite"
              aria-label="Testimonial carousel"
            >
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Testimonial {...testimonial} />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500/80 hover:bg-blue-500 text-white p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500/80 hover:bg-blue-500 text-white p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? "bg-blue-500 w-6 shadow-lg" 
                      : "bg-gray-500 opacity-50 hover:opacity-75 hover:bg-gray-400"
                  }`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  role="tab"
                  aria-selected={currentIndex === index}
                />
              ))}
            </div>

            {/* Auto-play toggle */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
            >
              {isAutoPlaying ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h3m4 0h3m-6 4h3m1-9V8a2 2 0 012-2h2a2 2 0 012 2v1"></path>
                </svg>
              )}
            </button>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section 
          ref={ctaRef}
          className="w-full max-w-4xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-sm rounded-xl p-8 lg:p-12 mb-12 text-center border border-blue-500/30 shadow-xl relative overflow-hidden"
          aria-label="Call to action"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Transform Your Legal Practice?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Join thousands of legal professionals who've enhanced their practice with our comprehensive platform.
            </p>
            <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
              <Link href="/contact">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg transform hover:scale-105 font-medium">
                  Get Legal Support
                </button>
              </Link>
              <Link href="/learn-more">
                <button className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105 mt-4 sm:mt-0">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-500/80 backdrop-blur-sm text-white p-3 rounded-full shadow-xl hover:bg-blue-500 hover:shadow-2xl transition-all duration-300 ease-in-out z-50 group"
        ref={scrollButtonRef}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </div>
  );
}
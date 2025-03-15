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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialRef = useRef(null);
  const scrollButtonRef = useRef(null);
  const heroActionRef = useRef(null);  // For the action word (Connect, Collaborate, Grow)
  const heroLawgicalRef = useRef(null); // For "with Lawgical" text
  const quickLinksRef = useRef(null);

  // Card refs for individual animations
  const cardRefs = useRef([]);
  // Initialize with empty refs
  cardRefs.current = [0, 1, 2].map(() => cardRefs.current || React.createRef());

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
        "I’ve found this platform to be a game changer for criminal law cases. The tools provided here have helped me prepare better and stay ahead in my field.",
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
        "I’ve been able to grow my network significantly thanks to this platform. It has made collaboration easier and more efficient, especially with the legal tools provided.",
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
        "I am so glad I joined this platform. It’s easy to use, and the resources provided are always up-to-date and relevant to my practice in environmental law.",
      authorName: "Vikram Sharma",
      authorPosition: "Environmental Lawyer",
      authorImage: "https://picsum.photos/100/100?random=10",
    },
  ];
  

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Enhanced word animation function
  const setupEnhancedWordAnimation = () => {
    const actionWords = ["Connect", "Collaborate", "Grow"];
    const constantPhrase = "with Lawgical";
    let index = 0;
    
    const animatePhrase = () => {
      // First, fade out both parts
      const tl = gsap.timeline();
      
      tl.to(heroActionRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out"
      });
      
      tl.to(heroLawgicalRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.3"); // Slight overlap for smoother transition
      
      // Then update text and fade in with slight delay between parts
      tl.call(() => {
        heroActionRef.current.textContent = actionWords[index];
        index = (index + 1) % actionWords.length;
      });
      
      // Animate first part coming in
      tl.to(heroActionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
      
      // Animate second part coming in slightly later
      tl.to(heroLawgicalRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, "-=0.2"); // Slight overlap
    };
    
    // Initial animation
    animatePhrase();
    const wordInterval = setInterval(animatePhrase, 3000); // 3 seconds gives enough time for the transition
    return wordInterval;
  };

  // Main animation setup
  useEffect(() => {
    // CRITICAL: Ensure visibility of all elements
    if (quickLinksRef.current) {
      quickLinksRef.current.style.opacity = "1";
    }
    
    // Hero section animation
    gsap.from(heroRef.current, { 
      opacity: 0, 
      y: -30, 
      duration: 1.2,
      ease: "power3.out",
    });
    
    gsap.from(".hero-section img", { 
      opacity: 0, 
      x: -50, 
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out",
    });

    // QuickLinks container animation
    gsap.from(quickLinksRef.current, { 
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.4,
      ease: "power2.out",
      onComplete: () => {
        // Ensure visibility after animation
        if (quickLinksRef.current) {
          quickLinksRef.current.style.opacity = "1";
        }
      }
    });

    // Modern staggered card animations
    document.querySelectorAll('.service-card').forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.7,
        delay: 0.6 + (index * 0.15), // Staggered timing
        ease: "back.out(1.2)", // More modern elastic effect
        onComplete: () => {
          // Ensure visibility after animation
          card.style.opacity = "1";
        }
      });
    });

    // Services section animation
    gsap.from(servicesRef.current, { 
      opacity: 0, 
      y: 30, 
      duration: 1,
      delay: 1.2,
      ease: "power2.out" 
    });

    // Testimonial section animation
    gsap.from(testimonialRef.current, { 
      opacity: 0, 
      y: 20, 
      duration: 1,
      delay: 1.5,
      ease: "power2.out" 
    });

    // Scroll button animation
    gsap.from(scrollButtonRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: "main",
        start: "20% center",
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

  // Handle testimonial transitions
  useEffect(() => {
    gsap.from(".testimonial-section", {
      opacity: 0.7,
      x: -30,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex flex-col items-center justify-center p-8 sm:p-16 gap-8 font-[family-name:var(--font-geist-sans)]">
        {/* Hero Section with split phrase animation */}
        <section
          className="hero-section text-center sm:text-left mb-16"
          ref={heroRef}
        >
          <Image
            className="dark"
            src="/next.svg"
            alt="Lawyer Portal Logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4 flex flex-wrap gap-2">
            <span ref={heroActionRef} className="text-blue-500">Connect</span>
            <span ref={heroLawgicalRef} className="text-white">with Lawgical</span>
          </h1>
          <p className="text-base sm:text-lg font-medium text-gray-400">
            Join a dynamic community of legal professionals, collaborate on
            cases, and access the resources you need to elevate your practice.
          </p>
        </section>

        {/* Quick Access Links - Initially visible */}
        <section 
          className="quick-links w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-16 px-4 sm:px-0"
          ref={quickLinksRef}
          style={{ opacity: 1 }}
        >
          {[
            {
              title: "Manage Ongoing Legal Cases",
              description:
                "Track, manage, and efficiently handle all your active legal cases, all from one intuitive platform.",
              link: "/cases",
              linkText: "View My Cases",
            },
            {
              title: "Explore Legal Insights and Articles",
              description:
                "Stay informed with the latest legal insights, trends, and expertly curated resources.",
              link: "/resources",
              linkText: "Read Articles",
            },
            {
              title: "Join Our Legal Discussions",
              description:
                "Engage with professionals, exchange advice, and keep up with the latest developments in the legal world.",
              link: "/community",
              linkText: "Start Discussing",
            },
          ].map(({ title, description, link, linkText }, index) => (
            <div
              key={index}
              className="service-card text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              style={{ opacity: 1 }}
              ref={el => cardRefs.current[index] = el}
            >
              <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
              <Link
                href={link}
                className="inline-block text-primary text-lg font-semibold hover:underline"
              >
                {linkText}
              </Link>
            </div>
          ))}
        </section>

        {/* Services Section */}
        <section className="service-section w-full" ref={servicesRef}>
          <Services />
        </section>

        {/* Testimonial Section */}
        <section
          className="testimonial-section my-16 w-full"
          ref={testimonialRef}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-primary mb-8">
            What Legal Professionals Say About Us
          </h2>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
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

            {/* Navigation Arrows */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full transition-all duration-300 hover:bg-gray-700"
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
            >
              &lt;
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full transition-all duration-300 hover:bg-gray-700"
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
            >
              &gt;
            </button>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="flex gap-4 items-center flex-col sm:flex-row mb-12">
          <Link href="/contact">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:bg-blue-600 transition-all duration-300">
              Get Legal Support
            </button>
          </Link>
        </section>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <button
        className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-[#383838] dark:hover:bg-[#ccc] transition duration-300 ease-in-out"
        ref={scrollButtonRef}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to Top"
      >
        ↑
      </button>
    </div>
  );
}
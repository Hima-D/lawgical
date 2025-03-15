"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Testimonial from "@/components/testimonial";
import Services from "@/components/service"; // Import the Services component

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Updated list of 9 Testimonials (including Indian professionals)
  const testimonials = [
    {
      testimonial:
        "This platform has been an incredible tool for my practice. It connects me with fellow lawyers, and I can share valuable legal resources.",
      authorName: "Jason perez",
      authorPosition: "Corporate Lawyer",
      authorImage: "https://picsum.photos/100/100?random=1", // Dummy image
    },
    {
      testimonial:
        "I highly recommend this platform! It's a great place to exchange ideas, get expert advice, and improve your legal knowledge.",
      authorName: "Jane Smith",
      authorPosition: "Family Law Attorney",
      authorImage: "https://picsum.photos/100/100?random=2", // Dummy image
    },
    {
      testimonial:
        "A fantastic platform for collaboration. The legal resources available have helped me manage my practice more efficiently.",
      authorName: "Robert Brown",
      authorPosition: "Criminal Defense Attorney",
      authorImage: "https://picsum.photos/100/100?random=3", // Dummy image
    },
    {
      testimonial:
        "An excellent resource for learning and staying updated with the latest legal trends. This platform has become a daily part of my practice.",
      authorName: "Ravi Patel",
      authorPosition: "Intellectual Property Lawyer",
      authorImage: "https://picsum.photos/100/100?random=4", // Dummy image
    },
    {
      testimonial:
        "A great platform for legal networking and finding resources. It’s saved me countless hours in legal research.",
      authorName: "Anjali Kapoor",
      authorPosition: "Criminal Lawyer",
      authorImage: "https://picsum.photos/100/100?random=5", // Dummy image
    },
    {
      testimonial:
        "The Lawyer Portal has helped me stay organized and connected with my colleagues. A must-have tool for legal professionals.",
      authorName: "Sandeep Gupta",
      authorPosition: "Civil Litigator",
      authorImage: "https://picsum.photos/100/100?random=6", // Dummy image
    },
    {
      testimonial:
        "I love the community discussions! It's the best place to exchange knowledge, get advice, and stay updated in the legal world.",
      authorName: "Priya Mehta",
      authorPosition: "Family Law Advocate",
      authorImage: "https://picsum.photos/100/100?random=7", // Dummy image
    },
    {
      testimonial:
        "The platform is a game-changer for me. It helps me find quick solutions to complex cases through collaboration and shared resources.",
      authorName: "Amit Sharma",
      authorPosition: "Corporate Litigation Attorney",
      authorImage: "https://picsum.photos/100/100?random=8", // Dummy image
    },
    {
      testimonial:
        "As a young lawyer, I find this platform invaluable for learning and connecting with senior lawyers in my field.",
      authorName: "Neha Verma",
      authorPosition: "Corporate Lawyer",
      authorImage: "https://picsum.photos/100/100?random=9", // Dummy image
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto Slide Functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center p-8 sm:p-16 gap-8 font-[family-name:var(--font-geist-sans)]">
        
        {/* Hero Section */}
        <section className="text-center sm:text-left mb-16">
          <Image
            className="dark"
            src="/next.svg"
            alt="Lawyer Portal Logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4 transition-all duration-500 ease-in-out">
            Welcome to the Lawyer Portal
          </h1>
          <p className="text-base sm:text-lg font-medium text-gray-400 transition-all duration-500 ease-in-out">
            Connect with fellow lawyers, discuss cases, and access resources for a seamless legal practice.
          </p>
        </section>

        {/* Quick Access Links */}
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-16 px-4 sm:px-0">
          {[
            {
              title: "Ongoing Cases",
              description: "Quickly access your active cases and manage them more efficiently.",
              link: "/cases",
              linkText: "View Cases",
            },
            {
              title: "Legal Articles",
              description: "Stay updated with the latest legal trends and best practices through our articles.",
              link: "/resources",
              linkText: "Explore Articles",
            },
            {
              title: "Join Discussions",
              description: "Participate in discussions with peers and share insights on legal matters.",
              link: "/community",
              linkText: "Join Now",
            },
          ].map(({ title, description, link, linkText }, index) => (
            <div
              key={index}
              className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{description}</p>
              <Link
                href={link}
                className="text-primary hover:underline mt-4 inline-block"
              >
                {linkText}
              </Link>
            </div>
          ))}
        </section>

        {/* Services Section */}
        <Services /> {/* Insert the Services component here */}

        {/* Testimonial Section */}
        <section className="my-16 w-full">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-primary mb-8">
            What Our Users Say
          </h2>

          {/* Testimonial Slider */}
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

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <button
        className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-[#383838] dark:hover:bg-[#ccc] transition duration-300 ease-in-out"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to Top"
      >
        ↑
      </button>
    </div>
  );
}

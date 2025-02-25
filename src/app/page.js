"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Testimonial from "@/components/testimonial";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      testimonial:
        "This platform has been an incredible tool for my practice. It connects me with fellow lawyers, and I can share valuable legal resources.",
      authorName: "John Doe",
      authorPosition: "Corporate Lawyer",
      authorImage: "/john-doe.jpg",
    },
    {
      testimonial:
        "I highly recommend this platform! It's a great place to exchange ideas, get expert advice, and improve your legal knowledge.",
      authorName: "Jane Smith",
      authorPosition: "Family Law Attorney",
      authorImage: "/jane-smith.jpg",
    },
    {
      testimonial:
        "A fantastic platform for collaboration. The legal resources available have helped me manage my practice more efficiently.",
      authorName: "Robert Brown",
      authorPosition: "Criminal Defense Attorney",
      authorImage: "/robert-brown.jpg",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center p-8 sm:p-16 gap-8 font-[family-name:var(--font-geist-sans)]">
        <Image
          className="dark"
          src="/law.jpg" // Update with your logo image
          alt="Lawyer Portal Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center sm:text-left text-primary transition-all duration-500 ease-in-out">
          Welcome to the Lawyer Portal
        </h1>
        <p className="text-base sm:text-lg text-center sm:text-left font-medium text-gray-400 transition-all duration-500 ease-in-out">
          Connect with fellow lawyers, discuss cases, and access resources for a seamless legal practice.
        </p>

        {/* Quick Access Links Section */}
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-16 px-4 sm:px-0">
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-primary mb-4">Ongoing Cases</h3>
            <p className="text-gray-600 dark:text-gray-400">Quickly access your active cases and manage them more efficiently.</p>
            <Link
              href="/cases"
              className="text-primary hover:underline mt-4 inline-block"
            >
              View Cases
            </Link>
          </div>
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-primary mb-4">Legal Articles</h3>
            <p className="text-gray-600 dark:text-gray-400">Stay updated with the latest legal trends and best practices through our articles.</p>
            <Link
              href="/resources"
              className="text-primary hover:underline mt-4 inline-block"
            >
              Explore Articles
            </Link>
          </div>
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-primary mb-4">Join Discussions</h3>
            <p className="text-gray-600 dark:text-gray-400">Participate in discussions with peers and share insights on legal matters.</p>
            <Link
              href="/community"
              className="text-primary hover:underline mt-4 inline-block"
            >
              Join Now
            </Link>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="my-16 w-full">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-primary mb-8">
            What Our Users Say
          </h2>

          {/* Testimonial Slider */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <Testimonial
                  key={index}
                  testimonial={testimonial.testimonial}
                  authorName={testimonial.authorName}
                  authorPosition={testimonial.authorPosition}
                  authorImage={testimonial.authorImage}
                />
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

        {/* Case Studies Section */}
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-16 px-4 sm:px-0">
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-primary mb-4">Case Study 1</h3>
            <p className="text-gray-600 dark:text-gray-400">Learn how we helped a corporate client win a landmark case in the tech industry.</p>
            <Link
              href="/case-studies/1"
              className="text-primary hover:underline mt-4 inline-block"
            >
              Read Full Case Study
            </Link>
          </div>
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-primary mb-4">Case Study 2</h3>
            <p className="text-gray-600 dark:text-gray-400">Discover how we defended a criminal case and achieved a favorable outcome.</p>
            <Link
              href="/case-studies/2"
              className="text-primary hover:underline mt-4 inline-block"
            >
              Read Full Case Study
            </Link>
          </div>
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-primary mb-4">Case Study 3</h3>
            <p className="text-gray-600 dark:text-gray-400">Explore our successful defense in a complex family law case.</p>
            <Link
              href="/case-studies/3"
              className="text-primary hover:underline mt-4 inline-block"
            >
              Read Full Case Study
            </Link>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <div className="flex gap-4 items-center flex-col sm:flex-row mb-12">
          <Link
            href="/cases"
            className="rounded-full bg-primary text-white px-6 py-3 text-sm sm:text-base font-semibold shadow-lg hover:bg-[#383838] dark:hover:bg-[#ccc] transition duration-300 ease-in-out"
          >
            Access Cases
          </Link>
          <Link
            href="/community"
            className="rounded-full border border-black/[.08] dark:border-white/[.145] px-6 py-3 text-sm sm:text-base font-semibold shadow-lg hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition duration-300 ease-in-out"
          >
            Join Discussions
          </Link>
        </div>
      </div>

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

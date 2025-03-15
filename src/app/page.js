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

  const testimonials = [
    {
      testimonial:
        "This platform has been an indispensable resource for my legal practice. It not only connects me with fellow attorneys, but it also allows me to access key legal resources and share insights.",
      authorName: "Jason Perez",
      authorPosition: "Corporate Lawyer",
      authorImage: "https://picsum.photos/100/100?random=1", // Dummy image
    },
    {
      testimonial:
        "I wholeheartedly recommend this platform for any legal professional. It provides an excellent space for networking, learning, and accessing expert legal advice.",
      authorName: "Jane Smith",
      authorPosition: "Family Law Attorney",
      authorImage: "https://picsum.photos/100/100?random=2", // Dummy image
    },
    {
      testimonial:
        "This platform is an essential tool for collaboration. The legal resources offered have significantly streamlined my practice and increased efficiency.",
      authorName: "Robert Brown",
      authorPosition: "Criminal Defense Attorney",
      authorImage: "https://picsum.photos/100/100?random=3", // Dummy image
    },
    {
      testimonial:
        "An invaluable resource for staying ahead of legal trends and practices. I use this platform daily to enhance my knowledge and connect with colleagues in the legal industry.",
      authorName: "Ravi Patel",
      authorPosition: "Intellectual Property Lawyer",
      authorImage: "https://picsum.photos/100/100?random=4", // Dummy image
    },
    {
      testimonial:
        "This platform has saved me countless hours of research. It’s an excellent tool for legal networking and accessing high-quality legal content.",
      authorName: "Anjali Kapoor",
      authorPosition: "Criminal Lawyer",
      authorImage: "https://picsum.photos/100/100?random=5", // Dummy image
    },
    {
      testimonial:
        "The Lawyer Portal has significantly improved my organization and communication with colleagues. I can’t imagine my legal practice without it.",
      authorName: "Sandeep Gupta",
      authorPosition: "Civil Litigator",
      authorImage: "https://picsum.photos/100/100?random=6", // Dummy image
    },
    {
      testimonial:
        "I particularly love the interactive community discussions. It’s a perfect space to exchange knowledge, get advice, and keep up with the latest developments in law.",
      authorName: "Priya Mehta",
      authorPosition: "Family Law Advocate",
      authorImage: "https://picsum.photos/100/100?random=7", // Dummy image
    },
    {
      testimonial:
        "This platform is an absolute game-changer. It helps me solve complex cases faster by leveraging collaboration and shared resources.",
      authorName: "Amit Sharma",
      authorPosition: "Corporate Litigation Attorney",
      authorImage: "https://picsum.photos/100/100?random=8", // Dummy image
    },
    {
      testimonial:
        "As a new lawyer, I find this platform indispensable for connecting with experienced mentors and gaining knowledge about the legal landscape.",
      authorName: "Neha Verma",
      authorPosition: "Corporate Lawyer",
      authorImage: "https://picsum.photos/100/100?random=9", // Dummy image
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex flex-col items-center justify-center p-8 sm:p-16 gap-8 font-[family-name:var(--font-geist-sans)]">
        {/* Hero Section */}
        <section className="text-center sm:text-left mb-16 animate__animated animate__fadeIn animate__delay-1s">
          <Image
            className="dark"
            src="/next.svg"
            alt="Lawyer Portal Logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4 transition-all duration-500 ease-in-out">
            Connect, Collaborate, and Grow with Lawgical
          </h1>
          <p className="text-base sm:text-lg font-medium text-gray-400 transition-all duration-500 ease-in-out">
            Join a dynamic community of legal professionals, collaborate on
            cases, and access the resources you need to elevate your practice.
          </p>
        </section>

        {/* Quick Access Links */}
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-16 px-4 sm:px-0 animate__animated animate__fadeIn animate__delay-2s">
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
              className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 animate__animated animate__fadeIn animate__delay-3s"
            >
              <h3 className="text-xl font-semibold text-primary mb-4">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {description}
              </p>
              <Link
                href={link}
                className="inline-block text-primary text-lg font-semibold hover:underline transition-all duration-200"
              >
                {linkText}
              </Link>
            </div>
          ))}
        </section>

        {/* Services Section */}
        <Services className="animate__animated animate__fadeIn animate__delay-4s" />

        {/* Testimonial Section */}
        <section className="my-16 w-full animate__animated animate__fadeIn animate__delay-5s">
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
        <section className="flex gap-4 items-center flex-col sm:flex-row mb-12 animate__animated animate__fadeIn animate__delay-6s">
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
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to Top"
      >
        ↑
      </button>
    </div>
  );
}

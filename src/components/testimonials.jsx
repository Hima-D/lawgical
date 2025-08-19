"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// Simplified shadcn/ui Card Component (consistent with LawgicalHomepage)
const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-lg border bg-white text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Startup Founder",
    content: "Lawgical made our business registration seamless.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "E-commerce Entrepreneur",
    content: "Tax filing services saved us time and ensured compliance.",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    role: "HR Manager",
    content: "POSH training helped us create a safer workplace.",
    rating: 5,
  },
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation functions
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Trusted by clients for their legal and compliance needs</p>
        </div>
        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="min-w-full flex justify-center">
                  <Card className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all max-w-lg w-full">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-6">&quot;{testimonial.content}&quot;</p>
                    <div className="border-t pt-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

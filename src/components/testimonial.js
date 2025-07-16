import Image from 'next/image';
import { useState, useEffect } from 'react';

const Testimonial = ({
  testimonial,
  authorName,
  authorPosition,
  authorImage,
  bgColor = 'from-blue-900/30 to-purple-900/30',
  textColor = 'text-white'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Detect when testimonial comes into view for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const currentElement = document.querySelector('.testimonial-wrapper');
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);
  
  return (
    <div
      className={`testimonial-wrapper relative ${
        isInView ? 'animate-fadeIn' : 'opacity-0'
      } transition-all duration-500`}
    >
      <div
        className={`bg-gradient-to-br ${bgColor} backdrop-blur-sm ${textColor} p-8 md:p-10 rounded-2xl shadow-lg transition-all duration-300 ease-out border border-white/10 relative overflow-hidden ${
          isHovered ? 'shadow-2xl border-blue-400/20 scale-102' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative accent elements */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-500/10 rounded-full blur-xl" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-xl" />
        <div className={`absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full transition-transform duration-500 ${isHovered ? 'scale-125' : ''}`} />
        
        {/* Quote marks */}
        <svg 
          className="w-12 h-12 text-blue-400/20 absolute top-6 left-6" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        
        {/* Testimonial content */}
        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          {/* Author image with animation */}
          <div 
            className={`relative flex-shrink-0 transition-all duration-300 ${
              isHovered ? 'transform scale-105' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-md opacity-70 transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-50'}`} />
            <div className="h-24 w-24 md:h-28 md:w-28 rounded-full border-2 border-white/30 overflow-hidden relative shadow-lg">
              <Image 
                className="rounded-full object-cover"
                src={authorImage} 
                alt={authorName}
                fill
                sizes="(max-width: 768px) 6rem, 7rem"
                priority
              />
            </div>
          </div>
          
          {/* Content column */}
          <div className="flex flex-col flex-grow">
            {/* Testimonial text */}
            <blockquote className="text-lg md:text-xl relative mb-6 text-gray-100 leading-relaxed italic">
              &quot;{testimonial}&quot;
            </blockquote>
            
            {/* Author details with animated accent line */}
            <div className="mt-auto relative">
              <div className={`h-0.5 w-12 bg-blue-400 mb-3 transition-all duration-300 ${isHovered ? 'w-20 bg-blue-300' : ''}`}></div>
              <h4 className="font-bold text-xl text-white">{authorName}</h4>
              <p className="text-blue-300 text-sm md:text-base">{authorPosition}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add a subtle animation trigger for the testimonial when hovered */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Testimonial;
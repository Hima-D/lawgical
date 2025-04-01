import Image from 'next/image';
import { useState } from 'react';

const Testimonial = ({ 
  testimonial, 
  authorName, 
  authorPosition, 
  authorImage,
  bgColor = 'from-[#1f1f1f] to-[#333333]',
  textColor = 'text-white'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`bg-gradient-to-r ${bgColor} ${textColor} p-8 rounded-xl shadow-lg transition-all duration-300 ease-in-out flex flex-col items-center relative overflow-hidden ${isHovered ? 'scale-105 shadow-2xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/5 rounded-full" />
      
      <blockquote className="text-lg sm:text-xl italic text-gray-200 mb-8 text-center leading-relaxed relative z-10">
        <svg className="w-12 h-12 opacity-20 absolute -top-6 -left-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <span className="relative z-10">{testimonial}</span>
      </blockquote>
      
      <div className="author mt-4 flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 w-full">
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur opacity-70 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-70'}`} />
          <Image
            className="rounded-full border-2 border-white/50 shadow-2xl relative"
            src={authorImage}
            alt={authorName}
            width={90}
            height={90}
            priority
          />
        </div>
        <div className="mt-4 sm:mt-0 text-center sm:text-left">
          <p className="name font-semibold text-2xl sm:text-3xl">{authorName}</p>
          <p className="position text-base sm:text-lg text-gray-300">{authorPosition}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
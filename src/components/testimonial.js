import Image from 'next/image';

const Testimonial = ({ testimonial, authorName, authorPosition, authorImage }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-8 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col items-center">
      <blockquote className="text-lg sm:text-xl italic text-gray-200 mb-8 text-center leading-relaxed">
        <span className="block mb-4">"</span>
        {testimonial}
        <span className="block mt-4">"</span>
      </blockquote>
      <div className="author mt-4 flex items-center justify-center gap-6">
        <Image
          className="rounded-full border-4 border-white shadow-2xl"
          src={authorImage}
          alt={authorName}
          width={90}
          height={90}
          priority
        />
        <div className="ml-4 text-center sm:text-left">
          <p className="name font-semibold text-2xl sm:text-3xl">{authorName}</p>
          <p className="position text-base sm:text-lg text-gray-300">{authorPosition}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

import Image from 'next/image';

const Testimonial = ({ testimonial, authorName, authorPosition, authorImage }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-indigo-500 text-white p-8 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col items-center">
      <p className="text-lg italic text-gray-200 mb-6 text-center">
        "{testimonial}"
      </p>
      <div className="author mt-4 flex items-center justify-center gap-4">
        <Image
          className="rounded-full border-4 border-white shadow-lg"
          src={authorImage}
          alt={authorName}
          width={80}
          height={80}
          priority
        />
        <div className="ml-4 text-center sm:text-left">
          <p className="name font-semibold text-xl sm:text-2xl">{authorName}</p>
          <p className="position text-sm text-gray-300">{authorPosition}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

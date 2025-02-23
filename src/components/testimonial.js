import Image from 'next/image';

const Testimonial = ({ testimonial, authorName, authorPosition, authorImage }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-indigo-500 text-white p-8 rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <p className="text-lg italic text-gray-200 mb-6">
        "{testimonial}"
      </p>
      <div className="author mt-4 flex items-center">
        <Image
          className="rounded-full border-4 border-white shadow-lg"
          src={authorImage}
          alt={authorName}
          width={80}
          height={80}
          priority
        />
        <div className="ml-4">
          <p className="name font-semibold text-xl sm:text-2xl">{authorName}</p>
          <p className="position text-sm text-gray-300">{authorPosition}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

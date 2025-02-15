import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-6 sm:px-12">
      {/* Header Component */}
      <Header />

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center text-center pt-24 pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-7xl font-bold text-white mb-4">404</h1>
          <h2 className="text-4xl font-semibold text-gray-300 mb-6">
            Court's Adjourned – Page Not Found
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Your case has been dismissed. The page you were searching for is missing in action.
            But don’t worry, we’re here to guide you back to safety – no lawyer required!
          </p>

          {/* 404 image */}
          <div className="mb-8">
            <Image
              src="/404-lawyer.svg" // Custom 404 image (you can change this)
              alt="404 Lawyer Image"
              width={500}
              height={400}
              className="mx-auto"
            />
          </div>

          {/* Button to Homepage */}
          <div>
            <a
              href="/"
              className="bg-white text-black text-lg py-4 px-10 rounded-full hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Return to Court (a.k.a. Homepage)
            </a>
          </div>

          {/* Legal Counsel Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Need Legal Counsel?</h3>
            <p className="text-lg text-gray-300">
              If you think this was a mistake, feel free to reach out to our legal team. 
              Just kidding, we’re all good here. Simply return to the homepage and everything will be fine.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default NotFound;

import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 sm:px-12">
      {/* Header Component */}
      <Header />

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto pt-12 pb-24">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Contact Us</h1>

        <div className="text-center mb-16">
          <p className="text-lg text-gray-300 mb-6">
            We would love to hear from you! Whether you have questions, feedback, or inquiries, feel free to reach out to us through the form below.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <form action="#" method="POST">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-xl font-semibold text-black mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Input */}
              <div className="sm:col-span-1">
                <label htmlFor="email" className="text-xl font-semibold text-black mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="mt-6">
              <label htmlFor="message" className="text-xl font-semibold text-black mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white text-lg py-3 px-8 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Contact;

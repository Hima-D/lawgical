import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 sm:px-12">
      {/* Header Component */}
      <Header />

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto pt-16 pb-32">
        <h1 className="text-5xl font-bold text-center mb-6 text-white leading-tight">
          Get In Touch With Us
        </h1>

        <div className="text-center mb-12">
          <p className="text-lg text-gray-300 mb-6">
            Have any questions, feedback, or inquiries? We're just a message away!
            Fill out the form below, and our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-black p-8 rounded-2xl shadow-2xl border border-white">
          <form action="#" method="POST">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-xl font-semibold text-white mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-4 text-lg bg-black border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                />
              </div>

              {/* Email Input */}
              <div className="sm:col-span-1">
                <label htmlFor="email" className="text-xl font-semibold text-white mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-4 text-lg bg-black border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="mt-6">
              <label htmlFor="message" className="text-xl font-semibold text-white mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                className="w-full p-4 text-lg bg-black border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-white text-black text-lg py-3 px-10 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white transform transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Optional Info Section (Optional) */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">Need Immediate Assistance?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Feel free to reach out to us directly at <span className="text-white">contact@lawyerportal.com</span>
          </p>
          <p className="text-lg text-gray-300 mb-6">
            Or call us at <span className="text-white">(123) 456-7890</span>
          </p>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Contact;

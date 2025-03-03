// app/litigation/page.js
import React from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function LitigationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Component */}
      <Header />

      <main className="px-6 sm:px-12 py-24 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-white mb-4">
            Litigation Services: Protecting Your Legal Rights
          </h1>
          <p className="text-xl text-gray-300">
            Whether you're facing a legal dispute or need expert representation in court, our litigation services are here to ensure you have the best possible outcome.
          </p>
        </div>

        {/* What is Litigation? */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">What is Litigation?</h2>
          <div className="lg:flex lg:space-x-12">
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-300 mb-6">
                Litigation refers to the process of resolving legal disputes through the court system. Whether it's a civil, criminal, or business-related case, litigation involves the filing of a lawsuit, gathering evidence, and presenting a case in front of a judge or jury.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Our litigation services cover a wide range of legal matters, from contract disputes to personal injury claims. With our skilled legal team, you can be confident that your case will be handled with the utmost professionalism and expertise.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://picsum.photos/800/400?random=1"
                alt="Litigation Process"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Our Litigation Process */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">Our Litigation Process</h2>
          <p className="text-lg text-gray-300 mb-6">
            We understand that navigating the litigation process can be overwhelming. That's why we provide a clear and structured process to guide you through every step of the way:
          </p>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Initial Consultation</h3>
              <p className="text-lg text-gray-300">
                We begin by understanding the nature of your dispute, assessing the situation, and discussing potential legal options.
              </p>
            </div>
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Case Assessment</h3>
              <p className="text-lg text-gray-300">
                After understanding your case, we conduct a thorough legal analysis to assess the merits and identify possible outcomes.
              </p>
            </div>
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Filing the Lawsuit</h3>
              <p className="text-lg text-gray-300">
                Once we've prepared the case, we file the necessary paperwork to begin formal litigation proceedings and notify all involved parties.
              </p>
            </div>
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Court Representation</h3>
              <p className="text-lg text-gray-300">
                Our attorneys will represent you in court, presenting evidence and arguments to support your case effectively.
              </p>
            </div>
          </div>
          <img
            src="https://picsum.photos/800/400?random=2"
            alt="Court Litigation"
            className="w-full h-auto rounded-lg shadow-lg mt-8"
          />
        </section>

        {/* Why Choose Us for Litigation? */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">Why Choose Us for Litigation?</h2>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Expert Legal Team</h3>
              <p className="text-lg text-gray-300">
                Our litigation attorneys are highly experienced, with expertise in various areas of law, including business disputes, civil claims, and personal injury cases.
              </p>
            </div>
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Personalized Approach</h3>
              <p className="text-lg text-gray-300">
                We understand that each case is unique. Our team provides tailored strategies to address your specific needs, ensuring the best outcome for you.
              </p>
            </div>
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Commitment to Success</h3>
              <p className="text-lg text-gray-300">
                We are dedicated to achieving favorable results for our clients, and we work relentlessly to protect your rights and interests.
              </p>
            </div>
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Transparent Communication</h3>
              <p className="text-lg text-gray-300">
                We believe in clear, honest communication. You'll always know where your case stands and what to expect at every stage of the litigation process.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">Get Legal Representation Today</h2>
          <p className="text-lg text-gray-300 mb-6">
            If you're facing a legal dispute, don't navigate it alone. Reach out to our expert litigation team for support and representation.
          </p>

          <div className="space-y-4 mb-6">
            <p className="text-lg text-gray-300">Phone: <span className="text-white hover:underline">+91 8383801899</span></p>
            <p className="text-lg text-gray-300">Email: <span className="text-white hover:underline">help@lawgical.io</span></p>
            <p className="text-lg text-gray-300">Address: Lawgical Avenue, Sec 12 Gurugram</p>
          </div>

          {/* Updated Link Usage */}
          <Link href="/contact">
            <button className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:bg-blue-600 transition-all duration-300">
              Schedule a Consultation
            </button>
          </Link>
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

const ContractLawPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header Component */}
      <Header />

      <main className="flex-grow px-6 sm:px-12 py-24 max-w-7xl mx-auto">
        {/* Title Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Contract Law: Protecting Your Legal Agreements</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Whether you're drafting a new contract or need assistance with enforcement, our expert legal team ensures that your agreements are clear, fair, and legally binding.
          </p>
        </section>

        {/* What is Contract Law? */}
        <section className="mb-20">
          <h2 className="text-4xl font-semibold mb-6">What is Contract Law?</h2>
          <div className="lg:flex lg:gap-12 items-center">
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-300 mb-6">
                Contract law governs legally binding agreements between parties. It ensures fairness and enforceability, covering aspects from contract formation to breach resolution.
              </p>
              <p className="text-lg text-gray-300">
                This area is vital for both individuals and businesses to maintain trust and accountability in personal and professional dealings.
              </p>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <img
                src="https://picsum.photos/800/400"
                alt="Contract Law Illustration"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Types of Contracts */}
        <section className="mb-20">
          <h2 className="text-4xl font-semibold mb-6">Types of Contracts</h2>
          <div className="lg:flex lg:gap-12 items-start">
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-300 mb-6">
                Contracts vary widely. Common types include:
              </p>
              <ul className="list-disc pl-6 space-y-4 text-lg text-gray-300">
                <li><strong>Written Contracts:</strong> Formal documents outlining specific terms.</li>
                <li><strong>Oral Contracts:</strong> Spoken agreements that are harder to prove.</li>
                <li><strong>Implied Contracts:</strong> Formed through conduct or circumstances.</li>
                <li><strong>Unilateral Contracts:</strong> One-sided promises based on action.</li>
              </ul>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <img
                src="https://picsum.photos/800/400?random=1"
                alt="Types of Contracts"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Our Approach to Contract Law */}
        <section className="mb-20">
          <h2 className="text-4xl font-semibold mb-6">Our Approach to Contract Law</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-4xl">
            From contract creation to enforcement, we offer end-to-end support to safeguard your rights and ensure clarity. Here’s how we help:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Contract Drafting</h3>
              <p className="text-gray-300">
                Tailored contracts crafted to meet your unique needs and legal standards.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Review & Negotiation</h3>
              <p className="text-gray-300">
                In-depth analysis and negotiation to protect your interests.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Dispute Resolution</h3>
              <p className="text-gray-300">
                Swift legal action to enforce your contract rights and recover losses.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Consultation</h3>
              <p className="text-gray-300">
                Expert legal advice to avoid common contract pitfalls.
              </p>
            </div>
          </div>
          <img
            src="https://picsum.photos/800/400?random=2"
            alt="Our Legal Services"
            className="w-full h-auto rounded-xl shadow-lg mt-10"
          />
        </section>

        {/* Contact Section */}
        <section className="text-center mb-20">
          <h2 className="text-4xl font-semibold mb-4">Contact Us for Expert Legal Help</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Need contract law assistance? Reach out to our dedicated team to get started.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-lg text-gray-300">Phone: <span className="text-white">+91 8383801899</span></p>
            <p className="text-lg text-gray-300">Email: <span className="text-white">help@lawgical.io</span></p>
            <p className="text-lg text-gray-300">Address: Lawgical Avenue, Sec 12 Gurugram</p>
          </div>
          <Link href="/contact">
            <button className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-medium rounded-full hover:opacity-90 transition-all">
              Get Legal Help Now
            </button>
          </Link>
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default ContractLawPage;

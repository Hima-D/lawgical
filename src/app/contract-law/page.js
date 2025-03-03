import React from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

const ContractLawPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Component */}
      <Header />

      <main className="px-6 sm:px-12 py-24 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold text-white mb-4">Contract Law: Protecting Your Legal Agreements</h1>
          <p className="text-xl text-gray-300">
            Whether you're drafting a new contract or need assistance with enforcement, our expert legal team ensures that your contracts are clear, fair, and legally binding.
          </p>
        </div>

        {/* What is Contract Law? */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-4">What is Contract Law?</h2>
          <div className="lg:flex lg:space-x-12">
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-300 mb-6">
                Contract law is the body of law that governs legally binding agreements between parties. It ensures that agreements are enforced and protects the parties' rights in case of a dispute. Contract law covers everything from the formation of contracts to their enforcement, including disputes over breaches and contract terms.
              </p>
              <p className="text-lg text-gray-300">
                This area of law is essential for individuals and businesses alike to ensure fairness and clarity in agreements. Whether personal or commercial, contracts can help provide legal recourse when obligations are not met.
              </p>
            </div>
            <div className="lg:w-1/2 mb-6 lg:mb-0">
              <img
                src="https://picsum.photos/800/400"
                alt="Contract Law"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Types of Contracts */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">Types of Contracts</h2>
          <div className="lg:flex lg:space-x-12">
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-300 mb-6">
                Contracts come in many forms. Some of the most common types include:
              </p>
              <ul className="list-disc pl-8 space-y-4 text-lg text-gray-300">
                <li><strong>Written Contracts:</strong> Clear, formal agreements that specify terms in writing.</li>
                <li><strong>Oral Contracts:</strong> Verbal agreements, often difficult to enforce.</li>
                <li><strong>Implied Contracts:</strong> Formed based on the actions or conduct of the parties.</li>
                <li><strong>Unilateral Contracts:</strong> One party promises something in exchange for the other party's action.</li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://picsum.photos/800/400?random=1"
                alt="Types of Contracts"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* How We Handle Contract Law Matters */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">How We Handle Contract Law Matters</h2>
          <p className="text-lg text-gray-300 mb-6">
            At our firm, we are committed to providing comprehensive services in contract law. Whether you need help drafting, reviewing, or enforcing a contract, we bring legal expertise to protect your rights and interests. Here’s how we handle contract law cases:
          </p>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Contract Drafting</h3>
              <p className="text-lg text-gray-300">
                We help create contracts that are clear, precise, and legally binding. Our team ensures that your contracts protect your interests and meet legal standards.
              </p>
            </div>
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Contract Review & Negotiation</h3>
              <p className="text-lg text-gray-300">
                We carefully review and negotiate the terms of existing contracts to ensure that they are fair and in your best interest.
              </p>
            </div>
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Enforcement & Dispute Resolution</h3>
              <p className="text-lg text-gray-300">
                If your contract is breached, we take swift action to enforce your rights and seek appropriate remedies, including financial compensation or specific performance.
              </p>
            </div>
            <div className="space-y-4 mb-6 lg:mb-0">
              <h3 className="text-2xl font-semibold text-white">Consultation & Advice</h3>
              <p className="text-lg text-gray-300">
                Need guidance? We provide expert legal advice to help you navigate complex contract law issues and avoid costly mistakes.
              </p>
            </div>
          </div>
          <img
            src="https://picsum.photos/800/400?random=2"
            alt="Contract Law Services"
            className="w-full h-auto rounded-lg shadow-lg mt-8"
          />
        </section>

        {/* Contact Information */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-white mb-6">Contact Us for Expert Legal Help</h2>
          <p className="text-lg text-gray-300 mb-6">
            Need legal assistance with contracts? Our experienced team is here to guide you every step of the way.
          </p>

          <div className="space-y-4 mb-6">
            <p className="text-lg text-gray-300">Phone: <span className="text-white hover:underline">+91 8383801899</span></p>
            <p className="text-lg text-gray-300">Email: <span className="text-white hover:underline">help@lawgical.io</span></p>
            <p className="text-lg text-gray-300">Address: Lawgical Avenue, Sec 12 Gurugram</p>
          </div>

          {/* Updated Link Usage */}
          <Link href="/contact">
            <button className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:bg-blue-600 transition-all duration-300">
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

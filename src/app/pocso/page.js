import React from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

const PoscoPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Component */}
      <Header />

      <main className="px-6 sm:px-12 py-24 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">POCSO Act Legal Support</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dedicated legal advocacy for children affected by abuse and exploitation under the Protection of Children from Sexual Offences Act
          </p>
        </div>

        {/* What is POCSO? */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Understanding the POCSO Act</h2>
          <p className="text-lg text-gray-300 mb-6">
            The <strong>Protection of Children from Sexual Offences (POCSO) Act, 2012</strong> is landmark legislation in India specifically designed to protect children under 18 years from sexual assault, sexual harassment, and pornography. This comprehensive law was enacted to provide a child-friendly system for reporting, recording evidence, investigation, and speedy trial of offenses through designated Special Courts.
          </p>
          <p className="text-lg text-gray-300">
            The POCSO Act takes into account the vulnerable nature of children and contains provisions for avoiding their re-victimization during the judicial process. It establishes stringent punishment graded by the gravity of the offense, with punishments ranging from simple to rigorous imprisonment of varying periods, including life imprisonment, along with fines.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Key Features of the POCSO Act</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Child-Centric Procedures</h3>
              <p className="text-gray-300">
                The Act mandates child-friendly reporting, recording of evidence, investigation, and trial processes. Special provisions ensure the child's comfort, dignity, and privacy throughout legal proceedings.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Special Courts & Personnel</h3>
              <p className="text-gray-300">
                Dedicated Special Courts handle POCSO cases to expedite trials and ensure sensitivity. Special Public Prosecutors, support persons, and trained professionals assist children through the process.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Comprehensive Definitions</h3>
              <p className="text-gray-300">
                The Act precisely defines various forms of sexual abuse including penetrative and non-penetrative assault, sexual harassment, and pornography, addressing gaps in existing laws.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Mandatory Reporting</h3>
              <p className="text-gray-300">
                The law places an obligation on every person, including parents, teachers, and medical professionals, to report cases of child sexual abuse, with penalties for non-reporting or false reporting.
              </p>
            </div>
          </div>
        </section>

        {/* Our Specialized Legal Services */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Our Specialized POCSO Legal Services</h2>
          <p className="text-lg text-gray-300 mb-8">
            At <strong>Lawgical</strong>, our team of experienced lawyers specializes in handling sensitive POCSO cases with the utmost professionalism, empathy, and legal expertise:
          </p>
          <ul className="space-y-6 text-lg text-gray-300">
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full p-1 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <strong className="text-white">Trauma-Informed Legal Consultation:</strong> Confidential, sensitive first consultations conducted by lawyers trained in trauma-informed approaches to minimize distress to child survivors and their families.
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full p-1 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <strong className="text-white">Case Building & Evidence Preservation:</strong> Expert assistance with documentation, evidence collection, and case building in coordination with medical professionals, child psychologists, and law enforcement.
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full p-1 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <strong className="text-white">Court Representation:</strong> Dedicated legal representation before Special Courts, ensuring the child's testimony is recorded in a supportive environment with minimal trauma.
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full p-1 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <strong className="text-white">Rehabilitation & Compensation:</strong> Assistance with applications for victim compensation schemes and connecting families with appropriate support services for long-term recovery and rehabilitation.
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full p-1 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <strong className="text-white">Preventive Education & Training:</strong> We conduct workshops for schools, organizations, and parents on POCSO provisions, prevention strategies, and creating safe environments for children.
              </div>
            </li>
          </ul>
        </section>

        {/* Our Commitment */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Our Commitment to Child Protection</h2>
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-lg">
            <p className="text-lg text-white mb-6">
              At Lawgical, we are unwavering in our commitment to protect children's rights and dignity. We understand that cases involving child sexual abuse require not just legal expertise, but also exceptional sensitivity, patience, and dedication.
            </p>
            <p className="text-lg text-white mb-6">
              Our team approaches each POCSO case with the understanding that behind every legal file is a child whose life has been profoundly affected. We strive to create a supportive environment where children and their families feel safe, respected, and empowered throughout the legal process.
            </p>
            <p className="text-lg text-white">
              We believe in both justice and healing—working diligently to hold offenders accountable while ensuring that child survivors have access to the support they need for recovery and reintegration.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Confidential Consultation</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            If you need to report a POCSO case or seek legal guidance regarding child protection matters, our specialized legal team is available for strictly confidential consultations. We prioritize your child's safety and wellbeing above all else.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-900 p-6 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p className="text-lg text-gray-300">Emergency Helpline</p>
              <a href="tel:+918383801899" className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">+91 8383801899</a>
              <p className="text-sm text-gray-400 mt-2">(Available 24/7)</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-lg text-gray-300">Email Contact</p>
              <a href="mailto:help@lawgical.io" className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">help@lawgical.io</a>
              <p className="text-sm text-gray-400 mt-2">(Response within 24 hours)</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-lg text-gray-300">Office Location</p>
              <p className="text-xl font-semibold text-white">Lawgical Office</p>
              <p className="text-sm text-gray-400 mt-2">Sector 12, Gurugram, Haryana</p>
            </div>
          </div>

          <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-lg font-medium rounded-full hover:from-blue-700 hover:to-purple-800 transition-all duration-300 shadow-lg">
            Schedule a Confidential Consultation
          </Link>
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default PoscoPage;
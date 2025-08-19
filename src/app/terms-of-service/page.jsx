import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">TERMS OF SERVICE</h1>
            <p className="text-lg text-gray-600">
              <strong>Last updated:</strong> August 19, 2025
            </p>
          </div>

          {/* Agreement Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AGREEMENT TO OUR LEGAL TERMS</h2>
            <div className="prose prose-gray max-w-none">
              <p className="mb-4">
                We are <strong>Lawgical</strong>, doing business as <strong>Lawgical</strong> (<strong>'Company'</strong>, <strong>'we'</strong>, <strong>'us'</strong>, or <strong>'our'</strong>).
              </p>
              <p className="mb-4">
                We operate the website{' '}
                <a href="https://www.lawgical.tech/" className="text-blue-600 hover:text-blue-800 underline">
                  https://www.lawgical.tech/
                </a>{' '}
                (the <strong>'Site'</strong>), as well as any other related products and services that refer or link to these legal terms (the <strong>'Legal Terms'</strong>) (collectively, the <strong>'Services'</strong>).
              </p>
              <p className="mb-4">
                You can contact us by email at{' '}
                <a href="mailto:support@lawgical.tech" className="text-blue-600 hover:text-blue-800 underline">
                  support@lawgical.tech
                </a>{' '}
                or by mail to __________, __________, India.
              </p>
              <p className="mb-4">
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (<strong>'you'</strong>), and Lawgical, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms.{' '}
                <strong className="text-red-600">
                  IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                </strong>
              </p>
            </div>
          </section>

          {/* Section 1: Our Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. OUR SERVICES</h2>
            <p className="text-gray-700 leading-relaxed">
              The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
            </p>
          </section>

          {/* Section 2: Intellectual Property Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. INTELLECTUAL PROPERTY RIGHTS</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our intellectual property</h3>
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed mb-3">
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the <strong>'Content'</strong>), as well as the trademarks, service marks, and logos contained therein (the <strong>'Marks'</strong>).
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties around the world.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The Content and Marks are provided in or through the Services <strong>'AS IS'</strong> for your personal, non-commercial use or internal business purpose only.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Your use of our Services</h3>
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed mb-3">
                Subject to your compliance with these Legal Terms, including the{' '}
                <a href="#prohibited" className="text-blue-600 hover:text-blue-800 underline">
                  PROHIBITED ACTIVITIES
                </a>{' '}
                section below, we grant you a non-exclusive, non-transferable, revocable licence to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>access the Services; and</li>
                <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                solely for your personal, non-commercial use or internal business purpose.
              </p>
            </div>
          </section>

          {/* Section 3: User Representations */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. USER REPRESENTATIONS</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              By using the Services, you represent and warrant that:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>all registration information you submit will be true, accurate, current, and complete;</li>
              <li>you will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
              <li>you have the legal capacity and you agree to comply with these Legal Terms;</li>
              <li>you are not a minor in the jurisdiction in which you reside;</li>
              <li>you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
              <li>you will not use the Services for any illegal or unauthorised purpose; and</li>
              <li>your use of the Services will not violate any applicable law or regulation.</li>
            </ol>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
            </p>
          </section>

          {/* Section 4: User Registration */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. USER REGISTRATION</h2>
            <p className="text-gray-700 leading-relaxed">
              You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </p>
          </section>

          {/* Section 5: Purchases and Payment */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. PURCHASES AND PAYMENT</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-700 font-semibold">All purchases are non-refundable.</p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              We accept the following forms of payment:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Visa</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. All payments shall be in INR.
            </p>
          </section>

          {/* Section 6: Prohibited Activities */}
          <section id="prohibited" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. PROHIBITED ACTIVITIES</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Systematically retrieve data or other content from the Services to create or compile a collection, compilation, database, or directory without written permission from us.</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
              <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
              <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
              <li>Engage in unauthorised framing of or linking to the Services.</li>
              <li>Upload or transmit viruses, Trojan horses, or other harmful material.</li>
              <li>Engage in any automated use of the system.</li>
              <li>Delete the copyright or other proprietary rights notice from any Content.</li>
              <li>Attempt to impersonate another user or person.</li>
              <li>Use the Services to advertise or offer to sell goods and services.</li>
              <li>Sell or otherwise transfer your profile.</li>
            </ul>
          </section>

          {/* Section 7-23 in condensed format for space */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7-11. ADDITIONAL TERMS</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Services Management</h3>
                <p className="text-sm text-gray-700">
                  We reserve the right to monitor, refuse, restrict access to, or disable any content or user activity that violates these terms.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Privacy Policy</h3>
                <p className="text-sm text-gray-700">
                  By using our Services, you agree to our Privacy Policy. Services are hosted in India.
                </p>
              </div>
            </div>
          </section>

          {/* Term and Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. TERM AND TERMINATION</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-800 font-medium">
                WE RESERVE THE RIGHT TO DENY ACCESS TO AND USE OF THE SERVICES TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING BREACH OF THESE LEGAL TERMS.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. GOVERNING LAW</h2>
            <p className="text-gray-700 leading-relaxed">
              These Legal Terms shall be governed by and defined following the laws of <strong>India</strong>. Lawgical and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. DISCLAIMER</h2>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-700 font-medium text-sm leading-relaxed">
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">23. CONTACT US</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
            </p>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="text-gray-800">
                <p className="font-semibold">Lawgical</p>
                <p>India</p>
                <p>
                  Email:{' '}
                  <a href="mailto:support@lawgical.tech" className="text-blue-600 hover:text-blue-800 underline">
                    support@lawgical.tech
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="text-center text-sm text-gray-500">
              This Terms of Service agreement is effective as of August 19, 2025. Please review these terms regularly as they may be updated from time to time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
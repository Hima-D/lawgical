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
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">POSCO (Prevention of Sexual Offenses)</h1>
          <p className="text-lg text-gray-300">
            Safeguarding dignity and justice for all, we are dedicated to offering expert legal support to victims of sexual offenses.
          </p>
        </div>

        {/* What is POSCO? */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">What is POSCO?</h2>
          <p className="text-lg text-gray-300 mb-6">
            The **Prevention of Sexual Offenses (POSCO)** Act is a vital piece of legislation designed to protect individuals from sexual offenses such as harassment, exploitation, and abuse in various environments, especially in workplaces, educational institutions, and public spaces. The law provides legal mechanisms for preventing sexual offenses and seeks to create safe, dignified spaces for all individuals.
          </p>
          <p className="text-lg text-gray-300">
            POSCO is integral in addressing sexual harassment and exploitation, empowering survivors with the legal framework necessary for seeking justice. We are committed to helping those who have been affected navigate this complex legal landscape with the utmost professionalism and care.
          </p>
        </section>

        {/* How We Handle POSCO Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">How We Handle POSCO Matters</h2>
          <p className="text-lg text-gray-300 mb-6">
            At **Lawyer Portal**, we understand the sensitivity and gravity of POSCO-related cases. Our approach is comprehensive, empathetic, and strategic. Here's how we handle POSCO cases:
          </p>
          <ul className="list-disc pl-8 space-y-4 text-lg text-gray-300">
            <li>
              <strong>Confidential Consultation:</strong> We offer a confidential space for victims to discuss their experiences and receive trusted legal advice.
            </li>
            <li>
              <strong>Legal Representation:</strong> Our experienced legal team provides full representation to those affected by sexual offenses, ensuring their voices are heard in court.
            </li>
            <li>
              <strong>Evidence Collection:</strong> We collaborate with forensic experts to gather evidence while ensuring the privacy and dignity of our clients.
            </li>
            <li>
              <strong>Swift Legal Action:</strong> We take prompt action to ensure victims receive legal remedies such as compensation, restraining orders, and criminal prosecution of offenders.
            </li>
            <li>
              <strong>Prevention and Awareness:</strong> We also advocate for preventative measures, offering training and awareness programs to prevent future offenses in workplaces and public settings.
            </li>
          </ul>
        </section>

        {/* Why We Stand for POSCO */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Why We Stand for POSCO</h2>
          <p className="text-lg text-gray-300 mb-6">
            At **Lawyer Portal**, we firmly believe in upholding justice, equality, and dignity for all individuals. Sexual offenses undermine these core values, and we are committed to providing our clients with the legal support they need to restore their rights and sense of security.
          </p>
          <ul className="list-disc pl-8 space-y-4 text-lg text-gray-300">
            <li>
              <strong>Empowering Survivors:</strong> We strive to empower victims of sexual offenses by providing them with the legal tools to seek justice and reclaim their dignity.
            </li>
            <li>
              <strong>Advocating for Safe Spaces:</strong> Whether it's at the workplace or in public areas, we work to ensure that everyone has access to safe and respectful environments.
            </li>
            <li>
              <strong>Legal Excellence:</strong> Our team is dedicated to providing the highest quality legal services in handling POSCO cases with integrity, expertise, and compassion.
            </li>
          </ul>
        </section>

        {/* Contact Information */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-6">How to Contact Us</h2>
          <p className="text-lg text-gray-300 mb-6">
            If you or someone you know is affected by a sexual offense, we are here to offer the support and legal representation needed. Contact us today to discuss your case and receive the expert legal help you deserve.
          </p>

          <div className="space-y-4">
            <p className="text-lg text-gray-300">Phone: <a href="tel:+123456789" className="text-white hover:underline">+91 8383801899</a></p>
            <p className="text-lg text-gray-300">Email: <a href="mailto:info@lawyerportal.com" className="text-white hover:underline">help@lawgical.io</a></p>
            <p className="text-lg text-gray-300">Address: Lawgical Avenue, Sec 12 Gurugram</p>
          </div>

          {/* Updated Link Usage: No <a> inside <Link> */}
          <Link href="/contact" className="mt-6 inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:bg-blue-600 transition-all duration-300">
            Contact Us
          </Link>
        </section>

      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

// Export the component as default
export default PoscoPage;

import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 sm:px-12">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-12 pb-24">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">About Us</h1>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-16">
          <div className="sm:w-1/2 mb-8 sm:mb-0">
            <Image
              src="/about-us-image.jpg" // Replace with your actual image
              alt="About Us Image"
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-lg shadow-xl"
            />
          </div>

          <div className="sm:w-1/2 sm:pl-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-300 mb-6">
              At Lawyer Portal, our mission is to provide a seamless platform for legal professionals to connect, collaborate, and access essential resources. We aim to empower lawyers with the tools they need to succeed in their practice while fostering a community of knowledge-sharing and support.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">Our Core Values</h2>
            <ul className="list-disc pl-6 text-lg text-gray-300 space-y-2">
              <li>Integrity: Upholding the highest standards of integrity and professionalism.</li>
              <li>Collaboration: Fostering teamwork and shared success in the legal field.</li>
              <li>Innovation: Leveraging cutting-edge technology to enhance legal practice.</li>
              <li>Excellence: Delivering the best possible experience for our users and partners.</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-white mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-300 mb-12">
            Our team consists of passionate individuals dedicated to making Lawyer Portal the best platform for legal professionals. We are committed to empowering our users with the tools they need to succeed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Team Member: Chahat Siwach */}
            <div className="text-center transition transform hover:scale-105 hover:shadow-xl rounded-lg p-6 bg-white border border-gray-200">
              <Image
                src="/chahat-siwach.jpg"  // Replace with actual image of Chahat Siwach
                alt="Chahat Siwach"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 grayscale"
              />
              <h3 className="text-xl font-semibold text-black">Chahat Siwach</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center transition transform hover:scale-105 hover:shadow-xl rounded-lg p-6 bg-white border border-gray-200">
              <Image
                src="/team-member-2.jpg"  // Replace with actual team member image
                alt="Team Member 2"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 grayscale"
              />
              <h3 className="text-xl font-semibold text-black">Jane Smith</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center transition transform hover:scale-105 hover:shadow-xl rounded-lg p-6 bg-white border border-gray-200">
              <Image
                src="/team-member-3.jpg"  // Replace with actual team member image
                alt="Team Member 3"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 grayscale"
              />
              <h3 className="text-xl font-semibold text-black">Michael Brown</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default About;

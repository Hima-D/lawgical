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
              src="https://picsum.photos/600/400?random=1" // Replace with your actual image
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Team Member: Chahat Siwach */}
            <div className="transition transform hover:scale-105 hover:shadow-2xl rounded-lg p-8 bg-white text-center border border-gray-200">
              <Image
                src="https://picsum.photos/150/150?random=2"  // Replace with actual image of Chahat Siwach
                alt="Chahat Siwach"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 grayscale"
              />
              <h3 className="text-xl font-semibold text-black">Chahat Siwach</h3>
              <p className="text-gray-600 text-lg">Founder & CEO</p>
              <p className="text-gray-500 mt-2">
                Chahat is a highly skilled lawyer with a sharp intellect and exceptional courtroom presence. With years of experience, she’s earned a reputation for handling even the most challenging cases with poise and precision. When she’s not in the courtroom, she’s mentoring fellow lawyers and refining her legal strategies. Chahat’s leadership and strict approach to legal matters ensure that every case is treated with the utmost professionalism and rigor.
              </p>
            </div>

            {/* Team Member: Millit Bhati */}
            <div className="transition transform hover:scale-105 hover:shadow-2xl rounded-lg p-8 bg-white text-center border border-gray-200">
              <Image
                src="https://picsum.photos/150/150?random=3"  // Replace with actual image of Millit Bhati
                alt="Millit Bhati"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 grayscale"
              />
              <h3 className="text-xl font-semibold text-black">Millit Bhati</h3>
              <p className="text-gray-600 text-lg">CS Engineer (Professional One)</p>
              <p className="text-gray-500 mt-2">
                Millit is a brilliant CS engineer with exceptional technical skills. However, when certain people are around, his usual focus seems to waver, and his coding abilities take a bit of a backseat. Despite this, he remains an invaluable team member, renowned for his problem-solving abilities and sharp intellect. His passion for technology and his readiness to tackle any challenge are always evident, even if he occasionally gets a little distracted.
              </p>
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

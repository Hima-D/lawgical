import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';

const About = () => {
  const teamMembers = [
    {
      name: "Chahat Siwach",
      role: "Founder & CEO",
      image: "https://picsum.photos/150/150?random=2",
      bio: "Chahat is a highly skilled lawyer with a sharp intellect and exceptional courtroom presence. With years of experience, she's earned a reputation for handling even the most challenging cases with poise and precision. When she's not in the courtroom, she's mentoring fellow lawyers and refining her legal strategies. Chahat's leadership and strict approach to legal matters ensure that every case is treated with the utmost professionalism and rigor."
    },
    {
      name: "Millit",
      role: "CS Engineer (Professional One)",
      image: "https://picsum.photos/150/150?random=3",
      bio: "Millit is a brilliant CS engineer with exceptional technical skills. However, when certain people are around, his usual focus seems to waver, and his coding abilities take a bit of a backseat. Despite this, he remains an invaluable team member, renowned for his problem-solving abilities and sharp intellect. His passion for technology and his readiness to tackle any challenge are always evident, even if he occasionally gets a little distracted."
    }
  ];
  
  const coreValues = [
    { value: "Integrity", description: "Upholding the highest standards of integrity and professionalism." },
    { value: "Collaboration", description: "Fostering teamwork and shared success in the legal field." },
    { value: "Innovation", description: "Leveraging cutting-edge technology to enhance legal practice." },
    { value: "Excellence", description: "Delivering the best possible experience for our users and partners." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70 z-10" />
        <Image
          src="https://picsum.photos/1920/1080?random=1"
          alt="About Us Hero"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-5xl sm:text-6xl font-bold text-center text-white drop-shadow-lg">About Us</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        {/* Mission Section */}
        <section className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 mb-24">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="p-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-2xl">
              <div className="bg-black p-8 rounded-lg h-full">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  At Lawgical, our mission is to provide a seamless platform for legal professionals to connect, collaborate, and access essential resources. We aim to empower lawyers with the tools they need to succeed in their practice while fostering a community of knowledge-sharing and support.
                </p>

                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">Our Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {coreValues.map((item, index) => (
                    <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.value}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-5/12 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-lg blur-lg"></div>
              <Image
                src="https://picsum.photos/600/800?random=1"
                alt="About Us Image"
                width={600}
                height={800}
                className="rounded-lg shadow-2xl relative object-cover w-full aspect-[3/4]"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500 rounded-full opacity-30 blur-lg"></div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Meet Our Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our team consists of passionate individuals dedicated to making Lawgical the best platform for legal professionals. We are committed to empowering our users with the tools they need to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex flex-col sm:flex-row p-8">
                  <div className="sm:w-1/3 flex justify-center mb-6 sm:mb-0">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={150}
                        height={150}
                        className="rounded-full border-4 border-gray-800 relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>
                  <div className="sm:w-2/3 sm:pl-8 text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-purple-400 text-lg mb-4">{member.role}</p>
                    <p className="text-gray-300">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Legal Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with fellow legal professionals, access resources, and grow your practice with Lawyer Portal.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            Join Now
          </button>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
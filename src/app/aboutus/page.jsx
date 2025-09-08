import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Linkedin } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Chahat Siwach",
      role: "Advocate & Co-Founder",
      image: "https://picsum.photos/150/150?random=1",
      bio: "Chahat is a skilled advocate with sharp legal acumen and a strong courtroom presence. Known for handling complex cases with confidence and precision, she brings depth and leadership to the team."
    },
    {
      name: "Khushbu Dixit",
      role: "Business Head",
      image: "https://picsum.photos/150/150?random=2",
      bio: "Khushbu drives strategic growth and operational excellence. With expertise in business development and leadership, she excels at building partnerships and turning ideas into measurable success."
    },
    {
      name: "Sharath Potturu",
      role: "Public Researcher & Marketing Head",
      image: "https://picsum.photos/150/150?random=3",
      bio: "Sharath is a creative strategist with a flair for brand storytelling and digital outreach. Combining industry insight with data-driven thinking, he designs impactful campaigns that boost engagement and visibility."
    },
    {
      name: "Himanshu Dixit",
      role: "Co-Founder",
      image: "https://picsum.photos/150/150?random=4",
      bio: "Himanshu is a Co-founder and Computer Science engineer with strong technical expertise. Driven by innovation and problem-solving, he builds scalable solutions and leads with vision, making him a core pillar of the team."
    }     
  ];

  const coreValues = [
    { value: "Integrity", description: "Upholding the highest standards of integrity and professionalism." },
    { value: "Collaboration", description: "Fostering teamwork and shared success in the legal field." },
    { value: "Innovation", description: "Leveraging cutting-edge technology to enhance legal practice." },
    { value: "Excellence", description: "Delivering the best possible experience for our users and partners." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-gray-900">
    <Header />

    {/* Hero Section */}
    <section className="relative h-80 sm:h-96 overflow-hidden">
      <Image
        src="https://picsum.photos/1920/1080?random=1"
        alt="About Us Hero"
        width={1920}
        height={1080}
        className="object-cover w-full h-full brightness-75"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
        <h1 className="text-5xl sm:text-6xl font-bold text-white drop-shadow-lg">About Lawgical</h1>
      </div>
    </section>

    {/* Mission and Values */}
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            At Lawgical, our mission is to democratize justice by connecting everyone with the legal expertise they need, delivering compassionate, expert-driven solutions for a fairer world.
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {coreValues.map((item, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{item.value}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Image
            src="https://picsum.photos/600/800?random=2"
            alt="Team collaboration"
            width={600}
            height={800}
            className="rounded-xl shadow-lg w-full object-cover aspect-[3/4] hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Leadership Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our diverse team of legal, business, marketing, and technical experts drives Lawgical’s vision to transform the legal landscape with innovation and integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full border-2 border-blue-200 mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm text-center leading-relaxed mb-4">{member.bio}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn Profile
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Founded with a vision to bridge the gap between legal expertise and accessibility, Lawgical combines cutting-edge technology with unparalleled legal acumen to serve clients across India and beyond.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Lawgical was born from a shared passion for justice and innovation. Recognizing the challenges individuals and businesses face in navigating complex legal systems, our founders set out to create a platform that simplifies access to top-tier legal services.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              From contract disputes to child protection cases, our team has grown to offer comprehensive legal solutions, driven by a commitment to integrity, collaboration, and client empowerment. Today, Lawgical stands as a trusted partner for those seeking justice and clarity in the legal world.
            </p>
          </div>
          <Image
            src="https://picsum.photos/600/400?random=3"
            alt="Lawgical story"
            width={600}
            height={400}
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-24 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-12 text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Join the Lawgical Community</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Partner with us to access expert legal resources, connect with professionals, and grow your practice or resolve your legal challenges with confidence.
        </p>
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-transform hover:scale-105">
          Get Started
        </button>
      </section>
    </div>

    <Footer />
  </div>
  );
};

export default About;

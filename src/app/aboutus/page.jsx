import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';

const About = () => {
  const teamMembers = [
    {
      name: "Chahat Siwach",
      role: "Founder & CEO",
      image: "https://picsum.photos/150/150?random=2",
      bio: "Chahat is a highly skilled lawyer with a sharp intellect and exceptional courtroom presence. With years of experience, she's earned a reputation for handling even the most challenging cases with poise and precision."
    },
    {
      name: "Millit",
      role: "Engineer",
      image: "https://picsum.photos/150/150?random=3",
      bio: "Millit is a brilliant CS engineer with exceptional technical skills. Known for his problem-solving abilities and passion for technology, he is an invaluable part of the team."
    }
  ];

  const coreValues = [
    { value: "Integrity", description: "Upholding the highest standards of integrity and professionalism." },
    { value: "Collaboration", description: "Fostering teamwork and shared success in the legal field." },
    { value: "Innovation", description: "Leveraging cutting-edge technology to enhance legal practice." },
    { value: "Excellence", description: "Delivering the best possible experience for our users and partners." }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
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
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-white drop-shadow-lg">About Us</h1>
        </div>
      </section>

      {/* Mission and Values */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-20">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg mb-8 leading-relaxed text-gray-700">
            "At Lawgical, our mission is to democratize justice by connecting everyone with the legal expertise they need."
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreValues.map((item, index) => (
                <div key={index} className="p-6 rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.value}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Image
              src="https://picsum.photos/600/800?random=1"
              alt="Team image"
              width={600}
              height={800}
              className="rounded-xl shadow-lg w-full object-cover aspect-[3/4]"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team consists of passionate individuals dedicated to making Lawgical the best platform for legal professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full border border-gray-300"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-blue-500 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 bg-white border border-blue-100 rounded-2xl p-12 text-center shadow-sm">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Join Our Legal Community</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Connect with fellow legal professionals, access resources, and grow your practice with Lawgical.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">Join Now</button>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;

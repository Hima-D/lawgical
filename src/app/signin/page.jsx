import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 grid grid-rows-[auto_1fr_auto] gap-16 px-8 sm:px-20 py-16 sm:py-24 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 items-center sm:items-start text-center sm:text-left">
          <Image
            className="dark"
            src="/law.jpg"  // Update with your logo image
            alt="Lawyer Portal Logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary text-center sm:text-left">
            Welcome to the Lawyer Portal
          </h1>
          <p className="text-lg sm:text-xl font-medium text-gray-600 sm:text-left">
            Connect with fellow lawyers, discuss cases, and access resources for a seamless legal practice.
          </p>

          <ol className="list-inside list-decimal text-lg sm:text-xl font-mono text-gray-700 sm:text-left mt-6">
            <li className="mb-2">Collaborate with other lawyers on cases and legal topics.</li>
            <li>Join exclusive discussions and access legal resources right at your fingertips.</li>
          </ol>

          <div className="flex gap-6 items-center flex-col sm:flex-row mt-10">
            <Link
              href="/cases"
              className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-primary text-background gap-2 py-3 px-8 text-lg sm:text-xl hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              Access Cases
            </Link>
            <Link
              href="/discussions"
              className="rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center py-3 px-8 text-lg sm:text-xl bg-white dark:bg-[#1a1a1a] hover:bg-[#f2f2f2] dark:hover:bg-[#383838] hover:border-transparent"
            >
              Join Discussions
            </Link>
          </div>

          {/* Why We Exist */}
          <section className="mt-20 sm:mt-24 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Why We Exist</h2>
            <p className="text-lg sm:text-xl text-gray-700">
              At the Lawyer Portal, we believe in empowering legal professionals by creating a space where lawyers can
              come together to share knowledge, collaborate, and make informed decisions. Our mission is to foster a
              community of like-minded professionals dedicated to delivering justice and high-quality legal services.
            </p>
          </section>

          {/* Where We Work */}
          <section className="mt-16 sm:mt-20 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Where We Work</h2>
            <p className="text-lg sm:text-xl text-gray-700">
              Our platform serves lawyers across the globe, with an emphasis on providing resources for various legal
              fields. Whether you're in corporate law, criminal law, family law, or any other specialty, our network is
              here to help you connect with peers, share insights, and collaborate on cases, no matter where you are.
            </p>
          </section>

          {/* Why We Stand as an Organization */}
          <section className="mt-16 sm:mt-20 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Why We Stand as an Organization</h2>
            <p className="text-lg sm:text-xl text-gray-700">
              We stand by the values of integrity, collaboration, and accessibility. Our core belief is that legal
              professionals should have access to tools and resources that allow them to succeed. We are committed to
              building a diverse and inclusive community, where legal practitioners can share their knowledge freely and
              collaborate without boundaries. Our organization thrives on supporting the legal community and advancing the
              future of law through innovation and connection.
            </p>
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

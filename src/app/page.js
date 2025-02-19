import Image from 'next/image';
import Link from 'next/link';  // Import the Link component
import Header from '@/components/header';
import Footer from '@/components/footer';
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark"
            src="/law.jpg"  // Update with your logo image
            alt="Lawyer Portal Logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left text-primary">
            Welcome to the Lawyer Portal
          </h1>
          <p className="text-sm sm:text-lg text-center sm:text-left font-medium text-gray-600">
            Connect with fellow lawyers, discuss cases, and access resources for a seamless legal practice.
          </p>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">Start collaborating with other lawyers on cases and legal topics.</li>
            <li>Join exclusive discussions and access legal resources at your fingertips.</li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              href="/cases"  // This should point to the page with lawyer cases
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Access Cases
            </Link>
            <Link
              href="/discussions"  // This should lead to discussion forums or groups
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              Join Discussions
            </Link>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

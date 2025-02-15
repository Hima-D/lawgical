import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'; // Import icons
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Logo and Social Media Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-white pb-6">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Image
              src="/lawyer-portal-logo.svg" // Update with your actual logo
              alt="Lawyer Portal Logo"
              width={120}
              height={40}
              priority
            />
          </div>

          {/* Social Media Links */}
          <div className="flex gap-6">
            <Link href="https://www.linkedin.com" passHref>
              <FaLinkedin size={28} className="text-white hover:text-gray-300 transition-colors" />
            </Link>
            <Link href="https://twitter.com" passHref>
              <FaTwitter size={28} className="text-white hover:text-gray-300 transition-colors" />
            </Link>
            <Link href="https://www.facebook.com" passHref>
              <FaFacebook size={28} className="text-white hover:text-gray-300 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="grid sm:grid-cols-3 gap-8 mb-6 text-sm text-gray-400">
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul>
              <li>
                <Link href="/aboutus" passHref>
                  <span className="hover:text-gray-300 transition-colors">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <span className="hover:text-gray-300 transition-colors">Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" passHref>
                  <span className="hover:text-gray-300 transition-colors">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" passHref>
                  <span className="hover:text-gray-300 transition-colors">Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Links (Optional) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul>
              <li>
                <Link href="/faq" passHref>
                  <span className="hover:text-gray-300 transition-colors">FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" passHref>
                  <span className="hover:text-gray-300 transition-colors">Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" passHref>
                  <span className="hover:text-gray-300 transition-colors">Careers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="mb-4 text-gray-300">Subscribe to our newsletter for legal tips, updates, and more.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="p-2 rounded-l-md border-none text-black w-72"
              />
              <button
                type="submit"
                className="bg-secondary text-white py-2 px-4 rounded-r-md hover:bg-secondary-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-400 mt-8">
          <p>&copy; {new Date().getFullYear()} Lawyer Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

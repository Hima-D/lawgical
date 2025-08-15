/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // Add more hosts here if needed
    ],
  },
  // Future-proofing for Next.js 15 app router
  experimental: {
    appDir: true,
  },
  // Optional: custom headers, rewrites, etc.
};

module.exports = nextConfig;

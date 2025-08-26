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

  // You can still keep other experimental flags here if needed, 
  // but appDir should be removed
  experimental: {
    // future experimental options
  },

  // Optional: custom headers, rewrites, etc.
};

module.exports = nextConfig;

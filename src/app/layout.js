import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lawyer Portal - Legal Services & Case Management",
  description: "Lawyer Portal connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
  keywords: "lawyer, legal services, case management, legal portal, lawyer portal, legal advice, law firm",
  author: "Chahat Siwach", // Replace with the actual author
  viewport: "width=device-width, initial-scale=1.0", // Ensures proper scaling for mobile devices
  
  // Open Graph metadata (for better sharing on social media)
  openGraph: {
    title: "Lawyer Portal - Legal Services & Case Management",
    description: "Lawyer Portal connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
    type: "website",
    image: "/og-image.jpg", // Add a relevant image for Open Graph sharing
  },
  
  // Twitter card metadata
  twitter: {
    card: "summary_large_image", // Use 'summary_large_image' for better preview
    title: "Lawyer Portal - Legal Services & Case Management",
    description: "Lawyer Portal connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
    creator: "@chahat_siwach", // Replace with your Twitter handle
    image: "/twitter-card.jpg", // Add a relevant image for Twitter sharing
  },

  // Robots directive for search engine indexing
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta name="viewport" content={metadata.viewport} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.image} />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

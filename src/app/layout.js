import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata = {
  title: "Lawyer Portal - Legal Services & Case Management",
  description: "Lawyer Portal connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
  keywords: "lawyer, legal services, case management, legal portal, lawyer portal, legal advice, law firm",
  author: "Chahat Siwach", // Replace with actual author
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Lawyer Portal - Legal Services & Case Management",
    description: "Lawyer Portal connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
    type: "website",
    image: "/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawyer Portal - Legal Services & Case Management",
    description: "Lawyer Portal connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
    creator: "@chahat_siwach", // Replace with Twitter handle
    image: "/twitter-card.jpg",
  },
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Add SpeedInsights here */}
        <SpeedInsights/>
        
        {children}
      </body>
    </html>
  );
}

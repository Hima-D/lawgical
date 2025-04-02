import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from "@/components/theme-provider";


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
  title: "Lawgical - Legal Services & Case Management",
  description: "Lawgical connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
  keywords: "lawgical, lawyer, legal services, case management, legal portal, lawyer portal, legal advice, law firm",
  author: "Chahat Siwach", // Replace with actual author
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Lawgical - Legal Services & Case Management",
    description: "Lawgical connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
    type: "website",
    image: "/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawgical - Legal Services & Case Management",
    description: "Lawgical connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
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
        
        {/* Structured Data (JSON-LD) for SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Lawgical",
              "url": "https://lawgical.io", 
              "logo": "https://lawgical.io/logo.jpg", 
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+918383801899",
                "contactType": "Customer Support",
                "areaServed": "IN",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://twitter.com/chahat_siwach", 
                "https://www.linkedin.com/in/chahat-siwach/"
              ]
            }
          `}
        </script>
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Add animate.css */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          integrity="sha384-3c1c4c9edb0c6cb900388053b9dbf5f7d59e0f601bd14adfddefc0f580adf7c8"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          id="lawgical"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Add Vercel Analytics */}
        <Analytics />
        
        {/* Add Google PageSpeed Insights */}
        <SpeedInsights />
        {/* Add Google Analytics */}
        <GoogleAnalytics gaId="G-4H1WL5DLNM" />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}

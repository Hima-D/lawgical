import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lawgical - Legal Services & Case Management",
  description:
    "Lawgical connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
  keywords:
    "lawgical, lawyer, legal services, case management, legal portal, lawyer portal, legal advice, law firm",
  author: "Chahat Siwach",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Lawgical - Legal Services & Case Management",
    description:
      "Lawgical connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
    type: "website",
    image: "/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawgical - Legal Services & Case Management",
    description:
      "Lawgical connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
    creator: "@chahat_siwach",
    image: "/twitter-card.jpg",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className="light">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta name="viewport" content={metadata.viewport} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.image} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
        <meta name="twitter:image" content={metadata.twitter.image} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lawgical",
              url: "https://lawgical.io",
              logo: "https://lawgical.io/logo.jpg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+918383801899",
                contactType: "Customer Support",
                areaServed: "IN",
                availableLanguage: "English",
              },
              sameAs: [
                "https://twitter.com/chahat_Siwach",
                "https://www.linkedin.com/in/chahat-siwach/",
              ],
            }),
          }}
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Animate.css */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          integrity="sha384-3c1c4c9edb0c6cb900388053b9dbf5f7d59e0f601bd14adfddefc0f580adf7c8"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-4H1WL5DLNM" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* HubSpot */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, s, i, r) {
                if (d.getElementById(i)) return;
                var n = d.createElement(s), e = d.getElementsByTagName(s)[0];
                n.id = i; n.src = '//js.hs-scripts.com/242916761.js';
                e.parentNode.insertBefore(n, e);
              })(document, "script", "hs-script-loader");
            `,
          }}
        />

        {/* Segment Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="PyMX8kMqFLV9aHo7i6k6oFgcDzmntCjT";analytics.SNIPPET_VERSION="5.2.0";
              analytics.load("PyMX8kMqFLV9aHo7i6k6oFgcDzmntCjT");
              analytics.page();
              }}();
            `,
          }}
        />
      </body>
    </html>
  );
}

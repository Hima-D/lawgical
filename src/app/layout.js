import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "Lawgical - Best Legal Services & Online Lawyer Consultation | Book Legal Advice",
  description:
    "Lawgical connects you with expert lawyers for online consultation, company registration, GST services, trademark filing, and comprehensive legal advice. Book trusted legal professionals instantly.",
  keywords: [
    // Primary Keywords
    "lawgical", "lawyer", "legal services", "case management", "legal portal", "lawyer portal", "legal advice", "law firm",
    
    // High-Value Service Keywords
    "online lawyer consultation", "legal consultation online", "lawyer consultation booking", "best lawyers India",
    "legal advice near me", "legal services online", "company registration lawyer", "GST registration services",
    "intellectual property lawyer", "trademark registration online", "legal document preparation", "online legal help",
    
    // Long-tail Keywords
    "book lawyer consultation online", "affordable legal services India", "company incorporation lawyer near me",
    "GST return filing services", "legal advice for startups", "business lawyer consultation", "employment law consultation",
    "contract review lawyer", "legal compliance services", "startup legal services",
    
    // Service-Specific Keywords
    "company registration online", "FSSAI registration lawyer", "ISO certification consultant", "digital signature services",
    "MSME registration online", "shop act license", "import export code registration", "POSH compliance training",
    "legal metrology registration", "trademark filing services", "copyright registration",
    
    // Question-Based Keywords (Voice Search)
    "how to register company online", "what is GST registration process", "how to file trademark application",
    "legal requirements for startup", "cost of lawyer consultation", "how to choose a lawyer", "legal documents needed for business",
    
    // Location-Based Keywords
    "lawyers in Mumbai", "legal services Delhi", "best law firm Bangalore", "legal consultation Pune",
    "corporate lawyer Hyderabad", "legal advisor Chennai", "law firm near me", "lawyers in India",
    
    // Legal Tech Keywords
    "AI-powered legal services", "digital legal consultation", "virtual lawyer meeting", "online case management",
    "legal tech platform", "automated legal documents", "smart legal solutions", "legal consultation app",
    
    // Industry-Specific Keywords
    "business law services", "corporate legal advice", "startup legal help", "small business lawyer",
    "legal services for entrepreneurs", "compliance legal services", "regulatory legal advice",
    
    // Trust & Quality Keywords
    "trusted legal services", "experienced lawyers", "qualified legal professionals", "reliable legal advice",
    "expert legal consultation", "certified lawyers", "licensed legal practitioners", "top-rated law firm"
  ].join(", "),
  
  authors: [{ name: "Chahat Siwach" }],
  
  openGraph: {
    title: "Lawgical - Best Legal Services & Online Lawyer Consultation in India",
    description:
      "Get instant access to expert lawyers for company registration, GST services, trademark filing, and comprehensive legal advice. Book your consultation with trusted legal professionals today.",
    type: "website",
    siteName: "Lawgical",
    locale: "en_IN",
    url: "https://lawgical.com",
    image: {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Lawgical - Online Legal Services & Lawyer Consultation Platform"
    },
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Lawgical - Online Legal Services & Expert Lawyer Consultation",
    description: "Connect with qualified lawyers for company registration, legal advice, and comprehensive legal services. Book your consultation instantly.",
    creator: "@chahat_siwach",
    site: "@lawgical_legal",
    image: {
      url: "/twitter-card.jpg",
      alt: "Lawgical Legal Services Platform"
    },
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: { 
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  
  // Additional SEO metadata
  category: "Legal Services",
  classification: "Business",
  creator: "Lawgical Legal Tech",
  publisher: "Lawgical",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Structured data hints
  other: {
    "business:contact_data:street_address": "India",
    "business:contact_data:locality": "Multiple Cities",
    "business:contact_data:country_name": "India",
    "application-name": "Lawgical",
    "mobile-web-app-capable": "yes",
    "mobile-web-app-status-bar-style": "default",
    "theme-color": "#2563eb",
  },
  
  // Canonical URL
  alternates: {
    canonical: "https://lawgical.com",
  },
  
  // Verification tags
  verification: {
    google: "QYcBwyVDXGDlSSxuYbzHmLRiUrofznU8LHBS9ZTUUqI", // Google Search Console
    bing: "1CCF3565C81789FD267302CF040AA5F0", // Bing Webmaster Tools
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google and Bing Verification Tags */}
        <meta name="google-site-verification" content="QYcBwyVDXGDlSSxuYbzHmLRiUrofznU8LHBS9ZTUUqI" />
        <meta name="msvalidate.01" content="1CCF3565C81789FD267302CF040AA5F0" />

        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://personalize.relevic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external scripts */}
        <link rel="dns-prefetch" href="//js.hs-scripts.com" />
        <link rel="dns-prefetch" href="//embed.tawk.to" />
        <link rel="dns-prefetch" href="//cdn.segment.com" />
        
        {/* Animate.css with proper integrity */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          integrity="sha384-3c1c4c9edb0c6cb900388053b9dbf5f7d59e0f601bd14adfddefc0f580adf7c8"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
        {/* Schema.org structured data for legal services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              "name": "Lawgical",
              "description": "Professional legal services including company registration, GST services, trademark filing, and expert lawyer consultation",
              "url": "https://lawgical.com",
              "logo": "https://lawgical.com/logo.png",
              "image": "https://lawgical.com/og-image.jpg",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "serviceType": [
                "Legal Consultation",
                "Company Registration",
                "GST Registration",
                "Trademark Registration",
                "Legal Compliance",
                "Business Law Advisory"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Legal Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Online Lawyer Consultation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Company Registration"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "GST Registration & Returns"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "500"
              }
            })
          }}
        />
      </head>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-4H1WL5DLNM" />

        <Script
          id="segment-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="PyMX8kMqFLV9aHo7i6k6oFgcDzmntCjT";analytics.SNIPPET_VERSION="5.2.0";analytics.load("PyMX8kMqFLV9aHo7i6k6oFgcDzmntCjT");analytics.page();}}();`,
          }}
        />

        <Script
          id="hubspot-loader"
          strategy="afterInteractive"
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
        
        <Script src="//js-na2.hsforms.net/forms/embed/v2.js" strategy="afterInteractive" />
        
        <Script
          id="hubspot-form"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener("load", function () {
                if (window.hbspt) {
                  hbspt.forms.create({
                    portalId: "242916761",
                    formId: "de9a963c-ebaf-4883-99c1-535d3f19fac1",
                    region: "na2",
                    target: "#hubspot-form-container"
                  });
                }
              });
            `,
          }}
        />

        <Script
          id="relevic-anti-flicker"
          strategy="beforeInteractive"
          src="https://personalize.relevic.com/workspaces/anti-flicker/686cec69f6c7cf4012717161.js"
          data-relevic-id="anti-flicker"
          data-relevic-anti-flicker-background="rgba(255, 255, 255, 1)"
          type="text/javascript"
        />

        <Script
          id="relevic-script"
          strategy="afterInteractive"
          src="https://personalize.relevic.com/workspaces/686cec69f6c7cf4012717161.js"
          data-relevic-script="686cec69f6c7cf4012717161"
          type="text/javascript"
          async
        />

        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6877a38b63bcc7190cb0179a/1j09ldn1b';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
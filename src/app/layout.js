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
  title: "Lawgical - Best Legal Services & Online Lawyer Consultation India | Expert Legal Advice",
  description:
    "India's leading legal platform connecting you with verified lawyers across Mumbai, Delhi, Bangalore, Pune, Chennai, Hyderabad. Get instant online consultation, company registration, GST services, trademark filing & comprehensive legal solutions. 24/7 expert legal advice starting at ₹499.",
  keywords: [
    // Primary Brand Keywords
    "lawgical", "lawgical india", "lawgical legal services", "lawgical lawyer consultation",
    
    // Core Legal Services
    "online lawyer consultation india", "best lawyers in india", "legal consultation online", "lawyer booking app",
    "legal services near me", "virtual lawyer meeting", "instant legal advice", "affordable legal consultation",
    
    // City-Specific Keywords (Major Indian Cities)
    "lawyers in mumbai", "legal services delhi ncr", "best law firm bangalore", "lawyers in pune",
    "legal consultation chennai", "corporate lawyers hyderabad", "legal services kolkata", 
    "lawyers in ahmedabad", "legal services noida", "lawyers in gurgaon", "legal services faridabad",
    "lawyers in thane", "legal services navi mumbai", "lawyers in ghaziabad", "legal services lucknow",
    
    // Business Legal Services
    "company registration online india", "private limited company registration", "llp registration online",
    "one person company registration", "startup registration india", "business incorporation services",
    "GST registration online", "GST return filing services", "GST compliance consultant",
    
    // IP & Trademark Services
    "trademark registration india", "copyright registration online", "patent filing services",
    "brand registration india", "logo trademark registration", "intellectual property lawyer",
    
    // Compliance Services  
    "FSSAI license registration", "ISO certification consultant", "MSME udyam registration",
    "shop act license online", "labour license registration", "ESI PF registration",
    "import export code registration", "digital signature certificate", "POSH compliance training",
    
    // Legal Specializations
    "corporate lawyer consultation", "employment law advice", "contract drafting services",
    "legal notice drafting", "divorce lawyer consultation", "property lawyer advice",
    "criminal lawyer consultation", "family law services", "immigration lawyer india",
    "tax lawyer consultation", "banking law services", "insurance law advice",
    
    // Long-tail Service Keywords
    "how to register company in india online", "GST registration process and documents",
    "trademark application filing procedure", "legal requirements for startup india",
    "cost of lawyer consultation in india", "best online legal platform india",
    "legal documents preparation online", "business legal compliance checklist",
    
    // Technology & Innovation
    "AI powered legal services", "digital legal consultation platform", "legal tech india",
    "automated legal document generation", "smart legal solutions", "legal consultation app",
    "online case management system", "virtual legal services",
    
    // Trust & Quality Indicators
    "verified lawyers india", "licensed legal professionals", "experienced legal consultants",
    "trusted legal service provider", "certified lawyers online", "reliable legal advice platform",
    "top rated law firm india", "expert legal consultation services",
    
    // Regional Language Support
    "hindi legal consultation", "regional language legal services", "local lawyer consultation",
    "multilingual legal support", "vernacular legal advice",
    
    // Industry Specific
    "startup legal services india", "small business legal help", "ecommerce legal services",
    "fintech legal compliance", "healthcare legal services", "real estate legal advice",
    "manufacturing legal services", "retail legal compliance"
  ].join(", "),
  
  authors: [{ name: "Chahat Siwach", url: "https://www.lawgical.tech/about" }],
  generator: "Next.js",
  applicationName: "Lawgical Legal Platform",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  creator: "Lawgical Legal Tech",
  publisher: "Lawgical",
  
  openGraph: {
    title: "Lawgical - India's Leading Online Legal Services & Lawyer Consultation Platform",
    description:
      "Connect with 10,000+ verified lawyers across 50+ Indian cities. Get instant legal consultation, company registration, GST services, trademark filing. Trusted by 1 lakh+ clients. Book consultation starting ₹499.",
    type: "website",
    siteName: "Lawgical",
    locale: "en_IN",
    url: "https://www.lawgical.tech",
    countryName: "India",
    images: [
      {
        url: "https://www.lawgical.tech/og-image-main.jpg",
        width: 1200,
        height: 630,
        alt: "Lawgical - Online Legal Services & Lawyer Consultation Platform India"
      },
      {
        url: "https://www.lawgical.tech/og-image-services.jpg", 
        width: 1200,
        height: 630,
        alt: "Legal Services - Company Registration, GST, Trademark Filing"
      }
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Lawgical - Online Legal Services & Expert Lawyer Consultation India",
    description: "India's most trusted legal platform. 10K+ verified lawyers, 50+ cities, instant consultation. Company registration, GST, trademarks & more. Book now ₹499+",
    creator: "@chahat_siwach",
    site: "@lawgical_legal",
    images: [
      {
        url: "https://www.lawgical.tech/twitter-card-main.jpg",
        alt: "Lawgical Legal Services Platform India",
        width: 1200,
        height: 630,
      }
    ],
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: { 
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" }
    ],
    shortcut: "/favicon-16x16.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2563eb" }
    ]
  },
  
  manifest: "/site.webmanifest",
  
  // Enhanced SEO metadata
  category: "Legal Services",
  classification: "Professional Services",
  coverage: "India",
  distribution: "India",
  rating: "General",
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Geographic and Business metadata
  other: {
    "geo.region": "IN",
    "geo.country": "India", 
    "geo.placename": "India",
    "ICBM": "20.5937,78.9629", // Geographic center of India
    "DC.title": "Lawgical - Online Legal Services India",
    "DC.creator": "Lawgical Legal Tech",
    "DC.subject": "Legal Services, Lawyer Consultation, Company Registration",
    "DC.description": "Professional legal services platform connecting clients with verified lawyers across India",
    "DC.publisher": "Lawgical",
    "DC.contributor": "Legal Professionals Network",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.identifier": "https://www.lawgical.tech",
    "DC.source": "https://www.lawgical.tech",
    "DC.language": "en-IN",
    "DC.coverage": "India",
    "DC.rights": "Copyright Lawgical Legal Tech Pvt Ltd",
    
    // Business Information
    "business:contact_data:street_address": "India",
    "business:contact_data:locality": "Multiple Cities", 
    "business:contact_data:region": "PAN India",
    "business:contact_data:postal_code": "Various",
    "business:contact_data:country_name": "India",
    
    // App Information
    "application-name": "Lawgical",
    "mobile-web-app-capable": "yes",
    "mobile-web-app-status-bar-style": "default",
    "mobile-web-app-title": "Lawgical",
    "theme-color": "#2563eb",
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml",
    
    // Social Media
    "fb:app_id": "your_facebook_app_id", // Add your Facebook App ID
    "og:email": "support@lawgical.tech",
    "og:phone_number": "+918383801899", // Add your phone number
    
    // Additional SEO
    "revisit-after": "1 days",
    "distribution": "global",
    "rating": "general",
    "doc-class": "Living Document",
    "doc-rights": "Copywritten Work",
    "doc-type": "Public",
  },
  
  // Canonical and alternate URLs
  alternates: {
    canonical: "https://www.lawgical.tech",
    languages: {
      'en-IN': 'https://www.lawgical.tech',
      'hi-IN': 'https://www.lawgical.tech/hi', // If you have Hindi version
    },
    types: {
      'application/rss+xml': [
        { url: 'https://www.lawgical.tech/rss.xml', title: 'Lawgical Legal Updates' }
      ],
    },
  },
  
  // Search Engine Verification
  verification: {
    google: "QYcBwyVDXGDlSSxuYbzHmLRiUrofznU8LHBS9ZTUUqI",
    bing: "1CCF3565C81789FD267302CF040AA5F0",
   
  },
  
  // Archives and sitemap
  archives: ['https://www.lawgical.tech/archive'],
  assets: ['https://www.lawgical.tech/assets'],
  bookmarks: ['https://www.lawgical.tech/bookmarks'],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  minimumScale: 1,
  userScalable: true, // Enable for accessibility
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" }
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TSVBZ4FD');`,
          }}
        />

        {/* Enhanced Meta Tags */}
        <meta name="google-site-verification" content="QYcBwyVDXGDlSSxuYbzHmLRiUrofznU8LHBS9ZTUUqI" />
        <meta name="msvalidate.01" content="1CCF3565C81789FD267302CF040AA5F0" />
        
        {/* Geographic Targeting */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="geo.placename" content="India" />
        <meta name="ICBM" content="20.5937,78.9629" />
        
        {/* Enhanced Performance */}
        <link rel="preconnect" href="https://personalize.relevic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS prefetch for external scripts */}
        <link rel="dns-prefetch" href="//js.hs-scripts.com" />
        <link rel="dns-prefetch" href="//embed.tawk.to" />
        <link rel="dns-prefetch" href="//cdn.segment.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        
        {/* Resource hints for better performance */}
        <link rel="prefetch" href="/sitemap.xml" />
        <link rel="prefetch" href="/robots.txt" />
        
        {/* Animate.css with proper integrity */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          integrity="sha384-3c1c4c9edb0c6cb900388053b9dbf5f7d59e0f601bd14adfddefc0f580adf7c8"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
        {/* Enhanced Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              "name": "Lawgical",
              "alternateName": "Lawgical Legal Services",
              "description": "India's leading online legal services platform providing expert lawyer consultation, company registration, GST services, and comprehensive legal solutions",
              "url": "https://www.lawgical.tech",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.lawgical.tech/logo.png",
                "width": 512,
                "height": 512
              },
              "image": [
                "https://www.lawgical.tech/og-image-main.jpg",
                "https://www.lawgical.tech/logo.png"
              ],
              "telephone": "+91-8383801899",
              "email": "support@lawgical.tech",
              "priceRange": "₹₹-₹₹₹",
              "currenciesAccepted": "INR",
              "paymentAccepted": ["Cash", "Credit Card", "UPI", "Net Banking", "Wallet"],
              
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "Multiple States",
                "addressLocality": "Pan India Service"
              },
              
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 20.5937,
                "longitude": 78.9629
              },
              
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "India"
                },
                {
                  "@type": "State",
                  "name": "Maharashtra"
                },
                {
                  "@type": "State", 
                  "name": "Delhi"
                },
                {
                  "@type": "State",
                  "name": "Karnataka"
                },
                {
                  "@type": "State",
                  "name": "Delhi NCR"
                },
                {
                  "@type": "State",
                  "name": "Haryana"
                },
                {
                  "@type": "State",
                  "name": "West Bengal"
                },
                {
                  "@type": "State",
                  "name": "Gujarat"
                },
                {
                  "@type": "State",
                  "name": "Uttar Pradesh"
                }
              ],
              
              "serviceType": [
                "Online Lawyer Consultation",
                "Company Registration",
                "GST Registration & Compliance", 
                "Trademark Registration",
                "Legal Document Preparation",
                "Corporate Law Advisory",
                "Intellectual Property Services",
                "Compliance & Regulatory Services",
                "Contract Drafting & Review",
                "Legal Notice Services"
              ],
              
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Legal Services Catalog",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Online Lawyer Consultation",
                      "description": "Expert legal consultation with verified lawyers"
                    },
                    "price": "499",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Private Limited Company Registration",
                      "description": "Complete company incorporation services"
                    },
                    "price": "6999",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "GST Registration",
                      "description": "GST registration and compliance services"
                    },
                    "price": "2999",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Trademark Registration",
                      "description": "Complete trademark filing and registration"
                    },
                    "price": "4999",
                    "priceCurrency": "INR", 
                    "availability": "https://schema.org/InStock"
                  }
                ]
              },
              
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2500",
                "bestRating": "5",
                "worstRating": "1"
              },
              
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating", 
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Priya Sharma"
                  },
                  "reviewBody": "Excellent legal services. Quick company registration process with expert guidance."
                }
              ],
              
              "sameAs": [
                "https://www.facebook.com/lawgical",
                "https://www.twitter.com/lawgical_legal", 
                "https://www.linkedin.com/company/lawgical",
                "https://www.instagram.com/lawgical_legal",
                "https://www.youtube.com/@lawgical"
              ],
              
              "foundingDate": "2020",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": "500+"
              },
              
              "knowsAbout": [
                "Corporate Law",
                "Business Registration",
                "Tax Law", 
                "Intellectual Property",
                "Employment Law",
                "Contract Law",
                "Compliance",
                "Regulatory Affairs"
              ],
              
              "memberOf": {
                "@type": "Organization",
                "name": "Bar Council of India"
              }
            })
          }}
        />

        {/* Additional Schema for Local Business (if applicable) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Lawgical Legal Tech ",
              "url": "https://www.lawgical.tech",
              "logo": "https://www.lawgical.tech/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-8383801899",
                "contactType": "Customer Service",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
              },
              "founder": {
                "@type": "Person",
                "name": "Chahat Siwach"
              }
            })
          }}
        />

        {/* FAQ Schema (add your common FAQs) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How can I book a lawyer consultation online?",
                  "acceptedAnswer": {
                    "@type": "Answer", 
                    "text": "You can book a lawyer consultation on Lawgical by selecting your legal issue, choosing from verified lawyers, and booking an instant consultation starting at ₹499."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What legal services does Lawgical provide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Lawgical provides comprehensive legal services including online lawyer consultation, company registration, GST services, trademark filing, legal document preparation, and compliance services across India."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does company registration cost?", 
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Company registration through Lawgical starts from ₹6,999 for Private Limited Company registration, including all government fees and professional charges."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is online legal consultation legally valid?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, online legal consultations are legally valid. Our lawyers are licensed professionals registered with Bar Council of India and provide authentic legal advice."
                  }
                }
              ]
            })
          }}
        />
      </head>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TSVBZ4FD"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>

        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* Analytics & Tracking */}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-4H1WL5DLNM" />

        {/* Enhanced Segment Analytics */}
        <Script
          id="segment-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="PyMX8kMqFLV9aHo7i6k6oFgcDzmntCjT";analytics.SNIPPET_VERSION="5.2.0";analytics.load("PyMX8kMqFLV9aHo7i6k6oFgcDzmntCjT");analytics.page();}}();`,
          }}
        />

        {/* HubSpot Integration */}
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

        {/* Relevic Personalization */}
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

        {/* Tawk.to Chat */}
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

        {/* Error Tracking (optional - add your preferred service) */}
        <Script
          id="error-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (window.gtag) {
                  gtag('event', 'exception', {
                    'description': e.error ? e.error.stack : e.message,
                    'fatal': false
                  });
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
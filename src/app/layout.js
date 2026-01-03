import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import Image from "next/image";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "Lawgical - Top Legal Services, Company Incorporation & GST Registration in Delhi NCR",
  description:
    "Delhi NCR's trusted legal-tech platform for lawyer consultation, company incorporation, GST registration. Verified lawyers in Delhi, Noida, Gurgaon. Starts at ₹499.",
  keywords: [
    "legal services delhi ncr", "lawyers delhi ncr", "best lawyers in delhi", "legal consultation delhi",
    "company incorporation delhi ncr", "private limited company registration delhi", "business registration delhi",
    "gst registration delhi ncr", "online gst registration delhi", "gst compliance delhi",
    "lawyer consultation delhi", "corporate lawyers delhi", "trademark registration delhi",
    "online lawyer consultation delhi ncr", "best law firm delhi", "legal services near me delhi",
    "virtual lawyer meeting delhi", "instant legal advice delhi", "affordable legal consultation delhi ncr",
    "company registration online delhi", "llp registration delhi", "one person company delhi",
    "startup registration delhi ncr", "business incorporation services delhi", "how to register company in delhi",
    "gst registration process delhi", "gst return filing delhi", "gst consultant delhi ncr",
    "fssai license delhi", "msme registration delhi", "import export code delhi",
    "corporate lawyer delhi", "employment law delhi", "contract drafting delhi",
    "divorce lawyer delhi", "property lawyer delhi ncr", "criminal lawyer delhi",
    "family law services delhi", "tax lawyer delhi", "immigration lawyer delhi",
    "best company incorporation services in delhi ncr", "gst registration fees and documents delhi",
    "online lawyer for company registration delhi", "verified lawyers for gst compliance delhi",
    "cost of lawyer consultation in delhi ncr", "legal documents preparation delhi",
    "business legal compliance checklist delhi", "trademark filing procedure delhi",
    "verified lawyers delhi ncr", "licensed legal professionals delhi", "experienced legal consultants delhi",
    "trusted legal service provider delhi", "top rated law firm delhi ncr", "expert legal consultation delhi",
    "lawyers in noida", "legal services gurgaon", "law firm ghaziabad", "lawyers in faridabad",
    "legal consultation greater noida", "corporate lawyers in gurgaon"
  ].join(", "),

  authors: [{ name: "Chahat Siwach", url: "https://www.lawgical.tech/aboutus" }],
  generator: "Next.js",
  applicationName: "Lawgical Legal Platform",
  referrer: "origin-when-cross-origin",
  creator: "Lawgical Legal Tech",
  publisher: "Lawgical",

  openGraph: {
    title: "Lawgical - Expert Legal Services & Lawyer Consultation in Delhi NCR",
    description:
      "Connect with verified lawyers in Delhi NCR for company incorporation, GST registration, and legal consultation. Trusted by 50K+ clients. Book now starting at ₹499.",
    type: "website",
    siteName: "Lawgical",
    locale: "en_IN",
    url: "https://www.lawgical.tech",
    countryName: "India",
    images: [
      {
        url: "https://www.lawgical.tech/og-image-delhi-ncr.jpg",
        width: 1200,
        height: 630,
        alt: "Lawgical - Legal Services, Company Incorporation & GST Registration in Delhi NCR",
        type: "image/jpeg"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Lawgical - Legal Services & Lawyer Consultation in Delhi NCR",
    description: "Top legal platform in Delhi NCR for company incorporation, GST registration, and expert lawyer consultation. Starts at ₹499. Trusted by 50K+ clients.",
    creator: "@chahat_siwach",
    site: "@lawgical_legal",
    images: [
      {
        url: "https://www.lawgical.tech/twitter-card-delhi-ncr.jpg",
        alt: "Lawgical Legal Services in Delhi NCR",
        width: 1200,
        height: 630
      }
    ]
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
      'max-snippet': -1
    }
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

  category: "Legal Services",
  classification: "Professional Services",
  coverage: "Delhi NCR",
  distribution: "India",
  rating: "General",

  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },

  other: {
    "geo.region": "IN-DL",
    "geo.country": "India",
    "geo.placename": "Delhi NCR",
    "ICBM": "28.6139,77.2090",
    "DC.title": "Lawgical - Legal Services in Delhi NCR",
    "DC.creator": "Lawgical Legal Tech",
    "DC.subject": "Legal Services Delhi NCR, Company Incorporation, GST Registration",
    "DC.description": "Expert legal services in Delhi NCR including lawyer consultation, company incorporation, and GST registration",
    "DC.publisher": "Lawgical",
    "DC.contributor": "Legal Professionals Network Delhi NCR",
    "DC.date": new Date().toISOString(),
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.identifier": "https://www.lawgical.tech",
    "DC.source": "https://www.lawgical.tech",
    "DC.language": "en-IN",
    "DC.coverage": "Delhi NCR",
    "DC.rights": "Copyright Lawgical Legal Tech Pvt Ltd",
    "business:contact_data:street_address": "Delhi NCR",
    "business:contact_data:locality": "Delhi, Noida, Gurgaon",
    "business:contact_data:region": "Delhi NCR",
    "business:contact_data:postal_code": "110001",
    "business:contact_data:country_name": "India",
    "application-name": "Lawgical",
    "mobile-web-app-capable": "yes",
    "mobile-web-app-status-bar-style": "default",
    "mobile-web-app-title": "Lawgical",
    "theme-color": "#2563eb",
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml",
    "fb:app_id": "1121918703374207",
    "og:email": "support@lawgical.tech",
    "og:phone_number": "+918383801899",
    "revisit-after": "1 days",
    "distribution": "global",
    "rating": "general",
    "doc-class": "Living Document",
    "doc-rights": "Copywritten Work",
    "doc-type": "Public"
  },

  alternates: {
    canonical: "https://www.lawgical.tech",
    languages: {
      'en-IN': 'https://www.lawgical.tech',
      'hi-IN': 'https://www.lawgical.tech/hi'
    },
    types: {
      'application/rss+xml': [
        { url: 'https://www.lawgical.tech/rss.xml', title: 'Lawgical Legal Updates Delhi NCR' }
      ]
    }
  },

  verification: {
    google: "QYcBwyVDXGDlSSxuYbzHmLRiUrofznU8LHBS9ZTUUqI",
    bing: "1CCF3565C81789FD267302CF040AA5F0"
  },

  archives: ['https://www.lawgical.tech/archive'],
  assets: ['https://www.lawgical.tech/assets'],
  bookmarks: ['https://www.lawgical.tech/bookmarks']
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" }
  ]
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
            })(window,document,'script','dataLayer','GTM-TSVBZ4FD');`
          }}
        />

        {/* Facebook Pixel Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '1121918703374207'); fbq('track', 'PageView');`
          }}
        />

        {/* Enhanced Meta Tags */}
        <meta name="google-site-verification" content="QYcBwyVDXGDlSSxuYbzHmLRiUrofznU8LHBS9ZTUUqI" />
        <meta name="msvalidate.01" content="1CCF3565C81789FD267302CF040AA5F0" />

        {/* Geographic Targeting (Delhi NCR) */}
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.country" content="India" />
        <meta name="geo.placename" content="Delhi NCR" />
        <meta name="ICBM" content="28.6139,77.2090" />

        {/* Enhanced Performance */}
        <link rel="preconnect" href="https://personalize.relevic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />

        {/* DNS prefetch for external scripts */}
        <link rel="dns-prefetch" href="//js.hs-scripts.com" />
        <link rel="dns-prefetch" href="//cdn.segment.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />

        {/* Resource hints */}
        <link rel="prefetch" href="/sitemap.xml" />
        <link rel="prefetch" href="/robots.txt" />

        {/* Animate.css */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          integrity="sha384-3c1c4c9edb0c6cb900388053b9dbf5f7d59e0f601bd14adfddefc0f580adf7c8"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* LegalService Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              "@id": "https://www.lawgical.tech/#legal-service",
              "name": "Lawgical",
              "alternateName": "Lawgical Legal Services Delhi NCR",
              "description": "Delhi NCR's premier legal-tech platform offering lawyer consultation, company incorporation, GST registration, and comprehensive legal solutions.",
              "url": "https://www.lawgical.tech",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.lawgical.tech/logo.png",
                "width": 512,
                "height": 512
              },
              "image": [
                "https://www.lawgical.tech/og-image-delhi-ncr.jpg"
              ],
              "telephone": "+91-8383801899",
              "email": "support@lawgical.tech",
              "priceRange": "₹₹-₹₹₹",
              "currenciesAccepted": "INR",
              "paymentAccepted": ["Cash", "Credit Card", "UPI", "Net Banking", "Wallet"],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "Delhi NCR",
                "addressLocality": "Delhi, Noida, Gurgaon",
                "postalCode": "110001"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.6139,
                "longitude": 77.2090
              },
              "areaServed": [
                {
                  "@type": "AdministrativeArea",
                  "name": "Delhi NCR"
                },
                {
                  "@type": "City",
                  "name": "Delhi"
                },
                {
                  "@type": "City",
                  "name": "Noida"
                },
                {
                  "@type": "City",
                  "name": "Gurgaon"
                },
                {
                  "@type": "City",
                  "name": "Ghaziabad"
                },
                {
                  "@type": "City",
                  "name": "Faridabad"
                }
              ],
              "serviceType": [
                "Online Lawyer Consultation Delhi NCR",
                "Company Incorporation Delhi",
                "GST Registration Delhi NCR",
                "Trademark Registration Delhi",
                "Legal Document Preparation Delhi",
                "Corporate Law Advisory Delhi NCR",
                "Compliance & Regulatory Services Delhi"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Legal Services Catalog Delhi NCR",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Online Lawyer Consultation Delhi NCR",
                      "description": "Expert legal consultation with verified lawyers in Delhi NCR"
                    },
                    "price": "499",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Private Limited Company Incorporation Delhi",
                      "description": "Complete company incorporation services in Delhi NCR"
                    },
                    "price": "6999",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "GST Registration Delhi NCR",
                      "description": "GST registration and compliance services in Delhi"
                    },
                    "price": "2999",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Trademark Registration Delhi",
                      "description": "Complete trademark filing and registration in Delhi NCR"
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
                  "reviewBody": "Excellent legal services in Delhi NCR. Quick company incorporation with expert guidance."
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/lawgicaltech/",
                "https://www.twitter.com/lawgical_legal",
                "https://www.facebook.com/lawgical",
                "https://www.instagram.com/lawgical_legal",
                "https://www.youtube.com/@lawgical"
              ],
              "foundingDate": "2020",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": "11-50"
              },
              "knowsAbout": [
                "Corporate Law Delhi NCR",
                "Business Registration Delhi",
                "Tax Law Delhi",
                "Intellectual Property Delhi",
                "Employment Law Delhi NCR",
                "Contract Law Delhi",
                "Compliance Delhi",
                "Regulatory Affairs Delhi NCR"
              ],
              "memberOf": {
                "@type": "Organization",
                "name": "Bar Council of Delhi"
              }
            })
          }}
        />

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.lawgical.tech/#local-business",
              "name": "Lawgical Legal Tech Delhi NCR",
              "url": "https://www.lawgical.tech",
              "logo": "https://www.lawgical.tech/logo.png",
              "description": "Leading legal services provider in Delhi NCR specializing in company incorporation, GST registration, and lawyer consultations",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Delhi NCR",
                "addressLocality": "Delhi",
                "addressRegion": "Delhi NCR",
                "postalCode": "110001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.6139,
                "longitude": 77.2090
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "21:00"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-8383801899",
                "contactType": "Customer Service",
                "areaServed": "Delhi NCR",
                "availableLanguage": ["English", "Hindi"]
              },
              "priceRange": "₹₹-₹₹₹"
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How to book a lawyer consultation in Delhi NCR?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Book instant lawyer consultation on Lawgical for Delhi NCR. Select your legal issue, choose verified lawyers in Delhi, Noida, Gurgaon, starting at ₹499."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the process for company incorporation in Delhi NCR?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Lawgical handles complete company incorporation in Delhi NCR, including Pvt Ltd registration. Documents, filing, and compliance starting from ₹6,999."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does GST registration cost in Delhi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "GST registration in Delhi through Lawgical starts at ₹2,999, including application, verification, and certificate issuance within 7 days."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are online legal services valid in Delhi NCR?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Lawgical's online legal consultations are fully valid in Delhi NCR. Our lawyers are Bar Council registered and provide authentic advice."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Best lawyers for GST compliance in Delhi NCR?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Connect with top GST experts on Lawgical for Delhi NCR. Get compliance, return filing, and advisory services from verified professionals."
                  }
                }
              ]
            })
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TSVBZ4FD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <noscript>
          <Image
            height={1}
            width={1}
            alt="Facebook Pixel"
            src="https://www.facebook.com/tr?id=1121918703374207&ev=PageView&noscript=1"
            style={{ display: 'none' }}
            unoptimized
            priority
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

        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-4H1WL5DLNM" />

        <Script
          id="segment-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="PyMX8kMqFLV9aHo7i6k6oFgcDzmntCjT";analytics.SNIPPET_VERSION="5.2.0";analytics.load("PyMX8kMqFLV9aHo7i6k6oFgcDzmntCjT");analytics.page();}}();`
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
            `
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
            `
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
            `
          }}
        />
      </body>
    </html>
  );
}
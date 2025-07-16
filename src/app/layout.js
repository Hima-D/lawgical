// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "Lawgical - Legal Services & Case Management",
  description:
    "Lawgical connects clients with legal professionals. Manage cases, discussions, and access trusted legal services.",
  keywords:
    "lawgical, lawyer, legal services, case management, legal portal, lawyer portal, legal advice, law firm",
  authors: [{ name: "Chahat Siwach" }],
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
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className="light">
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

        {/* HubSpot Loader */}
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

        {/* HubSpot Form Embed Script */}
        <Script src="//js-na2.hsforms.net/forms/embed/v2.js" strategy="afterInteractive" />

        {/* HubSpot Form Creation */}
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

        {/* Segment Analytics */}
        <Script
          id="segment-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="PyMX8kMqFLV9aHo7i6k6oFgcDzmntCjT";analytics.SNIPPET_VERSION="5.2.0";
              analytics.load("PyMX8kMqFLV9aHo7i6k6oFgcDzmntCjT");
              analytics.page();
              }}();
            `,
          }}
        />

        {/* Relevic Scripts */}
        <link rel="preconnect" href="https://personalize.relevic.com" />
        <Script
          id="relevic-anti-flicker"
          strategy="afterInteractive"
          src="https://personalize.relevic.com/workspaces/anti-flicker/686cec69f6c7cf4012717161.js"
          data-relevic-id="anti-flicker"
          data-relevic-anti-flicker-background="transparent"
        />
        <script
          data-relevic-script="686cec69f6c7cf4012717161"
          src="https://personalize.relevic.com/workspaces/686cec69f6c7cf4012717161.js"
          type="text/javascript"
          async
        ></script>

        {/* Animate.css CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          integrity="sha384-3c1c4c9edb0c6cb900388053b9dbf5f7d59e0f601bd14adfddefc0f580adf7c8"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </body>
    </html>
  );
}

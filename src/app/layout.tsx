import type { Metadata } from "next";
import Script from "next/script"; // Import the Next.js Script component
import "./globals.css";

export const metadata: Metadata = {
  title: "LaunchPit Agency",
  description: "Growth Marketing That Actually Scales Your Business",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/2026/03/favicon.png",
    shortcut: "/images/2026/03/favicon.png",
    apple: "/images/2026/03/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;700;900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* 1. Google Tag Manager - Head Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T64NSQGC');
            `,
          }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased">
        {/* 2. Google Tag Manager (noscript) - Body Fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T64NSQGC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

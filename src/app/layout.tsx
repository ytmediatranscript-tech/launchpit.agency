import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaunchPit Agency | Growth Marketing That Actually Scales Your Business",
  description: "From Google/Meta Ads and SEO to social media management and video production, we create cohesive digital strategies to generate consistent leads and sales.",
  icons: {
    icon: "/images/2026/03/favicon.png",
    shortcut: "/images/2026/03/favicon.png",
    apple: "/images/2026/03/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;700;900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

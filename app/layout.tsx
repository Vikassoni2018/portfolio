import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/Analytics";
import {
  bingSiteVerification,
  googleSiteVerification,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl
} from "@/lib/site";
import "./globals.css";

const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "400 800",
  variable: "--font-jakarta",
  display: "swap"
});
const space = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  weight: "500 700",
  variable: "--font-space",
  display: "swap"
});
const mono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "400 700",
  variable: "--font-mono",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Vikas Soni Portfolio",
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  keywords: [
    "Vikas Soni",
    "Vikas Soni portfolio",
    "Shopify developer",
    "Shopify app developer",
    "Shopify cross selling",
    "Shopify Discount APIs",
    "Shopify store boost JSON-LD",
    "Shopify store creation",
    "Shopify theme developer",
    "Laravel developer",
    "PHP developer",
    "Symfony developer",
    "Node.js developer",
    "React Next.js developer",
    "full stack developer",
    "eCommerce developer",
    "GEO AEO LLMO AIO SEO",
    "India"
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Technology",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteUrl,
    types: {
      "text/markdown": [
        { url: "/llms.txt", title: "Vikas Soni — LLM & GEO Context Index" },
        { url: "/llms-full.txt", title: "Vikas Soni — Full Portfolio & Case Studies Markdown" }
      ]
    }
  },
  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    ...(bingSiteVerification ? { other: { "msvalidate.01": bingSiteVerification } } : {})
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-clean.png", width: 1200, height: 630, alt: "Vikas Soni portfolio" }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-clean.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${space.variable} ${mono.variable}`}
    >
      <body className={`${jakarta.className} bg-[#F8FAFC] text-[#0F172A]`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

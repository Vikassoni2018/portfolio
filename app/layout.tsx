import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { GlobalScroll3DBackground } from "@/components/GlobalScroll3DBackground";
import {
  bingSiteVerification,
  googleSiteVerification,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl
} from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#2563eb",
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
    "Shopify expert",
    "Shopify app developer",
    "Shopify theme developer",
    "Laravel developer",
    "PHP developer",
    "Symfony developer",
    "full stack developer",
    "web developer",
    "eCommerce developer",
    "India"
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Technology",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteUrl
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
    <html lang="en">
      <body className={inter.className}>
        {/* Scroll-driven 3D scene, fixed behind every page in the site. */}
        <GlobalScroll3DBackground />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

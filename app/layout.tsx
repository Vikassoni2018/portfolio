import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = "https://portfolio-gamma-nine-k29hphsgok.vercel.app";
const title = "Vikas Soni | Shopify & Full Stack Developer";
const description =
  "Vikas Soni is a Shopify expert and full-stack web developer in India specializing in Shopify apps and themes, Laravel, PHP, Symfony, SaaS, and eCommerce.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Vikas Soni Portfolio",
  title: {
    default: title,
    template: "%s | Vikas Soni"
  },
  description,
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
  authors: [{ name: "Vikas Soni", url: siteUrl }],
  creator: "Vikas Soni",
  publisher: "Vikas Soni",
  category: "Technology",
  alternates: {
    canonical: siteUrl
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
    title,
    description,
    url: siteUrl,
    siteName: "Vikas Soni",
    locale: "en_IN",
    type: "website",
    images: [{ url: `${siteUrl}/og-clean.png`, width: 1200, height: 630, alt: "Vikas Soni portfolio" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og-clean.png`]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

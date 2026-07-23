import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = "https://vikas-soni-commerce-portfolio.vikassoni2018.chatgpt.site";
const title = "Vikas Soni | Shopify App & PHP Symfony Developer";
const description =
  "Vikas Soni is a Shopify app and full-stack PHP/Symfony developer in India building SaaS, subscription, payment, GraphQL, and eCommerce solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Vikas Soni"
  },
  description,
  authors: [{ name: "Vikas Soni", url: siteUrl }],
  creator: "Vikas Soni",
  publisher: "Vikas Soni",
  category: "Technology",
  alternates: {
    canonical: "/"
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

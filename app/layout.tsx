import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = "https://vikas-soni-commerce-portfolio.vikassoni2018.chatgpt.site";
const title = "Vikas Soni — Full-Stack Commerce Engineer";
const description =
  "Shopify app developer and full-stack engineer building subscription systems, payment infrastructure, APIs, and scalable commerce products.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
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

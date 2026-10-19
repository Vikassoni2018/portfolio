/**
 * Single source of truth for the public origin.
 *
 * Set NEXT_PUBLIC_SITE_URL once a custom domain is live and every canonical,
 * sitemap entry, OG tag and JSON-LD node follows automatically.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-gamma-nine-k29hphsgok.vercel.app"
).replace(/\/+$/, "");

export const siteName = "Vikas Soni";
export const siteTitle = "Shopify App Developer & Backend Integrations | Vikas Soni";
export const siteDescription =
  "Custom Shopify app development, GraphQL API integrations and PHP/Symfony backends for merchants, agencies and SaaS founders. Discuss your project with Vikas Soni.";

export const linkedinUrl = "https://www.linkedin.com/in/vikas-soni-95a815212/";
export const githubUrl = "";
export const socialImage = { url: "/og-clean.png", width: 1200, height: 630, alt: "Vikas Soni — Shopify apps and backend development" };

/** Every profile that belongs in the Person `sameAs` graph. */
export const socialProfiles = [linkedinUrl, githubUrl].filter(Boolean);

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

/** Search-console / analytics ids. Empty means the tag is simply not rendered. */
export const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";
export const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "";

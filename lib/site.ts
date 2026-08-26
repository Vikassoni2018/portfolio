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
export const siteTitle = "Vikas Soni | Shopify & Full Stack Developer";
export const siteDescription =
  "Vikas Soni is a Shopify expert and full-stack web developer in India specializing in Shopify apps and themes, Laravel, PHP, Symfony, SaaS, and eCommerce.";

export const linkedinUrl = "https://www.linkedin.com/in/vikas-soni-95a815212/";
export const githubUrl = "";

/** Every profile that belongs in the Person `sameAs` graph. */
export const socialProfiles = [linkedinUrl, githubUrl].filter(Boolean);

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

/** Search-console / analytics ids. Empty means the tag is simply not rendered. */
export const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";
export const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "";

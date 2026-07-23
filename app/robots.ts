import type { MetadataRoute } from "next";

const siteUrl = "https://vikas-soni-commerce-portfolio.vikassoni2018.chatgpt.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/"
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}

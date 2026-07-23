import type { MetadataRoute } from "next";

const siteUrl = "https://vikas-soni-commerce-portfolio.vikassoni2018.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}

import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site";

const aiSearchBots = [
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-Web",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot"
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/", "/admin", "/admin/"]
      },
      ...aiSearchBots.map((bot) => ({
        userAgent: bot,
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/", "/admin", "/admin/"]
      }))
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl
  };
}

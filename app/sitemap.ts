import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import projects from "@/data/projects.json";
import { caseStudies } from "@/data/case-studies";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/site";
import { showcasePath, themePhoto, themeRoute, themeStoryPhotoPath, themeThumbnail, themes } from "@/data/showcase";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8 },
    {
      url: absoluteUrl(showcasePath), changeFrequency: "monthly", priority: 0.9,
      images: themes.map((theme) => absoluteUrl(themeThumbnail(theme)))
    },
    ...themes.map((theme) => ({
      url: absoluteUrl(themeRoute(theme.slug)),
      images: [absoluteUrl(themePhoto(theme).src), absoluteUrl(themeStoryPhotoPath(theme))],
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),

    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),

    ...projects.filter((project) => caseStudies[project.id]).map((project) => ({
      url: absoluteUrl(`/projects/${project.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.7
    })),

    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`)
    }))
  ];
}

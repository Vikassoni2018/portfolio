import type { Metadata } from "next";
import { absoluteUrl, siteName } from "@/lib/site";
import type { Crumb } from "@/components/PageShell";
import { showcaseDescription, showcaseImage, showcasePath, showcaseTitle, themeRoute, themeSocialImage, themes, type Theme } from "@/data/showcase";

export const showcaseCrumbs: Crumb[] = [
  { name: "Portfolio", path: "/" },
  { name: "Design Showcase", path: showcasePath }
];

export function showcaseMetadata(theme?: Theme): Metadata {
  const title = theme?.title ?? "Interactive Landing Page Design Showcase";
  const description = theme ? `${theme.description} An interactive portfolio design concept by Vikas Soni for ${theme.industry.toLowerCase()}.` : showcaseDescription;
  const canonical = absoluteUrl(theme ? themeRoute(theme.slug) : showcasePath);
  const image = theme ? themeSocialImage(theme) : showcaseImage;
  const alt = theme ? `${theme.brand} ${theme.name} landing page screenshot` : "Vikas Soni's landing page design showcase";
  return {
    title: { absolute: `${title} | ${siteName}` },
    description,
    alternates: { canonical },
    openGraph: { type: "website", title, description, url: canonical, siteName, images: [{ url: image, width: 1200, height: 630, alt }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image, alt }] }
  };
}

export const gallerySchema = {
  "@type": "CollectionPage",
  name: showcaseTitle,
  description: showcaseDescription,
  url: absoluteUrl(showcasePath),
  primaryImageOfPage: absoluteUrl(showcaseImage),
  mainEntity: {
    "@type": "ItemList",
    itemListElement: themes.map((theme, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: theme.name,
      url: absoluteUrl(themeRoute(theme.slug))
    }))
  }
};

export function conceptSchema(theme: Theme) {
  return {
    "@type": "CreativeWork",
    name: `${theme.brand} — ${theme.name} landing page concept`,
    description: theme.description,
    genre: "Interactive landing page design concept",
    url: absoluteUrl(themeRoute(theme.slug)),
    image: absoluteUrl(themeSocialImage(theme)),
    creator: { "@type": "Person", name: siteName, url: absoluteUrl("/") },
    isPartOf: { "@type": "CollectionPage", url: absoluteUrl(showcasePath) }
  };
}


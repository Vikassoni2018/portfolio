import type { Metadata } from "next";
import { landingPageServicePath } from "@/data/services";
import {
  showcaseDescription, showcaseImage, showcasePath, showcaseTitle,
  themePhoto, themeRoute, themeSocialImage, themeStoryPhotoPath, themeThumbnail, themes, type Theme
} from "@/data/showcase";
import { relatedThemes, themeSearch } from "@/data/showcase-search";
import { stories } from "@/data/showcase-stories";
import { breadcrumbSchema, personId, websiteId } from "@/lib/seo";
import { absoluteUrl, siteName } from "@/lib/site";

export const showcaseCrumbs = [
  { name: "Portfolio", path: "/" },
  { name: "Design Showcase", path: showcasePath }
];

const galleryUrl = absoluteUrl(showcasePath);
const galleryId = `${galleryUrl}#page`;
const author = { "@type": "Person", "@id": personId, name: siteName, url: absoluteUrl("/") };

export function showcaseMetadata(theme?: Theme): Metadata {
  const title = `${theme?.title ?? "Interactive Landing Page Design Examples"} | ${siteName}`;
  const description = theme ? themeSearch[theme.slug].description : showcaseDescription;
  const canonical = theme ? absoluteUrl(themeRoute(theme.slug)) : galleryUrl;
  const image = theme ? themeSocialImage(theme) : showcaseImage;
  const alt = theme ? `${theme.brand} ${theme.name} landing page screenshot` : "Vikas Soni's landing page design showcase";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: { type: "website", title, description, url: canonical, siteName, locale: "en_IN", images: [{ url: image, width: 1200, height: 630, alt }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image, alt }] }
  };
}

export const gallerySchema = [
  { ...breadcrumbSchema(showcaseCrumbs), "@id": `${galleryUrl}#breadcrumbs` },
  {
    "@type": "CollectionPage",
    "@id": galleryId,
    name: showcaseTitle,
    description: showcaseDescription,
    url: galleryUrl,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    breadcrumb: { "@id": `${galleryUrl}#breadcrumbs` },
    relatedLink: absoluteUrl(landingPageServicePath),
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(showcaseImage), width: 1200, height: 630 },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: themes.map((theme, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebPage",
          "@id": `${absoluteUrl(themeRoute(theme.slug))}#page`,
          name: `${theme.name} landing page`,
          url: absoluteUrl(themeRoute(theme.slug)),
          thumbnailUrl: absoluteUrl(themeThumbnail(theme))
        }
      }))
    }
  }
];

export function conceptSchema(theme: Theme) {
  const path = themeRoute(theme.slug);
  const url = absoluteUrl(path);
  const breadcrumbId = `${url}#breadcrumbs`;
  const workId = `${url}#concept`;
  const descriptions = themeSearch[theme.slug];
  const hero = themePhoto(theme);
  const photos = [
    { "@type": "ImageObject", url: absoluteUrl(hero.src), caption: hero.alt },
    { "@type": "ImageObject", url: absoluteUrl(themeStoryPhotoPath(theme)), caption: stories[theme.slug].alt }
  ];

  return [
    { ...breadcrumbSchema([...showcaseCrumbs, { name: theme.name, path }]), "@id": breadcrumbId },
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      name: theme.title,
      description: descriptions.description,
      url,
      inLanguage: "en",
      isPartOf: { "@id": galleryId },
      breadcrumb: { "@id": breadcrumbId },
      primaryImageOfPage: photos[0],
      mainEntity: { "@id": workId },
      relatedLink: [absoluteUrl(landingPageServicePath), ...relatedThemes(theme.slug).map((related) => absoluteUrl(themeRoute(related.slug)))]
    },
    {
      "@type": "CreativeWork",
      "@id": workId,
      name: `${theme.brand} — ${theme.name} landing page concept`,
      description: descriptions.designNote,
      genre: "Interactive landing page design concept",
      url,
      inLanguage: "en",
      image: photos,
      thumbnailUrl: absoluteUrl(themeThumbnail(theme)),
      creator: author
    }
  ];
}


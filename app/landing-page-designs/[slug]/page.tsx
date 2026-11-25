import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { DemoPreview } from "@/components/showcase/DemoPreview";
import { ConceptFooter } from "@/components/showcase/ThemeParts";
import { themeComponents } from "@/components/showcase/themes";
import { findTheme, themeRoute, themes } from "@/data/showcase";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/seo";
import { conceptSchema, showcaseCrumbs, showcaseMetadata } from "@/lib/showcase-seo";
import "@/components/showcase/concept.css";
import "@/components/showcase/preview.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => themes.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props) {
  const theme = findTheme((await params).slug);
  if (!theme) notFound();
  return showcaseMetadata(theme);
}

export default async function ThemeLandingPage({ params }: Props) {
  const theme = findTheme((await params).slug);
  if (!theme) notFound();
  const { default: Landing } = await themeComponents[theme.slug]();
  const trail = [...showcaseCrumbs, { name: theme.name, path: themeRoute(theme.slug) }];

  return <>
    <link rel="preload" as="font" href={`/showcase/fonts/${theme.visual}.woff2`} type="font/woff2" crossOrigin="anonymous" />
    <JsonLd data={jsonLdGraph([breadcrumbSchema(trail), conceptSchema(theme)])} />
    <DemoPreview key={theme.slug} slug={theme.slug} visual={theme.visual}>
      <Landing theme={theme} />
      <ConceptFooter theme={theme} />
    </DemoPreview>
  </>;
}


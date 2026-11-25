import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { ShowcaseGallery } from "@/components/showcase/ShowcaseGallery";
import { landingPageServicePath } from "@/data/services";
import { jsonLdGraph } from "@/lib/seo";
import { gallerySchema, showcaseCrumbs, showcaseMetadata } from "@/lib/showcase-seo";

export const metadata = showcaseMetadata();

export default function LandingPageDesigns() {
  return <PageShell crumbs={showcaseCrumbs}>
    <JsonLd data={jsonLdGraph(gallerySchema)} />
    <ShowcaseGallery serviceHref={landingPageServicePath} />
  </PageShell>;
}


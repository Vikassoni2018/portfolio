import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { AeoEntityBanner } from "@/components/AeoEntityBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { TechBadgeIcon } from "@/components/TechIcons";
import {
  getAllCaseStudyPreviews,
  shopifyArchitectureCaseStudies
} from "@/data/case-studies";
import projects from "@/data/projects.json";
import { orderProjects } from "@/data/case-studies";
import {
  breadcrumbSchema,
  jsonLdGraph,
  personSchema,
  projectListSchema,
  speakableWebPageSchema,
  websiteSchema
} from "@/lib/seo";
import { absoluteUrl, siteName, siteUrl, socialImage } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const title = "Shopify Case Studies, Discount APIs & eCommerce Architecture | Vikas Soni";
const description =
  "Explore shipped Shopify apps and Shopify case studies by Vikas Soni: Product Subscription App, Shopify AMP Speed Boost + JSON-LD Schema, Shopify Cross-Selling, Discount APIs, Store Creation, and Custom App Development.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "Vikas Soni Shopify case studies",
    "Shopify cross selling case study",
    "Shopify store boost JSON-LD schema",
    "Shopify discount APIs",
    "Shopify store create case study",
    "Shopify app create case study",
    "Payment Service API"
  ],
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/projects"),
    type: "website",
    siteName,
    images: [socialImage]
  },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] }
};

export default function ProjectsIndexPage() {
  const shipped = orderProjects(projects);
  const allPreviews = getAllCaseStudyPreviews();
  const blueprintMap = new Map(shopifyArchitectureCaseStudies.map((b) => [b.id, b]));
  const shippedPreviews = allPreviews.filter((item) => !item.isBlueprint);
  const blueprintPreviews = allPreviews.filter((item) => item.isBlueprint);

  const schema = jsonLdGraph([
    personSchema(),
    websiteSchema(),
    speakableWebPageSchema({
      path: "/projects",
      name: title,
      description,
      type: "CollectionPage",
      mainEntityId: `${siteUrl}/#projects`
    }),
    projectListSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects & Case Studies", path: "/projects" }
    ])
  ]);

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Projects & Case Studies", path: "/projects" }
      ]}
    >
      <JsonLd data={schema} />

      <section className="relative">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Work &amp; Case Studies
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
            Shopify apps, store builds &amp; API case studies
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600">
            {description}
          </p>

          <AeoEntityBanner
            label="AEO · GEO Direct Summary"
            summary={`Vikas Soni (${siteUrl}) builds and documents custom Shopify App Creation, Shopify Store Creation, fast GraphQL Cross-Selling, Shopify Discount APIs & Functions, Store Speed Boost with JSON-LD Schema, and multi-gateway Payment APIs in PHP, Symfony, Laravel, Node.js, React, and Next.js.`}
          />

          <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Shipped Production Projects ({shipped.length})
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {shippedPreviews.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                data-conversion="portfolio_project_click"
                data-project={project.id}
                className="glass-panel glass-spotlight group flex flex-col overflow-hidden rounded-3xl transition hover:-translate-y-0.5"
              >
                <div className="aspect-[16/9] overflow-hidden bg-white/95">
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    width={800}
                    height={450}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.stackIcons.map((ic) => (
                      <span
                        key={ic}
                        className="flex h-6 w-6 items-center justify-center rounded-lg border border-indigo-100 bg-white shadow-sm"
                      >
                        <TechBadgeIcon id={ic} size={13} />
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-slate-900">
                    {project.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm font-medium leading-6 text-slate-600">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                    View production case study <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Shopify Engineering Case Studies &amp; API Blueprints ({blueprintPreviews.length})
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            Detailed architecture studies by Vikas Soni covering Cross-Selling, Store Boost with JSON-LD Schema, Shopify Discount APIs, Store Creation, and App Creation.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blueprintPreviews.map((study) => {
              const bp = blueprintMap.get(study.id);
              return (
                <Link
                  key={study.id}
                  href={`/projects/${study.id}`}
                  className="glass-panel glass-spotlight group flex flex-col overflow-hidden rounded-3xl transition hover:-translate-y-0.5"
                >
                  <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#F5F3FF]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={study.image}
                      alt={`${study.name} hardware studio visual`}
                      width={420}
                      height={300}
                      className="h-44 w-auto object-contain p-3 transition duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                      {bp?.categoryTag ?? study.categoryTag}
                    </span>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {study.stackIcons.map((ic) => (
                        <span
                          key={ic}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-indigo-100 bg-white shadow-sm"
                        >
                          <TechBadgeIcon id={ic} size={13} />
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold tracking-[-0.015em] text-slate-900">
                      {study.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm font-medium leading-6 text-slate-600">
                      {study.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                      Inspect architecture &amp; schema <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

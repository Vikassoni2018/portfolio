import type { Metadata } from "next";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { AeoEntityBanner } from "@/components/AeoEntityBanner";
import { CaseStudyDetails } from "@/components/CaseStudyDetails";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import {
  getAllCaseStudyPreviews,
  getAllCaseStudySlugs,
  resolveCaseStudyBySlug
} from "@/data/case-studies";
import { services } from "@/data/services";
import {
  breadcrumbSchema,
  faqPageSchema,
  jsonLdGraph,
  personId,
  personSchema,
  speakableWebPageSchema,
  websiteSchema
} from "@/lib/seo";
import { absoluteUrl, siteName, siteUrl, socialImage } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = resolveCaseStudyBySlug(slug);
  if (!entry) return {};

  const path = `/projects/${entry.id}`;
  const title = `${entry.name} — Case Study | ${siteName}`;
  const ogImg = entry.image.endsWith(".svg")
    ? [socialImage]
    : [{ url: absoluteUrl(entry.image), alt: `${entry.name} by ${siteName}` }];

  return {
    title: { absolute: title },
    description: `${entry.description} Engineered by ${siteName} (${siteUrl}).`,
    keywords: [entry.name, ...entry.study.technologies, siteName, "Shopify Developer"],
    authors: [{ name: siteName, url: siteUrl }],
    robots: { index: true, follow: true },
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description: entry.description,
      url: absoluteUrl(path),
      type: "article",
      siteName,
      authors: [siteName],
      images: ogImg
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: entry.description,
      images: ogImg.map((i) => i.url)
    }
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const entry = resolveCaseStudyBySlug(slug);
  if (!entry) notFound();

  const { study } = entry;
  const path = `/projects/${entry.id}`;
  const url = absoluteUrl(path);

  const relatedServices = services.filter(
    (service) =>
      service.relatedProjectIds.includes(entry.id) ||
      (study.relatedServiceSlugs ?? []).includes(service.slug)
  );
  const otherProjects = getAllCaseStudyPreviews()
    .filter((item) => item.id !== entry.id)
    .slice(0, 3);

  const schemaNodes: object[] = [
    personSchema(),
    websiteSchema(),
    speakableWebPageSchema({
      path,
      name: `${entry.name} — Case Study | ${siteName}`,
      description: entry.description,
      mainEntityId: `${url}#project`
    }),
    {
      "@type": "TechArticle",
      "@id": `${url}#project`,
      headline: `${entry.name} — Case Study`,
      description: entry.description,
      url,
      mainEntityOfPage: url,
      image: absoluteUrl(entry.image),
      keywords: study.technologies.join(", "),
      dateModified: "2026-11-27",
      sameAs: entry.link || undefined,
      author: { "@id": personId },
      publisher: { "@id": personId },
      about: [
        { "@type": "Thing", name: "Shopify Development" },
        ...study.technologies.slice(0, 5).map((t) => ({ "@type": "Thing", name: t }))
      ]
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects & Case Studies", path: "/projects" },
      { name: entry.name, path }
    ])
  ];

  if (study.faqs?.length) {
    schemaNodes.push(faqPageSchema(path, study.faqs));
  }

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: entry.name, path }
      ]}
    >
      <JsonLd data={jsonLdGraph(schemaNodes)} />

      <section className="relative">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                {entry.categoryTag}
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                {entry.name}
              </h1>
              <h2 className="mt-6 font-display text-lg font-bold text-slate-900">
                Engineering Overview
              </h2>
              <p className="mt-3 max-w-xl text-base font-medium leading-7 text-slate-600">
                {entry.description}
              </p>
              <p className="mt-4 text-xs font-bold leading-6 text-slate-500">
                {study.attribution}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {entry.link ? (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Visit live project <ExternalLink size={15} />
                  </a>
                ) : null}
                <Link
                  href="/#contact"
                  data-conversion="primary_cta_click"
                  data-location="case_study"
                  className="glass-pill inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-indigo-700"
                >
                  Discuss Your Project with {siteName} <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>

            <figure className="glass-panel overflow-hidden rounded-3xl p-2">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF2FF]">
                <Image
                  src={entry.image}
                  alt={`${entry.name} preview`}
                  width={1200}
                  height={750}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[16/10] w-full object-contain p-4"
                />
              </div>
              <figcaption className="px-4 py-3 text-xs leading-5 text-slate-600">
                <span className="block font-bold text-slate-900">
                  {entry.isBlueprint
                    ? "Architectural Blueprint & Hardware Visual"
                    : "Existing Preview & Demo"}
                </span>
                {entry.isBlueprint
                  ? `Reference architecture documented by ${siteName} (${siteUrl}). Code patterns and schemas can be tailored to your Shopify store or custom app.`
                  : `Existing portfolio preview for ${entry.name}. Use the project link to explore the original public listing.`}
              </figcaption>
            </figure>
          </div>

          <AeoEntityBanner
            label="AEO · LLMO Direct Answer"
            summary={
              study.aeoDirectAnswer ??
              `${entry.name} is documented by Senior Shopify & Full-Stack Developer ${siteName} (${siteUrl}), covering production workflows across Shopify, PHP/Symfony, Laravel, Node.js, React, and Next.js.`
            }
          />
        </div>
      </section>

      <CaseStudyDetails study={study} />

      {relatedServices.length ? (
        <section className="relative bg-gradient-to-b from-[#F8FAFC]/80 to-[#EEF2FF]/60">
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Related services by {siteName}
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Discuss a similar requirement
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="glass-panel glass-spotlight group rounded-3xl p-6 transition hover:-translate-y-0.5"
                >
                  <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-slate-900">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                    {service.heading}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                    Explore service scope <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
            More Shopify &amp; API case studies
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.id}`}
                className="glass-panel glass-spotlight group rounded-3xl p-6 transition hover:-translate-y-0.5"
              >
                <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-slate-900">
                  {item.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm font-medium leading-6 text-slate-600">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                  View case study <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { AeoEntityBanner } from "@/components/AeoEntityBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { resolveCaseStudyBySlug } from "@/data/case-studies";
import { getService, landingPageServiceSlug, services } from "@/data/services";
import { showcasePath, themeRoute, themes } from "@/data/showcase";
import { storefrontExamples } from "@/data/showcase-search";
import {
  breadcrumbSchema,
  jsonLdGraph,
  personId,
  personSchema,
  speakableWebPageSchema,
  websiteSchema
} from "@/lib/seo";
import { absoluteUrl, siteName, siteUrl, socialImage } from "@/lib/site";
import Link from "next/link";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const path = `/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: absoluteUrl(path),
      type: "website",
      images: [socialImage]
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [socialImage]
    }
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const examples = service.slug === landingPageServiceSlug ? themes
    : service.slug === "shopify-theme-development" ? themes.filter((theme) => storefrontExamples.includes(theme.slug))
    : [];
  const proof = service.relatedProjectIds
    .map((id) => resolveCaseStudyBySlug(id))
    .filter((entry): entry is NonNullable<ReturnType<typeof resolveCaseStudyBySlug>> => Boolean(entry));

  const schema = jsonLdGraph([
    personSchema(),
    websiteSchema(),
    speakableWebPageSchema({
      path,
      name: service.metaTitle,
      description: service.metaDescription,
      mainEntityId: `${absoluteUrl(path)}#service`
    }),
    {
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: service.name,
      description: service.metaDescription,
      url: absoluteUrl(path),
      serviceType: service.name,
      provider: { "@id": personId },
      areaServed: { "@type": "Place", name: "Worldwide" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.name} deliverables`,
        itemListElement: service.deliverables.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item.title, description: item.description }
        }))
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl(path)}#faq`,
      author: { "@id": personId },
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.name, path }
    ])
  ]);

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.name, path }
      ]}
    >
      <JsonLd data={schema} />

      <section className="relative">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            {service.eyebrow} · {siteName}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[3.75rem]">
            {service.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">{service.intro}</p>
          <Link href="/#contact" data-conversion="primary_cta_click" data-location="service" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition hover:-translate-y-0.5">Discuss Your Project with {siteName} <ArrowUpRight size={16} /></Link>
          <AeoEntityBanner
            label="Direct Service Answer"
            summary={`${service.name} is offered directly by Senior Shopify & Full-Stack Developer ${siteName} (${siteUrl}). ${service.intro}`}
          />
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-[#EEF2FF]/60 to-[#F8FAFC]/80">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
            What this includes
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <div key={item.title} className="glass-panel rounded-3xl p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Check size={17} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold tracking-[-0.015em] text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {examples.length > 0 && (
        <section className="relative" aria-labelledby="landing-examples">
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:px-10">
            <h2 id="landing-examples" className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Landing page design examples
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Explore interactive portfolio concepts for fictional brands and compare how different designs present a product or service.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {examples.map((theme) => (
                <li key={theme.slug}>
                  <Link href={themeRoute(theme.slug)} prefetch={false}
                    className="glass-pill inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-indigo-700 hover:border-indigo-300">
                    {theme.name} landing page <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={showcasePath} className="mt-5 inline-flex min-h-11 items-center font-bold text-indigo-700 underline underline-offset-4">
              Compare styles in the Design Showcase
            </Link>
          </div>
        </section>
      )}

      {proof.length ? (
        <section className="relative">
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Proof</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Related portfolio evidence
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {proof.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="glass-panel glass-spotlight group rounded-3xl p-6 transition hover:-translate-y-0.5"
                >
                  <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-slate-900">
                    {project.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm font-medium leading-6 text-slate-600">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                    View case study <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative bg-gradient-to-b from-[#F8FAFC]/80 to-[#F5F3FF]/60">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Common questions
          </h2>
          <div className="mt-8 grid gap-3">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="glass-panel group rounded-3xl p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold tracking-[-0.01em] text-slate-900">
                  {faq.question}
                  <span className="shrink-0 text-indigo-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Other services
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {services
              .filter((item) => item.slug !== service.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-700"
                >
                  {item.name} <ArrowUpRight size={14} />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

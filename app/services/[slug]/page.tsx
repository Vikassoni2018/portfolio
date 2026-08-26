import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import projects from "@/data/projects.json";
import { getService, services } from "@/data/services";
import { breadcrumbSchema, jsonLdGraph, personId } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
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
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription
    }
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const proof = service.relatedProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  const schema = jsonLdGraph([
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

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
            {service.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[3.75rem]">
            {service.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">{service.intro}</p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
            What this includes
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Check size={17} />
                </div>
                <h3 className="mt-4 text-lg font-extrabold tracking-[-0.015em] text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {proof.length ? (
        <section className="bg-white">
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">Proof</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Shipped work using this
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {proof.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <h3 className="text-lg font-extrabold tracking-[-0.015em] text-slate-900">
                    {project.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm font-medium leading-6 text-slate-600">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600">
                    View case study <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-slate-50">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Common questions
          </h2>
          <div className="mt-8 grid gap-3">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-extrabold tracking-[-0.01em] text-slate-900">
                  {faq.question}
                  <span className="shrink-0 text-blue-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Other services
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {services
              .filter((item) => item.slug !== service.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 hover:shadow-sm"
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

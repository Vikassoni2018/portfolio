import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { services } from "@/data/services";
import { breadcrumbSchema, jsonLdGraph, personId } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import Link from "next/link";

const title = "Services";
const description =
  "Shopify app and theme development, subscription and recurring billing systems, payment gateway integration, Laravel and Symfony backends — built by Vikas Soni.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: { title, description, url: absoluteUrl("/services"), type: "website" }
};

export default function ServicesIndexPage() {
  const schema = jsonLdGraph([
    {
      "@type": "ItemList",
      name: "Services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/services/${service.slug}`),
        name: service.name
      }))
    },
    {
      "@type": "CollectionPage",
      "@id": `${absoluteUrl("/services")}#page`,
      url: absoluteUrl("/services"),
      name: title,
      description,
      about: { "@id": personId }
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" }
    ])
  ]);

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" }
      ]}
    >
      <JsonLd data={schema} />

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">Services</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
            What I build, and what you get
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-600">{description}</p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <h2 className="text-xl font-extrabold tracking-[-0.02em] text-slate-900">
                  {service.name}
                </h2>
                <p className="mt-2 text-sm font-bold leading-6 text-blue-600">{service.heading}</p>
                <p className="mt-3 flex-1 text-sm font-medium leading-6 text-slate-600">{service.intro}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600">
                  Read more <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

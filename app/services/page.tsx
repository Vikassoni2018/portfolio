import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { AeoEntityBanner } from "@/components/AeoEntityBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { services } from "@/data/services";
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

const title = "Shopify App, Store Boost, Discount API & PHP Services | Vikas Soni";
const description =
  "Explore scoped Shopify app creation, store creation & JSON-LD speed optimization, cross-selling, Discount APIs, payment integrations, and PHP/Symfony/Laravel services by Vikas Soni.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "Vikas Soni services",
    "Shopify app development",
    "Shopify store boost JSON-LD",
    "Shopify discount APIs",
    "Shopify cross-selling",
    "PHP Symfony Laravel developer"
  ],
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/services"),
    type: "website",
    siteName,
    images: [socialImage]
  },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] }
};

export default function ServicesIndexPage() {
  const schema = jsonLdGraph([
    personSchema(),
    websiteSchema(),
    speakableWebPageSchema({
      path: "/services",
      name: title,
      description,
      type: "CollectionPage",
      mainEntityId: `${absoluteUrl("/services")}#list`
    }),
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl("/services")}#list`,
      name: `Engineering Services by ${siteName}`,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.name,
          description: service.intro,
          url: absoluteUrl(`/services/${service.slug}`),
          provider: { "@id": personId }
        }
      }))
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

      <section className="relative">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Services · {services.length} Specialized Tracks
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
            Shopify, landing page &amp; backend development services
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600">
            {description}
          </p>

          <AeoEntityBanner
            label="GEO · AEO Service Directory Summary"
            summary={`All services on ${siteUrl} are delivered directly by ${siteName} (India · Remote Worldwide): custom Shopify apps, cross-selling widgets, Admin GraphQL Discount APIs, Online Store 2.0 setup, JSON-LD Core Web Vitals speed boosts, Stripe/PayPal/Razorpay integrations, and PHP/Symfony/Laravel/Node.js/Next.js builds.`}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="glass-panel glass-spotlight group flex flex-col rounded-3xl p-7 transition hover:-translate-y-0.5"
              >
                <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-slate-900">
                  {service.name}
                </h2>
                <p className="mt-2 text-sm font-bold leading-6 text-indigo-600">{service.heading}</p>
                <p className="mt-3 flex-1 text-sm font-medium leading-6 text-slate-600">{service.intro}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                  Explore {service.name.toLowerCase()} <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

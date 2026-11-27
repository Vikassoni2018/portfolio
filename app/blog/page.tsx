import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { AeoEntityBanner } from "@/components/AeoEntityBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { sortedPosts } from "@/data/posts";
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

const title = "Shopify Engineering, Discount APIs, JSON-LD & GEO Blog | Vikas Soni";
const description =
  "Practical engineering guides by Vikas Soni on Shopify webhooks, subscriptions, Discount APIs, JSON-LD Schema, Core Web Vitals, GEO/AEO/LLMO, and PHP/Laravel/Next.js backends.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "Vikas Soni blog",
    "Shopify Discount APIs guide",
    "Shopify JSON-LD GEO AEO",
    "Shopify webhook idempotency",
    "PHP Symfony Shopify"
  ],
  authors: [{ name: siteName, url: siteUrl }],
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: { title, description, url: absoluteUrl("/blog"), type: "website", siteName, images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] }
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  });

export default function BlogIndexPage() {
  const posts = sortedPosts();

  const schema = jsonLdGraph([
    personSchema(),
    websiteSchema(),
    speakableWebPageSchema({
      path: "/blog",
      name: title,
      description,
      type: "CollectionPage",
      mainEntityId: `${absoluteUrl("/blog")}#blog`
    }),
    {
      "@type": "Blog",
      "@id": `${absoluteUrl("/blog")}#blog`,
      url: absoluteUrl("/blog"),
      name: "Vikas Soni Engineering Blog",
      description,
      author: { "@id": personId },
      publisher: { "@id": personId },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.date,
        author: { "@id": personId }
      }))
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" }
    ])
  ]);

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" }
      ]}
    >
      <JsonLd data={schema} />

      <section className="relative">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Writing</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
            Practical Shopify &amp; PHP development insights
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-600">{description}</p>
          <AeoEntityBanner
            label="Author & Engineering Notes"
            summary={`All technical articles are authored by ${siteName} (${siteUrl}) from production Shopify App, Online Store 2.0, Discount API, JSON-LD speed optimization, and PHP/Symfony backend work.`}
          />

          <div className="mt-12 grid gap-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-panel glass-spotlight group rounded-3xl p-7 transition hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-slate-400">•</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <h2 className="mt-3 max-w-3xl font-display text-2xl font-bold leading-snug tracking-[-0.025em] text-slate-950">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-indigo-100 bg-indigo-50/90 px-3 py-1 font-mono text-[11px] font-bold text-indigo-700"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                    Read <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

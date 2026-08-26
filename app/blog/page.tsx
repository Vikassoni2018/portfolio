import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { sortedPosts } from "@/data/posts";
import { breadcrumbSchema, jsonLdGraph, personId } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import Link from "next/link";

const title = "Blog";
const description =
  "Notes on Shopify app architecture, subscription and payment systems, Core Web Vitals, and PHP backends — written from production work, not theory.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: { title, description, url: absoluteUrl("/blog"), type: "website" }
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
    {
      "@type": "Blog",
      "@id": `${absoluteUrl("/blog")}#blog`,
      url: absoluteUrl("/blog"),
      name: "Vikas Soni Blog",
      description,
      author: { "@id": personId },
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

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">Writing</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
            Notes from production
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-600">{description}</p>

          <div className="mt-12 grid gap-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-slate-400">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-slate-300">•</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <h2 className="mt-3 max-w-3xl text-2xl font-extrabold leading-snug tracking-[-0.025em] text-slate-950">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600">
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

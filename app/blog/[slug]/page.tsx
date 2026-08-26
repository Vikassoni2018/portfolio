import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { getPost, posts, sortedPosts, type PostBlock } from "@/data/posts";
import { breadcrumbSchema, jsonLdGraph, personId } from "@/lib/seo";
import { absoluteUrl, siteName } from "@/lib/site";
import Link from "next/link";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: absoluteUrl(path),
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [siteName],
      tags: post.tags
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription
    }
  };
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 text-2xl font-black leading-tight tracking-[-0.03em] text-slate-950 sm:text-3xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 text-xl font-extrabold tracking-[-0.02em] text-slate-900">{block.text}</h3>
      );
    case "p":
      return <p className="mt-5 text-base font-medium leading-8 text-slate-700">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-5 grid gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-base font-medium leading-7 text-slate-700">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-5 text-[13px] leading-6 text-slate-100">
          <code>{block.code}</code>
        </pre>
      );
    case "callout":
      return (
        <p className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-base font-bold leading-7 text-blue-900">
          {block.text}
        </p>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const more = sortedPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  const schema = jsonLdGraph([
    {
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(path)}#post`,
      headline: post.title,
      description: post.metaDescription,
      url: absoluteUrl(path),
      mainEntityOfPage: absoluteUrl(path),
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      keywords: post.tags.join(", "),
      wordCount: post.body.reduce((total, block) => {
        const text =
          block.type === "ul"
            ? block.items.join(" ")
            : block.type === "code"
              ? ""
              : (block as { text?: string }).text ?? "";
        return total + text.split(/\s+/).filter(Boolean).length;
      }, 0),
      author: { "@id": personId },
      publisher: { "@id": personId },
      image: absoluteUrl("/og-clean.png")
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path }
    ])
  ]);

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path }
      ]}
    >
      <JsonLd data={schema} />

      <article className="bg-white">
        <div className="mx-auto max-w-[760px] px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-slate-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-slate-300">•</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <h1 className="mt-4 text-4xl font-black leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg font-medium leading-8 text-slate-600">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-100 pb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {post.body.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </article>

      {more.length ? (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
            <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Keep reading
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {more.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <h3 className="text-lg font-extrabold leading-snug tracking-[-0.015em] text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm font-medium leading-6 text-slate-600">
                    {item.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600">
                    Read <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}

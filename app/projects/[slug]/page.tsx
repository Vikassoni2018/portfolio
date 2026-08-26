import type { Metadata } from "next";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import projects from "@/data/projects.json";
import { services } from "@/data/services";
import { breadcrumbSchema, jsonLdGraph, personId } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) return {};

  const path = `/projects/${project.id}`;
  const title = `${project.name} — Case Study`;

  return {
    title,
    description: project.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description: project.description,
      url: absoluteUrl(path),
      type: "article",
      images: [{ url: absoluteUrl(project.image), alt: project.name }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [absoluteUrl(project.image)]
    }
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) notFound();

  const path = `/projects/${project.id}`;
  const relatedServices = services.filter((service) => service.relatedProjectIds.includes(project.id));
  const otherProjects = projects.filter((item) => item.id !== project.id).slice(0, 3);

  const schema = jsonLdGraph([
    {
      "@type": "CreativeWork",
      "@id": `${absoluteUrl(path)}#project`,
      name: project.name,
      description: project.description,
      url: absoluteUrl(path),
      image: absoluteUrl(project.image),
      sameAs: project.link || undefined,
      author: { "@id": personId },
      creator: { "@id": personId }
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.name, path }
    ])
  ]);

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: project.name, path }
      ]}
    >
      <JsonLd data={schema} />

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">Case study</p>
              <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                {project.name}
              </h1>
              <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-600">
                {project.description}
              </p>

              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Visit live project <ExternalLink size={15} />
                </a>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              {/* LCP element on this page: eager + high priority, never lazy. */}
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                width={1200}
                height={750}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {relatedServices.length ? (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
              Capabilities used
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Services behind this build
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <h3 className="text-lg font-extrabold tracking-[-0.015em] text-slate-900">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{service.heading}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600">
                    Read more <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Other projects
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.id}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <h3 className="text-lg font-extrabold tracking-[-0.015em] text-slate-900">{item.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm font-medium leading-6 text-slate-600">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600">
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

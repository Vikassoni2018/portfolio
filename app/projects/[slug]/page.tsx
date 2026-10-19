import type { Metadata } from "next";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { CaseStudyDetails } from "@/components/CaseStudyDetails";
import { caseStudies, getCaseStudy, orderProjects } from "@/data/case-studies";
import projects from "@/data/projects.json";
import { services } from "@/data/services";
import { breadcrumbSchema, jsonLdGraph, personId } from "@/lib/seo";
import { absoluteUrl, socialImage } from "@/lib/site";
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
    robots: { index: Boolean(caseStudies[project.id]), follow: true },
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description: project.description,
      url: absoluteUrl(path),
      type: "article",
      images: project.image.endsWith(".svg") ? [socialImage] : [{ url: absoluteUrl(project.image), alt: project.name }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: project.image.endsWith(".svg") ? [socialImage] : [absoluteUrl(project.image)]
    }
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) notFound();

  const path = `/projects/${project.id}`;
  const relatedServices = services.filter((service) => service.relatedProjectIds.includes(project.id));
  const otherProjects = orderProjects(projects).filter((item) => item.id !== project.id).slice(0, 3);
  const study = getCaseStudy(project.id);

  const schema = jsonLdGraph([
    {
      "@type": "Article",
      "@id": `${absoluteUrl(path)}#project`,
      headline: `${project.name} — Case Study`,
      description: project.description,
      url: absoluteUrl(path),
      image: absoluteUrl(project.image),
      sameAs: project.link || undefined,
      // Attribute the written case study, without implying sole product authorship.
      author: { "@id": personId }
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
              <h2 className="mt-6 text-lg font-extrabold">Project Overview</h2>
              <p className="mt-3 max-w-xl text-base font-medium leading-7 text-slate-600">
                {project.description}
              </p>
              <p className="mt-4 text-xs font-bold leading-6 text-slate-500">{study.attribution}</p>

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
              <Link href="/#contact" data-conversion="primary_cta_click" data-location="case_study" className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-xl border border-blue-200 px-5 py-3 text-sm font-bold text-blue-700 lg:ml-3">Discuss Your Project <ArrowUpRight size={15} /></Link>
            </div>

            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              {/* LCP element on this page: eager + high priority, never lazy. */}
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                width={1200}
                height={750}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[16/10] w-full object-contain"
              />
              <figcaption className="border-t border-slate-200 px-4 py-3 text-xs leading-5 text-slate-600"><h2 className="mb-2 text-sm font-bold text-slate-900">Existing Preview &amp; Demo</h2>Existing portfolio preview for {project.name}. Some previews are product artwork rather than application screenshots. Use the project link to explore the original product.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CaseStudyDetails study={study} />

      {relatedServices.length ? (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
              Related services
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Discuss a similar requirement
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

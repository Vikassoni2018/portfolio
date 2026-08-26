import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import projects from "@/data/projects.json";
import { breadcrumbSchema, jsonLdGraph, projectListSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const title = "Projects & Case Studies";
const description =
  "Shopify apps, subscription and payment platforms, and eCommerce storefronts built by Vikas Soni, including live Shopify App Store listings and production payment integrations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/projects"),
    type: "website"
  }
};

export default function ProjectsIndexPage() {
  const schema = jsonLdGraph([
    projectListSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" }
    ])
  ]);

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" }
      ]}
    >
      <JsonLd data={schema} />

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">Work</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
            Projects and case studies
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-600">{description}</p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-50">
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    width={800}
                    height={500}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-extrabold tracking-[-0.015em] text-slate-900">
                    {project.name}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm font-medium leading-6 text-slate-600">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600">
                    View case study <ArrowUpRight size={14} />
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

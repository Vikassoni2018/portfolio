"use client";

import type { Project } from "@/lib/types";
import {
  getCaseStudy,
  orderProjects,
  shopifyArchitectureCaseStudies
} from "@/data/case-studies";
import { showcasePath } from "@/data/showcase";
import { TechBadgeIcon } from "@/components/TechIcons";
import { ArrowUpRight, ExternalLink, Laptop, Smartphone, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GlassSpotlightCard } from "./GlassSpotlightCard";

export function ProjectsShowcaseSection({ projects }: { projects: Project[] }) {
  const ordered = orderProjects(projects);

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end" data-gsap="section-header">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              05 · Featured Work
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
              Selected Shopify apps, SaaS platforms &amp; API systems.
            </h2>
          </div>

          <Link
            href="/projects"
            className="glass-pill inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full px-5 py-2.5 text-xs font-bold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-700 lg:self-auto"
          >
            <span>View All Case Studies</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {/* Perspective Multi-Device Showcase Cards */}
        <div className="grid gap-8">
          {ordered.map((project, idx) => {
            const study = getCaseStudy(project.id);
            const reverse = idx % 2 === 1;
            const isDiagramOrIcon = project.image.endsWith(".svg") || project.image.endsWith(".png");

            return (
              <GlassSpotlightCard
                key={project.id}
                className="p-6 sm:p-8 lg:p-10"
              >
                <div
                  data-gsap="project-stage-card"
                  className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10"
                >
                  {/* Perspective Device Mockups (Desktop Browser + Mobile Companion) */}
                  <div
                    className={`device-stage-perspective min-w-0 lg:col-span-6 ${
                      reverse ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="device-tilt-card relative mx-auto max-w-lg pb-6 pt-2">
                      {/* Main Brushed Aluminum Desktop/Laptop Frame */}
                      <div className="device-macbook-chassis overflow-hidden rounded-3xl border border-white/95 p-2.5 sm:p-3">
                        <div className="flex items-center justify-between rounded-t-2xl bg-slate-100/95 px-4 py-2">
                          <div className="flex items-center gap-1.5" aria-hidden="true">
                            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-violet-400/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-sky-400/70" />
                          </div>
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-slate-500">
                            <Laptop size={12} aria-hidden="true" />
                            <span>{project.id}</span>
                          </span>
                        </div>

                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-2xl border border-slate-200/70 bg-white">
                          <Image
                            src={project.image}
                            alt={`${project.name} official project artwork preview`}
                            width={960}
                            height={600}
                            loading="eager"
                            sizes="(max-width: 1024px) 100vw, 480px"
                            className={`h-full w-full ${
                              isDiagramOrIcon ? "object-contain p-4" : "object-cover"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Floating Secondary Mobile Frame Badge */}
                      <div
                        aria-hidden="true"
                        className="device-phone-chassis absolute -bottom-1 right-2 hidden w-36 rounded-2xl border border-white/95 p-2 sm:block lg:-right-3"
                      >
                        <div className="flex items-center justify-between px-1 pb-1.5 font-mono text-[9px] font-bold text-indigo-700">
                          <span className="inline-flex items-center gap-1">
                            <Smartphone size={10} />
                            Mobile
                          </span>
                          <span>2.0</span>
                        </div>
                        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-white">
                          <Image
                            src={project.image}
                            alt=""
                            width={240}
                            height={150}
                            loading="eager"
                            className="h-full w-full object-contain p-1.5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Narrative Details + Case Study Metrics/Tech Stack */}
                  <div
                    className={`min-w-0 lg:col-span-6 ${
                      reverse ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 font-mono text-[11px] font-bold text-indigo-700">
                        Project 0{idx + 1}
                      </span>
                      {study.technologies.length ? (
                        <span className="font-mono text-xs font-semibold text-slate-500">
                          {study.technologies.slice(0, 3).join(" · ")}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      {project.name}
                    </h3>

                    <p className="mt-3 text-base font-medium leading-7 text-[#475569]">
                      {project.description}
                    </p>

                    {study.technologies.length ? (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-indigo-100 bg-white/85 px-3 py-1 font-mono text-[11px] font-bold text-slate-700"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
                      {study.attribution}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/projects/${project.id}`}
                        data-conversion="portfolio_project_click"
                        data-project={project.id}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <span>Read Case Study</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>

                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          data-conversion="portfolio_project_click"
                          data-project={project.id}
                          className="glass-pill inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-700"
                        >
                          <span>Visit Live Product</span>
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </GlassSpotlightCard>
            );
          })}

          {/* Dedicated Shopify Engineering Case Studies Grid (Cross-Sell, JSON-LD Boost, Discount APIs, Store & App Create) */}
          <div className="pt-4">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                  Architecture Blueprints &amp; Case Studies
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Shopify Cross-Selling, Store Boost + JSON-LD, Discount APIs, Store &amp; App Creation
                </h3>
              </div>
              <Link
                href="/projects"
                className="text-xs font-bold text-indigo-700 underline underline-offset-4 hover:text-indigo-800"
              >
                Explore all 9 case studies
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-gsap="stagger-grid">
              {shopifyArchitectureCaseStudies.map((bp) => (
                <GlassSpotlightCard
                  key={bp.id}
                  className="flex flex-col justify-between p-6"
                >
                  <div>
                    <div className="mb-4 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF2FF]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={bp.image}
                        alt={`${bp.name} hardware studio visual`}
                        width={360}
                        height={240}
                        className="h-32 w-auto object-contain p-2 drop-shadow-[0_12px_20px_rgba(79,70,229,0.2)]"
                      />
                    </div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                      {bp.categoryTag}
                    </p>
                    <h4 className="mt-2 font-display text-lg font-bold leading-snug text-slate-900">
                      {bp.name}
                    </h4>
                    <p className="mt-2 text-xs font-medium leading-6 text-[#475569] sm:text-sm">
                      {bp.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-indigo-100/80 pt-4">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {bp.stackIcons.map((ic) => (
                        <span
                          key={ic}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-indigo-100 bg-white shadow-sm"
                        >
                          <TechBadgeIcon id={ic} size={12} />
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${bp.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800"
                    >
                      <span>Inspect Case Study &amp; Schema</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </GlassSpotlightCard>
              ))}
            </div>
          </div>

          {/* Dedicated Link Banner into the 10 Design Showcase Concepts */}
          <GlassSpotlightCard className="bg-gradient-to-r from-[#EEF2FF]/90 via-white/90 to-[#F5F3FF]/90 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-700 shadow-sm">
                  <Sparkles size={13} aria-hidden="true" />
                  <span>10 Interactive UI Systems</span>
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Explore the Interactive Landing Page Design Showcase
                </h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600 sm:text-base">
                  Compare Glassmorphism, 3D Immersive, Bento, Luxury Editorial, Cyberpunk, Neumorphism, Claymorphism, Brutalism, Cartoon, and Retro-Futurism landing concepts in live browser views.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href={showcasePath}
                  prefetch={false}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-600"
                >
                  <span>Open Design Showcase</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </GlassSpotlightCard>
        </div>
      </div>
    </section>
  );
}

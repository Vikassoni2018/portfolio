"use client";

import { landingPageServicePath, primaryServices } from "@/data/services";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { TechBadgeIcon } from "@/components/TechIcons";
import { GlassSpotlightCard } from "./GlassSpotlightCard";

function pickServiceIcon(slug: string): string {
  if (slug.includes("graphql")) return "graphql";
  if (slug.includes("payment")) return "stripe";
  if (slug.includes("backend")) return "php";
  if (slug.includes("subscription")) return "shopify";
  if (slug.includes("theme") || slug.includes("customization")) return "liquid";
  return "shopify-app";
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end" data-gsap="section-header">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              03 · Services &amp; Expertise
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
              Targeted Shopify, API &amp; backend deliverables.
            </h2>
          </div>
          <Link
            href="/services"
            className="glass-pill inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full px-5 py-2.5 text-xs font-bold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-700 lg:self-auto"
          >
            <span>All 9 Service Pages</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {/* Asymmetrical Light Glassmorphism Bento Grid */}
        <div className="grid gap-5 md:grid-cols-6" data-gsap="stagger-grid">
          {primaryServices.map((service, idx) => {
            // Bento rhythm: cards 0 and 3 span 4 cols, 1 and 2 span 2 cols, 4 and 5 span 3 cols
            const spanClass =
              idx === 0
                ? "md:col-span-4"
                : idx === 1
                  ? "md:col-span-2"
                  : idx === 2
                    ? "md:col-span-2"
                    : idx === 3
                      ? "md:col-span-4"
                      : "md:col-span-3";

            return (
              <GlassSpotlightCard
                key={service.slug}
                className={`${spanClass} group flex flex-col justify-between p-6 sm:p-7`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-100 bg-white shadow-sm">
                      <TechBadgeIcon id={pickServiceIcon(service.slug)} size={21} />
                    </span>
                    <span className="rounded-full bg-indigo-50/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                      {service.eyebrow}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {service.name}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium leading-6 text-[#475569]">
                    {service.intro}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-indigo-100/80 pt-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 transition group-hover:text-indigo-800"
                  >
                    <span>Explore deliverables</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    href={`/?service=${encodeURIComponent(service.name)}#contact`}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Enquire
                  </Link>
                </div>
              </GlassSpotlightCard>
            );
          })}

          {/* Highlight Bento Bar for Custom Landing Page Engineering */}
          <GlassSpotlightCard className="md:col-span-6 flex flex-col justify-between gap-5 bg-gradient-to-r from-[#EEF2FF]/90 via-white/85 to-[#F5F3FF]/90 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white shadow-md shadow-indigo-500/20">
                <LayoutGrid size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                  Interactive Frontends &amp; Theme Engineering
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-slate-900">
                  Need a custom landing page or interactive product showcase?
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm font-medium text-slate-600">
                  Explore bespoke storefront architecture, motion craftsmanship, and 10 style concepts ready for production builds.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 sm:shrink-0">
              <Link
                href={landingPageServicePath}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-600"
              >
                <span>Landing Page Service</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </GlassSpotlightCard>
        </div>
      </div>
    </section>
  );
}

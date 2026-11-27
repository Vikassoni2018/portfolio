"use client";

import { homeGeoFaqs } from "@/data/geo-faq";
import { ArrowUpRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { GlassSpotlightCard } from "./GlassSpotlightCard";

export function FaqSection() {
  return (
    <section id="faq" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div
          className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          data-gsap="section-header"
        >
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              <HelpCircle size={13} aria-hidden="true" />
              <span>Direct Answers &amp; FAQ</span>
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
              Quick overview for founders, technical leads &amp; search.
            </h2>
          </div>
          <p className="max-w-md text-sm font-medium leading-6 text-[#475569]" data-aeo-summary="true">
            Clear, source-ready technical answers for founders, engineering leads, AI Overviews, and answer engines—covering Vikas Soni&apos;s Shopify app, store boost, cross-selling, and Discount API work.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2" data-gsap="stagger-grid" data-aeo-faq="true">
          {homeGeoFaqs.map((item) => (
            <GlassSpotlightCard
              key={item.question}
              className="flex flex-col justify-between p-6 sm:p-7"
            >
              <div>
                <h3 className="font-display text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm font-medium leading-6 text-[#475569]">
                  {item.answer}
                </p>
              </div>

              {item.relatedHref && item.relatedLabel ? (
                <div className="mt-5 border-t border-indigo-100/80 pt-4">
                  <Link
                    href={item.relatedHref}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800"
                  >
                    <span>{item.relatedLabel}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              ) : null}
            </GlassSpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import type { Experience } from "@/lib/types";
import { Briefcase, Calendar, Server } from "lucide-react";
import Image from "next/image";
import { GlassSpotlightCard } from "./GlassSpotlightCard";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section
      id="experience"
      className="relative bg-gradient-to-b from-[#EEF2FF]/70 via-[#F8FAFC]/85 to-[#F5F3FF]/65 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end" data-gsap="section-header">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              04 · Career Timeline
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
              Production engineering roles from QA foundations to senior backend systems.
            </h2>
          </div>

          <GlassSpotlightCard className="flex items-center gap-4 p-4">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/90 bg-slate-100">
              <Image
                src="/portfolio/team-collaboration.webp"
                alt="Software engineers collaborating around dual-display workstations in a sunlit studio"
                width={240}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                <Server size={12} aria-hidden="true" />
                <span>Backend &amp; Commerce Ownership</span>
              </p>
              <p className="mt-1 text-xs font-medium leading-5 text-slate-600">
                Full lifecycle accountability from architecture design and API contracts to deployment.
              </p>
            </div>
          </GlassSpotlightCard>
        </div>

        <div className="relative pl-6 sm:pl-10">
          {/* Static background track */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-2 top-4 w-0.5 rounded-full bg-indigo-200/70 sm:left-3.5"
          />
          {/* GSAP animated scroll spine */}
          <div
            data-gsap="timeline-spine"
            aria-hidden="true"
            className="absolute bottom-4 left-2 top-4 w-0.5 origin-top scale-y-0 rounded-full bg-gradient-to-b from-[#6366F1] via-[#8B5CF6] to-[#38BDF8] sm:left-3.5"
          />

          <div className="grid gap-6">
            {experience.map((role, index) => (
              <div key={role.id} className="relative" data-gsap="timeline-item">
                <span
                  aria-hidden="true"
                  className="absolute -left-[22px] top-7 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-md shadow-indigo-500/30 sm:-left-[34px]"
                />

                <GlassSpotlightCard className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-indigo-100/80 pb-5">
                    <div>
                      <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
                        <Briefcase size={14} aria-hidden="true" />
                        <span>{role.company}</span>
                        <span className="text-slate-300">·</span>
                        <span>0{index + 1}</span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900">
                        {role.role}
                      </h3>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-white/90 px-4 py-1.5 font-mono text-xs font-bold text-indigo-800 shadow-sm">
                      <Calendar size={13} className="text-indigo-500" aria-hidden="true" />
                      <span>
                        {role.startDate} — {role.endDate}
                      </span>
                    </span>
                  </div>

                  <p className="mt-5 text-sm font-medium leading-7 text-[#475569] sm:text-base">
                    {role.description}
                  </p>
                </GlassSpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

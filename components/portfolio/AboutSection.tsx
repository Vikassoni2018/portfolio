"use client";

import { useState } from "react";
import type { Education, Profile } from "@/lib/types";
import { GraduationCap, Layers, MapPin } from "lucide-react";
import Image from "next/image";
import { GlassSpotlightCard } from "./GlassSpotlightCard";

const ARCHITECTURE_LAYERS = [
  {
    id: "presentation",
    tag: "Layer 01",
    title: "Storefront & Client Interfaces",
    detail:
      "Fast Shopify Online Store 2.0 Liquid templates, Theme App Extensions, JavaScript optimizations, AMP speed layers, and React/Next.js merchant consoles."
  },
  {
    id: "api",
    tag: "Layer 02",
    title: "API & GraphQL Orchestration",
    detail:
      "Schema-typed Shopify Admin & Storefront GraphQL queries, REST microservices, OAuth scopes, and HMAC-verified webhook consumers."
  },
  {
    id: "domain",
    tag: "Layer 03",
    title: "PHP Symfony & Laravel Core",
    detail:
      "Maintainable domain services for subscription contracts, billing schedules, recurring retry logic, and Stripe / PayPal / Razorpay checkout flows."
  },
  {
    id: "data",
    tag: "Layer 04",
    title: "Queues & Persistence",
    detail:
      "Asynchronous background workers backed by RabbitMQ and Redis alongside structured MySQL and PostgreSQL data modeling."
  }
];

export function AboutSection({
  profile,
  education
}: {
  profile: Profile;
  education: Education[];
}) {
  const [activeLayer, setActiveLayer] = useState(ARCHITECTURE_LAYERS[0].id);
  const selectedLayer =
    ARCHITECTURE_LAYERS.find((l) => l.id === activeLayer) ?? ARCHITECTURE_LAYERS[0];

  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mb-10 max-w-3xl" data-gsap="section-header">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            01 · Engineering Philosophy
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
            Clean modular systems built for real commerce traffic.
          </h2>
        </div>

        <div className="grid gap-7 lg:grid-cols-12 lg:items-stretch">
          {/* Left Narrative + Interactive Exploded Cube Architecture Explorer */}
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
            <GlassSpotlightCard className="p-6 sm:p-8">
              <p className="text-base font-medium leading-8 text-[#475569] sm:text-lg">
                {profile.bio}
              </p>

              <div className="mt-7 border-t border-indigo-100/90 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-indigo-700">
                    <Layers size={14} aria-hidden="true" />
                    <span>Modular Architecture Layers</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Select a layer to inspect
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {ARCHITECTURE_LAYERS.map((layer) => {
                    const active = layer.id === activeLayer;
                    return (
                      <button
                        key={layer.id}
                        type="button"
                        onClick={() => setActiveLayer(layer.id)}
                        className={`rounded-2xl border px-3.5 py-2.5 text-left transition ${
                          active
                            ? "border-indigo-500 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white shadow-md shadow-indigo-500/20"
                            : "border-indigo-100 bg-white/80 text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
                        }`}
                      >
                        <span
                          className={`block font-mono text-[10px] font-bold uppercase tracking-wider ${
                            active ? "text-indigo-100" : "text-indigo-500"
                          }`}
                        >
                          {layer.tag}
                        </span>
                        <span className="mt-0.5 block text-xs font-bold leading-snug">
                          {layer.title.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-indigo-100/80 bg-indigo-50/55 p-4 sm:p-5">
                  <p className="font-display text-base font-bold text-slate-900">
                    {selectedLayer.title}
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-6 text-slate-600">
                    {selectedLayer.detail}
                  </p>
                </div>
              </div>
            </GlassSpotlightCard>

            {/* Education credentials grounded strictly in data/education.json */}
            <div className="grid gap-4 sm:grid-cols-2">
              {education.map((edu) => (
                <GlassSpotlightCard key={edu.id} className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <GraduationCap size={19} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-indigo-100 bg-white/90 px-3 py-1 font-mono text-[11px] font-bold text-slate-600">
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-indigo-700">
                    {edu.institution}
                  </p>
                  <p className="mt-2 font-mono text-xs font-bold text-slate-600">
                    {edu.description}
                  </p>
                </GlassSpotlightCard>
              ))}
            </div>
          </div>

          {/* Right Curated Workspace Visual + Studio Spec Overlay */}
          <div className="flex min-w-0 flex-col gap-5 lg:col-span-5">
            <GlassSpotlightCard className="overflow-hidden p-3 sm:p-4">
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="/portfolio/minimal-laptop-white.webp"
                  alt="Minimal white workstation desk setup representing clean software craftsmanship"
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl border border-white/80 bg-white/85 px-4 py-2.5 backdrop-blur-md">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <MapPin size={14} className="text-indigo-600" aria-hidden="true" />
                    <span>{profile.location} · Remote Ready</span>
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    Shopify &amp; PHP
                  </span>
                </div>
              </div>
            </GlassSpotlightCard>

            <GlassSpotlightCard className="overflow-hidden p-3 sm:p-4">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="/portfolio/modern-dev-workspace.webp"
                  alt="Laptop code editor open on a bright engineering desk"
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/15 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-sky-200">
                    Clean Separation of Concerns
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug">
                    Storefront UI, API schemas, payment adapters, and background queues.
                  </p>
                </div>
              </div>
            </GlassSpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}

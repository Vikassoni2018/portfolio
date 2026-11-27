"use client";

import { useMemo, useState } from "react";
import type { Skill } from "@/lib/types";
import { Code2 } from "lucide-react";
import { TechBadgeIcon, resolveSkillIconKey } from "@/components/TechIcons";
import { GlassSpotlightCard } from "./GlassSpotlightCard";

const TECH_HIGHLIGHTS = [
  { id: "shopify", name: "Shopify", group: "Commerce" },
  { id: "php", name: "PHP", group: "Backend" },
  { id: "symfony", name: "Symfony", group: "Backend" },
  { id: "laravel", name: "Laravel", group: "Backend" },
  { id: "graphql", name: "GraphQL", group: "APIs" },
  { id: "rest", name: "REST APIs", group: "APIs" },
  { id: "javascript", name: "JavaScript", group: "Frontend" },
  { id: "react", name: "React", group: "Frontend" },
  { id: "nodejs", name: "Node.js", group: "Backend" },
  { id: "stripe", name: "Stripe", group: "Payments" },
  { id: "paypal", name: "PayPal", group: "Payments" },
  { id: "razorpay", name: "Razorpay", group: "Payments" },
  { id: "redis", name: "Redis", group: "Data & Queues" },
  { id: "rabbitmq", name: "RabbitMQ", group: "Data & Queues" },
  { id: "mysql", name: "SQL", group: "Data & Queues" },
  { id: "git", name: "Git", group: "Tooling" },
  { id: "postman", name: "Postman", group: "Tooling" },
  { id: "html5", name: "HTML5 & CSS3", group: "Frontend" }
];

const CATEGORIES = ["All", "Commerce", "Backend", "APIs", "Payments", "Frontend", "Data & Queues", "Tooling"] as const;

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [focusedTech, setFocusedTech] = useState<string>("Shopify");

  const visibleTech = useMemo(() => {
    if (selectedCategory === "All") return TECH_HIGHLIGHTS;
    return TECH_HIGHLIGHTS.filter((t) => t.group === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end" data-gsap="section-header">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              02 · Skills &amp; Core Stack
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
              Production technologies used across commerce &amp; API systems.
            </h2>
          </div>
          <p className="max-w-md text-sm font-medium leading-6 text-[#475569] sm:text-base">
            Every skill and tool below comes directly from client delivery, SaaS engineering, and Shopify app architecture.
          </p>
        </div>

        {/* Interactive Technology Orbital & Accessible Badge Explorer */}
        <GlassSpotlightCard className="mb-10 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-100/80 pb-5">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter stack categories">
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`min-h-9 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                      active
                        ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-sm"
                        : "border border-indigo-100 bg-white/85 text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-indigo-700">
              <Code2 size={14} aria-hidden="true" />
              <span>Active Focus: {focusedTech}</span>
            </span>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {visibleTech.map((tech) => {
              const selected = focusedTech === tech.name;
              return (
                <li key={tech.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setFocusedTech(tech.name)}
                    onFocus={() => setFocusedTech(tech.name)}
                    onClick={() => setFocusedTech(tech.name)}
                    className={`flex w-full items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left transition ${
                      selected
                        ? "border-indigo-400 bg-indigo-50/90 text-indigo-900 shadow-sm"
                        : "border-white/90 bg-white/75 text-slate-800 hover:border-indigo-200 hover:bg-white"
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <TechBadgeIcon id={tech.id} size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-bold">{tech.name}</span>
                      <span className="block font-mono text-[10px] font-medium text-slate-500">
                        {tech.group}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </GlassSpotlightCard>

        {/* Full Detailed Skill Capability Cards directly from data/skills.json */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-gsap="stagger-grid">
          {skills.map((skill, index) => (
            <GlassSpotlightCard key={skill.id} className="flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-100 bg-white shadow-sm">
                    <TechBadgeIcon id={resolveSkillIconKey(skill.name, index)} size={21} />
                  </span>
                  <span className="font-mono text-[11px] font-bold text-indigo-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-slate-900">
                  {skill.name}
                </h3>
                <p className="mt-2.5 text-sm font-medium leading-6 text-[#475569]">
                  {skill.description}
                </p>
              </div>
            </GlassSpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

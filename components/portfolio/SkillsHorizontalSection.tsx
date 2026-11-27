"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Skill } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TechBadgeIcon } from "@/components/TechIcons";

gsap.registerPlugin(ScrollTrigger);

type SkillMixSpec = {
  objectImg: string;
  icons: Array<{ key: string; name: string }>;
};

const SKILL_MIX_MAP: Record<string, SkillMixSpec> = {
  "shopify-app-development": {
    objectImg: "/portfolio/objects/obj-shopify.webp",
    icons: [
      { key: "shopify", name: "Shopify" },
      { key: "graphql", name: "GraphQL" },
      { key: "php", name: "PHP" },
      { key: "symfony", name: "Symfony" }
    ]
  },
  "php-symfony": {
    objectImg: "/portfolio/objects/obj-php-laravel.webp",
    icons: [
      { key: "php", name: "PHP" },
      { key: "symfony", name: "Symfony" },
      { key: "laravel", name: "Laravel" },
      { key: "mysql", name: "SQL" }
    ]
  },
  "rest-graphql-apis": {
    objectImg: "/portfolio/objects/obj-payment.webp",
    icons: [
      { key: "graphql", name: "GraphQL" },
      { key: "rest", name: "REST" },
      { key: "postman", name: "Postman" },
      { key: "nodejs", name: "Node.js" }
    ]
  },
  "payment-integrations": {
    objectImg: "/portfolio/objects/obj-payment.webp",
    icons: [
      { key: "stripe", name: "Stripe" },
      { key: "paypal", name: "PayPal" },
      { key: "razorpay", name: "Razorpay" },
      { key: "php", name: "PHP" }
    ]
  },
  "shopify-liquid-themes": {
    objectImg: "/portfolio/objects/obj-shopify-store.webp",
    icons: [
      { key: "shopify", name: "Shopify Store" },
      { key: "liquid", name: "Liquid" },
      { key: "html5", name: "HTML5" },
      { key: "css3", name: "CSS3" }
    ]
  },
  "frontend-optimization": {
    objectImg: "/portfolio/objects/obj-react-nextjs.webp",
    icons: [
      { key: "javascript", name: "JS" },
      { key: "react", name: "React" },
      { key: "nextjs", name: "Next.js" },
      { key: "less", name: "Less" }
    ]
  },
  "developer-tools": {
    objectImg: "/portfolio/objects/obj-server.webp",
    icons: [
      { key: "git", name: "Git" },
      { key: "redis", name: "Redis" },
      { key: "rabbitmq", name: "RabbitMQ" },
      { key: "mysql", name: "SQL" }
    ]
  },
  "laravel-development": {
    objectImg: "/portfolio/objects/obj-php-laravel.webp",
    icons: [
      { key: "laravel", name: "Laravel" },
      { key: "php", name: "PHP" },
      { key: "mysql", name: "SQL" },
      { key: "rest", name: "REST" }
    ]
  },
  "web-development": {
    objectImg: "/portfolio/objects/obj-phone.webp",
    icons: [
      { key: "html5", name: "HTML5" },
      { key: "css3", name: "CSS3" },
      { key: "javascript", name: "JS" },
      { key: "performance", name: "Core Vitals" }
    ]
  },
  "full-stack-development": {
    objectImg: "/portfolio/objects/obj-nodejs.webp",
    icons: [
      { key: "react", name: "React" },
      { key: "nextjs", name: "Next.js" },
      { key: "nodejs", name: "Node.js" },
      { key: "php", name: "PHP" }
    ]
  },
  "shopify-theme-development": {
    objectImg: "/portfolio/objects/obj-shopify-store.webp",
    icons: [
      { key: "shopify", name: "Shopify 2.0" },
      { key: "liquid", name: "Liquid" },
      { key: "javascript", name: "JS" },
      { key: "css3", name: "CSS3" }
    ]
  },
  "shopify-expert": {
    objectImg: "/portfolio/objects/obj-workstation.webp",
    icons: [
      { key: "shopify", name: "Shopify" },
      { key: "php", name: "PHP" },
      { key: "laravel", name: "Laravel" },
      { key: "react", name: "React" }
    ]
  }
};

export function SkillsHorizontalSection({ skills }: { skills: Skill[] }) {
  const secRef = useRef<HTMLElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const stick = stickRef.current;
    const track = trackRef.current;
    if (!sec || !stick || !track) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        const dist = () =>
          Math.max(
            0,
            track.scrollWidth - window.innerWidth + window.innerWidth * 0.06
          );
        if (dist() <= 20) return;

        const horizontal = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: stick,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        sec.querySelectorAll<HTMLElement>(".horiz-card").forEach((card) => {
          gsap.fromTo(
            card,
            { rotationY: -20, z: -85, transformPerspective: 1200 },
            {
              rotationY: 16,
              z: 0,
              transformPerspective: 1200,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontal,
                start: "left right",
                end: "right left",
                scrub: true
              }
            }
          );

          const objWrap = card.querySelector<HTMLElement>(".horiz-obj");
          if (objWrap) {
            gsap.fromTo(
              objWrap,
              { xPercent: -10, rotation: -10 },
              {
                xPercent: 10,
                rotation: 10,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontal,
                  start: "left right",
                  end: "right left",
                  scrub: true
                }
              }
            );
          }

          const orbitIcons = card.querySelectorAll<HTMLElement>(".horiz-mini-icon");
          if (orbitIcons.length) {
            gsap.fromTo(
              orbitIcons,
              { y: 8 },
              {
                y: -8,
                stagger: 0.05,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontal,
                  start: "left right",
                  end: "right left",
                  scrub: true
                }
              }
            );
          }
        });
      }
    );

    return () => mm.revert();
  }, [skills.length]);

  const total = String(skills.length).padStart(2, "0");

  return (
    <section ref={secRef} id="skills" className="relative">
      <div
        ref={stickRef}
        className="relative overflow-hidden bg-gradient-to-b from-[#EEF2FF] via-[#E0E7FF]/80 to-[#F5F3FF] py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1240px] px-5 pb-10 text-center sm:px-8 lg:px-10">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">
            02 · Capabilities &amp; Stack
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
            Every skill paired with its{" "}
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] bg-clip-text italic text-transparent">
              live runtime object.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-[#475569] sm:text-base">
            Scroll sideways through Shopify, Shopify Store, PHP, Laravel, Node.js, React, and Next.js hardware modules mixed with every skill icon.
          </p>
        </div>

        <div className="px-5 sm:px-8 lg:px-10">
          <div ref={trackRef} className="horiz-track">
            {skills.map((skill, idx) => {
              const mix = SKILL_MIX_MAP[skill.id] ?? {
                objectImg: "/portfolio/objects/obj-cube.webp",
                icons: [
                  { key: "shopify", name: "Shopify" },
                  { key: "php", name: "PHP" },
                  { key: "nodejs", name: "Node.js" },
                  { key: "react", name: "React" }
                ]
              };

              return (
                <article
                  key={skill.id}
                  className="horiz-card glass-panel-strong flex w-[min(82vw,345px)] shrink-0 flex-col justify-between rounded-[2rem] p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold tracking-wider text-indigo-600">
                        {String(idx + 1).padStart(2, "0")} / {total}
                      </span>
                      <span className="rounded-full bg-indigo-50 px-3 py-1 font-mono text-[10px] font-bold uppercase text-indigo-700">
                        Production
                      </span>
                    </div>

                    {/* Paired 3D Hardware Object + Orbiting Skill Icon Satellites */}
                    <div className="relative mt-4 flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF2FF]">
                      <div className="horiz-obj relative z-10 h-28 w-28">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={mix.objectImg}
                          alt=""
                          width={160}
                          height={160}
                          className="h-full w-full object-contain drop-shadow-[0_14px_22px_rgba(79,70,229,0.22)]"
                        />
                      </div>

                      {mix.icons[0] ? (
                        <span
                          aria-hidden="true"
                          className="horiz-mini-icon absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl border border-white bg-white/95 shadow-sm"
                        >
                          <TechBadgeIcon id={mix.icons[0].key} size={16} />
                        </span>
                      ) : null}
                      {mix.icons[1] ? (
                        <span
                          aria-hidden="true"
                          className="horiz-mini-icon absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl border border-white bg-white/95 shadow-sm"
                        >
                          <TechBadgeIcon id={mix.icons[1].key} size={16} />
                        </span>
                      ) : null}
                      {mix.icons[2] ? (
                        <span
                          aria-hidden="true"
                          className="horiz-mini-icon absolute bottom-3 left-4 flex h-8 w-8 items-center justify-center rounded-xl border border-white bg-white/95 shadow-sm"
                        >
                          <TechBadgeIcon id={mix.icons[2].key} size={16} />
                        </span>
                      ) : null}
                      {mix.icons[3] ? (
                        <span
                          aria-hidden="true"
                          className="horiz-mini-icon absolute bottom-3 right-4 flex h-8 w-8 items-center justify-center rounded-xl border border-white bg-white/95 shadow-sm"
                        >
                          <TechBadgeIcon id={mix.icons[3].key} size={16} />
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold leading-snug text-slate-900">
                      {skill.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-[#475569]">
                      {skill.description}
                    </p>
                  </div>

                  {/* Mixed Skill Icon Labels */}
                  <div className="mt-5 border-t border-indigo-100/80 pt-3.5">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {mix.icons.map((ic) => (
                        <span
                          key={ic.name}
                          className="inline-flex items-center gap-1 rounded-full border border-indigo-100 bg-white/90 px-2.5 py-0.5 font-mono text-[10px] font-bold text-slate-700"
                        >
                          <TechBadgeIcon id={ic.key} size={11} />
                          <span>{ic.name}</span>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-semibold text-slate-500">
                        Verified Stack
                      </span>
                      <Link
                        href="/#contact"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition hover:scale-105 hover:bg-indigo-700"
                        aria-label={`Enquire about ${skill.name}`}
                      >
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

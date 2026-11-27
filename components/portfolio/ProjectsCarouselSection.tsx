"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import type { Project } from "@/lib/types";
import { orderProjects } from "@/data/case-studies";
import { showcasePath } from "@/data/showcase";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TechBadgeIcon } from "@/components/TechIcons";

const PASTEL_FRAMES = [
  "bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF]",
  "bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE]",
  "bg-gradient-to-br from-[#E0F2FE] to-[#EEF2FF]",
  "bg-gradient-to-br from-[#F8FAFC] to-[#E0E7FF]",
  "bg-gradient-to-br from-[#EDE9FE] to-[#F5F3FF]",
  "bg-gradient-to-br from-[#EEF2FF] to-[#F0FDFA]"
];

type CarouselCardItem = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
  ctaLabel: string;
  icons: string[];
  conversion?: string;
  projectId?: string;
};

const CARD_TECH_ICONS: Record<string, string[]> = {
  "product-subscription-app": ["shopify", "php", "symfony", "graphql", "stripe"],
  "shopify-amp-app": ["shopify", "javascript", "html5", "css3"],
  "user-central-webkul": ["php", "laravel", "react", "nodejs", "git"],
  "payment-service-api-docs": ["stripe", "paypal", "razorpay", "php", "postman"]
};

const LAND_OBJECTS = [
  {
    key: "shopify-store",
    src: "/portfolio/objects/obj-shopify-store.webp",
    style: { width: "clamp(78px, 8.2vw, 138px)", left: "max(2%, calc(50% - 610px))", top: "9%", "--r": "-12deg" }
  },
  {
    key: "react-nextjs",
    src: "/portfolio/objects/obj-react-nextjs.webp",
    style: { width: "clamp(76px, 8vw, 134px)", right: "max(2%, calc(50% - 605px))", top: "8%", "--r": "14deg" }
  },
  {
    key: "php-laravel",
    src: "/portfolio/objects/obj-php-laravel.webp",
    style: { width: "clamp(78px, 8.2vw, 138px)", left: "max(2%, calc(50% - 640px))", bottom: "14%", "--r": "10deg" }
  },
  {
    key: "nodejs",
    src: "/portfolio/objects/obj-nodejs.webp",
    style: { width: "clamp(74px, 7.8vw, 130px)", right: "max(2%, calc(50% - 630px))", bottom: "15%", "--r": "-12deg" }
  }
];

export function ProjectsCarouselSection({ projects }: { projects: Project[] }) {
  const cards: CarouselCardItem[] = useMemo(() => {
    const ordered = orderProjects(projects);
    return [
      ...ordered.map((project) => ({
        id: project.id,
        tag: "Case Study",
        title: project.name,
        description: project.description,
        image: project.image,
        href: `/projects/${project.id}`,
        ctaLabel: "Case Study",
        icons: CARD_TECH_ICONS[project.id] ?? ["shopify", "php", "graphql"],
        conversion: "portfolio_project_click",
        projectId: project.id
      })),
      {
        id: "shopify-cross-selling",
        tag: "Shopify Store · GraphQL",
        title: "Shopify Cross-Selling Case Study",
        description:
          "Non-blocking cart drawer & PDP complementary recommendations powered by Storefront GraphQL and Theme App Extensions.",
        image: "/portfolio/objects/obj-shopify-store.webp",
        href: "/projects/shopify-cross-selling",
        ctaLabel: "Case Study",
        icons: ["shopify", "graphql", "liquid", "react", "nodejs"]
      },
      {
        id: "shopify-discount-apis",
        tag: "Shopify Discount APIs",
        title: "Discount APIs & Functions Case Study",
        description:
          "Automated Admin GraphQL discountCodeBasicCreate, BXGY promotions, and combinesWith stacking rules.",
        image: "/portfolio/objects/obj-payment.webp",
        href: "/projects/shopify-discount-apis",
        ctaLabel: "API Blueprint",
        icons: ["shopify", "graphql", "php", "laravel", "nodejs"]
      },
      {
        id: "shopify-store-boost-jsonld",
        tag: "Speed · JSON-LD Schema",
        title: "Shopify Store Boost + JSON-LD",
        description:
          "Core Web Vitals acceleration paired with unified Product, Offer, Breadcrumb & GEO/AEO Schema graphs.",
        image: "/portfolio/objects/obj-workstation.webp",
        href: "/projects/shopify-store-boost-jsonld",
        ctaLabel: "JSON-LD Guide",
        icons: ["shopify", "liquid", "html5", "css3"]
      },
      {
        id: "landing-showcase-card",
        tag: "React + Next.js UI",
        title: "10 Design Showcase Concepts",
        description:
          "Live landing page craft spanning Glassmorphism, 3D Immersive, Bento, Luxury & Cyberpunk concepts.",
        image: "/portfolio/objects/obj-react-nextjs.webp",
        href: showcasePath,
        ctaLabel: "Explore UI",
        icons: ["react", "nextjs", "javascript", "css3"]
      }
    ];
  }, [projects]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragStartX = useRef<number | null>(null);
  const n = cards.length;

  useEffect(() => {
    const applyLayout = (instant = false) => {
      const spread = Math.min(300, window.innerWidth * 0.54);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      cards.forEach((_, i) => {
        const cardEl = cardRefs.current[i];
        if (!cardEl) return;
        let offset = (((i - index) % n) + n) % n;
        if (offset > n / 2) offset -= n;
        const abs = Math.abs(offset);
        const props = {
          x: offset * spread,
          z: -abs * 210,
          rotationY: offset * -28,
          scale: abs === 0 ? 1 : 0.86,
          opacity: abs > 2 ? 0 : 1 - abs * 0.14,
          zIndex: 100 - abs
        };

        if (reduce || instant) {
          gsap.set(cardEl, props);
        } else {
          gsap.to(cardEl, { ...props, duration: 0.78, ease: "power3.out" });
        }
      });
    };

    applyLayout(false);
    const onResize = () => applyLayout(true);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [index, n, cards]);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const currentMod = ((index % n) + n) % n;

  return (
    <section
      id="projects-carousel"
      className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#EEF2FF]/65 to-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      {/* 4 Branded 3D Hardware Objects docked in corners before parabolic flight into Flagship Spotlight */}
      {LAND_OBJECTS.map((obj) => (
        <div
          key={obj.key}
          data-land-key={obj.key}
          className="land-object hidden md:block"
          style={obj.style as React.CSSProperties}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={obj.src} alt="" width={240} height={240} />
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="text-center" data-gsap="section-header">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            01 · Production Systems &amp; Work
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#0EA5E9] bg-clip-text italic text-transparent">
              Shopify, PHP &amp; Full-Stack
            </span>{" "}
            work.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-6 text-[#475569] sm:text-base">
            Every card pairs shipped solutions with its underlying Shopify Store, PHP/Laravel, Node.js, React, and Next.js icons.
          </p>
        </div>

        {/* 3D Perspective Fan Stage */}
        <div
          className="fan-carousel-stage mt-12"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest("a")) return;
            dragStartX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (dragStartX.current === null) return;
            const dx = e.clientX - dragStartX.current;
            dragStartX.current = null;
            if (Math.abs(dx) > 40) {
              setIndex((prev) => prev + (dx < 0 ? 1 : -1));
            }
          }}
        >
          {cards.map((item, i) => {
            const isActive = i === currentMod;
            const bgClass = PASTEL_FRAMES[i % PASTEL_FRAMES.length];
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("a")) return;
                  if (!isActive) {
                    let delta = (((i - currentMod) % n) + n) % n;
                    if (delta > n / 2) delta -= n;
                    setIndex((prev) => prev + delta);
                  }
                }}
                className="fan-pcard glass-panel-strong flex flex-col rounded-[1.85rem] p-5"
              >
                <div
                  className={`fan-img-wrap flex h-48 items-center justify-center rounded-2xl border border-white/90 ${bgClass}`}
                >
                  <Image
                    src={item.image}
                    alt={`${item.title} preview`}
                    width={300}
                    height={210}
                    loading="eager"
                    className="h-40 w-auto object-contain p-2 transition duration-500"
                  />
                </div>

                {/* Mixed Skill Icon Row per card */}
                <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                  {item.icons.map((ic) => (
                    <span
                      key={ic}
                      className="flex h-6 w-6 items-center justify-center rounded-lg border border-indigo-100 bg-white shadow-sm"
                    >
                      <TechBadgeIcon id={ic} size={13} />
                    </span>
                  ))}
                  <span className="ml-auto font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                    {item.tag}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 line-clamp-2 flex-1 text-xs font-medium leading-5 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-3.5 flex items-center justify-between border-t border-indigo-100/80 pt-3">
                  <span className="font-mono text-[11px] font-bold text-slate-500">
                    0{i + 1} / 0{n}
                  </span>
                  <Link
                    href={item.href}
                    prefetch={item.href.startsWith("/landing-page") ? false : undefined}
                    data-conversion={item.conversion}
                    data-project={item.projectId}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:shadow-md"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="mt-4 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => setIndex((prev) => prev - 1)}
            aria-label="Previous project card"
            className="glass-pill flex h-12 w-12 items-center justify-center rounded-full text-slate-800 transition hover:scale-105 hover:border-indigo-400 hover:bg-indigo-600 hover:text-white"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Select project card">
            {cards.map((card, i) => {
              const on = i === currentMod;
              return (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-label={`Show ${card.title}`}
                  onClick={() => setIndex((prev) => prev + (i - currentMod))}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    on ? "w-7 bg-indigo-600" : "w-2.5 bg-indigo-200 hover:bg-indigo-400"
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIndex((prev) => prev + 1)}
            aria-label="Next project card"
            className="glass-pill flex h-12 w-12 items-center justify-center rounded-full text-slate-800 transition hover:scale-105 hover:border-indigo-400 hover:bg-indigo-600 hover:text-white"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

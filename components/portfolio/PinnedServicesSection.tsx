"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Layers, ShieldCheck, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TechBadgeIcon } from "@/components/TechIcons";

gsap.registerPlugin(ScrollTrigger);

const PIN_SLIDES = [
  {
    id: "apps",
    tag: "Service Track 01",
    title: "Shopify Storefront & Apps",
    description:
      "Build merchant apps, Online Store 2.0 themes, embedded admin portals, recurring billing rules, and customer self-service workflows integrated directly with Shopify APIs.",
    cta: "Shopify App Development",
    href: "/services/shopify-app-development",
    photo: "/portfolio/commerce-analytics-desk.webp",
    photoAlt: "Laptop workstation alongside ecommerce analytics charts and sprint notebook",
    floatingObj: "/portfolio/objects/obj-shopify-store.webp",
    accentBg: "bg-emerald-100/80",
    stack: [
      { key: "shopify", label: "Shopify Store" },
      { key: "graphql", label: "GraphQL" },
      { key: "liquid", label: "Liquid 2.0" }
    ],
    Icon: ShoppingBag
  },
  {
    id: "backends",
    tag: "Service Track 02",
    title: "PHP, Laravel & Payment Backends",
    description:
      "Connect Stripe, PayPal, and Razorpay cleanly with reusable PHP/Symfony & Laravel endpoints, idempotent refund sync, and Node.js queue pipelines.",
    cta: "Payment & Backend Integration",
    href: "/services/payment-gateway-integration",
    photo: "/portfolio/clean-code-session.webp",
    photoAlt: "Software developer writing clean backend architecture code on silver laptop",
    floatingObj: "/portfolio/objects/obj-php-laravel.webp",
    accentBg: "bg-indigo-100/85",
    stack: [
      { key: "php", label: "PHP" },
      { key: "laravel", label: "Laravel" },
      { key: "stripe", label: "Stripe" },
      { key: "nodejs", label: "Node.js" }
    ],
    Icon: ShieldCheck
  },
  {
    id: "storefronts",
    tag: "Service Track 03",
    title: "React, Next.js & Custom Frontends",
    description:
      "Interactive storefronts, embedded React dashboards, Next.js App Router architectures, GSAP scroll systems, and clean technical GEO/SEO foundations.",
    cta: "Explore All Services",
    href: "/services",
    photo: "/portfolio/modern-dev-workspace.webp",
    photoAlt: "Open code editor laptop inside bright minimalist studio workspace",
    floatingObj: "/portfolio/objects/obj-react-nextjs.webp",
    accentBg: "bg-sky-100/85",
    stack: [
      { key: "react", label: "React" },
      { key: "nextjs", label: "Next.js" },
      { key: "nodejs", label: "Node.js" },
      { key: "javascript", label: "TypeScript / JS" }
    ],
    Icon: Layers
  }
];

export function PinnedServicesSection() {
  const secRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const wrap = wrapRef.current;
    if (!sec || !wrap) return;

    const slideEls = Array.from(sec.querySelectorAll<HTMLElement>(".svc-slide-card"));
    if (slideEls.length < 2) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        sec.classList.add("svc-pin-active");

        const parts = (el: HTMLElement) => ({
          txt: el.querySelectorAll(".svc-txt-anim"),
          vis: el.querySelector(".svc-vis-card"),
          fl: el.querySelector(".svc-float-obj")
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrap,
            start: "center center",
            end: `+=${(slideEls.length - 1) * 115}%`,
            pin: wrap,
            scrub: 1.1,
            anticipatePin: 1
          }
        });

        tl.to({}, { duration: 0.45 }, 0);
        let cursor = 0.5;

        for (let i = 0; i < slideEls.length - 1; i++) {
          const cur = parts(slideEls[i]);
          const nxt = parts(slideEls[i + 1]);

          tl.to(slideEls[i], { pointerEvents: "none", duration: 0.01 }, cursor)
            .to(cur.txt, { y: -36, opacity: 0, duration: 0.32, stagger: 0.05 }, cursor)
            .to(cur.vis, { x: -90, opacity: 0, scale: 0.92, rotate: 5, duration: 0.38 }, cursor)
            .set(slideEls[i + 1], { opacity: 1, pointerEvents: "auto" }, cursor + 0.32)
            .fromTo(
              nxt.txt,
              { y: 36, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.35, stagger: 0.05 },
              cursor + 0.34
            )
            .fromTo(
              nxt.vis,
              { x: 90, opacity: 0, scale: 0.92, rotate: -5 },
              { x: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.42 },
              cursor + 0.34
            );

          if (nxt.fl) {
            tl.fromTo(
              nxt.fl,
              { scale: 0 },
              { scale: 1, duration: 0.3, ease: "back.out(2)" },
              cursor + 0.6
            );
          }
          cursor += 0.9;
        }

        tl.to({}, { duration: 0.3 }, cursor);

        return () => {
          sec.classList.remove("svc-pin-active");
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={secRef}
      id="services"
      className="relative bg-gradient-to-b from-[#F8FAFC] via-[#EEF2FF]/50 to-[#F8FAFC] py-20 sm:py-24"
    >
      <div ref={wrapRef} className="svc-pin-wrap mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              04 · Services Showcase
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              Scoped engineering services
            </h2>
          </div>
          <Link
            href="/services"
            className="glass-pill inline-flex min-h-10 items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold text-slate-800 hover:border-indigo-300 hover:text-indigo-700"
          >
            <span>All 9 Service Pages</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="svc-pin-stage">
          {PIN_SLIDES.map((slide) => {
            const Icon = slide.Icon;
            return (
              <article
                key={slide.id}
                className="svc-slide-card glass-panel-strong grid items-center gap-8 rounded-[2rem] p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10"
              >
                <div className="min-w-0 lg:col-span-6">
                  <div className="svc-txt-anim inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-sm">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <p className="svc-txt-anim mt-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
                    {slide.tag}
                  </p>
                  <h3 className="svc-txt-anim mt-2 font-display text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
                    {slide.title}
                  </h3>
                  <p className="svc-txt-anim mt-4 text-base font-medium leading-7 text-[#475569]">
                    {slide.description}
                  </p>

                  {/* Mixed Skill Stack Pills inside every service track */}
                  <div className="svc-txt-anim mt-5 flex flex-wrap gap-2">
                    {slide.stack.map((tech) => (
                      <span
                        key={tech.label}
                        className="glass-pill inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-slate-800"
                      >
                        <TechBadgeIcon id={tech.key} size={14} />
                        <span>{tech.label}</span>
                      </span>
                    ))}
                  </div>

                  <div className="svc-txt-anim mt-7 flex flex-wrap gap-3">
                    <Link
                      href={slide.href}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition hover:-translate-y-0.5"
                    >
                      <span>{slide.cta}</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="svc-vis-card relative flex min-w-0 items-center justify-center lg:col-span-6">
                  <div
                    aria-hidden="true"
                    className={`absolute inset-3 rotate-2 rounded-3xl ${slide.accentBg}`}
                  />
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/95 bg-white shadow-glass">
                    <Image
                      src={slide.photo}
                      alt={slide.photoAlt}
                      width={900}
                      height={675}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* Floating Branded 3D Hardware Object Pop-In */}
                  <div
                    aria-hidden="true"
                    className="svc-float-obj pointer-events-none absolute -bottom-5 -right-3 hidden w-32 sm:block lg:-right-6 lg:w-40"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.floatingObj}
                      alt=""
                      width={260}
                      height={260}
                      className="h-auto w-full object-contain drop-shadow-[0_18px_28px_rgba(79,70,229,0.28)]"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

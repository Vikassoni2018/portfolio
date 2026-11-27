"use client";

import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SPECIALIZATIONS = [
  {
    id: "shopify-apps",
    title: "Custom Shopify Apps",
    desc: "End-to-end SaaS Shopify applications, embedded admin interfaces, OAuth scopes, and recurring subscription lifecycles.",
    href: "/services/shopify-app-development",
    image: "/portfolio/modern-dev-workspace.webp",
    backdrop: "#6366F1"
  },
  {
    id: "graphql-webhooks",
    title: "GraphQL & Webhooks",
    desc: "Scoped Admin & Storefront GraphQL contracts paired with HMAC-verified asynchronous RabbitMQ / Redis pipelines.",
    href: "/services/shopify-graphql-api-integrations",
    image: "/portfolio/cloud-rack-detail.webp",
    backdrop: "#8B5CF6"
  },
  {
    id: "payment-gateways",
    title: "Payment Orchestration",
    desc: "Stripe, PayPal, and Razorpay checkout flows, webhooks, refunds, wallets, and idempotent settlement handling.",
    href: "/services/payment-gateway-integration",
    image: "/portfolio/commerce-analytics-desk.webp",
    backdrop: "#0EA5E9"
  },
  {
    id: "liquid-themes",
    title: "Online Store 2.0 & AMP",
    desc: "High-speed Liquid storefronts, custom theme sections, mobile AMP layouts, and Core Web Vitals optimization.",
    href: "/services/shopify-theme-development",
    image: "/portfolio/minimal-laptop-white.webp",
    backdrop: "#4F46E5"
  },
  {
    id: "php-symfony",
    title: "PHP, Symfony & Laravel",
    desc: "Clean maintainable backend services, REST middleware, database schemas, and structured API documentation.",
    href: "/services/php-symfony-development",
    image: "/portfolio/clean-code-session.webp",
    backdrop: "#7C3AED"
  }
];

export function InteractiveExpertiseSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const tiltRef = useRef<HTMLDivElement>(null);
  const current = SPECIALIZATIONS[activeIdx] ?? SPECIALIZATIONS[0];

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const tilt = tiltRef.current;
    if (!tilt || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;
    tilt.style.transform = `perspective(1000px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 6).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };

  return (
    <section
      id="expertise"
      className="relative bg-gradient-to-b from-[#F8FAFC] via-[#EEF2FF]/55 to-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 text-center" data-gsap="section-header">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            03 · Architecture Index
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
            Focus areas built for{" "}
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] bg-clip-text italic text-transparent">
              real traffic.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-[#475569] sm:text-base">
            Hover or select any capability row to preview the corresponding architecture domain.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Interactive Numbered Editorial Rows */}
          <ul className="border-t border-indigo-200/80">
            {SPECIALIZATIONS.map((item, idx) => {
              const isOn = idx === activeIdx;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onFocus={() => setActiveIdx(idx)}
                    onClick={(e) => {
                      if (!isOn) {
                        e.preventDefault();
                        setActiveIdx(idx);
                      }
                    }}
                    className={`exp-row flex items-center justify-between gap-4 border-b border-indigo-200/80 py-6 ${
                      isOn ? "on bg-white/55" : ""
                    }`}
                  >
                    <div className="min-w-0 pr-4">
                      <span className="font-mono text-[11px] font-bold text-indigo-500">
                        0{idx + 1}
                      </span>
                      <h3
                        className={`mt-1 font-display text-xl font-bold tracking-tight transition-colors sm:text-2xl ${
                          isOn ? "text-indigo-700" : "text-slate-700 hover:text-slate-950"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-2 text-sm font-medium leading-6 text-slate-600 transition-all duration-300 ${
                          isOn ? "max-h-24 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>

                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOn
                          ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                          : "border-indigo-200 bg-white/80 text-slate-700"
                      }`}
                    >
                      <ArrowRight
                        size={18}
                        className={`transition-transform duration-300 ${isOn ? "-rotate-45" : ""}`}
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Tilting Visual Stage matching fsf-shop-category.liquid */}
          <div
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className="relative mx-auto w-full max-w-[520px] py-4"
          >
            <div ref={tiltRef} className="relative transition-transform duration-200 ease-out">
              {/* Tilted pastel backing plate shifted gently */}
              <div
                aria-hidden="true"
                className="absolute inset-2 -rotate-3 rounded-[2.2rem] opacity-20 transition-colors duration-500"
                style={{ backgroundColor: current.backdrop }}
              />

              <div className="glass-panel-strong relative overflow-hidden rounded-[2rem] p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100">
                  {SPECIALIZATIONS.map((item, idx) => (
                    <Image
                      key={item.id}
                      src={item.image}
                      alt={item.title}
                      width={900}
                      height={680}
                      loading="eager"
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
                        idx === activeIdx
                          ? "scale-100 opacity-100"
                          : "pointer-events-none scale-105 opacity-0"
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 backdrop-blur-md">
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                        Active Domain
                      </p>
                      <p className="text-sm font-bold text-slate-900">{current.title}</p>
                    </div>
                    <Link
                      href={current.href}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
                    >
                      <span>View</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

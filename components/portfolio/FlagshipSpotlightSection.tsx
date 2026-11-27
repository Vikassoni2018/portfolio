"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { TechBadgeIcon } from "@/components/TechIcons";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_WORDS = [
  { text: "Shopify", em: true },
  { text: "Stores,", em: true },
  { text: "PHP", em: false },
  { text: "&", em: false },
  { text: "Laravel", em: true },
  { text: "engines,", em: false },
  { text: "Node.js", em: false },
  { text: "workers,", em: false },
  { text: "and", em: false },
  { text: "React", em: true },
  { text: "/", em: false },
  { text: "Next.js", em: true },
  { text: "interfaces", em: false },
  { text: "wired", em: false },
  { text: "into", em: false },
  { text: "one", em: false },
  { text: "pipeline.", em: false }
];

const PIPELINE_STEPS = [
  { iconKey: "shopify", label: "Shopify Store" },
  { iconKey: "react", label: "React" },
  { iconKey: "nextjs", label: "Next.js" },
  { iconKey: "php", label: "PHP" },
  { iconKey: "laravel", label: "Laravel" },
  { iconKey: "nodejs", label: "Node.js" }
];

const SPARKLE_POS = [
  { left: "24%", top: "20%", delay: "0s", size: "15px" },
  { left: "70%", top: "28%", delay: "0.7s", size: "18px" },
  { left: "48%", top: "60%", delay: "1.3s", size: "14px" },
  { left: "16%", top: "58%", delay: "2.0s", size: "16px" },
  { left: "82%", top: "62%", delay: "0.4s", size: "13px" }
];

export function FlagshipSpotlightSection() {
  const secRef = useRef<HTMLElement>(null);
  const wordsWrapRef = useRef<HTMLParagraphElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const wordsEl = wordsWrapRef.current;
    const tray = trayRef.current;
    if (!sec || !wordsEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hoverFine = window.matchMedia("(hover: hover)").matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        const spans = wordsEl.querySelectorAll<HTMLElement>(".w");
        if (spans.length) {
          spans.forEach((span, idx) => {
            const targetColor = span.dataset.em === "true" ? "#4F46E5" : "#0F172A";
            gsap.to(span, {
              color: targetColor,
              scrollTrigger: {
                trigger: sec,
                start: `top+=${idx * 16} 76%`,
                end: `top+=${idx * 16 + 85} 58%`,
                scrub: true
              }
            });
          });
        }
      }
    }, sec);

    let cleanupTilt = () => {};
    if (tray && hoverFine && !reduce) {
      const onMove = (e: PointerEvent) => {
        const r = sec.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tray.style.transform = `perspective(1050px) rotateY(${(x * 11).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg)`;
      };
      const onLeave = () => {
        tray.style.transform = "";
      };
      sec.addEventListener("pointermove", onMove, { passive: true });
      sec.addEventListener("pointerleave", onLeave);
      cleanupTilt = () => {
        sec.removeEventListener("pointermove", onMove);
        sec.removeEventListener("pointerleave", onLeave);
      };
    }

    return () => {
      ctx.revert();
      cleanupTilt();
    };
  }, []);

  return (
    <section
      ref={secRef}
      id="flagship"
      className="relative overflow-hidden bg-white/85 py-20 backdrop-blur-sm sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-10">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            <Sparkles size={13} aria-hidden="true" />
            <span>Connected Stack · Docked Pipeline</span>
          </p>

          <p
            ref={wordsWrapRef}
            className="word-reveal mt-5 font-display text-2xl font-medium leading-[1.2] tracking-[-0.03em] text-[#0F172A] sm:text-4xl lg:text-[2.6rem]"
          >
            {STATEMENT_WORDS.map((word, idx) => (
              <span key={idx}>
                <span
                  data-em={word.em ? "true" : "false"}
                  className={`w ${word.em ? "font-bold italic text-[#4F46E5]" : ""}`}
                >
                  {word.text}
                </span>
                {idx < STATEMENT_WORDS.length - 1 ? " " : ""}
              </span>
            ))}
          </p>

          <p className="mt-6 text-base font-medium leading-7 text-[#475569]">
            Scroll watches the floating Shopify Store, React + Next.js, PHP + Laravel, and Node.js modules converge smoothly onto the production workstation dock.
          </p>

          {/* Interactive Mixed Skill Flow Strip */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.label} className="inline-flex items-center gap-2">
                <span className="glass-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-slate-800">
                  <TechBadgeIcon id={step.iconKey} size={15} />
                  <span>{step.label}</span>
                </span>
                {i < PIPELINE_STEPS.length - 1 ? (
                  <ArrowRight size={13} className="text-indigo-400" aria-hidden="true" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/projects/product-subscription-app"
              data-conversion="portfolio_project_click"
              data-project="product-subscription-app"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span>Inspect Subscription App Case Study</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Right Docking Station receiving Shopify Store, React+Next, PHP+Laravel & Node.js objects */}
        <div className="relative flex items-center justify-center py-4 lg:py-8">
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-full bg-gradient-to-br from-indigo-200/45 via-violet-200/35 to-sky-200/45 blur-3xl"
          />

          <div
            ref={trayRef}
            id="flagship-tray-dock"
            data-flight-host="true"
            className="st-tray-dock glass-panel relative flex aspect-[4/3] w-full max-w-[540px] items-center justify-center overflow-visible rounded-[2.25rem] p-6 sm:p-10"
          >
            <div className="st-tray-shine rounded-[2.25rem]" aria-hidden="true" />
            {SPARKLE_POS.map((sp, i) => (
              <i
                key={i}
                aria-hidden="true"
                className="st-tray-sparkle"
                style={
                  {
                    left: sp.left,
                    top: sp.top,
                    "--d": sp.delay,
                    "--sz": sp.size
                  } as React.CSSProperties
                }
              />
            ))}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              id="flagshipTrayImg"
              src="/portfolio/objects/obj-workstation.webp"
              alt="Workstation running Shopify Store, PHP, Laravel, Node.js, React, and Next.js integrations"
              width={760}
              height={760}
              className="relative z-10 h-auto w-[84%] object-contain drop-shadow-[0_26px_42px_rgba(79,70,229,0.22)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

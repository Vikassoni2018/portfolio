"use client";

import { useEffect, useRef } from "react";
import type { Profile } from "@/lib/types";
import { ArrowDownRight, ArrowUpRight, FileText, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { TechBadgeIcon } from "@/components/TechIcons";

type WedgeConfig = {
  key: string;
  label: string;
  role: string;
  iconKey: string;
  src: string;
  tx: number;
  ty: number;
  rz0: number;
  rz1: number;
  rx: number;
  ry: number;
  z: number;
  delay: number;
};

const REAL_WEDGES: WedgeConfig[] = [
  {
    key: "shopify-store",
    label: "Shopify Store",
    role: "Online Store 2.0",
    iconKey: "shopify",
    src: "/portfolio/objects/obj-shopify-store.webp",
    tx: -0.33,
    ty: -0.25,
    rz0: -20,
    rz1: -10,
    rx: 12,
    ry: -18,
    z: 130,
    delay: 0.01
  },
  {
    key: "react-nextjs",
    label: "React + Next.js",
    role: "Frontend App Router",
    iconKey: "nextjs",
    src: "/portfolio/objects/obj-react-nextjs.webp",
    tx: 0.33,
    ty: -0.24,
    rz0: 22,
    rz1: 12,
    rx: -12,
    ry: 18,
    z: 160,
    delay: 0.03
  },
  {
    key: "php-laravel",
    label: "PHP + Laravel",
    role: "Backend & Symfony",
    iconKey: "laravel",
    src: "/portfolio/objects/obj-php-laravel.webp",
    tx: -0.35,
    ty: 0.25,
    rz0: -16,
    rz1: 10,
    rx: 14,
    ry: 14,
    z: -60,
    delay: 0.05
  },
  {
    key: "nodejs",
    label: "Node.js",
    role: "Async Workers",
    iconKey: "nodejs",
    src: "/portfolio/objects/obj-nodejs.webp",
    tx: 0.35,
    ty: 0.24,
    rz0: 18,
    rz1: -10,
    rx: -14,
    ry: -14,
    z: 100,
    delay: 0.04
  },
  {
    key: "shopify-app",
    label: "Shopify Apps",
    role: "Subscriptions & API",
    iconKey: "shopify",
    src: "/portfolio/objects/obj-shopify.webp",
    tx: 0.0,
    ty: -0.33,
    rz0: -8,
    rz1: 14,
    rx: 16,
    ry: 10,
    z: -120,
    delay: 0.02
  },
  {
    key: "payments",
    label: "Stripe + GraphQL",
    role: "Payment Settlement",
    iconKey: "stripe",
    src: "/portfolio/objects/obj-payment.webp",
    tx: 0.01,
    ty: 0.34,
    rz0: 8,
    rz1: -6,
    rx: -10,
    ry: 10,
    z: 140,
    delay: 0.06
  }
];

const HERO_SKILL_CONSTELLATION = [
  { iconKey: "shopify", label: "Shopify" },
  { iconKey: "php", label: "PHP" },
  { iconKey: "laravel", label: "Laravel" },
  { iconKey: "nodejs", label: "Node.js" },
  { iconKey: "react", label: "React" },
  { iconKey: "nextjs", label: "Next.js" },
  { iconKey: "graphql", label: "GraphQL" },
  { iconKey: "stripe", label: "Stripe" }
];

const SHARD_POLYGONS = [
  "polygon(0% 0%, 52% 0%, 48% 50%, 0% 48%)",
  "polygon(48% 0%, 100% 0%, 100% 52%, 50% 48%)",
  "polygon(0% 48%, 50% 50%, 48% 100%, 0% 100%)",
  "polygon(50% 48%, 100% 52%, 100% 100%, 48% 100%)"
];

function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

function smooth(a: number, b: number, v: number) {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function HeroSection({ profile }: { profile: Profile }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const centerObjRef = useRef<HTMLDivElement>(null);
  const wholeRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const shardElsRef = useRef<HTMLDivElement[]>([]);
  const wedgeElsRef = useRef<HTMLDivElement[]>([]);
  const introRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLParagraphElement>(null);
  const bgAltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 901;

    if (reduce || !isDesktop) {
      root.classList.add("hero3d--static");
      return;
    }

    root.classList.remove("hero3d--static");

    let target = 0;
    let prog = 0;
    let visible = true;
    let rafId = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const updateTarget = () => {
      const rect = root.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      target = span > 0 ? clamp(-rect.top / span) : 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "120px" }
    );
    observer.observe(root);

    updateTarget();
    prog = target;

    const t0 = performance.now();

    const frame = () => {
      rafId = window.requestAnimationFrame(frame);
      if (!visible || document.hidden) return;

      const t = (performance.now() - t0) / 1000;
      prog += (target - prog) * 0.18;
      if (Math.abs(target - prog) < 0.0002) prog = target;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      const move = smooth(0, 0.2, prog);
      const crack = smooth(0.14, 0.24, prog);
      const split = smooth(0.22, 0.72, prog);
      const hand = smooth(0.32, 0.44, prog);

      if (introRef.current) {
        const introOpacity = clamp(1 - prog * 6.2);
        introRef.current.style.opacity = introOpacity.toFixed(3);
        introRef.current.style.visibility = introOpacity <= 0.02 ? "hidden" : "visible";
      }

      if (bgAltRef.current) {
        bgAltRef.current.style.opacity = smooth(0.18, 0.55, prog).toFixed(3);
      }

      const bob = Math.sin(t * 1.15) * 8 * (1 - split);
      const scale = lerp(1, 1.14, move);
      if (centerObjRef.current) {
        centerObjRef.current.style.transform = `translate(-50%, -50%) translate3d(0, ${bob.toFixed(1)}px, 0) rotateX(${(-pointer.y * 8 * (1 - split)).toFixed(2)}deg) rotateY(${(pointer.x * 11 * (1 - split)).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }
      if (shadowRef.current) {
        shadowRef.current.style.opacity = (1 - crack).toFixed(3);
      }
      if (wholeRef.current) {
        wholeRef.current.style.opacity = (1 - smooth(0.18, 0.24, prog)).toFixed(3);
      }

      const shardActive = prog > 0.14 && prog < 0.52;
      shardElsRef.current.forEach((el, idx) => {
        if (!el) return;
        el.style.visibility = shardActive ? "visible" : "hidden";
        if (!shardActive) return;
        const dx = idx % 2 === 0 ? -1 : 1;
        const dy = idx < 2 ? -1 : 1;
        const k = smooth(0.15, 0.45, prog);
        el.style.opacity = (1 - hand).toFixed(3);
        el.style.transform = `translate3d(${(dx * k * 90).toFixed(1)}px, ${(dy * k * 70).toFixed(1)}px, 0) rotate(${(dx * dy * k * 14).toFixed(1)}deg) scale(${lerp(1, 0.82, k).toFixed(3)})`;
      });

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const showWedges = prog > 0.18;
      wedgeElsRef.current.forEach((el, idx) => {
        if (!el) return;
        const w = REAL_WEDGES[idx];
        el.style.visibility = showWedges ? "visible" : "hidden";
        if (!showWedges || !w) return;

        const k = smooth(0.18 + w.delay, 0.62 + w.delay, prog);
        const exitK = smooth(0.86, 1.0, prog);
        const floatY = Math.sin(t * 0.9 + idx * 1.4) * 9 * k;
        const x = lerp(0, w.tx * vw, k) * (1 + exitK * 0.5);
        const y = lerp(0, w.ty * vh, k) + floatY - exitK * vh * 0.14;
        const rz = lerp(w.rz0, w.rz1, k) + Math.sin(t * 0.4 + idx) * 6 * k;
        const rx = (w.rx + Math.sin(t * 0.5 + idx) * 14) * k;
        const ry = (w.ry + Math.cos(t * 0.45 + idx) * 18) * k;
        const z = w.z * k;
        const px = pointer.x * (24 + w.z * 0.08) * k;
        const py = pointer.y * (18 + w.z * 0.06) * k;
        const sc = lerp(0.35, 1, k) * (1 - exitK * 0.35);
        const op = smooth(0, 0.14, k) * (1 - exitK * 0.9);

        el.style.opacity = op.toFixed(3);
        el.style.transform = `translate3d(${(vw / 2 + x + px).toFixed(1)}px, ${(vh / 2 + y + py).toFixed(1)}px, ${z.toFixed(1)}px) translate(-50%, -50%) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
      });

      if (burstRef.current) {
        const bo = clamp((prog - 0.32) * 5.2) * (1 - smooth(0.86, 1.0, prog));
        burstRef.current.style.opacity = bo.toFixed(3);
        burstRef.current.style.visibility = bo > 0.02 ? "visible" : "hidden";
        burstRef.current.style.transform = `translateY(${((1 - clamp((prog - 0.32) * 3.5)) * 28).toFixed(1)}px) scale(${(0.95 + clamp((prog - 0.32) * 0.25) * 0.1).toFixed(3)})`;
      }
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero3d fsx relative"
      style={{ "--hero-len": "230vh" } as React.CSSProperties}
    >
      <div ref={stageRef} className="hero3d__stage">
        <div className="fx-bgs">
          <div
            className="fx-bg"
            style={{
              opacity: 1,
              background:
                "radial-gradient(92% 78% at 50% 48%, #FFFFFF 0%, #EEF2FF 55%, #E0E7FF 100%)"
            }}
          />
          <div
            ref={bgAltRef}
            className="fx-bg"
            style={{
              background:
                "radial-gradient(88% 72% at 50% 48%, #F8FAFC 0%, #EDE9FE 52%, #E0F2FE 100%)"
            }}
          />
        </div>

        {/* Center Real Workstation + 6 Exploding Branded Stack Objects */}
        <div className="fx-world" aria-hidden="true">
          <div ref={centerObjRef} className="fx-object-center">
            <div ref={shadowRef} className="fx-shadow" />
            <div className="fx-shard-layer">
              {SHARD_POLYGONS.map((clipPath, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    if (el) shardElsRef.current[idx] = el;
                  }}
                  className="fx-shard"
                  style={{
                    visibility: "hidden",
                    clipPath,
                    backgroundImage: "url(/portfolio/objects/obj-workstation.webp)"
                  }}
                />
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={wholeRef}
              src="/portfolio/objects/obj-workstation.webp"
              alt=""
              width={760}
              height={760}
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_26px_42px_rgba(79,70,229,0.2)]"
            />
          </div>

          {REAL_WEDGES.map((w, idx) => (
            <div
              key={w.key}
              ref={(el) => {
                if (el) wedgeElsRef.current[idx] = el;
              }}
              className="fx-wedge flex flex-col items-center"
              style={{
                width: "clamp(120px, 13vw, 200px)",
                visibility: "hidden"
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.src} alt="" width={760} height={760} />
              <div className="glass-pill mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 shadow-md">
                <TechBadgeIcon id={w.iconKey} size={13} />
                <span className="whitespace-nowrap font-mono text-[10px] font-bold text-slate-900">
                  {w.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3-Column Above-the-Fold Reference Hero */}
        <div ref={introRef} className="hero3d__copy hero3d__copy--intro">
          <div className="fx-left">
            <p className="glass-pill inline-flex max-w-full flex-wrap items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-indigo-500" aria-hidden="true" />
              <span>{profile.title}</span>
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.1rem,4.1vw,3.9rem)] font-bold leading-[1.03] tracking-[-0.04em] text-[#0F172A]">
              <span className="block">Engineering</span>
              <span className="block">Scalable Shopify</span>
              <em className="block bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#0EA5E9] bg-clip-text not-italic text-transparent">
                &amp; Backend Systems.
              </em>
            </h1>

            {/* Mixed Skill Icons Stack Ribbon directly visible on Hero */}
            <ul
              aria-label="Core stack technologies"
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              {HERO_SKILL_CONSTELLATION.map((chip) => (
                <li
                  key={chip.label}
                  className="glass-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold text-slate-800"
                >
                  <TechBadgeIcon id={chip.iconKey} size={14} />
                  <span>{chip.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fx-right">
            <p className="text-sm font-medium leading-7 text-[#475569] sm:text-base">
              {profile.bio}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/#contact"
                data-conversion="primary_cta_click"
                data-location="hero"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:text-sm"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>

              <Link
                href="/#projects"
                className="glass-pill inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-3 text-xs font-bold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-700 sm:text-sm"
              >
                <span>Explore Work</span>
                <ArrowDownRight size={15} aria-hidden="true" />
              </Link>

              {profile.resume ? (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-indigo-200/80 bg-white/80 px-4 py-2.5 text-xs font-bold text-slate-700 backdrop-blur-md transition hover:border-indigo-300 hover:text-indigo-700"
                >
                  <FileText size={14} className="text-indigo-600" aria-hidden="true" />
                  <span>Resume</span>
                </a>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[#64748B]">
              {profile.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-indigo-500" aria-hidden="true" />
                  <span>{profile.location} · Remote Worldwide</span>
                </span>
              ) : null}
              <a
                href={`mailto:${profile.email}`}
                data-conversion="contact_link_click"
                className="inline-flex items-center gap-1.5 text-slate-700 underline decoration-indigo-200 underline-offset-4 hover:text-indigo-700"
              >
                <Mail size={14} className="text-indigo-500" aria-hidden="true" />
                <span>{profile.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Burst Headline */}
        <div className="hero3d__copy hero3d__copy--burst" aria-hidden="true">
          <p
            ref={burstRef}
            className="hero3d__burst max-w-3xl font-display text-4xl font-bold leading-tight tracking-[-0.04em] text-[#0F172A] sm:text-6xl"
          >
            Full-stack commerce,{" "}
            <em className="bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#0EA5E9] bg-clip-text font-normal italic text-transparent">
              Shopify to Next.js.
            </em>
          </p>
        </div>
      </div>
    </section>
  );
}

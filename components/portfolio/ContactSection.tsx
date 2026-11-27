"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile } from "@/lib/types";
import { EnquiryForm } from "@/components/EnquiryForm";
import { TechBadgeIcon } from "@/components/TechIcons";
import {
  ArrowUpRight,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone
} from "lucide-react";
import { GlassSpotlightCard } from "./GlassSpotlightCard";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection({ profile }: { profile: Profile }) {
  const secRef = useRef<HTMLElement>(null);
  const floatLeftRef = useRef<HTMLDivElement>(null);
  const floatRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const fl = floatLeftRef.current;
    const fr = floatRightRef.current;
    if (!sec || !fl || !fr) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hoverFine = window.matchMedia("(hover: hover)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from([fl, fr], {
        opacity: 0,
        scale: 0.6,
        y: 90,
        rotation: (i) => (i === 0 ? -24 : 20),
        duration: 1.2,
        ease: "back.out(1.6)",
        stagger: 0.18,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: sec,
          start: "top 78%",
          once: true
        }
      });
    }, sec);

    let cleanupMove = () => {};
    if (hoverFine && window.innerWidth >= 1024) {
      const onMove = (e: PointerEvent) => {
        const r = sec.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(fl, { x: -x * 36, y: -y * 36, duration: 0.85, ease: "power3.out" });
        gsap.to(fr, { x: -x * 54, y: -y * 54, duration: 0.85, ease: "power3.out" });
      };
      const onLeave = () => {
        gsap.to([fl, fr], { x: 0, y: 0, duration: 1.1, ease: "power3.out" });
      };
      sec.addEventListener("pointermove", onMove, { passive: true });
      sec.addEventListener("pointerleave", onLeave);
      cleanupMove = () => {
        sec.removeEventListener("pointermove", onMove);
        sec.removeEventListener("pointerleave", onLeave);
      };
    }

    return () => {
      ctx.revert();
      cleanupMove();
    };
  }, []);

  const digits = profile.mobile.replace(/[^\d]/g, "");
  const whatsappUrl = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(
        "Hi Vikas, I visited your portfolio and would like to discuss a Shopify / web project."
      )}`
    : "";

  return (
    <section
      ref={secRef}
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#F5F3FF]/70 via-[#EEF2FF]/80 to-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      {/* Floating Branded Hardware Depth Accents (fsf-cta-banner mouse parallax parity) */}
      <div
        ref={floatLeftRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 top-10 hidden w-44 opacity-90 xl:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/portfolio/objects/obj-shopify-store.webp"
          alt=""
          width={240}
          height={240}
          className="h-auto w-full object-contain drop-shadow-[0_24px_34px_rgba(79,70,229,0.22)]"
        />
      </div>

      <div
        ref={floatRightRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 bottom-8 hidden w-48 opacity-90 xl:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/portfolio/objects/obj-react-nextjs.webp"
          alt=""
          width={260}
          height={260}
          className="h-auto w-full object-contain drop-shadow-[0_26px_38px_rgba(79,70,229,0.22)]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Direct Channels */}
          <div className="min-w-0 lg:col-span-5" data-gsap="section-header">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              08 · Start a Conversation
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
              Let&apos;s build your next commerce or API milestone.
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-[#475569]">
              Available for custom Shopify app engineering, subscription workflows, PHP Symfony/Laravel systems, and storefront architecture.
            </p>

            <div className="mt-8 grid gap-3.5">
              <GlassSpotlightCard className="p-4">
                <a
                  href={`mailto:${profile.email}`}
                  data-conversion="contact_link_click"
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <Mail size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Email
                      </span>
                      <span className="block text-sm font-bold text-slate-900">
                        {profile.email}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-indigo-500" aria-hidden="true" />
                </a>
              </GlassSpotlightCard>

              <GlassSpotlightCard className="p-4">
                <a
                  href={`tel:${profile.mobile.replace(/\s+/g, "")}`}
                  data-conversion="contact_link_click"
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <Phone size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Phone
                      </span>
                      <span className="block text-sm font-bold text-slate-900">
                        {profile.mobile}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-indigo-500" aria-hidden="true" />
                </a>
              </GlassSpotlightCard>

              {whatsappUrl ? (
                <GlassSpotlightCard className="p-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-conversion="contact_link_click"
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                        <MessageSquare size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          WhatsApp Direct
                        </span>
                        <span className="block text-sm font-bold text-slate-900">
                          Chat on WhatsApp
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-emerald-600" aria-hidden="true" />
                  </a>
                </GlassSpotlightCard>
              ) : null}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {profile.linkedin ? (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-pill inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
                  >
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : null}
                {profile.resume ? (
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-pill inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
                  >
                    <FileText size={14} className="text-indigo-600" aria-hidden="true" />
                    <span>Resume PDF</span>
                  </a>
                ) : null}
                {profile.location ? (
                  <span className="inline-flex items-center gap-1.5 px-2 text-xs font-semibold text-slate-500">
                    <MapPin size={14} className="text-indigo-500" aria-hidden="true" />
                    <span>{profile.location}</span>
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right Preserved EnquiryForm inside elevated Frosted White Glass Panel */}
          <div className="min-w-0 lg:col-span-7">
            <div className="glass-panel-strong rounded-[2rem] p-6 sm:p-8 lg:p-10">
              <div className="mb-6 border-b border-indigo-100/80 pb-5">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                  Project Brief
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-bold text-slate-900">
                  Send a direct project enquiry
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  Share your store setup, timeline, or integration requirements.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {[
                    { key: "shopify", label: "Shopify" },
                    { key: "php", label: "PHP" },
                    { key: "laravel", label: "Laravel" },
                    { key: "nodejs", label: "Node.js" },
                    { key: "react", label: "React" },
                    { key: "nextjs", label: "Next.js" }
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-1 rounded-full border border-indigo-100 bg-indigo-50/70 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-700"
                    >
                      <TechBadgeIcon id={item.key} size={12} />
                      <span>{item.label}</span>
                    </span>
                  ))}
                </div>
              </div>
              <EnquiryForm email={profile.email} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

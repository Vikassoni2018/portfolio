"use client";

import type { Profile } from "@/lib/types";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function FooterSection({ profile }: { profile: Profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-indigo-100/90 bg-white/80 pt-16 backdrop-blur-lg">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="inline-flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] font-display text-xs font-bold text-white"
              >
                VS
              </span>
              <span className="font-display text-lg font-bold text-slate-900">
                {profile.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm font-medium leading-6 text-slate-600">
              {profile.title} focused on Shopify apps, recurring billing suites, and scalable PHP backend architecture.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
              Explore
            </p>
            <ul className="mt-4 grid gap-2.5 text-sm font-semibold text-slate-600">
              <li>
                <Link href="/#about" className="hover:text-indigo-700">About</Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-indigo-700">Skills</Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-indigo-700">Experience</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-indigo-700">Projects</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-indigo-700">Engineering Blog</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
              Services
            </p>
            <ul className="mt-4 grid gap-2.5 text-sm font-semibold text-slate-600">
              <li>
                <Link href="/projects/shopify-cross-selling" className="hover:text-indigo-700">
                  Shopify Cross-Selling
                </Link>
              </li>
              <li>
                <Link href="/projects/shopify-store-boost-jsonld" className="hover:text-indigo-700">
                  Store Boost + JSON-LD
                </Link>
              </li>
              <li>
                <Link href="/projects/shopify-discount-apis" className="hover:text-indigo-700">
                  Shopify Discount APIs
                </Link>
              </li>
              <li>
                <Link href="/services/shopify-app-development" className="hover:text-indigo-700">
                  Shopify App Development
                </Link>
              </li>
              <li>
                <Link href="/landing-page-designs" prefetch={false} className="hover:text-indigo-700">
                  Design Showcase (10 Concepts)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
              Connect
            </p>
            <ul className="mt-4 grid gap-2.5 text-sm font-semibold text-slate-600">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  data-conversion="contact_link_click"
                  className="inline-flex items-center gap-1 hover:text-indigo-700"
                >
                  <span>{profile.email}</span>
                </a>
              </li>
              {profile.linkedin ? (
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-indigo-700"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ) : null}
              {profile.resume ? (
                <li>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-indigo-700"
                  >
                    <span>Download Resume</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ) : null}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="glass-pill inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-700"
                >
                  <ArrowUp size={14} aria-hidden="true" />
                  <span>Back to top</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-indigo-100/80 py-6 text-xs font-medium text-slate-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-600">
            Shopify Apps &amp; Storefronts · PHP / Laravel / Node.js / React / Next.js
          </p>
        </div>

        {/* Oversized Editorial Decorative Watermark */}
        <svg
          role="presentation"
          aria-hidden="true"
          viewBox="0 0 1200 175"
          className="pointer-events-none block h-auto w-full select-none text-indigo-950/[0.045]"
        >
          <text
            x="50%"
            y="84%"
            textAnchor="middle"
            fill="currentColor"
            className="font-display text-[176px] font-bold tracking-[-0.05em]"
          >
            VIKAS SONI
          </text>
        </svg>
      </div>
    </footer>
  );
}

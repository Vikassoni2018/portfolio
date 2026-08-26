import { ArrowUpRight, ChevronRight, Mail } from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import profile from "@/data/profile.json";
import type { Profile } from "@/lib/types";
import Link from "next/link";

export type Crumb = { name: string; path: string };

/**
 * Chrome for every page that is not the home page: navbar, visible breadcrumb
 * trail (the visual half of the BreadcrumbList schema) and a closing CTA.
 */
export function PageShell({ crumbs, children }: { crumbs: Crumb[]; children: React.ReactNode }) {
  return (
    <div className="theme-scroll-page min-h-screen">
      <PublicNavbar profile={profile as Profile} />

      <div className="border-b border-slate-100 bg-slate-50/60 backdrop-blur-sm">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-1.5 px-5 py-3.5 text-xs font-bold text-slate-500 sm:px-8 lg:px-10"
        >
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <span key={crumb.path} className="inline-flex items-center gap-1.5">
                {index > 0 ? <ChevronRight size={13} className="text-slate-300" /> : null}
                {isLast ? (
                  <span aria-current="page" className="text-slate-900">
                    {crumb.name}
                  </span>
                ) : (
                  <a href={crumb.path} className="transition hover:text-blue-600">
                    {crumb.name}
                  </a>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      <main>{children}</main>

      <ClosingCta />
    </div>
  );
}

function ClosingCta() {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-400">Next step</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl">
          Have a project that needs this?
        </h2>
        <p className="mt-4 max-w-xl text-base font-medium leading-7 text-slate-400">
          Tell me what you are building and where it is stuck. I will tell you honestly whether it is
          something I can help with.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <Mail size={16} /> {profile.email}
          </a>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-extrabold text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            See all work <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

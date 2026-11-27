import { ArrowUpRight, ChevronRight, Mail } from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import Link from "next/link";

export type Crumb = { name: string; path: string };

/**
 * Chrome for secondary pages: floating frosted navbar, visible breadcrumb
 * trail matching BreadcrumbList schema, and a light glassmorphism closing CTA.
 */
export function PageShell({ crumbs, children }: { crumbs: Crumb[]; children: React.ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen text-[#0F172A]">
      <PublicNavbar />

      <div className="mt-3 border-y border-indigo-100/80 bg-white/70 backdrop-blur-md">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-1.5 px-5 py-3 text-xs font-bold text-slate-500 sm:px-8 lg:px-10"
        >
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <span key={crumb.path} className="inline-flex items-center gap-1.5">
                {index > 0 ? <ChevronRight size={13} className="text-slate-300" aria-hidden="true" /> : null}
                {isLast ? (
                  <span aria-current="page" className="text-slate-900">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="transition hover:text-indigo-600">
                    {crumb.name}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      <main id="main-content" className="overflow-x-clip">{children}</main>

      <ClosingCta />
    </div>
  );
}

function ClosingCta() {
  return (
    <section className="relative border-t border-indigo-100/80 bg-gradient-to-br from-[#EEF2FF]/90 via-[#F8FAFC]/95 to-[#F5F3FF]/90 py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="glass-panel-strong rounded-[2rem] p-7 sm:p-10 lg:p-12">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Next step
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0F172A] sm:text-5xl">
            Let&apos;s discuss your development project.
          </h2>
          <p className="mt-4 max-w-xl text-base font-medium leading-7 text-[#475569]">
            Share your goals, existing setup, and timeline. I can help you assess the next steps for your
            Shopify app, storefront, PHP backend, or payment integration.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link
              href="/#contact"
              data-conversion="primary_cta_click"
              data-location="closing"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Mail size={16} aria-hidden="true" />
              <span>Discuss Your Project</span>
            </Link>
            <Link
              href="/#projects"
              className="glass-pill inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-slate-800 transition hover:border-indigo-300 hover:text-indigo-700"
            >
              <span>Explore development projects</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

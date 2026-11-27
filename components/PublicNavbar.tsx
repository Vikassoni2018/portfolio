import profile from "@/data/profile.json";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { MobileNavigation } from "@/components/MobileNavigation";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#services", label: "Services" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/landing-page-designs", label: "Showcase" },
  { href: "/blog", label: "Blog" }
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-100/90 bg-white/92 backdrop-blur-xl shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
      {profile.offerLabel ? (
        <Link
          href="/#contact"
          className="flex w-full items-center justify-center gap-2 border-b border-indigo-100 bg-indigo-50/90 px-4 py-1.5 text-center text-xs font-bold text-indigo-800 transition hover:bg-indigo-100/80"
        >
          <Sparkles size={13} className="shrink-0 text-indigo-600" aria-hidden="true" />
          <span>{profile.offerLabel}</span>
          <ArrowUpRight size={13} className="shrink-0 text-indigo-500" aria-hidden="true" />
        </Link>
      ) : null}

      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-10"
      >
        <Link
          href="/"
          className="group inline-flex min-h-10 shrink-0 items-center gap-3 text-slate-900"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] via-[#6366F1] to-[#8B5CF6] font-display text-xs font-bold tracking-tight text-white shadow-sm shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105"
          >
            VS
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-tight text-slate-900 sm:text-base">
              {profile.name}
            </span>
            <span className="hidden font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:block">
              Shopify &amp; Full-Stack
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={item.href.startsWith("/#") ? undefined : false}
              className="whitespace-nowrap rounded-lg px-3.5 py-2 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-indigo-50/80 hover:text-indigo-700"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/#contact"
            data-conversion="primary_cta_click"
            data-location="header"
            className="hidden min-h-10 items-center gap-1.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>

          <MobileNavigation items={navItems} offerLabel={profile.offerLabel} />
        </div>
      </nav>
    </header>
  );
}

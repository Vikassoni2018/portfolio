"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  href: string;
  label: string;
};

export function MobileNavigation({
  items,
  offerLabel
}: {
  items: NavItem[];
  offerLabel?: string;
}) {
  const pathname = usePathname() || "/";
  const [openedAtPath, setOpenedAtPath] = useState<string | null>(null);
  const open = openedAtPath === pathname;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedAtPath(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpenedAtPath(open ? null : pathname)}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-200/80 bg-white text-slate-800 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600"
      >
        {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
      </button>

      {open ? (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 top-[65px] z-50 border-b border-indigo-100 bg-white/96 px-5 pb-6 pt-4 shadow-glass-hover backdrop-blur-2xl"
        >
          {offerLabel ? (
            <Link
              href="/#contact"
              onClick={() => setOpenedAtPath(null)}
              className="mb-4 flex items-center gap-2 rounded-2xl border border-indigo-100 bg-indigo-50/80 px-4 py-3 text-xs font-bold text-indigo-800"
            >
              <Sparkles size={14} className="shrink-0 text-indigo-600" aria-hidden="true" />
              <span>{offerLabel}</span>
            </Link>
          ) : null}

          <nav aria-label="Mobile sections" className="grid gap-1.5">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpenedAtPath(null)}
                className="flex min-h-11 items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50/70 hover:text-indigo-700"
              >
                <span>{item.label}</span>
                <ArrowUpRight size={15} className="text-slate-400" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <Link
            href="/#contact"
            onClick={() => setOpenedAtPath(null)}
            data-conversion="primary_cta_click"
            data-location="mobile_nav"
            className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/20"
          >
            Start a Project
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

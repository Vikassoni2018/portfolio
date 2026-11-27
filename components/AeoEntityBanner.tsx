import profile from "@/data/profile.json";
import { siteUrl } from "@/lib/site";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function AeoEntityBanner({
  label = "Direct Summary · GEO & AEO Reference",
  summary
}: {
  label?: string;
  summary: string;
}) {
  return (
    <aside
      aria-label="Direct Answer and Author Reference"
      data-aeo-summary="true"
      className="glass-panel mt-8 rounded-3xl border-indigo-200/80 p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-700">
          <Sparkles size={13} aria-hidden="true" />
          <span>{label}</span>
        </p>
        <span className="font-mono text-[11px] font-semibold text-slate-600">
          Author:{" "}
          <Link href="/" className="font-bold text-indigo-700 hover:underline">
            {profile.name}
          </Link>
        </span>
      </div>

      <p className="mt-2.5 text-sm font-medium leading-6 text-slate-700">{summary}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-indigo-100/80 pt-3 text-xs font-semibold text-slate-600">
        <span>
          Canonical Website:{" "}
          <Link href="/" className="font-bold text-indigo-700 hover:underline">
            {siteUrl}
          </Link>
        </span>
        <Link
          href="/#contact"
          className="ml-auto inline-flex items-center gap-1 font-bold text-indigo-700 hover:text-indigo-800"
        >
          <span>Discuss with {profile.name}</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

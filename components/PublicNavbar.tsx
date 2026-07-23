import { ArrowUpRight, Download } from "lucide-react";
import type { Profile } from "@/lib/types";

const links = [
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Education", "#education"]
];

export function PublicNavbar({ profile }: { profile: Profile }) {
  const initials = (profile.name || "VS")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Back to top">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-md shadow-blue-600/20">
            {initials}
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-extrabold leading-none text-slate-900">{profile.name || "Portfolio"}</span>
            <span className="mt-1 block text-[10px] font-bold text-slate-400">Sr. Shopify Developer</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/80 p-1 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-white hover:text-blue-700 hover:shadow-sm"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {profile.resume ? (
            <a
              href={profile.resume}
              className="hidden items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100 sm:inline-flex"
            >
              <Download size={15} /> Resume
            </a>
          ) : null}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
        </div>
      </nav>
    </header>
  );
}

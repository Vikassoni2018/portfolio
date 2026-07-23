import { ArrowUpRight, Download } from "lucide-react";
import type { Profile } from "@/lib/types";

const links = [
  ["Work", "#projects"],
  ["Capabilities", "#skills"],
  ["Experience", "#experience"]
];

export function PublicNavbar({ profile }: { profile: Profile }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black bg-[#f2f0e8]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-[70px] max-w-[1440px] items-center">
        <a
          href="#top"
          className="flex h-full min-w-0 flex-1 items-center gap-3 border-r border-black px-5 sm:px-8 lg:max-w-[360px] lg:px-10"
          aria-label="Back to top"
        >
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#ff4d00]" />
          <span className="truncate text-sm font-black uppercase tracking-[-0.02em]">{profile.name || "Portfolio"}</span>
        </a>

        <div className="hidden h-full items-center md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="flex h-full items-center border-r border-black px-5 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition hover:bg-[#1638ff] hover:text-white lg:px-7"
            >
              {label}
            </a>
          ))}
        </div>

        {profile.resume ? (
          <a
            href={profile.resume}
            className="hidden h-full items-center gap-2 border-r border-black px-5 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition hover:bg-black hover:text-white sm:flex"
          >
            <Download size={15} /> CV
          </a>
        ) : null}

        <a
          href="#contact"
          className="flex h-full items-center gap-2 bg-[#1638ff] px-5 text-xs font-black uppercase text-white transition hover:bg-[#ff4d00] hover:text-black sm:px-7"
        >
          Let&apos;s talk <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}

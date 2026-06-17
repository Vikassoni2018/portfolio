import { Menu } from "lucide-react";
import type { Profile } from "@/lib/types";

const links = [
  ["Home", "#"],
  ["Skills", "#skills"],
  ["Work", "#projects"],
  ["Experience", "#experience"],
  ["Contact", "#contact"]
];

export function PublicNavbar({ profile }: { profile: Profile }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#08080d]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1052px] items-center justify-between px-6 py-3">
        <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-[#9b7cff] shadow-[0_0_18px_rgba(155,124,255,0.95)]" />
          {profile.name || "Portfolio"}
        </a>
        <div className="hidden items-center gap-2 text-sm font-semibold text-[#77737f] md:flex">
          {links.map(([label, href], index) => (
            <a
              key={href}
              className={index === 0 ? "rounded-lg bg-white/[0.09] px-4 py-2 text-white" : "rounded-lg px-4 py-2 transition hover:text-white"}
              href={href}
            >
              {label}
            </a>
          ))}
          <a className="ml-3 rounded-lg bg-[#9b7cff] px-5 py-2 font-bold text-[#0b0912] shadow-[0_0_28px_rgba(155,124,255,0.38)] hover:bg-[#b5a1ff]" href="#contact">
            Hire Me
          </a>
        </div>
        <button className="rounded-lg p-2 text-white md:hidden" aria-label="Open menu">
          <Menu size={24} />
        </button>
      </nav>
    </header>
  );
}

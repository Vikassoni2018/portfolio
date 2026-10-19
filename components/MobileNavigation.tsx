"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useRef } from "react";

export function MobileNavigation({ links }: { links: string[][] }) {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node))
        menu.current.open = false;
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return (
    <details ref={menu} className="relative md:hidden">
      <summary
        className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 text-slate-700 [&::-webkit-details-marker]:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </summary>
      <div className="absolute right-0 top-14 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            onClick={() => {
              if (menu.current) menu.current.open = false;
            }}
            className="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
          >
            {label}
          </Link>
        ))}
      </div>
    </details>
  );
}

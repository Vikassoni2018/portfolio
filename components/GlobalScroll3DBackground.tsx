"use client";

import { useCallback, useEffect, useRef } from "react";

const floatingLabels = [
  { name: "git", detail: "main", className: "theme-scroll-card-one" },
  { name: "API", detail: "connected", className: "theme-scroll-card-two" },
  { name: "GQL", detail: "synced", className: "theme-scroll-card-three" }
];

const rainColumns = [
  {
    className: "theme-scroll-rain-one",
    duration: "22s",
    tokens: ["const", "await", "=> {", "0x1F", "async", "</>", "git", "push", "200 OK", "npm", "{ }", "hmac"]
  },
  {
    className: "theme-scroll-rain-two",
    duration: "27s",
    tokens: ["POST", "webhook", "retry", "idempotent", "queue", "GraphQL", "mutation", ":=", "200", "sync", "<Bulk>", "ack"]
  },
  {
    className: "theme-scroll-rain-three",
    duration: "19s",
    tokens: ["php", "symfony", "laravel", "->", "SELECT", "JOIN", "cache", "redis", "job", "worker", "::", "run()"]
  }
];

const particles = [
  { left: "7%", top: "22%", delay: "-1s", duration: "7s" },
  { left: "24%", top: "69%", delay: "-4s", duration: "8.6s" },
  { left: "43%", top: "13%", delay: "-2.3s", duration: "6.8s" },
  { left: "64%", top: "76%", delay: "-5.4s", duration: "9.2s" },
  { left: "82%", top: "31%", delay: "-3.1s", duration: "7.7s" },
  { left: "94%", top: "62%", delay: "-0.8s", duration: "8.2s" }
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function GlobalScroll3DBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const scrollProgress = useRef(0);
  const frameRequest = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  const paint = useCallback(() => {
    frameRequest.current = null;
    const root = rootRef.current;
    if (!root) return;

    const pointerX = reducedMotion.current ? 0.5 : pointer.current.x;
    const pointerY = reducedMotion.current ? 0.5 : pointer.current.y;
    const scroll = reducedMotion.current ? 0 : scrollProgress.current;

    root.style.setProperty("--theme-pointer-x", `${(pointerX - 0.5) * 28}px`);
    root.style.setProperty("--theme-pointer-y", `${(pointerY - 0.5) * 22}px`);
    root.style.setProperty("--theme-tilt-x", `${(0.5 - pointerY) * 6}deg`);
    root.style.setProperty("--theme-tilt-y", `${(pointerX - 0.5) * 9}deg`);
    root.style.setProperty("--theme-scroll-up", `${scroll * -190}px`);
    root.style.setProperty("--theme-scroll-down", `${scroll * 145}px`);
    root.style.setProperty("--theme-scroll-rotate", `${scroll * 620}deg`);
    root.style.setProperty("--theme-scroll-rotate-reverse", `${scroll * -341}deg`);
    root.style.setProperty("--theme-scroll-progress", scroll.toFixed(4));
    root.style.setProperty("--theme-progress-width", `${28 + scroll * 68}%`);
  }, []);

  const schedulePaint = useCallback(() => {
    if (frameRequest.current === null) {
      frameRequest.current = window.requestAnimationFrame(paint);
    }
  }, [paint]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      reducedMotion.current = motionQuery.matches;
      schedulePaint();
    };

    const updatePointer = (event: PointerEvent) => {
      pointer.current.x = clamp(event.clientX / Math.max(window.innerWidth, 1), 0, 1);
      pointer.current.y = clamp(event.clientY / Math.max(window.innerHeight, 1), 0, 1);
      schedulePaint();
    };

    const resetPointer = () => {
      pointer.current = { x: 0.5, y: 0.5 };
      schedulePaint();
    };

    const updateScroll = () => {
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollProgress.current = clamp(window.scrollY / scrollRange, 0, 1);
      schedulePaint();
    };

    updateMotionPreference();
    updateScroll();
    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      motionQuery.removeEventListener("change", updateMotionPreference);
      if (frameRequest.current !== null) window.cancelAnimationFrame(frameRequest.current);
    };
  }, [schedulePaint]);

  return (
    <div
      ref={rootRef}
      className="theme-scroll-root pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="theme-scroll-base absolute inset-0" />
      <div className="theme-scroll-grid absolute -bottom-[28%] left-[-20%] h-[72%] w-[140%]" />

      <div className="theme-scroll-scene absolute inset-0">
        <div className="theme-scroll-tunnel absolute left-[3%] top-[9%] h-72 w-72">
          {[0, 1, 2, 3].map((ring) => (
            <span
              key={ring}
              className={`theme-scroll-tunnel-ring theme-scroll-tunnel-ring-${ring + 1} absolute rounded-[28%]`}
            />
          ))}
        </div>

        <div className="theme-scroll-cube absolute bottom-[12%] right-[6%] h-20 w-20">
          <span className="theme-scroll-cube-face theme-scroll-cube-front" />
          <span className="theme-scroll-cube-face theme-scroll-cube-back" />
          <span className="theme-scroll-cube-face theme-scroll-cube-right" />
          <span className="theme-scroll-cube-face theme-scroll-cube-left" />
          <span className="theme-scroll-cube-face theme-scroll-cube-top" />
          <span className="theme-scroll-cube-face theme-scroll-cube-bottom" />
        </div>

        <div className="theme-scroll-orbit absolute right-[17%] top-[12%] h-56 w-56 rounded-full">
          <span className="absolute inset-0 rounded-full border border-dashed border-blue-400/20" />
          <span className="absolute inset-[21%] rounded-full border border-indigo-400/20" />
          <span className="theme-scroll-orbit-dot absolute h-2.5 w-2.5 rounded-full bg-blue-500" />
        </div>

        {floatingLabels.map((item) => (
          <div
            key={item.name}
            className={`theme-scroll-card ${item.className} absolute rounded-2xl border border-blue-200/70 bg-white/65 px-3.5 py-3 shadow-xl shadow-blue-600/10 backdrop-blur-md`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/10 font-mono text-[10px] font-black text-blue-700">
                {item.name}
              </span>
              <div>
                <p className="font-mono text-[8px] font-black uppercase tracking-[0.14em] text-blue-600">{item.detail}</p>
                <span className="mt-1 block h-1 w-12 overflow-hidden rounded-full bg-blue-100">
                  <span className="theme-scroll-card-progress block h-full rounded-full bg-blue-500" />
                </span>
              </div>
            </div>
          </div>
        ))}

        <span className="theme-scroll-glyph theme-scroll-glyph-one absolute font-mono font-black text-blue-600/15">
          {"{ }"}
        </span>
        <span className="theme-scroll-glyph theme-scroll-glyph-two absolute font-mono font-black text-indigo-600/15">
          {"</>"}
        </span>

        {rainColumns.map((column) => (
          <div key={column.className} className={`theme-scroll-rain ${column.className} absolute`}>
            {/* Tokens are duplicated so the vertical scroll loops seamlessly. */}
            <div className="theme-scroll-rain-track" style={{ animationDuration: column.duration }}>
              {[...column.tokens, ...column.tokens].map((token, tokenIndex) => (
                <span key={`${token}-${tokenIndex}`} className="theme-scroll-rain-token">
                  {token}
                </span>
              ))}
            </div>
          </div>
        ))}

        {particles.map((particle) => (
          <span
            key={`${particle.left}-${particle.top}`}
            className="theme-scroll-particle absolute h-1.5 w-1.5 rounded-full bg-blue-500"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>
    </div>
  );
}

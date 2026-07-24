"use client";

import { useCallback, useEffect, useRef } from "react";

const particles = [
  { left: "8%", top: "18%", size: 5, delay: "-0.6s", duration: "6.2s" },
  { left: "18%", top: "76%", size: 4, delay: "-2.1s", duration: "7.4s" },
  { left: "36%", top: "12%", size: 3, delay: "-3.8s", duration: "5.8s" },
  { left: "47%", top: "68%", size: 6, delay: "-1.4s", duration: "8.1s" },
  { left: "61%", top: "22%", size: 4, delay: "-4.4s", duration: "6.7s" },
  { left: "74%", top: "74%", size: 5, delay: "-2.8s", duration: "7.8s" },
  { left: "88%", top: "15%", size: 3, delay: "-1.1s", duration: "5.6s" },
  { left: "94%", top: "58%", size: 4, delay: "-3.2s", duration: "6.9s" }
];

const codeLines = [
  { number: "01", indent: 0, content: <><span className="hero-code-purple">import</span> <span className="hero-code-blue">{"{ shopify }"}</span> <span className="hero-code-purple">from</span> <span className="hero-code-green">&quot;@commerce/core&quot;</span>;</> },
  { number: "02", indent: 0, content: <>&nbsp;</> },
  { number: "03", indent: 0, content: <><span className="hero-code-purple">export async function</span> <span className="hero-code-blue">scaleStore</span><span className="hero-code-slate">(order) {"{"}</span></> },
  { number: "04", indent: 1, content: <><span className="hero-code-purple">const</span> payment <span className="hero-code-purple">= await</span></> },
  { number: "05", indent: 2, content: <><span className="hero-code-blue">shopify.checkout</span><span className="hero-code-slate">.capture(order);</span></> },
  { number: "06", indent: 1, content: <><span className="hero-code-purple">return</span> <span className="hero-code-blue">deploy</span><span className="hero-code-slate">({"{"} storefront, payment {"}"});</span></> },
  { number: "07", indent: 0, content: <><span className="hero-code-slate">{"}"}</span><span className="hero-code-caret" /></> }
];

const syntaxTokens = [
  { label: "</>", className: "hero-code-token-one" },
  { label: "{ }", className: "hero-code-token-two" },
  { label: "=>", className: "hero-code-token-three" },
  { label: "API", className: "hero-code-token-four" }
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function HeroMotionBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0.5, y: 0.45 });
  const scrollProgress = useRef(0);
  const frameRequest = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  const paint = useCallback(() => {
    frameRequest.current = null;
    const section = rootRef.current?.parentElement;
    if (!section) return;

    const pointerX = reducedMotion.current ? 0.5 : pointer.current.x;
    const pointerY = reducedMotion.current ? 0.45 : pointer.current.y;
    const scroll = reducedMotion.current ? 0 : scrollProgress.current;

    section.style.setProperty("--hero-pointer-x", `${pointerX * 100}%`);
    section.style.setProperty("--hero-pointer-y", `${pointerY * 100}%`);
    section.style.setProperty("--hero-tilt-x", `${(0.5 - pointerY) * 7 - scroll * 2.5}deg`);
    section.style.setProperty("--hero-tilt-y", `${(pointerX - 0.5) * 9}deg`);
    section.style.setProperty("--hero-copy-x", `${(pointerX - 0.5) * -8}px`);
    section.style.setProperty("--hero-copy-y", `${(pointerY - 0.5) * -6 + scroll * -10}px`);
    section.style.setProperty("--hero-ring-x", `${(pointerX - 0.5) * 26}px`);
    section.style.setProperty("--hero-ring-y", `${(pointerY - 0.5) * 20}px`);
    section.style.setProperty("--hero-scroll", scroll.toFixed(3));
  }, []);

  const schedulePaint = useCallback(() => {
    if (frameRequest.current === null) {
      frameRequest.current = window.requestAnimationFrame(paint);
    }
  }, [paint]);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.parentElement;
    if (!root || !section) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      reducedMotion.current = motionQuery.matches;
      schedulePaint();
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      pointer.current.x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
      pointer.current.y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
      schedulePaint();
    };

    const resetPointer = () => {
      pointer.current = { x: 0.5, y: 0.45 };
      schedulePaint();
    };

    const updateScroll = () => {
      const bounds = section.getBoundingClientRect();
      const travel = Math.max(bounds.height, 1);
      scrollProgress.current = clamp(-bounds.top / travel, 0, 1);
      schedulePaint();
    };

    updateMotionPreference();
    updateScroll();
    section.addEventListener("pointermove", updatePointer, { passive: true });
    section.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      section.removeEventListener("pointermove", updatePointer);
      section.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      motionQuery.removeEventListener("change", updateMotionPreference);
      if (frameRequest.current !== null) window.cancelAnimationFrame(frameRequest.current);
    };
  }, [schedulePaint]);

  return (
    <div ref={rootRef} className="hero-motion-root pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-motion-spotlight absolute inset-0" />
      <div className="hero-motion-aurora hero-motion-aurora-one absolute h-[28rem] w-[28rem] rounded-full" />
      <div className="hero-motion-aurora hero-motion-aurora-two absolute h-[24rem] w-[24rem] rounded-full" />

      <div className="hero-motion-grid-plane absolute -bottom-[38%] left-[-10%] h-[78%] w-[120%]" />
      <div className="hero-motion-beam hero-motion-beam-one absolute" />
      <div className="hero-motion-beam hero-motion-beam-two absolute" />

      <div className="hero-code-scene absolute inset-0">
        <div className="hero-code-orbit absolute right-[5%] top-[7%] h-64 w-64 rounded-full sm:h-80 sm:w-80">
          <span className="absolute inset-[13%] rounded-full border border-dashed border-blue-400/25" />
          <span className="absolute inset-[34%] rounded-full border border-indigo-400/25" />
          <span className="hero-code-orbit-dot absolute h-2.5 w-2.5 rounded-full bg-blue-500" />
        </div>

        <div className="hero-code-window absolute right-[7%] top-[10%] w-[42rem] max-w-[48vw] overflow-hidden rounded-2xl">
          <div className="hero-code-window-bar flex h-10 items-center gap-2 border-b border-blue-200/50 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-blue-500/70">
              commerce-engine.ts
            </span>
          </div>
          <div className="hero-code-editor relative py-4">
            <div className="hero-code-scan absolute inset-x-0 h-16" />
            {codeLines.map((line, index) => (
              <div
                key={line.number}
                className="hero-code-line flex min-w-max font-mono text-[11px] leading-6"
                style={{ animationDelay: `${index * 0.18}s` }}
              >
                <span className="w-11 shrink-0 pr-3 text-right text-slate-400/55">{line.number}</span>
                <span className="border-l border-blue-100/80 pl-4 text-slate-600" style={{ paddingLeft: `${16 + line.indent * 16}px` }}>
                  {line.content}
                </span>
              </div>
            ))}
          </div>
          <div className="hero-code-status flex items-center justify-between border-t border-blue-200/50 px-4 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-blue-500/65">
            <span>main*</span>
            <span>TypeScript · UTF-8</span>
          </div>
        </div>

        <div className="hero-terminal-window absolute bottom-[11%] left-[8%] w-[21rem] overflow-hidden rounded-xl">
          <div className="flex items-center justify-between border-b border-blue-200/45 px-3.5 py-2">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-blue-500/70">terminal</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.75)]" />
          </div>
          <div className="space-y-1.5 p-3.5 font-mono text-[9px] font-semibold">
            <p><span className="text-blue-500">$</span> <span className="text-slate-500">shopify app deploy</span></p>
            <p className="hero-terminal-line hero-terminal-line-one text-emerald-600">✓ Extensions bundled</p>
            <p className="hero-terminal-line hero-terminal-line-two text-emerald-600">✓ GraphQL schema synced</p>
            <p className="hero-terminal-line hero-terminal-line-three text-blue-600">● Production healthy</p>
          </div>
        </div>

        {syntaxTokens.map((token) => (
          <span
            key={token.label}
            className={`hero-code-token ${token.className} absolute flex items-center justify-center rounded-xl border border-blue-300/45 bg-white/55 font-mono font-black text-blue-600 shadow-lg shadow-blue-500/10 backdrop-blur-sm`}
          >
            {token.label}
          </span>
        ))}
      </div>

      {particles.map((particle, index) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className={`hero-motion-particle hero-motion-particle-${(index % 3) + 1} absolute rounded-full`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration
          }}
        />
      ))}
    </div>
  );
}

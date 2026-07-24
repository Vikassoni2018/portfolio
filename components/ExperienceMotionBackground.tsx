"use client";

import { useCallback, useEffect, useRef } from "react";

const activityNodes = [
  { label: "BUILD", value: "apps", className: "experience-node-one" },
  { label: "SHIP", value: "APIs", className: "experience-node-two" },
  { label: "SCALE", value: "teams", className: "experience-node-three" }
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function ExperienceMotionBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const scrollProgress = useRef(0.5);
  const frameRequest = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  const paint = useCallback(() => {
    frameRequest.current = null;
    const section = rootRef.current?.parentElement;
    if (!section) return;

    const pointerX = reducedMotion.current ? 0.5 : pointer.current.x;
    const pointerY = reducedMotion.current ? 0.5 : pointer.current.y;
    const scroll = reducedMotion.current ? 0.5 : scrollProgress.current;

    section.style.setProperty("--experience-rotate-x", `${(0.5 - pointerY) * 7}deg`);
    section.style.setProperty("--experience-rotate-y", `${(pointerX - 0.5) * 11}deg`);
    section.style.setProperty("--experience-shift-x", `${(pointerX - 0.5) * 24}px`);
    section.style.setProperty("--experience-shift-y", `${(pointerY - 0.5) * 18}px`);
    section.style.setProperty("--experience-scroll", scroll.toFixed(3));
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
      pointer.current = { x: 0.5, y: 0.5 };
      schedulePaint();
    };

    const updateScroll = () => {
      const bounds = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      scrollProgress.current = clamp((viewportHeight - bounds.top) / (viewportHeight + bounds.height), 0, 1);
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
    <div
      ref={rootRef}
      className="experience-motion-root pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="experience-motion-glow absolute inset-0" />
      <div className="experience-motion-grid absolute -bottom-[44%] left-[-15%] h-[78%] w-[130%]" />

      <div className="experience-motion-scene absolute inset-0">
        <div className="experience-orbit absolute right-[2%] top-[4%] h-72 w-72 rounded-full">
          <span className="experience-orbit-ring experience-orbit-ring-one absolute inset-0 rounded-full" />
          <span className="experience-orbit-ring experience-orbit-ring-two absolute inset-[18%] rounded-full" />
          <span className="experience-orbit-ring experience-orbit-ring-three absolute inset-[38%] rounded-full" />
          <span className="experience-orbit-dot experience-orbit-dot-one absolute h-2.5 w-2.5 rounded-full bg-blue-400" />
          <span className="experience-orbit-dot experience-orbit-dot-two absolute h-2 w-2 rounded-full bg-violet-400" />
        </div>

        <div className="experience-code-stack absolute bottom-[5%] left-[4%] h-52 w-[22rem]">
          <div className="experience-code-layer experience-code-layer-back absolute inset-0 rounded-2xl" />
          <div className="experience-code-layer experience-code-layer-middle absolute inset-0 rounded-2xl" />
          <div className="experience-code-layer experience-code-layer-front absolute inset-0 overflow-hidden rounded-2xl">
            <div className="flex items-center gap-1.5 border-b border-blue-400/20 px-4 py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/70" />
              <span className="ml-2 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-blue-300/70">
                career-engine.ts
              </span>
            </div>
            <div className="space-y-2.5 p-4 font-mono text-[9px] font-semibold">
              <p><span className="text-violet-300">const</span> <span className="text-blue-300">experience</span> <span className="text-slate-500">= {"{"}</span></p>
              <p className="pl-4"><span className="text-cyan-300">craft</span><span className="text-slate-500">: &quot;commerce&quot;,</span></p>
              <p className="pl-4"><span className="text-cyan-300">focus</span><span className="text-slate-500">: &quot;production&quot;,</span></p>
              <p className="pl-4"><span className="text-cyan-300">impact</span><span className="text-slate-500">: deploy.andScale()</span></p>
              <p className="text-slate-500">{"}"};</p>
            </div>
            <span className="experience-code-scan absolute inset-x-0 h-14" />
          </div>
        </div>

        {activityNodes.map((node) => (
          <div
            key={node.label}
            className={`experience-activity-node ${node.className} absolute rounded-xl border border-blue-400/20 bg-slate-900/55 px-3 py-2.5 shadow-2xl shadow-blue-950/30 backdrop-blur`}
          >
            <p className="font-mono text-[8px] font-black tracking-[0.15em] text-blue-400">{node.label}</p>
            <p className="mt-1 text-[10px] font-bold text-slate-400">{node.value}</p>
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          </div>
        ))}

        <span className="experience-glyph experience-glyph-one absolute font-mono font-black text-blue-400/20">
          {"{ }"}
        </span>
        <span className="experience-glyph experience-glyph-two absolute font-mono font-black text-indigo-400/20">
          {"</>"}
        </span>
      </div>
    </div>
  );
}

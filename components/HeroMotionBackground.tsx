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

      <div className="hero-motion-ring-system absolute right-[8%] top-[8%] h-56 w-56 sm:h-72 sm:w-72">
        <span className="hero-motion-ring hero-motion-ring-one absolute inset-0 rounded-full" />
        <span className="hero-motion-ring hero-motion-ring-two absolute inset-[14%] rounded-full" />
        <span className="hero-motion-ring hero-motion-ring-three absolute inset-[29%] rounded-full" />
      </div>

      <div className="hero-motion-cube absolute right-[3%] top-[53%] h-16 w-16 sm:right-[5%] sm:h-20 sm:w-20">
        <span className="hero-motion-cube-face hero-motion-cube-front" />
        <span className="hero-motion-cube-face hero-motion-cube-back" />
        <span className="hero-motion-cube-face hero-motion-cube-right" />
        <span className="hero-motion-cube-face hero-motion-cube-left" />
        <span className="hero-motion-cube-face hero-motion-cube-top" />
        <span className="hero-motion-cube-face hero-motion-cube-bottom" />
      </div>

      <div className="hero-motion-prism absolute left-[3%] top-[55%] h-20 w-20 sm:left-[5%] sm:h-28 sm:w-28">
        <span className="absolute inset-0 rounded-[28%] border border-blue-400/20 bg-blue-400/[0.04]" />
        <span className="absolute inset-[18%] rounded-[28%] border border-indigo-400/25 bg-indigo-400/[0.05]" />
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

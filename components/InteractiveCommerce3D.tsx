"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  BarChart3,
  Box,
  CreditCard,
  MousePointer2,
  Rotate3D,
  ShoppingCart,
  Sparkles
} from "lucide-react";

type Rotation = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function InteractiveCommerce3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerRotation = useRef<Rotation>({ x: 0, y: 0 });
  const manualRotation = useRef<Rotation>({ x: 0, y: 0 });
  const scrollProgress = useRef(0.5);
  const dragState = useRef({
    active: false,
    pointerId: -1,
    lastX: 0,
    lastY: 0
  });
  const animationFrame = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  const paintScene = useCallback(() => {
    animationFrame.current = null;

    const scene = sceneRef.current;
    if (!scene) return;

    const scrollRotation = reducedMotion.current ? 0 : (scrollProgress.current - 0.5) * 64;
    const scrollTilt = reducedMotion.current ? 0 : (0.5 - scrollProgress.current) * 8;
    const rotateX = clamp(pointerRotation.current.x + manualRotation.current.x + scrollTilt, -24, 24);
    const rotateY = pointerRotation.current.y + manualRotation.current.y + scrollRotation;

    scene.style.setProperty("--scene-rotate-x", `${rotateX}deg`);
    scene.style.setProperty("--scene-rotate-y", `${rotateY}deg`);
    scene.style.setProperty("--scroll-progress", scrollProgress.current.toFixed(3));
  }, []);

  const schedulePaint = useCallback(() => {
    if (animationFrame.current === null) {
      animationFrame.current = window.requestAnimationFrame(paintScene);
    }
  }, [paintScene]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      reducedMotion.current = motionQuery.matches;
      schedulePaint();
    };

    const updateScrollProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      scrollProgress.current = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
      schedulePaint();
    };

    updateMotionPreference();
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      motionQuery.removeEventListener("change", updateMotionPreference);
      if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
    };
  }, [schedulePaint]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.active && event.pointerId === dragState.current.pointerId) {
      const deltaX = event.clientX - dragState.current.lastX;
      const deltaY = event.clientY - dragState.current.lastY;
      dragState.current.lastX = event.clientX;
      dragState.current.lastY = event.clientY;
      manualRotation.current.y += deltaX * 0.32;
      manualRotation.current.x = clamp(manualRotation.current.x - deltaY * 0.22, -18, 18);
    } else {
      const bounds = event.currentTarget.getBoundingClientRect();
      const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
      pointerRotation.current.y = normalizedX * 18;
      pointerRotation.current.x = normalizedY * -12;
    }

    schedulePaint();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY
    };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragState.current.active = false;
  };

  const handlePointerLeave = () => {
    if (dragState.current.active) return;
    pointerRotation.current = { x: 0, y: 0 };
    schedulePaint();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keyboardStep = event.shiftKey ? 12 : 6;
    const changes: Record<string, Rotation> = {
      ArrowLeft: { x: 0, y: -keyboardStep },
      ArrowRight: { x: 0, y: keyboardStep },
      ArrowUp: { x: keyboardStep, y: 0 },
      ArrowDown: { x: -keyboardStep, y: 0 }
    };
    const change = changes[event.key];

    if (!change) return;
    event.preventDefault();
    manualRotation.current.x = clamp(manualRotation.current.x + change.x, -18, 18);
    manualRotation.current.y += change.y;
    schedulePaint();
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="commerce-3d-title"
      className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(37,99,235,0.28),transparent_32%),radial-gradient(circle_at_15%_10%,rgba(99,102,241,0.16),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative mx-auto grid max-w-[1240px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-10 lg:px-10 lg:py-20">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-300">
            <Sparkles size={15} />
            Interactive 3D product lab
          </div>
          <h2
            id="commerce-3d-title"
            className="mt-5 max-w-xl text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl"
          >
            Commerce products with depth, motion, and clarity.
          </h2>
          <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-400">
            Explore a connected storefront, checkout, and analytics system designed as one scalable product
            experience.
          </p>

          <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
            {[
              [MousePointer2, "Mouse follow"],
              [Rotate3D, "Drag to rotate"],
              [Box, "Scroll motion"]
            ].map(([Icon, label]) => {
              const FeatureIcon = Icon as typeof MousePointer2;
              return (
                <div
                  key={label as string}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-3 text-xs font-bold text-slate-300"
                >
                  <FeatureIcon className="text-blue-400" size={17} />
                  {label as string}
                </div>
              );
            })}
          </div>
        </div>

        <div
          role="application"
          tabIndex={0}
          aria-label="Interactive 3D commerce model. Move the pointer, drag, or use arrow keys to rotate."
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onKeyDown={handleKeyDown}
          className="commerce-3d-stage relative min-h-[430px] cursor-grab touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 sm:min-h-[520px] active:cursor-grabbing"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[70px]" />
          <div className="commerce-3d-orbit commerce-3d-orbit-one pointer-events-none absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20 sm:h-[430px] sm:w-[430px]" />
          <div className="commerce-3d-orbit commerce-3d-orbit-two pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[340px] sm:w-[340px]" />

          <div
            ref={sceneRef}
            className="commerce-3d-scene absolute inset-0"
            style={
              {
                "--scene-rotate-x": "0deg",
                "--scene-rotate-y": "0deg",
                "--scroll-progress": "0.5"
              } as React.CSSProperties
            }
          >
            <div className="commerce-3d-model absolute left-1/2 top-1/2 h-[280px] w-[205px] -translate-x-1/2 -translate-y-1/2 sm:h-[340px] sm:w-[250px]">
              <div className="commerce-3d-device-face commerce-3d-device-front absolute inset-0 overflow-hidden rounded-[1.8rem] border border-white/20 bg-slate-900 p-3 shadow-[0_35px_80px_rgba(0,0,0,0.5)] sm:p-4">
                <div className="flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-gradient-to-b from-white to-blue-50 p-4 text-slate-950 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <ShoppingCart size={16} />
                      </span>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-blue-600">Storefront</p>
                        <p className="text-[11px] font-extrabold">Commerce OS</p>
                      </div>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                  </div>

                  <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-4 text-white shadow-lg shadow-blue-600/20">
                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-blue-200">Revenue today</p>
                    <p className="mt-1 text-2xl font-black tracking-[-0.04em]">$24.8k</p>
                    <div className="mt-3 flex h-10 items-end gap-1">
                      {[42, 68, 52, 88, 64, 94, 76].map((height, index) => (
                        <span
                          key={index}
                          className="flex-1 rounded-t-sm bg-white/65"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      ["Orders", "1,284"],
                      ["Conversion", "4.8%"]
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                        <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">{label}</p>
                        <p className="mt-1 text-sm font-black">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
                    <span className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-200 to-orange-400" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-extrabold">Premium collection</p>
                      <p className="mt-0.5 text-[8px] font-semibold text-slate-400">Ready to ship worldwide</p>
                    </div>
                    <span className="text-[10px] font-black text-blue-600">$89</span>
                  </div>
                </div>
              </div>

              <div className="commerce-3d-device-face commerce-3d-device-back absolute inset-0 rounded-[1.8rem] border border-blue-400/30 bg-gradient-to-br from-blue-700 to-indigo-950 p-6">
                <div className="flex h-full flex-col items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/[0.04] text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
                    <Box size={30} />
                  </span>
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-blue-200">Connected system</p>
                  <p className="mt-2 max-w-[150px] text-[10px] font-semibold leading-5 text-slate-400">
                    Storefront, payments, data, and operations in sync.
                  </p>
                </div>
              </div>
              <div className="commerce-3d-device-side commerce-3d-device-side-right absolute right-0 top-[7%] h-[86%] w-8 rounded-r-lg bg-gradient-to-b from-blue-500 to-indigo-900" />
              <div className="commerce-3d-device-side commerce-3d-device-side-left absolute left-0 top-[7%] h-[86%] w-8 rounded-l-lg bg-gradient-to-b from-slate-700 to-slate-950" />
            </div>

            <div className="commerce-3d-satellite commerce-3d-satellite-left absolute left-[2%] top-[15%] sm:left-[7%] sm:top-[12%]">
              <div className="commerce-3d-float commerce-3d-float-one w-36 rounded-2xl border border-white/15 bg-slate-900/90 p-4 shadow-2xl backdrop-blur sm:w-44">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                    <CreditCard size={18} />
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[8px] font-black uppercase tracking-[0.1em] text-emerald-300">
                    Live
                  </span>
                </div>
                <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Payments</p>
                <p className="mt-1 text-sm font-black">Global checkout</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                </div>
              </div>
            </div>

            <div className="commerce-3d-satellite commerce-3d-satellite-right absolute bottom-[9%] right-[1%] sm:bottom-[8%] sm:right-[5%]">
              <div className="commerce-3d-float commerce-3d-float-two w-36 rounded-2xl border border-white/15 bg-slate-900/90 p-4 shadow-2xl backdrop-blur sm:w-44">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <BarChart3 size={18} />
                  </span>
                  <span className="text-[9px] font-black text-blue-300">+28.4%</span>
                </div>
                <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">Intelligence</p>
                <p className="mt-1 text-sm font-black">Growth analytics</p>
                <div className="mt-3 flex h-8 items-end gap-1">
                  {[35, 52, 44, 72, 62, 86].map((height, index) => (
                    <span
                      key={index}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-600 to-violet-400"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <span className="commerce-3d-particle commerce-3d-particle-one absolute left-[22%] top-[73%] h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.9)]" />
            <span className="commerce-3d-particle commerce-3d-particle-two absolute right-[20%] top-[18%] h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_16px_rgba(167,139,250,0.9)]" />
          </div>

          <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Drag · move · scroll
          </p>
        </div>
      </div>
    </section>
  );
}

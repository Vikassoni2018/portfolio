"use client";

import { useCallback, useEffect, useRef } from "react";
import { ArrowUpRight, Hand, MousePointer2, Rotate3D } from "lucide-react";
import type { Project } from "@/lib/types";

type InteractiveProjectCardProps = {
  project: Project;
  index: number;
  tags: string[];
};

type Rotation = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function InteractiveProjectCard({ project, index, tags }: InteractiveProjectCardProps) {
  const articleRef = useRef<HTMLElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const pointerRotation = useRef<Rotation>({ x: 0, y: 0 });
  const manualRotation = useRef<Rotation>({ x: 0, y: 0 });
  const revealProgress = useRef(0);
  const frameRequest = useRef<number | null>(null);
  const reducedMotion = useRef(false);
  const dragState = useRef({
    active: false,
    pointerId: -1,
    lastX: 0,
    lastY: 0
  });

  const paintModel = useCallback(() => {
    frameRequest.current = null;
    const model = modelRef.current;
    const article = articleRef.current;
    if (!model || !article) return;

    const scrollTilt = reducedMotion.current ? 0 : (1 - revealProgress.current) * 10;
    const rotateX = clamp(pointerRotation.current.x + manualRotation.current.x + scrollTilt, -22, 22);
    const rotateY = pointerRotation.current.y + manualRotation.current.y;
    const reveal = reducedMotion.current ? 1 : revealProgress.current;

    model.style.setProperty("--project-rotate-x", `${rotateX}deg`);
    model.style.setProperty("--project-rotate-y", `${rotateY}deg`);
    article.style.setProperty("--project-reveal", reveal.toFixed(3));
  }, []);

  const schedulePaint = useCallback(() => {
    if (frameRequest.current === null) {
      frameRequest.current = window.requestAnimationFrame(paintModel);
    }
  }, [paintModel]);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotion.current = motionQuery.matches;
      schedulePaint();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        revealProgress.current = clamp(entry.intersectionRatio * 1.45, 0, 1);
        schedulePaint();
      },
      {
        threshold: [0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.5, 0.62, 0.75, 0.88, 1]
      }
    );

    updateMotionPreference();
    observer.observe(article);
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", updateMotionPreference);
      if (frameRequest.current !== null) window.cancelAnimationFrame(frameRequest.current);
    };
  }, [schedulePaint]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.active && event.pointerId === dragState.current.pointerId) {
      const deltaX = event.clientX - dragState.current.lastX;
      const deltaY = event.clientY - dragState.current.lastY;
      dragState.current.lastX = event.clientX;
      dragState.current.lastY = event.clientY;
      manualRotation.current.y += deltaX * 0.3;
      manualRotation.current.x = clamp(manualRotation.current.x - deltaY * 0.22, -16, 16);
    } else {
      const bounds = event.currentTarget.getBoundingClientRect();
      const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
      pointerRotation.current.y = normalizedX * 15;
      pointerRotation.current.x = normalizedY * -10;
      event.currentTarget.style.setProperty("--project-glow-x", `${(normalizedX + 0.5) * 100}%`);
      event.currentTarget.style.setProperty("--project-glow-y", `${(normalizedY + 0.5) * 100}%`);
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
    const step = event.shiftKey ? 10 : 5;
    const rotationByKey: Record<string, Rotation> = {
      ArrowLeft: { x: 0, y: -step },
      ArrowRight: { x: 0, y: step },
      ArrowUp: { x: step, y: 0 },
      ArrowDown: { x: -step, y: 0 }
    };
    const rotation = rotationByKey[event.key];
    if (!rotation) return;

    event.preventDefault();
    manualRotation.current.x = clamp(manualRotation.current.x + rotation.x, -16, 16);
    manualRotation.current.y += rotation.y;
    schedulePaint();
  };

  return (
    <article
      ref={articleRef}
      className="interactive-project-card group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:border-blue-200 hover:shadow-[0_22px_50px_rgba(30,64,175,0.12)]"
      style={{ "--project-reveal": "0" } as React.CSSProperties}
    >
      <div
        role="application"
        tabIndex={0}
        aria-label={`Interactive 3D preview of ${project.name}. Move the pointer, drag, or use arrow keys to rotate.`}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
        className="interactive-project-stage relative aspect-[16/10] cursor-grab touch-none select-none overflow-hidden border-b border-slate-200 bg-slate-950 outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
        style={
          {
            "--project-glow-x": "50%",
            "--project-glow-y": "50%"
          } as React.CSSProperties
        }
      >
        <div className="interactive-project-grid pointer-events-none absolute inset-0 opacity-45" />
        <div className="interactive-project-glow pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-4 top-4 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-300 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
          Interactive preview
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 z-30 hidden items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-[9px] font-bold text-slate-300 backdrop-blur sm:flex">
          <Hand size={12} />
          Drag to rotate
        </div>

        <div
          ref={modelRef}
          className="interactive-project-model absolute inset-x-[8%] bottom-[9%] top-[15%] sm:inset-x-[9%] sm:bottom-[10%]"
          style={
            {
              "--project-rotate-x": "0deg",
              "--project-rotate-y": "0deg"
            } as React.CSSProperties
          }
        >
          <div className="interactive-project-layer interactive-project-layer-back absolute inset-0 rounded-2xl border border-indigo-400/25 bg-indigo-500/15" />
          <div className="interactive-project-layer interactive-project-layer-middle absolute inset-0 rounded-2xl border border-blue-300/30 bg-blue-500/15" />

          <div className="interactive-project-screen absolute inset-0 overflow-hidden rounded-2xl border border-white/25 bg-white shadow-[0_24px_55px_rgba(0,0,0,0.42)]">
            <div className="flex h-8 items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="ml-2 h-3 flex-1 rounded-full bg-white shadow-inner" />
            </div>
            <div className="relative h-[calc(100%-2rem)] overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
              {project.image ? (
                // Admin-managed images can be either local uploads or external URLs.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={`${project.name} project preview`}
                  className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.025] sm:p-4"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-6xl font-black text-white">
                  {project.name.slice(0, 1)}
                </div>
              )}
            </div>
          </div>

          <div className="interactive-project-base absolute left-[7%] right-[7%] top-full h-5 origin-top rounded-b-2xl bg-gradient-to-b from-slate-500 to-slate-800 shadow-[0_18px_30px_rgba(0,0,0,0.35)]" />
        </div>

        <div className="pointer-events-none absolute bottom-4 left-4 z-30 flex gap-2 text-white/45">
          <MousePointer2 size={14} />
          <Rotate3D size={14} />
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-600">
              Project {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-slate-950">{project.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.name}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <ArrowUpRight size={19} />
            </a>
          ) : null}
        </div>
        <p className="mt-5 text-sm font-medium leading-6 text-slate-600">{project.description}</p>
      </div>
    </article>
  );
}

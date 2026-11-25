"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import type { ProductModel } from "./product-model";

const finishes = [
  { name: "Graphite", color: "#69727f" },
  { name: "Sand", color: "#d9bea0" },
  { name: "Ember", color: "#c57251" }
];

export function ProductStage() {
  const [finish, setFinish] = useState(finishes[0]);
  const [ready, setReady] = useState(false);
  const mount = useRef<HTMLDivElement>(null);
  const model = useRef<ProductModel | undefined>(undefined);
  const color = useRef(finishes[0].color);

  useEffect(() => {
    const target = mount.current;
    if (!target) return;
    const motion = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const demo = target.closest("[data-concept-root]");
    let active = true;
    let visible = false;
    let loading = false;

    async function syncViewer() {
      const enabled = motion.matches && demo?.getAttribute("data-motion") !== "off";
      if (!enabled && model.current) {
        model.current.dispose();
        model.current = undefined;
        setReady(false);
      }
      if (!target || !enabled || !visible || loading || model.current) return;
      loading = true;
      try {
        const { mountProductModel } = await import("./product-model");
        if (!active || !motion.matches || demo?.getAttribute("data-motion") === "off") return;
        model.current = mountProductModel(target, color.current);
        setReady(Boolean(model.current));
      } catch {
        setReady(false);
      } finally {
        loading = false;
      }
    }

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      void syncViewer();
    }, { rootMargin: "160px" });
    const attributes = new MutationObserver(() => void syncViewer());
    intersection.observe(target);
    if (demo) attributes.observe(demo, { attributeFilter: ["data-motion"] });
    motion.addEventListener("change", syncViewer);

    return () => {
      active = false;
      intersection.disconnect();
      attributes.disconnect();
      motion.removeEventListener("change", syncViewer);
      model.current?.dispose();
      model.current = undefined;
    };
  }, []);

  return <div className="product-stage">
    <div className="product-render" role="img" aria-label={`Hush headphones in ${finish.name}`}>
      <div ref={mount} aria-hidden="true" />
      {!ready && <svg className="product-fallback" viewBox="0 0 400 300" aria-hidden="true">
        <defs><linearGradient id="hush-metal" x2="1" y2="1"><stop stopColor="#eee6de" stopOpacity=".52" /><stop offset="1" stopColor="#12131a" stopOpacity=".3" /></linearGradient></defs>
        <path d="M87 173v-19C87 13 313 13 313 154v19" stroke={finish.color} fill="none" strokeWidth="19" />
        <path d="M95 143C112 38 289 38 305 143" fill="none" stroke="#2a2830" strokeWidth="15" />
        <rect x="66" y="158" width="72" height="103" rx="32" fill={finish.color} />
        <rect x="262" y="158" width="72" height="103" rx="32" fill={finish.color} />
        <path d="M94 160a30 30 0 0 0-25 31v39a30 30 0 0 0 23 29m214-99a30 30 0 0 1 25 31v39a30 30 0 0 1-23 29" fill="none" stroke="url(#hush-metal)" strokeWidth="6" />
        <rect x="118" y="161" width="27" height="96" rx="13" fill="#24232a" />
        <rect x="255" y="161" width="27" height="96" rx="13" fill="#24232a" />
      </svg>}
    </div>
    <div className="product-finish" role="group" aria-label="Headphone finish and view">
      {finishes.map((option) => <button key={option.name} type="button" aria-pressed={option === finish} onClick={() => {
        color.current = option.color;
        setFinish(option);
        model.current?.setColor(option.color);
      }}>{option.name}</button>)}
      {ready && <>
        <button type="button" aria-label="Rotate headphones left" onClick={() => model.current?.rotate(-.45)}><RotateCcw size={17} aria-hidden="true" /></button>
        <button type="button" aria-label="Rotate headphones right" onClick={() => model.current?.rotate(.45)}><RotateCw size={17} aria-hidden="true" /></button>
      </>}
    </div>
    {ready && <p className="product-hint">Move the pointer over the model or use the rotation controls.</p>}
  </div>;
}


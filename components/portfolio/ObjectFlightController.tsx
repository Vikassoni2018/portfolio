"use client";

import { useEffect } from "react";
import gsap from "gsap";

const FLIGHT_SPECS: Record<
  string,
  {
    src: string;
    start: [number, number, number, number];
    tgt: [number, number];
    finRot: number;
    sizePct: number;
    colors: [string, string];
  }
> = {
  "shopify-store": {
    src: "/portfolio/objects/obj-shopify-store.webp",
    start: [0.22, 0.18, -32, 1.45],
    tgt: [0.16, 0.21],
    finRot: -10,
    sizePct: 21,
    colors: ["#10B981", "#6366F1"]
  },
  "react-nextjs": {
    src: "/portfolio/objects/obj-react-nextjs.webp",
    start: [0.78, 0.16, 28, 1.45],
    tgt: [0.85, 0.2],
    finRot: 12,
    sizePct: 21,
    colors: ["#0284C7", "#0F172A"]
  },
  "php-laravel": {
    src: "/portfolio/objects/obj-php-laravel.webp",
    start: [0.26, 0.34, -22, 1.4],
    tgt: [0.15, 0.78],
    finRot: 8,
    sizePct: 21,
    colors: ["#4F46E5", "#FF2D20"]
  },
  nodejs: {
    src: "/portfolio/objects/obj-nodejs.webp",
    start: [0.74, 0.32, 24, 1.4],
    tgt: [0.84, 0.77],
    finRot: -9,
    sizePct: 20,
    colors: ["#16A34A", "#38BDF8"]
  }
};

function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Orchestrates meaningful parabolic scroll flight of the 4 core runtime objects
 * (Shopify Store, React + Next.js, PHP + Laravel, Node.js) from Projects Carousel
 * into the Flagship Architecture Workstation dock.
 */
export function ObjectFlightController() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 768) return;

    const carouselSec = document.getElementById("projects-carousel");
    const dock = document.getElementById("flagship-tray-dock");
    const dockImg = document.getElementById("flagshipTrayImg");
    if (!carouselSec || !dock || !dockImg) return;

    const lands = Array.from(
      carouselSec.querySelectorAll<HTMLElement>("[data-land-key]")
    );
    if (!lands.length) return;

    function createSplash(host: HTMLElement, colors: [string, string], pct: [number, number]) {
      const g = document.createElement("div");
      g.className = "tray-splash";
      g.style.left = `${pct[0] * 100}%`;
      g.style.top = `${pct[1] * 100}%`;
      let html = '<b class="ring"></b>';
      for (let n = 0; n < 8; n++) {
        const a = (n / 8) * Math.PI * 2 + Math.random() * 0.4;
        const d = 24 + Math.random() * 26;
        html += `<i style="--dx:${(Math.cos(a) * d).toFixed(1)}px;--dy:${(Math.sin(a) * d * 0.75).toFixed(1)}px;--s:${(3 + Math.random() * 3).toFixed(1)}px;background:${colors[n % 2]}"></i>`;
      }
      g.innerHTML = html;
      host.appendChild(g);
      window.setTimeout(() => g.remove(), 900);
    }

    const nodes = lands.map((land) => {
      const key = land.dataset.landKey || "shopify-store";
      const spec = FLIGHT_SPECS[key] ?? FLIGHT_SPECS["shopify-store"];
      const tr = document.createElement("div");
      tr.className = "travel-object";
      tr.setAttribute("aria-hidden", "true");
      tr.innerHTML = `<img src="${spec.src}" alt="" width="240" height="240" />`;
      document.body.appendChild(tr);
      const baseRot = parseFloat(getComputedStyle(land).getPropertyValue("--r")) || 0;
      return { key, spec, land, tr, baseRot, docked: false };
    });

    let lastKey = -1;

    const tick = () => {
      if (!document.body.contains(carouselSec) || !document.body.contains(dock)) {
        return;
      }

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const secTop = carouselSec.getBoundingClientRect().top;
      const dockTop = dock.getBoundingClientRect().top;

      const q = clamp((vh - secTop) / (vh * 0.75));
      const q2 = clamp((vh * 0.92 - dockTop) / (vh * 0.56));

      const cacheKey = q + q2 * 10;
      if (cacheKey === lastKey && (q === 0 || (q === 1 && (q2 === 0 || q2 === 1)))) return;
      lastKey = cacheKey;

      nodes.forEach((item, i) => {
        const { spec, land, tr } = item;
        if (q2 > 0) {
          const d2 = clamp((q2 - i * 0.08) / (1 - 0.24));
          const ex = 1 - Math.pow(1 - d2, 2.2);
          const ey = d2 * d2 * (2 - d2);
          land.classList.remove("in");

          if (d2 >= 1) {
            if (tr.parentNode !== dock) {
              Object.assign(tr.style, {
                position: "absolute",
                left: `${spec.tgt[0] * 100}%`,
                top: `${spec.tgt[1] * 100}%`,
                width: `${spec.sizePct}%`,
                opacity: "1",
                visibility: "visible",
                transform: `translate(-50%, -50%) rotate(${spec.finRot}deg)`,
                filter: "drop-shadow(0 12px 18px rgba(79,70,229,0.22))"
              });
              dock.appendChild(tr);
              tr.classList.remove("settled");
              void tr.offsetWidth;
              tr.classList.add("settled");
              createSplash(dock, spec.colors, spec.tgt);
            }
            if (!item.docked) {
              item.docked = true;
              dockImg.classList.remove("bump");
              void dockImg.offsetWidth;
              dockImg.classList.add("bump");
            }
            return;
          }

          item.docked = false;
          if (tr.parentNode !== document.body) {
            Object.assign(tr.style, { position: "", left: "", top: "" });
            tr.classList.remove("settled");
            document.body.appendChild(tr);
          }

          const b = land.getBoundingClientRect();
          const dockRect = dock.getBoundingClientRect();
          const w = Math.max(84, b.width);
          const endW = dockRect.width * (spec.sizePct / 100);
          const tx = dockRect.left + dockRect.width * spec.tgt[0] - w / 2;
          const ty = dockRect.top + dockRect.height * spec.tgt[1] - w / 2;
          const x = b.left + (tx - b.left) * ex;
          const y = b.top + (ty - b.top) * ey - Math.sin(d2 * Math.PI) * vh * 0.09;
          const sc = 1 + (endW / w - 1) * ex;
          const rot = item.baseRot + (spec.finRot + (i % 2 ? 180 : -180) - item.baseRot) * ex;

          tr.style.visibility = "visible";
          tr.style.width = `${w}px`;
          tr.style.opacity = "1";
          tr.style.filter = "drop-shadow(0 18px 26px rgba(79,70,229,0.2))";
          tr.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
          return;
        }

        item.docked = false;
        if (tr.parentNode !== document.body) {
          Object.assign(tr.style, { position: "", left: "", top: "" });
          tr.classList.remove("settled");
          document.body.appendChild(tr);
        }

        const d = clamp((q - i * 0.04) / (1 - 0.12));
        const e = ease(d);
        const done = d >= 1;
        const show = q > 0 && !done;
        land.classList.toggle("in", done);
        tr.style.visibility = show ? "visible" : "hidden";
        if (!show) return;

        const b2 = land.getBoundingClientRect();
        const w2 = Math.max(84, b2.width);
        const sx = spec.start[0] * vw - w2 / 2;
        const sy = spec.start[1] * vh - w2 / 2;
        const x2 = sx + (b2.left - sx) * e;
        const y2 = sy + (b2.top - sy) * e - Math.sin(e * Math.PI) * vh * 0.06;
        const sc2 = spec.start[3] + (1 - spec.start[3]) * e;
        const rot2 = spec.start[2] + (item.baseRot - spec.start[2]) * e + Math.sin(e * Math.PI) * 90 * (i % 2 ? 1 : -1);

        tr.style.width = `${w2}px`;
        tr.style.opacity = Math.min(1, d * 7).toFixed(3);
        tr.style.transform = `translate3d(${x2.toFixed(1)}px, ${y2.toFixed(1)}px, 0) rotate(${rot2.toFixed(1)}deg) scale(${sc2.toFixed(3)})`;
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      nodes.forEach((n) => n.tr.remove());
    };
  }, []);

  return null;
}

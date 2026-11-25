"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, ExternalLink, LayoutTemplate } from "lucide-react";
import {
  showcaseTitle, themeInquiry, themeRoute, themes, themeThumbnail, type Theme
} from "@/data/showcase";
import "./gallery.css";

const categories = ["All styles", ...new Set(themes.map((theme) => theme.category))] as const;
const featured = [themes[0], themes[5], themes[4]];

export function ShowcaseGallery() {
  const [selected, setSelected] = useState<(typeof categories)[number]>("All styles");
  const scope = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const motion = useRef<((element: HTMLDivElement) => void) | null>(null);
  const filtered = themes.filter((theme) => selected === "All styles" || theme.category === selected);

  useEffect(() => {
    const element = scope.current;
    if (!element) return;
    let active = true;
    let dispose: (() => void) | undefined;
    void import("./gallery-motion").then(({ setupGallery }) => {
      if (!active) return;
      const gallery = setupGallery(element);
      motion.current = gallery.filter;
      dispose = gallery.dispose;
    });
    return () => { active = false; motion.current = null; dispose?.(); };
  }, []);

  useEffect(() => {
    if (grid.current) motion.current?.(grid.current);
  }, [selected]);

  return <div ref={scope} className="showcase">
    <section className="showcase-hero" aria-labelledby="showcase-title">
      <div className="showcase-frame showcase-hero-grid">
        <div className="showcase-copy">
          <p><LayoutTemplate size={17} aria-hidden="true" /> Landing page design showcase</p>
          <h1 id="showcase-title">{showcaseTitle}</h1>
          <div>Preview responsive websites for SaaS, Shopify brands and product launches. Find a design direction for your project and try it live before we talk.</div>
          <a className="showcase-primary" href="#styles">Explore the designs <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <div className="showcase-collage" aria-hidden="true">
          {featured.map((theme) => <div key={theme.slug} className={`showcase-collage-tile showcase-collage-${theme.visual}`}>
            <Image src={themeThumbnail(theme)} width={960} height={540} sizes="(max-width: 700px) 60vw, 470px" alt="" />
          </div>)}
        </div>
      </div>
    </section>

    <section className="showcase-frame showcase-gallery" id="styles" aria-labelledby="styles-title">
      <div className="showcase-gallery-heading">
        <div><h2 id="styles-title">Find your design style</h2><p>Each fictional brand has its own layout, visual identity and GSAP motion.</p></div>
        <span aria-live="polite" className="showcase-count">{filtered.length} {filtered.length === 1 ? "style" : "styles"}</span>
      </div>
      <div className="showcase-filters" role="group" aria-label="Filter by industry">
        {categories.map((category) => <button key={category} type="button" aria-pressed={category === selected}
          onClick={() => setSelected(category)}>{category}</button>)}
      </div>
      <div ref={grid} className="showcase-cards">
        {filtered.map((theme) => <ThemeCard key={theme.slug} theme={theme} />)}
      </div>
    </section>
  </div>;
}

function ThemeCard({ theme }: { theme: Theme }) {
  return <article className="showcase-card">
    <a className="showcase-card-image" href={themeRoute(theme.slug)} aria-label={`Preview ${theme.name}`}>
      <Image src={themeThumbnail(theme)} fill sizes="(max-width: 720px) 94vw, (max-width: 1100px) 45vw, 365px"
        alt={`Screenshot of the ${theme.brand} landing page`} />
      <span aria-hidden="true"><ArrowUpRight size={19} /></span>
    </a>
    <div className="showcase-card-content">
      <p className="showcase-industry">{theme.industry}</p>
      <h3>{theme.name}</h3>
      <p className="showcase-description">{theme.description}</p>
      <ul aria-label={`${theme.name} animation features`}>{theme.animations.map((item) => <li key={item}>{item}</li>)}</ul>
      <div className="showcase-card-actions">
        <a className="showcase-live" href={themeRoute(theme.slug)}
          aria-label={`Live Preview: ${theme.name}`}>Live Preview <ExternalLink size={15} aria-hidden="true" /></a>
        <a className="showcase-build" href={themeInquiry(theme.slug)} aria-label={`Build My Website in This Style: ${theme.name}`}>Build My Website in This Style <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
    </div>
  </article>;
}


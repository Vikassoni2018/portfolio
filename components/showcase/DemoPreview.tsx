"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Maximize2, Minimize2,
  Monitor, Pause, Play, RotateCcw, Scan, Smartphone, Tablet
} from "lucide-react";
import { showcasePath, themeInquiry, themeRoute, themes, type Theme, type ThemeSlug } from "@/data/showcase";

const viewports = [
  { name: "Desktop", icon: Monitor, width: 1440 },
  { name: "Tablet", icon: Tablet, width: 768 },
  { name: "Mobile", icon: Smartphone, width: 390 }
] as const;

const subscribe = () => () => {};
const isEmbedded = () => window.self !== window.top && new URLSearchParams(window.location.search).has("preview");
const isMotionOff = () => isEmbedded() && new URLSearchParams(window.location.search).get("motion") === "off";
const serverDefault = () => false;

export function DemoPreview({
  slug, visual, children
}: { slug: ThemeSlug; visual: Theme["visual"]; children: React.ReactNode }) {
  const index = themes.findIndex((theme) => theme.slug === slug);
  const previous = themes[(index - 1 + themes.length) % themes.length];
  const next = themes[(index + 1) % themes.length];
  const embedded = useSyncExternalStore(subscribe, isEmbedded, serverDefault);
  const embeddedMotionOff = useSyncExternalStore(subscribe, isMotionOff, serverDefault);
  const [expanded, setExpanded] = useState(false);
  const [viewport, setViewport] = useState<(typeof viewports)[number] | null>(null);
  const [motionOff, setMotionOff] = useState(false);
  const [revision, setRevision] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const demo = useRef<HTMLDivElement>(null);
  const fullscreenControl = useRef<HTMLButtonElement>(null);
  const exitControl = useRef<HTMLButtonElement>(null);
  const wasPresenting = useRef(false);
  const simulated = !embedded && viewport !== null;
  const disabled = motionOff || embeddedMotionOff;
  const presenting = fullScreen || focusMode;

  useEffect(() => {
    if (simulated || disabled || !demo.current) return;
    let disconnect: (() => void) | undefined;
    let active = true;
    const target = demo.current;
    void import("./motion").then(({ animateConcept }) => {
      if (active) disconnect = animateConcept(target, visual);
    });
    return () => { active = false; disconnect?.(); };
  }, [simulated, disabled, visual, revision]);

  useEffect(() => {
    if (embedded) return;
    const change = () => setFullScreen(Boolean(document.fullscreenElement));
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFocusMode(false);
    };
    document.addEventListener("fullscreenchange", change);
    window.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("fullscreenchange", change);
      window.removeEventListener("keydown", escape);
    };
  }, [embedded]);

  useEffect(() => {
    if (presenting) exitControl.current?.focus();
    else if (wasPresenting.current) fullscreenControl.current?.focus();
    wasPresenting.current = presenting;
  }, [presenting]);

  async function toggleFullScreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    if (focusMode) {
      setFocusMode(false);
      return;
    }
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      setFocusMode(true);
    }
  }

  function restart() {
    if (!simulated) window.scrollTo({ top: 0, behavior: "instant" });
    setRevision((value) => value + 1);
  }

  function chooseViewport(option: (typeof viewports)[number] | null) {
    setViewport(option);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return <div className={`demo-shell${embedded ? " demo-shell--embedded" : ""}`}>
    {simulated ? <DevicePreview revision={revision}
      title={`${viewport.name} preview of ${themes[index].brand}`}
      src={`${themeRoute(slug)}?preview=1${disabled ? "&motion=off" : ""}`} width={viewport.width} />
    : <div ref={demo} className={`concept concept--${visual}`} data-concept-root data-motion={disabled ? "off" : "on"}>
      {children}
    </div>}
    {!embedded && <aside className="demo-toolbar" aria-label="Client preview controls">
      <div className="demo-toolbar-bar">
        <Link className="demo-icon" href={showcasePath} title="Back to Design Showcase" aria-label="Back to Design Showcase"><ArrowLeft size={17} /></Link>
        <button type="button" className="demo-toggle" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="preview-options">
          <Monitor size={16} aria-hidden="true" /><span>Preview controls</span><ChevronDown size={15} aria-hidden="true" />
        </button>
        <a href={themeInquiry(slug)} className="demo-hire">Hire Me for This Design <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <div id="preview-options" hidden={!expanded || presenting} className="demo-toolbar-options">
        <div className="demo-theme-picker">
          <a href={themeRoute(previous.slug)} className="demo-icon" aria-label={`Previous theme: ${previous.name}`} title={previous.name}><ArrowLeft size={16} /></a>
          <select aria-label="Choose a landing page theme" value={slug} onChange={(event) => {
            const chosen = themes.find((theme) => theme.slug === event.target.value);
            if (chosen) window.location.assign(themeRoute(chosen.slug));
          }}>
            {themes.map((theme) => <option value={theme.slug} key={theme.slug}>{theme.name}</option>)}
          </select>
          <a href={themeRoute(next.slug)} className="demo-icon" aria-label={`Next theme: ${next.name}`} title={next.name}><ArrowRight size={16} /></a>
        </div>
        <div className="demo-tool-group" role="group" aria-label="Viewport size">
          <button type="button" className="demo-icon" aria-pressed={!viewport} aria-label="Use browser viewport"
            title="Use browser viewport" onClick={() => chooseViewport(null)}><Scan size={18} /></button>
          {viewports.map((option) => <button type="button" key={option.name} className="demo-icon"
            aria-pressed={viewport === option} aria-label={`${option.name} preview`}
            title={`${option.name} preview (${option.width}px)`}
            onClick={() => chooseViewport(option)}><option.icon size={19} /></button>)}
        </div>
        <div className="demo-tool-group" role="group" aria-label="Playback and navigation">
          <button type="button" className="demo-icon" aria-label="Restart animations" title="Restart animations" disabled={disabled} onClick={restart}><RotateCcw size={17} /></button>
          <button type="button" className="demo-icon" aria-label="Disable animations" title={motionOff ? "Enable animations" : "Disable animations"}
            aria-pressed={motionOff} onClick={() => setMotionOff(!motionOff)}>{motionOff ? <Play size={17} /> : <Pause size={17} />}</button>
          <button ref={fullscreenControl} type="button" className="demo-icon" aria-label="Full-screen mode" title="Full-screen mode" onClick={toggleFullScreen}><Maximize2 size={17} /></button>
          <Link href="/" className="demo-portfolio">Back to portfolio</Link>
        </div>
      </div>
      {presenting && <button ref={exitControl} type="button" className="demo-exit" onClick={toggleFullScreen}><Minimize2 size={17} aria-hidden="true" /> Exit full screen</button>}
    </aside>}
  </div>;
}

function DevicePreview({ width, title, src, revision }: {
  width: number; title: string; src: string; revision: number;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!stage.current) return;
    const resize = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setScale(Math.min(1, entry.contentRect.width / width));
    });
    resize.observe(stage.current);
    return () => resize.disconnect();
  }, [width]);

  return <main className="preview-canvas" id="main-content">
    <div ref={stage} className="preview-stage">
      <iframe key={revision} title={title} src={src}
        style={{ width, height: `${100 / scale}%`, transform: `translateX(-50%) scale(${scale})` }} />
    </div>
  </main>;
}


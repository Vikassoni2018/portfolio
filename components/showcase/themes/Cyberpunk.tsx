import "./cyberpunk.css";
import { Cpu, Crosshair, Gamepad2, Gauge, RadioTower, ShieldAlert, Zap } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const levels = [
  {
    title: "Alley Run",
    level: "01",
    text: "A solo time trial slicing through neon side streets and rooftop shortcuts.",
    charge: "84%",
    image: "/showcase/cyber-1.webp",
    alt: "Neon Japanese billboards lighting up a dark urban night street"
  },
  {
    title: "Circuit Clash",
    level: "02",
    text: "A head-to-head sprint where narrow inner lanes trade clean grip for pure boost.",
    charge: "92%",
    image: "/showcase/cyber-2.webp",
    alt: "Illuminated retro arcade frontage glowing at midnight"
  },
  {
    title: "Signal Drift",
    level: "03",
    text: "An endless procedural run that scrambles district gates every ninety seconds.",
    charge: "78%",
    image: "/showcase/cyber-3.webp",
    alt: "Rainy Tokyo avenue lit by neon streetlights and headlights"
  }
] as const;

const loadouts = [
  {
    slot: "RIG-01 // SPEED",
    name: "Apex Frame",
    spec: "Top speed 340 km/h · Carbon aero shell",
    meter: "88%",
    image: "/showcase/cyber-4.webp",
    alt: "Neon Chinese restaurant and city signs glowing in dark night rain"
  },
  {
    slot: "RIG-02 // OVERDRIVE",
    name: "Pulse Core",
    spec: "Dual plasma capacitor · Instant drift exit",
    meter: "76%",
    image: "/showcase/cyber-5.webp",
    alt: "Glowing green neon light rings down a dark futuristic tunnel"
  },
  {
    slot: "RIG-03 // OPTICS",
    name: "Ghost HUD",
    spec: "Thermal corner projection · Zero blindspots",
    meter: "94%",
    image: "/showcase/cyber-6.webp",
    alt: "Narrow neon city backstreet packed with vibrant illuminated signs"
  }
] as const;

const telemetry = [
  { value: "128", unit: "FPS", label: "Locked frame sync" },
  { value: "09", unit: "MS", label: "Input latency floor" },
  { value: "24", unit: "LINES", label: "Dynamic street sectors" }
] as const;

export default function Cyberpunk({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Crosshair size={24} />} links={[["The city", "city"], ["Modes", "modes"], ["Loadouts", "loadouts"], ["Controls", "controls"]]} />
    <main id="main-content">
      <section className="concept-wrap cyber-hero">
        <Photo theme={theme} priority />
        <div className="hero-copy">
          <p className="concept-kicker">Arcade concept / Neo District</p>
          <h1>Own the <em>afterlight.</em></h1>
          <p>Race the rain-slick midnight grid, chain razor-clean turns, and carve a faster line through every glowing block.</p>
          <Jump to="modes">Select your mode</Jump>
        </div>
        <div className="cyber-scan" aria-hidden="true" />
        <span className="cyber-coordinate" aria-hidden="true">DISTRICT 07 / 00:<span data-count>14</span></span>
      </section>

      <section id="city" className="concept-section cyber-city">
        <RadioTower aria-hidden="true" size={35} />
        <div>
          <p className="concept-kicker">District briefing</p>
          <h2>The city redraws after dark.</h2>
          <p>Pick a route through tight neon corridors, elevated expressways, and laser-marked apexes that lock in clean drifts.</p>
        </div>
      </section>

      <section id="modes" className="concept-section cyber-modes">
        <h2>Choose a signal.</h2>
        <fieldset>
          <legend>Preview a game mode</legend>
          {levels.map((item, index) => (
            <div key={item.title} className="cyber-mode" data-reveal>
              <input type="radio" name="level" id={`level-${item.level}`} defaultChecked={index === 0} />
              <label htmlFor={`level-${item.level}`}><span>{item.level}</span>{item.title}</label>
              <div className="cyber-mode-panel">
                <Photo theme={theme} loading="eager" asset={{ src: item.image, alt: item.alt }} className="cyber-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="cyber-meter" aria-hidden="true"><span data-meter style={{ width: item.charge }} /></div>
              </div>
            </div>
          ))}
        </fieldset>
      </section>

      <section id="loadouts" className="concept-section cyber-loadouts" aria-labelledby="cyber-loadouts-title">
        <p className="concept-kicker"><Cpu size={14} aria-hidden="true" /> Garage telemetry</p>
        <h2 id="cyber-loadouts-title">Configure your midnight rig.</h2>
        <div className="cyber-loadouts-grid">
          {loadouts.map((rig) => (
            <article className="cyber-hud-card" data-reveal key={rig.name}>
              <Photo theme={theme} asset={{ src: rig.image, alt: rig.alt }} className="cyber-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="cyber-hud-body">
                <span className="cyber-tag">{rig.slot}</span>
                <h3>{rig.name}</h3>
                <p>{rig.spec}</p>
                <div className="cyber-telemetry-bar" aria-hidden="true">
                  <span data-meter style={{ width: rig.meter }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="concept-section cyber-stats-band" aria-labelledby="cyber-telemetry-title">
        <div className="cyber-stats-head">
          <div>
            <p className="concept-kicker"><Gauge size={14} aria-hidden="true" /> System diagnostics</p>
            <h2 id="cyber-telemetry-title">Engineered for split-second turns.</h2>
          </div>
          <div className="cyber-telemetry-grid">
            {telemetry.map((item) => (
              <div className="cyber-stat-box" data-reveal key={item.label}>
                <strong><span data-count>{item.value}</span> <small>{item.unit}</small></strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="controls" className="concept-section cyber-controls">
        <h2>Every corner is a choice.</h2>
        <div>
          <article className="cyber-control-card" data-reveal>
            <Photo theme={theme} asset={{ src: "/showcase/cyber-5.webp", alt: "Glowing futuristic neon arches inside a dark tunnel" }} className="cyber-card-photo" sizes="(max-width: 720px) 92vw, 560px" />
            <div className="cyber-hud-body">
              <Gamepad2 aria-hidden="true" />
              <h3>Commit to the turn</h3>
              <p>Feather the brake one beat before the neon strip to keep traction locked and carry exit speed.</p>
            </div>
          </article>
          <article className="cyber-control-card" data-reveal>
            <Photo theme={theme} asset={{ src: "/showcase/cyber-3.webp", alt: "Midnight expressway shining with wet asphalt reflections" }} className="cyber-card-photo" sizes="(max-width: 720px) 92vw, 560px" />
            <div className="cyber-hud-body">
              <Zap aria-hidden="true" />
              <h3>Save the boost</h3>
              <p>Burn stored overdrive down open boulevards rather than wasting surge into blind corners.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="concept-section cyber-last">
        <p className="concept-kicker"><ShieldAlert size={14} aria-hidden="true" /> Route replay</p>
        <h2>Learn the line. Run it again.</h2>
        <p>Clean geometry beats raw top speed. Every ghost replay reveals another tenth waiting inside District 07.</p>
      </section>

      <ConceptStories theme={theme} />
    </main>
  </>;
}

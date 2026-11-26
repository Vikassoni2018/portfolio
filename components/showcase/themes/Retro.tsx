import "./retro.css";
import { Clock, Coffee, Disc3, Flame, Sparkles } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const roasts = [
  {
    name: "House Blend",
    origin: "Colombia & Brazil",
    notes: "Cocoa · toasted almond",
    roast: "Medium-dark",
    copy: "A round, comforting daily roast tuned for clean chocolate sweetness.",
    image: "/showcase/retro-1.webp",
    alt: "Warm ceramic coffee mug filled with crema latte art"
  },
  {
    name: "Night Train",
    origin: "Sumatra & Guatemala",
    notes: "Molasses · dark cherry",
    roast: "Full city",
    copy: "Velvety caramel body built to stay rich through steamed milk or late shifts.",
    image: "/showcase/retro-2.webp",
    alt: "Espresso cappuccino cup beside freshly baked pastries"
  },
  {
    name: "Sunday Matinée",
    origin: "Ethiopia washed",
    notes: "Apricot · brown sugar",
    roast: "Light-medium",
    copy: "Bright stone-fruit aromatics for unhurried pour-overs after dusk.",
    image: "/showcase/retro-4.webp",
    alt: "Barista pouring hot water cleanly into a glass Chemex carafe"
  }
] as const;

const apparatus = [
  {
    method: "Glass Carafe",
    title: "Chemex Pour-Over",
    ratio: "20g coffee · 320g water · 3:45",
    copy: "Bonded paper filters lift clarity and keep fruit notes crisp from first sip to last.",
    image: "/showcase/retro-3.webp",
    alt: "Glass Chemex coffee maker resting on a warm wooden counter"
  },
  {
    method: "Brass & Steam",
    title: "House Espresso Bar",
    ratio: "18g in · 38g out · 29 sec",
    copy: "Low-pressure pre-infusion pulls thick, syrupy shots without bitter bite.",
    image: "/showcase/retro-6.webp",
    alt: "Classic commercial espresso machine gauges and switches"
  },
  {
    method: "Slow Steep",
    title: "Evening Immersion",
    ratio: "16g coarse · 250g water · 4:00",
    copy: "Full-bodied, cozy warmth designed for quiet corner booths and vinyl records.",
    image: "/showcase/retro-7.webp",
    alt: "Traditional coffee service cup on a vintage silver tray"
  }
] as const;

export default function Retro({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Coffee size={24} />} links={[["Roast menu", "roasts"], ["Brew bar", "brew"], ["Night counter", "counter"], ["Story", "roastery"]]} />
    <main id="main-content">
      <section className="concept-wrap retro-hero">
        <div className="hero-copy">
          <p className="concept-kicker"><Sparkles size={14} aria-hidden="true" /> Small-batch coffee for slow evenings</p>
          <h1>Stay for <em>one more.</em></h1>
          <p>A neighborhood roastery inspired by classic late-night coffee counters that kept warm lamps burning past midnight.</p>
          <Jump to="roasts">Read the roast menu</Jump>
        </div>
        <div className="retro-poster">
          <Photo theme={theme} priority />
          <div className="retro-stamp" data-spin><Disc3 size={25} aria-hidden="true" /> Slow brewed<br />Good company</div>
          <p>After Hours Roasters</p>
        </div>
      </section>

      <div className="retro-ticker" aria-hidden="true">
        <div data-marquee>FRESH ROASTS ★ HOT COFFEE ★ LATE VINYL ★ ALL GOOD ★ FRESH ROASTS ★ HOT COFFEE ★ LATE VINYL ★</div>
      </div>

      <section id="roasts" className="concept-section retro-menu">
        <p className="concept-kicker">From the roast counter</p>
        <h2>Find your cup.</h2>
        <div className="retro-roast-grid">
          {roasts.map((item) => (
            <article className="retro-card" data-reveal key={item.name}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="retro-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="retro-card-body">
                <div className="retro-card-meta"><span>{item.origin}</span><span>{item.roast}</span></div>
                <h3>{item.name}</h3>
                <p className="retro-notes">{item.notes}</p>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="retro-menu-list">
          {roasts.map((item, index) => (
            <details key={item.name} open={index === 0}>
              <summary><strong>{item.name}</strong><span>{item.notes}</span></summary>
              <p>{item.copy} Origin: {item.origin}.</p>
            </details>
          ))}
        </div>
      </section>

      <section id="brew" className="concept-section retro-brew" aria-labelledby="retro-brew-title">
        <div className="retro-brew-head">
          <div>
            <p className="concept-kicker"><Flame size={14} aria-hidden="true" /> The house recipe</p>
            <h2 id="retro-brew-title">A better coffee break.</h2>
            <p>Start with 20 grams of fresh grounds to 320 grams of filtered water. Wet evenly for a 30-second bloom, then finish in slow concentric pours.</p>
          </div>
          <Coffee size={112} aria-hidden="true" data-reveal />
        </div>
        <div className="retro-apparatus-grid">
          {apparatus.map((item) => (
            <article className="retro-card" data-reveal key={item.title}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="retro-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="retro-card-body">
                <span className="retro-pill">{item.method}</span>
                <h3>{item.title}</h3>
                <p className="retro-notes">{item.ratio}</p>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="counter" className="concept-section retro-counter" aria-labelledby="retro-counter-title">
        <div className="retro-counter-grid">
          <div className="retro-counter-copy">
            <p className="concept-kicker"><Clock size={14} aria-hidden="true" /> Open 18:00 – 02:00</p>
            <h2 id="retro-counter-title">Spinning warm vinyl at the night bar.</h2>
            <p>Every evening opens with jazz pressings, decaf pour-overs on tap, and fresh pastry trays pulled straight from the counter oven.</p>
            <div className="retro-ticket" data-reveal>
              <div className="retro-vinyl-disc" aria-hidden="true"><Disc3 size={42} /></div>
              <div>
                <strong>Tonight on Side A</strong>
                <p>Warm analog soul · Counter seats open until 2 AM</p>
              </div>
            </div>
          </div>
          <Photo theme={theme} asset={{ src: "/showcase/retro-5.webp", alt: "Vintage vinyl record turntable playing beside warm cafe lights" }} className="retro-counter-photo" sizes="(max-width: 720px) 92vw, 560px" />
        </div>
      </section>

      <section id="roastery" className="concept-section retro-story">
        <p className="concept-kicker">Behind the counter</p>
        <h2>Keep a light on.</h2>
        <p>After Hours reimagines the neighborhood roastery as a welcome stop between shifts, after the theater, or on the quiet walk home.</p>
      </section>

      <ConceptStories theme={theme} />
    </main>
  </>;
}

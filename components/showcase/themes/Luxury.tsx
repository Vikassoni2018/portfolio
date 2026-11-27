import "./luxury.css";
import { Gem, Sparkles } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, ConceptObject, Jump, Photo, type ThemeProps } from "../ThemeParts";

const pieces = [
  {
    code: "No. 01 · Earrings",
    name: "Fold earrings",
    material: "18k recycled yellow gold · 6.4g",
    copy: "A raised sculptural fold shaped to catch directional daylight along one hand-burnished ridge.",
    image: "/showcase/luxury-1.webp",
    alt: "Close-up of sculptural gold earring worn in warm natural sunlight"
  },
  {
    code: "No. 02 · Ring",
    name: "Arc ring",
    material: "18k satin gold · 9.2g",
    copy: "A softly domed band with an organic asymmetric taper that settles comfortably against the knuckle.",
    image: "/showcase/luxury-2.webp",
    alt: "Sculpted gold band rings resting on woven natural travertine"
  },
  {
    code: "No. 03 · Cuff",
    name: "Solstice cuff",
    material: "18k hammered gold · 18.5g",
    copy: "Hand-forged open bracelet balancing architectural poise with delicate filigree relief.",
    image: "/showcase/luxury-3.webp",
    alt: "Gold sculptural cuff bracelet showcased on carved dark stone"
  }
] as const;

const craftPillars = [
  {
    step: "01 / Sourcing",
    title: "100% recycled bullion",
    copy: "Every ounce of 18k gold is refined from certified post-consumer jewelry without virgin mining.",
    image: "/showcase/luxury-4.webp",
    alt: "Artisan jeweler setting stone geometry on a craftsman workbench"
  },
  {
    step: "02 / Flame & Form",
    title: "Soldered by hand",
    copy: "Micro-torches join seams invisibly so curves flow unbroken from inner band to outer lip.",
    image: "/showcase/luxury-5.webp",
    alt: "Goldsmith shaping hot metal with a fine studio torch"
  },
  {
    step: "03 / Finish",
    title: "Satin over mirror",
    copy: "Fine brass brushing softens reflections into a warm glow rather than a harsh metallic flash.",
    image: "/showcase/luxury-6.webp",
    alt: "Precision hand tools crafting a delicate gold pendant"
  }
] as const;

export default function Luxury({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Gem size={19} />} links={[["Collection", "collection"], ["Craft", "craft"], ["Lookbook", "lookbook"], ["Atelier", "atelier"]]} />
    <main id="main-content">
      <section className="concept-wrap luxury-hero">
        <div className="hero-copy">
          <p className="concept-kicker"><Sparkles size={13} aria-hidden="true" /> The Forma collection</p>
          <h1>Light,<br /><em>held close.</em></h1>
          <p>Sculptural fine jewelry shaped with quiet edges, warm recycled gold, and profiles that shift with afternoon light.</p>
          <Jump to="collection">Discover Forma</Jump>
        </div>
        <div className="luxury-image">
          <Photo theme={theme} priority />
          <span>Forma · A study in curved surfaces</span>
          <ConceptObject theme={theme} className="luxury-obj-gold" />
        </div>
      </section>

      <section id="collection" className="concept-section luxury-editorial">
        <span className="luxury-rule" data-rule aria-hidden="true" />
        <p className="concept-kicker">01 / The collection</p>
        <h2>Objects to keep close.</h2>
        <p>The collection pairs the soft arc of a band, the folded edge of an earring, and the weight of carved gold on bare skin.</p>
      </section>

      <section className="concept-wrap luxury-pieces" aria-label="Forma collection pieces">
        {pieces.map((piece) => (
          <article key={piece.name} data-reveal>
            <Photo theme={theme} asset={{ src: piece.image, alt: piece.alt }} className="luxury-piece-photo" sizes="(max-width: 720px) 92vw, 420px" />
            <div className="luxury-piece-meta">
              <span className="luxury-code">{piece.code}</span>
              <h3>{piece.name}</h3>
              <p className="luxury-material">{piece.material}</p>
              <p>{piece.copy}</p>
            </div>
          </article>
        ))}
      </section>

      <section id="craft" className="concept-section luxury-craft" aria-labelledby="luxury-craft-title">
        <span className="luxury-rule" data-rule aria-hidden="true" />
        <div className="luxury-section-head">
          <p className="concept-kicker">02 / Provenance &amp; benchwork</p>
          <h2 id="luxury-craft-title">Drawn by hand.<br />Refined in metal.</h2>
        </div>
        <div className="luxury-craft-grid">
          {craftPillars.map((item) => (
            <article className="luxury-craft-card" data-reveal key={item.title}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="luxury-craft-photo" sizes="(max-width: 720px) 92vw, 420px" />
              <div className="luxury-craft-body">
                <span className="luxury-code">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="lookbook" className="concept-section luxury-lookbook" aria-labelledby="luxury-lookbook-title">
        <div className="luxury-lookbook-grid">
          <div className="luxury-lookbook-copy">
            <p className="concept-kicker">03 / Autumn editorial</p>
            <h2 id="luxury-lookbook-title">Measured warmth in raw linen and stone.</h2>
            <p>Photographed in natural northern light to show how brushed 18k gold sits calmly against textured fabrics and warm skin tones.</p>
            <div className="luxury-metrics">
              <div><strong data-count>24</strong><span>Numbered pieces per edition</span></div>
              <div><strong data-count>18</strong><span>Karat certified recycled gold</span></div>
            </div>
          </div>
          <div className="luxury-lookbook-frames">
            <Photo theme={theme} asset={{ src: "/showcase/luxury-2.webp", alt: "Sculpted gold rings resting on woven natural fabric" }} className="luxury-frame-wide" sizes="(max-width: 720px) 92vw, 620px" />
            <Photo theme={theme} asset={{ src: "/showcase/luxury-3.webp", alt: "Carved gold bracelet resting on dark architectural stone" }} className="luxury-frame-sub" sizes="(max-width: 720px) 92vw, 320px" />
            <Photo theme={theme} asset={{ src: "/showcase/luxury-6.webp", alt: "Close-up of goldsmith shaping fine details with hand tools" }} className="luxury-frame-sub" sizes="(max-width: 720px) 92vw, 320px" />
          </div>
        </div>
      </section>

      <section id="atelier" className="concept-section luxury-atelier">
        <div>
          <p className="concept-kicker">04 / The atelier</p>
          <h2>From wax study to heirloom weight.</h2>
          <p>Each silhouette begins as hand-carved wax, tested for balance across knuckles and collarbones before a single mold is poured.</p>
        </div>
        <Photo theme={theme} asset={{ src: "/showcase/luxury-4.webp", alt: "Bench jeweler examining fine gold ring settings" }} className="luxury-atelier-photo" sizes="(max-width: 720px) 92vw, 560px" />
      </section>

      <section id="care" className="concept-section luxury-care">
        <h2>Care for what you wear.</h2>
        <details open><summary>Cleaning and satin preservation</summary><p>Wipe gently with an untreated microfiber cloth. Store each piece in its raw linen pouch and remove jewelry before swimming or applying fragrance.</p></details>
        <details><summary>Complimentary annual re-burnishing</summary><p>Send any Alba piece back to our atelier once a year for complimentary ultrasonic cleaning and satin surface restoration.</p></details>
      </section>

      <ConceptStories theme={theme} />
    </main>
  </>;
}

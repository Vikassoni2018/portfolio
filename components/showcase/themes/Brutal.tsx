import "./brutal.css";
import { ArrowUpRight, Asterisk, CircleOff, Sparkles, Zap } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, ConceptObject, Jump, Photo, type ThemeProps } from "../ThemeParts";

const projects = [
  {
    code: "01 / FESTIVAL",
    title: "Open Late",
    copy: "Loud poster direction, kinetic event passes, and wayfinding for an after-dark design summit.",
    image: "/showcase/brutal-1.webp",
    alt: "Bold painted street mural wall with vivid ocean colors"
  },
  {
    code: "02 / ZINE",
    title: "First Press",
    copy: "High-contrast risograph editorial system for an independently printed architecture journal.",
    image: "/showcase/brutal-2.webp",
    alt: "Editorial magazine spread open beside coffee on a studio table"
  },
  {
    code: "03 / ARCHITECTURE",
    title: "Block Party",
    copy: "Primary-color architectural facade signage and digital exhibition microsite.",
    image: "/showcase/brutal-3.webp",
    alt: "Geometric colorful building facade with primary red and blue frames"
  },
  {
    code: "04 / STREET ART",
    title: "Loud Wall",
    copy: "Vibrant public mural takeover paired with real-time street poster drops.",
    image: "/showcase/brutal-4.webp",
    alt: "Bright yellow and teal mural painted across a corner urban wall"
  }
] as const;

const stats = [
  { value: "48", suffix: "+", label: "Original brand launches" },
  { value: "14", suffix: "d", label: "Average sprint delivery" },
  { value: "100", suffix: "%", label: "Hand-coded layouts" },
  { value: "0", suffix: "", label: "Stock theme templates" }
] as const;

const studioCrew = [
  {
    role: "Type & Systems",
    name: "Print-first discipline",
    copy: "Every layout starts like a street poster—oversized grids, sharp ink hierarchy, zero fluff.",
    image: "/showcase/brutal-5.webp",
    alt: "Bold graphic studio typography poster on white paper"
  },
  {
    role: "Live Workspace",
    name: "Built inside real teams",
    copy: "Designers and engineers iterate on live browser prototypes from day one.",
    image: "/showcase/brutal-6.webp",
    alt: "City avenue surrounded by bold murals and modern towers"
  },
  {
    role: "Digital Craft",
    name: "Fast, punchy motion",
    copy: "Stepped GSAP entrances and tactile micro-interactions that feel raw and alive.",
    image: "/showcase/brutal-3.webp",
    alt: "Sharp geometric architectural grid facade"
  }
] as const;

export default function Brutal({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<CircleOff size={25} />} links={[["Work wall", "wall"], ["Metrics", "stats"], ["Studio", "studio"], ["Services", "services"]]} />
    <main id="main-content">
      <section className="concept-wrap brutal-hero">
        <div className="hero-copy">
          <p className="concept-kicker"><Zap size={14} aria-hidden="true" /> Independent design studio</p>
          <h1>On purpose.<br /><em>Off beat.</em></h1>
          <p>Loud identities and fast, expressive websites built from scratch for brands with an unmistakable point of view.</p>
          <Jump to="wall">See the work wall</Jump>
        </div>
        <div className="brutal-photo">
          <Photo theme={theme} priority />
          <span data-spin><Asterisk aria-hidden="true" /> Color outside the lines</span>
          <ConceptObject theme={theme} className="brutal-obj-cam" />
        </div>
      </section>

      <div className="brutal-ticker" aria-hidden="true">
        <div data-marquee>ART DIRECTION ↗ DESIGN SYSTEMS ↗ DIGITAL EXPERIENCES ↗ NO BORING SITES ↗ ART DIRECTION ↗ DESIGN SYSTEMS ↗</div>
      </div>

      <section id="wall" className="concept-section brutal-work">
        <p className="concept-kicker">Selected drops</p>
        <h2>A wall of ideas.</h2>
        <p>Four studio exercises in making one stubborn creative idea impossible to scroll past.</p>
        <div className="brutal-work-grid">
          {projects.map((item) => (
            <article data-reveal key={item.title}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="brutal-card-photo" sizes="(max-width: 720px) 92vw, 560px" />
              <div className="brutal-card-body">
                <span className="brutal-badge">{item.code}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="stats" className="concept-section brutal-stats" aria-labelledby="brutal-stats-title">
        <p className="concept-kicker">Hard numbers</p>
        <h2 id="brutal-stats-title">Built fast. Built loud.</h2>
        <div className="brutal-stats-grid">
          {stats.map((stat) => (
            <div className="brutal-stat-tile" data-reveal key={stat.label}>
              <strong><span data-count>{stat.value}</span>{stat.suffix}</strong>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="studio" className="concept-section brutal-team" aria-labelledby="brutal-studio-title">
        <p className="concept-kicker"><Sparkles size={14} aria-hidden="true" /> Inside Offbeat</p>
        <h2 id="brutal-studio-title">Posters first. Pixels second.</h2>
        <div className="brutal-team-grid">
          {studioCrew.map((member) => (
            <article className="brutal-team-card" data-reveal key={member.name}>
              <Photo theme={theme} asset={{ src: member.image, alt: member.alt }} className="brutal-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="brutal-card-body">
                <span className="brutal-badge">{member.role}</span>
                <h3>{member.name}</h3>
                <p>{member.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="concept-section brutal-services">
        <p className="concept-kicker">What we make</p>
        <h2>From first line to launch.</h2>
        {["Art direction", "Brand identity", "Expressive web design", "GSAP motion systems"].map((item) => (
          <h3 key={item} data-reveal>{item}<ArrowUpRight aria-hidden="true" /></h3>
        ))}
      </section>

      <section id="process" className="concept-section brutal-process">
        <h2>Make the idea earn its space.</h2>
        <details open><summary>Start with the brief</summary><p>Pin down what the audience needs to feel in the first three seconds and which conventions are worth breaking.</p></details>
        <details><summary>Build a loud system</summary><p>Pressure-test type scale, hard-shadow contrast, and stepped GSAP motion on real headlines before locking code.</p></details>
        <details><summary>Release it into the world</summary><p>Ship the strongest direction from interactive prototype to production website and street-ready kit.</p></details>
      </section>

      <ConceptStories theme={theme} />
    </main>
  </>;
}

import "./brutal.css";
import { ArrowUpRight, Asterisk, CircleOff } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

export default function Brutal({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<CircleOff size={25} />} links={[["Work wall", "wall"], ["Services", "services"], ["Process", "process"]]} />
    <main id="main-content">
    <section className="concept-wrap brutal-hero">
      <div className="hero-copy"><p className="concept-kicker">Independent design studio</p><h1>On purpose.<br /><em>Off beat.</em></h1><p>Distinct identities and fast, expressive websites for brands with a point of view.</p><Jump to="wall">See the work wall</Jump></div>
      <div className="brutal-photo"><Photo theme={theme} priority /><span data-reveal><Asterisk aria-hidden="true" /> Color outside the lines</span></div>
    </section>
    <div className="brutal-ticker" aria-hidden="true"><div data-marquee>ART DIRECTION ↗ DESIGN SYSTEMS ↗ DIGITAL EXPERIENCES ↗ ART DIRECTION ↗ DESIGN SYSTEMS ↗ DIGITAL EXPERIENCES ↗</div></div>
    <section id="wall" className="concept-section brutal-work">
      <h2>A wall of ideas.</h2><p>Two studio exercises in making a simple idea unmistakable.</p>
      <div><article data-reveal><div className="brutal-poster"><span aria-hidden="true">↗</span>Open<br />Late.</div><h3>Open Late</h3><p>Poster direction for a fictional after-dark arts festival.</p></article>
      <article data-reveal><div className="brutal-poster"><span aria-hidden="true">✦</span>First<br />Press.</div><h3>First Press</h3><p>A high-contrast identity for an independently published zine.</p></article></div>
    </section>
    <section id="services" className="concept-section brutal-services"><p className="concept-kicker">What we make</p><h2>From first line to launch.</h2>
      {["Art direction", "Brand identity", "Expressive web design"].map((item) => <h3 key={item} data-reveal>{item}<ArrowUpRight aria-hidden="true" /></h3>)}
    </section>
    <section id="process" className="concept-section brutal-process"><h2>Make the idea earn its space.</h2>
      <details open><summary>Start with the brief</summary><p>Identify what the audience needs to understand and which ideas are worth pushing further.</p></details>
      <details><summary>Build a system</summary><p>Test the type, color and motion on real content before the design is locked.</p></details>
      <details><summary>Release it into the world</summary><p>Take the strongest direction from prototype to a usable site or identity kit.</p></details>
    </section>
    <ConceptStories theme={theme} />
    </main>
  </>;
}


import "./luxury.css";
import { Gem } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

export default function Luxury({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Gem size={19} />} links={[["Collection", "collection"], ["Atelier", "atelier"], ["Care", "care"]]} />
    <main id="main-content">
    <section className="concept-wrap luxury-hero">
      <div className="hero-copy"><p className="concept-kicker">The Forma collection</p><h1>Light,<br /><em>held close.</em></h1><p>Sculptural jewelry with soft edges, warm finishes and a shape that changes with the light.</p><Jump to="collection">Discover Forma</Jump></div>
      <div className="luxury-image"><Photo theme={theme} priority /><span>Forma · A study in curved surfaces</span></div>
    </section>
    <section id="collection" className="concept-section luxury-editorial"><p className="concept-kicker">01 / The collection</p><h2>Objects to keep close.</h2><p>The collection brings together the soft arc of a ring, the folded shape of a small earring and the fine line of a pendant.</p></section>
    <section className="concept-wrap luxury-pieces" aria-label="Forma collection pieces">
      {["Fold earrings", "Arc ring", "Line pendant"].map((piece, index) => <article key={piece} data-reveal><div aria-hidden="true" className={`luxury-object luxury-object-${index}`} /><h3>{piece}</h3><p>{["A raised fold that catches the light on one edge.", "A rounded band with a softly uneven profile.", "A slender pendant that rests close to the collarbone."][index]}</p></article>)}
    </section>
    <section id="atelier" className="concept-section luxury-atelier"><p className="concept-kicker">02 / The atelier</p><div><h2>Drawn by hand.<br />Refined in metal.</h2><p>The pieces start as gestures on paper. Each edge and curve is tested by how it feels on the body and how it looks in daylight.</p></div></section>
    <section id="care" className="concept-section luxury-care"><h2>Care for what you wear.</h2><details><summary>Cleaning and storage</summary><p>Wipe gently with a soft cloth. Store each piece on its own and remove jewelry before swimming or using fragrance.</p></details></section>
    <ConceptStories theme={theme} />
    </main>
  </>;
}


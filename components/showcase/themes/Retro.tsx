import "./retro.css";
import { Coffee, Disc3 } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const menu = [
  ["House Blend", "Cocoa · toasted almond", "A round, comforting blend for a daily pot of coffee."],
  ["Night Train", "Molasses · dark cherry", "A deeper roast that holds up well with milk."],
  ["Sunday Matinée", "Apricot · brown sugar", "A brighter cup with a soft, sweet finish."]
];

export default function Retro({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Coffee size={24} />} links={[["Roast menu", "roasts"], ["Brew guide", "brew"], ["Our story", "roastery"]]} />
    <main id="main-content">
    <section className="concept-wrap retro-hero">
      <div className="hero-copy"><p className="concept-kicker">Small-batch coffee for slow evenings</p><h1>Stay for <em>one more.</em></h1><p>A roastery concept inspired by the coffee counters that kept the lights on a little later.</p><Jump to="roasts">Read the roast menu</Jump></div>
      <div className="retro-poster"><Photo theme={theme} priority /><div className="retro-stamp" data-spin><Disc3 size={25} aria-hidden="true" /> Slow brewed<br />Good company</div><p>After Hours Roasters</p></div>
    </section>
    <div className="retro-ticker" aria-hidden="true"><div data-marquee>FRESH ROASTS ★ HOT COFFEE ★ ALL GOOD ★ FRESH ROASTS ★ HOT COFFEE ★ ALL GOOD ★</div></div>
    <section id="roasts" className="concept-section retro-menu"><p className="concept-kicker">From the roast counter</p><h2>Find your cup.</h2>
      {menu.map(([title, notes, text], index) => <details key={title} open={index === 0} data-reveal><summary><strong>{title}</strong><span>{notes}</span></summary><p>{text}</p></details>)}
    </section>
    <section id="brew" className="concept-section retro-brew"><div><p className="concept-kicker">The house recipe</p><h2>A better coffee break.</h2><p>For the House Blend, start with 20 grams of ground coffee to 320 grams of water. Give the first pour 30 seconds, then slowly add the rest.</p></div><Coffee size={124} aria-hidden="true" data-reveal /></section>
    <section id="roastery" className="concept-section retro-story"><p className="concept-kicker">Behind the counter</p><h2>Keep a light on.</h2><p>After Hours imagines the roastery as a place to slow down between shifts, after a show or on the way home.</p></section>
    <ConceptStories theme={theme} />
    </main>
  </>;
}


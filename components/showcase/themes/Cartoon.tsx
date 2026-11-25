import "./cartoon.css";
import { Citrus } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const flavors = [
  ["Sunny Orange", "Juicy orange with a little mandarin lift."],
  ["Pink Grapefruit", "A bright snap of grapefruit with a dry finish."],
  ["Lemon Lime", "Sharp lemon, fresh lime and plenty of fizz."]
];

export default function Cartoon({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Citrus size={25} />} links={[["Flavors", "flavors"], ["Our orange", "orange"], ["Serve it", "serve"]]} />
    <main id="main-content">
    <section className="concept-wrap cartoon-hero">
      <div className="hero-copy"><p className="concept-kicker">Citrus soda with character</p><h1>Big fizz.<br /><em>Little sip.</em></h1><p>Juicy citrus and big bubbles for afternoons that could use a little more orange.</p><Jump to="flavors">Meet the flavors</Jump></div>
      <div className="mascot-wrap">
        <svg viewBox="0 0 420 370" role="img" aria-label="An illustrated smiling orange in sneakers waving hello">
          <g className="mascot-zaps" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round">
            <path pathLength="100" d="M39 120l16 15m-31 11 19 4m327-46-13 22m35-7-15 18M53 261l-18 10m333-7 18 11" />
          </g>
          <g className="mascot" stroke="#203727" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
            <path fill="none" d="M119 210Q67 210 68 162m237 36q45-6 56-40M174 280l-9 49m76-49 8 49" />
            <path fill="#fff8d8" d="M166 315c-30 1-48 11-44 24h53v-22zm82 0c30 1 48 11 44 24h-53v-22z" />
            <path fill="#57975d" d="M203 87q-2-71 73-58-7 57-73 58zm-1 0q-19-52-56-46 2 41 56 46z" />
            <circle cx="209" cy="181" r="108" fill="#ff7838" /><circle cx="209" cy="181" r="82" fill="#ffb52f" stroke="#fff2ab" strokeWidth="8" />
            <path d="M174 164v10m67-10v10m-71 33q40 46 78-4" fill="none" />
            <path d="M142 185h12m111 0h12" stroke="#b2432c" />
          </g>
        </svg>
      </div>
    </section>
    <section className="cartoon-strip" aria-label="Made with bright citrus">Bright citrus <span>✦</span> Big bubbles <span>✦</span> Serve cold <span>✦</span> Good company</section>
    <section id="flavors" className="concept-section cartoon-flavors"><p className="concept-kicker">The fridge lineup</p><h2>Pick your kind of zing.</h2>
      <div>{flavors.map(([title, text], index) => <article data-reveal key={title}><div className="soda-can" aria-hidden="true"><Citrus size={36} /><span>Zingy<br />Pop</span></div><h3>{title}</h3><p>{text}</p><span className="flavor-index" aria-hidden="true">0{index + 1}</span></article>)}</div>
    </section>
    <section id="orange" className="concept-section cartoon-story"><Photo theme={theme} /><div><p className="concept-kicker">The orange behind the fizz</p><h2>A good squeeze changes everything.</h2><p>We built the range around the bright, slightly tart taste of a freshly cut orange. The other flavors start from the same idea: citrus first, fizz second.</p></div></section>
    <section id="serve" className="concept-section cartoon-serve"><h2>Better over ice.</h2><details><summary>Make a Sunny Highball</summary><p>Fill a tall glass with ice and pour in Sunny Orange. Add a squeeze of lime, a thin orange slice and a sprig of mint.</p></details></section>
    <ConceptStories theme={theme} />
    </main>
  </>;
}


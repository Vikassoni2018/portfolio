import "./cartoon.css";
import { Citrus, Flame, Sparkles, Star } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const flavors = [
  {
    name: "Sunny Orange",
    tagline: "Sweet California peel & big fizz",
    copy: "Juicy Valencia orange with a playful mandarin snap and sparkling spring water.",
    image: "/showcase/cartoon-1.webp",
    alt: "Tall glass of bright orange soda garnished with an orange slice"
  },
  {
    name: "Pink Grapefruit",
    tagline: "Crisp ruby tang & dry bite",
    copy: "Bright ruby grapefruit lifted with sea salt and rosemary sparkle.",
    image: "/showcase/cartoon-2.webp",
    alt: "Pink grapefruit citrus cooler with fresh citrus wedge"
  },
  {
    name: "Lemon Lime",
    tagline: "Zesty double squeeze & chill",
    copy: "Sharp Meyer lemon meets key lime and crushed mint bubbles.",
    image: "/showcase/cartoon-3.webp",
    alt: "Iced lemon-lime sparkling soda with fresh green mint leaves"
  }
] as const;

const ingredients = [
  {
    badge: "100% Real Juice",
    title: "Cold-pressed orchard citrus",
    copy: "Real fruit oils and sun-ripened zest give every pop its comic-bright flavor.",
    image: "/showcase/cartoon-4.webp",
    alt: "Fresh orange slices on a wooden board beside a citrus glass"
  },
  {
    badge: "3g Cane Sugar",
    title: "Zero syrupy aftertaste",
    copy: "Just enough golden cane sweetness so the bubbly citrus tang leads the sip.",
    image: "/showcase/cartoon-7.webp",
    alt: "Bright wedges of freshly sliced orange ready to press"
  },
  {
    badge: "Extra Fizzy",
    title: "Spring water carbonation",
    copy: "Fine-tuned crisp bubbles that stay lively over tall glasses of crushed ice.",
    image: "/showcase/cartoon-6.webp",
    alt: "Sparkling clear citrus soda over ice cubes with mint and lemon"
  },
  {
    badge: "Small Batch",
    title: "Canned fresh every Friday",
    copy: "Chilled, vibrant, and packed straight into comic-book cooler crates.",
    image: "/showcase/cartoon-5.webp",
    alt: "Chilled glass soda bottles filled with bright citrus drinks"
  }
] as const;

const packs = [
  {
    tag: "Best Seller",
    title: "The 12-Can Fridge Mix",
    copy: "Four cans each of Sunny Orange, Pink Grapefruit, and Lemon Lime.",
    price: "$28 / pack",
    image: "/showcase/cartoon-5.webp",
    alt: "Citrus soda bottles chilled and ready to pack"
  },
  {
    tag: "Party Box",
    title: "The Backyard Cooler Kit",
    copy: "Twenty-four crisp cans plus collectible vinyl mascot stickers.",
    price: "$49 / crate",
    image: "/showcase/cartoon-8.webp",
    alt: "Bright lime green sparkling soda topped with lemon slice"
  },
  {
    tag: "Mixer Duo",
    title: "Golden Hour Highball Set",
    copy: "Two flavors curated for mocktails, porch hangs, and crushed-ice nights.",
    price: "$24 / set",
    image: "/showcase/cartoon-6.webp",
    alt: "Sparkling lemon-mint citrus highball over crushed ice"
  }
] as const;

export default function Cartoon({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Citrus size={25} />} links={[["Flavors", "flavors"], ["Ingredients", "ingredients"], ["Packs", "packs"], ["Serve it", "serve"]]} />
    <main id="main-content">
      <section className="concept-wrap cartoon-hero">
        <div className="hero-copy">
          <p className="concept-kicker"><Sparkles size={14} aria-hidden="true" /> Citrus soda with character</p>
          <h1>Big fizz.<br /><em>Little sip.</em></h1>
          <p>Juicy real-fruit citrus and noisy comic-book bubbles for afternoons that need a blast of orange.</p>
          <Jump to="flavors">Meet the flavors</Jump>
        </div>
        <div className="mascot-wrap">
          <span className="cartoon-bubble" aria-hidden="true">POP! ZESTY!</span>
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

      <div className="cartoon-strip" aria-hidden="true">
        <div data-marquee>BRIGHT CITRUS ✦ BIG BUBBLES ✦ SERVE COLD ✦ GOOD COMPANY ✦ REAL JUICE ✦ BRIGHT CITRUS ✦ BIG BUBBLES ✦</div>
      </div>

      <section id="flavors" className="concept-section cartoon-flavors">
        <p className="concept-kicker">The fridge lineup</p>
        <h2>Pick your kind of zing.</h2>
        <div>
          {flavors.map((item, index) => (
            <article data-reveal key={item.name}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="cartoon-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="cartoon-flavor-body">
                <div className="cartoon-can-row">
                  <div className="soda-can" aria-hidden="true"><Citrus size={26} /><span>Zingy<br />Pop</span></div>
                  <div>
                    <span className="cartoon-tag">{item.tagline}</span>
                    <h3>{item.name}</h3>
                  </div>
                </div>
                <p>{item.copy}</p>
              </div>
              <span className="flavor-index" aria-hidden="true">0{index + 1}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="ingredients" className="concept-section cartoon-ingredients" aria-labelledby="cartoon-ingredients-title">
        <p className="concept-kicker"><Flame size={14} aria-hidden="true" /> Inside every can</p>
        <h2 id="cartoon-ingredients-title">Nothing weird. Just squeeze &amp; fizz.</h2>
        <div className="cartoon-grid-4">
          {ingredients.map((item) => (
            <article className="cartoon-comic-card" data-reveal key={item.title}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="cartoon-card-photo" sizes="(max-width: 720px) 92vw, 310px" />
              <div className="cartoon-comic-body">
                <span className="cartoon-pill">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="orange" className="concept-section cartoon-story">
        <Photo theme={theme} />
        <div>
          <p className="concept-kicker">The orange behind the fizz</p>
          <h2>A good squeeze changes everything.</h2>
          <p>We built the whole range around the bright, slightly tart kick of a freshly cut orange. Every flavor starts from the same rule: real orchard citrus first, noisy bubbles second.</p>
        </div>
      </section>

      <section id="packs" className="concept-section cartoon-packs" aria-labelledby="cartoon-packs-title">
        <p className="concept-kicker"><Star size={14} aria-hidden="true" /> Stock the cooler</p>
        <h2 id="cartoon-packs-title">Grab a bundle for the porch.</h2>
        <div className="cartoon-packs-grid">
          {packs.map((pack) => (
            <article className="cartoon-comic-card cartoon-pack-card" data-reveal key={pack.title}>
              <Photo theme={theme} asset={{ src: pack.image, alt: pack.alt }} className="cartoon-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="cartoon-comic-body">
                <div className="cartoon-pack-top">
                  <span className="cartoon-pill">{pack.tag}</span>
                  <strong>{pack.price}</strong>
                </div>
                <h3>{pack.title}</h3>
                <p>{pack.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="serve" className="concept-section cartoon-serve">
        <h2>Better over ice.</h2>
        <p>Keep two cans cold in the fridge door and pour slowly over big cubes so the citrus oil lifts right to the top.</p>
        <div className="cartoon-serve-details">
          <details open><summary>Make a Sunny Highball</summary><p>Fill a tall glass with ice and pour in Sunny Orange. Add a squeeze of lime, a thin orange wheel and a sprig of fresh mint.</p></details>
          <details><summary>Try the Ruby Spritz</summary><p>Pour Pink Grapefruit over crushed ice with a splash of tonic and a pinch of flaky sea salt on the rim.</p></details>
        </div>
      </section>

      <ConceptStories theme={theme} />
    </main>
  </>;
}

import "./clay.css";
import { CalendarDays, Check, HeartHandshake, Shapes, Sparkles, StickyNote, Sun } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, ConceptObject, Jump, Photo, type ThemeProps } from "../ThemeParts";

const steps = [
  {
    symbol: "✦",
    title: "Catch an idea",
    copy: "Drop a messy note or rough sketch onto the canvas without forcing a category first.",
    image: "/showcase/clay-1.webp",
    alt: "Pastel lilac, blue, and yellow notebooks arranged with highlighters"
  },
  {
    symbol: "●",
    title: "Give it a day",
    copy: "Drag squishy daily blocks around until your week feels light enough to breathe.",
    image: "/showcase/clay-2.webp",
    alt: "Weekly grid notepad beside green and cream desk stationery"
  },
  {
    symbol: "✓",
    title: "Call it done",
    copy: "Finish with a gentle check, or bounce anything extra into next week with zero guilt.",
    image: "/showcase/clay-3.webp",
    alt: "Soft pink pastel stationery flat lay on a clean surface"
  }
] as const;

const moods = [
  {
    id: "create",
    label: "Deep Create",
    badge: "2h studio block",
    headline: "Protect morning light for rough drafts.",
    copy: "Pebble dims recurring notifications and holds one clean block for writing, sketching, or building.",
    image: "/showcase/clay-4.webp",
    alt: "Open spiral sketchbook waiting for morning notes"
  },
  {
    id: "admin",
    label: "Light Admin",
    badge: "30m tidy sweep",
    headline: "Bundle small errands into one quick tray.",
    copy: "Group invoices, replies, and quick follow-ups into one soft afternoon tile instead of letting them scatter.",
    image: "/showcase/clay-6.webp",
    alt: "Minimalist desk with keyboard, phone, and organized notebooks"
  },
  {
    id: "reset",
    label: "Rest & Reset",
    badge: "Zero deadlines",
    headline: "Leave empty cushions in your calendar.",
    copy: "Block genuine recovery afternoons so Friday ends with clarity instead of a wall of overdue red badges.",
    image: "/showcase/clay-5.webp",
    alt: "Creative artist smiling with paint brushes in a bright studio"
  }
] as const;

const templates = [
  {
    tag: "Makers & Designers",
    title: "Studio Sprint Week",
    copy: "Three protected creative mornings paired with two light feedback windows.",
    image: "/showcase/clay-4.webp",
    alt: "Spiral notebook and planning sheets on a bright desk"
  },
  {
    tag: "Students & Learners",
    title: "Study & Review Rhythm",
    copy: "Short focused modules with built-in recap blocks before every exam.",
    image: "/showcase/clay-2.webp",
    alt: "Pastel note sheets and colored pens arranged on a dark desk"
  },
  {
    tag: "Solo Founders",
    title: "Calm Launch Week",
    copy: "Keep product work, customer calls, and shipping day neatly balanced.",
    image: "/showcase/clay-6.webp",
    alt: "Overhead shot of clean creative desk workspace"
  }
] as const;

const makers = [
  {
    name: "Maya Kulkarni",
    role: "Illustrator & Course Creator",
    quote: "Every other planner made my Mondays feel like an audit. Pebble feels like setting out fresh stationery.",
    image: "/showcase/clay-5.webp",
    alt: "Portrait of a smiling creative artist in a sunlit studio"
  },
  {
    name: "Rohan Desai",
    role: "Indie App Maker",
    quote: "Moving a card to Thursday feels tactile and forgiving—and I actually finish what I keep on my desk.",
    image: "/showcase/clay-3.webp",
    alt: "Soft pink creative stationery flat lay"
  }
] as const;

const days = [
  ["Mon", "Make a moodboard", "Gather three visual references that set the tone for your week without touching email first."],
  ["Tue", "Sketch the rough cut", "Spend one quiet morning getting an imperfect draft out onto the page."],
  ["Wed", "Protect a focus block", "Turn off status pings for ninety minutes and move your main deliverable across the line."],
  ["Thu", "Share & refine", "Run a thirty-minute feedback check and capture adjustments while they are fresh."],
  ["Fri", "Put the week to bed", "Roll anything unfinished into next Monday's tray and write down one small win."]
];

export default function Clay({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Shapes size={25} />} links={[["Routine", "routine"], ["Moods", "moods"], ["Templates", "templates"], ["Sample week", "week"]]} />
    <main id="main-content">
      <section className="clay-hero concept-wrap">
        <div className="hero-copy">
          <p className="concept-kicker"><Sparkles size={14} aria-hidden="true" /> The feel-good weekly planner</p>
          <h1>A little more <em>headspace.</em></h1>
          <p>Meet Pebble, the softly sculpted planner that turns a tangled list of ideas into a week you can actually enjoy.</p>
          <Jump to="week">Try a sample week</Jump>
        </div>
        <div className="clay-stage" aria-label="A playful weekly planner with sculpted clay tiles">
          <div data-float className="clay-ball clay-peach" aria-hidden="true"><Sun /></div>
          <div data-float className="clay-ball clay-mint" aria-hidden="true"><Check /></div>
          <div className="clay-notebook" aria-hidden="true"><CalendarDays size={52} /><strong>My week</strong><i /><i /><i /></div>
          <div data-float className="clay-ball clay-lilac" aria-hidden="true"><StickyNote /></div>
          <div className="clay-hero-snapshot">
            <Photo theme={theme} priority asset={{ src: "/showcase/clay-1.webp", alt: "Pastel notebooks and stationery arranged on a bright desk" }} className="clay-hero-photo" sizes="(max-width: 720px) 60vw, 240px" />
          </div>
          <ConceptObject theme={theme} className="clay-obj-vessel" />
        </div>
      </section>

      <section id="routine" className="concept-section clay-routine">
        <div>
          <p className="concept-kicker">A routine that fits</p>
          <h2>Get it out of your head.</h2>
          <p>Catch stray thoughts, pick three gentle priorities, and leave soft cushions for the unplanned parts of the day.</p>
        </div>
        <Photo theme={theme} />
      </section>

      <section className="concept-wrap clay-steps" aria-label="Pebble features">
        {steps.map((item) => (
          <article className="clay-card" data-reveal key={item.title}>
            <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="clay-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
            <div className="clay-card-body">
              <span className="clay-badge" aria-hidden="true">{item.symbol}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </section>

      <section id="moods" className="concept-section clay-moods" aria-labelledby="clay-moods-title">
        <div className="clay-moods-head">
          <p className="concept-kicker">Energy-aware planning</p>
          <h2 id="clay-moods-title">Match the day to your energy.</h2>
          <p>Pick a mode below to see how Pebble shapes your clay blocks around how you actually feel today.</p>
        </div>
        <fieldset className="clay-mood-picker">
          <legend className="sr-only">Choose daily planning mood</legend>
          {moods.map((mood, idx) => (
            <div key={mood.id} className="clay-mood-option">
              <input type="radio" name="clay-mood" id={`clay-mood-${mood.id}`} defaultChecked={idx === 0} />
              <label htmlFor={`clay-mood-${mood.id}`}>{mood.label}</label>
              <article className="clay-mood-stage">
                <Photo theme={theme} loading="eager" asset={{ src: mood.image, alt: mood.alt }} className="clay-mood-photo" sizes="(max-width: 720px) 92vw, 520px" />
                <div className="clay-mood-copy">
                  <span className="clay-pill">{mood.badge}</span>
                  <h3>{mood.headline}</h3>
                  <p>{mood.copy}</p>
                </div>
              </article>
            </div>
          ))}
        </fieldset>
      </section>

      <section id="templates" className="concept-section clay-templates" aria-labelledby="clay-templates-title">
        <p className="concept-kicker">Ready-made clay boards</p>
        <h2 id="clay-templates-title">Start with a gentle template.</h2>
        <div className="clay-template-grid">
          {templates.map((tpl) => (
            <article className="clay-card clay-template-card" data-reveal key={tpl.title}>
              <Photo theme={theme} asset={{ src: tpl.image, alt: tpl.alt }} className="clay-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="clay-card-body">
                <span className="clay-pill">{tpl.tag}</span>
                <h3>{tpl.title}</h3>
                <p>{tpl.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="week" className="concept-section clay-week">
        <div>
          <p className="concept-kicker">The sample planner</p>
          <h2>See how a week feels.</h2>
          <p>Open any day to preview how Pebble breaks big creative ambitions into friendly, low-pressure pockets.</p>
        </div>
        <div>
          {days.map(([day, title, description]) => (
            <details key={day}><summary>{day} <strong>{title}</strong></summary><p>{description}</p></details>
          ))}
        </div>
      </section>

      <section className="concept-section clay-makers" aria-labelledby="clay-makers-title">
        <p className="concept-kicker"><HeartHandshake size={15} aria-hidden="true" /> Creative community</p>
        <h2 id="clay-makers-title">Loved by thoughtful minds.</h2>
        <div className="clay-makers-grid">
          {makers.map((maker) => (
            <article className="clay-maker-card" data-reveal key={maker.name}>
              <Photo theme={theme} asset={{ src: maker.image, alt: maker.alt }} className="clay-maker-photo" sizes="(max-width: 720px) 92vw, 240px" />
              <div>
                <p className="clay-quote">“{maker.quote}”</p>
                <p className="clay-author"><strong>{maker.name}</strong> · {maker.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pace" className="concept-section clay-pace">
        <h2>Leave some space for yourself.</h2>
        <p>Empty days belong in the plan, too. Pebble gives good ideas a soft place to rest without turning every spark into a deadline.</p>
      </section>

      <ConceptStories theme={theme} />
    </main>
  </>;
}

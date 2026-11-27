import "./glass.css";
import { Aperture, AudioLines, CheckCircle2, Layers3, ScanLine, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, ConceptObject, Jump, Photo, type ThemeProps } from "../ThemeParts";

const features = [
  [
    Layers3,
    "Gather the context",
    "Bring notes, documents and interview transcripts into one luminous research layer.",
    "/showcase/glass-1.webp",
    "Translucent 3D spheres representing connected research clusters"
  ],
  [
    ScanLine,
    "Trace the answer",
    "Follow each finding back to its source so every reviewer can verify the exact quote.",
    "/showcase/glass-2.webp",
    "Dark laptop dashboard showing structured product analytics"
  ],
  [
    AudioLines,
    "Brief the team",
    "Turn a messy research thread into a crystal-clear executive summary with next steps.",
    "/showcase/glass-3.webp",
    "Developer workstation glowing softly with active research code"
  ]
] as const;

const signals = [
  {
    id: "interviews",
    label: "User interviews",
    tag: "48 transcripts indexed",
    headline: "Onboarding friction clusters around workspace invites.",
    summary: "19 out of 24 enterprise buyers paused when assigning seat roles before importing sample data.",
    image: "/showcase/glass-4.webp",
    alt: "Multi-monitor dark software desk displaying research logs"
  },
  {
    id: "tickets",
    label: "Support tickets",
    tag: "312 tagged threads",
    headline: "Billing export questions spike on the first Monday.",
    summary: "Self-serve invoice presets cut recurring finance requests by more than half across pilot accounts.",
    image: "/showcase/glass-5.webp",
    alt: "Syntax-highlighted telemetry code on an obsidian display"
  },
  {
    id: "market",
    label: "Market signals",
    tag: "16 analyst briefs",
    headline: "Security checklists now decide trials in week one.",
    summary: "Teams that surface SOC-2 artifacts beside the signup card convert twice as fast during evaluation.",
    image: "/showcase/glass-7.webp",
    alt: "Illuminated glass skyscrapers reflected in calm dark water"
  }
] as const;

const useCases = [
  {
    role: "Product Discovery",
    title: "Synthesize 20 calls before lunch.",
    copy: "Cluster recurring pain points automatically while preserving timestamped citations for every quote.",
    image: "/showcase/glass-4.webp",
    alt: "Illuminated research monitors inside a dark product studio"
  },
  {
    role: "Design Ops",
    title: "Keep usability clips next to Figma links.",
    copy: "Attach prototype recordings and friction tags directly to the spec so designers see why changes ship.",
    image: "/showcase/glass-5.webp",
    alt: "Close-up of dark interface layout code and styling tokens"
  },
  {
    role: "Executive Review",
    title: "Ship crisp quarterly insight memos.",
    copy: "Publish translucent interactive briefs stakeholders can skim in two minutes or inspect to raw notes.",
    image: "/showcase/glass-6.webp",
    alt: "Product lead smiling beside a laptop in a glass-walled studio"
  }
] as const;

const testimonials = [
  {
    quote: "Prism turned four weeks of scattered Notion docs and Zoom transcripts into one clear product decision in a single afternoon.",
    author: "Ananya Verma",
    role: "VP of Product, Northstar Cloud",
    image: "/showcase/glass-6.webp",
    alt: "Portrait of a smiling product leader working on a laptop"
  },
  {
    quote: "Having every claim linked back to an exact customer quote eliminated half of our roadmap debates overnight.",
    author: "Daniel Mercer",
    role: "Head of UX Research, LatticeFlow",
    image: "/showcase/glass-7.webp",
    alt: "Glass tower facade reflecting night city lights"
  }
] as const;

export default function Glass({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Aperture size={24} />} links={[["Platform", "platform"], ["Signals", "signals"], ["Workflow", "workflow"], ["Stories", "proof"]]} />
    <main id="main-content">
      <section className="glass-hero concept-wrap">
        <div className="glass-halo" aria-hidden="true" />
        <div className="hero-copy">
          <p className="concept-kicker"><Sparkles size={14} /> Research intelligence</p>
          <h1>Make sense of <em>the noise.</em></h1>
          <p>Prism brings every source into focus through frosted, layered clarity so your team sees what matters and decides what comes next.</p>
          <div className="glass-hero-actions">
            <Jump to="platform">Explore the platform</Jump>
            <div className="glass-hero-metrics" aria-label="Platform highlights">
              <span><strong data-count>98</strong>% cited</span>
              <span><strong>4.2×</strong> faster briefs</span>
            </div>
          </div>
        </div>
        <div className="glass-stage" data-depth>
          <Photo theme={theme} priority />
          <div className="glass-orbit" aria-hidden="true" />
          <div className="glass-card glass-main" data-float>
            <p><Aperture size={19} /> Research brief</p>
            <strong>Where does onboarding break down?</strong>
            <div><span /> Finding patterns across 48 interviews</div>
            <div><span /> Linking claims directly to source notes</div>
            <div><span /> Preparing an executive decision brief</div>
          </div>
          <div className="glass-card glass-chip" data-float><Sparkles size={18} /> 142 sources synced</div>
          <ConceptObject theme={theme} className="glass-obj-prism" />
        </div>
      </section>

      <section id="platform" className="concept-section glass-intro">
        <p className="concept-kicker">The platform</p>
        <h2>From a hundred tabs to one clear answer.</h2>
        <p>A shared frosted workspace for product teams who move fast without drifting away from primary evidence.</p>
      </section>

      <section className="concept-wrap glass-features" aria-label="Research tools">
        {features.map(([Icon, title, text, src, alt]) => (
          <article className="glass-card glass-media-card" data-reveal key={title}>
            <Photo theme={theme} asset={{ src, alt }} className="glass-card-photo" sizes="(max-width: 720px) 92vw, 420px" />
            <div className="glass-card-body">
              <div className="glass-card-head"><Icon size={22} aria-hidden="true" /><h3>{title}</h3></div>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>

      <section id="signals" className="concept-section glass-matrix" aria-labelledby="glass-signals-title">
        <div className="glass-matrix-head">
          <p className="concept-kicker">Interactive signal layer</p>
          <h2 id="glass-signals-title">Inspect every live channel.</h2>
          <p>Switch streams to inspect how Prism refracts raw customer chatter into verified product signals.</p>
        </div>
        <fieldset className="glass-signal-tabs">
          <legend className="sr-only">Select research signal stream</legend>
          {signals.map((item, idx) => (
            <div key={item.id} className="glass-tab-item">
              <input type="radio" name="glass-signal" id={`signal-${item.id}`} defaultChecked={idx === 0} />
              <label htmlFor={`signal-${item.id}`}>{item.label}</label>
              <article className="glass-card glass-signal-panel">
                <Photo theme={theme} loading="eager" asset={{ src: item.image, alt: item.alt }} className="glass-signal-photo" sizes="(max-width: 760px) 92vw, 560px" />
                <div className="glass-signal-copy">
                  <span className="glass-pill"><TrendingUp size={14} aria-hidden="true" /> {item.tag}</span>
                  <h3>{item.headline}</h3>
                  <p>{item.summary}</p>
                </div>
              </article>
            </div>
          ))}
        </fieldset>
      </section>

      <section id="use-cases" className="concept-section glass-cases" aria-labelledby="glass-cases-title">
        <p className="concept-kicker">Built for cross-functional teams</p>
        <h2 id="glass-cases-title">Clarity across every discipline.</h2>
        <div className="glass-cases-grid">
          {useCases.map((item) => (
            <article className="glass-card glass-media-card" data-reveal key={item.role}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="glass-card-photo" sizes="(max-width: 720px) 92vw, 420px" />
              <div className="glass-card-body">
                <span className="glass-pill">{item.role}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="concept-section glass-workflow">
        <div>
          <p className="concept-kicker">Inside a research thread</p>
          <h2>Follow the thinking.</h2>
          <p>Open each step to see how a product squad turns open questions into a grounded, citable brief.</p>
          <div className="glass-workflow-visual">
            <Photo theme={theme} asset={{ src: "/showcase/glass-1.webp", alt: "Luminous frosted spheres hovering over dark glass" }} className="glass-workflow-photo" sizes="(max-width: 720px) 92vw, 520px" />
          </div>
        </div>
        <div className="glass-card glass-accordion">
          <details open><summary>01 / Start with a question</summary><p>Give the project a clear question and drop in interviews, notes, and product docs you already have.</p></details>
          <details><summary>02 / Inspect the evidence</summary><p>Compare recurring themes across cohorts and jump straight to the timestamp or passage behind each insight.</p></details>
          <details><summary>03 / Share the decision</summary><p>Publish a luminous decision memo with confidence scores, supporting clips, and what still needs validation.</p></details>
          <details><summary>04 / Track follow-up impact</summary><p>Attach shipped release metrics to the original brief so future teams see what actually moved the needle.</p></details>
        </div>
      </section>

      <section id="proof" className="concept-section glass-proof" aria-labelledby="glass-proof-title">
        <div className="glass-proof-header">
          <div>
            <p className="concept-kicker">Verified research teams</p>
            <h2 id="glass-proof-title">Trusted where clarity compounds.</h2>
          </div>
          <div className="glass-kpi-row">
            <div className="glass-card glass-kpi" data-reveal><strong data-count>140</strong><span>Product squads</span></div>
            <div className="glass-card glass-kpi" data-reveal><strong><span data-count>99</span>%</strong><span>Source traceability</span></div>
            <div className="glass-card glass-kpi" data-reveal><strong><span data-count>18</span>m</strong><span>Avg brief turnaround</span></div>
          </div>
        </div>
        <div className="glass-testimonials">
          {testimonials.map((item) => (
            <article className="glass-card glass-quote-card" data-reveal key={item.author}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="glass-quote-photo" sizes="(max-width: 720px) 92vw, 240px" />
              <div>
                <p className="glass-quote-text">“{item.quote}”</p>
                <p className="glass-quote-author"><strong>{item.author}</strong> · {item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="sources" className="glass-source concept-section">
        <p className="concept-kicker"><ShieldCheck size={15} aria-hidden="true" /> Built for review</p>
        <h2>Keep the evidence in view.</h2>
        <p>Every claim carries a verifiable citation, and every draft keeps open questions visible until the team signs off.</p>
        <div className="glass-source-badges" aria-label="Security and audit features">
          <span><CheckCircle2 size={15} aria-hidden="true" /> Zero-hallucination citations</span>
          <span><CheckCircle2 size={15} aria-hidden="true" /> SOC-2 workspace isolation</span>
          <span><CheckCircle2 size={15} aria-hidden="true" /> Live Markdown &amp; Linear sync</span>
        </div>
      </section>

      <ConceptStories theme={theme} />
    </main>
  </>;
}

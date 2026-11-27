import "./bento.css";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Layers, LayoutGrid, ListChecks, MessageSquare, Plus, Sparkles, Waypoints } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, ConceptObject, Jump, Photo, type ThemeProps } from "../ThemeParts";

const cards = [
  [
    "board",
    LayoutGrid,
    "One shared board",
    "See who owns each task and what needs to happen before it moves.",
    "On a launch board, the designer can review the draft while the producer clears the remaining export tasks.",
    "/showcase/bento-1.webp",
    "Design team reviewing campaign tasks together by an office window"
  ],
  [
    "week",
    CalendarDays,
    "A realistic week",
    "Plan around deadlines and the work already in progress.",
    "Move a review to Thursday when Wednesday fills up. The team can see the new timing alongside its other work.",
    "/showcase/bento-2.webp",
    "Product teammates examining sprint capacity on a laptop"
  ],
  [
    "decisions",
    MessageSquare,
    "Decisions in context",
    "Keep approvals and their reasoning beside the task.",
    "When the team approves a headline, save the agreed wording and why it made the cut so the next editor has the full story.",
    "/showcase/bento-3.webp",
    "Focused collaboration with open briefs and workspace notes"
  ],
  [
    "handoff",
    Waypoints,
    "Smoother handoffs",
    "Give the next person the brief, the files, and a clear next step.",
    "Once a draft is approved, pass it to production with the final files and delivery notes attached.",
    "/showcase/bento-4.webp",
    "Cross-functional teammates finalizing handoff assets together"
  ]
] as const;

const templates = [
  {
    tag: "Product Launch",
    title: "Release readiness kit",
    copy: "Keep engineering QA, announcement copy, and customer docs moving inside one visible lane.",
    image: "/showcase/bento-5.webp",
    alt: "Clean shared agency studio table lined with laptops and notebooks"
  },
  {
    tag: "Editorial Sprint",
    title: "Weekly publishing queue",
    copy: "Draft, edit, artwork, and social crops sit in order so nothing waits unseen in an inbox.",
    image: "/showcase/bento-6.webp",
    alt: "Creative team meeting around coffee, notebooks, and laptops"
  },
  {
    tag: "Client Onboarding",
    title: "Shared kickoff board",
    copy: "Give clients a calm, branded milestone list with clear asset owners and dates.",
    image: "/showcase/bento-1.webp",
    alt: "Team lead walking through client onboarding steps in a studio"
  }
] as const;

function FeaturePreview({ feature }: { feature: (typeof cards)[number][0] }) {
  switch (feature) {
    case "board":
      return <span className="bento-card-board" aria-hidden="true">
        <span className="bento-preview-label">Editorial launch</span>
        <span className="bento-preview-task"><Check size={14} />Creative brief<strong>Done</strong></span>
        <span className="bento-preview-task"><span className="bento-task-dot" />Draft copy<strong>In review</strong></span>
        <span className="bento-preview-task"><span className="bento-task-dot bento-task-pending" />Final exports<strong>In progress</strong></span>
      </span>;
    case "week":
      return <span className="bento-card-week" aria-hidden="true">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => <span key={day}>
          {day}<strong>{index + 12}</strong>
        </span>)}
      </span>;
    case "decisions":
      return <span className="bento-card-decision" aria-hidden="true">
        <span className="bento-preview-check"><Check size={16} /></span>
        <span><strong>Headline approved</strong><small>Use the shorter version</small></span>
      </span>;
    case "handoff":
      return <span className="bento-card-handoff" aria-hidden="true">
        <span>Brief</span><ArrowRight size={15} /><span>Review</span><ArrowRight size={15} /><span>Production</span>
      </span>;
  }
}

export default function Bento({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<LayoutGrid size={23} />} links={[["Features", "features"], ["Ecosystem", "ecosystem"], ["Board preview", "board"], ["Workflows", "workflows"]]} />
    <main id="main-content">
      <section className="concept-wrap bento-hero" style={{ position: "relative" }}>
        <div className="hero-copy">
          <p className="concept-kicker"><Sparkles size={14} aria-hidden="true" /> A workspace for small teams</p>
          <h1>Make today <em>move.</em></h1>
          <p>Projects, decisions and handoffs live together in modular Bento tiles, so your team always knows what ships next.</p>
          <Jump to="board">Preview the workspace</Jump>
        </div>
        <div className="bento-collage" aria-label="Daymark workspace preview">
          <div className="bento-board-teaser">
            <ListChecks size={25} aria-hidden="true" />
            <strong>This week</strong>
            <span>Outline approved</span>
            <span>Draft ready for review</span>
          </div>
          <div className="bento-mini">
            <ArrowUpRight aria-hidden="true" size={17} />
            <strong data-count aria-hidden="true">4</strong>
            <span><span className="sr-only">4 </span>Tasks ready</span>
          </div>
          <Photo theme={theme} priority />
        </div>
        <ConceptObject theme={theme} className="bento-obj-tablet" />
      </section>

      <section id="features" className="concept-section bento-features">
        <p className="concept-kicker">The essentials</p>
        <h2>Everything has a place.</h2>
        <div className="bento-feature-grid">
          {cards.map(([feature, Icon, title, text, example, image, alt]) => (
            <details key={feature} className={`bento-feature bento-feature--${feature}`} data-reveal>
              <summary aria-labelledby={`bento-title-${feature}`} aria-describedby={`bento-description-${feature}`}>
                <span className="bento-feature-top">
                  <span className="bento-feature-icon"><Icon size={22} aria-hidden="true" /></span>
                  <span className="bento-feature-toggle"><Plus size={19} aria-hidden="true" /></span>
                </span>
                <span id={`bento-title-${feature}`} className="bento-feature-title">{title}</span>
                <span id={`bento-description-${feature}`} className="bento-feature-description">{text}</span>
                <span className="bento-media-wrap">
                  <Photo theme={theme} asset={{ src: image, alt }} className="bento-media-photo" sizes="(max-width: 720px) 90vw, 420px" />
                </span>
                <FeaturePreview feature={feature} />
              </summary>
              <p className="bento-feature-example">{example}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="ecosystem" className="concept-section bento-ecosystem" aria-labelledby="bento-ecosystem-title">
        <p className="concept-kicker"><Layers size={14} aria-hidden="true" /> Modular canvas</p>
        <h2 id="bento-ecosystem-title">A grid built around real momentum.</h2>
        <div className="bento-mosaic">
          <article className="bento-mosaic-tile bento-tile-wide" data-reveal>
            <Photo theme={theme} asset={{ src: "/showcase/bento-5.webp", alt: "Overhead view of shared modern workspace table" }} className="bento-tile-photo" sizes="(max-width: 720px) 92vw, 680px" />
            <div className="bento-tile-copy">
              <span className="bento-pill">Async standups</span>
              <h3>Morning status without a 40-minute call.</h3>
              <p>Every teammate drops two bullets and one blocker into the live Bento digest.</p>
            </div>
          </article>
          <article className="bento-mosaic-tile bento-tile-accent" data-reveal>
            <strong className="bento-big-stat"><span data-count>94</span>%</strong>
            <h3>On-time launch rate</h3>
            <p>Teams spot review bottlenecks three days earlier on average.</p>
          </article>
          <article className="bento-mosaic-tile bento-tile-photo-card" data-reveal>
            <Photo theme={theme} asset={{ src: "/showcase/bento-6.webp", alt: "Small product team collaborating around wooden table" }} className="bento-tile-photo" sizes="(max-width: 720px) 92vw, 420px" />
            <div className="bento-tile-copy">
              <span className="bento-pill">Design critique</span>
              <h3>Pin feedback beside frames.</h3>
            </div>
          </article>
          <article className="bento-mosaic-tile bento-tile-dark" data-reveal>
            <Photo theme={theme} asset={{ src: "/showcase/bento-2.webp", alt: "Teammates inspecting product milestones on laptop" }} className="bento-tile-photo" sizes="(max-width: 720px) 92vw, 520px" />
            <div className="bento-tile-copy">
              <span className="bento-pill">Zero clutter</span>
              <h3>Built for 6-person pods up to 60-person orgs.</h3>
            </div>
          </article>
        </div>
      </section>

      <section id="board" className="concept-section bento-board">
        <div>
          <p className="concept-kicker">Sample project</p>
          <h2>See what moves next.</h2>
          <p>An editorial team preparing a launch. Four of six tasks are complete, with a draft in review and final files still in progress.</p>
        </div>
        <div className="bento-progress">
          <p>Editorial launch <strong>4 / 6 complete</strong></p>
          <div aria-hidden="true"><i data-meter /></div>
          <ul>
            <li>Draft copy · In review</li>
            <li>Final exports · In progress</li>
            <li>Creative brief · Complete</li>
          </ul>
        </div>
      </section>

      <section id="templates" className="concept-section bento-templates" aria-labelledby="bento-templates-title">
        <p className="concept-kicker">Ready-to-use kits</p>
        <h2 id="bento-templates-title">Start from a proven Bento board.</h2>
        <div className="bento-templates-grid">
          {templates.map((item) => (
            <article className="bento-template-card" data-reveal key={item.title}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="bento-template-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="bento-template-body">
                <span className="bento-pill">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="workflows" className="concept-section bento-workflows">
        <h2>Built for the handoff.</h2>
        <div>
          <article data-reveal>
            <Photo theme={theme} asset={{ src: "/showcase/bento-3.webp", alt: "Planner organizing task priority on laptop screen" }} className="bento-workflow-photo" sizes="(max-width: 720px) 92vw, 560px" />
            <h3>For the people planning</h3>
            <p>Assign owners, catch blockers early, and keep the weekly plan realistic.</p>
          </article>
          <article data-reveal>
            <Photo theme={theme} asset={{ src: "/showcase/bento-4.webp", alt: "Designers executing final production handoff" }} className="bento-workflow-photo" sizes="(max-width: 720px) 92vw, 560px" />
            <h3>For the people doing</h3>
            <p>Find the latest brief, the decision that changed it and the next person to involve.</p>
          </article>
        </div>
      </section>

      <ConceptStories theme={theme} />
    </main>
  </>;
}

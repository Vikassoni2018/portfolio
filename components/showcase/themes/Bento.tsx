import "./bento.css";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, LayoutGrid, ListChecks, MessageSquare, Plus, Waypoints } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const cards = [
  ["board", LayoutGrid, "One shared board", "See who owns each task and what needs to happen before it moves.", "On a launch board, the designer can review the draft while the producer clears the remaining export tasks."],
  ["week", CalendarDays, "A realistic week", "Plan around deadlines and the work already in progress.", "Move a review to Thursday when Wednesday fills up. The team can see the new timing alongside its other work."],
  ["decisions", MessageSquare, "Decisions in context", "Keep approvals and their reasoning beside the task.", "When the team approves a headline, save the agreed wording and why it made the cut so the next editor has the full story."],
  ["handoff", Waypoints, "Smoother handoffs", "Give the next person the brief, the files, and a clear next step.", "Once a draft is approved, pass it to production with the final files and delivery notes attached."]
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
    <BrandNav theme={theme} mark={<LayoutGrid size={23} />} links={[["Features", "features"], ["Board preview", "board"], ["Workflows", "workflows"]]} />
    <main id="main-content">
    <section className="concept-wrap bento-hero">
      <div className="hero-copy"><p className="concept-kicker">A workspace for small teams</p><h1>Make today <em>move.</em></h1><p>Projects, decisions and handoffs live together in Daymark, so your team always knows what to do next.</p><Jump to="board">Preview the workspace</Jump></div>
      <div className="bento-collage" aria-label="Daymark workspace preview">
        <div className="bento-board-teaser"><ListChecks size={25} aria-hidden="true" /><strong>This week</strong><span>Outline approved</span><span>Draft ready for review</span></div>
        <div className="bento-mini"><ArrowUpRight aria-hidden="true" size={17} /><strong data-count aria-hidden="true">4</strong><span><span className="sr-only">4 </span>Tasks ready</span></div>
        <Photo theme={theme} priority />
      </div>
    </section>
    <section id="features" className="concept-section bento-features">
      <p className="concept-kicker">The essentials</p>
      <h2>Everything has a place.</h2>
      <div className="bento-feature-grid">
        {cards.map(([feature, Icon, title, text, example]) => (
          <details key={feature} className={`bento-feature bento-feature--${feature}`} data-reveal>
            <summary aria-labelledby={`bento-title-${feature}`} aria-describedby={`bento-description-${feature}`}>
              <span className="bento-feature-top">
                <span className="bento-feature-icon"><Icon size={22} aria-hidden="true" /></span>
                <span className="bento-feature-toggle"><Plus size={19} aria-hidden="true" /></span>
              </span>
              <span id={`bento-title-${feature}`} className="bento-feature-title">{title}</span>
              <span id={`bento-description-${feature}`} className="bento-feature-description">{text}</span>
              <FeaturePreview feature={feature} />
            </summary>
            <p className="bento-feature-example">{example}</p>
          </details>
        ))}
      </div>
    </section>
    <section id="board" className="concept-section bento-board"><div><p className="concept-kicker">Sample project</p><h2>See what moves next.</h2><p>An editorial team preparing a launch. Four of six tasks are complete, with a draft in review and final files still in progress.</p></div>
      <div className="bento-progress"><p>Editorial launch <strong>4 / 6 complete</strong></p><div aria-hidden="true"><i data-meter /></div><ul><li>Draft copy · In review</li><li>Final exports · In progress</li><li>Creative brief · Complete</li></ul></div>
    </section>
    <section id="workflows" className="concept-section bento-workflows"><h2>Built for the handoff.</h2><div><article data-reveal><h3>For the people planning</h3><p>Assign owners, catch blockers early, and keep the weekly plan realistic.</p></article><article data-reveal><h3>For the people doing</h3><p>Find the latest brief, the decision that changed it and the next person to involve.</p></article></div></section>
    <ConceptStories theme={theme} />
    </main>
  </>;
}


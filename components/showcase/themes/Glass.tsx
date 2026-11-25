import "./glass.css";
import { Aperture, AudioLines, Layers3, ScanLine, Sparkles } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const features = [
  [Layers3, "Gather the context", "Bring notes, documents and interview transcripts into one research space."],
  [ScanLine, "Trace the answer", "Follow each finding back to its source so your team can verify the evidence."],
  [AudioLines, "Brief the team", "Turn a research thread into a clear summary with decisions and open questions."]
] as const;

export default function Glass({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Aperture size={24} />} links={[["Platform", "platform"], ["Workflow", "workflow"], ["Sources", "sources"]]} />
    <main id="main-content">
    <section className="glass-hero concept-wrap">
      <div className="glass-halo" aria-hidden="true" />
      <div className="hero-copy">
        <p className="concept-kicker"><Sparkles size={14} /> Research intelligence</p>
        <h1>Make sense of <em>the noise.</em></h1>
        <p>Prism brings every source into focus so your team can see what matters and decide what comes next.</p>
        <Jump to="platform">Explore the platform</Jump>
      </div>
      <div className="glass-stage" data-depth>
        <Photo theme={theme} priority />
        <div className="glass-orbit" aria-hidden="true" />
        <div className="glass-card glass-main" data-float>
          <p><Aperture size={19} /> Research brief</p>
          <strong>Where does onboarding break down?</strong>
          <div><span /> Finding patterns across interviews</div>
          <div><span /> Linking findings to source notes</div>
          <div><span /> Preparing a brief for product</div>
        </div>
        <div className="glass-card glass-chip" data-float><Sparkles size={18} /> Sources connected</div>
      </div>
    </section>
    <section id="platform" className="concept-section glass-intro">
      <p className="concept-kicker">The platform</p>
      <h2>From a hundred tabs to one clear answer.</h2>
      <p>A shared research layer for product teams who need to move quickly and stay close to the evidence.</p>
    </section>
    <section className="concept-wrap glass-features" aria-label="Research tools">
      {features.map(([Icon, title, text]) => <article className="glass-card" data-reveal key={title}>
        <Icon size={26} aria-hidden="true" /><h3>{title}</h3><p>{text}</p>
      </article>)}
    </section>
    <section id="workflow" className="concept-section glass-workflow">
      <div><p className="concept-kicker">Inside a research thread</p><h2>Follow the thinking.</h2><p>Open the steps to see how a team turns an open question into a grounded brief.</p></div>
      <div>
        <details open><summary>01 / Start with a question</summary><p>Give the project a clear question and attach the material you already have.</p></details>
        <details><summary>02 / Inspect the evidence</summary><p>Compare recurring themes and jump directly to the passage behind each one.</p></details>
        <details><summary>03 / Share the decision</summary><p>Send a brief with the conclusion, supporting sources and what still needs testing.</p></details>
      </div>
    </section>
    <section id="sources" className="glass-source concept-section"><p className="concept-kicker">Built for review</p><h2>Keep the evidence in view.</h2><p>Every claim can carry a citation and every draft can carry a question your team can answer later.</p></section>
    <ConceptStories theme={theme} />
    </main>
  </>;
}


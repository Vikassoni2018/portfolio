import "./concept-stories.css";
import type { Theme } from "@/data/showcase";
import { stories } from "@/data/showcase-stories";
import { Photo } from "./ThemeParts";

export function ConceptStories({ theme }: { theme: Theme }) {
  const story = stories[theme.slug];

  return <>
    <section id="field-notes" aria-labelledby="field-notes-title"
      className={`concept-section concept-story concept-story--${story.layout}`}>
      <div className="concept-story-copy">
        <p className="concept-kicker">{story.eyebrow}</p>
        <h2 id="field-notes-title">{story.title}</h2>
        <p>{story.description}</p>
      </div>
      <Photo theme={theme} asset={{ src: `/showcase/${theme.visual}-story.webp`, alt: story.alt }}
        className="concept-story-photo" sizes={story.layout === "wide" ? "(max-width: 800px) 90vw, 1250px" : "(max-width: 800px) 90vw, 650px"} />
    </section>
    <section id="quick-guide" aria-labelledby="quick-guide-title" className="concept-section concept-guide">
      <h2 id="quick-guide-title">{story.guideTitle}</h2>
      <div className="concept-guide-grid">
        {story.notes.map(([title, description]) => (
          <article key={title} data-reveal>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  </>;
}


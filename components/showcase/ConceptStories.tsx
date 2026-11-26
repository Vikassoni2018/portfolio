import "./concept-stories.css";
import { themeStoryPhotoPath, type Theme } from "@/data/showcase";
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
      <Photo theme={theme} asset={{ src: themeStoryPhotoPath(theme), alt: story.alt }}
        className="concept-story-photo" sizes={story.layout === "wide" ? "(max-width: 800px) 90vw, 1250px" : "(max-width: 800px) 90vw, 650px"} />
    </section>
    <section id="quick-guide" aria-labelledby="quick-guide-title" className="concept-section concept-guide">
      <div className="concept-guide-head">
        <p className="concept-kicker">{story.guideEyebrow}</p>
        <h2 id="quick-guide-title">{story.guideTitle}</h2>
      </div>
      <div className="concept-guide-grid">
        {story.notes.map((note) => (
          <article key={note.title} data-reveal className="concept-guide-card">
            <Photo theme={theme} asset={{ src: note.image, alt: note.alt }} className="concept-guide-photo"
              sizes="(max-width: 690px) 92vw, 420px" />
            <div className="concept-guide-body">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>;
}


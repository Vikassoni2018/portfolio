import "./neumorphism.css";
import { AudioLines, CircleDot, Lightbulb, Moon, Sun, Wind } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const modes = [
  ["Focus", "A steady, unobtrusive tone for a clear working space.", Sun],
  ["Unwind", "A low, warm ambience for winding down at the end of the day.", Wind],
  ["Sleep", "A dim indicator and a softer sound profile for bedtime.", Moon]
] as const;

export default function Neumorphism({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<CircleDot size={23} />} links={[["The device", "device"], ["Try the modes", "modes"], ["Details", "details"]]} />
    <main id="main-content">
    <section className="concept-wrap neu-hero">
      <div className="hero-copy"><p className="concept-kicker">Forma One / Ambient speaker</p><h1>Make room <em>for quiet.</em></h1><p>A small, considered speaker that changes the mood of a room with a single turn.</p><Jump to="modes">Try the controls</Jump></div>
      <div className="neu-display"><div className="neu-device"><div className="neu-grille" aria-hidden="true" /><AudioLines size={26} aria-hidden="true" /><span className="neu-led" aria-hidden="true" /></div></div>
    </section>
    <section id="device" className="concept-section neu-intro"><Photo theme={theme} /><div><p className="concept-kicker">Designed to sit quietly</p><h2>A softer presence.</h2><p>A pebble-like profile, a tactile rim, and a light that gives just enough feedback to find the control in the dark.</p></div></section>
    <section id="modes" className="concept-section neu-modes">
      <div><p className="concept-kicker">Interactive mode preview</p><h2>Turn the mood.</h2><p>Choose a setting to preview the indicator and read about its sound profile.</p></div>
      <fieldset className="neu-control">
        <legend>Ambient mode</legend>
        <div className="neu-options">
          {modes.map(([title, , Icon], index) => <div key={title} className="neu-option">
            <input defaultChecked={index === 0} type="radio" name="ambient-mode" id={`ambient-${index}`}
              aria-describedby={`ambient-description-${index}`} />
            <label htmlFor={`ambient-${index}`}><Icon size={18} aria-hidden="true" />{title}</label>
          </div>)}
        </div>
        <div className="neu-dial" aria-hidden="true"><i /></div>
        <div className="neu-readout">
          {modes.map(([title, description], index) => <p key={title} id={`ambient-description-${index}`}>{description}</p>)}
        </div>
      </fieldset>
    </section>
    <section id="details" className="concept-section neu-details"><h2>Designed around touch.</h2>
      <div>{[[CircleDot, "Tactile dial", "Find your setting with a physical control you can feel."],[Lightbulb, "Soft status light", "See which mode is active at a glance."],[AudioLines, "Room-friendly sound", "An understated sound profile for desks and bedside tables."]].map(([Icon, title, text]) => {
        const FeatureIcon = Icon as typeof CircleDot;
        return <article data-reveal key={String(title)}><FeatureIcon size={23} aria-hidden="true" /><h3>{String(title)}</h3><p>{String(text)}</p></article>;
      })}</div>
    </section>
    <section className="concept-section neu-benefit"><h2>It fits wherever you slow down.</h2><p>Start the morning at your desk, move into the living room after work, and let the same simple controls carry into the evening.</p></section>
    <ConceptStories theme={theme} />
    </main>
  </>;
}


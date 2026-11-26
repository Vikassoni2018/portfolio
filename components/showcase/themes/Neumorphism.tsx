import "./neumorphism.css";
import { AudioLines, CircleDot, Lightbulb, Moon, Sliders, Sun, Volume2, Wind } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const modes = [
  ["Focus", "A steady, unobtrusive tone with a balanced midrange for clear concentration.", Sun],
  ["Unwind", "A low, warm acoustic curve designed for slow afternoons and quiet evenings.", Wind],
  ["Sleep", "A dimmed soft-glow indicator and rolled-off frequencies for bedtime calm.", Moon]
] as const;

const rooms = [
  {
    zone: "Studio Desk",
    title: "Near-field clarity without harsh highs.",
    copy: "Tuned for low-volume listening beside a monitor so podcasts and ambient mixes feel natural all morning.",
    image: "/showcase/neu-2.webp",
    alt: "Clean white Scandinavian workspace desk with minimalist display"
  },
  {
    zone: "Living Space",
    title: "Omnidirectional warmth across soft surfaces.",
    copy: "Downward passive radiator couples softly with timber and stone tables to fill open seating areas.",
    image: "/showcase/neu-3.webp",
    alt: "Minimalist cream living room with curved sofa and round coffee table"
  },
  {
    zone: "Bedside Calm",
    title: "Gentle controls designed for low light.",
    copy: "Auto-dimming LED and physical notched wheel mean zero blinding phone screens before sleep.",
    image: "/showcase/neu-4.webp",
    alt: "Soft grey Nordic bedroom with warm suspended bedside lamps"
  }
] as const;

const specs = [
  { metric: "28", unit: "Hz–22k", label: "Wide-band excursion", image: "/showcase/neu-1.webp", alt: "Matte grey acoustic speaker resting on pale wood" },
  { metric: "18", unit: "hours", label: "Cordless ambient playback", image: "/showcase/neu-5.webp", alt: "Minimalist neutral console and modern stool" },
  { metric: "24", unit: "dBA", label: "Whisper-quiet idle floor", image: "/showcase/neu-6.webp", alt: "Calm minimalist seating area bathed in natural daylight" }
] as const;

const details = [
  [CircleDot, "Tactile aluminum dial", "Find your setting with a weighted rotary wheel machined from a single block.", "/showcase/neu-1.webp", "Close-up of matte dark grey smart speaker housing"],
  [Lightbulb, "Diffused status halo", "See which ambient curve is active through a soft recessed light channel.", "/showcase/neu-2.webp", "Minimalist desk environment with calm soft lighting"],
  [AudioLines, "Room-friendly acoustics", "Tuned specifically for calm spaces rather than club-volume distortion.", "/showcase/neu-3.webp", "Softly lit contemporary living space interior"]
] as const;

export default function Neumorphism({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<CircleDot size={23} />} links={[["The device", "device"], ["Try the modes", "modes"], ["Rooms", "rooms"], ["Details", "details"]]} />
    <main id="main-content">
      <section className="concept-wrap neu-hero">
        <div className="hero-copy">
          <p className="concept-kicker">Forma One / Ambient speaker</p>
          <h1>Make room <em>for quiet.</em></h1>
          <p>A tactile, softly sculpted speaker that shifts the atmosphere of a room with a single gentle turn.</p>
          <Jump to="modes">Try the controls</Jump>
        </div>
        <div className="neu-display">
          <div className="neu-device">
            <div className="neu-grille" aria-hidden="true" />
            <AudioLines size={26} aria-hidden="true" />
            <span className="neu-led" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="device" className="concept-section neu-intro">
        <Photo theme={theme} />
        <div>
          <p className="concept-kicker">Designed to sit quietly</p>
          <h2>A softer presence.</h2>
          <p>A pebble-smooth silhouette, acoustic micro-perforations, and a soft teal indicator that lets you adjust sound effortlessly even in the dark.</p>
        </div>
      </section>

      <section id="modes" className="concept-section neu-modes">
        <div>
          <p className="concept-kicker">Interactive mode preview</p>
          <h2>Turn the mood.</h2>
          <p>Select a preset to rotate the tactile dial and preview how Forma shapes each room curve.</p>
          <div className="neu-eq-card" aria-hidden="true">
            <div className="neu-eq-head"><Sliders size={16} /><span>Acoustic balance</span><Volume2 size={16} /></div>
            <div className="neu-eq">
              <span style={{ height: "42%" }} /><span style={{ height: "74%" }} /><span style={{ height: "58%" }} />
              <span style={{ height: "86%" }} /><span style={{ height: "64%" }} /><span style={{ height: "48%" }} />
              <span style={{ height: "78%" }} /><span style={{ height: "52%" }} />
            </div>
          </div>
        </div>
        <fieldset className="neu-control">
          <legend>Ambient mode</legend>
          <div className="neu-options">
            {modes.map(([title, , Icon], index) => (
              <div key={title} className="neu-option">
                <input defaultChecked={index === 0} type="radio" name="ambient-mode" id={`ambient-${index}`}
                  aria-describedby={`ambient-description-${index}`} />
                <label htmlFor={`ambient-${index}`}><Icon size={18} aria-hidden="true" />{title}</label>
              </div>
            ))}
          </div>
          <div className="neu-dial" aria-hidden="true"><i /></div>
          <div className="neu-readout">
            {modes.map(([title, description], index) => <p key={title} id={`ambient-description-${index}`}>{description}</p>)}
          </div>
        </fieldset>
      </section>

      <section id="rooms" className="concept-section neu-rooms" aria-labelledby="neu-rooms-title">
        <p className="concept-kicker">Every quiet corner</p>
        <h2 id="neu-rooms-title">Calibrated for real interiors.</h2>
        <div className="neu-rooms-grid">
          {rooms.map((room) => (
            <article className="neu-card" data-reveal key={room.zone}>
              <Photo theme={theme} asset={{ src: room.image, alt: room.alt }} className="neu-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="neu-card-body">
                <span className="neu-tag">{room.zone}</span>
                <h3>{room.title}</h3>
                <p>{room.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="specs" className="concept-section neu-specs" aria-labelledby="neu-specs-title">
        <p className="concept-kicker">Hardware telemetry</p>
        <h2 id="neu-specs-title">Precision recessed inside calm form.</h2>
        <div className="neu-specs-grid">
          {specs.map((item) => (
            <article className="neu-spec-card" data-reveal key={item.label}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="neu-spec-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="neu-spec-body">
                <p className="neu-spec-value"><strong data-count>{item.metric}</strong> <span>{item.unit}</span></p>
                <h3>{item.label}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="details" className="concept-section neu-details">
        <h2>Designed around touch.</h2>
        <div>
          {details.map(([Icon, title, text, src, alt]) => {
            const FeatureIcon = Icon as typeof CircleDot;
            return (
              <article className="neu-card" data-reveal key={String(title)}>
                <Photo theme={theme} asset={{ src: String(src), alt: String(alt) }} className="neu-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
                <div className="neu-card-body">
                  <FeatureIcon size={22} aria-hidden="true" />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="concept-section neu-benefit">
        <h2>It fits wherever you slow down.</h2>
        <p>Start the morning at your desk, carry it into the living room after work, and let one familiar dial ease the evening into rest.</p>
      </section>

      <ConceptStories theme={theme} />
    </main>
  </>;
}

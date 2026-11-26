import "./immersive.css";
import { AirVent, AudioLines, Bluetooth, Cpu, Disc, Headphones, Waves } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";
import { ProductStage } from "./ProductStage";

const anatomy = [
  {
    code: "01 / DRIVER",
    title: "40mm Beryllium dome",
    copy: "Ultra-stiff diaphragm motion holds sub-bass tight and vocals tactile without listener fatigue.",
    image: "/showcase/immersive-1.webp",
    alt: "Matte studio reference headphones next to a dark condenser microphone"
  },
  {
    code: "02 / CHAMBER",
    title: "Dual-vent acoustic seal",
    copy: "Laser-perforated ear cups balance internal air pressure for effortless open-stage depth.",
    image: "/showcase/immersive-3.webp",
    alt: "Studio acoustic microphone suspension mount in low amber light"
  },
  {
    code: "03 / CONTROL",
    title: "Machined analog wheel",
    copy: "Knurled aluminum dial gives silky, tactile gain adjustments without fumbling touch pads.",
    image: "/showcase/immersive-4.webp",
    alt: "Macro detail of analog mixing console faders in studio lighting"
  }
] as const;

const metrics = [
  { value: "48", unit: "HRS", label: "Active ANC endurance" },
  { value: "44", unit: "DB", label: "Adaptive noise floor reduction" },
  { value: "290", unit: "G", label: "Balanced magnesium chassis" },
  { value: "24", unit: "BIT", label: "Lossless USB-C audio path" }
] as const;

const details = [
  [AirVent, "Ventilated cushions", "Cool woven acoustic fabric wraps memory foam where the headphones meet skin.", "/showcase/immersive-2.webp", "Dark over-ear studio headphones resting on a music stand"],
  [Bluetooth, "Wireless mastering", "Multi-point low-latency pairing engineered for studio desks and travel alike.", "/showcase/immersive-5.webp", "Studio sound mixer console glowing softly beside desk controls"],
  [AudioLines, "Physical controls", "A dedicated knurled volume wheel paired with a discrete tactile playback switch.", "/showcase/immersive-7.webp", "Close-up of condenser microphone capturing crisp room clarity"]
] as const;

export default function Immersive({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Headphones size={25} />} links={[["The build", "build"], ["Finishes", "finishes"], ["Engineering", "engineering"], ["Details", "details"]]} />
    <main id="main-content">
      <section className="concept-wrap immersive-hero">
        <div className="hero-copy">
          <p className="concept-kicker">Hush 01 / Over-ear audio</p>
          <h1>Closer to <em>the sound.</em></h1>
          <p>Precision sculptural hardware with brushed metal yokes, breathable cushions, and wide spatial room for every track.</p>
          <Jump to="finishes">Explore the finishes</Jump>
        </div>
        <Photo theme={theme} priority />
      </section>

      <section id="build" className="concept-section immersive-build">
        <div>
          <p className="concept-kicker">The build</p>
          <h2>Light on the head.<br />Full in the ear.</h2>
          <p>A wide suspension strap distributes weight evenly, while angled anodized cups leave generous acoustic air around the ear.</p>
        </div>
        <Photo theme={theme} asset={{ src: "/showcase/immersive-6.webp", alt: "Close-up profile of black studio headphones and braided cable" }} className="immersive-build-photo" sizes="(max-width: 720px) 92vw, 560px" />
      </section>

      <section id="finishes" className="concept-section immersive-finishes">
        <div>
          <p className="concept-kicker">Interactive 3D product study</p>
          <h2>Choose a finish.</h2>
          <p>Rotate the real-time studio model and compare brushed metal finishes in Graphite, Sand, and Ember.</p>
          <div className="immersive-wave" aria-hidden="true">
            <span style={{ height: "35%" }} /><span style={{ height: "80%" }} /><span style={{ height: "55%" }} />
            <span style={{ height: "92%" }} /><span style={{ height: "64%" }} /><span style={{ height: "42%" }} />
            <span style={{ height: "75%" }} /><span style={{ height: "48%" }} />
          </div>
        </div>
        <ProductStage />
      </section>

      <section id="engineering" className="concept-section immersive-engineering" aria-labelledby="immersive-eng-title">
        <span className="immersive-rule" data-rule aria-hidden="true" />
        <p className="concept-kicker"><Cpu size={14} aria-hidden="true" /> Acoustic architecture</p>
        <h2 id="immersive-eng-title">Inside the soundstage.</h2>
        <div className="immersive-anatomy">
          {anatomy.map((item) => (
            <article className="immersive-card" data-reveal key={item.code}>
              <Photo theme={theme} asset={{ src: item.image, alt: item.alt }} className="immersive-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
              <div className="immersive-card-body">
                <span className="immersive-code">{item.code}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="telemetry" className="concept-section immersive-metrics" aria-labelledby="immersive-metrics-title">
        <div className="immersive-metrics-head">
          <div>
            <p className="concept-kicker"><Waves size={14} aria-hidden="true" /> Reference specs</p>
            <h2 id="immersive-metrics-title">Measured in silence.</h2>
          </div>
          <div className="immersive-metrics-grid">
            {metrics.map((item) => (
              <div className="immersive-metric-tile" data-reveal key={item.label}>
                <strong><span data-count>{item.value}</span> <small>{item.unit}</small></strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="details" className="concept-section immersive-specs">
        <h2>Considered in the details.</h2>
        <div>
          {details.map(([Icon, title, text, src, alt]) => {
            const FeatureIcon = Icon as typeof AirVent;
            return (
              <article className="immersive-card" key={String(title)} data-reveal>
                <Photo theme={theme} asset={{ src: String(src), alt: String(alt) }} className="immersive-card-photo" sizes="(max-width: 720px) 92vw, 400px" />
                <div className="immersive-card-body">
                  <FeatureIcon size={24} aria-hidden="true" />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="concept-section immersive-close">
        <p className="concept-kicker"><Disc size={14} aria-hidden="true" /> Pure listening</p>
        <h2>Give the album your full attention.</h2>
        <p>From early commutes to late-night listening sessions, every contour keeps the hardware intuitive and the music front and center.</p>
      </section>

      <ConceptStories theme={theme} />
    </main>
  </>;
}

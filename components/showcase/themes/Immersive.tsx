import "./immersive.css";
import { AirVent, AudioLines, Bluetooth, Headphones } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";
import { ProductStage } from "./ProductStage";

export default function Immersive({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Headphones size={25} />} links={[["The build", "build"], ["Finishes", "finishes"], ["Details", "details"]]} />
    <main id="main-content">
    <section className="concept-wrap immersive-hero">
      <div className="hero-copy"><p className="concept-kicker">Hush 01 / Over-ear audio</p><h1>Closer to <em>the sound.</em></h1><p>A headphone concept with sculpted cups, brushed metal and room for the music to breathe.</p><Jump to="finishes">Explore the finishes</Jump></div>
      <Photo theme={theme} priority />
    </section>
    <section id="build" className="concept-section immersive-build"><p className="concept-kicker">The build</p><div><h2>Light on the head.<br />Full in the ear.</h2><p>A wide suspension band spreads the load, while the angled cups give the pads more room around the ear.</p></div></section>
    <section id="finishes" className="concept-section immersive-finishes"><div><p className="concept-kicker">Interactive product study</p><h2>Choose a finish.</h2><p>Explore the profile in graphite, sand and ember.</p></div>
      <ProductStage />
    </section>
    <section id="details" className="concept-section immersive-specs"><h2>Considered in the details.</h2>
      <div>{[[AirVent, "Ventilated cushions", "Soft fabric where the headphones meet skin."], [Bluetooth, "Wireless listening", "Designed for an uncluttered desk and easy pairing."], [AudioLines, "Physical controls", "A dedicated dial for volume and a separate playback button."]].map(([Icon, title, text]) => {
        const FeatureIcon = Icon as typeof AirVent;
        return <article key={String(title)} data-reveal><FeatureIcon size={24} aria-hidden="true" /><h3>{String(title)}</h3><p>{String(text)}</p></article>;
      })}</div>
    </section>
    <section className="concept-section immersive-close"><h2>Give the album your full attention.</h2><p>From early commutes to late-night listening, the design puts the controls within reach and the music up front.</p></section>
    <ConceptStories theme={theme} />
    </main>
  </>;
}


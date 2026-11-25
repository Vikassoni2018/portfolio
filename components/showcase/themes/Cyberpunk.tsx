import "./cyberpunk.css";
import { Crosshair, Gamepad2, RadioTower, Zap } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const levels = [
  ["Alley Run", "01", "A solo time trial through side streets and rooftop shortcuts."],
  ["Circuit Clash", "02", "A two-player arena where short routes trade speed for exposure."],
  ["Signal Drift", "03", "An endless run that reshuffles the city every time you re-enter."]
];

export default function Cyberpunk({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Crosshair size={24} />} links={[["The city", "city"], ["Modes", "modes"], ["Controls", "controls"]]} />
    <main id="main-content">
    <section className="concept-wrap cyber-hero">
      <Photo theme={theme} priority />
      <div className="hero-copy"><p className="concept-kicker">Arcade concept / Neo District</p><h1>Own the <em>afterlight.</em></h1><p>Race the midnight city, chain clean turns and find a faster line through every block.</p><Jump to="modes">Select your mode</Jump></div>
      <div className="cyber-scan" aria-hidden="true" />
      <span className="cyber-coordinate" aria-hidden="true">DISTRICT 07 / 00:<span data-count>14</span></span>
    </section>
    <section id="city" className="concept-section cyber-city"><RadioTower aria-hidden="true" size={35} /><div><p className="concept-kicker">District briefing</p><h2>The city redraws after dark.</h2><p>Pick a route through narrow corridors, elevated lanes and the strips of light that mark safe turns.</p></div></section>
    <section id="modes" className="concept-section cyber-modes"><h2>Choose a signal.</h2>
      <fieldset><legend>Preview a game mode</legend>
        {levels.map(([title, level, text], index) => <div key={title} className="cyber-mode" data-reveal>
          <input type="radio" name="level" id={`level-${level}`} defaultChecked={index === 0} />
          <label htmlFor={`level-${level}`}><span>{level}</span>{title}</label>
          <div><h3>{title}</h3><p>{text}</p><div className="cyber-meter" aria-hidden="true"><span data-meter /></div></div>
        </div>)}
      </fieldset>
    </section>
    <section id="controls" className="concept-section cyber-controls"><h2>Every corner is a choice.</h2><div><article data-reveal><Gamepad2 aria-hidden="true" /><h3>Commit to the turn</h3><p>Brake just before the corner to keep your line and build momentum.</p></article><article data-reveal><Zap aria-hidden="true" /><h3>Save the boost</h3><p>Use the straight sections to make the most of a full charge.</p></article></div></section>
    <section className="concept-section cyber-last"><p className="concept-kicker">Route replay</p><h2>Learn the line. Run it again.</h2><p>A clean route matters as much as outright speed. Each new run gives you a chance to find a better turn.</p></section>
    <ConceptStories theme={theme} />
    </main>
  </>;
}


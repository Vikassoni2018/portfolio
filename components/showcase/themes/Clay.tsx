import "./clay.css";
import { CalendarDays, Check, Shapes, StickyNote, Sun } from "lucide-react";
import { ConceptStories } from "../ConceptStories";
import { BrandNav, Jump, Photo, type ThemeProps } from "../ThemeParts";

const days = [
  ["Mon", "Make a moodboard", "Gather three images that set the tone for your next project."],
  ["Wed", "Protect a focus block", "Set aside time to make a rough draft before asking for feedback."],
  ["Fri", "Put the week to bed", "Move anything unfinished into next week and save one thing you learned."]
];

export default function Clay({ theme }: ThemeProps) {
  return <>
    <BrandNav theme={theme} mark={<Shapes size={25} />} links={[["How it works", "routine"], ["Try a week", "week"], ["Low-pressure planning", "pace"]]} />
    <main id="main-content">
    <section className="clay-hero concept-wrap">
      <div className="hero-copy"><p className="concept-kicker">The feel-good weekly planner</p><h1>A little more <em>headspace.</em></h1>
        <p>Meet Pebble, the playful planner that turns a messy list of ideas into a week you can actually enjoy.</p>
        <Jump to="week">Try a sample week</Jump>
      </div>
      <div className="clay-stage" aria-label="A playful weekly planner with colorful clay-like shapes" role="img">
        <div data-float className="clay-ball clay-peach" aria-hidden="true"><Sun /></div>
        <div data-float className="clay-ball clay-mint" aria-hidden="true"><Check /></div>
        <div className="clay-notebook" aria-hidden="true"><CalendarDays size={56} /><strong>My week</strong><i /><i /><i /></div>
        <div data-float className="clay-ball clay-lilac" aria-hidden="true"><StickyNote /></div>
      </div>
    </section>
    <section id="routine" className="concept-section clay-routine">
      <div><p className="concept-kicker">A routine that fits</p><h2>Get it out of your head.</h2><p>Catch stray ideas, pick three priorities, and leave room for the bits of life that never fit on a list.</p></div>
      <Photo theme={theme} />
    </section>
    <section className="concept-wrap clay-steps" aria-label="Pebble features">
      {["Catch an idea", "Give it a day", "Call it done"].map((item, index) => <article data-reveal key={item}><span aria-hidden="true">{["✦", "●", "✓"][index]}</span><h3>{item}</h3><p>{["Drop a thought on a sticky note without sorting it first.", "Build a week from small, moveable plans.", "Close a task gently, or move it to a better day."][index]}</p></article>)}
    </section>
    <section id="week" className="concept-section clay-week">
      <div><p className="concept-kicker">The sample planner</p><h2>See how a week feels.</h2></div>
      <div>{days.map(([day, title, description]) => <details key={day}><summary>{day} <strong>{title}</strong></summary><p>{description}</p></details>)}</div>
    </section>
    <section id="pace" className="concept-section clay-pace"><h2>Leave some space for yourself.</h2><p>Empty days belong in the plan, too. Pebble gives you a place to put good ideas without turning each one into a deadline.</p></section>
    <ConceptStories theme={theme} />
    </main>
  </>;
}


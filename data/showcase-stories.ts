import type { ThemeSlug } from "./showcase";

type Story = {
  eyebrow: string;
  title: string;
  description: string;
  alt: string;
  layout: "photo-first" | "copy-first" | "wide";
  guideTitle: string;
  notes: readonly (readonly [string, string])[];
};

export const stories: Record<ThemeSlug, Story> = {
  glassmorphism: {
    eyebrow: "Research operations",
    title: "Give recurring research a home.",
    description: "Keep discovery notes in a shared project so the next round of interviews starts with the questions you already explored and the gaps you still need to fill.",
    alt: "Developer working at a laptop with code on the screen",
    layout: "photo-first",
    guideTitle: "Put Prism to work on your next brief.",
    notes: [
      ["Discovery sprint", "Group observations by question. Keep the original notes within reach so reviewers can follow how a finding took shape."],
      ["Launch review", "Compare support tickets with feedback from the launch. Leave an open question beside any pattern that needs more evidence."],
      ["Competitive scan", "Save recurring themes alongside excerpts. Use the brief to track which ideas the team wants to test."]
    ]
  },
  claymorphism: {
    eyebrow: "The planning desk",
    title: "Give a new idea somewhere to land.",
    description: "Start with a quick sketch, a few colors, or a list of things you want to try. Turn the pieces that matter this week into small steps, then save the rest for another day.",
    alt: "Colorful sticky notes and pens spread out on a table",
    layout: "copy-first",
    guideTitle: "Pick a plan that fits your week.",
    notes: [
      ["Study week", "Set a topic for each session and save one short review block before the deadline."],
      ["Creative week", "Make room for a rough draft before you schedule feedback or ask for approval."],
      ["Busy week", "Pick a few essentials and use one parking list for everything they push aside."]
    ]
  },
  cartoon: {
    eyebrow: "The fizz bar",
    title: "Set out the good stuff.",
    description: "Put a bucket of ice, sliced citrus, and the three flavors on the table. A sprig of mint or an extra wedge of lime gives everyone room to make their own mix.",
    alt: "Iced citrus drink with fresh mint and orange slices",
    layout: "copy-first",
    guideTitle: "Find a snack for every sip.",
    notes: [
      ["Sunny Orange", "Try it with salted popcorn. The orange is round and bright enough to hold its own."],
      ["Pink Grapefruit", "Pair it with a crisp olive cracker or a handful of roasted almonds."],
      ["Lemon Lime", "Serve it beside tortilla chips with a little guacamole and a squeeze of lime."]
    ]
  },
  neumorphism: {
    eyebrow: "Forma at home",
    title: "Make quiet part of the room.",
    description: "Give Forma a steady spot within reach. The softer status light and tactile dial are designed for changes you can make while keeping your eyes on the work or the book in front of you.",
    alt: "A softly lit minimalist room with a side table",
    layout: "photo-first",
    guideTitle: "Try a different place for each setting.",
    notes: [
      ["At the desk", "Keep the dial within reach and try Focus at a low level while you work."],
      ["Beside a reading chair", "Try Unwind and leave enough space around the speaker for its controls."],
      ["On the bedside table", "Choose Sleep to preview the dim indicator. Keep the speaker where you can adjust it easily."]
    ]
  },
  "neo-brutalism": {
    eyebrow: "Out in the world",
    title: "Make the street the first screen.",
    description: "A poster at the far end of a block is a good test of a brand. Start with one unmistakable idea, then see whether it reads on a wall, on a phone, and at a quick glance.",
    alt: "Colorful graphic posters displayed together on a wall",
    layout: "wide",
    guideTitle: "What comes out of a studio sprint.",
    notes: [
      ["A direction to test", "Pick a short statement, typography, and a color range, then use them on a real message."],
      ["A working set", "Build the pieces that need to ship together, such as a poster, a landing page, and a social crop."],
      ["A handoff people can use", "Leave examples that show how the type, color, and layout behave when the content changes."]
    ]
  },
  "minimalist-luxury": {
    eyebrow: "A study in detail",
    title: "Let the surface do the work.",
    description: "A curved edge catches a sliver of light. The face of the piece holds a softer reflection. Forma pairs those finishes so a small movement changes how the shape reads.",
    alt: "A gold ring partly covered by softly folded fabric",
    layout: "photo-first",
    guideTitle: "Three ways to wear Forma.",
    notes: [
      ["A single gesture", "Wear the Arc ring on its own and let the rounded profile carry the shape."],
      ["A subtle pair", "Pair the Fold earrings with the Line pendant for two quiet points of light."],
      ["Close to the skin", "Choose a fine chain or a small earring when a heavier piece would catch on a high collar."]
    ]
  },
  "retro-vintage": {
    eyebrow: "At the brew bar",
    title: "Give the first pour a moment.",
    description: "Wet the grounds evenly, pause for the bloom, then pour the rest in a slow circle. A good cup has enough sweetness and body to stay interesting as it cools.",
    alt: "Hot water being poured slowly into a coffee filter",
    layout: "copy-first",
    guideTitle: "Choose a roast for the way you brew.",
    notes: [
      ["Paper filter", "Try Sunday Matinée when you want a lighter body and the fruit notes to come through."],
      ["French press", "Start with House Blend if you like an easy, rounded cup with a little more weight."],
      ["Coffee with milk", "Try Night Train when you want the darker roast to hold its flavor after adding milk."]
    ]
  },
  cyberpunk: {
    eyebrow: "Route reconnaissance",
    title: "Start in the backstreets.",
    description: "Alley Run favors a clean line through the narrow blocks. Look for turns that connect two streets without forcing a stop, and keep a longer straight in reserve for the boost.",
    alt: "Neon signs reflected on a wet city street at night",
    layout: "wide",
    guideTitle: "Read the markings before the next turn.",
    notes: [
      ["Cyan / route", "Follow the continuous cyan strip when you want the clearest route through the district."],
      ["Pink / shortcut", "Take the marked gap when you are already lined up. A late correction costs speed."],
      ["White / checkpoint", "Check your time here, then use the next straight section to reset your rhythm."]
    ]
  },
  "bento-grid": {
    eyebrow: "A team in motion",
    title: "Keep the launch moving together.",
    description: "Start the week with one plan, then let the board take over. When a draft moves to review, the next owner can find the brief, the deadline, and the decision that got it there.",
    alt: "Creative team collaborating together at a work table",
    layout: "copy-first",
    guideTitle: "Make the team check-in shorter.",
    notes: [
      ["Before the meeting", "Move completed work and flag the tasks with an unresolved question."],
      ["While you talk", "Spend the time on decisions and blockers. Save each decision on the task it changes."],
      ["Before you leave", "Check that each action has one owner and an agreed next step."]
    ]
  },
  "3d-immersive": {
    eyebrow: "The listening room",
    title: "Settle into the first track.",
    description: "The suspension band and angled cups are designed to make the first adjustment simple. Once the fit feels even, the volume and playback controls sit within reach.",
    alt: "Listener wearing over-ear headphones",
    layout: "photo-first",
    guideTitle: "Find a comfortable fit.",
    notes: [
      ["Center the band", "Set the headband so the cups reach your ears without pulling at their upper edges."],
      ["Seat the cushions", "Give each cup a slight turn until the cushion sits evenly around the ear."],
      ["Set the level", "Start low and adjust using the dedicated dial until the track is clear."]
    ]
  }
};


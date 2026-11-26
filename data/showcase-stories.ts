import type { ThemeSlug } from "./showcase";

export type StoryNote = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

type Story = {
  eyebrow: string;
  title: string;
  description: string;
  alt: string;
  layout: "photo-first" | "copy-first" | "wide";
  guideEyebrow: string;
  guideTitle: string;
  notes: readonly [StoryNote, StoryNote, StoryNote];
};

export const stories: Record<ThemeSlug, Story> = {
  glassmorphism: {
    eyebrow: "Research operations",
    title: "Give recurring research a home.",
    description: "Keep discovery notes in a shared project so the next round of interviews starts with the questions you already explored and the gaps you still need to fill.",
    alt: "Developer working at a laptop with code on the screen",
    layout: "photo-first",
    guideEyebrow: "Playbooks",
    guideTitle: "Put Prism to work on your next brief.",
    notes: [
      {
        title: "Discovery sprint",
        description: "Group observations by question. Keep the original notes within reach so reviewers can follow how a finding took shape.",
        image: "/showcase/glass-3.webp",
        alt: "Dark developer laptop screen displaying structured research code"
      },
      {
        title: "Launch review",
        description: "Compare support tickets with feedback from the launch. Leave an open question beside any pattern that needs more evidence.",
        image: "/showcase/glass-4.webp",
        alt: "Multi-screen research desk glowing in low light"
      },
      {
        title: "Competitive scan",
        description: "Save recurring themes alongside excerpts. Use the brief to track which ideas the team wants to test.",
        image: "/showcase/glass-6.webp",
        alt: "Product researcher reviewing findings on a laptop in a studio"
      }
    ]
  },
  claymorphism: {
    eyebrow: "The planning desk",
    title: "Give a new idea somewhere to land.",
    description: "Start with a quick sketch, a few colors, or a list of things you want to try. Turn the pieces that matter this week into small steps, then save the rest for another day.",
    alt: "Colorful sticky notes and pens spread out on a table",
    layout: "copy-first",
    guideEyebrow: "Weekly rhythms",
    guideTitle: "Pick a plan that fits your week.",
    notes: [
      {
        title: "Study week",
        description: "Set a topic for each session and save one short review block before the deadline.",
        image: "/showcase/clay-1.webp",
        alt: "Pastel lilac, blue, and yellow notebooks with highlighters"
      },
      {
        title: "Creative week",
        description: "Make room for a rough draft before you schedule feedback or ask for approval.",
        image: "/showcase/clay-2.webp",
        alt: "Weekly notepad and pastel stationery flat lay"
      },
      {
        title: "Busy week",
        description: "Pick a few essentials and use one parking list for everything they push aside.",
        image: "/showcase/clay-3.webp",
        alt: "Soft pink pastel stationery tools arranged neatly on a desk"
      }
    ]
  },
  cartoon: {
    eyebrow: "The fizz bar",
    title: "Set out the good stuff.",
    description: "Put a bucket of ice, sliced citrus, and the three flavors on the table. A sprig of mint or an extra wedge of lime gives everyone room to make their own mix.",
    alt: "Iced citrus drink with fresh mint and orange slices",
    layout: "copy-first",
    guideEyebrow: "Snack pairings",
    guideTitle: "Find a snack for every sip.",
    notes: [
      {
        title: "Sunny Orange",
        description: "Try it with salted popcorn. The orange is round and bright enough to hold its own.",
        image: "/showcase/cartoon-1.webp",
        alt: "Chilled glass of orange citrus soda garnished with a fresh orange wheel"
      },
      {
        title: "Pink Grapefruit",
        description: "Pair it with a crisp olive cracker or a handful of roasted almonds.",
        image: "/showcase/cartoon-4.webp",
        alt: "Freshly cut oranges on a board next to pressed citrus juice"
      },
      {
        title: "Lemon Lime",
        description: "Serve it beside tortilla chips with a little guacamole and a squeeze of lime.",
        image: "/showcase/cartoon-3.webp",
        alt: "Sparkling lime drink over ice with fresh mint leaves"
      }
    ]
  },
  neumorphism: {
    eyebrow: "Forma at home",
    title: "Make quiet part of the room.",
    description: "Give Forma a steady spot within reach. The softer status light and tactile dial are designed for changes you can make while keeping your eyes on the work or the book in front of you.",
    alt: "A softly lit minimalist room with a side table",
    layout: "photo-first",
    guideEyebrow: "Placement guide",
    guideTitle: "Try a different place for each setting.",
    notes: [
      {
        title: "At the desk",
        description: "Keep the dial within reach and try Focus at a low level while you work.",
        image: "/showcase/neu-5.webp",
        alt: "Clean neutral studio console and minimal bar stool"
      },
      {
        title: "Beside a reading chair",
        description: "Try Unwind and leave enough space around the speaker for its controls.",
        image: "/showcase/neu-6.webp",
        alt: "Calm sunlit room with minimalist chairs in soft tones"
      },
      {
        title: "On the bedside table",
        description: "Choose Sleep to preview the dim indicator. Keep the speaker where you can adjust it easily.",
        image: "/showcase/neu-4.webp",
        alt: "Soft grey Scandinavian bedroom with warm pendant globes"
      }
    ]
  },
  "neo-brutalism": {
    eyebrow: "Out in the world",
    title: "Make the street the first screen.",
    description: "A poster at the far end of a block is a good test of a brand. Start with one unmistakable idea, then see whether it reads on a wall, on a phone, and at a quick glance.",
    alt: "Colorful graphic posters displayed together on a wall",
    layout: "wide",
    guideEyebrow: "Deliverables",
    guideTitle: "What comes out of a studio sprint.",
    notes: [
      {
        title: "A direction to test",
        description: "Pick a short statement, typography, and a color range, then use them on a real message.",
        image: "/showcase/brutal-3.webp",
        alt: "Bold geometric apartment building facade in primary colors"
      },
      {
        title: "A working set",
        description: "Build the pieces that need to ship together, such as a poster, a landing page, and a social crop.",
        image: "/showcase/brutal-2.webp",
        alt: "Open editorial magazine spread and cup on a studio table"
      },
      {
        title: "A handoff people can use",
        description: "Leave examples that show how the type, color, and layout behave when the content changes.",
        image: "/showcase/brutal-4.webp",
        alt: "Vibrant painted building wall in bold yellow and teal"
      }
    ]
  },
  "minimalist-luxury": {
    eyebrow: "A study in detail",
    title: "Let the surface do the work.",
    description: "A curved edge catches a sliver of light. The face of the piece holds a softer reflection. Forma pairs those finishes so a small movement changes how the shape reads.",
    alt: "A gold ring partly covered by softly folded fabric",
    layout: "photo-first",
    guideEyebrow: "Styling notes",
    guideTitle: "Three ways to wear Forma.",
    notes: [
      {
        title: "A single gesture",
        description: "Wear the Arc ring on its own and let the rounded profile carry the shape.",
        image: "/showcase/luxury-2.webp",
        alt: "Sculpted gold rings resting on textured stone"
      },
      {
        title: "A subtle pair",
        description: "Pair the Fold earrings with the Solstice cuff for two quiet points of warm light.",
        image: "/showcase/luxury-1.webp",
        alt: "Close-up of sculptural gold earring catching natural light"
      },
      {
        title: "Close to the skin",
        description: "Choose a fine chain or a small earring when a heavier piece would catch on a high collar.",
        image: "/showcase/luxury-3.webp",
        alt: "Handcrafted gold bracelet displayed on travertine stone"
      }
    ]
  },
  "retro-vintage": {
    eyebrow: "At the brew bar",
    title: "Give the first pour a moment.",
    description: "Wet the grounds evenly, pause for the bloom, then pour the rest in a slow circle. A good cup has enough sweetness and body to stay interesting as it cools.",
    alt: "Hot water being poured slowly into a coffee filter",
    layout: "copy-first",
    guideEyebrow: "Brew pairings",
    guideTitle: "Choose a roast for the way you brew.",
    notes: [
      {
        title: "Paper filter",
        description: "Try Sunday Matinée when you want a lighter body and the fruit notes to come through.",
        image: "/showcase/retro-3.webp",
        alt: "Glass Chemex pour-over coffee brewer on a counter"
      },
      {
        title: "French press",
        description: "Start with House Blend if you like an easy, rounded cup with a little more weight.",
        image: "/showcase/retro-1.webp",
        alt: "Ceramic mug of freshly brewed coffee with crema latte art"
      },
      {
        title: "Coffee with milk",
        description: "Try Night Train when you want the darker roast to hold its flavor after adding milk.",
        image: "/showcase/retro-2.webp",
        alt: "Steaming flat white coffee served beside warm pastries"
      }
    ]
  },
  cyberpunk: {
    eyebrow: "Route reconnaissance",
    title: "Start in the backstreets.",
    description: "Alley Run favors a clean line through the narrow blocks. Look for turns that connect two streets without forcing a stop, and keep a longer straight in reserve for the boost.",
    alt: "Neon signs reflected on a wet city street at night",
    layout: "wide",
    guideEyebrow: "Tactical briefing",
    guideTitle: "Read the markings before the next turn.",
    notes: [
      {
        title: "Cyan / route",
        description: "Follow the continuous cyan strip when you want the clearest route through the district.",
        image: "/showcase/cyber-5.webp",
        alt: "Illuminated neon light tunnel glowing in a dark corridor"
      },
      {
        title: "Pink / shortcut",
        description: "Take the marked gap when you are already lined up. A late correction costs speed.",
        image: "/showcase/cyber-1.webp",
        alt: "Neon city building signs lighting up a dark urban night"
      },
      {
        title: "White / checkpoint",
        description: "Check your time here, then use the next straight section to reset your rhythm.",
        image: "/showcase/cyber-6.webp",
        alt: "Crowded night street lit by towering neon signs"
      }
    ]
  },
  "bento-grid": {
    eyebrow: "A team in motion",
    title: "Keep the launch moving together.",
    description: "Start the week with one plan, then let the board take over. When a draft moves to review, the next owner can find the brief, the deadline, and the decision that got it there.",
    alt: "Creative team collaborating together at a work table",
    layout: "copy-first",
    guideEyebrow: "Team rituals",
    guideTitle: "Make the team check-in shorter.",
    notes: [
      {
        title: "Before the meeting",
        description: "Move completed work and flag the tasks with an unresolved question.",
        image: "/showcase/bento-1.webp",
        alt: "Designers discussing project notes beside a sunlit office window"
      },
      {
        title: "While you talk",
        description: "Spend the time on decisions and blockers. Save each decision on the task it changes.",
        image: "/showcase/bento-2.webp",
        alt: "Small product team reviewing deliverables on a laptop"
      },
      {
        title: "Before you leave",
        description: "Check that each action has one owner and an agreed next step.",
        image: "/showcase/bento-4.webp",
        alt: "Colleagues working together across laptops in a studio"
      }
    ]
  },
  "3d-immersive": {
    eyebrow: "The listening room",
    title: "Settle into the first track.",
    description: "The suspension band and angled cups are designed to make the first adjustment simple. Once the fit feels even, the volume and playback controls sit within reach.",
    alt: "Listener wearing over-ear headphones",
    layout: "photo-first",
    guideEyebrow: "Listening setup",
    guideTitle: "Find a comfortable fit.",
    notes: [
      {
        title: "Center the band",
        description: "Set the headband so the cups reach your ears without pulling at their upper edges.",
        image: "/showcase/immersive-1.webp",
        alt: "Matte black studio headphones beside a condenser microphone"
      },
      {
        title: "Seat the cushions",
        description: "Give each cup a slight turn until the cushion sits evenly around the ear.",
        image: "/showcase/immersive-2.webp",
        alt: "Pair of dark reference headphones resting on a music stand"
      },
      {
        title: "Set the level",
        description: "Start low and adjust using the dedicated dial until the track is clear.",
        image: "/showcase/immersive-4.webp",
        alt: "Close-up of tactile analog mixer faders in a sound studio"
      }
    ]
  }
};

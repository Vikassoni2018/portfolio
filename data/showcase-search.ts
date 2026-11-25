import { themes, type ThemeSlug } from "./showcase";

export const storefrontExamples: readonly ThemeSlug[] = ["cartoon", "minimalist-luxury", "retro-vintage", "3d-immersive"];

type SearchDetails = {
  description: string;
  designNote: string;
  related: readonly [ThemeSlug, ThemeSlug];
};

export const themeSearch: Record<ThemeSlug, SearchDetails> = {
  glassmorphism: {
    description: "Preview a glassmorphism SaaS landing page for Prism AI, with frosted panels, pointer parallax, and an interactive research workflow.",
    designNote: "Prism AI uses frosted layers and pointer parallax to suggest depth. The research workflow gives a complex SaaS product a concrete story visitors can follow.",
    related: ["bento-grid", "cyberpunk"]
  },
  claymorphism: {
    description: "Explore Pebble, a claymorphism landing page design for a productivity app, with pastel 3D shapes and a sample weekly planner.",
    designNote: "Pebble pairs soft clay shapes with spring motion. The sample week shows what a first planning session feels like before a visitor commits to the product.",
    related: ["bento-grid", "cartoon"]
  },
  cartoon: {
    description: "Explore a cartoon beverage landing page for Zingy Pop, with an animated citrus mascot, bold flavor cards, and a serving guide.",
    designNote: "Zingy Pop makes a beverage lineup easy to compare with illustrated cans and flavor-led color. The animated mascot introduces the brand before the page takes visitors into serving ideas.",
    related: ["retro-vintage", "neo-brutalism"]
  },
  neumorphism: {
    description: "Try Forma One, a neumorphic smart-speaker landing page with tactile controls and an interactive preview of the three ambient modes.",
    designNote: "Forma One uses soft shadows to suggest the shape of a physical speaker. The ambient mode selector lets visitors try the main control and read what changes with each setting.",
    related: ["3d-immersive", "glassmorphism"]
  },
  "neo-brutalism": {
    description: "Preview Offbeat Studio, a neo-brutalist agency landing page with bold typography, a kinetic marquee, and a fictional project wall.",
    designNote: "Offbeat Studio takes its cues from street posters. Oversized type and hard-edged cards give the fictional project wall a visual rhythm while keeping the service list easy to scan.",
    related: ["cartoon", "cyberpunk"]
  },
  "minimalist-luxury": {
    description: "Explore Alba Atelier, a minimalist jewelry landing page concept for a luxury storefront, with editorial photography and subtle motion.",
    designNote: "Alba Atelier gives photography, material, and scale room to tell the story. The collection layout offers a direction for a jewelry launch or a premium Shopify product page.",
    related: ["3d-immersive", "retro-vintage"]
  },
  "retro-vintage": {
    description: "Preview After Hours, a retro coffee brand landing page with a vintage roast menu, a pour-over guide, and animated poster details.",
    designNote: "After Hours uses café menus and printed posters as visual references. The roast list and brew guide help visitors choose a coffee based on taste and how they brew at home.",
    related: ["cartoon", "minimalist-luxury"]
  },
  cyberpunk: {
    description: "Explore NIGHTSHIFT, a cyberpunk arcade landing page with neon city photography, animated scanlines, and an interactive mode selector.",
    designNote: "NIGHTSHIFT pairs neon street photography with interface details from arcade games. The mode selector gives a launch page a way to explain different play styles.",
    related: ["neo-brutalism", "3d-immersive"]
  },
  "bento-grid": {
    description: "Explore Daymark, a bento grid SaaS landing page with expandable feature cards and a sample project board for small teams.",
    designNote: "Daymark uses an asymmetric grid to make four collaboration features easy to scan. Expandable examples and a sample launch board show where each feature fits into a team's work.",
    related: ["glassmorphism", "claymorphism"]
  },
  "3d-immersive": {
    description: "Explore Hush 01, a 3D headphone landing page with an interactive Three.js product model, three finishes, and a mobile illustration fallback.",
    designNote: "Hush 01 uses a rotatable headphone model to let visitors examine the shape and compare finishes. A static illustration supports the same finish selection on smaller screens.",
    related: ["neumorphism", "minimalist-luxury"]
  }
};

export const relatedThemes = (slug: ThemeSlug) =>
  themes.filter((theme) => themeSearch[slug].related.includes(theme.slug));


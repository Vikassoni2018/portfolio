export const showcasePath = "/landing-page-designs";
export const showcaseTitle = "Explore 10 Unique Landing Page Design Styles";
export const showcaseDescription = "Explore ten interactive landing page concepts by Vikas Soni. Find a style for your next custom website, Shopify storefront, or product launch.";
export const showcaseImage = "/showcase/gallery.png";

export const themes = [
  {
    slug: "glassmorphism", visual: "glass", name: "Glassmorphism", brand: "Prism AI", category: "Software",
    industry: "AI & SaaS", description: "A luminous workspace concept for turning scattered research into decisions.",
    title: "Glassmorphism Landing Page Design | GSAP Developer", animations: ["Pointer parallax", "Orbiting glass", "Scroll depth"],
    palette: ["#08091b", "#bba1ff", "#7dedef"], typography: "Space Grotesk",
    alt: "Folded blue and violet abstract waves"
  },
  {
    slug: "claymorphism", visual: "clay", name: "Claymorphism", brand: "Pebble", category: "Software",
    industry: "Education & productivity", description: "A softly sculpted planner for creative minds and busy weeks.",
    title: "Claymorphism Website Design | Interactive Landing Page", animations: ["Elastic entrances", "Squash and stretch", "Floating clay"],
    palette: ["#f4edff", "#7650bd", "#ffbe9c"], typography: "Nunito",
    alt: "Colorful reminder cards and stationery on a white desk"
  },
  {
    slug: "cartoon", visual: "cartoon", name: "Cartoon", brand: "Zingy Pop", category: "Food & drink",
    industry: "Beverage & consumer goods", description: "A citrus soda concept with a hand-drawn mascot and bold flavor cards.",
    title: "Cartoon Landing Page Design | Creative Web Developer", animations: ["SVG strokes", "Mascot motion", "Flavor transitions"],
    palette: ["#fff3bb", "#ff6c36", "#1e3727"], typography: "Bricolage Grotesque",
    alt: "An iced citrus drink with slices of orange and lime"
  },
  {
    slug: "neumorphism", visual: "neu", name: "Neumorphism", brand: "Forma One", category: "Physical products",
    industry: "Smart home & hardware", description: "A tactile smart speaker concept with a working ambient-mode selector.",
    title: "Neumorphism Smart Product Landing Page | Interactive Web Design", animations: ["Dial rotation", "Soft reveals", "Tactile feedback"],
    palette: ["#e7ebef", "#213141", "#416b68"], typography: "Manrope",
    alt: "White smart speaker on a minimalist table"
  },
  {
    slug: "neo-brutalism", visual: "brutal", name: "Neo-Brutalism", brand: "Offbeat Studio", category: "Creative",
    industry: "Studios & agencies", description: "A loud independent studio concept with hard shadows and a kinetic work wall.",
    title: "Neo-Brutalism Landing Page | Custom Website Development", animations: ["Kinetic type", "Horizontal marquee", "Magnetic button"],
    palette: ["#ffe45a", "#ff75ad", "#201d1b"], typography: "Archivo Black",
    alt: "Colorful geometric patterns across a modern building façade"
  },
  {
    slug: "minimalist-luxury", visual: "luxury", name: "Minimalist Luxury", brand: "Alba Atelier", category: "Physical products",
    industry: "Jewelry & luxury Shopify", description: "An editorial jewelry concept framed around warm tones, material, and light.",
    title: "Luxury Landing Page Design | Shopify & Web Developer", animations: ["Cinematic masking", "Editorial parallax", "Detail reveals"],
    palette: ["#f8f3eb", "#33291e", "#8c6c45"], typography: "Cormorant Garamond",
    alt: "Editorial close-up of a woman wearing sculptural gold jewelry"
  },
  {
    slug: "retro-vintage", visual: "retro", name: "Retro Vintage", brand: "After Hours", category: "Food & drink",
    industry: "Coffee & hospitality", description: "A late-night roastery concept with printed menus and a classic coffee poster.",
    title: "Retro Vintage Coffee Landing Page | Creative Web Design", animations: ["Rotating stamp", "Stepped type", "Poster reveal"],
    palette: ["#f1d9a3", "#7b3020", "#283c35"], typography: "Fraunces",
    alt: "Coffee cup and roasted beans in a warm close-up"
  },
  {
    slug: "cyberpunk", visual: "cyber", name: "Cyberpunk", brand: "NIGHTSHIFT", category: "Creative",
    industry: "Gaming & entertainment", description: "A neon arcade concept with a playable visual preview of three game modes.",
    title: "Cyberpunk Landing Page Design | GSAP Creative Developer", animations: ["Soft scanline", "Kinetic title", "Animated level readout"],
    palette: ["#100a19", "#ff5aca", "#5ff6e6"], typography: "Space Mono",
    alt: "Nighttime building façade illuminated by neon geometric lights"
  },
  {
    slug: "bento-grid", visual: "bento", name: "Bento Grid", brand: "Daymark", category: "Software",
    industry: "B2B SaaS & collaboration", description: "A modular workspace concept with expandable features and an animated project board.",
    title: "Bento Grid SaaS Landing Page | Responsive Website Design", animations: ["Grid stagger", "Expandable cards", "Progress animation"],
    palette: ["#f6f7f2", "#16382f", "#cdef8f"], typography: "DM Sans",
    alt: "Modern home-office desk with a laptop"
  },
  {
    slug: "3d-immersive", visual: "immersive", name: "3D Immersive", brand: "Hush 01", category: "Physical products",
    industry: "Audio & premium electronics", description: "A cinematic headphone launch with a real-time model and three finish options.",
    title: "3D Animated Landing Page | GSAP & Creative Developer", animations: ["3D rotation", "Scroll-driven camera", "Pointer depth"],
    palette: ["#11131a", "#f2f0ec", "#ff9b64"], typography: "Barlow Condensed",
    alt: "Close-up of black over-ear headphones"
  }
] as const;

export type Theme = (typeof themes)[number];
export type ThemeSlug = Theme["slug"];

export const themeRoute = (slug: ThemeSlug) => `${showcasePath}/${slug}`;
export const themeThumbnail = (theme: Theme) => `/showcase/${theme.visual}-preview.webp`;
export const themeSocialImage = (theme: Theme) => `/showcase/${theme.visual}-social.png`;
export const themeInquiry = (slug: ThemeSlug) => `/?theme=${slug}#contact`;
export const findTheme = (slug: string | string[] | undefined) => themes.find((theme) => theme.slug === slug);


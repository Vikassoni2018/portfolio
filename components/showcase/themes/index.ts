import type { ComponentType } from "react";
import type { Theme, ThemeSlug } from "@/data/showcase";

type ThemeModule = { default: ComponentType<{ theme: Theme }> };

export const themeComponents: Record<ThemeSlug, () => Promise<ThemeModule>> = {
  glassmorphism: () => import("./Glass"),
  claymorphism: () => import("./Clay"),
  cartoon: () => import("./Cartoon"),
  neumorphism: () => import("./Neumorphism"),
  "neo-brutalism": () => import("./Brutal"),
  "minimalist-luxury": () => import("./Luxury"),
  "retro-vintage": () => import("./Retro"),
  cyberpunk: () => import("./Cyberpunk"),
  "bento-grid": () => import("./Bento"),
  "3d-immersive": () => import("./Immersive")
};


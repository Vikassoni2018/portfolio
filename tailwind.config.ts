import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      colors: {
        canvas: "#F8FAFC",
        surface: "#FFFFFF",
        indigoMist: "#EEF2FF",
        lavenderMist: "#F5F3FF",
        ink: "#0F172A",
        inkSecondary: "#475569",
        inkMuted: "#64748B",
        paper: "#F8FAFC",
        accent: "#6366F1",
        accentViolet: "#8B5CF6",
        accentSky: "#38BDF8",
        coral: "#DC5F4F"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.08)",
        glass: "0 16px 48px -12px rgba(79, 70, 229, 0.12), 0 4px 16px -2px rgba(15, 23, 42, 0.05)",
        "glass-hover": "0 24px 60px -14px rgba(99, 102, 241, 0.2), 0 8px 24px -4px rgba(15, 23, 42, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        paper: "#f8fafc",
        accent: "#0f766e",
        coral: "#dc5f4f"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;

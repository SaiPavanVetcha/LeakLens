import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#02040a",
        surface: "#060a14",
        "surface-raised": "#0c1222",
        "surface-card": "rgba(10, 16, 32, 0.7)",
        border: "rgba(0, 242, 255, 0.12)",
        "border-bright": "rgba(0, 242, 255, 0.35)",
        cyan: {
          400: "#22d3ee",
          500: "#00f2ff",
          glow: "#00f2ff",
        },
        rose: {
          500: "#f43f5e",
          glow: "#fb7185",
        },
        emerald: {
          500: "#10b981",
          glow: "#34d399",
        },
        amber: {
          500: "#f59e0b",
          glow: "#fbbf24",
        },
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -5px rgba(0, 242, 255, 0.3)",
        "cyan-glow-lg": "0 0 45px -5px rgba(0, 242, 255, 0.45)",
        "rose-glow": "0 0 25px -5px rgba(244, 63, 94, 0.3)",
        "amber-glow": "0 0 25px -5px rgba(245, 158, 11, 0.3)",
        "emerald-glow": "0 0 25px -5px rgba(16, 185, 129, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

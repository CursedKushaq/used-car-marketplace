import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A", // Slate 900: Crisp deep charcoal for maximum readability
        muted: "#64748B", // Slate 500: Balanced, modern secondary text
        canvas: "#F8FAFC", // Slate 50: Clean porcelain / cool slate canvas (simplistic like white, with subtle depth)
        surface: "#FFFFFF", // Pure white for cards, panels, popups
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#0A0F1D",
        },
        primary: {
          DEFAULT: "#2563EB", // Precision Automotive Cobalt Blue (Carwow / CarWale style)
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#172554",
        },
        navy: {
          DEFAULT: "#0F172A",
          800: "#1E293B",
          900: "#0F172A",
          950: "#0A0F1D",
        },
        accent: {
          DEFAULT: "#D97706", // Warm amber gold for ratings and fair price badges
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        success: "#10B981", // Emerald for 160-point inspection and verification
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: [
          "Noto Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;

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
        ink: "#101828",
        muted: "#475467",
        canvas: "#F6F5F2",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#0B6E6E",
          50: "#E6F4F4",
          100: "#CCE9E9",
          200: "#99D3D3",
          300: "#66BDBD",
          400: "#339A9A",
          500: "#0B6E6E",
          600: "#095858",
          700: "#074242",
          800: "#052C2C",
          900: "#021616",
        },
        accent: {
          DEFAULT: "#C2410C",
          50: "#FFF3ED",
          100: "#FFE4D4",
          200: "#FFC9A8",
          300: "#FFAB71",
          400: "#FF8338",
          500: "#C2410C",
          600: "#9A340A",
          700: "#732708",
          800: "#4D1A05",
          900: "#260D03",
        },
        success: "#15803D",
        warning: "#B45309",
        danger: "#B42318",
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

import type { Config } from "tailwindcss";

import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#FAFAFA",
        primary: "#2563EB",
        text: "#111827",
        muted: "#6B7280",
        "light-text": "#F9FAFB",
        "dark-background": "#0F1115",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;

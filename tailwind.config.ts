import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "marquee-vertical": "marquee-vertical 20s linear infinite",
        "marquee2-vertical": "marquee2-vertical 20s linear infinite",
        "marquee-vertical-reverse":
          "marquee-vertical-reverse 95s linear infinite",
        "marquee2-vertical-reverse":
          "marquee2-vertical-reverse 95s linear infinite",
      },
      keyframes: {
        "marquee-vertical-reverse": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "marquee2-vertical-reverse": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0%)" },
        },
        "marquee-vertical": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "marquee2-vertical": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: {
          100: "#FFF9F9",
          default: "#ffffff",
        },
        gray: {
          100: "#8F9BB3",
        },
      },
      borderColor: {
        black: {
          100: "#202020",
        },
      },
      backgroundColor: {
        black: {
          100: "#202020",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

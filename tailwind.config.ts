import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: {
          100: "#FFF9F9",
        },
        gray: {
          100: "#8F9BB3",
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

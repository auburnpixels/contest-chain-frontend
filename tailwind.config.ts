import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: false, // Disabled - keeping dark: classes for potential future use
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        brand: {
          navy: "#0D1733",
          slate: "#475569", // Slate 600
          cobalt: "#8E6BFF", // Setting cobalt to purple/pink as requested for "one highlight"
          graphite: "#1F2937", // Gray 800
          steel: "#9CA3AF", // Gray 400
          dark: "#111827", // Gray 900
          light: "#F9FAFB", // Gray 50
        },
        veristiq: {
          primaryBlue: '#2D60FF',
          primaryBlueDark: '#1F3ACC',
          slate: '#1F2430',
          slateLight: '#2B303B',
          white: '#FFFFFF',
          snow: '#F5F7FA',
          grey: '#C7CED9',
          teal: '#0CE2BC',
          coral: '#FF5F5F',
          gold: '#FFD66B'
        },
        trust: {
            teal: "#0F766E", // Teal 700 - Trustworthy
            emerald: "#10B981", // Emerald 500 - Success/Verification
            cyan: "#06B6D4", // Cyan 500 - Tech
        },
        accentMint: "#30E0B5",
        accentPurple: "#8E6BFF",
        accentAmber: "#F4B544",
      },
      spacing: {
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        pill: "999px",
      },
      boxShadow: {
        brand: "0 20px 60px rgba(13, 23, 51, 0.45)",
        card: "0 24px 50px rgba(5, 9, 21, 0.55)",
        subtle: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
      },
      backgroundImage: {
        "brand-grid":
          "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
        "subtle-gradient": "linear-gradient(to bottom right, #FFFFFF 0%, #F9FAFB 100%)",
      },
      maxWidth: {
        content: "1200px",
        prose: "640px",
      },
      screens: {
        "3xl": "1800px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "rgb(var(--color-base) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        surface2: "rgb(var(--color-surface-2) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          soft: "rgb(var(--color-accent-soft) / <alpha-value>)",
          glow: "rgb(var(--color-accent-glow) / <alpha-value>)",
        },
        // Legacy aliases used by remaining components (FlipCard etc.)
        navy: {
          950: "rgb(var(--color-base) / <alpha-value>)",
          900: "rgb(var(--color-surface) / <alpha-value>)",
          800: "rgb(var(--color-surface-2) / <alpha-value>)",
          700: "rgb(var(--color-surface-2) / <alpha-value>)",
        },
        cyan: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          glow: "rgb(var(--color-accent-glow) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        serif: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 1px 0 rgb(var(--color-accent) / 0.15), 0 20px 50px -25px rgb(var(--color-accent) / 0.35)",
        "glow-sm": "0 1px 0 rgb(var(--color-accent) / 0.12), 0 8px 24px -14px rgb(var(--color-accent) / 0.3)",
        "glow-lg": "0 2px 0 rgb(var(--color-accent) / 0.18), 0 40px 80px -30px rgb(var(--color-accent) / 0.4)",
        edge: "0 0 0 1px rgb(var(--color-line) / 0.7)",
        lift: "0 12px 30px -18px rgba(0,0,0,0.5), 0 1px 0 rgb(var(--color-line) / 0.6)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-in-up": "fadeInUp 0.7s ease-out both",
        "pulse-glow": "pulseGlow 2.4s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        float: "float 8s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgb(var(--color-accent) / 0.3)" },
          "50%":      { boxShadow: "0 0 50px rgb(var(--color-accent) / 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-14px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%":  { transform: "translate(-5%,-10%)" },
          "20%":  { transform: "translate(-15%,5%)" },
          "30%":  { transform: "translate(7%,-25%)" },
          "40%":  { transform: "translate(-5%,25%)" },
          "50%":  { transform: "translate(-15%,10%)" },
          "60%":  { transform: "translate(15%,0%)" },
          "70%":  { transform: "translate(0%,15%)" },
          "80%":  { transform: "translate(3%,35%)" },
          "90%":  { transform: "translate(-10%,10%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".perspective-1000": { perspective: "1000px" },
        ".transform-style-3d": { transformStyle: "preserve-3d" },
        ".backface-hidden": {
          "backface-visibility": "hidden",
          "-webkit-backface-visibility": "hidden",
        },
        ".rotate-y-180": { transform: "rotateY(180deg)" },
      });
    },
  ],
};

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme, type Theme } from "./ThemeProvider";

const ICONS: Record<Theme, { label: string; emoji: string }> = {
  dark: { label: "Dark", emoji: "🌙" },
  light: { label: "Light", emoji: "☀️" },
  hacker: { label: "Hacker", emoji: "⌬" },
};

export default function ThemeSwitcher() {
  const { theme, cycle } = useTheme();

  return (
    <button
      type="button"
      onClick={cycle}
      data-cursor="hover"
      aria-label={`Theme: ${ICONS[theme].label}. Click to switch.`}
      title={`Theme: ${ICONS[theme].label} — click to cycle`}
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-line/60 bg-surface/40 text-accent-glow transition hover:border-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-base leading-none"
        >
          {ICONS[theme].emoji}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

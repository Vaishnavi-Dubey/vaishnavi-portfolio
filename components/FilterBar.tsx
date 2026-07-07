"use client";

import { motion } from "framer-motion";

type Props = {
  languages: string[];
  active: string;
  onChange: (lang: string) => void;
};

export default function FilterBar({ languages, active, onChange }: Props) {
  const items = ["All", ...languages];

  return (
    <ul
      role="tablist"
      aria-label="Filter projects by language"
      className="mt-8 flex flex-wrap items-center gap-2"
    >
      {items.map((lang) => {
        const isActive = active === lang;
        return (
          <li key={lang}>
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(lang)}
              data-cursor="hover"
              className={`relative inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                isActive
                  ? "border-accent text-white"
                  : "border-line/40 text-muted hover:border-accent/60 hover:text-accent-glow"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  aria-hidden
                  className="absolute inset-0 -z-0 rounded-full bg-accent shadow-glow-sm"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <span className="relative z-10">{lang}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";

const links = [
  { href: "#home",       label: "Cover",      n: "I"   },
  { href: "#about",      label: "About",      n: "II"  },
  { href: "#experience", label: "Timeline",   n: "III" },
  { href: "#projects",   label: "Work",       n: "IV"  },
  { href: "#github",     label: "Pulse",      n: "V"   },
  { href: "#contact",    label: "Write",      n: "VI"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-line/40 bg-base/75 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="group flex items-baseline gap-2"
        >
          <span className="font-display text-xl italic tracking-tight text-ink">
            Vaishnavi
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted transition group-hover:text-accent">
            &mdash; Dubey
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className="group relative flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition hover:text-ink"
              >
                <span className="tabular-nums text-accent/70 transition group-hover:text-accent">
                  {l.n}
                </span>
                <span>{l.label}</span>
                <span className="absolute -bottom-1.5 left-[26px] right-0 h-px scale-x-0 origin-left bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-none border border-line/60 text-ink md:hidden"
          >
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line/40 bg-surface/90 backdrop-blur md:hidden"
          >
            <ul className="flex flex-col px-4 py-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleClick(e, l.href)}
                    className="flex items-baseline gap-3 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink/80"
                  >
                    <span className="text-accent tabular-nums">{l.n}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

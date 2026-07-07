"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { RepoCard } from "@/lib/github";

/* ---------- helpers ---------- */

function langPalette(name: string | null): { from: string; to: string } {
  // Distinct gradient per language. Falls back to violet brand gradient.
  const map: Record<string, [string, string]> = {
    TypeScript: ["#3178c6", "#7C3AED"],
    JavaScript: ["#f1e05a", "#ef4444"],
    Python:     ["#3572A5", "#22d3ee"],
    HTML:       ["#e34c26", "#f59e0b"],
    CSS:        ["#563d7c", "#ec4899"],
    Java:       ["#b07219", "#f97316"],
    "C++":      ["#f34b7d", "#7C3AED"],
    C:          ["#555555", "#3b82f6"],
    Go:         ["#00ADD8", "#06b6d4"],
    Rust:       ["#dea584", "#ef4444"],
    Shell:      ["#89e051", "#10b981"],
    Ruby:       ["#701516", "#ef4444"],
    PHP:        ["#4F5D95", "#7C3AED"],
    Swift:      ["#F05138", "#ef4444"],
    Kotlin:     ["#A97BFF", "#7C3AED"],
    Vue:        ["#41b883", "#10b981"],
    Svelte:     ["#ff3e00", "#f97316"],
    Dart:       ["#00B4AB", "#22d3ee"],
    Jupyter:    ["#DA5B0B", "#f97316"],
    "Jupyter Notebook": ["#DA5B0B", "#f97316"],
  };
  const fallback: [string, string] = ["#7C3AED", "#22d3ee"];
  const [from, to] = map[name ?? ""] ?? fallback;
  return { from, to };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h;
}

function categoryFor(repo: RepoCard): { key: string; label: string; ch: string } {
  const lang = (repo.primaryLanguage ?? "").toLowerCase();
  const topics = (repo.topics ?? []).map((t) => t.toLowerCase());
  const hay = [lang, ...topics].join(" ");
  if (/python|jupyter|ml|ai|data|pandas|notebook|tensorflow|pytorch/.test(hay))
    return { key: "data", label: "Data &middot; ML", ch: "lavender" };
  if (/shell|bash|go|rust|cli|tool|devops|docker|infra/.test(hay))
    return { key: "tool", label: "Tooling", ch: "sage" };
  if (/typescript|javascript|react|next|vue|svelte|css|html|tailwind/.test(hay))
    return { key: "ui", label: "Frontend", ch: "coral" };
  if (/api|node|server|backend|express|nest/.test(hay))
    return { key: "api", label: "API &middot; Backend", ch: "gold" };
  return { key: "craft", label: "Craft", ch: "blush" };
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const diffDays = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

/* ---------- thumbnail ---------- */

function GradientThumbnail({ repo }: { repo: RepoCard }) {
  const { from, to } = langPalette(repo.primaryLanguage);
  const seed = hashString(repo.name);
  const angle = seed % 360;
  // Deterministic blob positions seeded from repo name
  const blobs = [
    { x: 20 + (seed % 40), y: 30 + ((seed >> 3) % 30), r: 60 + ((seed >> 5) % 30) },
    { x: 60 + ((seed >> 7) % 30), y: 60 + ((seed >> 9) % 25), r: 80 + ((seed >> 11) % 30) },
    { x: 80 + ((seed >> 13) % 15), y: 20 + ((seed >> 15) % 30), r: 50 + ((seed >> 17) % 30) },
  ];
  const initials = repo.name
    .replace(/[-_.]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div
      aria-hidden
      className="relative h-24 w-full overflow-hidden rounded-lg"
      style={{
        background: `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-60 mix-blend-screen"
      >
        {blobs.map((b, i) => (
          <circle
            key={i}
            cx={b.x}
            cy={b.y}
            r={b.r / 4}
            fill="white"
            opacity={0.25}
          />
        ))}
      </svg>
      {/* Grid overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={`g-${repo.id}`} width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="white" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="30" fill={`url(#g-${repo.id})`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          {initials || "VD"}
        </span>
        {repo.primaryLanguage && (
          <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            {repo.primaryLanguage}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- card ---------- */

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProjectCard({ repo }: { repo: RepoCard }) {
  const [flipped, setFlipped] = useState(false);
  const category = useMemo(() => categoryFor(repo), [repo]);

  const chips = useMemo(() => {
    const fromTopics = repo.topics ?? [];
    const fromLangs = repo.languages.map((l) => l.name);
    const merged: string[] = [];
    const seen = new Set<string>();
    for (const t of [...fromTopics, ...fromLangs]) {
      const k = t.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      merged.push(t);
      if (merged.length >= 10) break;
    }
    return merged;
  }, [repo]);

  return (
    <motion.div
      layout
      variants={cardVariants}
      data-cursor="hover"
      className={`group perspective-1000 h-80 ch-${category.ch}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
    >
      <div
        className={`relative h-full w-full transform-style-3d transition-transform duration-700 ease-out ${
          flipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setFlipped((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((v) => !v);
          }
        }}
        aria-label={`${repo.name} project card. Press to flip and view tech stack.`}
      >
        {/* FRONT */}
        <div className="backface-hidden absolute inset-0 flex flex-col rounded-lg border border-line/50 bg-surface/60 p-5 backdrop-blur-sm transition-all duration-300 group-hover:border-ch group-hover:aura-blush group-hover:bg-surface/80">
          <GradientThumbnail repo={repo} />

          <div className="mt-4 flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-medium text-ink">{repo.name}</h3>
            <div className="flex items-center gap-1.5">
              <span
                title={`Category: ${category.label.replace("&middot;", "·")}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ch/40 bg-ch/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ch"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ch" />
                <span dangerouslySetInnerHTML={{ __html: category.label }} />
              </span>
              {repo.isPinned && (
                <span
                  title="Pinned"
                  className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent"
                >
                  ★
                </span>
              )}
            </div>
          </div>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/65">
            {repo.description ?? "No description provided."}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-line/40 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            <span title="Stars" className="inline-flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .587l3.668 7.568L24 9.748l-6 5.847 1.42 8.281L12 19.771l-7.42 4.105L6 15.595 0 9.748l8.332-1.593z" />
              </svg>
              <span className="tabular-nums">{repo.stars}</span>
            </span>
            <span className="text-ch opacity-0 transition-opacity group-hover:opacity-100">
              Flip &nearr;
            </span>
          </div>
        </div>

        {/* BACK */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col rounded-lg border border-ch bg-surface2 p-5 text-ink">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-medium text-ch">{repo.name}</h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Stack
            </span>
          </div>

          {chips.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No tech metadata available.</p>
          ) : (
            <ul className="mt-4 flex flex-1 flex-wrap content-start gap-2 overflow-hidden">
              {chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-ch/40 bg-ch/10 px-2.5 py-1 text-[11px] font-medium text-ch"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full border border-line/60 px-3.5 py-1.5 text-ink/85 transition hover:border-ch hover:text-ch"
            >
              Source &nearr;
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-ch px-3.5 py-1.5 text-base transition"
              >
                Live &nearr;
              </a>
            )}
          </div>
          <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Updated {formatDate(repo.lastCommitDate ?? repo.updatedAt)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

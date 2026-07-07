"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { RepoCard } from "@/lib/github";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";

type Props = {
  repos: RepoCard[];
  syncedAt: string;
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function formatSynced(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function ProjectsClient({ repos, syncedAt }: Props) {
  const [active, setActive] = useState("All");

  const languages = useMemo(() => {
    const set = new Set<string>();
    for (const r of repos) {
      if (r.primaryLanguage) set.add(r.primaryLanguage);
    }
    return Array.from(set).sort();
  }, [repos]);

  const filtered = useMemo(() => {
    if (active === "All") return repos;
    return repos.filter((r) => r.primaryLanguage === active);
  }, [repos, active]);

  return (
    <>
      <FilterBar languages={languages} active={active} onChange={setActive} />

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-md border border-dashed border-line/60 p-8 text-center text-muted">
          No projects match this filter yet.
        </p>
      ) : (
        <motion.ul
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((repo) => (
              <motion.li
                key={repo.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard repo={repo} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      <p className="mt-10 text-center text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-glow-sm" />
          Last synced from GitHub · {formatSynced(syncedAt)}
        </span>
      </p>
    </>
  );
}

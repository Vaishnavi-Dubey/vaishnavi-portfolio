"use client";

import { motion } from "framer-motion";
import { Reveal, RevealItem } from "./Reveal";

type Item = {
  kind: "work" | "edu";
  title: string;
  org: string;
  period: string;
  description: string;
};

const TIMELINE: Item[] = [
  {
    kind: "work",
    title: "Open Source Contributor",
    org: "Various Communities",
    period: "2024 — Present",
    description:
      "Contributing to UI libraries, design-system tooling, and developer-experience projects across the React/Next.js ecosystem.",
  },
  {
    kind: "work",
    title: "Frontend Developer (Freelance)",
    org: "Independent",
    period: "2023 — Present",
    description:
      "Designing and shipping cinematic, performant web experiences for early-stage products — focus on motion, accessibility, and clean engineering.",
  },
  {
    kind: "edu",
    title: "B.Tech, Computer Science",
    org: "University",
    period: "2022 — 2026",
    description:
      "Coursework in algorithms, systems, machine learning, and HCI. Side-projects across full-stack web, ML, and developer tooling.",
  },
];

function CardSide({
  item,
  side,
}: {
  item: Item;
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-xl border border-line/40 bg-surface/60 p-5 backdrop-blur-sm transition hover:border-ch hover:aura-lavender"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full border border-ch/40 bg-ch/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ch">
          {item.kind === "work" ? "● Work" : "◆ Education"}
        </span>
        <span className="font-mono text-[10px] tabular-nums text-muted">{item.period}</span>
      </div>
      <h3 className="mt-3 font-display text-xl font-normal text-ink">{item.title}</h3>
      <p className="text-sm font-medium text-ch">{item.org}</p>
      <p className="mt-2 text-sm text-muted">{item.description}</p>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="ch-lavender tint-lavender relative isolate px-4 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-5xl" amount={0.15}>
        <RevealItem as="div" className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
          <span className="text-ch">Chapter II &middot; Late morning</span>
          <span className="h-px flex-1 bg-line/60" />
          <span>Where I&rsquo;ve been &mdash; memory in lavender</span>
        </RevealItem>
        <RevealItem
          as="h2"
          className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.012em]"
        >
          A short, slightly out-of-order{" "}
          <span className="text-display-italic">timeline</span>.
        </RevealItem>

        <div className="relative mt-12">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-ch/0 via-ch/60 to-ch/0 md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-12">
            {TIMELINE.map((item, i) => {
              const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
              return (
                <li
                  key={i}
                  className="relative grid items-center gap-6 md:grid-cols-2"
                >
                  {/* Node */}
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 240,
                      damping: 16,
                      delay: 0.1,
                    }}
                    className="absolute left-4 top-6 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-ch shadow-[0_0_14px_currentColor] text-ch md:left-1/2"
                  />

                  {side === "left" ? (
                    <>
                      <div className="pl-10 md:pl-0 md:pr-10">
                        <CardSide item={item} side="left" />
                      </div>
                      <div className="hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" />
                      <div className="pl-10 md:pl-10 md:pr-0">
                        <CardSide item={item} side="right" />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

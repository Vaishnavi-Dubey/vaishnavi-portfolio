"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, RevealItem } from "./Reveal";
import { CodeIcon, PaletteIcon, LeafIcon, ZapIcon, TerminalIcon, BookIcon, CompassIcon, SparkleIcon } from "./Icons";

const SKILLS: { name: string; level: number; note: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { name: "HTML / CSS",      level: 95, note: "layout, motion, accessibility",       icon: PaletteIcon },
  { name: "JavaScript",      level: 92, note: "the everyday language",               icon: CodeIcon },
  { name: "TypeScript",      level: 88, note: "types as a thinking tool",            icon: TerminalIcon },
  { name: "React / Next.js", level: 90, note: "App Router, RSC, ISR",                icon: ZapIcon },
  { name: "Tailwind CSS",    level: 92, note: "design tokens, calm utilities",       icon: PaletteIcon },
  { name: "Node.js",         level: 80, note: "REST + edge runtimes",                icon: TerminalIcon },
  { name: "Python",          level: 78, note: "scripts, data, the occasional ML",    icon: TerminalIcon },
  { name: "UI / UX Design",  level: 82, note: "Figma to feel, not just to pixels",   icon: PaletteIcon },
];

const CHAPTERS = [
  {
    icon: SparkleIcon,
    title: "A stubborn button",
    body:
      "I started because I wanted a hover state to behave. One CSS rule led to another. Twelve years later, I'm still chasing the same calm.",
    chip: "the beginning",
  },
  {
    icon: CompassIcon,
    title: "The seams",
    body:
      "Where a typeface meets a transition. Where an API meets a render. That's where the texture lives, and where I like to work.",
    chip: "the middle",
  },
  {
    icon: BookIcon,
    title: "Tools for thinking",
    body:
      "Lately: developer tools that don't shout, interfaces that age well, and writing software you can read like a letter.",
    chip: "right now",
  },
];

function SkillBar({
  skill,
  visible,
  index,
}: {
  skill: typeof SKILLS[number];
  visible: boolean;
  index: number;
}) {
  const Icon = skill.icon;
  return (
    <li className="group">
      <div className="flex items-center gap-3">
        <span className="icon-chip h-8 w-8 shrink-0 rounded-md text-[14px]">
          <Icon size={14} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-ink/90">{skill.name}</span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inline">
                &mdash; {skill.note}
              </span>
            </div>
            <motion.span
              className="font-mono text-[11px] tabular-nums text-muted"
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.06 }}
            >
              {skill.level}
            </motion.span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface2">
            <motion.div
              className="h-full rounded-full bg-ch"
              initial={{ width: 0 }}
              animate={visible ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{
                duration: 1.1,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="ch-blush tint-blush relative isolate px-4 py-28 sm:py-36"
    >
      <Reveal className="mx-auto max-w-5xl" amount={0.2}>
        <RevealItem
          as="div"
          className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted"
        >
          <span className="text-ch">Chapter I &middot; Morning</span>
          <span className="h-px flex-1 bg-line/60" />
          <span>How I got here, briefly</span>
        </RevealItem>

        <RevealItem
          as="h2"
          className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.012em]"
        >
          I build software the way some people{" "}
          <span className="text-ch italic">keep a garden</span>
          &mdash; patiently, mostly outside.
        </RevealItem>

        {/* Story panels — illustrated chapters of how I got here */}
        <RevealItem as="div" className="mt-12 grid gap-4 sm:grid-cols-3">
          {CHAPTERS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl border border-line/50 bg-surface/40 p-5 backdrop-blur-sm transition hover:border-ch hover:aura-blush"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="icon-chip">
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {String(i + 1).padStart(2, "0")} &middot; {c.chip}
                  </span>
                </div>
                <h3 className="font-display text-xl font-normal italic text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {c.body}
                </p>
              </motion.div>
            );
          })}
        </RevealItem>

        <div className="mt-16 grid gap-14 md:grid-cols-[1.4fr_1fr]">
          <RevealItem className="relative space-y-5 text-[17px] leading-[1.75] text-ink/85">
            <p className="dropcap">
              I started programming because I wanted to make the small things on
              a screen behave the way I expected them to. A button that
              didn&rsquo;t flinch when you hovered. A list that knew when to stop
              loading. The kind of details nobody mentions until they break.
            </p>
            <p>
              Since then I&rsquo;ve worked across the full stack &mdash; modelling
              data, writing APIs, shipping interfaces &mdash; and learned that
              the parts I love most are at the seams: where a typeface meets a
              transition, where a payload meets a render. The boring middle is
              where the magic hides.
            </p>
            <p>
              These days I&rsquo;m most curious about{" "}
              <span className="highlight">tools for thinking</span>, motion as
              a language, and how to make software that ages gracefully. If you
              care about any of those, we&rsquo;ll get along.
            </p>
            <p className="handwritten absolute -right-4 top-2 hidden w-40 -rotate-3 text-xl text-ch md:block">
              ← still figuring half of this out, honestly
            </p>
          </RevealItem>

          <div ref={ref} className="relative">
            <h3 className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
              <LeafIcon size={12} className="text-ch" />
              Things I reach for &nbsp;&middot;&nbsp; hover for context
            </h3>
            <ul className="space-y-4">
              {SKILLS.map((s, i) => (
                <SkillBar key={s.name} skill={s} visible={visible} index={i} />
              ))}
            </ul>
            <p className="handwritten mt-8 text-xl text-muted">
              (numbers are vibes, not benchmarks)
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}


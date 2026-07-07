"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Frontend Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const HOLD_TIME = 1400;

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), HOLD_TIME);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1)
        );
      },
      deleting ? DELETE_SPEED : TYPE_SPEED
    );
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <span className="text-accent-glow">
      {text}
      <span
        aria-hidden
        className="ml-0.5 inline-block w-[3px] animate-blink bg-accent-glow shadow-[0_0_10px_rgb(var(--color-accent-glow)/0.9)] align-[-0.1em] h-[1em]"
      />
    </span>
  );
}

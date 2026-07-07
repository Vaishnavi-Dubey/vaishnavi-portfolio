"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Liquid cursor: a snappy dot, a blurred "blob" that follows with a soft
 * spring, and a ring that magnetically snaps onto interactive targets.
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const tx = useMotionValue(-100); // magnetic target x
  const ty = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 700, damping: 32, mass: 0.25 });
  const dotY = useSpring(y, { stiffness: 700, damping: 32, mass: 0.25 });
  const ringX = useSpring(tx, { stiffness: 220, damping: 22, mass: 0.6 });
  const ringY = useSpring(ty, { stiffness: 220, damping: 22, mass: 0.6 });
  const blobX = useSpring(x, { stiffness: 90, damping: 18, mass: 1.1 });
  const blobY = useSpring(y, { stiffness: 90, damping: 18, mass: 1.1 });

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const lastTarget = useRef<Element | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    // Signal to CSS that the custom cursor is active so we can hide the system one.
    document.body.dataset.cursorReady = "true";
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const el = e.target as Element | null;
      const interactive = el?.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      ) as HTMLElement | null;

      if (interactive) {
        const r = interactive.getBoundingClientRect();
        // Magnetic snap: ring blends toward target center
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        tx.set(cx + (e.clientX - cx) * 0.25);
        ty.set(cy + (e.clientY - cy) * 0.25);
      } else {
        tx.set(e.clientX);
        ty.set(e.clientY);
      }

      if (el !== lastTarget.current) {
        lastTarget.current = el;
        setHovering(Boolean(interactive));
      }
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y, tx, ty, visible]);

  if (!enabled) return null;

  const ringSize = hovering ? 56 : 28;
  const dotSize = pressed ? 4 : 6;

  return (
    <>
      {/* Soft liquid blob (trails behind) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99]"
        style={{ x: blobX, y: blobY, opacity: visible ? 0.7 : 0 }}
      >
        <div
          style={{
            transform: "translate(-50%, -50%)",
            width: 90,
            height: 90,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle at 50% 50%, rgb(var(--color-accent-glow) / 0.55), transparent 60%)",
            filter: "blur(18px)",
          }}
        />
      </motion.div>

      {/* Magnetic ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.svg
          width={ringSize}
          height={ringSize}
          viewBox="0 0 56 56"
          animate={{ width: ringSize, height: ringSize, rotate: hovering ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <defs>
            <linearGradient id="cursorRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgb(var(--color-accent-glow))" />
              <stop offset="100%" stopColor="rgb(var(--color-accent))" />
            </linearGradient>
          </defs>
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="url(#cursorRing)"
            strokeWidth={hovering ? 1.5 : 1.25}
            strokeDasharray={hovering ? "6 6" : "0"}
            opacity={hovering ? 0.95 : 0.75}
          />
        </motion.svg>
      </motion.div>

      {/* Snappy dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          animate={{ width: dotSize, height: dotSize }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          style={{
            transform: "translate(-50%, -50%)",
            background: "rgb(var(--color-accent))",
            boxShadow: "0 0 14px rgb(var(--color-accent-glow) / 0.9)",
            borderRadius: "9999px",
          }}
        />
      </motion.div>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * StudioScene — an illustrated SVG hero scene.
 * A stylised window opening onto a night sky / golden hour, with a
 * desk in front: laptop with glow, a stack of books, a plant.
 * Parallax: layers shift slightly with mouse position to give depth.
 */
export default function StudioScene() {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position normalised to [-1, 1]
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Springs make the parallax feel like physical objects, not maths
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  // Per-layer translate amounts (px). Smaller = further back.
  const layer = (depth: number) => ({
    x: useTransform(sx, (v) => v * depth),
    y: useTransform(sy, (v) => v * depth * 0.6),
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, nx)));
      my.set(Math.max(-1, Math.min(1, ny)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const sky = layer(8);     // sky stars - barely move
  const sun = layer(16);    // sun - medium parallax
  const window_ = layer(4); // window frame - subtle
  const desk = layer(-6);   // desk - slight inverse for depth
  const laptop = layer(-12);// laptop nearest - inverse, stronger

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[5/6] w-full max-w-md"
    >
      {/* Outer aura */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgb(var(--c-gold) / 0.45), transparent 55%)",
        }}
        aria-hidden
      />

      {/* The scene */}
      <svg
        viewBox="0 0 400 480"
        className="relative h-full w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
        aria-label="Illustration: a desk by a window at golden hour"
      >
        <defs>
          {/* Sky gradient: night-into-dawn */}
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(35 46 95)" />
            <stop offset="60%" stopColor="rgb(94 76 142)" />
            <stop offset="100%" stopColor="rgb(255 193 94)" />
          </linearGradient>
          {/* Sun radial */}
          <radialGradient id="sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(255 246 220)" />
            <stop offset="50%" stopColor="rgb(255 193 94)" />
            <stop offset="100%" stopColor="rgb(255 107 107)" />
          </radialGradient>
          {/* Window glow gradient on glass */}
          <linearGradient id="glassGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(255 220 150 / 0.35)" />
            <stop offset="100%" stopColor="rgb(255 220 150 / 0)" />
          </linearGradient>
          {/* Laptop screen glow */}
          <radialGradient id="screen" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgb(255 230 170)" />
            <stop offset="100%" stopColor="rgb(255 193 94 / 0.4)" />
          </radialGradient>
          {/* Ray fan */}
          <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgb(255 220 150 / 0.55)" />
            <stop offset="100%" stopColor="rgb(255 220 150 / 0)" />
          </linearGradient>
        </defs>

        {/* === SKY (window pane content) === */}
        <motion.g style={{ x: sky.x, y: sky.y }}>
          <rect x="60" y="40" width="280" height="240" fill="url(#sky)" rx="6" />
          {/* stars */}
          {STARS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="rgb(250 245 228)" opacity={s.o}>
              <animate attributeName="opacity" values={`${s.o};${s.o * 0.3};${s.o}`} dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* tiny constellation lines */}
          <polyline points="120,90 145,80 168,98 192,82" fill="none" stroke="rgb(250 245 228 / 0.25)" strokeWidth="0.8" />
        </motion.g>

        {/* === SUN === */}
        <motion.g style={{ x: sun.x, y: sun.y }}>
          {/* outer halo */}
          <circle cx="260" cy="200" r="68" fill="rgb(255 193 94 / 0.18)" />
          <circle cx="260" cy="200" r="50" fill="rgb(255 193 94 / 0.30)" />
          {/* sun core */}
          <circle cx="260" cy="200" r="34" fill="url(#sun)">
            <animate attributeName="r" values="34;36;34" dur="6s" repeatCount="indefinite" />
          </circle>
          {/* little moon, smaller, top-left of window */}
          <circle cx="115" cy="95" r="14" fill="rgb(250 245 228 / 0.92)" />
          <circle cx="120" cy="92" r="10" fill="rgb(35 46 95)" opacity="0.55" />
        </motion.g>

        {/* === LIGHT RAYS pouring through window === */}
        <g style={{ mixBlendMode: "screen" }} opacity="0.9">
          <polygon points="260,200 130,520 200,520" fill="url(#ray)" opacity="0.35" />
          <polygon points="260,200 200,520 270,520" fill="url(#ray)" opacity="0.25" />
          <polygon points="260,200 240,520 310,520" fill="url(#ray)" opacity="0.30" />
          <polygon points="260,200 290,520 360,520" fill="url(#ray)" opacity="0.20" />
        </g>

        {/* === WINDOW FRAME === */}
        <motion.g style={{ x: window_.x, y: window_.y }}>
          <rect x="56" y="36" width="288" height="248" fill="none" stroke="rgb(46 57 110)" strokeWidth="6" rx="8" />
          {/* mullions */}
          <line x1="200" y1="40" x2="200" y2="280" stroke="rgb(46 57 110)" strokeWidth="4" />
          <line x1="60"  y1="160" x2="340" y2="160" stroke="rgb(46 57 110)" strokeWidth="4" />
          {/* glass glow overlay */}
          <rect x="60" y="40" width="280" height="240" fill="url(#glassGlow)" rx="6" />
          {/* sill */}
          <rect x="40" y="278" width="320" height="14" fill="rgb(35 46 95)" rx="3" />
        </motion.g>

        {/* === DESK + OBJECTS === */}
        <motion.g style={{ x: desk.x, y: desk.y }}>
          {/* Desk surface */}
          <rect x="20" y="358" width="360" height="14" fill="rgb(35 46 95)" rx="3" />
          <rect x="20" y="358" width="360" height="4"  fill="rgb(255 193 94 / 0.4)" />

          {/* Plant — left of desk */}
          <g transform="translate(78 300)">
            {/* pot */}
            <path d="M -20 50 L 20 50 L 16 70 L -16 70 Z" fill="rgb(255 107 107)" />
            <ellipse cx="0" cy="50" rx="20" ry="3" fill="rgb(214 70 70)" />
            {/* leaves */}
            <path d="M 0 50 C -8 30, -22 20, -28 4"  stroke="rgb(148 201 169)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 0 50 C 6 28, 18 18, 22 0"     stroke="rgb(148 201 169)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 0 50 C 0 20, 2 4, 4 -16"      stroke="rgb(148 201 169)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="-22" cy="6"  rx="8" ry="14" fill="rgb(148 201 169)" transform="rotate(-30 -22 6)" />
            <ellipse cx="22"  cy="2"  rx="8" ry="14" fill="rgb(148 201 169)" transform="rotate(30 22 2)" />
            <ellipse cx="4"   cy="-14" rx="7" ry="12" fill="rgb(148 201 169)" />
          </g>

          {/* Stack of books — right of desk */}
          <g transform="translate(310 330)">
            <rect x="-30" y="20" width="60" height="10" rx="1" fill="rgb(183 156 237)" />
            <rect x="-26" y="10" width="56" height="10" rx="1" fill="rgb(244 166 166)" />
            <rect x="-32" y="0"  width="64" height="10" rx="1" fill="rgb(148 201 169)" />
            {/* spine details */}
            <line x1="-26" y1="25" x2="26" y2="25" stroke="rgb(11 16 43)" strokeWidth="0.5" opacity="0.4" />
            <line x1="-22" y1="15" x2="26" y2="15" stroke="rgb(11 16 43)" strokeWidth="0.5" opacity="0.4" />
            {/* a coffee mug atop */}
            <g transform="translate(0 -12)">
              <rect x="-10" y="0" width="20" height="14" rx="2" fill="rgb(250 245 228)" />
              <path d="M 10 3 Q 16 7 10 11" stroke="rgb(250 245 228)" strokeWidth="2" fill="none" />
              <rect x="-8" y="1" width="16" height="3" fill="rgb(120 80 60)" />
              {/* steam */}
              <path d="M -3 -3 Q -5 -8 -1 -10" stroke="rgb(250 245 228 / 0.6)" strokeWidth="1.2" fill="none">
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.5s" repeatCount="indefinite" />
              </path>
              <path d="M 3 -3 Q 5 -8 1 -10" stroke="rgb(250 245 228 / 0.6)" strokeWidth="1.2" fill="none">
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
              </path>
            </g>
          </g>
        </motion.g>

        {/* === LAPTOP === */}
        <motion.g style={{ x: laptop.x, y: laptop.y }}>
          {/* glow halo behind laptop */}
          <ellipse cx="200" cy="340" rx="90" ry="20" fill="rgb(255 193 94 / 0.35)" filter="blur(2px)" />
          {/* base */}
          <rect x="125" y="350" width="150" height="10" rx="3" fill="rgb(154 165 201)" />
          {/* lid */}
          <rect x="135" y="290" width="130" height="62" rx="4" fill="rgb(46 57 110)" />
          <rect x="140" y="294" width="120" height="54" rx="2" fill="url(#screen)" />
          {/* code lines on screen */}
          <g opacity="0.85" fontFamily="ui-monospace, monospace" fontSize="5">
            <rect x="146" y="300" width="40" height="2" fill="rgb(244 166 166)" rx="1" />
            <rect x="146" y="306" width="68" height="2" fill="rgb(148 201 169)" rx="1" />
            <rect x="152" y="312" width="56" height="2" fill="rgb(183 156 237)" rx="1" />
            <rect x="152" y="318" width="40" height="2" fill="rgb(255 220 150)" rx="1" />
            <rect x="146" y="324" width="72" height="2" fill="rgb(148 201 169)" rx="1" />
            <rect x="146" y="330" width="30" height="2" fill="rgb(244 166 166)" rx="1" />
            {/* blinking cursor */}
            <rect x="180" y="330" width="2" height="6" fill="rgb(255 246 229)">
              <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
            </rect>
          </g>
          {/* keyboard hint line */}
          <rect x="125" y="358" width="150" height="2" fill="rgb(35 46 95)" rx="1" />
        </motion.g>
      </svg>

      {/* Floating handwritten labels — pinned to features */}
      <p
        className="handwritten absolute -left-2 top-[22%] hidden rotate-[-8deg] text-xl text-[rgb(var(--c-gold))] sm:block"
        aria-hidden
      >
        ← the sun, always rising
      </p>
      <p
        className="handwritten absolute -right-2 bottom-[24%] hidden rotate-[6deg] text-xl text-[rgb(var(--c-sage))] sm:block"
        aria-hidden
      >
        a fern I keep alive →
      </p>
    </div>
  );
}

const STARS = [
  { x:  85, y:  70, r: 1.4, o: 0.85 },
  { x: 140, y:  55, r: 1.0, o: 0.65 },
  { x: 170, y:  90, r: 1.6, o: 0.95 },
  { x: 220, y:  60, r: 1.0, o: 0.55 },
  { x: 305, y:  80, r: 1.2, o: 0.75 },
  { x: 320, y: 130, r: 0.9, o: 0.55 },
  { x:  90, y: 130, r: 1.1, o: 0.75 },
  { x: 110, y: 180, r: 1.6, o: 0.90 },
  { x: 195, y: 140, r: 0.9, o: 0.6 },
  { x: 290, y: 240, r: 1.0, o: 0.65 },
  { x:  70, y: 230, r: 0.8, o: 0.5 },
  { x: 170, y: 250, r: 1.2, o: 0.7 },
];

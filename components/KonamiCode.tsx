"use client";

import { useEffect, useRef } from "react";

const SEQ = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; color: string; size: number;
};

const COLORS = [
  "#7C3AED", "#A879FF", "#C4A8FF", "#F0EEF8",
  "#22d3ee", "#f472b6", "#34d399", "#facc15",
];

export default function KonamiCode() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const indexRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const burst = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const N = 220;
      for (let i = 0; i < N; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 8;
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          life: 0,
          maxLife: 80 + Math.random() * 60,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 3 + Math.random() * 4,
        });
      }
      // Side cannons
      for (const side of [0, window.innerWidth]) {
        for (let i = 0; i < 80; i++) {
          const dir = side === 0 ? 1 : -1;
          particlesRef.current.push({
            x: side,
            y: window.innerHeight,
            vx: (4 + Math.random() * 6) * dir,
            vy: -(8 + Math.random() * 6),
            life: 0,
            maxLife: 100 + Math.random() * 60,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            size: 3 + Math.random() * 4,
          });
        }
      }
      ensureLoop();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particlesRef.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life++;
        p.vy += 0.18; // gravity
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.life >= p.maxLife || p.y > window.innerHeight + 40) {
          ps.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;
      if (ps.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const ensureLoop = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    const onKey = (e: KeyboardEvent) => {
      const expected = SEQ[indexRef.current];
      const got = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (got === expected) {
        indexRef.current++;
        if (indexRef.current === SEQ.length) {
          indexRef.current = 0;
          burst();
        }
      } else {
        indexRef.current = got === SEQ[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80]"
    />
  );
}

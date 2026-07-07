"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (e?: React.MouseEvent) => void;
  variant?: Variant;
  className?: string;
  external?: boolean;
  strength?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const baseStyles =
  "relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[13px] font-medium tracking-wide transition-all will-change-transform select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-base hover:bg-accent hover:text-base",
  secondary:
    "border border-line/70 text-ink/85 bg-transparent hover:border-accent hover:text-accent",
  ghost:
    "text-ink/70 hover:text-accent underline-offset-4 hover:underline decoration-accent/70",
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  external = false,
  strength = 0.35,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const textSpringX = useSpring(tx, { stiffness: 260, damping: 20, mass: 0.3 });
  const textSpringY = useSpring(ty, { stiffness: 260, damping: 20, mass: 0.3 });

  const [active, setActive] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    x.set(dx); y.set(dy);
    tx.set(dx * 0.4); ty.set(dy * 0.4);
  };
  const reset = () => {
    x.set(0); y.set(0); tx.set(0); ty.set(0);
    setActive(false);
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    }
    onClick?.(e);
  };

  const inner = (
    <motion.div
      ref={ref}
      data-cursor="hover"
      onMouseMove={handleMove}
      onMouseEnter={() => !disabled && setActive(true)}
      onMouseLeave={reset}
      onClick={!href ? onClick : undefined}
      style={{ x: springX, y: springY }}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "pointer-events-none opacity-60" : ""} ${className}`}
      role={!href ? "button" : undefined}
    >
      <motion.span
        style={{ x: textSpringX, y: textSpringY }}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
      {variant === "primary" && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{ opacity: active ? 0.6 : 0, scale: active ? 1.04 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgb(var(--color-accent) / 0.35), transparent 70%)",
            filter: "blur(16px)",
          }}
        />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={handleAnchorClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="inline-block"
        aria-disabled={disabled || undefined}
      >
        {inner}
      </a>
    );
  }

  if (type !== "button") {
    // Render a real <button> for forms (submit/reset). The motion.div is decorative.
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="inline-block bg-transparent p-0 border-0"
      >
        {inner}
      </button>
    );
  }

  return inner;
}

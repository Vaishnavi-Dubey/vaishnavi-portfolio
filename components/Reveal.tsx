"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "header" | "footer";
  amount?: number;
  once?: boolean;
  id?: string;
};

export function Reveal({
  children,
  className,
  as = "div",
  amount = 0.2,
  once = true,
  id,
}: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      id={id}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "li" | "span" | "a";
  delay?: number;
};

export function RevealItem({
  children,
  className,
  as = "div",
  delay,
}: RevealItemProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      variants={itemVariants}
      transition={
        delay !== undefined
          ? { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
          : undefined
      }
    >
      {children}
    </Component>
  );
}

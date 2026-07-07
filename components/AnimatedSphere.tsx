"use client";

import { motion } from "framer-motion";

/**
 * Cinematic CSS animated sphere. Uses radial gradients + framer-motion
 * to fake a parallax 3D orb without pulling in three.js. Good perf,
 * looks at home in the violet/dark theme.
 */
export default function AnimatedSphere() {
  return (
    <div
      aria-hidden
      className="relative aspect-square w-full max-w-md mx-auto"
    >
      {/* Outer pulsing aura */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(var(--color-accent) / 0.45), transparent 60%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating orbit ring */}
      <motion.div
        className="absolute inset-6 rounded-full border border-accent/30"
        style={{
          borderStyle: "dashed",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-14 rounded-full border border-accent/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Core sphere */}
      <motion.div
        className="absolute inset-12 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgb(var(--color-accent-glow)) 0%, rgb(var(--color-accent)) 35%, rgb(15,10,40) 75%, rgb(5,5,15) 100%)",
          boxShadow:
            "inset -20px -30px 60px rgba(0,0,0,0.7), inset 25px 25px 60px rgb(var(--color-accent-glow)/0.25), 0 0 90px rgb(var(--color-accent)/0.55)",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Specular highlight */}
        <div
          className="absolute left-[20%] top-[18%] h-[28%] w-[28%] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </motion.div>

      {/* Floating satellite dot */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-glow shadow-[0_0_18px_rgb(var(--color-accent-glow)/0.9)]"
        animate={{
          x: [0, 130, 0, -130, 0],
          y: [-130, 0, 130, 0, -130],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

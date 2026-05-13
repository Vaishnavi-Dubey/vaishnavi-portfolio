import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

/**
 * Hero — Cinematic opening sequence:
 *   1. Section label fades in
 *   2. Headline reveals word by word with stagger
 *   3. Subtitle types in
 *   4. CTA button materializes with glow
 *   5. Scroll indicator pulses
 *   6. CTA has magnetic cursor attraction
 */

const titleWords = ['Building', 'Intelligent', 'Systems'];
const subtitleWords = ['with', 'Code', '&', 'AI'];

const wordVariant = {
  hidden: { y: 80, opacity: 0, rotateX: 40 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: 0.6 + i * 0.12,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

const Hero = () => {
  const ctaRef = useRef(null);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    'Full Stack Developer',
    'ML Engineer',
    'AI Enthusiast',
    'Problem Solver',
  ];

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Magnetic cursor effect on CTA
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;

    const handleMouse = (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.2;
      const deltaY = (e.clientY - centerY) * 0.2;
      magneticX.set(deltaX);
      magneticY.set(deltaY);
    };

    const handleLeave = () => {
      magneticX.set(0);
      magneticY.set(0);
    };

    btn.addEventListener('mousemove', handleMouse);
    btn.addEventListener('mouseleave', handleLeave);
    return () => {
      btn.removeEventListener('mousemove', handleMouse);
      btn.removeEventListener('mouseleave', handleLeave);
    };
  }, [magneticX, magneticY]);

  return (
    <section
      id="hero"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 var(--space-4)',
        overflow: 'hidden',
      }}
    >
      {/* Perspective grid floor */}
      <div className="grid-bg" />

      {/* Radial glow behind headline */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ zIndex: 10, maxWidth: '1000px' }}>
        {/* Section marker */}
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          Vaishnavi Dubey
        </motion.div>

        {/* Main headline — word-by-word reveal */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-4)',
            perspective: '600px',
          }}
        >
          {titleWords.map((word, i) => (
            <span key={word} style={{ display: 'inline-block', overflow: 'hidden', marginRight: 'clamp(12px, 1.5vw, 24px)' }}>
              <motion.span
                style={{ display: 'inline-block', willChange: 'transform' }}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariant}
              >
                {word === 'Intelligent' ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
          <br />
          {subtitleWords.map((word, i) => (
            <span key={word + i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: 'clamp(8px, 1vw, 16px)' }}>
              <motion.span
                style={{
                  display: 'inline-block',
                  willChange: 'transform',
                  fontSize: 'clamp(2rem, 5vw, 4.2rem)',
                  color: 'var(--text-secondary)',
                  fontWeight: 700,
                }}
                custom={i + titleWords.length}
                initial="hidden"
                animate="visible"
                variants={wordVariant}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Rotating role badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6, ease: [0.23, 1, 0.32, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-8)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
            }}
          />
          <motion.span
            key={roleIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.04em',
            }}
          >
            {roles[roleIndex]}
          </motion.span>
        </motion.div>

        {/* CTA — magnetic button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.a
            ref={ctaRef}
            href="#work"
            className="glass-panel glow-pulse"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '16px 32px',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              color: 'var(--text-primary)',
              border: '1px solid var(--violet)',
              borderRadius: '12px',
              cursor: 'pointer',
              willChange: 'transform',
              x: magneticX,
              y: magneticY,
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>View Projects</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: 'rotate(-45deg)' }}>
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div style={{ width: '1px', height: '40px', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '50%',
              background: 'var(--violet)',
            }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

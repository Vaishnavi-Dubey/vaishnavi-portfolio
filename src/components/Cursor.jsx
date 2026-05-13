import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cursor — Dual-element cursor system:
 *   • Inner dot: snappy, follows cursor tightly
 *   • Outer ring: floaty, trails behind with spring physics
 *   • Ring expands on interactive element hover
 *   • Hidden on touch devices
 */
const Cursor = () => {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  // Outer ring uses softer springs for trailing effect
  const ringX = useSpring(dotX, { damping: 30, stiffness: 200 });
  const ringY = useSpring(dotY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    // Hide on touch-only devices
    const isTouchDevice = 'ontouchstart' in window && navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(el => {
        el.style.display = 'none';
      });
      return;
    }

    const moveCursor = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const ring = document.querySelector('.cursor-ring');

    const handleOver = (e) => {
      const target = e.target;
      if (target.closest('a') || target.closest('button') || target.tagName === 'A' || target.tagName === 'BUTTON') {
        ring?.classList.add('hovered');
      } else {
        ring?.classList.remove('hovered');
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [dotX, dotY]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          translateX: dotX,
          translateY: dotY,
          x: '-50%',
          y: '-50%',
        }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          translateX: ringX,
          translateY: ringY,
          x: '-50%',
          y: '-50%',
        }}
      />
    </>
  );
};

export default Cursor;

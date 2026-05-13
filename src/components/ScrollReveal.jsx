import { useEffect } from 'react';

/**
 * ScrollReveal — Global IntersectionObserver for .reveal elements.
 * Adds 'visible' class when elements enter viewport with staggered delays.
 * Uses translateY(40px) + opacity 0 → natural position (defined in CSS).
 */
const ScrollReveal = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show everything immediately
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get stagger delay from data attribute
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null; // This component only registers the observer
};

export default ScrollReveal;

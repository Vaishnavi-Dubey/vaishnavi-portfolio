import { useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

/**
 * Contact — Large typographic CTA with magnetic button.
 * Social links as a horizontal row with hover animations.
 * Feels like the final chapter — a sign-off, not a form.
 */

const socials = [
  { label: 'GitHub', href: 'https://github.com/Vaishnavi-Dubey', icon: '⟶' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vaishnavi-dubey', icon: '⟶' },
  { label: 'Email', href: 'mailto:vaishnavidubey1290@gmail.com', icon: '⟶' },
];

const Contact = () => {
  const btnRef = useRef(null);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouse = (e) => {
      const rect = btn.getBoundingClientRect();
      const deltaX = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
      const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
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
      id="contact"
      style={{
        padding: 'var(--space-16) 0',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Tiny label */}
        <div
          className="reveal"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--violet-soft)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-4)',
          }}
        >
          What's next?
        </div>

        {/* Big headline */}
        <h2
          className="reveal"
          data-delay="80"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-6)',
          }}
        >
          Let's build<br />
          <span className="text-gradient">something great.</span>
        </h2>

        {/* Magnetic CTA */}
        <div className="reveal" data-delay="160">
          <motion.a
            ref={btnRef}
            href="mailto:vaishnavidubey1290@gmail.com"
            className="glow-pulse"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '18px 40px',
              fontSize: '1rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: '#fff',
              background: 'var(--violet)',
              border: 'none',
              borderRadius: '14px',
              cursor: 'pointer',
              textDecoration: 'none',
              willChange: 'transform',
              x: magneticX,
              y: magneticY,
            }}
          >
            Say Hello
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>

        {/* Social links */}
        <div
          className="reveal"
          data-delay="240"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-5)',
            marginTop: 'var(--space-8)',
          }}
        >
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: 'var(--violet-soft)' }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}
            >
              {social.label}
              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{social.icon}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { motion } from 'framer-motion';

/**
 * Education — Singular feature card with large typography.
 * Not a list (only one university). Designed as a
 * statement piece — the entire section IS the card.
 */

const Education = () => {
  return (
    <section id="education" style={{ padding: 'var(--space-12) 0', position: 'relative' }}>
      <div className="container">
        <div className="section-label reveal">Education</div>

        <motion.div
          className="glass-panel reveal"
          data-delay="80"
          whileHover={{ borderColor: 'var(--glass-border-hover)' }}
          transition={{ duration: 0.2 }}
          style={{
            padding: 'var(--space-8)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background accent */}
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'var(--amber)',
              opacity: 0.04,
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 'var(--space-6)',
              alignItems: 'start',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--amber)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-2)',
                  display: 'block',
                }}
              >
                2022 — Present
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 'var(--space-2)',
                }}
              >
                B.Tech Computer Science<br />
                <span className="text-gradient">Engineering</span>
              </h3>

              <h4
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 400,
                  marginBottom: 'var(--space-3)',
                }}
              >
                University of Petroleum and Energy Studies (UPES), Dehradun
              </h4>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  maxWidth: '600px',
                }}
              >
                Specialization in <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Artificial Intelligence & Machine Learning</span>.
                Deep focus on algorithms, neural architectures, NLP, and building
                data-driven systems that scale.
              </p>
            </div>

            {/* Visual emblem */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, var(--violet), var(--amber))',
                opacity: 0.15,
                flexShrink: 0,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;

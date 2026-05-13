import { motion } from 'framer-motion';

/**
 * Achievements — Two asymmetric glass cards side-by-side.
 * Left card is taller (primary achievement), right is smaller.
 * Each has a unique accent color on the top border and
 * a type badge.
 */

const achievements = [
  {
    type: 'Leadership',
    title: 'President of Sports Committee',
    org: 'University of Petroleum and Energy Studies',
    description:
      'Led the university\'s sports committee, organizing large-scale events and fostering student engagement in athletics across multiple disciplines.',
    accent: 'var(--amber)',
    icon: '◆',
  },
  {
    type: 'Hackathon',
    title: 'Top 5 Finalist',
    org: 'Internal Smart India Hackathon',
    description:
      'Secured a top 5 position among 330+ teams, demonstrating innovative problem-solving and rapid prototyping under 24-hour constraints.',
    accent: 'var(--violet)',
    icon: '◇',
  },
];

const Achievements = () => {
  return (
    <section id="achievements" style={{ padding: 'var(--space-12) 0', position: 'relative' }}>
      <div className="container">
        <div className="section-label reveal">Recognition</div>
        <h2 className="section-heading reveal" data-delay="80">
          Beyond <span className="text-gradient">the code.</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 'var(--space-3)',
          }}
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="glass-panel reveal"
              data-delay={index * 100}
              whileHover={{
                scale: 1.02,
                borderColor: 'var(--glass-border-hover)',
              }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              style={{
                padding: 'var(--space-5)',
                borderTop: `2px solid ${item.accent}`,
                position: 'relative',
                overflow: 'hidden',
                willChange: 'transform',
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '160px',
                  height: '80px',
                  background: item.accent,
                  opacity: 0.06,
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Type badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  background: `${item.accent}12`,
                  border: `1px solid ${item.accent}22`,
                  marginBottom: 'var(--space-3)',
                }}
              >
                <span style={{ fontSize: '0.7rem', color: item.accent }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: item.accent,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.type}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  marginBottom: '6px',
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h3>

              <h4
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-dim)',
                  marginBottom: 'var(--space-3)',
                  fontWeight: 400,
                }}
              >
                {item.org}
              </h4>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

import { motion } from 'framer-motion';

/**
 * Experience — Vertical timeline with connecting line.
 * Each entry has a glowing dot on the timeline and
 * alternating glass panels. Clean, editorial feel.
 */

const experiences = [
  {
    period: 'Jun 2025 — Jul 2025',
    role: 'AI Intern',
    company: 'NASSCOM (GenAI Program)',
    description:
      'Gained hands-on experience with LLMs and prompt engineering. Participated in research on Generative AI trends and enterprise adoption patterns.',
    tags: ['LLMs', 'Prompt Engineering', 'GenAI'],
    type: 'work',
  },
  {
    period: 'Jun 2023 — Jul 2023',
    role: 'Social Intern',
    company: 'Maa Narmada Vriddha Ashralaya',
    description:
      'Assisted in daily care and engagement activities for elderly residents. Organized wellness programs and community outreach initiatives.',
    tags: ['Community Service', 'Leadership', 'Outreach'],
    type: 'volunteer',
  },
];

const Experience = () => {
  return (
    <section id="experience" style={{ padding: 'var(--space-16) 0', position: 'relative' }}>
      <div className="container">
        <div className="section-label reveal">Journey</div>
        <h2 className="section-heading reveal" data-delay="80">
          Where I've <span className="text-gradient">been.</span>
        </h2>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 'var(--space-8)' }}>
          {/* Vertical line */}
          <div
            className="reveal"
            style={{
              position: 'absolute',
              left: '15px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, var(--violet), transparent)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="reveal"
                data-delay={index * 100}
                style={{ position: 'relative' }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: 'calc(-1 * var(--space-8) + 10px)',
                    top: 'var(--space-5)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--violet)',
                    boxShadow: '0 0 12px var(--violet-glow)',
                    border: '2px solid var(--void)',
                  }}
                />

                {/* Card */}
                <motion.div
                  className="glass-panel"
                  whileHover={{ scale: 1.01, borderColor: 'var(--glass-border-hover)' }}
                  transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    padding: 'var(--space-5)',
                    willChange: 'transform',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          marginBottom: '4px',
                        }}
                      >
                        {exp.role}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.95rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {exp.company}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--violet-soft)',
                        letterSpacing: '0.04em',
                        padding: '4px 12px',
                        background: 'rgba(124, 58, 237, 0.08)',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          color: 'var(--text-dim)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

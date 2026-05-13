import { motion } from 'framer-motion';

/**
 * Skills — Horizontal scrolling skill orbit with categorized groups.
 * Layout: Each category is a frosted glass panel with skills as
 * interactive pills that glow on hover. NOT a generic card grid.
 * Layout alternates between wide and narrow panels.
 */

const skillGroups = [
  {
    category: 'Languages',
    icon: '⟨⟩',
    skills: ['Python', 'C++', 'Java', 'JavaScript'],
    accent: 'var(--violet)',
  },
  {
    category: 'Web & Backend',
    icon: '◈',
    skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'HTML', 'CSS'],
    accent: 'var(--amber)',
  },
  {
    category: 'AI / ML',
    icon: '◉',
    skills: ['NumPy', 'Pandas', 'Scikit-Learn', 'NLP', 'Matplotlib', 'Transformers'],
    accent: '#22c55e',
  },
  {
    category: 'DevOps & Tools',
    icon: '⊡',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux'],
    accent: 'var(--violet-soft)',
  },
];

const Skills = () => {
  return (
    <section id="skills" style={{ padding: 'var(--space-16) 0', position: 'relative' }}>
      <div className="container">
        <div className="section-label reveal">Toolkit</div>
        <h2 className="section-heading reveal" data-delay="80">
          Technologies I <span className="text-gradient">think in.</span>
        </h2>

        {/* Staggered masonry-style layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-3)',
          }}
        >
          {skillGroups.map((group, gIndex) => (
            <div
              key={group.category}
              className="glass-panel reveal"
              data-delay={gIndex * 70}
              style={{
                padding: 'var(--space-5)',
                position: 'relative',
                overflow: 'hidden',
                gridColumn: gIndex === 1 ? 'span 1' : undefined,
              }}
            >
              {/* Category glow accent */}
              <div
                style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: group.accent,
                  opacity: 0.06,
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <span style={{ fontSize: '1.2rem', color: group.accent, fontFamily: 'var(--font-mono)' }}>
                  {group.icon}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skill pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {group.skills.map((skill, sIndex) => (
                  <motion.span
                    key={skill}
                    whileHover={{
                      scale: 1.06,
                      borderColor: group.accent,
                      boxShadow: `0 0 16px ${group.accent}33`,
                    }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--glass-border)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-secondary)',
                      cursor: 'default',
                      willChange: 'transform',
                      transition: 'border-color 150ms, box-shadow 150ms',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

import { motion } from 'framer-motion';

/**
 * Projects — Editorial case-study layout.
 * Each project is a full-width horizontal panel with alternating
 * image placement. NOT a card grid. Each one feels like a portfolio
 * spread you'd see in a design magazine.
 */

const projects = [
  {
    title: 'Deep Learning',
    subtitle: 'Sentiment Analysis & Hate Speech Detection',
    description:
      'Built transformer-based models for sentiment classification and hate speech detection. Trained on real-world datasets with custom preprocessing pipelines.',
    tags: ['Python', 'Transformers', 'NLP', 'Jupyter'],
    link: 'https://github.com/Vaishnavi-Dubey/Deep-Learning',
    accent: 'var(--violet)',
    number: '01',
  },
  {
    title: 'Disney+ Clone',
    subtitle: 'Pixel-Perfect React Streaming Interface',
    description:
      'A fully responsive recreation of the Disney+ streaming platform UI, built from scratch with React and modern CSS. Features carousels, hover effects, and responsive grid layouts.',
    tags: ['React', 'JavaScript', 'CSS', 'Responsive'],
    link: 'https://github.com/Vaishnavi-Dubey/ReactJs',
    accent: 'var(--amber)',
    number: '02',
  },
  {
    title: 'Disease Detection',
    subtitle: 'ML-Powered Medical Classification',
    description:
      'Predictive machine learning models for disease classification and early detection. Implemented multiple classifiers with comparative analysis and feature engineering.',
    tags: ['Python', 'Scikit-Learn', 'ML', 'Healthcare'],
    link: 'https://github.com/Vaishnavi-Dubey/Machine-Learning-',
    accent: '#22c55e',
    number: '03',
  },
  {
    title: 'DSA Library',
    subtitle: 'Comprehensive Algorithm Implementations',
    description:
      'A structured collection of data structures and algorithms implemented in Java. Covers sorting, searching, graph algorithms, dynamic programming, and more.',
    tags: ['Java', 'Algorithms', 'Data Structures'],
    link: 'https://github.com/Vaishnavi-Dubey/Data-Structures-and-Algorithms',
    accent: 'var(--violet-soft)',
    number: '04',
  },
];

const Projects = () => {
  return (
    <section id="work" style={{ padding: 'var(--space-16) 0', position: 'relative' }}>
      <div className="container">
        <div className="section-label reveal">Selected Work</div>
        <h2 className="section-heading reveal" data-delay="80">
          Projects that <span className="text-gradient">prove it.</span>
        </h2>

        {/* Project list — full-width editorial cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {projects.map((project, index) => (
            <motion.a
              key={project.number}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel reveal"
              data-delay={index * 70}
              whileHover={{ scale: 1.01, y: -4 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: index % 2 === 0 ? '80px 1fr auto' : '80px 1fr auto',
                padding: 'var(--space-5) var(--space-6)',
                gap: 'var(--space-5)',
                alignItems: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                willChange: 'transform',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Hover glow background */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${project.accent}08 0%, transparent 50%)`,
                  opacity: 0,
                  transition: 'opacity 300ms ease',
                  pointerEvents: 'none',
                }}
              />

              {/* Number */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--surface-hover)',
                  lineHeight: 1,
                }}
              >
                {project.number}
              </div>

              {/* Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)', marginBottom: '6px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: project.accent,
                    }}
                  >
                    {project.subtitle}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    maxWidth: '600px',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {project.tags.map((tag) => (
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
                        letterSpacing: '0.04em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow icon */}
              <motion.div
                whileHover={{ x: 4 }}
                style={{ color: 'var(--text-dim)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

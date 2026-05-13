import { motion } from 'framer-motion';

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: 'AI/ML', label: 'Specialization' },
  { value: 'UPES', label: 'University' },
];

const About = () => {
  return (
    <section id="about" style={{ padding: 'var(--space-16) 0', position: 'relative' }}>
      <div className="container">
        {/* Asymmetric two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'var(--space-12)',
            alignItems: 'start',
          }}
        >
          {/* Left — Label + Quote */}
          <div>
            <div className="section-label reveal">About</div>
            <h2
              className="section-heading reveal"
              data-delay="80"
              style={{ marginBottom: 'var(--space-5)' }}
            >
              I don't just write code —<br />
              <span className="text-gradient">I architect solutions.</span>
            </h2>

            {/* Stats row */}
            <div
              className="reveal"
              data-delay="200"
              style={{
                display: 'flex',
                gap: 'var(--space-6)',
                marginTop: 'var(--space-6)',
              }}
            >
              {stats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'left' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      color: 'var(--violet-soft)',
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-dim)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginTop: '4px',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Content paragraphs */}
          <div>
            <p
              className="reveal"
              data-delay="120"
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              I'm a{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                B.Tech Computer Science (AI & ML)
              </span>{' '}
              student at the University of Petroleum and Energy Studies, Dehradun.
              With a strong foundation in Python, Java, and React, I build innovative
              software and AI-driven solutions that bridge the gap between research
              and real-world impact.
            </p>

            <p
              className="reveal"
              data-delay="200"
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-5)',
              }}
            >
              I have proven leadership experience as the{' '}
              <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
                President of my university's sports committee
              </span>{' '}
              and hands-on experience with Generative AI, LLMs, and Full Stack Development.
              I believe the best software comes from understanding both the machine
              and the human it serves.
            </p>

            {/* Signature detail */}
            <div
              className="reveal"
              data-delay="280"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--glass-border)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, var(--violet), var(--amber))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                VD
              </div>
              <div>
                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  Vaishnavi Dubey
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-dim)',
                  }}
                >
                  Dehradun, India · Open to opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

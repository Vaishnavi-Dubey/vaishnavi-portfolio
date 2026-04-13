import { motion } from 'framer-motion';

const Hero = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { y: 100, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1.0,
                ease: [0.6, 0.01, -0.05, 0.95], // Custom easing for "luxury" feel
            }
        },
    };

    return (
        <section id="hero" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 5vw', position: 'relative', pointerEvents: 'none' }}>
            <div style={{ zIndex: 10, opacity: 1 }}>
                <div style={{ overflow: 'hidden', textAlign: 'center' }}>
                    <h1 className="text-gradient" style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(3rem, 6vw, 8rem)',
                        lineHeight: 1.1,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        marginBottom: '1rem',
                        textTransform: 'uppercase'
                    }}>
                        HI I'M <br />
                        <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>VAISHNAVI DUBEY</span>
                    </h1>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', pointerEvents: 'auto' }}>
                    <p style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '1.2rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        textAlign: 'center',
                        lineHeight: 1.6
                    }}>
                        Building <span style={{ color: '#fff' }}>cool things</span> with Code & AI. <br />
                        Full Stack Developer | Machine Learning Enthusiast
                    </p>

                    <a href="#work" className="glass-panel" style={{
                        padding: '1rem 2rem',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    >
                        View Projects
                    </a>
                </div>
            </div>

            <div
                style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', opacity: 1 }}
            >
                <div className="scroll-indicator" style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', background: 'var(--primary)', animation: 'scrollDown 2s infinite' }} />
                </div>
            </div>

            <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
        </section>
    );
};

export default Hero;

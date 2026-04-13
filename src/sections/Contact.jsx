import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" style={{ padding: '150px 0', textAlign: 'center' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: 'var(--primary)', fontSize: '1.2rem', marginBottom: '1rem', letterSpacing: '2px' }}>WHAT'S NEXT?</p>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        marginBottom: '3rem',
                        lineHeight: 1.1
                    }}>
                        LET'S WORK TOGETHER
                    </h2>
                    <a
                        href="mailto:vaishnavidubey1290@gmail.com"
                        className="glass-panel"
                        style={{
                            display: 'inline-block',
                            padding: '1.5rem 3rem',
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            color: 'var(--text-main)',
                            borderRadius: '50px',
                            transition: 'all 0.3s ease',
                            border: '2px solid var(--primary)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'var(--primary)';
                            e.currentTarget.style.color = '#000';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.color = 'var(--text-main)';
                        }}
                    >
                        Say Hello
                    </a>

                    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            GitHub
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            LinkedIn
                        </a>
                        <a href="mailto:vaishnavidubey1290@gmail.com" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            Email
                        </a>
                        <a href="tel:+918889723129" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                            Phone
                        </a>
                    </div>
                </motion.div>

                <footer style={{ marginTop: '100px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <p>© 2025 Creative Portfolio. Made with React & Three.js</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;

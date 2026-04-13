import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" style={{ padding: '100px 0', position: 'relative' }}>
            <div className="container">
                <motion.div
                    className="glass-panel"
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
                >
                    <div>
                        <h2 className="text-gradient" style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '3rem',
                            marginBottom: '2rem',
                            lineHeight: 1
                        }}>
                            ABOUT ME
                        </h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#ccc', marginBottom: '1.5rem' }}>
                            I am a B.Tech Computer Science (AI & ML) student at the University of Petroleum and Energy Studies, Dehradun.
                            With a strong foundation in Python, Java, and React, I build innovative software and AI-driven solutions.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#ccc' }}>
                            I have proven leadership experience as the President of my university's sports committee and hands-on
                            experience with Generative AI and Full Stack Development.
                        </p>
                    </div>
                    <div style={{ position: 'relative' }}>
                        {/* Placeholder for an image or 3D element */}
                        <div style={{
                            width: '100%',
                            aspectRatio: '1',
                            background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                            borderRadius: '16px',
                            opacity: 0.8
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            left: '-20px',
                            width: '100%',
                            height: '100%',
                            border: '2px solid rgba(255,255,255,0.2)',
                            borderRadius: '16px',
                            zIndex: -1
                        }} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;

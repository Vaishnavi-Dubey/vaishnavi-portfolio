import { motion } from 'framer-motion';

const Education = () => {
    return (
        <section id="education" style={{ padding: '50px 0' }}>
            <div className="container">
                <motion.h2
                    className="text-gradient"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '2rem' }}
                >
                    EDUCATION
                </motion.h2>

                <motion.div
                    className="glass-panel"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 600 }}>B.Tech Computer Science Engineering</h3>
                        <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}>2022 - Present</span>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>University of Petroleum and Energy Studies (UPES)</h4>
                    <p style={{ marginTop: '1rem', lineHeight: 1.6, color: '#e0e0e0' }}>
                        Specialization in Artificial Intelligence & Machine Learning. <br />
                        Focused on core computer science fundamentals, advanced algorithms, and data-driven systems.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Education;

import { motion } from 'framer-motion';

const achievements = [
    {
        title: "President of Sports Committee",
        organization: "University of Petroleum and Energy Studies",
        description: "Led the university's sports committee, organizing large-scale events and fostering student engagement in athletics.",
        highlight: "Leadership"
    },
    {
        title: "Top 5 Finalist",
        organization: "Internal Smart India Hackathon",
        description: "Secured a top 5 position among 330+ teams, demonstrating innovative problem-solving and rapid prototyping skills.",
        highlight: "Hackathon"
    }
];

const Achievements = () => {
    return (
        <section id="achievements" style={{ padding: '50px 0' }}>
            <div className="container">
                <motion.h2
                    className="text-gradient"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '3rem' }}
                >
                    ACHIEVEMENTS
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            className="glass-panel"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                padding: '2rem',
                                borderLeft: `4px solid var(--secondary)`,
                                background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
                            }}
                        >
                            <span style={{
                                display: 'inline-block',
                                color: 'var(--secondary)',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginBottom: '0.5rem'
                            }}>
                                {item.highlight}
                            </span>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.title}</h3>
                            <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{item.organization}</h4>
                            <p style={{ lineHeight: 1.6, color: '#ddd' }}>{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;

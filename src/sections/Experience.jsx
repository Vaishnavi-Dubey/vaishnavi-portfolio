import { motion } from 'framer-motion';

const experiences = [
    {
        year: "Jun 2025 - Jul 2025",
        role: "AI Intern",
        company: "NASSCOM (GenAI Program)",
        description: "Gained hands-on experience with LLMs and prompt engineering. Participated in research on GenAI trends."
    },
    {
        year: "Jun 2023 - Jul 2023",
        role: "Social Intern",
        company: "Maa Narmada Vriddha Ashralaya",
        description: "Assisted in daily care and engagement activities for elderly residents. Organized wellness programs and outreach."
    }
];

const Experience = () => {
    return (
        <section id="experience" style={{ padding: '100px 0' }}>
            <div className="container">
                <motion.h2
                    className="text-gradient"
                    initial={{ opacity: 1, x: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '4rem' }}
                >
                    EXPERIENCE
                </motion.h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 1, x: 0 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel"
                            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                        >
                            <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}>{exp.year}</span>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{exp.role}</h3>
                            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{exp.company}</h4>
                            <p style={{ marginTop: '0.5rem', lineHeight: 1.5, color: '#ddd' }}>{exp.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

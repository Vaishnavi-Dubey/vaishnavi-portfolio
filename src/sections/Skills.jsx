import { motion } from 'framer-motion';

const skillGroups = [
    {
        category: "Programming Languages",
        skills: ["Python", "C++", "Java", "JavaScript"]
    },
    {
        category: "Web / Software",
        skills: ["HTML", "CSS", "React", "Node.js", "Express.js", "MongoDB", "REST APIs"]
    },
    {
        category: "Data / ML",
        skills: ["NumPy", "Pandas", "Matplotlib", "Scikit-Learn", "NLP basics"]
    },
    {
        category: "Tools",
        skills: ["Git", "GitHub", "VS Code", "Postman"]
    },
    {
        category: "Soft Skills",
        skills: ["Problem Solving", "Teamwork", "Communication"]
    }
];

const Skills = () => {
    return (
        <section id="skills" style={{ padding: '50px 0' }}>
            <div className="container">
                <motion.h2
                    className="text-gradient"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '3rem' }}
                >
                    SKILLS
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {skillGroups.map((group, index) => (
                        <motion.div
                            key={index}
                            className="glass-panel"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{ padding: '2rem' }}
                        >
                            <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                                {group.category}
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                {group.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '50px',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            fontSize: '0.9rem',
                                            color: '#eee'
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

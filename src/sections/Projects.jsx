import { motion } from 'framer-motion';

const projects = [
    {
        title: "Deep Learning",
        category: "Python / Jupyter",
        description: "Sentiment Analysis & Hate Speech Detection models using Transformers.",
        color: "#b8b2ff", // Pastel Lavender
        link: "https://github.com/Vaishnavi-Dubey/Deep-Learning",
        image: "/project-images/deep_learning.png"
    },
    {
        title: "Disney+ Clone",
        category: "React / JavaScript",
        description: "A responsive clone of the Disney+ interface (from ReactJs repo).",
        color: "#b2ffdb", // Pastel Mint
        link: "https://github.com/Vaishnavi-Dubey/ReactJs",
        image: "/project-images/disney.png"
    },
    {
        title: "Disease Detection",
        category: "Machine Learning",
        description: "Predictive models for disease classification/detection.",
        color: "#ffb7b2", // Pastel Red/Pink
        link: "https://github.com/Vaishnavi-Dubey/Machine-Learning-",
        image: "/project-images/medical_ai.png"
    },
    {
        title: "DSA Library",
        category: "Java",
        description: "Comprehensive collection of Data Structures & Algorithms implementations.",
        color: "#e2f0cb", // Pastel Green
        link: "https://github.com/Vaishnavi-Dubey/Data-Structures-and-Algorithms",
        image: "/project-images/dsa.png"
    }
];

const Projects = () => {
    return (
        <section id="work" style={{ padding: '100px 0' }}>
            <div className="container">
                <motion.h2
                    className="text-gradient"
                    initial={{ opacity: 1, x: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '4rem' }}
                >
                    SELECTED WORK
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '3rem' }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass-panel"
                            style={{
                                overflow: 'hidden',
                                display: 'grid',
                                gridTemplateColumns: '1.5fr 1fr',
                                height: '350px',
                                padding: 0
                            }}
                        >
                            {/* Visual Side (Left) - IMAGE */}
                            <div style={{
                                background: '#0a0a0a',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.9,
                                        transition: 'all 0.5s ease'
                                    }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.opacity = '1';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.opacity = '0.9';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '50%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                    pointerEvents: 'none'
                                }} />
                            </div>

                            {/* Content Side (Right) */}
                            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                                <span style={{ color: project.color, fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '1px' }}>{project.category}</span>
                                <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0 1rem', fontWeight: 700, lineHeight: 1.2 }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.6 }}>{project.description}</p>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 600
                                    }}
                                >
                                    View Source Code &rarr;
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

import { useState, useEffect } from 'react';
import { Github, Linkedin, FileText } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            height: 'auto',
            zIndex: 100,
            borderRadius: '100px',
            padding: '1rem 2rem',
            background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.3s ease'
        }}>
            <a href="#" className="logo" style={{ fontSize: '1.2rem' }}>PORTFOLIO.</a>

            <ul className="nav-links" style={{ gap: '2rem' }}>
                <li><a href="#about" style={{ fontSize: '0.8rem' }}>About</a></li>
                <li><a href="#skills" style={{ fontSize: '0.8rem' }}>Skills</a></li>
                <li><a href="#work" style={{ fontSize: '0.8rem' }}>Projects</a></li>
                <li><a href="#experience" style={{ fontSize: '0.8rem' }}>Exp</a></li>
                <li><a href="#education" style={{ fontSize: '0.8rem' }}>Edu</a></li>
                <li><a href="#achievements" style={{ fontSize: '0.8rem' }}>Awards</a></li>
                <li><a href="#contact" style={{ fontSize: '0.8rem' }}>Contact</a></li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <a href="https://github.com/Vaishnavi-Dubey" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', color: 'var(--text-main)' }}>
                    <Github size={18} />
                    <span className="visually-hidden">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/vaishnavi-dubey" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', color: 'var(--text-main)' }}>
                    <Linkedin size={18} />
                    <span className="visually-hidden">LinkedIn</span>
                </a>
                <a href="/resume.pdf" target="_blank" className="contact-btn" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    fontSize: '0.75rem',
                    borderRadius: '50px'
                }}>
                    <FileText size={14} />
                    Resume
                </a>
            </div>
        </nav>
    );
};

export default Navbar;

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);

    // Track active section
    const sections = navItems.map(item => item.href.slice(1));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          VD<span style={{ color: 'var(--violet)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}

          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <a
              href="https://github.com/Vaishnavi-Dubey"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              GitHub
            </a>
            <a
              href="/Vaishnavi_Dubey_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
              style={{ background: 'var(--violet)', borderColor: 'var(--violet)' }}
            >
              Résumé
            </a>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`nav-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

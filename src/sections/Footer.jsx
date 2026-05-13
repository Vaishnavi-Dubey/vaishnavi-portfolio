/**
 * Footer — Minimal, branded sign-off.
 * Not an afterthought. A quiet, confident closing statement.
 */

const Footer = () => {
  return (
    <footer
      style={{
        padding: 'var(--space-6) 0',
        borderTop: '1px solid var(--glass-border)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.04em',
          }}
        >
          © {new Date().getFullYear()} Vaishnavi Dubey
        </span>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.06em',
          }}
        >
          Built with React 19 + Three.js + Framer Motion
        </span>

        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'color 150ms',
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'var(--violet-soft)')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to top
        </a>
      </div>
    </footer>
  );
};

export default Footer;

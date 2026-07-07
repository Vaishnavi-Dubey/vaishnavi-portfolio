export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line/40 px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="rule mb-12" />
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="handwritten text-5xl text-accent leading-none">
              Until the next entry,
            </p>
            <p className="handwritten mt-3 text-4xl text-ink/85 leading-none">
              &mdash; V.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              © {year} &middot; Vaishnavi Dubey &middot; All rights reserved
            </p>
          </div>
          <ul className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em]">
            <li>
              <a
                href="https://github.com/Vaishnavi-Dubey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/80 transition hover:text-accent"
              >
                GitHub &nearr;
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/vaishnavi-dubey/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/80 transition hover:text-accent"
              >
                LinkedIn &nearr;
              </a>
            </li>
            <li>
              <a
                href="mailto:vaishnavidubey1290@gmail.com"
                className="text-ink/80 transition hover:text-accent"
              >
                Email &nearr;
              </a>
            </li>
          </ul>
        </div>
        <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/80">
          Colophon &mdash; set in Instrument Serif &amp; Newsreader &mdash;
          marginalia in Caveat &mdash; labels in JetBrains Mono &mdash;
          bound in Next.js, hand-stitched in Tailwind
        </p>
      </div>
    </footer>
  );
}

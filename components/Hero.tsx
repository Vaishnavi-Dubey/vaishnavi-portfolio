import Typewriter from "./Typewriter";
import MagneticButton from "./MagneticButton";
import StudioScene from "./StudioScene";
import { Reveal, RevealItem } from "./Reveal";
import { ArrowRightIcon, ArrowDownIcon, SunIcon, SparkleIcon } from "./Icons";

function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      className={`absolute left-0 -bottom-2 h-3 w-full ${className}`}
      aria-hidden
    >
      <path
        d="M2 8 Q 20 0 40 7 T 80 8 T 120 6 T 160 9 T 198 6"
        fill="none"
        stroke="rgb(var(--c-gold))"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="ch-gold relative isolate flex min-h-screen items-center overflow-hidden px-4 pt-28 sm:pt-32"
    >
      {/* Layered background atmosphere */}
      <div className="stars -z-20" aria-hidden />
      <div className="bg-grid absolute inset-0 -z-20 opacity-60" aria-hidden />
      <div className="light-rays -z-10" aria-hidden />
      {/* Soft horizon glow at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-base via-base/70 to-transparent"
      />

      {/* Top-left log entry */}
      <div className="absolute left-4 top-24 hidden font-mono text-[10px] uppercase tracking-[0.28em] text-muted sm:left-8 sm:block">
        <div className="flex items-center gap-2 tabular-nums text-ch">
          <SunIcon size={12} />
          <span>Golden hour &middot; 06:42</span>
        </div>
        <div className="mt-1.5">28.6° N &nbsp;·&nbsp; 77.2° E</div>
        <div className="mt-1.5">Folio I &mdash; the cover</div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal amount={0.2}>
          {/* Salutation with icon */}
          <RevealItem
            as="div"
            className="flex items-center gap-3"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ch/15 text-ch border border-ch/40">
              <SparkleIcon size={14} />
            </span>
            <p className="handwritten text-3xl text-ch sm:text-4xl">Dear visitor,</p>
          </RevealItem>

          {/* Headline */}
          <RevealItem
            as="h1"
            className="mt-7 font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.012em] text-balance"
          >
            You&rsquo;ve wandered into my{" "}
            <span className="relative inline-block">
              <span className="text-display-italic">studio</span>
              <Squiggle />
            </span>
            {" "}&mdash; a room where ideas warm up under the lamp.
          </RevealItem>

          {/* Typewriter status */}
          <RevealItem
            as="p"
            className="mt-8 flex flex-wrap items-baseline gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted"
          >
            <span className="text-ch">// today, I&rsquo;m</span>
            <Typewriter />
          </RevealItem>

          {/* Personal copy */}
          <RevealItem
            as="p"
            className="mt-9 max-w-xl font-body text-[17px] leading-[1.7] text-ink/80"
          >
            I&rsquo;m <em className="text-ink">Vaishnavi</em> &mdash; a developer
            who treats software like a long, patient craft. Pull up a chair.
            Each chapter below is a different time of day, a different kind of
            work: how I got here, where I&rsquo;ve been, things I&rsquo;ve made,
            and a little of what I&rsquo;m up to right now.
          </RevealItem>

          {/* Signature */}
          <RevealItem className="mt-8 flex flex-col gap-1.5">
            <p className="handwritten text-3xl text-ink/90">&mdash; V.</p>
            <p className="handwritten text-xl text-muted">
              p.s. follow the colors. each chapter has its own.
            </p>
          </RevealItem>

          <RevealItem className="mt-10 flex flex-wrap items-center gap-5">
            <MagneticButton href="mailto:vaishnavidubey1290@gmail.com" variant="primary">
              Write me a letter
              <ArrowRightIcon size={14} />
            </MagneticButton>
            <MagneticButton href="#about" variant="ghost">
              <ArrowDownIcon size={14} />
              Open Chapter I
            </MagneticButton>
          </RevealItem>

          {/* Chapter legend — color classification system */}
          <RevealItem className="mt-12">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              A reader&rsquo;s key &mdash; what the colors mean
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
              {[
                { c: "blush",    label: "How I got here",  hint: "warmth" },
                { c: "lavender", label: "Timeline",       hint: "memory" },
                { c: "coral",    label: "Side-quests",    hint: "energy" },
                { c: "sage",     label: "Pulse, live",    hint: "growth" },
                { c: "gold",     label: "Write back",     hint: "open invitation" },
              ].map((row) => (
                <li key={row.c} className={`ch-${row.c} flex items-center gap-2`}>
                  <span className="h-2.5 w-2.5 rounded-full bg-ch shadow-[0_0_10px_currentColor] text-ch" />
                  <span className="text-ink/85">{row.label}</span>
                  <span className="text-[11px] text-muted">&mdash; {row.hint}</span>
                </li>
              ))}
            </ul>
          </RevealItem>
        </Reveal>

        {/* Right column: the illustrated scene */}
        <Reveal amount={0.1} className="hidden lg:block">
          <RevealItem>
            <StudioScene />
          </RevealItem>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center" aria-hidden>
        <p className="handwritten text-2xl text-muted">turn the page</p>
        <div className="mx-auto mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ch/40 bg-ch/10 text-ch">
          <ArrowDownIcon size={14} />
        </div>
      </div>
    </section>
  );
}

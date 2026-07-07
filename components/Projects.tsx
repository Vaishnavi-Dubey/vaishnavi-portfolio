import type { RepoCard } from "@/lib/github";
import ProjectsClient from "./ProjectsClient";
import { Reveal, RevealItem } from "./Reveal";

type Props = {
  repos: RepoCard[];
  syncedAt: string;
};

export default function Projects({ repos, syncedAt }: Props) {
  return (
    <section id="projects" className="ch-coral tint-coral relative isolate px-4 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-6xl" amount={0.15}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <RevealItem as="div" className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
              <span className="text-ch">Chapter III &middot; Afternoon</span>
              <span className="h-px w-16 bg-line/60" />
              <span>Things made &mdash; energy in coral</span>
            </RevealItem>
            <RevealItem
              as="h2"
              className="mt-6 max-w-2xl text-balance font-display text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.012em]"
            >
              A small library of{" "}
              <span className="text-ch italic">side-quests</span>.
            </RevealItem>
            <RevealItem as="p" className="mt-4 max-w-xl font-body text-[17px] leading-[1.7] text-ink/75">
              Pulled live from GitHub. Pinned repositories first, then the rest by
              stars. Each card is tinted by the kind of work &mdash; frontend in
              coral, tooling in sage, data in lavender. Hover to peek at the
              stack; everything refreshes itself every minute.
            </RevealItem>
          </div>
          <RevealItem as="div" className="hidden sm:inline">
            <a
              href="https://github.com/Vaishnavi-Dubey"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted underline-offset-4 transition hover:text-ch hover:underline"
            >
              All repositories &nearr;
            </a>
          </RevealItem>
        </div>

        {repos.length === 0 ? (
          <RevealItem
            as="p"
            className="mt-10 rounded-md border border-dashed border-line/60 p-8 text-center text-muted"
          >
            Couldn&apos;t load repositories right now. Please try again later.
          </RevealItem>
        ) : (
          <ProjectsClient repos={repos} syncedAt={syncedAt} />
        )}
      </Reveal>
    </section>
  );
}

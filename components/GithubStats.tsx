import { Reveal, RevealItem } from "./Reveal";
import GithubStatsClient from "./GithubStatsClient";

/**
 * Server component wrapper that fetches public GitHub data with ISR.
 * - Top languages: aggregated from REST /users/:user/repos.
 * - Contribution heatmap: rendered client-side from a public unauthenticated
 *   endpoint (github-contributions-api.jogruber.de) which mirrors the
 *   contribution graph without needing a token.
 */

type LangAgg = { name: string; bytes: number; percent: number; color: string };

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
};

async function getTopLanguages(username: string): Promise<LangAgg[]> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as {
      name: string;
      fork: boolean;
      archived: boolean;
      languages_url: string;
    }[];

    const active = repos.filter((r) => !r.fork && !r.archived).slice(0, 30);

    const totals = new Map<string, number>();
    await Promise.all(
      active.map(async (r) => {
        try {
          const lr = await fetch(r.languages_url, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            next: { revalidate: 60 },
          });
          if (!lr.ok) return;
          const data = (await lr.json()) as Record<string, number>;
          for (const [name, bytes] of Object.entries(data)) {
            totals.set(name, (totals.get(name) ?? 0) + bytes);
          }
        } catch {}
      })
    );

    const total = Array.from(totals.values()).reduce((a, b) => a + b, 0) || 1;
    return Array.from(totals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percent: Math.round((bytes / total) * 1000) / 10,
        color: LANG_COLORS[name] ?? "#7C3AED",
      }));
  } catch {
    return [];
  }
}

export default async function GithubStats({ username }: { username: string }) {
  const langs = await getTopLanguages(username);

  return (
    <section id="github" className="ch-sage tint-sage relative isolate px-4 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-6xl" amount={0.15}>
        <RevealItem as="div" className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
          <span className="text-ch">Chapter IV &middot; Evening</span>
          <span className="h-px flex-1 bg-line/60" />
          <span>The living craft &mdash; growth in sage</span>
        </RevealItem>
        <RevealItem
          as="h2"
          className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.012em]"
        >
          A <span className="text-ch italic">heartbeat</span>, straight from the terminal.
        </RevealItem>
        <RevealItem as="p" className="mt-4 max-w-xl font-body text-[17px] leading-[1.7] text-ink/75">
          Commits, contributions, languages I&rsquo;ve been speaking lately &mdash;
          all pulled fresh, no embellishment.
        </RevealItem>

        <div className="mt-10">
          <GithubStatsClient username={username} languages={langs} />
        </div>
      </Reveal>
    </section>
  );
}

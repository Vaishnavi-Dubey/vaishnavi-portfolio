"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type LangAgg = { name: string; bytes: number; percent: number; color: string };
type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

type Props = {
  username: string;
  languages: LangAgg[];
};

const LEVEL_BG = [
  "bg-line/30",
  "bg-accent/25",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent",
];

export default function GithubStatsClient({ username, languages }: Props) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setDays(null);
    setError(null);
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
        username
      )}?y=${year}`
    )
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((j: { contributions: Day[] }) => {
        if (!cancelled) setDays(j.contributions);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e?.message ?? e));
      });
    return () => {
      cancelled = true;
    };
  }, [username, year]);

  const { weeks, total } = useMemo(() => {
    if (!days) return { weeks: [] as Day[][], total: 0 };
    // Group into weeks (Sun–Sat) starting from first day's weekday offset
    const first = new Date(days[0].date);
    const offset = first.getDay(); // 0..6
    const padded: (Day | null)[] = Array(offset).fill(null).concat(days);
    const ws: (Day | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      ws.push(padded.slice(i, i + 7));
    }
    return {
      weeks: ws as Day[][],
      total: days.reduce((s, d) => s + d.count, 0),
    };
  }, [days]);

  const yearOptions = [year, year - 1, year - 2];

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      {/* Heatmap (spans 2 cols) */}
      <div className="lg:col-span-2 rounded-xl border border-line/40 bg-surface/50 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-ink">
            Contributions{" "}
            <span className="text-muted">
              · {total.toLocaleString()} in {year}
            </span>
          </h3>
          <div className="flex gap-1">
            {yearOptions.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                data-cursor="hover"
                className={`rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                  y === year
                    ? "bg-accent text-white"
                    : "border border-line/40 text-muted hover:text-accent-glow"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          {error && (
            <p className="text-xs text-muted">
              Couldn&apos;t load contribution data right now.
            </p>
          )}
          {!error && !days && (
            <div className="flex gap-1">
              {Array.from({ length: 53 }).map((_, w) => (
                <div key={w} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, d) => (
                    <div
                      key={d}
                      className="h-[10px] w-[10px] animate-pulse rounded-[2px] bg-line/30"
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
          {!error && days && (
            <div className="flex gap-1">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, di) => {
                    const d = week[di];
                    if (!d) {
                      return (
                        <div
                          key={di}
                          className="h-[10px] w-[10px] rounded-[2px] opacity-0"
                        />
                      );
                    }
                    return (
                      <motion.div
                        key={di}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: wi * 0.005 + di * 0.002 }}
                        title={`${d.count} contributions on ${d.date}`}
                        className={`h-[10px] w-[10px] rounded-[2px] ${LEVEL_BG[d.level]}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-[10px] text-muted">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {LEVEL_BG.map((c, i) => (
              <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${c}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Top languages */}
      <div className="rounded-xl border border-line/40 bg-surface/50 p-5 backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-ink">Top languages</h3>
        {languages.length === 0 ? (
          <p className="mt-4 text-xs text-muted">
            Couldn&apos;t load language data right now.
          </p>
        ) : (
          <>
            {/* Stacked bar */}
            <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-surface2">
              {languages.map((l) => (
                <motion.div
                  key={l.name}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: l.color }}
                  title={`${l.name} · ${l.percent}%`}
                />
              ))}
            </div>
            <ul className="mt-5 space-y-2.5">
              {languages.map((l) => (
                <li
                  key={l.name}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="inline-flex items-center gap-2 text-ink/85">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: l.color }}
                    />
                    {l.name}
                  </span>
                  <span className="tabular-nums text-muted">{l.percent}%</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-xs font-semibold text-accent-glow hover:text-accent"
        >
          @{username} on GitHub →
        </a>
      </div>
    </div>
  );
}

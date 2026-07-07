export default function ProjectsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="h-80 animate-pulse overflow-hidden rounded-xl border border-line/40 bg-surface/40 p-5"
        >
          <div className="h-24 w-full rounded-lg bg-line/30" />
          <div className="mt-4 h-4 w-2/3 rounded bg-line/30" />
          <div className="mt-3 h-3 w-full rounded bg-line/20" />
          <div className="mt-2 h-3 w-5/6 rounded bg-line/20" />
          <div className="mt-2 h-3 w-3/4 rounded bg-line/20" />
          <div className="mt-6 flex items-center justify-between border-t border-line/40 pt-3">
            <div className="h-3 w-12 rounded bg-line/30" />
            <div className="h-3 w-16 rounded bg-line/30" />
          </div>
        </li>
      ))}
    </ul>
  );
}

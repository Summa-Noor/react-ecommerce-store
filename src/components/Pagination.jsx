function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  // Common look for every button
  const base =
    "min-w-10 rounded-xl border px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40";
  const idle =
    "border-stone-200 bg-white text-slate-700 enabled:hover:border-yellow-400 enabled:hover:bg-yellow-50";
  const active = "border-yellow-400 bg-yellow-400 text-slate-900 shadow-sm shadow-yellow-500/30";

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)} className={`${base} ${idle}`}>
        ← Previous
      </button>

      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={`${base} ${n === page ? active : idle}`}
        >
          {n}
        </button>
      ))}

      <button disabled={page === pages} onClick={() => onChange(page + 1)} className={`${base} ${idle}`}>
        Next →
      </button>
    </nav>
  );
}

export default Pagination;
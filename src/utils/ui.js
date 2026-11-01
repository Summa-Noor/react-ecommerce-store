export const money = (n) => `$${n.toFixed(2)}`;

// Primary action: warm yellow with dark text (good contrast)
export const btnPrimary =
  "inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-yellow-300 to-yellow-400 font-semibold text-slate-900 " +
  "shadow-sm shadow-yellow-500/30 ring-1 ring-yellow-500/40 transition hover:from-yellow-300 hover:to-amber-400 " +
  "hover:shadow-md hover:shadow-yellow-500/40 active:scale-[.98] focus:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-50";
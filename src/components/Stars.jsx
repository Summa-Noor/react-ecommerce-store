const Stars = ({ rating }) => {
  const filled = Math.round(rating);

  return (
    <span className="inline-flex items-center gap-1.5 text-sm" aria-label={`Rated ${rating} out of 5`}>
      <span className="tracking-tight">
        <span className="text-yellow-400">{"★".repeat(filled)}</span>
        <span className="text-stone-300">{"★".repeat(5 - filled)}</span>
      </span>
      <span className="font-semibold text-slate-700">{rating.toFixed(1)}</span>
    </span>
  );
};

export default Stars;
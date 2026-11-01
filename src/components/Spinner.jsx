const Spinner = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-24" role="status" aria-label="Loading">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-200 border-t-yellow-500" />
    <p className="text-sm font-medium text-stone-500">Loading...</p>
  </div>
);

export default Spinner;
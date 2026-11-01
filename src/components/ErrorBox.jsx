import { Link } from "react-router-dom";
import { btnPrimary } from "../utils/ui";

const ErrorBox = ({ message, onRetry, title = "Couldn’t load products" }) => (
  <div className="mx-auto my-16 max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-lg shadow-yellow-500/10">
    {/* Warning icon */}
    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-yellow-100 text-amber-700">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    </div>

    <p className="text-lg font-extrabold text-slate-900">{title}</p>
    <p className="mt-1.5 text-sm text-stone-600">{message}</p>

    {/* Buttons */}
    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
      {onRetry && (
        <button onClick={onRetry} className={`${btnPrimary} px-6 py-2.5`}>
          Try again
        </button>
      )}
      <Link
        to="/"
        className={
          onRetry
            ? "rounded-xl border border-stone-200 bg-white px-6 py-2.5 font-semibold text-slate-700 transition hover:border-yellow-400 hover:bg-yellow-50"
            : `${btnPrimary} px-6 py-2.5`
        }
      >
        Back to home
      </Link>
    </div>
  </div>
);

export default ErrorBox;
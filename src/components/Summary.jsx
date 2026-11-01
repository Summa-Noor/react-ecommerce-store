import { money } from "../utils/ui";

function Summary({ total, children }) {
  const shipping = total > 500 || total === 0 ? 0 : 15;

  // Progress towards free shipping (free above $500)
  const FREE_AT = 500;
  const remaining = FREE_AT - total;
  const progress = Math.min(100, (total / FREE_AT) * 100);
  const showProgress = total > 0;

  return (
    <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 shadow-lg shadow-yellow-500/10 lg:sticky lg:top-24">
      <div className="flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-yellow-400" />
        <h2 className="text-lg font-extrabold text-slate-900">Order summary</h2>
      </div>

      {/* Free shipping progress */}
      {showProgress && (
        <div className="mt-4 rounded-xl bg-yellow-50 p-3">
          <p className="text-xs font-medium text-stone-700">
            {remaining > 0 ? (
              <>
                Add <span className="font-bold text-slate-900">{money(remaining)}</span> more for free shipping
              </>
            ) : (
              <span className="font-bold text-slate-900">You've unlocked free shipping 🎉</span>
            )}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-yellow-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-4 space-y-2.5 text-sm text-stone-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-slate-900">{money(total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className={`font-medium ${shipping ? "text-slate-900" : "text-emerald-600"}`}>
            {shipping ? money(shipping) : "Free"}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-stone-200 pt-3 text-base font-bold text-slate-900">
          <span>Total</span>
          <span className="text-xl font-extrabold">{money(total + shipping)}</span>
        </div>
      </div>

      <div className="mt-5">{children}</div>
    </aside>
  );
}

export default Summary;
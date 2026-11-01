import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { btnPrimary, money } from "../utils/ui";
import Summary from "../components/Summary";

function CartPage() {
  const { items, setQty, remove, total } = useCart();

  // Empty cart view
  if (!items.length)
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-yellow-100 text-amber-700">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h3l2.7 11.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 7H6" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-stone-500">Add a phone, laptop or headphones to get started.</p>
        <Link to="/" className={`${btnPrimary} mt-6 px-6 py-3`}>Browse products</Link>
      </main>
    );

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_340px]">
      <section>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-7 w-1.5 rounded-full bg-yellow-400" />
          <h1 className="text-2xl font-extrabold text-slate-900">Cart</h1>
          <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-sm font-semibold text-stone-600">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <ul className="space-y-3">
          {items.map((i) => (
            <li
              key={i.id}
              className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-3 transition hover:border-yellow-300 hover:shadow-md hover:shadow-yellow-500/10"
            >
              <img src={i.thumbnail} alt="" className="h-24 w-24 rounded-xl bg-stone-100 object-contain p-1" />

              <div className="flex-1">
                <Link to={`/product/${i.id}`} className="font-semibold leading-snug text-slate-900 transition hover:text-amber-700">
                  {i.title}
                </Link>
                <p className="mt-0.5 text-sm text-stone-500">{money(i.price)} each</p>

                {/* Quantity stepper */}
                <div className="mt-2 inline-flex items-center rounded-lg border border-stone-200">
                  <button
                    onClick={() => setQty(i.id, i.qty - 1)}
                    className="h-8 w-8 rounded-l-lg text-lg transition hover:bg-yellow-100"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-slate-900">{i.qty}</span>
                  <button
                    onClick={() => setQty(i.id, i.qty + 1)}
                    className="h-8 w-8 rounded-r-lg text-lg transition hover:bg-yellow-100"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 self-stretch py-1">
                <p className="text-lg font-extrabold text-slate-900">{money(i.price * i.qty)}</p>
                <button onClick={() => remove(i.id)} className="mt-auto text-sm font-medium text-stone-500 transition hover:text-red-600">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <Link to="/" className="mt-5 inline-block text-sm font-semibold text-stone-600 transition hover:text-slate-900">
          ← Continue shopping
        </Link>
      </section>

      <Summary total={total}>
        <Link to="/checkout" className={`${btnPrimary} w-full px-6 py-3.5 text-base`}>
          Go to checkout
        </Link>
      </Summary>
    </main>
  );
}

export default CartPage;
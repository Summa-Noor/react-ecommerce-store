import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CATEGORIES } from "../api/products";
import { btnPrimary } from "../utils/ui";

function Navbar({ query, setQuery }) {
  const { count } = useCart();
  const navigate = useNavigate();

  // Desktop text links: active page gets a soft yellow highlight
  const link = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? "bg-yellow-100 text-slate-900" : "text-stone-600 hover:bg-stone-100 hover:text-slate-900"
    }`;

  // Mobile chips (Home / Phones / Laptops / Headphones)
  const chip = ({ isActive }) =>
    `shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
      isActive ? "bg-yellow-400 text-slate-900" : "bg-stone-100 text-stone-700 hover:bg-yellow-100"
    }`;

  // Search box (JSX variable, not a component, so typing never loses focus).
  // It is rendered twice: once in the top row for desktop, once in its own row for mobile.
  const searchBox = (
    <>
      <svg
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); navigate("/"); }}
        placeholder="Search phones, laptops, headphones"
        aria-label="Search products"
        className="w-full rounded-full border border-transparent bg-stone-100 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-400/50"
      />
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3">
        {/* ───── Main row ───── */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-yellow-300 to-amber-400 text-lg font-black text-slate-900 shadow-sm shadow-yellow-500/40">N</span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Nova<span className="text-amber-600">Tech</span>
            </span>
          </Link>

          {/* Desktop only: hover-open Categories dropdown */}
          <div className="group relative hidden md:block">
            <button
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition group-hover:bg-stone-100 group-hover:text-slate-900"
              aria-haspopup="true"
            >
              Categories ▾
            </button>
            {/* pt-2 keeps the hover area connected to the button (no gap) */}
            <div className="invisible absolute left-0 top-full z-50 w-52 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-stone-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/category/${c.slug}`}
                    onClick={() => setQuery("")}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-yellow-100 hover:text-slate-900"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop only: search in the main row */}
          <div className="relative mx-4 hidden flex-1 md:block">{searchBox}</div>

          {/* Right side */}
          <nav className="ml-auto flex items-center gap-1">
            <NavLink to="/" end className={(s) => `hidden md:inline-flex ${link(s)}`}>Home</NavLink>
            <NavLink to="/cart" className={(s) => `hidden md:inline-flex ${link(s)}`}>Cart</NavLink>

            {/* Cart icon with count badge */}
            <Link to="/cart" aria-label={`Cart, ${count} items`} className="relative rounded-xl p-2 text-slate-800 transition hover:bg-stone-100">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M2 3h3l2.7 11.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 7H6" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-slate-900 px-1.5 text-center text-xs font-bold text-yellow-300 ring-2 ring-white">
                  {count}
                </span>
              )}
            </Link>

            <Link to="/contact" className={`${btnPrimary} ml-1 px-4 py-2 text-sm sm:px-5`}>Contact</Link>
          </nav>
        </div>

        {/* ───── Mobile only: search row ───── */}
        <div className="relative mt-3 md:hidden">{searchBox}</div>

        {/* ───── Mobile only: scrollable chips ───── */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <NavLink to="/" end className={chip}>Home</NavLink>
          {CATEGORIES.map((c) => (
            <NavLink key={c.slug} to={`/category/${c.slug}`} onClick={() => setQuery("")} className={chip}>
              {c.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
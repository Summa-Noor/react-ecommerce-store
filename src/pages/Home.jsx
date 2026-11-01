import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CATEGORIES, fetchProducts } from "../api/products";
import { btnPrimary } from "../utils/ui";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

const PAGE_SIZE = 8;

// Small info cards shown under the hero
const PERKS = [
  ["Free shipping", "On orders over $500"],
  ["30-day returns", "Change your mind, no fuss"],
  ["Secure checkout", "Safe and simple payment"],
];

function Home({ search }) {
  const { slug } = useParams(); // undefined = all three categories
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false; // ignore stale responses when inputs change quickly
    setLoading(true);
    setError("");
    fetchProducts({ category: slug, search })
      .then((list) => !cancelled && setProducts(list))
      .catch((e) => !cancelled && setError(e.message || "Network error"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug, search, reload]);

  useEffect(() => {
    setPage(1); // back to page 1 on new results
  }, [slug, search]);

  const pages = Math.ceil(products.length / PAGE_SIZE);
  const visible = useMemo(() => products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [products, page]);
  const title = search ? `Results for “${search}”` : CATEGORIES.find((c) => c.slug === slug)?.label || "All products";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Hero + perks (only on the main home view) */}
      {!slug && !search && (
        <>
          <section className="relative mb-6 overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-white sm:px-14 sm:py-20">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-yellow-400/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                New season, new tech
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                Tech that keeps up with <span className="text-yellow-400">you.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg text-slate-300">
                Phones, laptops and headphones from brands you trust. Free shipping over $500 and 30 days to return.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/category/phones" className={`${btnPrimary} px-6 py-3`}>Shop phones</Link>
                <Link to="/category/laptops" className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                  Browse laptops
                </Link>
              </div>
            </div>
          </section>

          <div className="mb-10 grid gap-3 sm:grid-cols-3">
            {PERKS.map(([t, d]) => (
              <div key={t} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-100 font-bold text-amber-700">✓</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t}</p>
                  <p className="text-xs text-stone-500">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Section heading */}
      <div className="mb-6 flex items-end justify-between">
        <div className="flex items-center gap-3">
          <span className="h-7 w-1.5 rounded-full bg-yellow-400" />
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        </div>
        {!loading && !error && <p className="text-sm text-stone-500">{products.length} items</p>}
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorBox message={error} onRetry={() => setReload((n) => n + 1)} />
      ) : products.length === 0 ? (
        <p className="py-20 text-center text-stone-500">
          Nothing matches “{search}”. Try a brand or product type, like “iPhone” or “laptop”.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
          {/* Pagination sits directly under the grid, above the footer */}
          <Pagination
            page={page}
            pages={pages}
            onChange={(n) => {
              setPage(n);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </main>
  );
}

export default Home;
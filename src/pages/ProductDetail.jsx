import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/products";
import { useCart } from "../context/CartContext";
import { btnPrimary, money } from "../utils/ui";
import Stars from "../components/Stars";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();
  const [p, setP] = useState(null);
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setP(null);
    setError("");
    setImg(0);
    api
      .get(`/products/${id}`)
      .then((r) => !cancelled && setP(r.data))
      .catch((e) => !cancelled && setError(e.response?.status === 404 ? "This product no longer exists." : e.message));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) return <ErrorBox message={error} />;
  if (!p) return <Spinner />;

  const specs = [
    ["Brand", p.brand],
    ["Category", p.category],
    ["SKU", p.sku],
    ["Weight", p.weight && `${p.weight} g`],
    ["Dimensions", p.dimensions && `${p.dimensions.width} × ${p.dimensions.height} × ${p.dimensions.depth} cm`],
    ["Warranty", p.warrantyInformation],
    ["Shipping", p.shippingInformation],
    ["Returns", p.returnPolicy],
  ].filter(([, v]) => v);

  const hasDiscount = p.discountPercentage > 8;
  const oldPrice = p.price / (1 - p.discountPercentage / 100);
  const inStock = p.stock > 0;

  const handleAdd = () => {
    add(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-stone-600 transition hover:bg-yellow-100 hover:text-slate-900"
      >
        ← Back to store
      </Link>

      <div className="mt-4 grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-stone-200 bg-stone-100">
            <img src={p.images?.[img] || p.thumbnail} alt={p.title} className="h-full w-full object-contain p-8" />
            {hasDiscount && (
              <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-slate-900 shadow-sm">
                -{Math.round(p.discountPercentage)}%
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {(p.images || []).map((src, i) => (
              <button
                key={i}
                onClick={() => setImg(i)}
                aria-label={`Image ${i + 1}`}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-stone-100 transition ${
                  i === img ? "border-yellow-400 ring-2 ring-yellow-400/40" : "border-stone-200 hover:border-yellow-300"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">{p.brand || p.category}</p>
          <h1 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight text-slate-900">{p.title}</h1>
          <div className="mt-2">
            <Stars rating={p.rating} />
          </div>

          <div className="mt-5 flex items-end gap-3">
            <p className="text-4xl font-extrabold text-slate-900">{money(p.price)}</p>
            {hasDiscount && <p className="pb-1 text-lg text-stone-400 line-through">{money(oldPrice)}</p>}
          </div>

          <p className="mt-2 flex items-center gap-2 text-sm text-stone-600">
            <span className={`h-2 w-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-red-500"}`} />
            {p.availabilityStatus} · {p.stock} in stock
          </p>

          <p className="mt-5 leading-relaxed text-stone-600">{p.description}</p>

          {/* Quantity + Add to cart */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-stone-200 bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="rounded-l-xl px-3.5 py-2.5 text-lg transition hover:bg-yellow-100"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center font-bold text-slate-900">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="rounded-r-xl px-3.5 py-2.5 text-lg transition hover:bg-yellow-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button className={`${btnPrimary} flex-1 px-6 py-3.5 text-base`} onClick={handleAdd}>
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>
          </div>

          {/* Small trust strip */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-600">
              <span className="font-semibold text-slate-900">Free shipping</span> over $500
            </div>
            <div className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-600">
              <span className="font-semibold text-slate-900">30-day</span> returns
            </div>
          </div>

          {/* Specs */}
          <div className="mt-10 flex items-center gap-3">
            <span className="h-6 w-1.5 rounded-full bg-yellow-400" />
            <h2 className="text-lg font-bold text-slate-900">Specifications</h2>
          </div>
          <dl className="mt-3 divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200 bg-white">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm odd:bg-stone-50/60">
                <dt className="text-stone-500">{k}</dt>
                <dd className="text-right font-medium capitalize text-slate-800">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
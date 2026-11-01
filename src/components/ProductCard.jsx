import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { btnPrimary, money } from "../utils/ui";
import Stars from "./Stars";

function ProductCard({ p }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault(); // card is a link; don't navigate
    add(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const hasDiscount = p.discountPercentage > 8;
  // Price before the discount, shown with a strike-through
  const oldPrice = p.price / (1 - p.discountPercentage / 100);

  return (
    <Link
      to={`/product/${p.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/15"
    >
      {/* Image area */}
      <div className="relative aspect-square bg-stone-100">
        <img
          src={p.thumbnail}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-yellow-400 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-sm">
            -{Math.round(p.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">{p.brand || p.category}</p>
        <h3 className="line-clamp-2 font-semibold leading-snug text-slate-900">{p.title}</h3>
        <Stars rating={p.rating} />

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            <span className="text-xl font-extrabold text-slate-900">{money(p.price)}</span>
            {hasDiscount && <span className="ml-2 text-sm text-stone-400 line-through">{money(oldPrice)}</span>}
          </div>
          <button onClick={handleAdd} className={`${btnPrimary} px-3.5 py-2 text-sm`}>
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
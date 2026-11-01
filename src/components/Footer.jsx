import { Link } from "react-router-dom";
import { CATEGORIES } from "../api/products";

const Footer = () => (
  <footer className="mt-20 bg-slate-900 text-slate-400">
    {/* Yellow accent line on top */}
    <div className="h-1 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500" />

    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
      {/* Brand */}
      <div className="lg:col-span-2">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-yellow-400 font-black text-slate-900">N</span>
          <span className="text-xl font-extrabold text-white">NovaTech</span>
        </div>
        <p className="mt-4 max-w-sm text-sm leading-relaxed">
          Phones, laptops and headphones from brands you trust, with fast shipping and easy returns.
        </p>
        <Link
          to="/contact"
          className="mt-5 inline-flex rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-yellow-300"
        >
          Get in touch
        </Link>
      </div>

      {/* Shop */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-yellow-400">Shop</h4>
        <ul className="mt-4 space-y-2.5 text-sm">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link to={`/category/${c.slug}`} className="transition hover:text-white">{c.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-yellow-400">Support</h4>
        <ul className="mt-4 space-y-2.5 text-sm">
          <li><Link to="/" className="transition hover:text-white">Home</Link></li>
          <li><Link to="/cart" className="transition hover:text-white">Your cart</Link></li>
          <li><Link to="/contact" className="transition hover:text-white">Contact us</Link></li>
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row">
        <p>© {new Date().getFullYear()} NovaTech Store. All rights reserved.</p>
        <p>Free shipping on orders over $500 · 30-day returns</p>
      </div>
    </div>
  </footer>
);

export default Footer;
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { btnPrimary, money } from "../utils/ui";
import Summary from "../components/Summary";

// Field BAHAR hai (Checkout function ke andar nahi), taake typing par focus na jaye
function Field({ k, label, type = "text", form, errors, set }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        type={type}
        value={form[k]}
        onChange={set(k)}
        className={`mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 text-slate-900 outline-none transition placeholder:text-stone-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 ${
          errors[k] ? "border-red-400" : "border-stone-200"
        }`}
      />
      {errors[k] && <span className="mt-1 block text-xs font-medium text-red-600">{errors[k]}</span>}
    </label>
  );
}

// Small numbered heading used for each form section
function SectionTitle({ n, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-yellow-400 text-sm font-extrabold text-slate-900">{n}</span>
      <h2 className="text-lg font-bold text-slate-900">{children}</h2>
    </div>
  );
}

const PAYMENTS = [
  { value: "card", title: "Credit / debit card", note: "Pay securely online" },
  { value: "cod", title: "Cash on delivery", note: "Pay when it arrives" },
];

function Checkout() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", payment: "card" });
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.address.trim().length < 5) e.address = "Enter your street address.";
    if (!form.city.trim()) e.city = "Enter your city.";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setOrderId("NT-" + Math.random().toString(36).slice(2, 8).toUpperCase()); // mock order
    clear();
  };

  // Order confirmation screen
  if (orderId)
    return (
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 text-4xl font-bold text-slate-900 shadow-lg shadow-yellow-500/30">
          ✓
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Order placed</h1>
        <p className="mt-3 text-stone-600">
          Thanks, {form.name.split(" ")[0]}. Your order is confirmed. A receipt is on its way to {form.email}.
        </p>
        <p className="mt-4 inline-block rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-bold text-slate-900">
          Order {orderId}
        </p>
        <div>
          <Link to="/" className={`${btnPrimary} mt-8 px-6 py-3`}>Keep shopping</Link>
        </div>
      </main>
    );

  // Empty cart
  if (!items.length)
    return (
      <main className="px-4 py-24 text-center text-stone-500">
        Your cart is empty.{" "}
        <Link to="/" className="font-semibold text-amber-700 hover:underline">Browse products</Link>
      </main>
    );

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_340px]">
      <form onSubmit={submit} noValidate className="space-y-7 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="h-7 w-1.5 rounded-full bg-yellow-400" />
          <h1 className="text-2xl font-extrabold text-slate-900">Checkout</h1>
        </div>

        {/* 1. Contact */}
        <section className="space-y-4">
          <SectionTitle n="1">Contact details</SectionTitle>
          <Field k="name" label="Full name" form={form} errors={errors} set={set} />
          <Field k="email" label="Email" type="email" form={form} errors={errors} set={set} />
        </section>

        {/* 2. Delivery */}
        <section className="space-y-4">
          <SectionTitle n="2">Delivery address</SectionTitle>
          <Field k="address" label="Street address" form={form} errors={errors} set={set} />
          <Field k="city" label="City" form={form} errors={errors} set={set} />
        </section>

        {/* 3. Payment */}
        <section className="space-y-4">
          <SectionTitle n="3">Payment method</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {PAYMENTS.map((m) => {
              const selected = form.payment === m.value;
              return (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, payment: m.value }))}
                  aria-pressed={selected}
                  className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition ${
                    selected ? "border-yellow-400 bg-yellow-50" : "border-stone-200 bg-white hover:border-yellow-300"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
                      selected ? "border-yellow-500 bg-yellow-400" : "border-stone-300"
                    }`}
                  >
                    {selected && <span className="h-2 w-2 rounded-full bg-slate-900" />}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-900">{m.title}</span>
                    <span className="block text-xs text-stone-500">{m.note}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <p className="text-xs text-stone-500">This is a demo store. No payment is taken.</p>
        <button type="submit" className={`${btnPrimary} w-full px-6 py-3.5 text-base`}>
          Place order · {money(total + (total > 500 ? 0 : 15))}
        </button>
      </form>

      <Summary total={total}>
        <ul className="space-y-2 border-t border-stone-200 pt-4 text-sm text-stone-600">
          {items.map((i) => (
            <li key={i.id} className="flex justify-between gap-3">
              <span className="truncate">{i.qty} × {i.title}</span>
              <span className="font-medium text-slate-900">{money(i.qty * i.price)}</span>
            </li>
          ))}
        </ul>
      </Summary>
    </main>
  );
}

export default Checkout;
import { useState } from "react";
import { btnPrimary } from "../utils/ui";

// Same look for every input
const inputCls =
  "mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-slate-900 outline-none transition placeholder:text-stone-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50";

// Topics shown on the left side
const TOPICS = [
  ["Order help", "Track an order or change your delivery details."],
  ["Product questions", "Not sure which phone, laptop or headphones to pick? Ask us."],
  ["Returns", "30 days to change your mind. We'll guide you through it."],
];

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* Heading */}
      <div className="max-w-2xl">
        <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
          Contact
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">Contact NovaTech</h1>
        <p className="mt-3 text-lg text-stone-600">
          Questions about an order or a product? We reply within one business day.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Left: topics */}
        <div className="space-y-3">
          {TOPICS.map(([title, text]) => (
            <div key={title} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-yellow-300 hover:shadow-md hover:shadow-yellow-500/10">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-yellow-100 font-bold text-amber-700">✓</span>
              <div>
                <h2 className="font-bold text-slate-900">{title}</h2>
                <p className="mt-0.5 text-sm text-stone-600">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: form or success message */}
        {sent ? (
          <div className="grid place-items-center rounded-2xl border border-stone-200 bg-white p-10 text-center">
            <div>
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 text-3xl font-bold text-slate-900 shadow-lg shadow-yellow-500/30">
                ✓
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Message sent</h2>
              <p className="mt-2 text-stone-600">Thanks for reaching out. We'll get back to you soon.</p>
              <button onClick={() => setSent(false)} className={`${btnPrimary} mt-6 px-6 py-3`}>
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
          >
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Your name</span>
              <input required placeholder="e.g. Ayesha Khan" className={inputCls} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input required type="email" placeholder="you@example.com" className={inputCls} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Message</span>
              <textarea required rows={5} placeholder="How can we help?" className={`${inputCls} resize-none`} />
            </label>
            <button className={`${btnPrimary} w-full px-6 py-3.5 text-base`}>Send message</button>
          </form>
        )}
      </div>
    </main>
  );
}

export default Contact;
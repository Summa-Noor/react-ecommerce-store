import axios from "axios";

export const api = axios.create({ baseURL: "https://dummyjson.com" });

// DummyJSON has no "headphones" category: they live in "mobile-accessories",
// so we keep only audio items from it via a title/tag match.
const AUDIO_RE = /airpods|beats|headphone|earphone|earbud|buds|headset/i;
const isAudio = (p) => AUDIO_RE.test(p.title) || (p.tags || []).some((t) => AUDIO_RE.test(t));

export const CATEGORIES = [
  { slug: "phones", label: "Phones", source: "smartphones" },
  { slug: "laptops", label: "Laptops", source: "laptops" },
  { slug: "headphones", label: "Headphones", source: "mobile-accessories" },
];

// Keeps only products that belong to one of our 3 tech categories.
const belongsTo = (p, slug) => {
  if (slug === "phones") return p.category === "smartphones";
  if (slug === "laptops") return p.category === "laptops";
  if (slug === "headphones") return p.category === "mobile-accessories" && isAudio(p);
  return false;
};
const inCatalog = (p) => CATEGORIES.some((c) => belongsTo(p, c.slug));

/** Fetch catalog products, optionally by category slug and/or search text. */
export async function fetchProducts({ category, search }) {
  if (search) {
    // Server-side search, then restrict results to our 3 categories.
    const { data } = await api.get("/products/search", { params: { q: search, limit: 0 } });
    return data.products.filter((p) => (category ? belongsTo(p, category) : inCatalog(p)));
  }
  const wanted = category ? CATEGORIES.filter((c) => c.slug === category) : CATEGORIES;
  const results = await Promise.all(
    wanted.map((c) => api.get(`/products/category/${c.source}`, { params: { limit: 0 } }))
  );
  return results.flatMap((r) => r.data.products).filter(inCatalog);
}

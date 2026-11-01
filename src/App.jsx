/** NovaTech Store: routes and layout. Each page/component lives in its own file. */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useDebounce from "./hooks/useDebounce";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import ErrorBox from "./components/ErrorBox";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";

function Shell() {
  const [query, setQuery] = useState("");
  const search = useDebounce(query.trim(), 500); // API call fires 500 ms after typing stops

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-stone-50 via-white to-yellow-50/50 text-slate-800">
      <ScrollTop />
      <Navbar query={query} setQuery={setQuery} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/category/:slug" element={<Home search={search} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={<ErrorBox title="Page not found" message="The page you are looking for does not exist." />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Shell />
      </CartProvider>
    </BrowserRouter>
  );
}
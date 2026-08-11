import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, FlaskConical, Sparkles, Snowflake, Heart, CheckCircle2, ChevronLeft, ChevronRight, ShoppingBag, ArrowRight, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { productApi } from "../api/product.api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function SmoothiePremix() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  // Filter Drawer State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  // Sort Drawer State
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll();
        const data = res.data ?? res;
        // Filter by Smoothie Premix category
        const filtered = data.filter((p: any) =>
          p.category.toLowerCase().replace(/[\s_]+/g, "-") === "smoothie-premix"
        );
        setAllProducts(filtered);
        setProducts(filtered);
      } catch (err) {
        console.error("Failed to load smoothie products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const applyFiltersAndSort = () => {
    let result = [...allProducts];

    // Availability
    if (inStockOnly && !outOfStockOnly) {
      result = result.filter(p => !p.stock || p.stock === "In Stock");
    } else if (outOfStockOnly && !inStockOnly) {
      result = result.filter(p => p.stock === "Out of Stock");
    }

    // Price
    if (priceFrom) {
      result = result.filter(p => p.price >= parseFloat(priceFrom));
    }
    if (priceTo) {
      result = result.filter(p => p.price <= parseFloat(priceTo));
    }

    // Sorting
    if (sortOption === "featured") {
      result = result.filter(p => p.featured).concat(result.filter(p => !p.featured));
    } else if (sortOption === "best-selling") {
      result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
    } else if (sortOption === "price-low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-to-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "alpha-a-z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "alpha-z-a") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setProducts(result);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [inStockOnly, outOfStockOnly, priceFrom, priceTo, sortOption, allProducts]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product._id || product.id]: true }));
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product._id || product.id]: false }));
    }, 1500);
  };

  const testimonials = [
    { text: "The Berry Blast is my everyday energy booster! Tastes amazing and so easy to make.", author: "Ananya, Delhi" },
    { text: "Royal Mango is just like drinking a real mango shake. Love it!", author: "Rohan, Bangalore" },
    { text: "Banana Power keeps me full and helps with my workouts.", author: "Karan, Mumbai" }
  ];

  const [reviewIdx, setReviewIdx] = useState(0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#213B14]">
      <Header />

      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#FDF3F4] via-[#FCEAEB] to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block px-3 py-1 bg-[#B82A5F]/10 border border-[#B82A5F]/20 text-[#B82A5F] text-xs font-bold uppercase tracking-wider rounded-md">
                SipReal
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#213B14] leading-tight">
                SipReal <br />
                <span className="text-[#B82A5F] font-normal italic">Premix Smoothie</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Real Taste. Real Nutrition. Just Add Water & Sip.
              </p>
              <p className="text-xs text-gray-500 max-w-sm">
                Delicious premix smoothies made with 100% real freeze-dried fruits. No added sugar, no preservatives, no artificial anything.
              </p>

              {/* Top Badges */}
              <div className="flex flex-wrap gap-3">
                {["NO ADDED SUGAR", "NO PRESERVATIVES", "100% REAL FRUITS", "JUST ADD WATER"].map((b, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white/80 border border-[#213B14]/10 rounded-md text-[10px] font-extrabold text-[#3F622D] tracking-wider uppercase">
                    {b}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href="#flavors"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#B82A5F] hover:bg-[#961F4B] text-white font-bold rounded-full transition-all shadow-md hover:scale-[1.02]"
                >
                  EXPLORE FLAVORS
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Collage mockup showcase */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[5/4] rounded-2xl overflow-hidden shadow-lg bg-[#FCEAEB] border border-[#B82A5F]/10">
                <img
                  src="https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80"
                  alt="SipReal Group Package Collage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Middle Badges Banner */}
      <section className="bg-[#B82A5F] text-[#FAF7F2] py-4 select-none">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs font-bold tracking-widest uppercase flex flex-wrap justify-center gap-8 md:gap-16">
          <span>🥤 100% Real Fruits</span>
          <span>❄️ Freeze-Dried</span>
          <span>🍃 No Added Sugar</span>
          <span>🧪 No Preservatives</span>
        </div>
      </section>

      {/* Refreshing Flavors Grid */}
      <section id="flavors" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B82A5F] bg-[#B82A5F]/10 px-3 py-1 rounded">Our</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#213B14] mt-2">
              Refreshing Flavors
            </h2>
          </div>

          {/* Filter & Sort Action Row */}
          <div className="flex justify-between items-center max-w-5xl mx-auto mb-10 pt-4 border-t border-[#213B14]/10">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#213B14]/15 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#B82A5F]" />
              Filter
            </button>
            <button
              onClick={() => setIsSortOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#213B14]/15 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowUpDown className="w-4 h-4 text-[#B82A5F]" />
              Sort
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-2 border-[#B82A5F] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white/40 rounded-2xl border border-[#213B14]/5 max-w-5xl mx-auto">
              <h3 className="font-serif text-lg font-bold text-gray-400">No Smoothies match your filters</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {products.map((product) => (
                <div
                  key={product._id || product.id}
                  className="bg-white rounded-2xl p-6 border border-[#213B14]/5 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    <div className="aspect-[4/3] w-full rounded-xl bg-[#FDF3F4] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#213B14]">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{product.subtitle || "Premium real fruit premix."}</p>
                    </div>

                    <div className="space-y-2 pt-2">
                      {product.trustBadges?.slice(0, 3).map((badge: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-[#3F622D] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B82A5F]" />
                          <span>{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#213B14]/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block">{product.weight} | 1 Serving</span>
                      <span className="font-serif text-xl font-black text-[#213B14]">₹{product.price}</span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        addedItems[product._id || product.id]
                          ? "bg-green-700 text-white shadow-none"
                          : "bg-[#B82A5F] text-white hover:bg-[#961F4B] shadow-md shadow-[#B82A5F]/15"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {addedItems[product._id || product.id] ? "Added!" : "SHOP NOW"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Steps & Why SipReal? Block */}
      <section className="py-20 bg-white border-t border-b border-[#213B14]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8 bg-[#FAF7F2] p-8 rounded-2xl border border-[#213B14]/5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Ready in</span>
                <h3 className="font-serif text-2xl font-extrabold text-[#213B14]">
                  3 Easy Steps!
                </h3>
              </div>

              <div className="space-y-6">
                {[
                  { step: "1", title: "Add Premix", desc: "Add 2 heaped tbsp (25g) of SipReal premix into your glass or shaker." },
                  { step: "2", title: "Add Water", desc: "Pour in 150-200ml of chilled water or milk based on preference." },
                  { step: "3", title: "Shake & Enjoy", desc: "Shake or stir well for 10 seconds and enjoy the pure fruit goodness!" }
                ].map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-[#B82A5F] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-[#213B14]">{s.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 p-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B82A5F]">Why Us</span>
                <h3 className="font-serif text-3xl font-extrabold text-[#213B14] mt-1">
                  Why SipReal?
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use advanced freeze-drying technology that retains the natural taste, color, vitamins, and minerals of real fruits — so every sip is as good as real. No artificial flavors, colors, or stabilizers added.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Real Taste", desc: "Tastes like fresh fruit" },
                  { title: "Better Nutrition", desc: "100% nutrients locked in" },
                  { title: "No Mess", desc: "No washing/peeling required" },
                  { title: "Clean Snacking", desc: "Zero guilt, pure health" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF7F2] rounded-xl border border-[#213B14]/5">
                    <h4 className="font-bold text-[#B82A5F] text-sm">{item.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Review Section */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B82A5F]">Loved by Our Customers</span>
          <div className="relative bg-white p-8 rounded-2xl border border-[#213B14]/5 shadow-sm min-h-[140px] flex flex-col justify-center">
            <p className="font-serif text-lg italic text-[#213B14] leading-relaxed">
              "{testimonials[reviewIdx].text}"
            </p>
            <h4 className="text-xs font-black uppercase text-[#B82A5F] tracking-widest mt-4">
              - {testimonials[reviewIdx].author}
            </h4>
            <div className="absolute top-1/2 -translate-y-1/2 left-3">
              <button
                onClick={() => setReviewIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-full border border-[#213B14]/10 bg-white flex items-center justify-center text-[#213B14] hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-3">
              <button
                onClick={() => setReviewIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-8 h-8 rounded-full border border-[#213B14]/10 bg-white flex items-center justify-center text-[#213B14] hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER DRAWER PANEL */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="font-serif text-xl font-black uppercase tracking-wider">FILTER</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="text-[#213B14]/65 hover:text-[#213B14]">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Availability</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => {
                          setInStockOnly(e.target.checked);
                          if (e.target.checked) setOutOfStockOnly(false);
                        }}
                        className="rounded border-[#213B14]/20 focus:ring-[#B82A5F] text-[#B82A5F]"
                      />
                      In stock
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={outOfStockOnly}
                        onChange={(e) => {
                          setOutOfStockOnly(e.target.checked);
                          if (e.target.checked) setInStockOnly(false);
                        }}
                        className="rounded border-[#213B14]/20 focus:ring-[#B82A5F] text-[#B82A5F]"
                      />
                      Out of stock
                    </label>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Price</h4>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="From"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-xs outline-none"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="To"
                      value={priceTo}
                      onChange={(e) => setPriceTo(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-xs outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-3 bg-[#B82A5F] hover:bg-[#961F4B] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  APPLY
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SORT DRAWER PANEL */}
      <AnimatePresence>
        {isSortOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSortOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="font-serif text-xl font-black uppercase tracking-wider">SORT</h3>
                  <button onClick={() => setIsSortOpen(false)} className="text-[#213B14]/65 hover:text-[#213B14]">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { value: "featured", label: "Featured" },
                    { value: "best-selling", label: "Best selling" },
                    { value: "alpha-a-z", label: "Alphabetically, A-Z" },
                    { value: "alpha-z-a", label: "Alphabetically, Z-A" },
                    { value: "price-low-to-high", label: "Price, low to high" },
                    { value: "price-high-to-low", label: "Price, high to low" }
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 text-xs font-semibold text-gray-600 cursor-pointer py-1">
                      <input
                        type="radio"
                        name="sort-opt"
                        checked={sortOption === opt.value}
                        onChange={() => setSortOption(opt.value)}
                        className="text-[#B82A5F] focus:ring-[#B82A5F]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t">
                <button
                  onClick={() => setIsSortOpen(false)}
                  className="w-full py-3 bg-[#B82A5F] hover:bg-[#961F4B] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  APPLY
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

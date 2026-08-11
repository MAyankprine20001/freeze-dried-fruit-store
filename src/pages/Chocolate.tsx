import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, FlaskConical, Sparkles, Snowflake, Heart, ShoppingBag, CheckCircle2, SlidersHorizontal, ArrowUpDown, X, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { productApi } from "../api/product.api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Chocolate() {
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
        // Filter by Chocolates category
        const filtered = data.filter((p: any) =>
          p.category.toLowerCase().replace(/[\s_]+/g, "-") === "chocolates"
        );
        setAllProducts(filtered);
        setProducts(filtered);
      } catch (err) {
        console.error("Failed to load chocolate products", err);
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

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#213B14]">
      <Header />

      <section className="relative pt-32 pb-20 overflow-hidden flex items-center min-h-[520px] lg:min-h-[640px]">
        {/* Absolute Background Image */}
        <img 
          src="/Freeze_background_image.png" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0" 
        />
        {/* Subtle overlay for legibility on small screens */}
        <div className="absolute inset-0 bg-[#FAF7F2]/40 md:bg-transparent z-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#4A2D1B] leading-none block">
                  Freeze
                </span>
                <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light italic text-[#4A2D1B] leading-none block mt-1">
                  Fusion
                </span>
              </div>
              
              <h2 className="text-[#4A2D1B] text-[13px] sm:text-sm font-black uppercase tracking-[0.18em] leading-tight max-w-md">
                REAL FRUIT INFUSED <br />
                RICH COUVERTURE CHOCOLATES
              </h2>
              
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                Crunchy outside. Creamy inside. <br />
                Real joy in every bite.
              </p>

              {/* Badges - Circular Icons under text */}
              <div className="flex flex-wrap items-start gap-4 md:gap-5 pt-2">
                {[
                  { label: "Real Fruit Inside", icon: Leaf },
                  { label: "Premium Couverture", icon: Sparkles },
                  { label: "Freeze Dried Goodness", icon: Snowflake },
                  { label: "True Indulgence", icon: Heart }
                ].map((badge, idx) => {
                  const words = badge.label.split(" ");
                  const line1 = words.slice(0, 2).join(" ");
                  const line2 = words.slice(2).join(" ");
                  return (
                    <div key={idx} className="flex flex-col items-center text-center gap-1 w-18 md:w-20">
                      <div className="w-8 h-8 rounded-full border border-[#4A2D1B]/20 flex items-center justify-center text-[#4A2D1B] bg-white/50 backdrop-blur-sm">
                        <badge.icon className="w-3.5 h-3.5 stroke-[1.75]" />
                      </div>
                      <span className="text-[8px] md:text-[9px] font-bold text-[#4A2D1B] leading-tight tracking-wider uppercase">
                        {line1}
                        {line2 && <><br />{line2}</>}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4">
                <a
                  href="#flavors"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#4A2D1B] hover:bg-[#382012] text-[#FAF7F2] font-extrabold rounded-full transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  EXPLORE FLAVORS
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Foreground Product Image on the Right */}
            <div className="lg:col-span-7 flex justify-center z-20">
              <img
                src="/freeze_product_image.png"
                alt="Freeze Fusion Chocolates Showcase"
                className="w-full max-w-4xl lg:max-w-[850px] xl:max-w-[950px] h-auto object-contain lg:scale-[1.3] hover:scale-[1.32] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Badges Bar below Hero */}
      <section className="bg-[#4A2D1B] text-[#FAF7F2] py-5 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-[#FAF7F2]/15">
            {[
              { title: "100% REAL FRUITS", desc: "Nothing Artificial", icon: Leaf },
              { title: "RICH COUVERTURE", desc: "Luxury Chocolate", icon: Sparkles },
              { title: "NO PRESERVATIVES", desc: "No Additives", icon: FlaskConical },
              { title: "FREEZE DRIED", desc: "To Lock Nutrition", icon: Snowflake }
            ].map((b, idx) => (
              <div key={idx} className="flex-1 min-w-[180px] flex items-center justify-center gap-4 px-4 py-1 md:py-0">
                <div className="text-[#FAF7F2]">
                  <b.icon className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-white uppercase tracking-wider">{b.title}</span>
                  <span className="text-[10px] text-gray-300 font-semibold">{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Irresistible Flavors Grid */}
      <section id="flavors" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="font-serif italic text-base font-normal text-[#C48C5B] block mb-1">Our</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A2D1B] tracking-wider uppercase">
              4 Irresistible Flavors
            </h2>
          </div>

          {/* Filter & Sort Action Row */}
          <div className="flex justify-between items-center max-w-5xl mx-auto mb-10 pt-4 border-t border-[#213B14]/10">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#213B14]/15 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#4A2D1B]" />
              Filter
            </button>
            <button
              onClick={() => setIsSortOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#213B14]/15 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowUpDown className="w-4 h-4 text-[#4A2D1B]" />
              Sort
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-2 border-[#4A2D1B] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white/40 rounded-2xl border border-[#213B14]/5 max-w-5xl mx-auto">
              <h3 className="font-serif text-lg font-bold text-gray-400">No Chocolates match your filters</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {products.map((product) => (
                <div
                  key={product._id || product.id}
                  className="bg-white rounded-2xl p-5 border border-[#213B14]/5 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    <div className="aspect-[4/3] w-full rounded-xl bg-[#FAF5F0] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#213B14] line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.subtitle}</p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      {product.trustBadges?.slice(0, 2).map((badge: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-[#3F622D] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4A2D1B]" />
                          <span>{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#213B14]/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block">{product.weight}</span>
                      <span className="font-serif text-lg font-black text-[#213B14]">₹{product.price}</span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        addedItems[product._id || product.id]
                          ? "bg-green-700 text-white shadow-none"
                          : "bg-[#4A2D1B] text-white hover:bg-[#382012] shadow-md shadow-[#4A2D1B]/15"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {addedItems[product._id || product.id] ? "Added!" : "ADD TO CART"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why You'll Love It Section */}
      <section className="py-20 bg-white border-t border-[#213B14]/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#4A2D1B]/15 shadow-md p-8 md:p-12 bg-[#FAF7F2] min-h-[420px] flex flex-col justify-between gap-8">
            {/* Background Image showing chocolate stack on left and strawberry bowl on right */}
            <img 
              src="/why_love_it_bg.png" 
              alt="Why You'll Love It Background" 
              className="absolute inset-0 w-full h-full object-cover object-center z-0" 
            />
            {/* Soft overlay for text contrast */}
            <div className="absolute inset-0 bg-white/15 z-10 pointer-events-none" />

            {/* Inner Title centered inside the card */}
            <div className="relative z-20 text-center w-full">
              <h3 className="font-serif text-xl sm:text-2xl font-black text-[#4D2E1A] tracking-widest uppercase">
                WHY YOU'LL LOVE IT
              </h3>
            </div>

            {/* Grid of features with individual translucent cards */}
            <div className="relative z-20 w-full grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
              {[
                { title: "Real Fruit Infused", desc: "Every bite has real freeze-dried fruit for authentic taste and crunch.", icon: Leaf },
                { title: "Rich Couverture Chocolate", desc: "Made with premium quality chocolate for a smooth & luxurious experience.", icon: Sparkles },
                { title: "Freeze Dried Technology", desc: "Locks nutrition, color and natural goodness of real fruits.", icon: Snowflake },
                { title: "Made for True Indulgence", desc: "A perfect balance of taste, texture and real ingredients — no compromise.", icon: Heart }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 border border-white/60 flex flex-col items-center text-center gap-3 hover:scale-[1.02] transition-transform duration-300 shadow-sm">
                  <div className="text-[#C48C5B]">
                    <item.icon className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#4A2D1B] text-xs uppercase tracking-wider leading-tight">{item.title}</h4>
                    <p className="text-[10.5px] sm:text-[11px] text-gray-600 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore Chocolates Banner */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-[#1C2A18]">
        <img
          src="/chocolate_banner_bg.png"
          alt="Real Chocolate Banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 md:opacity-50"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-[#4A2D1B]/75 md:bg-gradient-to-r md:from-[#4A2D1B]/95 md:to-transparent z-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-[#FAF7F2] tracking-wide">
              Real Fruit. Real Chocolate. Real Joy.
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm font-medium">
              Experience the ultimate fusion of freeze-dried fruit and rich premium couverture chocolate.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FAF7F2] hover:bg-[#FAF7F2]/90 text-[#4A2D1B] font-extrabold rounded-full transition-all duration-300 shadow-md hover:scale-[1.02]"
            >
              EXPLORE ALL CHOCOLATES
              <ArrowRight className="w-4 h-4" />
            </Link>
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
                        className="rounded border-[#213B14]/20 focus:ring-[#4A2D1B] text-[#4A2D1B]"
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
                        className="rounded border-[#213B14]/20 focus:ring-[#4A2D1B] text-[#4A2D1B]"
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
                  className="w-full py-3 bg-[#4A2D1B] hover:bg-[#382012] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
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
                        className="text-[#4A2D1B] focus:ring-[#4A2D1B]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t">
                <button
                  onClick={() => setIsSortOpen(false)}
                  className="w-full py-3 bg-[#4A2D1B] hover:bg-[#382012] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
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

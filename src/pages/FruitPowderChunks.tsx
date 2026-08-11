import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, FlaskConical, Sparkles, Snowflake, Heart, ShoppingBag, CheckCircle2, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown, X, ArrowRight, Smile, Gift } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { productApi } from "../api/product.api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function FruitPowderChunks() {
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
        // Filter by Fruit Chunks category
        const filtered = data.filter((p: any) =>
          p.category.toLowerCase().replace(/[\s_]+/g, "-") === "fruit-chunks"
        );
        setAllProducts(filtered);
        setProducts(filtered);
      } catch (err) {
        console.error("Failed to load crispy bites products", err);
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
    { text: "The mango bites are super crunchy and taste exactly like real mango! My go-to healthy snack.", author: "Ananya, Delhi" },
    { text: "Jamun bites are so unique and tasty. Love the tangy flavor and the crunch.", author: "Rohan, Bangalore" },
    { text: "Mixed fruit is my favorite! Kids love it too. Finally a snack I can trust.", author: "Priya, Mumbai" }
  ];

  const [reviewIdx, setReviewIdx] = useState(0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#213B14]">
      <Header />

      {/* Hero Banner Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[680px] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Absolute Background Image */}
        <img 
          src="/cripsy_background_img.png" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0" 
        />
        {/* Subtle gradient overlay for readability on small screens */}
        <div className="absolute inset-0 bg-[#FAF7F2]/40 md:bg-transparent md:bg-gradient-to-r md:from-[#FAF7F2]/80 md:to-transparent z-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#213B14] leading-[1.1] tracking-tight">
                CRISPY. CRUNCHY. <br />
                100% REAL FRUIT.
              </h1>
              <div>
                <span className="inline-block px-3 py-1.5 bg-[#2B4C1F] text-white text-[10px] font-extrabold tracking-widest uppercase rounded">
                  FREEZE DRIED BITE
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                Light, crispy & delicious freeze dried fruit snacks made from 100% real fruits. No preservatives, no added sugar, no artificial anything.
              </p>

              {/* Grid of Badges - Horizontal row with icon top, text bottom */}
              <div className="flex flex-wrap items-start gap-4 md:gap-6 pt-2">
                {[
                  { label: "100% Real Fruit", icon: Leaf },
                  { label: "No Added Sugar", icon: Sparkles },
                  { label: "No Preservatives", icon: FlaskConical },
                  { label: "Natural Goodness", icon: Heart }
                ].map((badge, idx) => {
                  const words = badge.label.split(" ");
                  const line1 = words.slice(0, 2).join(" ");
                  const line2 = words.slice(2).join(" ");
                  return (
                    <div key={idx} className="flex flex-col items-center text-center gap-1.5 w-18 md:w-20">
                      <div className="w-9 h-9 rounded-full border border-[#213B14]/20 flex items-center justify-center text-[#213B14] bg-white/50 backdrop-blur-sm">
                        <badge.icon className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-[#213B14] leading-tight tracking-wider uppercase">
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
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2B4C1F] hover:bg-[#1E3615] text-[#FAF7F2] font-extrabold rounded-full transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  SHOP ALL FLAVORS
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Foreground Product Image on the Right */}
            <div className="lg:col-span-7 flex justify-center z-20">
              <img
                src="/CripsyProductImage.png"
                alt="Crispy Bites Products Showcase"
                className="w-full max-w-4xl lg:max-w-[850px] xl:max-w-[950px] h-auto object-contain lg:scale-[1.3] hover:scale-[1.32] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

    

      {/* Flavors Grid */}
      <section id="flavors" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2B4C1F] bg-[#2B4C1F]/10 px-3 py-1 rounded">Our</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#213B14] mt-2">
              Our Flavors
            </h2>
            <p className="text-[#3F622D] text-xs font-bold uppercase tracking-widest mt-2">
              100% Real Fruits. 100% Delicious.
            </p>
          </div>

          {/* Filter & Sort Action Row */}
          <div className="flex justify-between items-center max-w-5xl mx-auto mb-10 pt-4 border-t border-[#213B14]/10">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#213B14]/15 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#2B4C1F]" />
              Filter
            </button>
            <button
              onClick={() => setIsSortOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#213B14]/15 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowUpDown className="w-4 h-4 text-[#2B4C1F]" />
              Sort
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-2 border-[#2B4C1F] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white/40 rounded-2xl border border-[#213B14]/5 max-w-5xl mx-auto">
              <h3 className="font-serif text-lg font-bold text-gray-400">No Fruit Snacks match your filters</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {products.map((product) => (
                <div
                  key={product._id || product.id}
                  className="bg-white rounded-2xl p-6 border border-[#213B14]/5 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    <div className="aspect-[4/3] w-full rounded-xl bg-[#EEF4EC] overflow-hidden relative">
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
                      <p className="text-xs text-gray-400 mt-1">{product.subtitle}</p>
                    </div>

                    <div className="space-y-2 pt-2">
                      {product.trustBadges?.slice(0, 3).map((badge: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-[#3F622D] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2B4C1F]" />
                          <span>{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#213B14]/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block">{product.weight}</span>
                      <span className="font-serif text-xl font-black text-[#213B14]">₹{product.price}</span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        addedItems[product._id || product.id]
                          ? "bg-green-700 text-white shadow-none"
                          : "bg-[#2B4C1F] text-white hover:bg-[#1E3615] shadow-md shadow-[#2B4C1F]/15"
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

      {/* Product Characteristics Banner */}
      <section className="py-8 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EEF4EC]/60 rounded-2xl p-6 border border-[#2B4C1F]/10 flex flex-wrap justify-between items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-[#2B4C1F]/15">
            {[
              { title: "FREEZE DRIED", desc: "To Lock Nutrition", icon: Snowflake },
              { title: "LIGHT & CRISPY", desc: "Crunchy Goodness", icon: Leaf },
              { title: "NO PRESERVATIVES", desc: "No Additives", icon: FlaskConical },
              { title: "TRAVEL FRIENDLY", desc: "Easy to Carry", icon: ShoppingBag },
              { title: "KIDS APPROVED", desc: "Healthy Snacking", icon: Smile }
            ].map((b, idx) => (
              <div key={idx} className="flex-1 min-w-[180px] flex items-center justify-center gap-4 px-4 py-2 md:py-0">
                <div className="text-[#2B4C1F]">
                  <b.icon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-[#213B14] uppercase tracking-wider">{b.title}</span>
                  <span className="text-[10px] text-gray-500 font-semibold">{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Enjoy & Banner Section */}
      <section className="py-16 bg-white border-t border-b border-[#213B14]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Ways to Enjoy */}
            <div className="lg:col-span-7 bg-[#EEF4EC]/30 rounded-2xl p-6 md:p-8 border border-[#2B4C1F]/10 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-[#2B4C1F]/10 pb-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-[#213B14]">
                    Ways to Enjoy 🍃
                  </h3>
                </div>
                
                <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-2">
                  {[
                    { title: "Straight from the pack", icon: "/straight_pack.png" },
                    { title: "Top on Yogurt", icon: "/top_yogurt.png" },
                    { title: "Add to Cereal", icon: "/add_cereal.png" },
                    { title: "Perfect for Desserts", icon: "/perfect_desserts.png" }
                  ].map((item, idx) => {
                    const words = item.title.split(" ");
                    const line1 = words.slice(0, 2).join(" ");
                    const line2 = words.slice(2).join(" ");
                    return (
                      <div key={idx} className="flex flex-col items-center text-center gap-3">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#2B4C1F]/20 shadow-sm bg-white">
                          <img src={item.icon} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[9px] sm:text-[11px] font-bold text-[#213B14] leading-tight tracking-wide">
                          {line1}
                          {line2 && <><br />{line2}</>}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Card: Dark Green Banner */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl flex items-center p-8 md:p-10 bg-[#1C2A18] text-[#FAF7F2] shadow-sm min-h-[220px]">
              {/* Background Image of Banner */}
              <img 
                src="/real_goodness_banner.png" 
                alt="Real Goodness Background" 
                className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-90" 
              />
              {/* Overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C2A18]/90 via-[#1C2A18]/45 to-transparent z-10 pointer-events-none" />
              
              <div className="relative z-20 space-y-3 max-w-[280px] text-left">
                <h4 className="font-serif text-xl sm:text-2xl font-black uppercase tracking-wider leading-tight text-[#FAF7F2]">
                  REAL FRUIT. <br />
                  REAL GOODNESS.
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-300 font-semibold leading-relaxed">
                  Nothing Artificial, Nothing Extra. <br />
                  Just Pure Fruit, Freeze Dried.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2B4C1F]">Loved by Our Customers</span>
          <div className="relative bg-white p-8 rounded-2xl border border-[#213B14]/5 shadow-sm min-h-[140px] flex flex-col justify-center">
            <p className="font-serif text-lg italic text-[#213B14] leading-relaxed">
              "{testimonials[reviewIdx].text}"
            </p>
            <h4 className="text-xs font-black uppercase text-[#2B4C1F] tracking-widest mt-4">
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

      {/* Join Family Section */}
      <section className="bg-[#1C2A18] text-[#FAF7F2] py-6 select-none border-t border-[#FAF7F2]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="text-[#FAF7F2]">
              <Gift className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#D6C5A0] tracking-wider uppercase">Join The Dry Factory Family</h4>
              <p className="text-[11px] text-gray-300 font-medium">Get exclusive offers, new launches & healthy tips straight to your inbox.</p>
            </div>
          </div>
          <div className="flex w-full md:w-auto max-w-md items-center bg-white rounded-lg overflow-hidden p-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-xs text-[#213B14] bg-transparent border-none outline-none placeholder-gray-400"
            />
            <button className="bg-[#E4B34F] hover:bg-[#D4A13F] text-[#213B14] text-[10px] font-black tracking-widest px-6 py-2.5 rounded-md uppercase transition-colors">
              SUBSCRIBE
            </button>
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
                        className="rounded border-[#213B14]/20 focus:ring-[#2B4C1F] text-[#2B4C1F]"
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
                        className="rounded border-[#213B14]/20 focus:ring-[#2B4C1F] text-[#2B4C1F]"
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
                  className="w-full py-3 bg-[#2B4C1F] hover:bg-[#1E3615] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
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
                        className="text-[#2B4C1F] focus:ring-[#2B4C1F]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t">
                <button
                  onClick={() => setIsSortOpen(false)}
                  className="w-full py-3 bg-[#2B4C1F] hover:bg-[#1E3615] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
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

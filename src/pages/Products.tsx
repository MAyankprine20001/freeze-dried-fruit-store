import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ArrowUpDown, X, Star, Heart, ShoppingBag, CheckCircle2, Award, Zap, ShieldCheck } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { productApi } from "../api/product.api";

export default function Products() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  // Filter Drawer State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  // Sort Drawer State
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("featured");

  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productApi.getAll();
        const data = res.data ?? res;
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle Filtering & Sorting
  const applyFiltersAndSort = () => {
    let result = [...allProducts];

    // Category filter mapping
    if (activeCategory === "fruits") {
      result = result.filter(p => p.category.toLowerCase().replace(/[\s_]+/g, "-") === "fruit-chunks");
    } else if (activeCategory === "ice-creams") {
      result = result.filter(p => p.category.toLowerCase().replace(/[\s_]+/g, "-") === "smoothie-premix");
    } else if (activeCategory === "candies") {
      result = result.filter(p => p.category.toLowerCase().replace(/[\s_]+/g, "-") === "chocolates");
    }

    // Availability filter
    if (inStockOnly && !outOfStockOnly) {
      result = result.filter(p => !p.stock || p.stock === "In Stock");
    } else if (outOfStockOnly && !inStockOnly) {
      result = result.filter(p => p.stock === "Out of Stock");
    }

    // Price filter
    if (priceFrom) {
      result = result.filter(p => p.price >= parseFloat(priceFrom));
    }
    if (priceTo) {
      result = result.filter(p => p.price <= parseFloat(priceTo));
    }

    // Sorting options
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
    } else if (sortOption === "date-new-to-old") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === "date-old-to-new") {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    setFilteredProducts(result);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [activeCategory, allProducts]);

  const handleApplyFilter = () => {
    applyFiltersAndSort();
    setIsFilterOpen(false);
  };

  const handleApplySort = () => {
    applyFiltersAndSort();
    setIsSortOpen(false);
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product._id || product.id]: true }));
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product._id || product.id]: false }));
    }, 1500);
  };

  // Helper to show category labels
  const getCategoryTitle = () => {
    if (activeCategory === "fruits") return "Fruits / Crispy Bites";
    if (activeCategory === "ice-creams") return "Ice Creams / SipReal Premixes";
    if (activeCategory === "candies") return "Candies / Freeze Fusion Chocolates";
    return "All Products";
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#213B14]">
      <Header />

      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Page Heading */}
        <div className="text-center">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#213B14]">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-widest mt-2">
            Enjoy organic, freeze-dried goodness crafted for taste & health.
          </p>
        </div>

        {/* 3 Dedicated Categories Option Cards (Shop Selector Index) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              id: "ice-creams",
              title: "SipReal",
              subtitle: "PREMIX SMOOTHIE",
              desc: "Real fruit smoothie premixes. Just add water & sip.",
              bgClass: "bg-[#FCEAEB]",
              btnBg: "bg-[#B82A5F]",
              textColor: "text-[#B82A5F]",
              btnText: "EXPLORE SIPREAL →",
              image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80"
            },
            {
              id: "candies",
              title: "FreezeFusion",
              subtitle: "CHOCOLATES",
              desc: "Real fruit infused rich couverture chocolates.",
              bgClass: "bg-[#F5ECE6]",
              btnBg: "bg-[#4A2D1B]",
              textColor: "text-[#4A2D1B]",
              btnText: "EXPLORE CHOCOLATES →",
              image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80"
            },
            {
              id: "fruits",
              title: "Crispy Bites",
              subtitle: "FREEZE DRIED SNACKS",
              desc: "Crispy, crunchy & naturally delicious fruit bites.",
              bgClass: "bg-[#EEF4EC]",
              btnBg: "bg-[#2B4C1F]",
              textColor: "text-[#2B4C1F]",
              btnText: "EXPLORE BITES →",
              image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80"
            }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === "fruits") navigate("/fruit-powder-chunks");
                if (cat.id === "ice-creams") navigate("/smoothie-premix");
                if (cat.id === "candies") navigate("/chocolate");
              }}
              className={`rounded-[24px] p-6 flex flex-col text-left transition-all duration-300 hover:shadow-lg ${cat.bgClass} hover:scale-[1.01]`}
            >
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className={`font-serif text-2xl font-black ${cat.textColor}`}>
                    {cat.title}
                  </h3>
                  <span className="text-[10px] font-bold text-gray-500 tracking-[0.15em] block mt-0.5">
                    {cat.subtitle}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {cat.desc}
                </p>
                <div className="w-full h-36 rounded-xl overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full mt-6">
                <div className={`w-full py-3 ${cat.btnBg} text-white rounded-full text-[10px] font-black uppercase tracking-widest text-center shadow-sm`}>
                  {cat.btnText}
                </div>
              </div>
            </button>
          ))}
        </section>

        {/* Filter and Sort Action Buttons Row */}
        <div className="flex justify-between items-center max-w-5xl mx-auto pt-6 border-t border-[#213B14]/10">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 border border-[#213B14]/15 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#3F622D]" />
            Filter
          </button>

          <button
            onClick={() => setIsSortOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 border border-[#213B14]/15 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowUpDown className="w-4 h-4 text-[#3F622D]" />
            Sort
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-[#213B14] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-2xl border border-[#213B14]/5 max-w-5xl mx-auto">
            <h3 className="font-serif text-xl font-bold text-gray-400">No Products Found</h3>
            <p className="text-xs text-gray-400 mt-1">Try resetting your filters or select a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {filteredProducts.map((product) => (
              <div
                key={product._id || product.id}
                onClick={() => navigate(`/product/${product._id || product.id}`)}
                className="bg-white rounded-2xl p-4 border border-[#213B14]/5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="aspect-square w-full rounded-xl bg-[#FAF7F2] overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#3F622D] uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-serif text-sm font-bold text-[#213B14] mt-1 line-clamp-1">{product.name}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">{product.subtitle}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#213B14]/5 flex items-center justify-between">
                  <span className="font-serif text-base font-black text-[#213B14]">₹{product.price}</span>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      addedItems[product._id || product.id]
                        ? "bg-green-700 text-white"
                        : "bg-[#213B14] text-white hover:bg-[#3F622D]"
                    }`}
                  >
                    {addedItems[product._id || product.id] ? "Added!" : "ADD TO CART"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FILTER DRAWER PANEL */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Panel */}
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

                {/* Availability Section */}
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
                        className="rounded border-[#213B14]/20 focus:ring-[#213B14]"
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
                        className="rounded border-[#213B14]/20 focus:ring-[#213B14]"
                      />
                      Out of stock
                    </label>
                  </div>
                </div>

                {/* Price Section */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Price</h4>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
                      <input
                        type="number"
                        placeholder="From"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                        className="w-full pl-6 pr-3 py-2 bg-gray-50 border rounded-lg text-xs outline-none"
                      />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
                      <input
                        type="number"
                        placeholder="To"
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                        className="w-full pl-6 pr-3 py-2 bg-gray-50 border rounded-lg text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <button
                  onClick={handleApplyFilter}
                  className="w-full py-3 bg-[#213B14] hover:bg-[#3F622D] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSortOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Panel */}
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
                    { value: "price-high-to-low", label: "Price, high to low" },
                    { value: "date-old-to-new", label: "Date, old to new" },
                    { value: "date-new-to-old", label: "Date, new to old" }
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 text-xs font-semibold text-gray-600 cursor-pointer py-1">
                      <input
                        type="radio"
                        name="sort-opt"
                        checked={sortOption === opt.value}
                        onChange={() => setSortOption(opt.value)}
                        className="text-[#213B14] focus:ring-[#213B14]"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t">
                <button
                  onClick={handleApplySort}
                  className="w-full py-3 bg-[#213B14] hover:bg-[#3F622D] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
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
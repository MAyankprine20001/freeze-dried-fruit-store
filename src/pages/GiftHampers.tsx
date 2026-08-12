import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gift, Truck, ShieldCheck, Mail, ArrowRight, CheckCircle2, Leaf, 
  Sparkles, Award, Star, Heart, ShoppingBag, RefreshCw, Clipboard,
  Briefcase, SlidersHorizontal, ChevronDown, Check
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { productApi } from "../api/product.api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { getProductPrimaryImage } from "../utils/productImage";

export default function GiftHampers() {
  const [products, setProducts] = useState<any[]>([]);
  const [allGifts, setAllGifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Hampers");
  const [sortOption, setSortOption] = useState("popular");
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [quoteEmail, setQuoteEmail] = useState("");

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        setLoading(true);
        const res = await productApi.getAll();
        const data = res.data ?? res;
        
        // Filter by isGift flag or category options
        const filtered = data.filter((p: any) => {
          const categorySlug = p.category.toLowerCase().replace(/[\s_]+/g, "-");
          return (
            p.isGift === true || 
            categorySlug === "gifts" ||
            categorySlug === "combos" ||
            categorySlug === "festive-specials" ||
            categorySlug === "corporate-gifting" ||
            categorySlug === "personalized" ||
            categorySlug === "new-arrivals"
          );
        });
        
        setAllGifts(filtered);
        setProducts(filtered);
      } catch (err) {
        console.error("Failed to load gift hampers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGifts();
  }, []);

  const applyFilterAndSort = () => {
    let result = [...allGifts];

    // Filter logic
    if (activeFilter !== "All Hampers") {
      result = result.filter(p => {
        const name = p.name.toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const categorySlug = p.category.toLowerCase().replace(/[\s_]+/g, "-");
        if (activeFilter === "Festive Specials") {
          return categorySlug === "festive-specials" || name.includes("festive") || name.includes("celebration") || desc.includes("festive") || desc.includes("holiday");
        }
        if (activeFilter === "Corporate Gifting") {
          return categorySlug === "corporate-gifting" || name.includes("corporate") || name.includes("excellence") || desc.includes("corporate") || desc.includes("office");
        }
        if (activeFilter === "Personalized") {
          return categorySlug === "personalized" || name.includes("personalized") || name.includes("custom") || desc.includes("personal");
        }
        if (activeFilter === "New Arrivals") {
          return categorySlug === "new-arrivals" || p.featured === true || name.includes("new") || name.includes("indulgence");
        }
        return true;
      });
    }

    // Sort logic
    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "popular") {
      result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
    }

    setProducts(result);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [activeFilter, sortOption, allGifts]);

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

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you! Your quote request has been received. Our team will contact you shortly.");
    setQuoteEmail("");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#213B14]">
      <Header />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[780px] flex items-center pt-40 pb-28 overflow-hidden w-full">
        {/* Absolute Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/Gift_image.png" 
            alt="Gift Hampers Background" 
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-[#FAF7F2]/45 md:bg-transparent md:bg-gradient-to-r md:from-[#FAF7F2]/90 md:to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-5 text-left space-y-6 z-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#213B14]/20 bg-white text-[#213B14] text-[10px] font-black tracking-widest uppercase shadow-sm">
                  <Gift className="w-3.5 h-3.5" /> Gift Hampers
                </div>
                
                <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#1C2A18] leading-[1.1]">
                  Thoughtful Gifts.<br />
                  Real <span className="text-[#3F622D]">Goodness.</span>
                </h1>
                
                <p className="text-sm sm:text-base text-[#213B14]/75 max-w-md font-semibold leading-relaxed">
                  Premium freeze dried treats, beautifully packed for every celebration.
                </p>
                
                {/* Features Row */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#213B14]/10 max-w-md">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#3F622D]/10 flex items-center justify-center text-[#3F622D] shrink-0">
                      <ShieldCheck className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18] leading-none">Premium Quality</p>
                      <p className="text-[9px] text-[#213B14]/60 font-semibold">100% Certified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#3F622D]/10 flex items-center justify-center text-[#3F622D] shrink-0">
                      <Gift className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18] leading-none">Beautifully Packed</p>
                      <p className="text-[9px] text-[#213B14]/60 font-semibold">Elegant Design</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#3F622D]/10 flex items-center justify-center text-[#3F622D] shrink-0">
                      <Sparkles className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18] leading-none">Perfect For</p>
                      <p className="text-[9px] text-[#213B14]/60 font-semibold">Every Occasion</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#3F622D]/10 flex items-center justify-center text-[#3F622D] shrink-0">
                      <Leaf className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18] leading-none">Made With</p>
                      <p className="text-[9px] text-[#213B14]/60 font-semibold">Real Ingredients</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="#gift-grid-section"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#213B14] hover:bg-[#3F622D] text-white font-black rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Explore Hampers <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Foreground Product Showcase Image */}
            <div className="lg:col-span-7 flex justify-center z-20 lg:translate-x-12">
              <img
                src="/gift_product.png"
                alt="Premium Gift Hamper Box Showcase"
                className="w-full max-w-2xl lg:max-w-[850px] xl:max-w-[950px] h-auto object-contain lg:scale-[1.25] hover:scale-[1.27] transition-transform duration-500"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. FILTER & PRODUCTS SECTION ── */}
      <section id="gift-grid-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3F622D] bg-[#3F622D]/10 px-3 py-1 rounded">Our Selection</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1C2A18]">
            Our Gift Hampers
          </h2>
          <p className="text-xs text-[#213B14]/50 font-semibold max-w-md mx-auto">
            Curated hampers for every occasion and celebration.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#213B14]/10 pb-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {["All Hampers", "Festive Specials", "Corporate Gifting", "Personalized", "New Arrivals"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === filter
                    ? "bg-[#213B14] text-[#FAF7F2] shadow-sm"
                    : "bg-white border border-[#213B14]/15 hover:bg-[#FAF7F2] text-[#213B14]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#213B14]/60">Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 bg-white border border-[#213B14]/15 rounded-xl text-xs font-bold text-[#213B14] outline-none cursor-pointer"
            >
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Dynamic Hampers Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#213B14] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-bold text-[#213B14]/60">Loading gift hampers...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#213B14]/10 max-w-lg mx-auto">
            <Gift className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-gray-500">No Gift Hampers match this filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const isAdded = addedItems[product._id || product.id] || false;
              const hasDiscount = product.originalPrice > product.price;
              const discountPercent = hasDiscount 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;

              return (
                <div 
                  key={product._id || product.id}
                  className="bg-white rounded-3xl border border-[#213B14]/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-full"
                >
                  <div className="space-y-4">
                    {/* Image Box */}
                    <div className="aspect-[4/3] w-full bg-[#FAF7F2] relative overflow-hidden">
                      {hasDiscount && (
                        <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-black tracking-wider uppercase">
                          -{discountPercent}% OFF
                        </span>
                      )}
                      
                      <button 
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white border border-[#213B14]/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-[#FAF7F2] transition-colors shadow-sm"
                        aria-label="Save to Wishlist"
                      >
                        <Heart className="w-4 h-4" />
                      </button>

                      <img 
                        src={getProductPrimaryImage(product)} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Text Details */}
                    <div className="px-6 pb-2 space-y-2">
                      <span className="text-[9px] font-black text-[#3F622D] uppercase tracking-wider block">{product.category}</span>
                      <h3 className="text-base font-extrabold text-[#1C2A18] leading-tight line-clamp-1 group-hover:text-[#3F622D] transition-colors">{product.name}</h3>
                      {product.subtitle && <p className="text-[10px] text-[#213B14]/60 font-semibold line-clamp-2">{product.subtitle}</p>}
                      {product.weight && <span className="text-[9px] text-[#213B14]/40 font-semibold block">{product.weight}</span>}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="px-6 pb-6 pt-4 border-t border-[#213B14]/5 mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#213B14]/40 font-bold block leading-none mb-1">Price</span>
                      <span className="text-base font-black text-[#213B14]">₹{product.price}</span>
                      {hasDiscount && (
                        <span className="text-xs text-gray-400 line-through ml-1.5 font-bold">₹{product.originalPrice}</span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm active:scale-95 duration-200 ${
                        isAdded
                          ? "bg-green-700 hover:bg-green-800 text-white"
                          : "bg-[#213B14] hover:bg-[#3F622D] text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" /> Add To Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 3. TRUST CHECKLIST BAR ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto py-4">
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#213B14]/10 py-6 px-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#213B14]/10">
            <div className="flex flex-col items-center justify-center px-2 pt-4 md:pt-0">
              <Gift className="w-6 h-6 text-[#3F622D] mb-2" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">Beautiful Packaging</p>
              <p className="text-[9px] text-[#213B14]/50 font-semibold mt-0.5">Elegant & premium look</p>
            </div>
            <div className="flex flex-col items-center justify-center px-2 pt-4 md:pt-0">
              <Truck className="w-6 h-6 text-[#3F622D] mb-2" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">Pan India Delivery</p>
              <p className="text-[9px] text-[#213B14]/50 font-semibold mt-0.5">Safe & on-time shipping</p>
            </div>
            <div className="flex flex-col items-center justify-center px-2 pt-4 md:pt-0">
              <Clipboard className="w-6 h-6 text-[#3F622D] mb-2" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">Custom Messages</p>
              <p className="text-[9px] text-[#213B14]/50 font-semibold mt-0.5">Personalized notes</p>
            </div>
            <div className="flex flex-col items-center justify-center px-2 pt-4 md:pt-0">
              <Briefcase className="w-6 h-6 text-[#3F622D] mb-2" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">Bulk & Corporate</p>
              <p className="text-[9px] text-[#213B14]/50 font-semibold mt-0.5">Special wholesale rates</p>
            </div>
            <div className="flex flex-col items-center justify-center px-2 pt-4 md:pt-0">
              <RefreshCw className="w-6 h-6 text-[#3F622D] mb-2" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">Hassle Free Returns</p>
              <p className="text-[9px] text-[#213B14]/50 font-semibold mt-0.5">7 days easy return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CORPORATE GIFT HAMPERS BANNER ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="bg-[#213B14] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md text-white text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#FAF7F2]" />
              <h3 className="text-lg font-black uppercase tracking-wider">Corporate Gifting Made Easy!</h3>
            </div>
            <p className="text-xs text-[#FAF7F2]/75 font-semibold">Get in touch for bulk orders and custom hampers.</p>
          </div>
          
          <form onSubmit={handleQuoteSubmit} className="flex w-full md:w-auto items-center bg-[#FAF7F2] rounded-xl overflow-hidden p-1 max-w-sm md:flex-1 shrink-0">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-3 py-2 text-xs text-[#213B14] bg-transparent border-none outline-none placeholder-[#213B14]/40 font-semibold"
              value={quoteEmail}
              onChange={(e) => setQuoteEmail(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-[#213B14] hover:bg-[#3F622D] text-[#FAF7F2] text-[10px] font-black tracking-widest px-4 py-2.5 rounded-lg uppercase transition-colors shrink-0"
            >
              GET A QUOTE
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

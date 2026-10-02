import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, FlaskConical, Sparkles, Snowflake, Heart, ShoppingBag, CheckCircle2, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown, X, ArrowRight, Smile, Gift } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { productApi } from "../api/product.api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import CartStepper from "../components/CartStepper";
import ReviewSlider from "../components/ReviewSlider";
import { testimonialsFor } from "../data/testimonials";

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
        const res = await productApi.getAllForStore();
        const data = res.data ?? res;
        // Filter by Fruit Chunks & Fruit Powders categories
        const filtered = data.filter((p: any) => {
          const cat = p.category.toLowerCase().replace(/[\s_]+/g, "-");
          return cat === "fruit-chunks" || cat === "fruit-powders";
        });
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


  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#213B14]">
      <Header />

      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-8 sm:pt-36 sm:pb-12 md:pt-40 md:pb-16 overflow-hidden flex items-center min-h-[380px] sm:min-h-[500px] lg:min-h-[640px]">
        {/* Absolute Background Image */}
        <img 
          src="/cripsy_background_img.png" 
          alt="Crispy Bites Background" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0" 
        />
        {/* Gradient overlay to soften background leaves and ensure crystal-clear text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/70 md:via-[#FAF7F2]/50 to-transparent z-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-center">
            <div className="col-span-7 lg:col-span-6 space-y-2.5 sm:space-y-4 lg:space-y-6">
              <div>
                <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#193011] leading-none drop-shadow-sm">
                  Crispy<span className="text-[#325520]"> Bites</span>
                </h1>
                <div className="mt-1 sm:mt-2.5 inline-block">
                  <span className="bg-[#2B4C1F]/10 border border-[#2B4C1F]/20 text-[#1E3615] text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm shadow-sm inline-block">
                    FREEZE DRIED SNACKS
                  </span>
                </div>
              </div>
              
              <h2 className="text-[#193011] text-xs sm:text-base md:text-lg lg:text-xl font-bold leading-tight max-w-md">
                Real Taste. Real Nutrition. <br />
                Crispy, Crunchy & Naturally <span className="text-[#2B4C1F] font-extrabold">Delicious</span>.
              </h2>
              
              <p className="text-gray-800 text-[10.5px] sm:text-xs md:text-sm font-medium leading-relaxed max-w-sm line-clamp-2 sm:line-clamp-none">
                Delicious freeze-dried fruit chunks made with 100% real fruit. <br className="hidden sm:inline" />
                No added sugar, no preservatives, zero artificial additives.
              </p>

              {/* Badges - Circular Icons under text */}
              <div className="hidden xs:flex flex-wrap items-start gap-2 sm:gap-4 pt-1 sm:pt-2">
                {[
                  { label: "100% Real Fruit", icon: Leaf },
                  { label: "No Added Sugar", icon: Sparkles },
                  { label: "No Preservatives", icon: FlaskConical },
                  { label: "Super Crunchy", icon: Heart }
                ].map((badge, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-1 w-14 sm:w-18 md:w-20">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#2B4C1F]/30 flex items-center justify-center text-[#2B4C1F] bg-white/80 backdrop-blur-md shadow-sm">
                      <badge.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2]" />
                    </div>
                    <span className="text-[7.5px] sm:text-[8px] md:text-[9px] font-extrabold text-[#193011] leading-tight tracking-wider uppercase">
                      {badge.label.split(" ").slice(0, 2).join(" ")}
                      {badge.label.split(" ").length > 2 && <><br />{badge.label.split(" ").slice(2).join(" ")}</>}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-1 sm:pt-4">
                <a
                  href="#flavors"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-7 sm:py-3.5 md:px-8 md:py-3.5 bg-[#2B4C1F] hover:bg-[#1E3615] text-white text-xs sm:text-sm font-extrabold rounded-full transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  EXPLORE FLAVORS
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>

            {/* Foreground Product Showcase Image on the Right */}
            <div className="col-span-5 lg:col-span-6 flex justify-center items-center z-20">
              <div className="relative flex items-end justify-center h-[200px] sm:h-[320px] lg:h-[460px] w-full">
                <img
                  src="/images/products/crispy-bites-mixed-fruit-back-800.webp"
                  alt="Back of the Crispy Bites Mixed Fruit pack with ingredients and nutrition information"
                  width={754}
                  height={1269}
                  className="absolute h-[88%] w-auto object-contain -rotate-6 -translate-x-[30%] sm:-translate-x-[35%] opacity-95 drop-shadow-lg"
                />
                <img
                  src="/images/products/crispy-bites-mixed-fruit-front-800.webp"
                  alt="Crispy Bites Mixed Fruit freeze-dried fruit pack"
                  width={754}
                  height={1269}
                  fetchPriority="high"
                  className="relative h-full w-auto object-contain rotate-3 translate-x-[18%] drop-shadow-xl transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges Bar below Hero */}
      <section className="bg-[#2B4C1F] text-[#FAF7F2] py-5 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-[#FAF7F2]/15">
            {[
              { title: "100% REAL FRUITS", desc: "Nothing Artificial", icon: Leaf },
              { title: "SUPER CRUNCHY", desc: "Guilt-Free Snacking", icon: Sparkles },
              { title: "NO ADDED SUGAR", desc: "Naturally Sweet", icon: Heart },
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

      {/* 3 Pillars of Value Section: What It Is, Why Buy, Health Benefits */}
      <section className="py-16 bg-white border-b border-[#213B14]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-[#2B4C1F]/10 text-[#2B4C1F] text-[11px] font-extrabold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full inline-block mb-3">
              KNOW YOUR SNACK
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#193011]">
              Why Choose Crispy Bites?
            </h2>
            <p className="text-gray-600 text-sm mt-2 font-medium">
              100% real freeze-dried fruits with zero junk — healthy, crunchy & nutritious.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: What is it? */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#2B4C1F]/10 hover:border-[#2B4C1F]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF4EC] border border-[#2B4C1F]/20 flex items-center justify-center text-[#2B4C1F] group-hover:scale-110 transition-transform">
                  <Snowflake className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2B4C1F] block">
                  1. WHAT IS IT?
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#193011]">
                  100% Real Freeze-Dried Fruit
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Crispy Bites are made by flash-freezing farm-fresh real fruits and gently removing 98% water under vacuum. No frying, no baking, no oil — just pure fruit goodness.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#213B14]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B4C1F]">
                  <CheckCircle2 className="w-4 h-4 text-[#2B4C1F]" />
                  <span>Real fruit crunch, no artificial flavors</span>
                </div>
              </div>
            </div>

            {/* Card 2: Why Buy? */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#2B4C1F]/10 hover:border-[#2B4C1F]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF4EC] border border-[#2B4C1F]/20 flex items-center justify-center text-[#2B4C1F] group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2B4C1F] block">
                  2. WHY BUY THIS?
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#193011]">
                  Smart & Guilt-Free Snacking
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Satisfy cravings without the junk food hangover. Perfect replacement for oily chips and sugary snacks. Long shelf-life, ready to eat anytime, travel & kid-approved.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#213B14]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B4C1F]">
                  <CheckCircle2 className="w-4 h-4 text-[#2B4C1F]" />
                  <span>Zero preservatives & zero added sugar</span>
                </div>
              </div>
            </div>

            {/* Card 3: Key Benefits */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#2B4C1F]/10 hover:border-[#2B4C1F]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF4EC] border border-[#2B4C1F]/20 flex items-center justify-center text-[#2B4C1F] group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2B4C1F] block">
                  3. HEALTH BENEFITS
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#193011]">
                  Retains 95%+ Natural Nutrients
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Freeze-drying locks in vital vitamins, dietary fiber, antioxidants, and original aroma without degrading nutrients like heat processing does.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#213B14]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B4C1F]">
                  <CheckCircle2 className="w-4 h-4 text-[#2B4C1F]" />
                  <span>Rich in vitamins, natural energy & fiber</span>
                </div>
              </div>
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
            <Loader color="#2B4C1F" text="Loading Crispy Bites..." />
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
                    <CartStepper product={product} color="#2B4C1F" textColor="#FFFFFF">
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
                    </CartStepper>
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
          <ReviewSlider reviews={testimonialsFor("crispy-bites")} accent="#2B4C1F" card />
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

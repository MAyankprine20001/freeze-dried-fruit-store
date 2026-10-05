import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, FlaskConical, Sparkles, Snowflake, Heart, ShoppingBag, CheckCircle2, SlidersHorizontal, ArrowUpDown, X, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { productApi } from "../api/product.api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import CartStepper from "../components/CartStepper";
import ReviewSlider from "../components/ReviewSlider";
import { testimonialsFor } from "../data/testimonials";

/**
 * Real Freeze Fusion jars for the hero. Order = front jar first.
 * To add a flavour: put its cut-out image in public/images/chocolate and add a line here.
 */
const FREEZE_FUSION_JARS = [
  { name: "Banana Cocoa Dark", src: "/images/chocolate/freeze-fusion-banana-cocoa-dark.webp", w: 275, h: 392 },
  { name: "Mango Silk White", src: "/images/chocolate/freeze-fusion-mango-silk-white.webp", w: 274, h: 387 },
  { name: "Strawberry Cream Crunch Milk", src: "/images/chocolate/freeze-fusion-strawberry-cream-crunch.webp", w: 234, h: 309 },
];

/** Position of each jar by how many jars there are: [front, left, right]. */
const JAR_LAYOUT: Record<number, string[]> = {
  1: ["z-20 h-full left-1/2 -translate-x-1/2"],
  2: ["z-20 h-full right-0 sm:right-[2%]", "z-10 h-[84%] -left-[4%] sm:left-[2%] -rotate-[4deg]"],
  3: [
    "z-20 h-[94%] left-1/2 -translate-x-1/2",
    "z-10 h-[80%] -left-[4%] sm:left-0 lg:-left-[12%] -rotate-[6deg]",
    "z-10 h-[72%] -right-[4%] sm:right-0 lg:-right-[12%] rotate-[6deg]",
  ],
};

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
        const res = await productApi.getRetail();
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

      <section className="relative pt-32 pb-8 sm:pt-36 sm:pb-12 md:pt-40 md:pb-16 overflow-hidden flex items-center min-h-[380px] sm:min-h-[500px] lg:min-h-[640px]">
        {/* Absolute Background Image */}
        <img 
          src="/Home_backgroun_Image.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        {/* Subtle overlay for legibility on small screens */}
        <div className="absolute inset-0 bg-[#FAF7F2]/40 md:bg-transparent md:bg-gradient-to-r md:from-[#FAF7F2]/90 md:via-[#FAF7F2]/40 md:to-transparent z-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-center">
            <div className="col-span-7 lg:col-span-6 space-y-2.5 sm:space-y-4 lg:space-y-6">
              <div>
                <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#4A2D1B] leading-none">
                  Freeze<span className="font-serif font-light italic text-[#7A4B2A]"> Fusion</span>
                </h1>
                <div className="mt-1 sm:mt-2.5 inline-block">
                  <span className="bg-[#4A2D1B]/10 border border-[#4A2D1B]/20 text-[#4A2D1B] text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm shadow-sm inline-block">
                    CHOCOLATES
                  </span>
                </div>
              </div>
              
              <h2 className="text-[#4A2D1B] text-[10.5px] sm:text-sm font-black uppercase tracking-[0.12em] sm:tracking-[0.18em] leading-tight max-w-md">
                REAL FRUIT INFUSED <br />
                RICH COUVERTURE CHOCOLATES
              </h2>
              
              <p className="text-gray-600 text-[10.5px] sm:text-xs md:text-sm leading-relaxed max-w-sm line-clamp-2 sm:line-clamp-none">
                Crunchy outside. Creamy inside. <br className="hidden sm:inline" />
                Real joy in every bite.
              </p>

              {/* Badges - Circular Icons under text */}
              <div className="hidden xs:flex flex-wrap items-start gap-2 sm:gap-4 md:gap-5 pt-1 sm:pt-2">
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
                    <div key={idx} className="flex flex-col items-center text-center gap-1 w-14 sm:w-18 md:w-20">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#4A2D1B]/20 flex items-center justify-center text-[#4A2D1B] bg-white/50 backdrop-blur-sm">
                        <badge.icon className="w-3.5 h-3.5 stroke-[1.75]" />
                      </div>
                      <span className="text-[7.5px] sm:text-[8px] md:text-[9px] font-bold text-[#4A2D1B] leading-tight tracking-wider uppercase">
                        {line1}
                        {line2 && <><br />{line2}</>}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-1 sm:pt-4">
                <a
                  href="#flavors"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-7 sm:py-3.5 md:px-8 md:py-3.5 bg-[#4A2D1B] hover:bg-[#382012] text-[#FAF7F2] text-xs sm:text-sm font-extrabold rounded-full transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  EXPLORE FLAVORS
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>

            {/* Foreground: real Freeze Fusion jars, side by side */}
            <div className="col-span-5 lg:col-span-6 flex justify-center items-end z-20 lg:translate-x-8">
              <div className="relative w-full max-w-[680px] h-[170px] sm:h-[280px] lg:h-[400px]">
                {FREEZE_FUSION_JARS.map((jar, n) => (
                  <img
                    key={jar.src}
                    src={jar.src}
                    alt={`Freeze Fusion ${jar.name} chocolate jar`}
                    width={jar.w}
                    height={jar.h}
                    fetchPriority={n === 0 ? "high" : "auto"}
                    className={`absolute bottom-0 w-auto object-contain drop-shadow-[0_18px_22px_rgba(74,45,27,0.35)] transition-transform duration-500 hover:-translate-y-2 ${JAR_LAYOUT[FREEZE_FUSION_JARS.length]?.[n] ?? ""}`}
                  />
                ))}
              </div>
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

      {/* 3 Pillars of Value Section: What It Is, Why Buy, Health Benefits */}
      <section className="py-16 bg-white border-b border-[#213B14]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-[#4A2D1B]/10 text-[#4A2D1B] text-[11px] font-extrabold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full inline-block mb-3">
              KNOW YOUR CHOCOLATE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A2D1B]">
              Why Choose Freeze Fusion Chocolates?
            </h2>
            <p className="text-gray-600 text-sm mt-2 font-medium">
              Real freeze-dried fruit chunks dipped in rich, velvety couverture chocolate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: What is it? */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#4A2D1B]/10 hover:border-[#4A2D1B]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F5ECE6] border border-[#4A2D1B]/20 flex items-center justify-center text-[#4A2D1B] group-hover:scale-110 transition-transform">
                  <Snowflake className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4A2D1B] block">
                  1. WHAT IS IT?
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#4A2D1B]">
                  Real Fruit Dipped in Premium Couverture
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Freeze Fusion blends whole freeze-dried fruits with high-grade artisan chocolate. Not flavored essence or jelly — you bite into actual crunchy real fruit wrapped in silky dark or white chocolate.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#213B14]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4A2D1B]">
                  <CheckCircle2 className="w-4 h-4 text-[#4A2D1B]" />
                  <span>Real fruit center with authentic cocoa butter</span>
                </div>
              </div>
            </div>

            {/* Card 2: Why Buy? */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#4A2D1B]/10 hover:border-[#4A2D1B]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F5ECE6] border border-[#4A2D1B]/20 flex items-center justify-center text-[#4A2D1B] group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4A2D1B] block">
                  2. WHY BUY THIS?
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#4A2D1B]">
                  Gourmet Taste & Guilt-Free Indulgence
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Say goodbye to cheap compound chocolates packed with palm oil. Perfect for luxurious gifting, sweet cravings after meals, and elevating dessert times.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#213B14]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4A2D1B]">
                  <CheckCircle2 className="w-4 h-4 text-[#4A2D1B]" />
                  <span>No vegetable fat/palm oil shortcuts</span>
                </div>
              </div>
            </div>

            {/* Card 3: Key Benefits */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#4A2D1B]/10 hover:border-[#4A2D1B]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F5ECE6] border border-[#4A2D1B]/20 flex items-center justify-center text-[#4A2D1B] group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4A2D1B] block">
                  3. HEALTH BENEFITS
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#4A2D1B]">
                  Antioxidant-Rich & Wholesome
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Combines the polyphenol antioxidants of dark chocolate with the fruit vitamins and dietary fiber of freeze-dried fruit for mood-boosting health.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#213B14]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4A2D1B]">
                  <CheckCircle2 className="w-4 h-4 text-[#4A2D1B]" />
                  <span>Mood booster with natural fruit nutrition</span>
                </div>
              </div>
            </div>
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
            <p className="text-[#4A2D1B] text-xs font-bold uppercase tracking-widest mt-2">
              Real fruit infused rich couverture chocolates.
            </p>
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
            <Loader color="#4A2D1B" text="Loading Freeze Fusion Chocolates..." />
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
                    <Link
                      to={`/product/${product._id || product.id}`}
                      className="block aspect-square -mx-3 rounded-xl bg-[#FAF5F0] overflow-hidden relative"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#213B14] line-clamp-1">
                        <Link to={`/product/${product._id || product.id}`} className="hover:underline underline-offset-4">
                          {product.name}
                        </Link>
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
                    <CartStepper product={product} color="#4A2D1B" textColor="#FFFFFF">
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
                    </CartStepper>
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
              src="/why_love_it_bg.webp" 
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

      {/* Customer Reviews */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A2D1B]">Loved by Our Customers</span>
          <ReviewSlider reviews={testimonialsFor("freeze-fusion")} accent="#4A2D1B" card />
        </div>
      </section>

      {/* Explore Chocolates Banner */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-[#1C2A18]">
        <img
          src="/chocolate_banner_bg.webp"
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

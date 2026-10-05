import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, FlaskConical, Sparkles, Snowflake, Heart, CheckCircle2, ChevronLeft, ChevronRight, ShoppingBag, ArrowRight, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { productApi } from "../api/product.api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import CartStepper from "../components/CartStepper";
import ReviewSlider from "../components/ReviewSlider";
import { testimonialsFor } from "../data/testimonials";

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
        const res = await productApi.getRetail();
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


  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#213B14]">
      <Header />

      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-8 sm:pt-36 sm:pb-12 md:pt-40 md:pb-16 overflow-hidden flex items-center min-h-[380px] sm:min-h-[500px] lg:min-h-[640px]">
        {/* Absolute Background Image */}
        <img 
          src="/sliprealBackgrpound_image.webp" 
          alt="SipReal Background" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0" 
        />
        {/* Subtle overlay for legibility on small screens */}
        <div className="absolute inset-0 bg-[#FAF7F2]/45 md:bg-transparent z-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-center">
            <div className="col-span-7 lg:col-span-6 space-y-2.5 sm:space-y-4 lg:space-y-6">
              <div>
                <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#B82A5F] leading-none">
                  Sip<span className="text-[#8E1B46]">Real</span>
                </h1>
                <div className="mt-1 sm:mt-2.5 inline-block">
                  <span className="bg-[#B82A5F]/10 border border-[#B82A5F]/20 text-[#B82A5F] text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm shadow-sm inline-block">
                    SMOOTHIE PREMIX
                  </span>
                </div>
              </div>
              
              <h2 className="text-[#3A1420] text-xs sm:text-base md:text-lg lg:text-xl font-bold leading-tight max-w-md">
                Real Taste. Real Nutrition. <br />
                Just Add Water & <span className="text-[#B82A5F]">Sip</span>.
              </h2>
              
              <p className="text-gray-700 text-[10.5px] sm:text-xs md:text-sm leading-relaxed max-w-sm line-clamp-2 sm:line-clamp-none">
                Delicious smoothie premixes made with 100% real freeze-dried fruits. <br className="hidden sm:inline" />
                No added sugar, no preservatives, no artificial anything.
              </p>

              {/* Circular Badges */}
              <div className="hidden xs:flex flex-wrap items-start gap-2 sm:gap-4 pt-1 sm:pt-2">
                {[
                  { label: "No Added Sugar", icon: Leaf },
                  { label: "No Preservatives", icon: FlaskConical },
                  { label: "100% Real Fruits", icon: Sparkles },
                  { label: "Just Add Water & Sip", icon: Heart }
                ].map((badge, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-1 w-14 sm:w-18 md:w-20">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#B82A5F]/25 flex items-center justify-center text-[#B82A5F] bg-white/70 backdrop-blur-sm shadow-sm">
                      <badge.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.75]" />
                    </div>
                    <span className="text-[7.5px] sm:text-[8px] md:text-[9px] font-bold text-[#3A1420] leading-tight tracking-wider uppercase">
                      {badge.label.split(" ").slice(0, 2).join(" ")}
                      {badge.label.split(" ").length > 2 && <><br />{badge.label.split(" ").slice(2).join(" ")}</>}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-1 sm:pt-4">
                <a
                  href="#flavors"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-7 sm:py-3.5 md:px-8 md:py-3.5 bg-[#B82A5F] hover:bg-[#961F4B] text-white text-xs sm:text-sm font-extrabold rounded-full transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  COMING SOON
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>

            {/* Foreground Product Image on the Right */}
            <div className="col-span-5 lg:col-span-6 flex justify-center items-center z-20">
              <img
                src="/slipreal_product_image.webp"
                alt="SipReal Products Showcase"
                className="w-full max-h-[220px] sm:max-h-[340px] lg:max-h-none max-w-3xl lg:max-w-[700px] xl:max-w-[760px] h-auto object-contain transition-transform duration-500 lg:scale-[1.28] hover:scale-[1.3] lg:translate-y-16 lg:translate-x-12 drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Middle Badges Banner */}
      <section className="bg-[#B82A5F] text-[#FAF7F2] py-5 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-[#FAF7F2]/15">
            {[
              { title: "100% REAL FRUITS", desc: "Nothing Artificial", icon: Leaf },
              { title: "FREEZE-DRIED", desc: "Locks Nutrition", icon: Snowflake },
              { title: "NO ADDED SUGAR", desc: "Zero Guilt", icon: Sparkles },
              { title: "NO PRESERVATIVES", desc: "Pure Health", icon: FlaskConical }
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
            <span className="bg-[#B82A5F]/10 text-[#B82A5F] text-[11px] font-extrabold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full inline-block mb-3">
              KNOW YOUR SMOOTHIE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#213B14]">
              Why Choose SipReal Smoothie Premix?
            </h2>
            <p className="text-gray-600 text-sm mt-2 font-medium">
              Instant café-style smoothies at home with 100% real freeze-dried fruits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: What is it? */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#B82A5F]/10 hover:border-[#B82A5F]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FCEAEB] border border-[#B82A5F]/20 flex items-center justify-center text-[#B82A5F] group-hover:scale-110 transition-transform">
                  <Snowflake className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B82A5F] block">
                  1. WHAT IS IT?
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#213B14]">
                  Instant Real Fruit Smoothie Powder
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  SipReal is a 100% natural smoothie premix made from real freeze-dried fruits. No blender needed — just mix 2 spoons in water, shake, and your fresh fruit smoothie is ready!
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#213B14]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B82A5F]">
                  <CheckCircle2 className="w-4 h-4 text-[#B82A5F]" />
                  <span>Real fruit pulp, natural taste & authentic color</span>
                </div>
              </div>
            </div>

            {/* Card 2: Why Buy? */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#B82A5F]/10 hover:border-[#B82A5F]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FCEAEB] border border-[#B82A5F]/20 flex items-center justify-center text-[#B82A5F] group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B82A5F] block">
                  2. WHY BUY THIS?
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#213B14]">
                  No Cutting, No Mess, Café Taste in 30s
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Skip buying perishable fruits, peeling, blending, and cleaning up. Get consistent, premium taste and instant refreshment anywhere — at work, gym, or on-the-go.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#213B14]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B82A5F]">
                  <CheckCircle2 className="w-4 h-4 text-[#B82A5F]" />
                  <span>Cost-effective & zero food wastage</span>
                </div>
              </div>
            </div>

            {/* Card 3: Key Benefits */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#B82A5F]/10 hover:border-[#B82A5F]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FCEAEB] border border-[#B82A5F]/20 flex items-center justify-center text-[#B82A5F] group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B82A5F] block">
                  3. HEALTH BENEFITS
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#213B14]">
                  Pure Fruit Fiber & Daily Immunity
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Contains all the natural antioxidants, dietary fiber, and vitamins of whole fruits. 100% clean label with no added refined sugar or synthetic chemicals.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#213B14]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B82A5F]">
                  <CheckCircle2 className="w-4 h-4 text-[#B82A5F]" />
                  <span>Supports digestion, energy & daily wellness</span>
                </div>
              </div>
            </div>
          </div>
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
            <p className="text-[#B82A5F] text-xs font-bold uppercase tracking-widest mt-2">
              Real fruit smoothie premixes. Just add water & sip.
            </p>
          </div>

          {/* Coming soon: SipReal is not on sale yet */}
          <div className="max-w-3xl mx-auto text-center bg-white rounded-3xl border border-[#B82A5F]/15 shadow-sm px-6 py-12 sm:px-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#B82A5F] text-white text-xs font-black uppercase tracking-[0.2em]">
              Coming Soon
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#213B14] mt-5">
              SipReal smoothie premixes are launching soon
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3 max-w-xl mx-auto">
              Real fruit smoothies, ready in seconds. We&apos;re getting the first batch ready — message us and we&apos;ll let you know the moment they&apos;re available.
            </p>
            {!loading && products.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {products.map((p) => (
                  <span key={p._id || p.id} className="px-4 py-1.5 rounded-full bg-[#FCEAEB] text-[#B82A5F] text-xs font-bold">
                    {String(p.name).replace(/^SipReal\s*/i, "")}
                  </span>
                ))}
              </div>
            )}
            <a
              href={`https://wa.me/917567350328?text=${encodeURIComponent("Hi! Please notify me when SipReal smoothie premixes launch.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-[#B82A5F] hover:bg-[#961F4B] text-white text-sm font-extrabold rounded-full transition-colors shadow-md"
            >
              Notify me on WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Horizontal Characteristics Bar */}
      <section className="bg-white py-10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF7F2] border border-[#213B14]/10 rounded-2xl py-6 px-6 md:px-8 max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-[#213B14]/10">
              {[
                { title: "100% Real Fruits", desc: "Nothing Artificial", icon: Leaf },
                { title: "Freeze-Dried", desc: "To Lock Nutrition", icon: Snowflake },
                { title: "No Added Sugar", desc: "Just Pure Fruits", icon: Sparkles },
                { title: "No Preservatives", desc: "No Additives", icon: FlaskConical }
              ].map((b, idx) => (
                <div key={idx} className="flex-1 min-w-[200px] flex items-center justify-center gap-4 px-4 py-2 md:py-0">
                  <div className="w-10 h-10 rounded-full border border-[#213B14]/15 flex items-center justify-center text-[#3F622D] bg-white">
                    <b.icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-black text-[#213B14] uppercase tracking-wider">{b.title}</span>
                    <span className="text-[10px] text-gray-500 font-semibold">{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* Steps & Why SipReal? Block */}
      <section className="py-20 bg-white border-t border-b border-[#213B14]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Card: 3 Easy Steps */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#213B14]/5 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
              {/* Left image column */}
              <div className="md:col-span-5 relative min-h-[240px] md:min-h-full">
                <img 
                  src="/smoothie_steps_img.webp" 
                  alt="Pink Berry Smoothie" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </div>
              {/* Right steps column */}
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#213B14]">
                  Ready in <br />
                  <span className="text-[#B82A5F] italic font-normal">3 Easy Steps!</span>
                </h3>
                
                <div className="space-y-4 pt-2">
                  {[
                    { step: "1", text: "Add 2 heaped tbsp (25g) of SipReal premix", icon: Leaf },
                    { step: "2", text: "Add 150-200ml chilled water", icon: FlaskConical },
                    { step: "3", text: "Shake / Stir well & Enjoy!", icon: Sparkles }
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-full border border-[#213B14]/10 bg-white flex items-center justify-center text-[#B82A5F] shrink-0">
                        <s.icon className="w-4 h-4 stroke-[1.75]" />
                      </div>
                      <span className="font-serif text-lg font-black text-[#213B14]">{s.step}</span>
                      <p className="text-[11px] sm:text-xs text-gray-600 font-semibold leading-tight">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card: Why SipReal */}
            <div className="bg-[#FAF7F2] p-6 md:p-8 rounded-2xl border border-[#213B14]/5 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#213B14]">
                    Why SipReal?
                  </h3>
                  <Leaf className="w-5 h-5 text-[#3F622D] fill-[#3F622D]/10" />
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  We use advanced freeze-drying technology that retains the natural taste, color, vitamins and minerals of real fruits — so every sip is as good as real.
                </p>
              </div>

              {/* Circular Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { title: "REAL TASTE", desc: "Like Real Fruit", icon: Leaf },
                  { title: "BETTER NUTRITION", desc: "Keeps You Going", icon: Sparkles },
                  { title: "LIGHT & CONVENIENT", desc: "Carry Anywhere", icon: Heart }
                ].map((badge, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                    <div className="w-9 h-9 rounded-full border border-[#213B14]/15 flex items-center justify-center text-[#3F622D] bg-white">
                      <badge.icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-[#213B14] uppercase tracking-wider">{badge.title}</span>
                      <span className="text-[8px] text-gray-500 font-semibold">{badge.desc}</span>
                    </div>
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
          <ReviewSlider reviews={testimonialsFor("sipreal")} accent="#B82A5F" card />
        </div>
      </section>

      {/* Join Family Newsletter Banner */}
      <section className="bg-[#B82A5F] text-white py-6 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black uppercase tracking-wider">Join The Dry Factory Family</span>
                <span className="text-[10px] text-pink-100 font-semibold mt-0.5">Get exclusive offers, new launches & healthy tips straight to your inbox.</span>
              </div>
            </div>
            
            <div className="flex w-full md:w-auto items-center bg-white rounded-lg overflow-hidden p-1 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-1.5 text-xs text-[#213B14] bg-transparent border-none outline-none placeholder-gray-400 min-w-[200px]"
              />
              <button className="bg-[#B82A5F] hover:bg-[#961F4B] text-white text-[10px] font-black tracking-widest px-5 py-2 rounded-md uppercase transition-colors shrink-0">
                SUBSCRIBE
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

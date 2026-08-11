import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  Leaf,
  FlaskConical,
  Sparkles,
  Snowflake,
  Heart,
  ShieldCheck,
  Zap,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { productApi } from "../api/product.api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [bestSellerIndex, setBestSellerIndex] = useState(0);
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll();
        const allProducts = res.data ?? res;
        setProducts(allProducts);
      } catch (err) {
        console.error("Failed to load products for Best Sellers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  // Best Sellers Filter: select specific popular items from our seeded list
  const bestSellers = products.filter(p =>
    ["SipReal Royal Mango", "SipReal Berry Blast", "Freeze Fusion Banana Cocoa Dark", "Freeze Fusion Mango Silk White", "Crispy Bites Jamun"].includes(p.name)
  );

  const handlePrevBestSeller = () => {
    setBestSellerIndex((prev) => (prev === 0 ? Math.max(0, bestSellers.length - 4) : prev - 1));
  };

  const handleNextBestSeller = () => {
    setBestSellerIndex((prev) => (prev >= bestSellers.length - 4 ? 0 : prev + 1));
  };

  // Main banner slides
  const heroSlides = [
    {
      title: "Real Fruit. Real Taste. Real Nutrition.",
      subtitle: "Freeze Dried Goodness You Can Trust.",
      image: "https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/hero_lifestyle_new_a3k1sp.png", // fallback or premium mockup representation
      badges: [
        { label: "100% Real Fruit", icon: Leaf },
        { label: "No Added Sugar", icon: Zap },
        { label: "No Preservatives", icon: FlaskConical },
        { label: "No Artificial Flavors", icon: Sparkles }
      ],
      link: "/products"
    }
  ];

  // Quick navigation categories
  const promoCategories = [
    {
      brand: "SipReal",
      subtitle: "Premix Smoothie",
      desc: "Real fruit smoothie premixes. Just add water & sip.",
      path: "/smoothie-premix",
      btnText: "EXPLORE SIPREAL",
      bgClass: "bg-[#FCEAEB]", // Light pink/berry tone
      textColor: "text-[#B82A5F]",
      btnClass: "bg-[#B82A5F] hover:bg-[#961F4B] text-white",
      image: "https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/sipreal_group_s7d2ks.png"
    },
    {
      brand: "FreezeFusion",
      subtitle: "Chocolates",
      desc: "Real fruit infused rich couverture chocolates.",
      path: "/chocolate",
      btnText: "EXPLORE CHOCOLATES",
      bgClass: "bg-[#F5ECE6]", // Cream/chocolate tone
      textColor: "text-[#4A2D1B]",
      btnClass: "bg-[#4A2D1B] hover:bg-[#382012] text-white",
      image: "https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/freezefusion_group_f3ksls.png"
    },
    {
      brand: "Crispy Bites",
      subtitle: "Freeze Dried Snacks",
      desc: "Crispy, crunchy & naturally delicious fruit bites.",
      path: "/fruit-powder-chunks",
      btnText: "EXPLORE BITES",
      bgClass: "bg-[#EEF4EC]", // Light fresh green tone
      textColor: "text-[#2B4C1F]",
      btnClass: "bg-[#2B4C1F] hover:bg-[#1E3615] text-white",
      image: "https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/crispybites_group_g4sd9s.png"
    }
  ];

  // Testimonials
  const customerReviews = [
    {
      stars: 5,
      text: "Berry Blast is my everyday energy booster! Tastes amazing and so easy to make.",
      author: "Ananya, Delhi"
    },
    {
      stars: 5,
      text: "The chocolates are luxurious and the fruit inside is so real! Absolutely love Banana Cocoa Dark.",
      author: "Rohan, Bangalore"
    },
    {
      stars: 5,
      text: "Healthy snacking made easy. My kids love Crispy Bites Mixed Fruit!",
      author: "Priya, Mumbai"
    }
  ];

  const [reviewIndex, setReviewIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#213B14]">
      <Header />

      {/* Hero Banner Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[780px] flex items-center pt-40 pb-28 overflow-hidden">
        {/* Absolute Background Image */}
        <img 
          src="/Home_backgroun_Image.png" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0" 
        />
        {/* Subtle gradient overlay for text readability on small screens */}
        <div className="absolute inset-0 bg-[#FAF7F2]/40 md:bg-transparent md:bg-gradient-to-r md:from-[#FAF7F2]/80 md:to-transparent z-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Banner Text Content */}
            <div className="lg:col-span-5 space-y-6">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#213B14] leading-[1.1] tracking-tight">
                Real Fruit. <br />
                Real Taste. <br />
                Real Nutrition.
              </h1>
              <p className="text-[#3F622D] text-base md:text-lg font-medium max-w-md">
                {heroSlides[0].subtitle}
              </p>

              {/* Grid of Badges - Horizontal row with icon top, text bottom */}
              <div className="flex flex-wrap items-start gap-4 md:gap-6 pt-4">
                {heroSlides[0].badges.map((badge, idx) => {
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

              {/* Shop CTA */}
              <div className="pt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#213B14] hover:bg-[#3F622D] text-[#FAF7F2] font-extrabold rounded-full transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  SHOP NOW
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Foreground Product Image on the Right */}
            <div className="lg:col-span-7 flex justify-center z-20">
              <img
                src="/Home_Product_image.png"
                alt="The Dry Factory Products Showcase"
                className="w-full max-w-4xl lg:max-w-[900px] xl:max-w-[1000px] h-auto object-contain lg:scale-[1.33] hover:scale-[1.35] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Quick Navigation Row */}
      <section className="py-16 bg-white border-t border-b border-[#213B14]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promoCategories.map((cat, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 flex flex-col justify-between items-start transition-all duration-300 hover:shadow-lg border border-[#213B14]/5 ${cat.bgClass}`}
              >
                <div className="space-y-3 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-serif text-2xl font-black ${cat.textColor}`}>
                        {cat.brand}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-[200px]">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-8 w-full flex flex-col gap-4">
                  {/* Category illustrative block */}
                  <div className="w-full h-32 rounded-xl bg-white/60 overflow-hidden relative">
                    <img
                      src={cat.image}
                      alt={cat.brand}
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <Link
                    to={cat.path}
                    className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${cat.btnClass}`}
                  >
                    {cat.btnText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#213B14]">
                Best Sellers
              </h2>
              <p className="text-[#3F622D] text-sm font-bold uppercase tracking-widest mt-1">
                Loved by thousands of health conscious customers
              </p>
            </div>
            {/* Slider Controls */}
            <div className="flex gap-2">
              <button
                onClick={handlePrevBestSeller}
                className="w-10 h-10 rounded-full border border-[#213B14]/20 flex items-center justify-center text-[#213B14] hover:bg-[#213B14] hover:text-[#FAF7F2] transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextBestSeller}
                className="w-10 h-10 rounded-full border border-[#213B14]/20 flex items-center justify-center text-[#213B14] hover:bg-[#213B14] hover:text-[#FAF7F2] transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-2 border-[#213B14] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${bestSellerIndex * (100 / 4)}%)`,
                }}
              >
                {bestSellers.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0 bg-white rounded-2xl p-4 border border-[#213B14]/5 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-4">
                      {/* Product packaging block */}
                      <Link
                        to={`/product/${product._id || product.id}`}
                        className="block aspect-square w-full rounded-xl bg-[#FAF7F2] overflow-hidden relative"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <div>
                        <span className="text-[10px] font-bold text-[#3F622D] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#213B14] mt-1 line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">{product.weight}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#213B14]/5 flex items-center justify-between">
                      <span className="font-serif text-lg font-black text-[#213B14]">
                        ₹{product.price}
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                          addedItems[product._id || product.id]
                            ? "bg-green-700 text-white"
                            : "bg-[#213B14] text-[#FAF7F2] hover:bg-[#3F622D]"
                        }`}
                      >
                        {addedItems[product._id || product.id] ? "Added!" : "ADD TO CART"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose The Dry Factory? Section */}
      <section className="py-20 bg-white border-t border-b border-[#213B14]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#213B14]">
              Why Choose The Dry Factory?
            </h2>
            <div className="w-16 h-0.5 bg-[#3F622D] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {[
              { title: "Real Fruit", desc: "Made with 100% real freeze dried fruits.", icon: Leaf },
              { title: "Freeze Dried Tech", desc: "Locks nutrition, taste & natural goodness.", icon: Snowflake },
              { title: "No Additives", desc: "No preservatives, no artificial flavors or colors.", icon: FlaskConical },
              { title: "No Added Sugar", desc: "Just pure fruit. Nothing extra.", icon: ShieldCheck },
              { title: "Light & Convenient", desc: "Perfect for snacking anytime, anywhere.", icon: Zap },
              { title: "Made in India", desc: "Proudly made with care in India.", icon: Heart }
            ].map((pillar, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-4">
                <div className="w-12 h-12 rounded-full bg-[#3F622D]/10 flex items-center justify-center text-[#3F622D] shadow-sm">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#213B14]">{pillar.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[150px]">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Ingredients. Real People. Real Results. Section */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-extrabold text-[#213B14] leading-[1.15]">
                Real Ingredients. <br />
                Real People. <br />
                Real Results.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed max-w-md">
                We bridge the gap between delicious taste and raw nutrition. Our products help busy professionals, children, and fitness enthusiasts fuel their bodies without sacrificing simplicity.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#213B14] hover:bg-[#3F622D] text-[#FAF7F2] font-bold rounded-full transition-all duration-300"
                >
                  OUR STORY
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Collage of images */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md h-64 bg-[#FCEAEB]">
                <img src="https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&q=80" alt="Smoothie" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md h-64 mt-8 bg-[#F5ECE6]">
                <img src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=300&q=80" alt="Chocolate" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md h-64 bg-[#EEF4EC]">
                <img src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=300&q=80" alt="Berry" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 bg-white border-t border-b border-[#213B14]/5 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center text-[#3F622D] mb-4">
            <Leaf className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-extrabold text-[#213B14] mb-12">
            What Our Customers Say
          </h2>

          <div className="relative min-h-[160px] flex flex-col justify-center items-center">
            {/* Reviews controls and content */}
            <div className="max-w-xl mx-auto">
              <div className="flex justify-center gap-1 text-amber-500 mb-4">
                {[...Array(customerReviews[reviewIndex].stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-[#213B14] text-lg font-medium italic leading-relaxed">
                "{customerReviews[reviewIndex].text}"
              </p>
              <h4 className="font-bold text-[#3F622D] mt-6 text-sm uppercase tracking-wider">
                — {customerReviews[reviewIndex].author}
              </h4>
            </div>

            {/* Arrow Nav */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between w-full pointer-events-none px-4">
              <button
                onClick={() => setReviewIndex(prev => (prev === 0 ? customerReviews.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full border border-[#213B14]/20 flex items-center justify-center text-[#213B14] hover:bg-[#213B14] hover:text-[#FAF7F2] pointer-events-auto transition-all bg-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setReviewIndex(prev => (prev === customerReviews.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 rounded-full border border-[#213B14]/20 flex items-center justify-center text-[#213B14] hover:bg-[#213B14] hover:text-[#FAF7F2] pointer-events-auto transition-all bg-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* As Seen On Brands Showcase */}
      <section className="py-12 bg-[#FAF7F2] border-b border-[#213B14]/5 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3F622D]/60 mb-6">
            AS SEEN ON
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            <span className="font-sans text-lg font-black text-gray-500 tracking-wider">YourStory</span>
            <span className="font-serif text-lg font-extrabold text-gray-500 tracking-wider italic">FEMINA</span>
            <span className="font-sans text-lg font-black text-gray-500 tracking-widest">INDIA TODAY</span>
            <span className="font-sans text-lg font-bold text-gray-500 uppercase">Entrepreneur</span>
            <span className="font-serif text-lg font-black text-gray-500 tracking-tighter">mint</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  ShoppingBag,
  Shield,
  Sparkles,
  Heart,
  Eye,
  Package,
  CheckCircle2,
  Truck,
  Lock,
  Zap,
  Award,
  Droplets,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { productApi } from "../api/product.api";
import { getProductPrimaryImage } from "../utils/productImage";

// ─── Image with fallback ──────────────────────────────────────────────────────
function SafeImg({ src, alt, emoji, className = "" }: { src: string; alt: string; emoji?: string; className?: string }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-[#2a2a2a] ${className}`}>
        <span style={{ fontSize: "3rem", lineHeight: 1 }}>{emoji || "🍓"}</span>
        <span className="text-white/50 text-[10px] font-semibold mt-2 text-center px-2">{alt}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} onError={() => setBroken(true)} />;
}

// ─── Badge icon map ───────────────────────────────────────────────────────────
const BADGE_ICONS: Record<string, React.ReactNode> = {
  "No Sugar":        <Leaf className="w-3 h-3" />,
  "No Preservatives": <Shield className="w-3 h-3" />,
  "Real Fruit":      <Sparkles className="w-3 h-3" />,
  "No Added Sugar":  <Leaf className="w-3 h-3" />,
  "Freeze Dried":    <Zap className="w-3 h-3" />,
  "Gluten Free":     <Award className="w-3 h-3" />,
  "Vegan":           <Droplets className="w-3 h-3" />,
  "100% Natural":    <Award className="w-3 h-3" />,
};
const DEFAULT_CARD_BADGES = ["No Sugar", "No Preservatives", "Real Fruit"];

const categories = [
  { id: "all", label: "All Products", icon: "✨" },
  { id: "smoothie-premix", label: "Smoothies (Ready in 10 sec)", icon: "🥤" },
  { id: "chocolates", label: "Chocolates (Guilt-free indulgence)", icon: "🍫" },
  { id: "fruit-chunks", label: "Fruit Chunks (Healthy snacking)", icon: "🍓" },
  { id: "bestsellers", label: "Bestsellers", icon: "⭐" },
  { id: "combos", label: "Combos & Gifts", icon: "🎁" },
];

type CategoryBanner = { title: string; sub: string; titleLines?: readonly [string, string] };

const categoryBanners: Record<string, CategoryBanner> = {
  all: {
    title: "Real Fruit. Real Taste. Zero Compromise.",
    titleLines: ["Real Fruit. Real Taste.", "Zero Compromise."],
    sub: "Snack smarter with real fruit products made for taste, health, and convenience.",
  },
  "smoothie-premix": { title: "Smoothies (Ready in 10 sec)", sub: "Ready in 10 seconds. 100% natural." },
  chocolates: { title: "Chocolates (Guilt-free indulgence)", sub: "Real fruit meets rich couverture chocolate." },
  "fruit-chunks": { title: "Fruit Chunks (Healthy snacking)", sub: "Intensely flavored crunchy chunks." },
  bestsellers: { title: "Bestsellers", sub: "Our most loved real fruit products." },
  combos: { title: "Combos & Gifts", sub: "Premium gift hampers and bundles for special occasions." },
};

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: any; index: number }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 1500);
  };

  const isInStock = !product.stock || product.stock === "In Stock";
  const isLowStock = product.stock === "Low Stock";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      onClick={() => navigate(`/product/${product._id || product.id}`)}
      className="group bg-[#161616] rounded-[18px] overflow-hidden border border-white/[0.07] hover:border-[#D4AF37]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer relative"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
      whileHover={{ boxShadow: "0 20px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.25)" }}
    >
      {/* Bestseller Badge */}
      {product.featured && (
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#D4AF37] text-black text-[9px] font-black rounded-sm tracking-[0.15em] uppercase shadow-lg">
          ★ BESTSELLER
        </div>
      )}

      {/* Discount Badge */}
      {discount > 0 && !product.featured && (
        <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-red-500 text-white text-[9px] font-bold rounded-sm tracking-wide">
          -{discount}%
        </div>
      )}

      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1e1e1e]">
        {/* Hover Actions */}
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0 ${
            wishlisted ? "bg-red-500 border-red-500 text-white" : "bg-black/50 border-white/10 text-white hover:text-red-400 hover:border-red-400/40"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-current" : ""}`} />
        </button>
        <button
          aria-label="Quick view"
          onClick={(e) => { e.stopPropagation(); navigate(`/product/${product._id || product.id}`); }}
          className="absolute top-[52px] right-3 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 delay-75"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleAddToCart}
          aria-label="Add to Cart"
          className="absolute top-[100px] right-3 z-20 w-8 h-8 rounded-full bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30 flex items-center justify-center hover:scale-110 transition-all opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 delay-150"
        >
          {added ? <CheckCircle2 className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
        </button>

        <SafeImg
          src={getProductPrimaryImage(product)}
          alt={product.name}
          emoji={product.emoji}
          className="group-hover:scale-108 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2.5">
        {/* Category Tag */}
        <p className="text-[#D4AF37] text-[10px] font-black tracking-[0.14em] uppercase">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-white font-bold text-[15px] leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-200">
          {product.name}
        </h3>

        {/* Benefit line */}
        {product.subtitle && (
          <p className="text-white/55 text-[11px] leading-relaxed line-clamp-2">{product.subtitle}</p>
        )}

        {/* Weight */}
        {product.weight && (
          <p className="text-white/35 text-[11px] font-semibold">{product.weight}</p>
        )}

        {/* Trust Badges — dynamic from backend */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-0.5">
          {(product.trustBadges?.length > 0 ? product.trustBadges : DEFAULT_CARD_BADGES).map((badge: string, bi: number) => (
            <div key={`${badge}-${bi}`} className="flex items-center gap-1.5">
              <span className="text-[#D4AF37]">{BADGE_ICONS[badge] ?? <Award className="w-3 h-3" />}</span>
              <span className="text-[10px] text-white/45 font-medium">{badge}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] my-0.5" />

        {/* Price + Stock + CTA */}
        <div className="flex flex-col gap-2.5 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-white tracking-tight">₹{product.price}</span>
              {product.originalPrice > 0 && (
                <span className="text-xs text-white/30 line-through font-medium">₹{product.originalPrice}</span>
              )}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm border ${
              isInStock
                ? "text-green-400 bg-green-500/10 border-green-500/25"
                : isLowStock
                ? "text-orange-400 bg-orange-500/10 border-orange-500/25"
                : "text-red-400 bg-red-500/10 border-red-500/25"
            }`}>
              {product.stock || "In Stock"}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${
              added
                ? "bg-green-600 text-white"
                : "bg-[#D4AF37] text-black hover:bg-[#c4a030] shadow-md shadow-[#D4AF37]/15"
            }`}
          >
            {added ? (
              <><CheckCircle2 className="w-4 h-4" /> Added!</>
            ) : (
              <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Trust Strip ──────────────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { icon: <Award className="w-5 h-5 shrink-0" />, label: "100% Natural", sub: "Made from real fruits" },
    { icon: <Shield className="w-5 h-5 shrink-0" />, label: "No Preservatives", sub: "Nothing artificial" },
    { icon: <Leaf className="w-5 h-5 shrink-0" />, label: "No Added Sugar", sub: "Only natural sweetness" },
    { icon: <Zap className="w-5 h-5 shrink-0" />, label: "Freeze-Dried", sub: "Locks in nutrients & flavor" },
    { icon: <Lock className="w-5 h-5 shrink-0" />, label: "Secure Checkout", sub: "Safe & trusted payments" },
    { icon: <Truck className="w-5 h-5 shrink-0" />, label: "Pan India Delivery", sub: "Fast & reliable shipping" },
  ];
  return (
    <div className="border-t border-white/[0.07] mt-12 py-6">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-white/50 hover:text-white/70 transition-colors">
            <span className="text-[#D4AF37]">{item.icon}</span>
            <div>
              <p className="text-sm sm:text-base font-bold text-white leading-tight">{item.label}</p>
              <p className="text-xs sm:text-sm text-white/45 mt-1 leading-snug">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Products() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productApi.getAll();
        setAllProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = allProducts.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "bestsellers") return p.featured;
    return p.category?.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "") === activeCategory ||
      p.category?.toLowerCase().replace(/\s+/g, "-") === activeCategory;
  });

  const banner = categoryBanners[activeCategory] || categoryBanners.all;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Header />
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Page Heading */}
        <div className="mb-8 mt-4 text-center">
          <motion.h1
            key={activeCategory + "-title"}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl font-black mb-2 sm:mb-3 tracking-tight"
          >
            {banner.titleLines ? (
              <>
                <span className="block">{banner.titleLines[0]}</span>
                <span className="block text-[#D4AF37]">{banner.titleLines[1]}</span>
              </>
            ) : (
              banner.title
                .split(".")
                .filter((p) => p.trim().length > 0)
                .map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part.trim()}.<br className="hidden sm:block" />
                    </span>
                  ) : (
                    <span key={i} className="text-[#D4AF37]">
                      {part.trim()}
                    </span>
                  )
                )
            )}
          </motion.h1>
          <motion.p
            key={activeCategory + "-sub"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base"
          >
            {banner.sub}
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 sm:mb-10">
          <div
            className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold leading-snug transition-all border ${
                  activeCategory === cat.id
                    ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                    : "bg-white/[0.04] text-white/55 hover:bg-white/[0.08] hover:text-white border-white/[0.06]"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/35 font-bold uppercase tracking-widest text-xs">Fetching deliciousness...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 bg-white/[0.03] rounded-[32px] border border-white/[0.07]">
            <Package className="w-16 h-16 mx-auto mb-4 text-white/10" />
            <h3 className="text-xl font-bold text-white/30">No products found in this category</h3>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-4 text-[#D4AF37] font-bold hover:underline"
            >
              View all products
            </button>
          </div>
        )}

        {/* Trust Strip */}
        <TrustStrip />
      </main>
      <Footer />
    </div>
  );
}
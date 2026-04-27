import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
 ArrowRight,
 Leaf,
 Star,
 ShoppingBag,
 Zap,
 Shield,
 BadgeCheck,
 Sparkles,
 SlidersHorizontal,
 ChevronDown,
 Heart,
 Eye,
 Gift,
 Package,
 Ribbon,
 Tag,
 CheckCircle2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { productApi } from "../api/product.api";

// ─── Image component with guaranteed fallback ────────────────────────────────
interface SafeImgProps {
 src: string;
 alt: string;
 emoji: string;
 gradientFrom: string;
 gradientTo: string;
 className?: string;
}

function SafeImg({
 src,
 alt,
 emoji,
 gradientFrom,
 gradientTo,
 className = "",
}: SafeImgProps) {
 const [broken, setBroken] = useState(false);

 if (broken) {
  return (
   <div
    className={`w-full h-full flex flex-col items-center justify-center ${className}`}
    style={{
     background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
    }}
   >
    <span style={{ fontSize: "3rem", lineHeight: 1 }}>{emoji || "🍓"}</span>
    <span className="text-white/80 text-[10px] font-semibold mt-2 text-center px-2">
     {alt}
    </span>
   </div>
  );
 }

 return (
  <img
   src={src}
   alt={alt}
   className={`w-full h-full object-cover ${className}`}
   onError={() => setBroken(true)}
  />
 );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = [
 { id: "all", label: "All Products", emoji: "✨" },
 { id: "smoothie-premix", label: "Smoothie Premix", emoji: "🥤" },
 { id: "chocolates", label: "Chocolates", emoji: "🍫" },
 { id: "fruit-chunks", label: "Fruit Chunks", emoji: "🍓" },
 { id: "fruit-powders", label: "Fruit Powders", emoji: "🌟" },
 { id: "combos", label: "Combos", emoji: "📦" },
 { id: "gifts", label: "Gifts", emoji: "🎁" },
];

const categoryBanners: Record<string, any> = {
 all: { title: "Shop All Products", sub: "Real fruit. Zero additives. Maximum flavor.", color: "#D4AF37", emoji: "✨" },
 "smoothie-premix": { title: "Smoothie Premix", sub: "Ready in 10 seconds. 100% natural.", color: "#D4AF37", emoji: "🥤" },
 chocolates: { title: "Chocolates", sub: "Real fruit meets rich couverture chocolate.", color: "#D4AF37", emoji: "🍫" },
 "fruit-chunks": { title: "Fruit Chunks", sub: "Intensely flavored crunchy chunks.", color: "#D4AF37", emoji: "🍓" },
 "fruit-powders": { title: "Fruit Powders", sub: "Concentrated fruit essence in fine powder.", color: "#D4AF37", emoji: "🌟" },
 combos: { title: "Combos & Bundles", sub: "More flavors, bigger savings.", color: "#D4AF37", emoji: "📦" },
 gifts: { title: "Gifts", sub: "Premium gift hampers for special occasions.", color: "#D4AF37", emoji: "🎁" },
};

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: any; index: number }) {
 const { addToCart } = useCart();
 const navigate = useNavigate();
 const [added, setAdded] = useState(false);

 const discount = product.originalPrice
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

 const handleWishlist = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  // wishlist logic here
 };

 return (
  <motion.div
   layout
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ delay: index * 0.05 }}
   onClick={() => navigate(`/product/${product._id || product.id}`)}
   className="group bg-[#161616] rounded-[20px] overflow-hidden border border-white/[0.07] hover:border-[#D4AF37]/35 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
   style={{
    boxShadow: "0 0 0 0 transparent",
   }}
   whileHover={{
    boxShadow: "0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)",
   }}
  >
   {/* ── Image ── */}
   <div className="relative aspect-[4/3] overflow-hidden bg-[#222]">
    {discount > 0 && (
     <div className="absolute top-2.5 left-2.5 z-10 px-2 py-1 bg-[#D4AF37] text-black text-[10px] font-bold rounded-md tracking-wider">
      -{discount}%
     </div>
    )}
    <button
     onClick={handleWishlist}
     aria-label="Add to wishlist"
     className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-red-400 transition-colors"
    >
     <Heart className="w-3.5 h-3.5" />
    </button>
    <SafeImg
     src={product.image}
     alt={product.name}
     emoji={product.emoji}
     gradientFrom={product.gradientFrom || "#1a1a1a"}
     gradientTo={product.gradientTo || "#333"}
     className="group-hover:scale-105 transition-transform duration-700"
    />
    {/* Bottom gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
   </div>

   {/* ── Body ── */}
   <div className="p-4 flex flex-col flex-1 gap-2.5">
    {/* Product info */}
    <div>
     <p className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase mb-1">
      {product.category}
     </p>
     <h3 className="text-white font-semibold text-[15px] leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-200">
      {product.name}
     </h3>
     {product.subtitle && (
      <p className="text-white/50 text-[11px] italic mt-0.5 line-clamp-1">{product.subtitle}</p>
     )}
     {product.weight && (
      <p className="text-white/35 text-[11px] mt-0.5">{product.weight}</p>
     )}
    </div>

    {/* Divider */}
    <div className="h-px bg-white/[0.06]" />

    {/* Price + CTA */}
    <div className="flex flex-col gap-2.5 mt-auto">
     {/* Price row */}
     <div className="flex items-center justify-between">
      <div className="flex items-baseline gap-1.5">
       <span className="text-[18px] font-bold text-white tracking-tight leading-none">
        ₹{product.price}
       </span>
       {product.originalPrice && (
        <span className="text-xs text-white/30 line-through leading-none">
         ₹{product.originalPrice}
        </span>
       )}
      </div>
      <span
       className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${!product.stock || product.stock === "In Stock"
         ? "text-green-400 bg-green-500/10 border-green-500/20"
         : "text-orange-400 bg-orange-500/10 border-orange-500/20"
        }`}
      >
       {product.stock || "In Stock"}
      </span>
     </div>

     {/* Add to Cart button */}
     <button
      onClick={handleAddToCart}
      className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] ${added
        ? "bg-green-700 text-white shadow-none"
        : "bg-[#D4AF37] text-black hover:bg-[#c4a030] shadow-lg shadow-[#D4AF37]/10"
       }`}
     >
      {added ? (
       <>
        <CheckCircle2 className="w-4 h-4" />
        Added!
       </>
      ) : (
       <>
        <ShoppingBag className="w-4 h-4" />
        Add to Cart
       </>
      )}
     </button>
    </div>
   </div>
  </motion.div>
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

 const filtered = allProducts.filter(
  (p) =>
   activeCategory === "all" ||
   p.category.toLowerCase().replace(/\s+/g, "-") === activeCategory
 );

 return (
  <div className="min-h-screen bg-black text-white">
   <Header />
   <main className="pt-20 pb-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    {/* Page heading */}
    <div className="mb-8 text-center">
     <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
      {categoryBanners[activeCategory].title}
     </h1>
     <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
      {categoryBanners[activeCategory].sub}
     </p>
    </div>

    {/* Category Filter - horizontal scroll on mobile */}
    <div className="mb-8 sm:mb-12">
     <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
     >
      {categories.map((cat) => (
       <button
        key={cat.id}
        onClick={() => setActiveCategory(cat.id)}
        className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
         activeCategory === cat.id
          ? "bg-[#D4AF37] text-black"
          : "bg-white/5 text-white/60 hover:bg-white/10"
        }`}
       >
        {cat.emoji} {cat.label}
       </button>
      ))}
     </div>
    </div>

    {/* Loading */}
    {loading ? (
     <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
       Fetching Deliciousness...
      </p>
     </div>
    ) : (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <AnimatePresence mode="popLayout">
       {filtered.map((product, i) => (
        <ProductCard key={product._id} product={product} index={i} />
       ))}
      </AnimatePresence>
     </div>
    )}

    {/* Empty state */}
    {!loading && filtered.length === 0 && (
     <div className="text-center py-20 bg-white/5 rounded-[32px] border border-white/10">
      <Package className="w-16 h-16 mx-auto mb-4 text-white/10" />
      <h3 className="text-xl font-bold text-white/40">
       No products found in this category
      </h3>
      <button
       onClick={() => setActiveCategory("all")}
       className="mt-4 text-[#D4AF37] font-bold hover:underline"
      >
       View all products
      </button>
     </div>
    )}
   </main>
   <Footer />
  </div>
 );
}
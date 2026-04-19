import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
  const [wished, setWished] = useState(false);
  const { addToCart } = useCart();
  
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-[#2a2a2a]">
        {discount > 0 && (
          <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-lg">
            -{discount}%
          </div>
        )}
        <SafeImg 
          src={product.image} 
          alt={product.name} 
          emoji={product.emoji} 
          gradientFrom={product.gradientFrom || "#1a1a1a"}
          gradientTo={product.gradientTo || "#333"}
          className="group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <button 
            onClick={() => {
              addToCart(product);
              toast.success(`${product.name} added to cart!`);
            }}
            className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform"
           >
             Add to Cart
           </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-bold text-sm mb-1">{product.name}</h3>
        <p className="text-white/40 text-[10px] mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#D4AF37] font-bold">₹{product.price}</span>
          <span className={`text-[10px] font-bold uppercase ${product.stock === "In Stock" ? "text-green-500" : "text-orange-500"}`}>
            {product.stock}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

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

  const filtered = allProducts.filter(p => activeCategory === "all" || p.category.toLowerCase().replace(/\s+/g, "-") === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{categoryBanners[activeCategory].title}</h1>
          <p className="text-white/60 max-w-2xl mx-auto">{categoryBanners[activeCategory].sub}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.id 
                  ? "bg-[#D4AF37] text-black" 
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Fetching Deliciousness...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-[32px] border border-white/10">
            <Package className="w-16 h-16 mx-auto mb-4 text-white/10" />
            <h3 className="text-xl font-bold text-white/40">No products found in this category</h3>
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

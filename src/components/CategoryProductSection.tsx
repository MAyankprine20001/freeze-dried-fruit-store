import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CheckCircle2, Heart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productApi } from '../api/product.api';
import { toast } from 'react-toastify';

// ── Safe image with emoji fallback ──────────────────────────────────────────
function SafeImg({
  src,
  alt,
  emoji,
  gradientFrom,
  gradientTo,
  className = '',
}: {
  src: string;
  alt: string;
  emoji?: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);

  if (broken || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center ${className}`}
        style={{
          background: `linear-gradient(135deg, ${gradientFrom || '#1a1a1a'}, ${gradientTo || '#333'})`,
        }}
      >
        <span style={{ fontSize: '3rem', lineHeight: 1 }}>{emoji || '🍓'}</span>
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

// ── Product Card ─────────────────────────────────────────────────────────────
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      onClick={() => navigate(`/product/${product._id || product.id}`)}
      className="group bg-[#161616] rounded-[20px] overflow-hidden border border-white/[0.07] hover:border-[#D4AF37]/35 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
      whileHover={{
        boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)',
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#222]">
        {discount > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-1 bg-[#D4AF37] text-black text-[10px] font-bold rounded-md tracking-wider">
            -{discount}%
          </div>
        )}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          aria-label="Add to wishlist"
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-red-400 transition-colors"
        >
          <Heart className="w-3.5 h-3.5" />
        </button>
        <SafeImg
          src={product.image}
          alt={product.name}
          emoji={product.emoji}
          gradientFrom={product.gradientFrom || '#1a1a1a'}
          gradientTo={product.gradientTo || '#333'}
          className="group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2.5">
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

        <div className="h-px bg-white/[0.06]" />

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
              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${
                !product.stock || product.stock === 'In Stock'
                  ? 'text-green-400 bg-green-500/10 border-green-500/20'
                  : 'text-orange-400 bg-orange-500/10 border-orange-500/20'
              }`}
            >
              {product.stock || 'In Stock'}
            </span>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] ${
              added
                ? 'bg-green-700 text-white shadow-none'
                : 'bg-[#D4AF37] text-black hover:bg-[#c4a030] shadow-lg shadow-[#D4AF37]/10'
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

// ── CategoryProductSection ───────────────────────────────────────────────────
interface CategoryProductSectionProps {
  /** The category string to filter products by (case-insensitive, hyphen-tolerant) */
  categoryKey: string;
  /** Section heading displayed above the grid */
  title: string;
  /** Optional sub-text below the title */
  subtitle?: string;
}

export default function CategoryProductSection({
  categoryKey,
  title,
  subtitle,
}: CategoryProductSectionProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await productApi.getAll();
        // Normalize both sides: lowercase + replace spaces/underscores with hyphen
        const normalize = (s: string) =>
          s.toLowerCase().replace(/[\s_]+/g, '-');

        const all: any[] = res.data ?? res;
        const filtered = all.filter(
          (p: any) => normalize(p.category || '') === normalize(categoryKey)
        );
        if (!cancelled) setProducts(filtered);
      } catch (err) {
        console.error('CategoryProductSection: failed to fetch products', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, [categoryKey]);

  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-widest rounded-full border border-[#D4AF37]/20 mb-4">
            Shop Now
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Loading spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
              Loading Products…
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {products.map((product, i) => (
                <ProductCard key={product._id || product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/5 rounded-[32px] border border-white/10"
          >
            <Package className="w-16 h-16 mx-auto mb-4 text-white/10" />
            <h3 className="text-xl font-bold text-white/40 mb-2">
              Products Coming Soon
            </h3>
            <p className="text-white/25 text-sm">
              We're adding new products to this category — check back shortly.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

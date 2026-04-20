import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Truck, Heart, ArrowLeft, ShieldCheck, ShoppingBag, Package } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { productApi } from "../api/product.api";

// Assuming same ProductCard for Similar Items
// Since we don't have access to the full Products page component here, we can create a simpler one for similar items or import it.
// Actually, it's better to fetch similar products. I will build a simple one here.

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!id) return;
        
        // Fetch single product
        const res = await productApi.getById(id);
        const p = res.data;
        setProduct(p);

        // Fetch similar products (same category)
        const allRes = await productApi.getAll();
        const similar = allRes.data
          .filter((item: any) => item.category === p.category && item._id !== p._id)
          .slice(0, 4); // get up to 4
        setSimilarProducts(similar);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col text-white">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-[#D4AF37] hover:underline">Return to Products</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center text-sm text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{product.category}</span>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
            {/* Left: Image gallery */}
            <div className="space-y-4 sticky top-28">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="aspect-square bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden relative group"
              >
                {discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg tracking-wider">
                    -{discount}% OFF
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>

            {/* Right: Details */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              {/* Header section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-[#D4AF37] mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm font-medium">{product.rating} ({product.reviews || 12} reviews)</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
                <div className="flex items-end gap-4 mb-2">
                  <span className="text-4xl font-bold text-[#D4AF37]">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-white/40 line-through mb-1">₹{product.originalPrice}</span>
                  )}
                </div>
                <p className="text-white/40 text-sm">Inclusive of all taxes</p>
              </div>

              {/* Add to Cart Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center bg-[#1a1a1a] rounded-xl border border-white/10 h-14">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    for(let i=0; i<quantity; i++) addToCart(product);
                    toast.success(`${quantity} x ${product.name} added to cart!`);
                  }}
                  className="flex-1 h-14 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                
                <button 
                  onClick={() => {
                    for(let i=0; i<quantity; i++) addToCart(product);
                    window.location.href = '/cart';
                  }}
                  className="flex-1 h-14 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#b5952f] transition-all shadow-lg shadow-[#D4AF37]/20"
                >
                  Buy it now
                </button>
              </div>

              {/* Delivery info */}
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 mb-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Fast Delivery</h4>
                  <p className="text-sm text-white/60">Dispatches within 24 hours. Delivered in 3-5 days.</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Description:</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  {product.subtitle || "Experience the pure essence of nature with our premium freeze-dried selection. Zero additives, maximum flavor, and perfect crunch in every bite."}
                </p>
                
                {product.highlights && product.highlights.length > 0 && (
                  <ul className="space-y-3">
                    {product.highlights.map((highlight: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-white/80">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Store details equivalent */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black font-serif text-lg font-bold text-[#D4AF37]">
                  TDF
                </div>
                <div>
                  <h4 className="font-bold text-white">The Dry Factory</h4>
                  <p className="text-xs text-white/40">Premium Freeze-Dried Fruits</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Similar Items */}
          {similarProducts.length > 0 && (
            <div className="border-t border-white/10 pt-16">
              <h2 className="text-2xl font-bold mb-8">Similar items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((p) => (
                  <Link 
                    key={p._id} 
                    to={`/product/${p._id}`}
                    className="group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-colors block"
                  >
                    <div className="aspect-[4/3] bg-[#2a2a2a] overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{p.name}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-lg">₹{p.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ShieldCheck,
  Truck, Flame, Leaf, Shield, Sparkles, Lock, Package, RotateCcw
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { productApi } from "../api/product.api";
import { getProductPrimaryImage } from "../utils/productImage";
import { toast } from "react-toastify";
import { useShippingConfig, computeCartShipping } from "../hooks/useShippingConfig";
import { couponApi } from "../api/coupon.api";
import { computeOrderTotalsWithCoupon } from "../utils/couponDiscount";

import LifestyleBadges from "../components/LifestyleBadges";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems, addToCart, appliedCoupon, setAppliedCoupon } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [upsellProducts, setUpsellProducts] = useState<any[]>([]);
  const { deliveryCharge, freeShippingThreshold } = useShippingConfig();

  const shipping = computeCartShipping(subtotal, items.length, { deliveryCharge, freeShippingThreshold });
  const couponForPricing = appliedCoupon
    ? { discountType: appliedCoupon.discountType, discountValue: appliedCoupon.discountValue }
    : null;
  const priced = computeOrderTotalsWithCoupon(subtotal, shipping, couponForPricing);
  const total = priced.total;
  const discount = priced.discount;
  const displayShipping = priced.finalShipping;
  const freeShippingGap =
    freeShippingThreshold > 0 ? Math.max(0, freeShippingThreshold - subtotal) : 0;
  const freeShippingProgress =
    freeShippingThreshold > 0 ? Math.min(100, (subtotal / freeShippingThreshold) * 100) : 100;

  useEffect(() => {
    if (appliedCoupon) setPromoCode(appliedCoupon.code);
  }, [appliedCoupon]);

  const handleApplyCoupon = async () => {
    const code = promoCode.trim();
    if (!code) {
      toast.error("Enter a coupon code");
      return;
    }
    setCouponLoading(true);
    try {
      const res = await couponApi.validate(code, subtotal);
      if (!res.success || !res.data) {
        toast.error((res as { message?: string }).message || "Invalid coupon");
        return;
      }
      const d = res.data as { code: string; discountType: string; discountValue: number };
      setAppliedCoupon({
        code: d.code,
        discountType: d.discountType,
        discountValue: d.discountValue,
      });
      toast.success(`Coupon ${d.code} applied`);
    } catch (e: unknown) {
      const msg =
         typeof e === "object" && e !== null && "response" in e
          ? (e as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      toast.error(msg || "Could not apply coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  useEffect(() => {
    productApi.getAll().then((res) => {
      const cartIds = new Set(items.map((i) => i.id));
      const others = res.data.filter((p: any) => !cartIds.has(p._id)).slice(0, 4);
      setUpsellProducts(others);
    }).catch(() => {});
  }, [items]);

  if (items.length === 0) return (
    <div className="min-h-screen bg-[#111111] flex flex-col text-white">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-[#161616] rounded-3xl p-12 text-center border border-white/5 max-w-md w-full"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-10 h-10 text-[#E4B34F]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-white/50 mb-7 text-sm leading-relaxed">Looks like you haven't added anything yet. Explore our delicious freeze-dried fruits!</p>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 bg-[#E4B34F] hover:bg-[#D4A13F] text-[#213B14] px-8 py-3.5 rounded-full font-black transition-all hover:scale-[1.02] shadow-lg shadow-[#E4B34F]/10"
          >
            Browse Products
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col text-white">
      <Header />
      <main className="flex-1 pt-28 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 items-start mt-4">

            {/* ── LEFT: Cart Items ── */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#161616] rounded-2xl border border-white/5 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#E4B34F]" />
                    <h1 className="text-lg font-bold text-white">My Cart</h1>
                  </div>
                  <span className="text-white/45 text-sm font-medium">{totalItems} {totalItems === 1 ? "item" : "items"}</span>
                </div>

                {/* Items */}
                <div className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 py-5"
                      >
                        <div className="flex gap-4">
                          {/* Image */}
                          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#222]">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1 min-w-0 pr-3">
                                <p className="text-[10px] font-black text-[#E4B34F] uppercase tracking-widest mb-1">{item.category}</p>
                                <p className="text-base font-bold text-white leading-tight">{item.name}</p>
                                <p className="text-xs text-white/35 mt-0.5">{item.weight}</p>
                                {/* Trust Badges */}
                                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                                  {[
                                    { icon: <Sparkles className="w-3 h-3" />, label: "100% Real Fruit" },
                                    { icon: <Leaf className="w-3 h-3" />, label: "No Sugar" },
                                    { icon: <Shield className="w-3 h-3" />, label: "No Preservatives" },
                                  ].map((b) => (
                                    <div key={b.label} className="flex items-center gap-1 text-white/40">
                                      <span className="text-[#E4B34F]">{b.icon}</span>
                                      <span className="text-[10px] font-medium">{b.label}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {/* Delete + Price */}
                              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <p className="text-base font-black text-[#E4B34F]">₹{item.price * item.quantity}</p>
                              </div>
                            </div>
                            {/* Quantity + Urgency */}
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                              <div className="flex items-center bg-white/[0.03] rounded-full border border-white/5">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5">
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-7 text-center text-sm font-bold">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5">
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-white/40">
                                <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-[#E4B34F]" /><span className="text-[#E4B34F] font-bold">Only 7 left in stock</span></span>
                                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-blue-400" />Delivery by 2-3 days</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Continue Shopping */}
                <div className="px-6 py-4 border-t border-white/5">
                  <Link to="/products" className="inline-flex items-center gap-2 text-white/50 hover:text-[#E4B34F] transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Frequently Bought Together */}
              {upsellProducts.length > 0 && (
                <div className="bg-[#161616] rounded-2xl border border-white/5 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#E4B34F]" />
                        <h3 className="font-bold text-white text-sm">Frequently Bought Together</h3>
                      </div>
                      <p className="text-[10px] text-white/40 mt-0.5">Add more & enjoy better experience</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-[#E4B34F]/15 text-[#E4B34F] border border-[#E4B34F]/30">Special Combo Offer</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {upsellProducts.map((p) => (
                      <div key={p._id} className="bg-[#1e1e1e] rounded-xl p-3 border border-white/5 flex flex-col gap-2">
                        <div className="aspect-square rounded-lg overflow-hidden bg-[#2a2a2a]">
                          <img src={getProductPrimaryImage(p)} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[10px] font-bold text-white line-clamp-2 leading-tight">{p.name}</p>
                        {p.subtitle && <p className="text-[10px] text-white/40 line-clamp-1">{p.subtitle}</p>}
                        <div className="flex items-center justify-between mt-auto pt-1">
                          <span className="text-xs font-black text-white">₹{p.price}</span>
                          <button
                            onClick={() => { addToCart(p); toast.success(`${p.name} added!`); }}
                            className="text-[10px] font-bold px-3 py-1.5 bg-[#E4B34F] hover:bg-[#D4A13F] text-[#213B14] rounded-lg transition-colors"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="bg-[#161616] rounded-2xl border border-white/5 p-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-5">
                  <ShieldCheck className="w-5 h-5 text-[#E4B34F]" />
                  <h2 className="text-lg font-bold">Order Summary</h2>
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex justify-between text-white/55">
                    <span>Subtotal</span>
                    <span className="text-white font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-white/55">
                    <span className="flex items-center gap-1">Shipping <span className="text-[10px] text-white/30 border border-white/20 rounded-full w-4 h-4 inline-flex items-center justify-center">ℹ</span></span>
                    <span className={displayShipping === 0 ? "text-green-400 font-semibold" : "text-white font-semibold"}>
                      {displayShipping === 0 ? "Free" : `₹${displayShipping}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400/90">
                      <span>Discount{appliedCoupon ? ` (${appliedCoupon.code})` : ""}</span>
                      <span className="font-semibold">−₹{discount}</span>
                    </div>
                  )}
                </div>

                {/* Free Shipping Bar */}
                {freeShippingGap > 0 && (
                  <div className="mb-5 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <p className="text-[11px] text-white/60 mb-2">
                      You're <span className="text-[#E4B34F] font-bold">₹{freeShippingGap}</span> away from <span className="font-bold text-white">FREE Delivery!</span>
                    </p>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#E4B34F] rounded-full transition-all duration-700" style={{ width: `${freeShippingProgress}%` }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-white/30">₹{subtotal}</span>
                      <span className="text-[10px] text-white/30">₹{freeShippingThreshold}</span>
                    </div>
                  </div>
                )}

                {/* Coupon */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-white/50 mb-2 block">Apply Coupon</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="bg-black border border-white/10 rounded-xl px-3 py-2.5 flex-1 text-white placeholder-white/20 focus:outline-none focus:border-[#E4B34F] transition-colors text-sm"
                    />
                    <button
                      type="button"
                      disabled={couponLoading}
                      onClick={handleApplyCoupon}
                      className="bg-white/5 text-white font-bold px-4 rounded-xl hover:bg-white/10 transition-colors text-sm border border-white/10 disabled:opacity-50"
                    >
                      {couponLoading ? "…" : "Apply"}
                    </button>
                  </div>
                  {appliedCoupon && (
                    <button
                      type="button"
                      onClick={() => { setAppliedCoupon(null); toast.info("Coupon removed"); }}
                      className="mt-2 text-[11px] text-white/40 hover:text-red-400 transition-colors"
                    >
                      Remove coupon
                    </button>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center mb-5">
                  <span className="text-base font-semibold text-white/70">Total</span>
                  <span className="text-2xl font-black text-white">₹{total}</span>
                </div>

                {/* Trust Badges Row */}
                <div className="flex items-center justify-center gap-4 mb-5 text-[10px] text-white/40">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-400" />Secure Checkout</span>
                  <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-blue-400" />COD Available</span>
                  <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5 text-purple-400" />Easy Returns</span>
                </div>

                {/* CTA */}
                <Link
                  to="/checkout"
                  className="w-full bg-[#E4B34F] text-[#213B14] py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 hover:bg-[#D4A13F] active:scale-[0.98] transition-all shadow-lg shadow-[#E4B34F]/20 mb-3"
                >
                  <Lock className="w-4 h-4" /> Secure Checkout →
                </Link>
                <p className="text-center text-[10px] text-white/30">Safe, Secure & Encrypted Payments</p>
              </div>
            </div>
          </div>

          <LifestyleBadges />
        </div>
      </main>
      <Footer />
    </div>
  );
}
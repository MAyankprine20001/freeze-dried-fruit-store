import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ShieldCheck,
  Truck, Leaf, Sparkles, Lock, RotateCcw, Heart, Info, HelpCircle
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

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems, addToCart, appliedCoupon, setAppliedCoupon } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [upsellProducts, setUpsellProducts] = useState<any[]>([]);
  const { deliveryCharge, freeShippingThreshold } = useShippingConfig();
  const navigate = useNavigate();

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

  // Check if Mango and Banana are both in cart to simulate special combo offer
  const hasMango = items.some(item => item.name.toLowerCase().includes("mango"));
  const hasBanana = items.some(item => item.name.toLowerCase().includes("banana"));
  const showComboOffer = !hasMango || !hasBanana;

  const handleAddCombo = async () => {
    try {
      const res = await productApi.getAll();
      const mangoProd = res.data.find((p: any) => p.name.toLowerCase().includes("mango"));
      const bananaProd = res.data.find((p: any) => p.name.toLowerCase().includes("banana"));
      if (mangoProd && !hasMango) addToCart(mangoProd);
      if (bananaProd && !hasBanana) addToCart(bananaProd);
      toast.success("Mango & Banana added to cart!");
    } catch (err) {
      toast.error("Failed to add combo products");
    }
  };

  if (items.length === 0) return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col text-[#213B14]">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-3xl p-12 text-center border border-[#213B14]/10 max-w-md w-full shadow-lg"
        >
          <div className="w-20 h-20 bg-[#213B14]/5 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-10 h-10 text-[#E4B34F]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-[#213B14]/60 mb-7 text-sm leading-relaxed">Looks like you haven't added anything yet. Explore our delicious freeze-dried fruits!</p>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 bg-[#213B14] hover:bg-[#3F622D] text-white px-8 py-3.5 rounded-full font-black transition-all hover:scale-[1.02] shadow-lg shadow-[#213B14]/10"
          >
            Browse Products
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col text-[#213B14] font-sans">
      <Header />
      
      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* ── TOP TITLE & ACTION AREA ── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-2 text-[#1C2A18]">
                Your Cart <span className="text-[#3F622D]">🍃</span>
              </h1>
              {freeShippingGap > 0 ? (
                <p className="text-sm font-semibold text-[#3F622D] mt-1.5">
                  You're just <span className="font-extrabold text-[#E4B34F]">₹{freeShippingGap}</span> away from <span className="font-extrabold">FREE Delivery!</span>
                </p>
              ) : (
                <p className="text-sm font-semibold text-green-600 mt-1.5 flex items-center gap-1.5">
                  <Truck className="w-4 h-4" /> You're qualified for free delivery!
                </p>
              )}
            </div>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#213B14]/15 rounded-xl text-sm font-bold text-[#213B14] hover:bg-[#FAF7F2] transition-colors self-start sm:self-auto shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {/* ── TRUST BADGES BAR ── */}
          <div className="bg-white rounded-2xl border border-[#213B14]/10 p-5 mb-8 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#213B14]/10">
            <div className="flex items-center gap-3 px-3 py-2 md:py-0">
              <div className="w-10 h-10 rounded-full bg-[#213B14]/5 flex items-center justify-center text-[#213B14] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#1C2A18]">Secure Checkout</p>
                <p className="text-[10px] text-[#213B14]/60 font-medium">100% Safe Payments</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 pt-3 md:pt-0 py-2 md:py-0">
              <div className="w-10 h-10 rounded-full bg-[#213B14]/5 flex items-center justify-center text-[#213B14] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#1C2A18]">Fast & Reliable Delivery</p>
                <p className="text-[10px] text-[#213B14]/60 font-medium">2–3 Days Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 pt-3 md:pt-0 py-2 md:py-0">
              <div className="w-10 h-10 rounded-full bg-[#213B14]/5 flex items-center justify-center text-[#213B14] shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#1C2A18]">Easy Returns</p>
                <p className="text-[10px] text-[#213B14]/60 font-medium">7 Days Return Policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 pt-3 md:pt-0 py-2 md:py-0">
              <div className="w-10 h-10 rounded-full bg-[#213B14]/5 flex items-center justify-center text-[#213B14] shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#1C2A18]">Loved by 10,000+</p>
                <p className="text-[10px] text-[#213B14]/60 font-medium">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* ── GRID SYSTEM ── */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Cart Container Card */}
              <div className="bg-white rounded-3xl border border-[#213B14]/10 overflow-hidden shadow-sm">
                
                {/* Desktop Table Headers */}
                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-[#213B14]/5 border-b border-[#213B14]/10 text-[10px] font-black tracking-widest text-[#213B14]/60">
                  <div className="col-span-6">PRODUCT</div>
                  <div className="col-span-2 text-center">PRICE</div>
                  <div className="col-span-2 text-center">QUANTITY</div>
                  <div className="col-span-2 text-right">TOTAL</div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-[#213B14]/10">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 py-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                          
                          {/* Image & Main Info */}
                          <div className="col-span-1 sm:col-span-6 flex gap-4">
                            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF7F2] border border-[#213B14]/10">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[9px] font-black text-[#E4B34F] uppercase tracking-wider mb-1">{item.category}</p>
                              <h3 className="text-base font-extrabold text-[#1C2A18] leading-tight mb-0.5">{item.name}</h3>
                              <p className="text-xs text-[#213B14]/50 font-semibold mb-2">{item.weight}</p>
                              
                              {/* Trust Badges under description */}
                              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                                <div className="flex items-center gap-1 text-[#213B14]/60 text-[9px] font-bold">
                                  <Leaf className="w-3.5 h-3.5 text-[#3F622D]" /> 100% Real Fruit
                                </div>
                                <div className="flex items-center gap-1 text-[#213B14]/60 text-[9px] font-bold">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#3F622D]" /> No Added Sugar
                                </div>
                              </div>

                              {/* Highlight box */}
                              <div className="p-2 bg-[#213B14]/5 rounded-lg text-[10px] text-[#213B14]/75 font-semibold leading-relaxed border-l-2 border-[#E4B34F] max-w-sm">
                                Healthy snacking for the whole family! Perfect travel & on-the-go snack.
                              </div>

                              {/* Remove / Wishlist Actions */}
                              <div className="flex items-center gap-4 mt-4 text-[11px] font-bold text-[#213B14]/50">
                                <button 
                                  onClick={() => removeFromCart(item.id)} 
                                  className="flex items-center gap-1 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Remove
                                </button>
                                <button 
                                  className="flex items-center gap-1 hover:text-[#E4B34F] transition-colors"
                                >
                                  <Heart className="w-3.5 h-3.5" /> Move to Wishlist
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Price */}
                          <div className="col-span-1 sm:col-span-2 text-left sm:text-center">
                            <span className="inline-block sm:hidden text-xs text-[#213B14]/50 font-black mr-2">PRICE:</span>
                            <span className="text-sm font-extrabold text-[#213B14]">₹{item.price}</span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                            <div className="flex items-center bg-[#FAF7F2] rounded-full border border-[#213B14]/20 p-0.5">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                className="w-7 h-7 flex items-center justify-center text-[#213B14]/60 hover:text-[#213B14] transition-colors rounded-full hover:bg-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-black text-[#213B14]">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                className="w-7 h-7 flex items-center justify-center text-[#213B14]/60 hover:text-[#213B14] transition-colors rounded-full hover:bg-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Total Price */}
                          <div className="col-span-1 sm:col-span-2 text-left sm:text-right">
                            <span className="inline-block sm:hidden text-xs text-[#213B14]/50 font-black mr-2">TOTAL:</span>
                            <span className="text-base font-black text-[#213B14]">₹{item.price * item.quantity}</span>
                          </div>

                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Progress bar inside left block */}
                {freeShippingGap > 0 && (
                  <div className="mx-6 my-6 p-4 bg-[#FAF7F2] rounded-2xl border border-[#213B14]/10">
                    <p className="text-xs text-[#213B14] font-bold mb-2 flex justify-between">
                      <span>Add <span className="text-[#E4B34F]">₹{freeShippingGap}</span> more for FREE DELIVERY!</span>
                      <span className="text-[10px] text-[#213B14]/40">Threshold: ₹{freeShippingThreshold}</span>
                    </p>
                    <div className="h-2.5 bg-[#213B14]/10 rounded-full overflow-hidden relative">
                      <div className="h-full bg-[#3F622D] rounded-full transition-all duration-700" style={{ width: `${freeShippingProgress}%` }} />
                    </div>
                    <div className="flex justify-between mt-1.5 text-[9px] font-black text-[#213B14]/40">
                      <span>₹{subtotal}</span>
                      <span>₹{freeShippingThreshold}</span>
                    </div>
                  </div>
                )}

                {/* Special Combo Offer Banner */}
                {showComboOffer && (
                  <div className="mx-6 mb-6 p-4 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E4B34F] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E4B34F]/10 flex items-center justify-center text-[#E4B34F] shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-[#E4B34F]">Special Combo Offer!</p>
                        <p className="text-xs text-[#213B14]/80 font-medium">Add both Mango & Banana together and save ₹30!</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs text-[#213B14]/40 line-through font-semibold mr-1.5">₹328</span>
                        <span className="text-sm font-black text-[#213B14]">₹298</span>
                      </div>
                      <button 
                        onClick={handleAddCombo}
                        className="bg-[#213B14] hover:bg-[#3F622D] text-white text-[10px] font-black tracking-widest px-4 py-2.5 rounded-xl uppercase transition-colors"
                      >
                        Add Combo
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Frequently Bought Together */}
              {upsellProducts.length > 0 && (
                <div className="bg-white rounded-3xl border border-[#213B14]/10 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-extrabold text-[#1C2A18] text-lg">Frequently Bought Together</h3>
                      <p className="text-xs text-[#213B14]/50 font-semibold mt-0.5">Add more & enjoy better experience</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#E4B34F]/10 text-[#E4B34F] border border-[#E4B34F]/20">
                        Special Offer
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {upsellProducts.map((p) => (
                      <div key={p._id} className="bg-[#FAF7F2] rounded-2xl p-3 border border-[#213B14]/5 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
                        <div className="aspect-square rounded-xl overflow-hidden bg-white border border-[#213B14]/5">
                          <img src={getProductPrimaryImage(p)} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[8px] font-black text-[#E4B34F] uppercase tracking-widest">{p.category || "FRUIT CHUNKS"}</p>
                          <p className="text-xs font-black text-[#1C2A18] line-clamp-1 leading-tight">{p.name}</p>
                          {p.subtitle && <p className="text-[10px] text-[#213B14]/50 line-clamp-1 font-semibold">{p.subtitle}</p>}
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#213B14]/5">
                          <span className="text-xs font-black text-[#213B14]">₹{p.price}</span>
                          <button
                            onClick={() => { addToCart(p); toast.success(`${p.name} added!`); }}
                            className="text-[10px] font-extrabold px-3 py-1.5 bg-white border border-[#213B14]/15 hover:bg-[#213B14] hover:text-white rounded-lg transition-colors text-[#213B14]"
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

            {/* ── RIGHT COLUMN: SUMMARY & TRUST ── */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
              
              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl border border-[#213B14]/10 p-6 shadow-sm">
                <h2 className="text-lg font-extrabold text-[#1C2A18] mb-5">Order Summary</h2>

                {/* Pricing Rows */}
                <div className="space-y-3 mb-5 text-xs font-semibold">
                  <div className="flex justify-between text-[#213B14]/75">
                    <span>Subtotal ({totalItems} Items)</span>
                    <span className="text-[#1C2A18] font-black">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#213B14]/75">
                    <span className="flex items-center gap-1">
                      Delivery Charges 
                      <Info className="w-3.5 h-3.5 text-[#213B14]/40 cursor-pointer" />
                    </span>
                    <span className={displayShipping === 0 ? "text-green-600 font-black" : "text-[#1C2A18] font-black"}>
                      {displayShipping === 0 ? "FREE" : `₹${displayShipping}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount{appliedCoupon ? ` (${appliedCoupon.code})` : ""}</span>
                      <span className="font-black">−₹{discount}</span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#213B14]/10 mb-4" />

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-extrabold text-[#1C2A18]">Total</span>
                  <span className="text-2xl font-black text-[#1C2A18]">₹{total}</span>
                </div>

                {/* Savings Callout */}
                {discount > 0 && (
                  <div className="p-3 bg-[#3F622D]/5 rounded-xl border border-[#3F622D]/10 text-[11px] text-[#3F622D] font-bold mb-5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-[#E4B34F]" />
                    <span>You're Saving ₹{discount} with Combo Offer! Great choice for a healthier you.</span>
                  </div>
                )}

                {/* Promo Code Input */}
                <div className="mb-6">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[#213B14]/50 mb-2 block">Apply Coupon</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl px-3 py-2.5 flex-1 text-xs text-[#213B14] placeholder-[#213B14]/40 font-bold focus:outline-none focus:border-[#213B14] transition-colors"
                    />
                    <button
                      type="button"
                      disabled={couponLoading}
                      onClick={handleApplyCoupon}
                      className="bg-[#213B14] text-white font-bold px-4 rounded-xl hover:bg-[#3F622D] transition-colors text-xs disabled:opacity-50"
                    >
                      {couponLoading ? "…" : "Apply"}
                    </button>
                  </div>
                  {appliedCoupon && (
                    <button
                      type="button"
                      onClick={() => { setAppliedCoupon(null); toast.info("Coupon removed"); }}
                      className="mt-2 text-[10px] font-bold text-red-500 hover:underline"
                    >
                      Remove coupon
                    </button>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    className="w-full bg-[#213B14] hover:bg-[#3F622D] text-white py-4 rounded-xl font-black text-sm flex flex-col items-center justify-center transition-all shadow-md"
                  >
                    <span className="flex items-center gap-2 uppercase tracking-widest"><Lock className="w-4 h-4" /> Proceed to Checkout</span>
                    <span className="text-[9px] text-white/60 font-semibold mt-0.5">Safe • Secure • 100% Protected</span>
                  </Link>
                  
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-white hover:bg-[#FAF7F2] border border-[#213B14]/15 text-[#213B14] py-3.5 rounded-xl font-extrabold text-xs flex flex-col items-center justify-center transition-all"
                  >
                    <span className="uppercase tracking-wider">Express Checkout</span>
                    <span className="text-[8px] text-[#213B14]/40 font-semibold mt-0.5">Faster checkout with saved details</span>
                  </button>
                </div>

              </div>

              {/* Why Shop With Us Card */}
              <div className="bg-white rounded-3xl border border-[#213B14]/10 p-6 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#1C2A18] mb-5">Why Shop With Us?</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Leaf className="w-5 h-5 text-[#3F622D] shrink-0" />
                    <div>
                      <p className="text-xs font-black text-[#1C2A18]">100% Real Fruits</p>
                      <p className="text-[10px] text-[#213B14]/60 font-semibold">Nothing Artificial</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#3F622D] shrink-0" />
                    <div>
                      <p className="text-xs font-black text-[#1C2A18]">No Preservatives</p>
                      <p className="text-[10px] text-[#213B14]/60 font-semibold">No Additives</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Sparkles className="w-5 h-5 text-[#3F622D] shrink-0" />
                    <div>
                      <p className="text-xs font-black text-[#1C2A18]">Premium Quality</p>
                      <p className="text-[10px] text-[#213B14]/60 font-semibold">Lab tested & safe</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Heart className="w-5 h-5 text-[#3F622D] shrink-0" />
                    <div>
                      <p className="text-xs font-black text-[#1C2A18]">Made in India</p>
                      <p className="text-[10px] text-[#213B14]/60 font-semibold">Proudly Made in India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7-Day Guarantee Card */}
              <div className="bg-red-500/[0.03] border border-red-500/10 rounded-3xl p-5 flex items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> 7-Day Happiness Guarantee
                  </h4>
                  <p className="text-[10px] text-red-800/70 font-semibold leading-relaxed">
                    Not happy with your order? We'll make it right.
                  </p>
                </div>
                {/* Stamp style circle */}
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-red-800/30 flex flex-col items-center justify-center shrink-0 text-red-800 font-black text-[9px] uppercase tracking-tighter leading-none select-none rotate-12">
                  <span>7</span>
                  <span className="text-[6px] tracking-widest mt-0.5">DAYS</span>
                </div>
              </div>

            </div>

          </div>

          {/* ── BOTTOM BANNER AREA ── */}
          <div className="mt-16 bg-white rounded-3xl border border-[#213B14]/10 overflow-hidden shadow-sm grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 sm:p-12 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C2A18] leading-tight">
                Real Ingredients.<br />Real People. Real Results.
              </h2>
              
              <Link 
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#213B14] hover:bg-[#3F622D] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm animate-bounce"
              >
                Our Story →
              </Link>
              
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#213B14]/10">
                <div>
                  <p className="text-lg font-black text-[#1C2A18]">10,000+</p>
                  <p className="text-[9px] text-[#213B14]/50 font-bold uppercase tracking-wider">Happy Customers</p>
                </div>
                <div>
                  <p className="text-lg font-black text-[#1C2A18]">4.8/5</p>
                  <p className="text-[9px] text-[#213B14]/50 font-bold uppercase tracking-wider">Average Rating</p>
                </div>
                <div>
                  <p className="text-lg font-black text-[#1C2A18]">100%</p>
                  <p className="text-[9px] text-[#213B14]/50 font-bold uppercase tracking-wider">Would Recommend</p>
                </div>
              </div>
            </div>
            
            <div className="h-64 md:h-full min-h-[250px] relative overflow-hidden self-stretch bg-[#FAF7F2]">
              <img 
                src="/freeze_dried_fruits_bowl.png" 
                alt="Freeze Dried Fruit Bowl" 
                className="w-full h-full object-cover animate-fade-in" 
              />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
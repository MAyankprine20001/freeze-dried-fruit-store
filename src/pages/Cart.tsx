import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const discount = 0;
  const shipping = subtotal > 500 || items.length === 0 ? 0 : 50;
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-white">
      <Header />

      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1a1a] rounded-3xl p-12 text-center border border-white/10 shadow-2xl max-w-2xl mx-auto mt-10"
            >
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Your cart is empty</h2>
              <p className="text-white/60 mb-8 leading-relaxed text-lg">
                Looks like you haven't added anything to your cart yet.
                Explore our delicious freeze-dried fruits and snacks!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold hover:bg-[#b5952f] transition-all"
              >
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-10 items-start mt-8">
              {/* Items List */}
              <div className="lg:col-span-8 bg-[#1a1a1a] rounded-3xl p-6 md:p-10 border border-white/10">
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                  <h1 className="text-3xl font-bold tracking-tight text-white">My Cart</h1>
                  <span className="text-white/60 font-medium">{totalItems} items</span>
                </div>

                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5 last:border-0 last:pb-0"
                      >
                        <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-[#2a2a2a]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex-1 flex flex-col sm:flex-row justify-between w-full gap-4">
                          <div className="flex flex-col justify-center">
                            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                              {item.category}
                            </span>
                            <p className="text-xl font-bold text-white mb-1">{item.name}</p>
                            <p className="text-sm text-white/40 mb-3">{item.weight}</p>

                            {/* Quantity Control */}
                            <div className="flex items-center bg-white/5 rounded-full border border-white/10 w-fit">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-bold text-white text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end sm:min-w-[100px]">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <p className="text-xl font-bold text-[#D4AF37]">₹{item.price * item.quantity}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-white/60 font-medium hover:text-[#D4AF37] transition-colors mt-8 pt-6 border-t border-white/10 w-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 sticky top-28">
                <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/10 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Order Summary</h2>

                  <div className="space-y-4 mb-8 text-[15px]">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#D4AF37]">
                        <span>Discount</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white/60">
                      <span>Delivery</span>
                      <span className={shipping === 0 ? "text-green-400 font-medium" : "text-white font-medium"}>
                        {shipping === 0 ? "Free" : `₹${shipping}`}
                      </span>
                    </div>
                  </div>

                  {/* Promo code */}
                  <div className="mb-8">
                    <label className="text-sm text-white/60 mb-2 block">Promo code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Type here..."
                        className="bg-black border border-white/10 rounded-xl px-4 py-3 flex-1 text-white focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                      />
                      <button className="bg-white/10 text-white font-medium px-6 rounded-xl hover:bg-white/20 transition-colors text-sm">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-between items-end mb-8">
                    <span className="text-lg font-medium text-white/80">Total</span>
                    <span className="text-3xl font-bold text-[#D4AF37]">₹{total}</span>
                  </div>

                  {/* ✅ FIXED — was a dead <button>, now a <Link> to /checkout */}
                  <Link
                    to="/checkout"
                    className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#b5952f] active:scale-[0.98] transition-all shadow-lg shadow-[#D4AF37]/20 mb-6"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <div className="flex items-center justify-center gap-4 text-white/40 mb-8">
                    <div className="h-[1px] flex-1 bg-white/10" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Secure checkout</span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <ShieldCheck className="w-5 h-5 text-green-400" />
                      Secure SSL encrypted checkout
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <Truck className="w-5 h-5 text-blue-400" />
                      Fast delivery within 3-5 business days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
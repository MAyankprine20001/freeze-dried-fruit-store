import React from "react";
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
  CreditCard 
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-2 text-center">Your Cart</h1>
            <p className="text-[#6b6b6b] text-center">{totalItems} items in your selection</p>
          </header>

          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-12 text-center border border-[#f0ede8] shadow-sm max-w-2xl mx-auto"
            >
              <div className="w-24 h-24 bg-[#fdf3ec] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-[#e85d26]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Your cart is empty</h2>
              <p className="text-[#6b6b6b] mb-8 leading-relaxed">
                Looks like you haven't added anything to your cart yet. 
                Explore our delicious freeze-dried fruits and snacks!
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 bg-[#e85d26] text-white px-8 py-4 rounded-full font-bold hover:bg-[#d44f1a] transition-all"
              >
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Items List */}
              <div className="lg:col-span-8 space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white p-5 rounded-3xl border border-[#f0ede8] flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-[#fafafa]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <span className="text-[10px] font-bold text-[#e85d26] uppercase tracking-wider mb-1 block">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">{item.name}</h3>
                        <p className="text-sm text-[#9a8a7a]">{item.weight}</p>
                      </div>

                      <div className="flex items-center bg-[#fdfaf7] rounded-xl border border-[#e8e2d9] p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-white rounded-lg transition-colors text-[#9a8a7a] hover:text-[#e85d26]"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-[#1a1a1a]">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-white rounded-lg transition-colors text-[#9a8a7a] hover:text-[#e85d26]"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right min-w-[100px]">
                        <p className="text-lg font-bold text-[#1a1a1a]">₹{item.price * item.quantity}</p>
                        <p className="text-xs text-[#9a8a7a]">₹{item.price} / unit</p>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-3 text-[#d1cdc7] hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Link 
                  to="/products"
                  className="inline-flex items-center gap-2 text-[#9a8a7a] font-bold hover:text-[#e85d26] transition-colors mt-4 p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>

              {/* Summary Side */}
              <div className="lg:col-span-4 sticky top-28">
                <div className="bg-white rounded-[32px] p-8 border border-[#f0ede8] shadow-sm">
                  <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-[#6b6b6b] font-medium">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[#6b6b6b] font-medium">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "Free" : `₹${shipping}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[11px] text-[#9a8a7a] bg-[#fdfaf7] p-2 rounded-lg border border-[#e85d26]/10">
                         Free shipping on orders above <span className="font-bold text-[#e85d26]">₹500</span>!
                      </p>
                    )}
                    <div className="pt-4 border-t border-[#f0ede8] flex justify-between items-end">
                      <span className="text-lg font-bold text-[#1a1a1a]">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-[#e85d26]">₹{total}</span>
                        <p className="text-[10px] text-[#9a8a7a]">Inclusive of all taxes</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-[#1a1a1a] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#2a2a2a] active:scale-[0.98] transition-all shadow-xl shadow-[#1a1a1a]/10 mb-6">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-[#6b6b6b]">
                      <div className="w-8 h-8 rounded-full bg-[#f0f9f0] flex items-center justify-center text-green-600">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      Secure SSL encrypted checkout
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#6b6b6b]">
                      <div className="w-8 h-8 rounded-full bg-[#f0f4f9] flex items-center justify-center text-blue-600">
                        <Truck className="w-4 h-4" />
                      </div>
                      Fast delivery within 3-5 business days
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#6b6b6b]">
                      <div className="w-8 h-8 rounded-full bg-[#fdf3ec] flex items-center justify-center text-[#e85d26]">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      Accepting all major payment methods
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

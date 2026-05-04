import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, ShieldCheck, Truck, MapPin, Phone, User, Home,
  Building2, Hash, ArrowRight, Package, Loader2, Lock, Plus,
  CheckCircle, Leaf, Shield, Sparkles, RotateCcw, Award, Zap, Star,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { productApi } from "../api/product.api";
import { getProductPrimaryImage } from "../utils/productImage";
import { createRazorpayOrder, verifyRazorpayPayment, loadRazorpayScript } from "../api/payment";
import { useShippingConfig, computeCartShipping } from "../hooks/useShippingConfig";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  addressLine1: z.string().min(5, "Enter your street address"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "Enter your city"),
  state: z.string().min(2, "Select your state"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});
type FormData = z.infer<typeof schema>;

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand",
  "West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli",
  "Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

interface InputFieldProps { label: string; icon: React.ReactNode; error?: string; required?: boolean; [key: string]: any; }
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, error, required, ...props }, ref) => (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-white/60 flex items-center gap-1">
        {label}{required && <span className="text-[#D4AF37]">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25">{icon}</span>
        <input ref={ref} {...props} className={`w-full pl-11 pr-4 py-3 bg-[#0d0d0d] border rounded-xl text-white text-sm placeholder:text-white/20 transition-all outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 ${error ? "border-red-500/60" : "border-white/10"}`} />
      </div>
      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
    </div>
  )
);
InputField.displayName = "InputField";

// Simple Checkout Header
function CheckoutHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-black text-sm">TDF</div>
            <span className="text-white font-bold text-sm hidden sm:block">The Dry Factory</span>
          </Link>
          <div className="h-5 w-px bg-white/20" />
          <div className="flex items-center gap-1.5 text-white/50 text-sm">
            <Lock className="w-3.5 h-3.5 text-green-400" />
            <span>Secure Checkout</span>
          </div>
        </div>
        <a href="mailto:support@thedryfactory.com" className="text-white/40 hover:text-white text-xs transition-colors flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5" /> Need Help? Contact us
        </a>
      </div>
    </header>
  );
}

// Progress Indicator
function ProgressBar({ step }: { step: number }) {
  const steps = ["Delivery Details", "Payment", "Confirmation"];
  return (
    <div className="flex items-center gap-0 mb-7">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
              i < step ? "bg-[#D4AF37] border-[#D4AF37] text-black" :
              i === step ? "bg-[#D4AF37] border-[#D4AF37] text-black" :
              "bg-transparent border-white/20 text-white/30"
            }`}>{i < step ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}</div>
            <span className={`text-xs font-bold ${i <= step ? "text-white/80" : "text-white/25"}`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mx-3 transition-all ${i < step ? "bg-[#D4AF37]" : "bg-white/10"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart, addToCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [upsellProducts, setUpsellProducts] = useState<any[]>([]);
  const { deliveryCharge, freeShippingThreshold } = useShippingConfig();

  const shipping = computeCartShipping(subtotal, items.length, { deliveryCharge, freeShippingThreshold });
  const total = subtotal + shipping;
  const freeShippingGap =
    freeShippingThreshold > 0 ? Math.max(0, freeShippingThreshold - subtotal) : 0;
  const freeShippingProgress =
    freeShippingThreshold > 0 ? Math.min(100, (subtotal / freeShippingThreshold) * 100) : 100;

  useEffect(() => {
    productApi.getAll().then((res) => {
      const cartIds = new Set(items.map((i) => i.id));
      setUpsellProducts(res.data.filter((p: any) => !cartIds.has(p._id)).slice(0, 3));
    }).catch(() => {});
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user?.name ?? "",
      phone: user?.address?.phone ?? "",
      addressLine1: user?.address?.addressLine1 ?? "",
      addressLine2: user?.address?.addressLine2 ?? "",
      city: user?.address?.city ?? "",
      state: user?.address?.state ?? "",
      pincode: user?.address?.pincode ?? "",
    },
  });

  if (items.length === 0) return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col text-white">
      <CheckoutHeader />
      <main className="flex-1 flex items-center justify-center px-6 pt-24">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-5">
            <Package className="w-9 h-9 text-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-white/50 mb-6">Add some products before checking out.</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold hover:bg-[#b5952f] transition-colors">
            Browse Products
          </Link>
        </div>
      </main>
    </div>
  );

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) { toast.error("Failed to load payment gateway."); setLoading(false); return; }

      const orderPayload = {
        items: items.map((item) => ({ id: item.id, productId: item.id, name: item.name, price: item.price, image: item.image, quantity: item.quantity, weight: item.weight ?? "", category: item.category ?? "" })),
        shippingAddress: { fullName: formData.fullName, phone: formData.phone, addressLine1: formData.addressLine1, addressLine2: formData.addressLine2 ?? "", city: formData.city, state: formData.state, pincode: formData.pincode },
      };

      const orderRes = await createRazorpayOrder(orderPayload);
      if (!orderRes.success) { toast.error("Could not create order. Please try again."); setLoading(false); return; }

      const { orderId, amount, currency, dbOrderId, keyId } = orderRes.data;
      const options = {
        key: keyId, amount, currency,
        name: "The Dry Factory",
        description: `Order of ${items.length} item${items.length > 1 ? "s" : ""}`,
        image: "https://res.cloudinary.com/doi7id29n/image/upload/b_black,e_trim:0,r_max,q_auto,f_png/v1776528652/logo_2_on76wp.png",
        order_id: orderId,
        handler: async (response: any) => {
          try {
            const verifyRes = await verifyRazorpayPayment({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, dbOrderId });
            if (verifyRes.success) {
              clearCart();
              navigate("/order-success", { state: { orderId: verifyRes.data.orderId, paymentId: verifyRes.data.razorpayPaymentId, amount: verifyRes.data.amount, customerName: formData.fullName } });
            } else { toast.error("Payment verification failed. Please contact support."); }
          } catch { toast.error("Verification error. Please contact support."); }
        },
        prefill: { name: formData.fullName, email: user?.email ?? "", contact: formData.phone },
        theme: { color: "#000000" },
        modal: { ondismiss: () => { toast.info("Payment cancelled."); setLoading(false); } },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: any) => { toast.error(`Payment failed: ${response.error?.description ?? "Unknown error"}`); setLoading(false); });
      rzp.open();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? err.message ?? "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col text-white">
      <CheckoutHeader />
      <main className="flex-1 pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto mt-6">

          {/* Back + Title */}
          <div className="mb-5">
            <Link to="/cart" className="inline-flex items-center gap-2 text-white/40 hover:text-[#D4AF37] font-medium text-sm transition-colors mb-3">
              <ArrowLeft className="w-4 h-4" /> Back to Cart
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Checkout</h1>
            <p className="text-white/40 text-sm mt-1">Almost there! Complete your order by filling the details below.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

            {/* ── LEFT: Delivery Form ── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#161616] rounded-2xl border border-white/[0.08] p-5 sm:p-7">
              <ProgressBar step={0} />

              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.07]">
                <div className="w-9 h-9 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h2 className="font-bold text-white">Delivery Details</h2>
                  <p className="text-xs text-white/35">All fields are required *</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Full Name" icon={<User className="w-4 h-4" />} placeholder="Mayank Pandey" error={errors.fullName?.message} required {...register("fullName")} />
                  <InputField label="Mobile Number" icon={<Phone className="w-4 h-4" />} placeholder="9876543210" maxLength={10} error={errors.phone?.message} required {...register("phone")} />
                </div>
                <InputField label="Street Address" icon={<Home className="w-4 h-4" />} placeholder="House No, Street, Area" error={errors.addressLine1?.message} required {...register("addressLine1")} />
                <InputField label="Landmark / Apartment (Optional)" icon={<Building2 className="w-4 h-4" />} placeholder="Near temple, Floor 2..." {...register("addressLine2")} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="City" icon={<MapPin className="w-4 h-4" />} placeholder="New Delhi" error={errors.city?.message} required {...register("city")} />
                  <InputField label="Pincode" icon={<Hash className="w-4 h-4" />} placeholder="110001" maxLength={6} error={errors.pincode?.message} required {...register("pincode")} />
                </div>
                {/* State */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-white/60 flex items-center gap-1">State <span className="text-[#D4AF37]">*</span></label>
                  <select {...register("state")} className={`w-full px-4 py-3 bg-[#0d0d0d] border rounded-xl text-white text-sm transition-all outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 ${errors.state ? "border-red-500/60" : "border-white/10"}`}>
                    <option value="" className="bg-black">Select state</option>
                    {INDIAN_STATES.map((s) => <option key={s} value={s} className="bg-[#1a1a1a]">{s}</option>)}
                  </select>
                  {errors.state && <p className="text-xs text-red-400 font-medium">{errors.state.message}</p>}
                </div>

                {/* Mini Trust Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { icon: <ShieldCheck className="w-3.5 h-3.5 text-green-400" />, label: "SSL Encrypted" },
                    { icon: <Truck className="w-3.5 h-3.5 text-blue-400" />, label: "Delivery in 2–3 Days" },
                    { icon: <RotateCcw className="w-3.5 h-3.5 text-purple-400" />, label: "Easy Returns" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-xs text-white/45 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.08]">
                      {icon} {label}
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#c4a030] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#D4AF37]/20 mt-2"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" />Preparing payment...</>
                  ) : (
                    <><Lock className="w-5 h-5" />Complete Order ₹{total} →</>
                  )}
                </motion.button>
                <p className="text-center text-xs text-white/30">✓ You won't be charged until your order is confirmed</p>
              </form>
            </motion.div>

            {/* ── RIGHT: Order Summary ── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
              <div className="bg-[#161616] rounded-2xl border border-white/[0.08] p-5 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-white">Order Summary</h2>
                  <span className="text-[10px] font-black px-2.5 py-1 bg-[#D4AF37]/15 text-[#D4AF37] rounded-full border border-[#D4AF37]/25">{items.length} Item{items.length > 1 ? "s" : ""}</span>
                </div>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-[#2a2a2a] rounded-xl flex-shrink-0 overflow-hidden border border-white/[0.06]">
                        {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <Package className="w-5 h-5 text-[#D4AF37] m-auto" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">{item.category}</p>
                        <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                        <p className="text-xs text-white/35">{item.weight} · Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-black text-white flex-shrink-0">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/[0.07] my-4" />

                {/* Pricing */}
                <div className="space-y-2.5 text-sm mb-4">
                  <div className="flex justify-between text-white/50">
                    <span>Subtotal</span><span className="text-white font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>Delivery Charges</span>
                    <span className={shipping === 0 ? "text-green-400 font-semibold" : "text-white font-semibold"}>
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-black text-white text-base pt-2 border-t border-white/[0.07]">
                    <span>Total</span><span className="text-[#D4AF37]">₹{total}</span>
                  </div>
                </div>

                {/* Free Delivery Bar */}
                {freeShippingGap > 0 && (
                  <div className="mb-4 p-3 bg-white/[0.04] rounded-xl border border-white/[0.06]">
                    <p className="text-[11px] text-white/55 mb-2">Add <span className="text-[#D4AF37] font-bold">₹{freeShippingGap}</span> more for <span className="font-bold text-white">FREE DELIVERY!</span></p>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D4AF37] rounded-full transition-all duration-700" style={{ width: `${freeShippingProgress}%` }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-white/30">₹{subtotal}</span>
                      <span className="text-[10px] text-white/30">₹{freeShippingThreshold}</span>
                    </div>
                  </div>
                )}

                {/* Trust Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: <ShieldCheck className="w-3.5 h-3.5 text-green-400" />, label: "Secure Checkout" },
                    { icon: <Lock className="w-3.5 h-3.5 text-blue-400" />, label: "100% Safe Payments" },
                    { icon: <Package className="w-3.5 h-3.5 text-yellow-400" />, label: "COD Available" },
                    { icon: <Truck className="w-3.5 h-3.5 text-purple-400" />, label: "Fast & Reliable Delivery" },
                    { icon: <RotateCcw className="w-3.5 h-3.5 text-pink-400" />, label: "Easy Returns" },
                    { icon: <Star className="w-3.5 h-3.5 text-[#D4AF37]" />, label: "7 Day Return Policy" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-[10px] text-white/40">
                      {icon} {label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Upsell Section */}
          {upsellProducts.length > 0 && (
            <div className="mt-8 bg-[#161616] rounded-2xl border border-white/[0.08] p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-bold text-white flex items-center gap-2">
                    🔥 <span>Don't Miss Out!</span> <span className="text-white/50 font-normal">Add these bestsellers with your order</span>
                  </p>
                </div>
                <span className="text-[10px] font-black px-3 py-1.5 bg-white/[0.06] text-white/50 rounded-full border border-white/10">Frequently Bought Together</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {upsellProducts.map((p) => (
                  <div key={p._id} className="flex items-center gap-3 bg-[#1e1e1e] rounded-xl p-3 border border-white/[0.06]">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                      <img src={getProductPrimaryImage(p)} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white line-clamp-1">{p.name}</p>
                      {p.subtitle && <p className="text-[10px] text-white/40 line-clamp-1 mt-0.5">{p.subtitle}</p>}
                      <p className="text-xs font-black text-white mt-1">₹{p.price}</p>
                    </div>
                    <button
                      onClick={() => { addToCart(p); toast.success(`${p.name} added!`); }}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#D4AF37] text-black rounded-lg hover:bg-[#c4a030] transition-colors font-black"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why Shop with TDF */}
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div className="bg-[#161616] rounded-2xl border border-white/[0.08] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-bold text-white text-sm">Why Shop With The Dry Factory?</h3>
              </div>
              <ul className="space-y-2">
                {["Premium freeze-dried fruits", "No artificial colors or flavors", "Loved by 10,000+ customers", "⭐ 4.8/5 (1200+ Reviews)"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white/55">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Bottom Trust Strip */}
            <div className="bg-[#161616] rounded-2xl border border-white/[0.08] p-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Award className="w-5 h-5 shrink-0" />, label: "100% Natural", sub: "Made from real fruits" },
                  { icon: <Shield className="w-5 h-5 shrink-0" />, label: "No Preservatives", sub: "Nothing artificial" },
                  { icon: <Leaf className="w-5 h-5 shrink-0" />, label: "No Added Sugar", sub: "Only natural sweetness" },
                  { icon: <ShieldCheck className="w-5 h-5 shrink-0" />, label: "Premium Quality", sub: "Lab tested & safe" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <span className="text-[#D4AF37]">{item.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{item.label}</p>
                      <p className="text-xs sm:text-sm text-white/45 mt-1 leading-snug">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
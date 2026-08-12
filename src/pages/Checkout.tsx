import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, ShieldCheck, Truck, MapPin, Phone, User, Home,
  Building2, Hash, ArrowRight, Package, Loader2, Lock, Plus,
  CheckCircle2, Leaf, Shield, Sparkles, RotateCcw, Award, Zap, Star,
  AlertCircle, MessageSquare, Heart
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
import { computeOrderTotalsWithCoupon } from "../utils/couponDiscount";

import Header from "../components/Header";
import Footer from "../components/Footer";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  addressLine1: z.string().min(5, "Enter your street address"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "Enter your city"),
  state: z.string().min(2, "Select your state"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  orderNotes: z.string().optional(),
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
    <div className="space-y-1.5 text-left">
      <label className="text-xs font-bold text-[#213B14]/60 flex items-center gap-1">
        {label}{required && <span className="text-[#E4B34F]">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#213B14]/30">{icon}</span>
        <input 
          ref={ref} 
          {...props} 
          className={`w-full pl-11 pr-4 py-3 bg-[#FAF7F2] border rounded-xl text-[#213B14] text-xs font-semibold placeholder:text-[#213B14]/30 transition-all outline-none focus:bg-white focus:border-[#213B14] focus:ring-2 focus:ring-[#213B14]/5 ${
            error ? "border-red-500/60" : "border-[#213B14]/15"
          }`} 
        />
      </div>
      {error && <p className="text-[10px] text-red-500 font-bold">{error}</p>}
    </div>
  )
);
InputField.displayName = "InputField";

// Progress Indicator
function ProgressBar({ step }: { step: number }) {
  const steps = ["Delivery Details", "Payment", "Confirmation"];
  return (
    <div className="flex items-center justify-between gap-2 mb-8 bg-[#FAF7F2] border border-[#213B14]/10 rounded-2xl p-4">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
              i < step ? "bg-[#213B14] border-[#213B14] text-white" :
              i === step ? "bg-[#3F622D] border-[#3F622D] text-white" :
              "bg-transparent border-[#213B14]/20 text-[#213B14]/40"
            }`}>{i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}</div>
            <span className={`text-[11px] font-black uppercase tracking-wider ${i <= step ? "text-[#1C2A18]" : "text-[#213B14]/40"}`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 transition-all ${i < step ? "bg-[#213B14]" : "bg-[#213B14]/10"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart, addToCart, appliedCoupon, totalItems } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { deliveryCharge, freeShippingThreshold } = useShippingConfig();
  
  // Custom delivery option: standard or express
  const [deliveryOption, setDeliveryOption] = useState<"standard" | "express">("standard");

  const baseShipping = computeCartShipping(subtotal, items.length, { deliveryCharge, freeShippingThreshold });
  
  // Calculate final shipping charge based on selected option
  const finalShippingCharge = deliveryOption === "express" ? 99 : baseShipping;

  const couponForPricing = appliedCoupon
    ? { discountType: appliedCoupon.discountType, discountValue: appliedCoupon.discountValue }
    : null;
  const priced = computeOrderTotalsWithCoupon(subtotal, finalShippingCharge, couponForPricing);
  const total = priced.total;
  const discount = priced.discount;
  const freeShippingGap =
    freeShippingThreshold > 0 ? Math.max(0, freeShippingThreshold - subtotal) : 0;
  const freeShippingProgress =
    freeShippingThreshold > 0 ? Math.min(100, (subtotal / freeShippingThreshold) * 100) : 100;

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
      orderNotes: "",
    },
  });

  if (items.length === 0) return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col text-[#213B14]">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-16">
        <div className="text-center bg-white rounded-3xl p-12 border border-[#213B14]/10 shadow-sm max-w-md w-full">
          <div className="w-20 h-20 bg-[#213B14]/5 rounded-full flex items-center justify-center mx-auto mb-5">
            <Package className="w-9 h-9 text-[#E4B34F]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-[#213B14]/60 mb-6 text-sm">Add some products before checking out.</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-[#213B14] hover:bg-[#3F622D] text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-102 shadow-lg">
            Browse Products
          </Link>
        </div>
      </main>
      <Footer />
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
        shippingCharges: finalShippingCharge,
        deliveryType: deliveryOption,
        orderNotes: formData.orderNotes ?? "",
        ...(appliedCoupon?.code ? { couponCode: appliedCoupon.code } : {}),
      };

      const orderRes = await createRazorpayOrder(orderPayload);
      if (!orderRes.success) { toast.error("Could not create order. Please try again."); setLoading(false); return; }

      const { orderId, amount, currency, dbOrderId, keyId } = orderRes.data;
      const options = {
        key: keyId, amount, currency,
        name: "The Dry Factory",
        description: `Order of ${items.length} item${items.length > 1 ? "s" : ""}`,
        image: "/logo.png",
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
        theme: { color: "#213B14" },
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
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col text-[#213B14] font-sans">
      <Header />
      
      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* ── HEADER TITLE AREA ── */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#3F622D]/10 flex items-center justify-center text-[#3F622D]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold text-[#1C2A18]">Secure Checkout</h1>
              </div>
              <p className="text-sm font-semibold text-[#213B14]/50 mt-1 ml-12">Almost there! Complete your order in a few easy steps.</p>
            </div>
            <Link to="/cart" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#213B14]/15 rounded-xl text-xs font-bold hover:bg-[#FAF7F2] transition-colors shadow-sm ml-12 sm:ml-0">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ── LEFT COLUMN: DELIVERY DETAILS & OPTION ── */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-white rounded-3xl border border-[#213B14]/10 p-6 sm:p-8 shadow-sm">
                <ProgressBar step={0} />

                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#213B14]/10">
                  <div className="w-9 h-9 bg-[#213B14]/5 rounded-xl flex items-center justify-center text-[#213B14]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-[#1C2A18]">Delivery Details</h2>
                    <p className="text-[10px] text-[#213B14]/40 font-bold uppercase tracking-wider">All fields are required *</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Full Name" icon={<User className="w-4 h-4" />} placeholder="Admin" error={errors.fullName?.message} required {...register("fullName")} />
                    <InputField label="Mobile Number" icon={<Phone className="w-4 h-4" />} placeholder="8375077360" maxLength={10} error={errors.phone?.message} required {...register("phone")} />
                  </div>
                  <InputField label="Street Address" icon={<Home className="w-4 h-4" />} placeholder="N-3/24 First Floor DK Road Mohan Garden" error={errors.addressLine1?.message} required {...register("addressLine1")} />
                  <InputField label="Landmark / Apartment / Building (Optional)" icon={<Building2 className="w-4 h-4" />} placeholder="Near temple, Floor 2, Flat 4" {...register("addressLine2")} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="City" icon={<MapPin className="w-4 h-4" />} placeholder="Sargasan" error={errors.city?.message} required {...register("city")} />
                    <InputField label="Pincode" icon={<Hash className="w-4 h-4" />} placeholder="382421" maxLength={6} error={errors.pincode?.message} required {...register("pincode")} />
                  </div>
                  
                  {/* State Selection */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-[#213B14]/60 flex items-center gap-1">State <span className="text-[#E4B34F]">*</span></label>
                    <div className="relative">
                      <select 
                        {...register("state")} 
                        className={`w-full px-4 py-3 bg-[#FAF7F2] border rounded-xl text-[#213B14] text-xs font-semibold transition-all outline-none focus:bg-white focus:border-[#213B14] focus:ring-2 focus:ring-[#213B14]/5 ${
                          errors.state ? "border-red-500/60" : "border-[#213B14]/15"
                        }`}
                      >
                        <option value="">Select state</option>
                        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    {errors.state && <p className="text-[10px] text-red-500 font-bold">{errors.state.message}</p>}
                  </div>

                  {/* Horizontal mini trust strip */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#213B14]/10">
                    {[
                      { icon: <ShieldCheck className="w-3.5 h-3.5 text-[#3F622D]" />, label: "SSL Encrypted" },
                      { icon: <Truck className="w-3.5 h-3.5 text-[#3F622D]" />, label: "Delivery in 2 - 3 Days" },
                      { icon: <RotateCcw className="w-3.5 h-3.5 text-[#3F622D]" />, label: "Easy Returns" },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#213B14]/60 bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#213B14]/10">
                        {icon} {label}
                      </div>
                    ))}
                  </div>

                  {/* Choose Delivery Option */}
                  <div className="pt-4 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#1C2A18]">Choose Delivery Option</h3>
                    
                    {/* Standard Delivery Box */}
                    <label 
                      onClick={() => setDeliveryOption("standard")}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        deliveryOption === "standard" 
                          ? "bg-[#3F622D]/5 border-[#3F622D]" 
                          : "bg-white border-[#213B14]/10 hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input 
                          type="radio" 
                          name="delivery_type" 
                          checked={deliveryOption === "standard"} 
                          onChange={() => {}}
                          className="mt-1 accent-[#3F622D]" 
                        />
                        <div>
                          <p className="text-xs font-black text-[#1C2A18]">Standard Delivery (2 - 3 Days)</p>
                          <p className="text-[10px] text-[#213B14]/60 font-semibold mt-0.5">Safe & reliable delivery to your doorstep.</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-[#213B14]">
                        {baseShipping === 0 ? <span className="text-green-600 font-bold uppercase mr-1">FREE</span> : `₹${baseShipping}`}
                      </span>
                    </label>

                    {/* Express Delivery Box */}
                    <label 
                      onClick={() => setDeliveryOption("express")}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        deliveryOption === "express" 
                          ? "bg-[#3F622D]/5 border-[#3F622D]" 
                          : "bg-white border-[#213B14]/10 hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input 
                          type="radio" 
                          name="delivery_type" 
                          checked={deliveryOption === "express"} 
                          onChange={() => {}}
                          className="mt-1 accent-[#3F622D]" 
                        />
                        <div>
                          <p className="text-xs font-black text-[#1C2A18]">Express Delivery (Next Day)</p>
                          <p className="text-[10px] text-[#213B14]/60 font-semibold mt-0.5">Faster delivery for urgent orders.</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-[#213B14]">₹99</span>
                    </label>
                  </div>

                  {/* Free Delivery Promo Box */}
                  {freeShippingGap === 0 && (
                    <div className="p-4 bg-green-500/[0.04] rounded-2xl border border-green-500/10 flex items-center gap-2.5">
                      <span className="text-green-600 shrink-0 font-bold text-base">🎉</span>
                      <div>
                        <p className="text-xs font-black text-green-700">Yay! You're getting FREE DELIVERY 🥳</p>
                        <p className="text-[10px] text-green-600 font-semibold">Your order is eligible for free shipping.</p>
                      </div>
                    </div>
                  )}

                  {/* Order Notes Field */}
                  <div className="space-y-1.5 text-left pt-2">
                    <label className="text-xs font-bold text-[#213B14]/60 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" /> Order Notes (Optional)
                    </label>
                    <textarea 
                      placeholder="Add any special instructions for delivery..." 
                      rows={3} 
                      {...register("orderNotes")}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl text-[#213B14] text-xs font-semibold placeholder:text-[#213B14]/30 outline-none focus:bg-white focus:border-[#213B14] transition-all resize-none"
                    />
                  </div>

                  {/* Submit checkout triggers from summary block, but hidden or duplicate on form if mobile */}
                  <button type="submit" id="checkout-form-submit" className="hidden" />

                </form>
              </div>

              {/* Why Shop With The Dry Factory? */}
              <div className="bg-white rounded-3xl border border-[#213B14]/10 p-6 sm:p-8 shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-wider text-[#1C2A18] mb-6 text-left">Why Shop With The Dry Factory?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
                  <div className="space-y-1.5">
                    <Leaf className="w-6 h-6 text-[#3F622D]" />
                    <p className="text-xs font-black text-[#1C2A18]">100% Real Fruits</p>
                    <p className="text-[10px] text-[#213B14]/50 font-semibold leading-relaxed">Nothing Artificial</p>
                  </div>
                  <div className="space-y-1.5">
                    <Shield className="w-6 h-6 text-[#3F622D]" />
                    <p className="text-xs font-black text-[#1C2A18]">No Preservatives</p>
                    <p className="text-[10px] text-[#213B14]/50 font-semibold leading-relaxed">No Additives</p>
                  </div>
                  <div className="space-y-1.5">
                    <Sparkles className="w-6 h-6 text-[#3F622D]" />
                    <p className="text-xs font-black text-[#1C2A18]">Premium Quality</p>
                    <p className="text-[10px] text-[#213B14]/50 font-semibold leading-relaxed">Lab tested & safe</p>
                  </div>
                  <div className="space-y-1.5">
                    <RotateCcw className="w-6 h-6 text-[#3F622D]" />
                    <p className="text-xs font-black text-[#1C2A18]">7 Day Returns</p>
                    <p className="text-[10px] text-[#213B14]/50 font-semibold leading-relaxed">No questions asked</p>
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN: ORDER SUMMARY & PAYMENT TRIGGER ── */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
              
              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl border border-[#213B14]/10 p-6 shadow-sm text-left">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-extrabold text-[#1C2A18]">Order Summary</h2>
                  <span className="text-[10px] font-black px-2.5 py-1 bg-[#213B14]/5 text-[#213B14] rounded-full border border-[#213B14]/10 uppercase tracking-wide">
                    {totalItems} Item{totalItems > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Items Mini-list */}
                <div className="space-y-4 mb-5 max-h-[220px] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-[#FAF7F2] rounded-xl flex-shrink-0 overflow-hidden border border-[#213B14]/10">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-5 h-5 text-[#E4B34F] m-auto" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] font-black text-[#E4B34F] uppercase tracking-wider">{item.category}</p>
                        <p className="text-xs font-extrabold text-[#1C2A18] truncate leading-tight">{item.name}</p>
                        <p className="text-[10px] text-[#213B14]/50 font-semibold">{item.weight} · Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-black text-[#213B14] flex-shrink-0">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-[#213B14]/10 my-4" />

                {/* Pricing Breakdowns */}
                <div className="space-y-3 mb-5 text-xs font-semibold">
                  <div className="flex justify-between text-[#213B14]/75">
                    <span>Subtotal ({totalItems} Items)</span>
                    <span className="text-[#1C2A18] font-black">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#213B14]/75">
                    <span>Delivery Charges</span>
                    <span className={finalShippingCharge === 0 ? "text-green-600 font-black" : "text-[#1C2A18] font-black"}>
                      {finalShippingCharge === 0 ? "FREE" : `₹${finalShippingCharge}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount{appliedCoupon ? ` (${appliedCoupon.code})` : ""}</span>
                      <span className="font-black">−₹{discount}</span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-[#213B14]/10 my-4" />

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-extrabold text-[#1C2A18]">Total Amount</span>
                  <span className="text-2xl font-black text-[#1C2A18]">₹{total}</span>
                </div>

                {/* Saving Callout */}
                {discount > 0 && (
                  <div className="p-3 bg-[#3F622D]/5 rounded-xl border border-[#3F622D]/10 text-[10px] text-[#3F622D] font-bold mb-5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-[#E4B34F]" />
                    <span>You're Saving ₹{discount} with Combo Offer! Great choice for a healthier you.</span>
                  </div>
                )}

                {/* Free Shipping Progress bar */}
                {freeShippingGap > 0 && (
                  <div className="mb-6 p-3 bg-[#FAF7F2] rounded-xl border border-[#213B14]/10">
                    <p className="text-[10px] text-[#213B14] font-bold mb-1.5">
                      Add <span className="text-[#E4B34F]">₹{freeShippingGap}</span> more for <span className="font-bold">FREE DELIVERY!</span>
                    </p>
                    <div className="h-1.5 bg-[#213B14]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3F622D] rounded-full transition-all duration-700" style={{ width: `${freeShippingProgress}%` }} />
                    </div>
                    <div className="flex justify-between mt-1 text-[8px] font-black text-[#213B14]/40">
                      <span>₹{subtotal}</span>
                      <span>₹{freeShippingThreshold}</span>
                    </div>
                  </div>
                )}

                {/* Payment trust checklists */}
                <div className="space-y-3 mb-6">
                  <div className="flex gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#3F622D] shrink-0" />
                    <div>
                      <p className="text-[11px] font-black text-[#1C2A18]">Secure Checkout</p>
                      <p className="text-[9px] text-[#213B14]/50 font-semibold">100% Safe Payments</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Truck className="w-4 h-4 text-[#3F622D] shrink-0" />
                    <div>
                      <p className="text-[11px] font-black text-[#1C2A18]">Multiple Payment Options</p>
                      <p className="text-[9px] text-[#213B14]/50 font-semibold">UPI, Cards, Netbanking & more</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Heart className="w-4 h-4 text-[#3F622D] shrink-0" />
                    <div>
                      <p className="text-[11px] font-black text-[#1C2A18]">7-Day Happiness Guarantee</p>
                      <p className="text-[9px] text-[#213B14]/50 font-semibold">Not happy? We'll make it right.</p>
                    </div>
                  </div>
                </div>

                {/* Submit Checkout Button */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    const btn = document.getElementById("checkout-form-submit");
                    if (btn) btn.click();
                  }}
                  className="w-full bg-[#213B14] hover:bg-[#3F622D] text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md uppercase tracking-wider disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : (
                    <><Lock className="w-4 h-4" /> Proceed to Payment →</>
                  )}
                </button>
                
                <p className="text-center text-[10px] text-[#213B14]/40 mt-3 font-semibold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> 100% Secure Payments
                </p>

                {/* Logos bar */}
                <div className="mt-4 flex items-center justify-center gap-2 opacity-65 flex-wrap">
                  {/* Visa */}
                  <span className="px-2 py-1 bg-[#FAF7F2] rounded text-[8px] font-black tracking-widest text-blue-900 border border-gray-200">VISA</span>
                  {/* Mastercard */}
                  <span className="px-2 py-1 bg-[#FAF7F2] rounded text-[8px] font-black tracking-widest text-red-600 border border-gray-200">MC</span>
                  {/* RuPay */}
                  <span className="px-2 py-1 bg-[#FAF7F2] rounded text-[8px] font-black tracking-widest text-blue-600 border border-gray-200">RUPAY</span>
                  {/* UPI */}
                  <span className="px-2 py-1 bg-[#FAF7F2] rounded text-[8px] font-black tracking-widest text-green-700 border border-gray-200">UPI</span>
                  {/* Paytm */}
                  <span className="px-2 py-1 bg-[#FAF7F2] rounded text-[8px] font-black tracking-widest text-blue-500 border border-gray-200">PAYTM</span>
                  {/* GPay */}
                  <span className="px-2 py-1 bg-[#FAF7F2] rounded text-[8px] font-black tracking-widest text-[#213B14] border border-gray-200">GPAY</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Join the family Newsletter banner */}
      <div className="bg-[#213B14] text-white py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-[#B5C99A]" />
            <div>
              <p className="text-sm font-black tracking-wider uppercase">Join The Dry Factory Family!</p>
              <p className="text-xs text-white/60">Get exclusive offers, new launches & healthy tips straight to your inbox.</p>
            </div>
          </div>
          <div className="flex w-full md:w-auto max-w-sm gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded-xl text-xs bg-white/10 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:border-white" 
            />
            <button className="bg-[#E4B34F] hover:bg-[#D4A13F] text-[#213B14] px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
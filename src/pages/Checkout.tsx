import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  MapPin,
  Phone,
  User,
  Home,
  Building2,
  Hash,
  ArrowRight,
  Package,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// ── Import only FUNCTIONS from payment.ts NOT types ────────────────────────
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  loadRazorpayScript,
} from "../api/payment";

// ─── Validation ───────────────────────────────────────────────────────────────

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

// ─── Indian States ────────────────────────────────────────────────────────────

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
  "Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

// ─── Input Component ──────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  error?: string;
  required?: boolean;
  [key: string]: any;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, error, required, ...props }, ref) => (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-white/70 flex items-center gap-1">
        {label}
        {required && <span className="text-[#D4AF37]">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
          {icon}
        </span>
        <input
          ref={ref}
          {...props}
          className={`w-full pl-11 pr-4 py-3 bg-black border rounded-xl text-white text-sm
      placeholder:text-white/20 transition-all outline-none
      focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10
      ${error ? "border-red-500/60" : "border-white/10"}`}
        />
      </div>
      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
    </div>
  )
);
InputField.displayName = "InputField";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
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

  // ── Empty cart guard ──────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col text-white">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 pt-24">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-5">
              <Package className="w-9 h-9 text-[#D4AF37]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-white/50 mb-6">Add some products before checking out.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold hover:bg-[#b5952f] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Payment handler ───────────────────────────────────────────────────────
  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      // 1. Load Razorpay SDK
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        toast.error("Failed to load payment gateway. Check your internet connection.");
        setLoading(false);
        return;
      }

      // 2. Build payload all typed inline, no imports needed
      const orderPayload = {
        items: items.map((item) => ({
          id: item.id,
          productId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          weight: item.weight ?? "",
          category: item.category ?? "",
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2 ?? "",
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        subtotal,
        shipping,
        total,
      };

      // 3. Create order on backend
      const orderRes = await createRazorpayOrder(orderPayload);

      if (!orderRes.success) {
        toast.error("Could not create order. Please try again.");
        setLoading(false);
        return;
      }

      const { orderId, amount, currency, dbOrderId, keyId } = orderRes.data;

      // 4. Open Razorpay modal
      const options = {
        key: keyId,
        amount,
        currency,
        name: "The Dry Factory",
        description: `Order of ${items.length} item${items.length > 1 ? "s" : ""}`,
        image: "https://res.cloudinary.com/doi7id29n/image/upload/b_black,q_auto,f_png/v1776528652/logo_2_on76wp.png",
        order_id: orderId,

        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            // 5. Verify on backend
            const verifyRes = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              dbOrderId,
            });

            if (verifyRes.success) {
              clearCart();
              navigate("/order-success", {
                state: {
                  orderId: verifyRes.data.orderId,
                  paymentId: verifyRes.data.razorpayPaymentId,
                  amount: verifyRes.data.amount,
                  customerName: formData.fullName,
                },
              });
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch {
            toast.error("Verification error. Please contact support with your payment ID.");
          }
        },

        prefill: {
          name: formData.fullName,
          email: user?.email ?? "",
          contact: formData.phone,
        },

        theme: { color: "#D4AF37" },

        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled.");
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        toast.error(`Payment failed: ${response.error?.description ?? "Unknown error"}`);
        setLoading(false);
      });
      rzp.open();

    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? err.message ?? "Something went wrong.");
      setLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-white">
      <Header />

      <main className="flex-1 pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <div className="mt-6 mb-8">
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] font-medium text-sm transition-colors mb-5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Checkout
            </h1>
            <p className="text-white/50 mt-1 text-sm">
              Fill in your delivery details to complete your order
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

            {/* ── LEFT: Address Form ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1a1a] rounded-3xl border border-white/10 p-6 md:p-10"
            >
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                <div className="w-9 h-9 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg">Delivery Address</h2>
                  <p className="text-xs text-white/40">
                    {user
                      ? `Logged in as ${user.name}`
                      : "No account needed guest checkout supported"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Full Name"
                    icon={<User className="w-4 h-4" />}
                    placeholder="Mayank Pandey"
                    error={errors.fullName?.message}
                    required
                    {...register("fullName")}
                  />
                  <InputField
                    label="Mobile Number"
                    icon={<Phone className="w-4 h-4" />}
                    placeholder="9876543210"
                    maxLength={10}
                    error={errors.phone?.message}
                    required
                    {...register("phone")}
                  />
                </div>

                <InputField
                  label="Street Address"
                  icon={<Home className="w-4 h-4" />}
                  placeholder="House No, Street, Area"
                  error={errors.addressLine1?.message}
                  required
                  {...register("addressLine1")}
                />

                <InputField
                  label="Landmark / Apartment (Optional)"
                  icon={<Building2 className="w-4 h-4" />}
                  placeholder="Near temple, Floor 2..."
                  {...register("addressLine2")}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="City"
                    icon={<MapPin className="w-4 h-4" />}
                    placeholder="New Delhi"
                    error={errors.city?.message}
                    required
                    {...register("city")}
                  />
                  <InputField
                    label="Pincode"
                    icon={<Hash className="w-4 h-4" />}
                    placeholder="110001"
                    maxLength={6}
                    error={errors.pincode?.message}
                    required
                    {...register("pincode")}
                  />
                </div>

                {/* State dropdown */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-white/70 flex items-center gap-1">
                    State <span className="text-[#D4AF37]">*</span>
                  </label>
                  <select
                    {...register("state")}
                    className={`w-full px-4 py-3 bg-black border rounded-xl text-white text-sm
           transition-all outline-none focus:border-[#D4AF37]
           focus:ring-2 focus:ring-[#D4AF37]/10
           ${errors.state ? "border-red-500/60" : "border-white/10"}`}
                  >
                    <option value="" className="bg-black">Select state</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s} className="bg-[#1a1a1a]">{s}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-xs text-red-400 font-medium">{errors.state.message}</p>
                  )}
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { icon: <ShieldCheck className="w-3.5 h-3.5 text-green-400" />, label: "SSL Encrypted" },
                    { icon: <Truck className="w-3.5 h-3.5 text-blue-400" />, label: "3–5 Day Delivery" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      {icon} {label}
                    </div>
                  ))}
                </div>

                {/* Pay button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold text-lg
          flex items-center justify-center gap-3
          hover:bg-[#b5952f] disabled:opacity-50 disabled:cursor-not-allowed
          transition-all shadow-lg shadow-[#D4AF37]/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Preparing payment...
                    </>
                  ) : (
                    <>
                      Pay ₹{total}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

              </form>
            </motion.div>

            {/* ── RIGHT: Order Summary ────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1a1a1a] rounded-3xl border border-white/10 p-8 sticky top-28"
            >
              <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-[#2a2a2a] rounded-xl flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                      <p className="text-xs text-white/40">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[#D4AF37] flex-shrink-0">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 my-5" />

              {/* Pricing */}
              <div className="space-y-3 text-[15px]">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Delivery</span>
                  <span className={shipping === 0 ? "text-green-400 font-medium" : "text-white font-medium"}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-white/30 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    Free delivery on orders above <span className="text-[#D4AF37] font-bold">₹500</span>
                  </p>
                )}
                <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                  <span className="text-lg font-medium text-white/80">Total</span>
                  <span className="text-3xl font-bold text-[#D4AF37]">₹{total}</span>
                </div>
              </div>

              {/* Security note */}
              <div className="mt-6 flex items-center gap-2.5 text-xs text-white/40 bg-white/5 rounded-xl p-3 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                Secured by Razorpay. We never store your card details.
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
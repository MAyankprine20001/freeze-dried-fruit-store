import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight, Home, Copy } from "lucide-react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface SuccessState {
  orderId: string;
  paymentId: string;
  amount: number;
  customerName: string;
}

export default function OrderSuccess() {
  const location = useLocation();
  const state = location.state as SuccessState | null;

  if (!state?.orderId) return <Navigate to="/" replace />;

  const { orderId, paymentId, amount, customerName } = state;
  const firstName = customerName.split(" ")[0];

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-white">
      <Header />

      <main className="flex-1 pt-24 pb-20 px-4 md:px-6 flex items-center justify-center">
        <div className="max-w-lg w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl p-8 md:p-10 text-center"
          >
            {/* Tick icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                Order Placed! 🎉
              </h1>
              <p className="text-white/50 mb-7 leading-relaxed">
                Thank you,{" "}
                <span className="font-bold text-white">{firstName}</span>!
                Your order is confirmed and will be delivered in 3–5 business days.
              </p>

              {/* Order detail card */}
              <div className="bg-black rounded-2xl border border-white/10 p-5 text-left space-y-4 mb-6">
                {/* Amount */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50">Amount Paid</span>
                  <span className="font-bold text-[#D4AF37] text-xl">₹{amount}</span>
                </div>

                {/* Order ID */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-white/40 mb-1.5">Order ID</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-mono font-semibold text-white truncate">
                      {orderId}
                    </p>
                    <button
                      onClick={() => copy(orderId, "Order ID")}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5 text-white/40 hover:text-white" />
                    </button>
                  </div>
                </div>

                {/* Payment ID */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-white/40 mb-1.5">Payment ID</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-mono font-semibold text-white truncate">
                      {paymentId}
                    </p>
                    <button
                      onClick={() => copy(paymentId, "Payment ID")}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5 text-white/40 hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info note */}
              <div className="flex items-start gap-3 bg-[#D4AF37]/10 rounded-2xl p-4 text-left mb-7 border border-[#D4AF37]/20">
                <Package className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/60">
                  Save your{" "}
                  <span className="font-semibold text-white">Order ID</span>{" "}
                  for tracking. A confirmation email will be sent to you shortly.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/products"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF37] text-black py-3.5 rounded-xl font-bold hover:bg-[#b5952f] transition-colors"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-3.5 rounded-xl font-bold hover:bg-white/20 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
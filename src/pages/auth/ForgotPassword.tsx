import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { authApi } from "../../api/auth.api";
import { useMutation } from "@tanstack/react-query";

export default function ForgotPassword() {
 const [email, setEmail] = useState("");
 const [sent, setSent] = useState(false);

 const forgotMutation = useMutation({
  mutationFn: (email: string) => authApi.forgotPassword(email),
  onSuccess: () => {
   setSent(true);
  },
 });

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  forgotMutation.mutate(email);
 };

 const loading = forgotMutation.isPending;
 const error = (forgotMutation.error as any)?.message || "";

 return (
  <div className="min-h-screen bg-black flex items-center justify-center p-6">
   <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-md w-full"
   >
    <div className="text-center mb-8">
     <Link to="/" className="inline-block mb-6">
      <img src="https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/logo_2_on76wp.png" alt="Logo" className="w-20 h-20 mx-auto object-contain" />
     </Link>
     <h1 className="text-3xl font-serif font-bold text-white mb-2">Reset Password</h1>
     <p className="text-white/50">
      {sent ? "Check your email for instructions" : "We'll send you a link to reset your password"}
     </p>
    </div>

    <div className="bg-black p-8 rounded-3xl shadow-xl border border-white/10">
     {sent ? (
      <div className="text-center space-y-6">
       <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10 text-green-500" />
       </div>
       <p className="text-white/70 leading-relaxed">
        We've sent a password reset link to <span className="font-bold text-white">{email}</span>. 
        Please check your inbox and follow the instructions.
       </p>
       <Link 
        to="/login"
        className="inline-flex items-center gap-2 text-[#D4AF37] font-bold hover:text-[#BF953F] transition-colors"
       >
        <ArrowLeft className="w-4 h-4" />
        Return to Login
       </Link>
      </div>
     ) : (
      <form onSubmit={handleSubmit} className="space-y-6">
       {error && (
        <motion.div 
         initial={{ opacity: 0, height: 0 }}
         animate={{ opacity: 1, height: "auto" }}
         className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm"
        >
         <AlertCircle className="w-5 h-5 flex-shrink-0" />
         {error}
        </motion.div>
       )}

       <div className="space-y-1.5">
        <label className="text-sm font-semibold text-white/70 ml-1">Email Address</label>
        <div className="relative">
         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
         <input 
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all placeholder:text-white/20 text-white"
          placeholder="name@example.com"
         />
        </div>
       </div>

       <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#BF953F] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
       >
        {loading ? (
         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
         <>
          Send Reset Link
          <ArrowRight className="w-5 h-5" />
         </>
        )}
       </button>

       <div className="text-center">
        <Link 
         to="/login"
         className="inline-flex items-center gap-2 text-sm font-bold text-white/40 hover:text-[#D4AF37] transition-colors"
        >
         <ArrowLeft className="w-4 h-4" />
         Back to Login
        </Link>
       </div>
      </form>
     )}
    </div>
   </motion.div>
  </div>
 );
}

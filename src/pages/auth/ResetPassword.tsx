import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { authApi } from "../../api/auth.api";
import { useMutation } from "@tanstack/react-query";

export default function ResetPassword() {
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);
 const [success, setSuccess] = useState(false);
 const [validationError, setValidationError] = useState("");
 
 const [searchParams] = useSearchParams();
 const token = searchParams.get("token");
 const navigate = useNavigate();

 const resetMutation = useMutation({
  mutationFn: (data: any) => authApi.resetPassword(data),
  onSuccess: () => {
   setSuccess(true);
   setTimeout(() => navigate("/login"), 3000);
  },
 });

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setValidationError("");

  if (password !== confirmPassword) {
   return setValidationError("Passwords do not match");
  }
  if (password.length < 8) {
   return setValidationError("Password must be at least 8 characters");
  }

  resetMutation.mutate({ token, password });
 };

 const loading = resetMutation.isPending;
 const error = validationError || (resetMutation.error as any)?.message || "";

 if (!token) {
  return (
   <div className="min-h-screen bg-black flex items-center justify-center p-6">
    <div className="bg-black p-8 rounded-3xl shadow-xl border border-white/10 text-center max-w-md w-full">
     <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
     <h2 className="text-xl font-bold text-white mb-2">Invalid Reset Link</h2>
     <p className="text-white/50 mb-6">This password reset link is invalid or has expired.</p>
     <Link to="/forgot-password" size="sm" className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold inline-block hover:bg-[#BF953F] transition-all">
      Request New Link
     </Link>
    </div>
   </div>
  );
 }

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
     <h1 className="text-3xl font-serif font-bold text-white mb-2">New Password</h1>
     <p className="text-white/50">Set a strong password to secure your account</p>
    </div>

    <div className="bg-black p-8 rounded-3xl shadow-xl border border-white/10">
     {success ? (
      <div className="text-center space-y-4">
       <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
       </div>
       <h2 className="text-xl font-bold text-white">Password Updated!</h2>
       <p className="text-white/50">Your password has been reset successfully. Redirecting you to login...</p>
      </div>
     ) : (
      <form onSubmit={handleSubmit} className="space-y-5">
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
        <label className="text-sm font-semibold text-white/70 ml-1">New Password</label>
        <div className="relative">
         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
         <input 
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all placeholder:text-white/20 text-white"
          placeholder="••••••••"
         />
         <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#D4AF37] transition-colors"
         >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
         </button>
        </div>
       </div>

       <div className="space-y-1.5">
        <label className="text-sm font-semibold text-white/70 ml-1">Confirm Password</label>
        <div className="relative">
         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
         <input 
          type={showPassword ? "text" : "password"}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all placeholder:text-white/20 text-white"
          placeholder="••••••••"
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
          Update Password
          <ArrowRight className="w-5 h-5" />
         </>
        )}
       </button>
      </form>
     )}
    </div>
   </motion.div>
  </div>
 );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

export default function Signup() {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);

 const { signup } = useAuth();
 const navigate = useNavigate();
 const location = useLocation();

 const signupMutation = useMutation({
  mutationFn: (data: any) => signup(data),
  onSuccess: (response: any) => {
   navigate("/login", { 
    state: { 
     message: response.message,
     from: location.state?.from 
    } 
   });
  },
 });

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  signupMutation.mutate({ fullName: name, email, password });
 };

 const loading = signupMutation.isPending;
 const error = (signupMutation.error as any)?.message || "";

 return (
  <div className="light-form min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
   <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="max-w-md w-full"
   >
    <div className="text-center mb-8">
     <Link to="/" className="inline-block mb-6">
      <span className="inline-flex items-center gap-3 text-left">
       <img src="/logo.png" alt="The Dry Factory logo" className="h-12 w-auto object-contain" />
       <span className="flex flex-col items-start">
        <span className="font-serif text-xl font-bold text-[#1C2A18] tracking-wider uppercase leading-tight">
         THE DRY <span className="font-serif italic font-normal text-[#3F622D]">FACTORY</span>
        </span>
        <span className="text-[8.5px] font-bold text-[#3F622D] uppercase tracking-[0.2em] leading-none">
         REAL TASTE. REAL NUTRITION.
        </span>
       </span>
      </span>
     </Link>
     <h1 className="text-3xl font-serif font-bold text-[#213B14] mb-2">Create Account</h1>
     <p className="text-[#213B14]/60">Join The Dry Factory family today</p>
    </div>

    <div className="bg-[#FAF7F2] p-8 rounded-3xl shadow-xl border border-[#213B14]/15">
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
       <label className="text-sm font-semibold text-[#213B14]/75 ml-1">Full Name</label>
       <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#213B14]/50" />
        <input
         type="text"
         required
         value={name}
         onChange={(e) => setName(e.target.value)}
         className="w-full pl-12 pr-4 py-3 bg-white border border-[#213B14]/15 rounded-2xl focus:ring-2 focus:ring-[#3F622D]/20 focus:border-[#3F622D] outline-none transition-all placeholder:text-[#213B14]/35 text-[#213B14]"
         placeholder="John Doe"
        />
       </div>
      </div>

      <div className="space-y-1.5">
       <label className="text-sm font-semibold text-[#213B14]/75 ml-1">Email Address</label>
       <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#213B14]/50" />
        <input
         type="email"
         required
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         className="w-full pl-12 pr-4 py-3 bg-white border border-[#213B14]/15 rounded-2xl focus:ring-2 focus:ring-[#3F622D]/20 focus:border-[#3F622D] outline-none transition-all placeholder:text-[#213B14]/35 text-[#213B14]"
         placeholder="name@example.com"
        />
       </div>
      </div>

      <div className="space-y-1.5">
       <label className="text-sm font-semibold text-[#213B14]/75 ml-1">Password</label>
       <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#213B14]/50" />
        <input
         type={showPassword ? "text" : "password"}
         required
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         className="w-full pl-12 pr-12 py-3 bg-white border border-[#213B14]/15 rounded-2xl focus:ring-2 focus:ring-[#3F622D]/20 focus:border-[#3F622D] outline-none transition-all placeholder:text-[#213B14]/35 text-[#213B14]"
         placeholder="••••••••"
        />
        <button
         type="button"
         onClick={() => setShowPassword(!showPassword)}
         className="absolute right-4 top-1/2 -translate-y-1/2 text-[#213B14]/50 hover:text-[#213B14] transition-colors"
        >
         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
       </div>
       <div className="flex items-center gap-2 mt-2 ml-1">
        <CheckCircle2 className={`w-4 h-4 ${password.length >= 8 ? "text-green-700" : "text-[#213B14]/35"}`} />
        <span className={`text-xs ${password.length >= 8 ? "text-green-700 font-medium" : "text-[#213B14]/50"}`}>
         At least 8 characters
        </span>
       </div>
      </div>

      <div className="pt-2">
       <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#213B14] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#3F622D] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
       >
        {loading ? (
         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
         <>
          Create Account
          <ArrowRight className="w-5 h-5" />
         </>
        )}
       </button>
      </div>
     </form>

     <div className="mt-8 pt-8 border-t border-[#213B14]/15 text-center">
      <p className="text-[#213B14]/60 text-sm font-medium">
       Already have an account?{" "}
       <Link to="/login" state={{ from: location.state?.from }} className="text-[#3F622D] font-bold hover:text-[#213B14] transition-colors ml-1">
        Sign in
       </Link>
      </p>
     </div>
    </div>
   </motion.div>
  </div>
 );
}

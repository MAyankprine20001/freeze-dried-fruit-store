import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../../api/auth.api";

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    
    const { data, isLoading, isError, error: queryError } = useQuery({
        queryKey: ["verify-email", token],
        queryFn: () => authApi.verifyEmail(token!),
        enabled: !!token,
        retry: false,
        staleTime: 0,
    });

    const status = isLoading ? "loading" : (isError || !data?.success) ? "error" : "success";
    const message = isLoading 
        ? "Verifying your email address..." 
        : (isError || !data?.success)
            ? (data?.message || (queryError as any)?.response?.data?.message || "Verification failed. The link may be expired or invalid.")
            : (data?.message || "Your email has been successfully verified!");


    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-black rounded-3xl shadow-2xl border border-white/10 p-8 md:p-12 text-center relative overflow-hidden"
            >
                {/* Decorative background element */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl opacity-60" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl opacity-40" />

                <div className="relative z-10">
                    <AnimatePresence mode="wait">
                        {status === "loading" && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
                                    <Loader2 className="w-10 h-10 text-[#D4AF37] animate-spin" />
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-3">Verifying Email</h1>
                                <p className="text-white/50">{message}</p>
                            </motion.div>
                        )}

                        {status === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8">
                                    <CheckCircle className="w-10 h-10 text-green-500" />
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-3">Verified!</h1>
                                <p className="text-white/50 mb-8">{message}</p>
                                
                                <Link 
                                    to="/login"
                                    className="w-full bg-[#D4AF37] text-black py-4 px-6 rounded-2xl font-semibold shadow-lg hover:bg-[#BF953F] transition-all flex items-center justify-center gap-2 group"
                                >
                                    Proceed to Login
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        )}

                        {status === "error" && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mb-8">
                                    <XCircle className="w-10 h-10 text-red-500" />
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-3">Verification Failed</h1>
                                <p className="text-white/50 mb-8">{message}</p>
                                
                                <div className="flex flex-col w-full gap-3">
                                    <button 
                                        onClick={() => window.location.reload()}
                                        className="w-full bg-white text-black py-4 px-6 rounded-2xl font-semibold hover:bg-white/90 transition-all"
                                    >
                                        Try Again
                                    </button>
                                    <Link 
                                        to="/signup"
                                        className="text-[#D4AF37] font-semibold hover:underline"
                                    >
                                        Back to Signup
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyEmail;

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Mail, Clock, MessageSquare } from "lucide-react";
import emailjs from "@emailjs/browser";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

// ─── EmailJS config ────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Please enter a subject"),
  message: z.string().min(20, "Please write at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const templateParams = {
        from_name: data.name,
        from_name_initial: data.name.charAt(0).toUpperCase(),
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        reply_to: data.email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      toast.success(
        `Thanks, ${data.name}! We'll be in touch within 1–2 business days.`,
      );
      reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error(
        "Oops — something went wrong. Please try again or email us directly.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <PageHero
        tag="Get in Touch"
        title="We'd Love to"
        highlight="Hear from You"
        description="Whether you're curious about our products, interested in bulk orders, or just want to say hello — we're a real team of real people and we read every message."
      />

      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* ── Info ─────────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="font-serif text-2xl font-bold text-white mb-4">
                  Let's Start a Conversation
                </h2>
                <p className="text-white/70 text-base leading-relaxed">
                  We're a small, passionate team and we genuinely love hearing
                  from our customers. Whether you have a question about a
                  product, need help with an order, or want to explore a
                  wholesale partnership — fill in the form and we'll get back to
                  you promptly.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      Email Us
                    </p>
                    <p className="text-white/60 text-sm">
                      hello@thedryfactory.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      Response Time
                    </p>
                    <p className="text-white/60 text-sm">
                      We aim to respond within 1–2 business days. For urgent
                      matters, please mention it in your message.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                    <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      Bulk &amp; Wholesale
                    </p>
                    <p className="text-white/60 text-sm">
                      Interested in large orders or retail partnerships? Mention
                      it in your message and we'll connect you with our
                      wholesale team.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Form ─────────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      Your Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      {...register("name")}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition-all duration-200"
                      placeholder="Elena Rossi"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition-all duration-200"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Subject <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register("subject")}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition-all duration-200"
                    placeholder="Bulk order enquiry / Product question / ..."
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Message <span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register("message")}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help..."
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#D4AF37] text-black font-semibold rounded-full hover:bg-[#BF953F] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 shadow-sm"
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

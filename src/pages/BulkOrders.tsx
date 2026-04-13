import React from "react";
import { motion } from "framer-motion";
import { Package, Truck, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Package,
    title: "Volume Pricing",
    description: "Enjoy significant discounts on orders over 5kg. We offer tiered pricing to fit your scale."
  },
  {
    icon: Truck,
    title: "Reliable Logistics",
    description: "Priority handling and shipping for bulk orders to ensure your supply chain remains uninterrupted."
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Every batch is tested for purity and nutrient retention. COA available upon request."
  },
  {
    icon: Mail,
    title: "Dedicated Support",
    description: "A personal account manager to handle your orders, custom quotes, and logistics."
  }
];

export default function BulkOrders() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        tag="Wholesale & Bulk"
        title="Scale Your Business"
        highlight="With The Dry Factory"
        description="Whether you're a bakery, smoothie bar, or retailer, we provide premium freeze-dried products in bulk quantities with uncompromising quality and reliable supply."
        image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=600&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 bg-[#fdf3ec] rounded-2xl border border-[#f0d9c8] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#e85d26] rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">{benefit.title}</h3>
                <p className="text-[#6a5a4a] text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 bg-[#1a1a1a] rounded-3xl p-12 lg:p-20 relative overflow-hidden text-center"
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to place a <span className="text-[#f4a435]">Bulk Order?</span>
              </h2>
              <p className="text-white/70 text-lg mb-10">
                Contact our wholesale team today for a custom quote and to discuss your specific requirements.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e85d26] text-white font-semibold rounded-full hover:bg-[#d44f1a] hover:scale-105 transition-all duration-200"
              >
                Inquire Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e85d26]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f4a435]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

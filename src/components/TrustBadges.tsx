import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Ban, Sparkles, Leaf, Lock, Truck } from "lucide-react";

const coreBadges = [
  {
    icon: ShieldCheck,
    label: "No Preservatives",
    desc: "Pure fruit, nothing added",
  },
  { icon: Ban, label: "No Added Sugar", desc: "Naturally sweet" },
  { icon: Sparkles, label: "Clean Indulgence", desc: "Guilt-free snacking" },
  { icon: Leaf, label: "100% Natural", desc: "From farm to freeze-dryer" },
];

const extraBadges = [
  { icon: Lock, label: "Secure Checkout", desc: "100% secure payments" },
  { icon: Truck, label: "Pan India Delivery", desc: "Fast & reliable" },
];

interface TrustBadgesProps {
  isHome?: boolean;
}

export default function TrustBadges({ isHome = false }: TrustBadgesProps) {
  // On home: only 4 core badges. On other pages: all 6.
  const badges = isHome ? coreBadges : [...coreBadges, ...extraBadges];
  const gridCols = isHome
    ? "grid-cols-2 md:grid-cols-4"
    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6";

  return (
    <section className="py-12 bg-black border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid ${gridCols} gap-6`}>
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shadow-sm border border-white/10">
                <badge.icon className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <p className="font-semibold text-white text-sm">{badge.label}</p>
              <p className="text-white/50 text-xs">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

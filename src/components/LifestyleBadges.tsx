import React from "react";
import { motion } from "framer-motion";
import { Plane, Briefcase, Bed, Baby, Timer, CupSoda, Luggage, Coffee, BookOpen } from "lucide-react";

const badges = [
  {
    icon: (
      <div className="relative flex items-center justify-center w-full h-full text-[#D4AF37]">
        <Luggage className="w-7 h-7" strokeWidth={1.5} />
        <Plane className="w-4 h-4 absolute top-1 right-1" strokeWidth={1.5} />
      </div>
    ),
    title: "TRAVEL\nREADY",
    subtitle: "Anytime,\nanywhere!",
  },
  {
    icon: (
      <div className="relative flex items-center justify-center w-full h-full text-[#D4AF37]">
        <Briefcase className="w-7 h-7" strokeWidth={1.5} />
        <Coffee className="w-4 h-4 absolute bottom-2 -left-1" strokeWidth={1.5} />
      </div>
    ),
    title: "OFFICE\nBREAKS",
    subtitle: "Your healthy\nwork buddy",
  },
  {
    icon: (
      <div className="relative flex items-center justify-center w-full h-full text-[#D4AF37]">
        <Bed className="w-7 h-7" strokeWidth={1.5} />
        <BookOpen className="w-4 h-4 absolute -top-1 left-2" strokeWidth={1.5} />
      </div>
    ),
    title: "HOSTEL\nLIFE",
    subtitle: "Quick nutrition\nfor busy days",
  },
  {
    icon: (
      <div className="relative flex items-center justify-center w-full h-full text-[#D4AF37]">
        <Baby className="w-8 h-8" strokeWidth={1.5} />
      </div>
    ),
    title: "KIDS'\nFAVORITE",
    subtitle: "Tasty & fun\nfruit goodness",
  },
  {
    icon: (
      <div className="relative flex items-center justify-center w-full h-full text-[#D4AF37]">
        <Timer className="w-8 h-8" strokeWidth={1.5} />
      </div>
    ),
    title: "INSTANT\nCRAVINGS",
    subtitle: "Ready in just\nseconds",
  },
  {
    icon: (
      <div className="relative flex items-center justify-center w-full h-full text-[#D4AF37]">
        <CupSoda className="w-8 h-8" strokeWidth={1.5} />
      </div>
    ),
    title: "FRUITY\nGOODNESS",
    subtitle: "Real fruit.\nReal flavor.",
  },
];

export default function LifestyleBadges() {
  return (
    <div className="py-16 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-12">
          {badges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative flex flex-col items-center pt-8"
            >
              {/* Icon Circle */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#0d0d0d] border border-[#D4AF37] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                {/* Inner faint circle */}
                <div className="absolute inset-1 rounded-full border border-[#D4AF37]/30" />
                {badge.icon}
              </div>

              {/* Card Body */}
              <div className="w-full h-full pt-10 pb-6 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[20px] border border-[#D4AF37]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
                <h3 className="text-[#D4AF37] font-bold text-sm tracking-widest leading-tight whitespace-pre-line min-h-[2.5rem]">
                  {badge.title}
                </h3>
                
                <div className="w-4 h-[2px] bg-[#D4AF37]/50 my-3 rounded-full" />
                
                <p className="text-white/80 text-xs leading-snug whitespace-pre-line min-h-[2rem]">
                  {badge.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

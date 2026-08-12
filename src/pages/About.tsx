import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Leaf, Heart, Smile, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrustBadges from '../components/TrustBadges';

const differentiators = [
  {
    title: 'Real Ingredients, No Shortcuts',
    desc: 'What you see is what you get. No hidden additives, no artificial flavours.',
    icon: Leaf
  },
  {
    title: 'Freeze-Drying with Purpose',
    desc: 'Not just a process — a way to preserve real nutrition and real taste.',
    icon: Sparkles
  },
  {
    title: 'Built for Real Life',
    desc: 'Whether you’re at work, travelling, or at home - healthy should be easy.',
    icon: Smile
  },
  {
    title: 'Balanced, Not Extreme',
    desc: 'We don’t believe in perfection. Just better, cleaner everyday choices.',
    icon: Heart
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#213B14]">
      <Header />

      {/* ── 1. HERO BANNER SECTION ── */}
      <section className="relative min-h-[480px] flex items-center pt-40 pb-20 overflow-hidden w-full">
        {/* Background Image matching Homepage */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/Home_backgroun_Image.png" 
            alt="The Dry Factory Background" 
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-[#FAF7F2]/50 md:bg-transparent md:bg-gradient-to-r md:from-[#FAF7F2]/90 md:to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-4"
          >
            <span className="inline-block px-3 py-1.5 rounded-full border border-[#213B14]/20 bg-white text-[#213B14] text-[10px] font-black tracking-widest uppercase shadow-sm">
              Our Story
            </span>
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1C2A18] leading-[1.1]">
              Real Food,<br />
              <span className="text-[#3F622D]">Thoughtfully Preserved</span>
            </h1>
            <p className="text-sm sm:text-base text-[#213B14]/75 font-semibold leading-relaxed max-w-lg">
              We’re on a mission to bring you food that’s as real as it should be - clean, honest, and made to fit your everyday life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. ORIGIN STORY ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-md border border-[#213B14]/10">
              <img
                src="/AboutLeft_Side.png"
                alt="Fresh fruit packaging showcase"
                className="w-full h-[480px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#213B14] rounded-2xl p-6 shadow-md text-white border border-white/10 text-left">
              <p className="font-bold text-xl uppercase tracking-wider">The Dry Factory</p>
              <p className="text-white/70 text-xs font-semibold mt-1">Simple. Honest. Trustworthy.</p>
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-6"
          >
            <span className="inline-block px-3 py-1 bg-[#3F622D]/10 text-[#3F622D] text-xs font-bold uppercase tracking-wider rounded border border-[#3F622D]/20">
              Where It All Began
            </span>
            <h2 className="text-3xl font-extrabold text-[#1C2A18]">
              Our Story
            </h2>
            <div className="space-y-6 text-[#213B14]/80 text-sm sm:text-base font-medium leading-relaxed">
              <div className="bg-white p-5 rounded-2xl border border-[#213B14]/10 space-y-2 shadow-sm">
                <h3 className="text-base font-black uppercase tracking-wider text-[#3F622D]">Why We Started</h3>
                <p>
                  We noticed something strange. The more “convenient” food became, the less real it felt. Hidden sugars, artificial flavors, and long ingredient lists became the norm.
                </p>
                <p>
                  At the same time, perfectly good fruits were going to waste - just because they didn’t last long enough. That didn’t sit right with us.
                </p>
                <p>
                  So we asked a simple question: What if real food could stay real… longer? That question led to The Dry Factory.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#213B14]/10 space-y-2 shadow-sm">
                <h3 className="text-base font-black uppercase tracking-wider text-[#3F622D]">The Problem We’re Solving</h3>
                <p>
                  Fresh fruits are seasonal, fragile, and hard to store. Most processed alternatives? Loaded with things your body doesn’t need. We chose a different path.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#213B14]/10 space-y-2 shadow-sm">
                <h3 className="text-base font-black uppercase tracking-wider text-[#3F622D]">Our Solution</h3>
                <p>
                  Using freeze-drying, we remove moisture without heat - preserving the taste, nutrition, and texture of real fruit. No shortcuts. No additives. No compromises. Just real food, made smarter.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. MISSION SECTION ── */}
      <section className="py-24 bg-white border-y border-[#213B14]/5 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <span className="inline-block px-3 py-1 bg-[#213B14]/10 text-[#213B14] text-xs font-bold uppercase tracking-wider rounded border border-[#213B14]/20">
              Our Mission
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C2A18]">
              More Than Just a Food Brand
            </h2>
            
            <div className="text-[#213B14]/80 text-base sm:text-lg font-semibold max-w-2xl mx-auto space-y-2 leading-relaxed">
              <p>We’re not here to sell “healthy products.”</p>
              <p>We’re here to make better eating effortless.</p>
              <p>Because when real food becomes convenient,</p>
              <p>better choices become natural.</p>
            </div>

            <p className="text-[#213B14]/65 text-sm sm:text-base font-medium max-w-2xl mx-auto italic">
              To make real, clean food accessible anytime - without compromising taste, nutrition, or trust.
            </p>

            <div className="pt-4">
              <p className="text-[#3F622D] text-lg font-bold italic">
                “Trusted by people who care about what they eat - and what they avoid.”
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. DIFFERENCE SECTION ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <span className="inline-block px-3 py-1 bg-[#3F622D]/10 text-[#3F622D] text-xs font-bold uppercase tracking-wider rounded border border-[#3F622D]/20">
            The Dry Factory Difference
          </span>
          <h2 className="text-3xl font-extrabold text-[#1C2A18]">
            What Sets Us Apart
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-[#213B14]/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#3F622D]/10 text-[#3F622D] rounded-xl flex items-center justify-center mb-6 border border-[#3F622D]/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1C2A18] mb-3">{item.title}</h3>
                <p className="text-[#213B14]/70 text-xs sm:text-sm font-semibold leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <TrustBadges />
      <Footer />
    </div>
  );
}

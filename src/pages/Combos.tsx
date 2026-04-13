import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Gift, ShoppingBag, Star, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const useCases = [
  {
    icon: Gift,
    title: 'Gifting Bundles',
    desc: 'Our curated combos make the perfect gift for health-conscious friends and family. A beautiful variety of our best products, elegantly packed and ready to delight.',
  },
  {
    icon: ShoppingBag,
    title: 'Trial Packs',
    desc: 'Can\'t decide which fruit to try first? Our trial combos allow you to sample a wide range of flavors and textures at a fraction of the cost. Find your new favorite today.',
  },
  {
    icon: Package,
    title: 'Bulk Savings',
    desc: 'Stock up and save with our family-sized combos. Get more of what you love while enjoying significant savings compared to individual purchases. Perfect for a busy household.',
  },
];

const benefits = [
  'Curated selections of our most popular products',
  'Greater variety in a single package',
  'Cost-effective way to sample multiple flavors',
  'Perfect for gifting or pantry stocking',
  'Includes a mix of powders, chunks, and chocolates',
];

export default function Combos() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        tag="Combos & Bundles"
        title="More Variety,"
        highlight="Better Value"
        description="Experience everything The Dry Factory has to offer with our carefully curated combos. From baker's bundles to snacker's delights, we've paired our best products to give you the ultimate fruit experience."
        image="https://images.unsplash.com/photo-1549007994-cb92cd87dd39?w=1600&h=900&fit=crop"
        tint="from-[#1a1a1a]/70"
      />

      {/* Why Combos */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-[#fdf3ec] text-[#e85d26] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#f0d9c8] mb-6">
                Curated Nutrition
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                Designed for the Ultimate Fruit Lover
              </h2>
              <div className="space-y-4 text-[#6a5a4a] text-base leading-relaxed">
                <p>
                  Why settle for one when you can have them all? Our combos are designed to showcase the diversity of our range. Whether you're a home baker needing a variety of powders or a parent looking for healthy snacks, we have a combo for you.
                </p>
                <div className="grid grid-cols-1 gap-4 pt-6">
                  {useCases.map((item) => (
                    <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-[#fdf3ec]/50 border border-[#f0d9c8]">
                      <div className="w-10 h-10 bg-[#e85d26] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1a1a1a] text-sm mb-1">{item.title}</h4>
                        <p className="text-[#6a5a4a] text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=700&h=800&fit=crop"
                alt="Variety of fruit products"
                className="w-full h-[600px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-[#1a1a1a] text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-[#f4a435] text-xs font-semibold uppercase tracking-wider rounded-full border border-white/20 mb-4">
              Bundle Benefits
            </span>
            <h2 className="font-serif text-4xl font-bold">
              The Value of Variety
            </h2>
          </motion.div>

          <div className="space-y-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <CheckCircle2 className="w-5 h-5 text-[#f4a435] flex-shrink-0 mt-0.5" />
                <p className="text-white/90 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

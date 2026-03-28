import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Backpack, Coffee, Apple } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const useCases = [
  {
    icon: Backpack,
    title: 'Trail Mix & On-the-Go Snacking',
    desc: 'Toss freeze-dried mango, strawberry, or pineapple chunks into your trail mix for a lightweight, nutrient-dense snack that travels anywhere without refrigeration.',
  },
  {
    icon: Coffee,
    title: 'Yogurt & Breakfast Toppings',
    desc: 'Scatter a handful of freeze-dried blueberry or raspberry chunks over Greek yogurt, granola, or overnight oats for a crunchy, intensely fruity topping that won\'t go soggy.',
  },
  {
    icon: Apple,
    title: 'Direct Snacking',
    desc: 'Eat them straight from the bag. The satisfying crunch, the burst of concentrated fruit flavor, and the knowledge that you\'re eating nothing but real fruit — it\'s snacking at its best.',
  },
];

const benefits = [
  'Satisfying crunch with zero added sugar or preservatives',
  'Lightweight and shelf-stable — perfect for travel, hiking, and school lunches',
  'Retains the full nutritional profile of fresh fruit',
  'Available in a wide range of seasonal and tropical varieties',
  'Rehydrates perfectly in liquids — great for oatmeal and cereals',
];

export default function FruitChunks() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        tag="Freeze Dried Fruit Chunks"
        title="The Crunch of Fresh Fruit,"
        highlight="Anytime, Anywhere"
        description="Our freeze-dried fruit chunks deliver the full flavor and nutrition of fresh fruit in a lightweight, shelf-stable form. No refrigeration. No compromise. Just pure, crunchy fruit goodness."
        image="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=1600&h=600&fit=crop"
        tint="from-[#27ae60]/80"
      />

      {/* What It Is */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=700&h=600&fit=crop"
                alt="Colorful freeze-dried fruit chunks in a bowl"
                width={700}
                height={600}
                className="w-full h-[480px] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block px-4 py-1.5 bg-[#fdf3ec] text-[#e85d26] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#f0d9c8] mb-6">
                What Are Freeze Dried Fruit Chunks?
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                Fresh Fruit, Minus the Moisture
              </h2>
              <div className="space-y-4 text-[#6a5a4a] text-base leading-relaxed">
                <p>
                  Freeze-dried fruit chunks are whole pieces of real fruit — sliced, diced, or left whole — that have been freeze-dried to remove all moisture while preserving everything else. The result is a lightweight, crunchy piece of fruit that looks, tastes, and nourishes like the real thing.
                </p>
                <p>
                  Unlike dried fruit, which uses heat and often adds sugar to compensate for flavor loss, our freeze-dried chunks contain nothing but fruit. The freeze-drying process preserves the natural sugars, acids, and aromatic compounds that give each fruit its distinctive character.
                </p>
                <p>
                  The texture is uniquely satisfying — a light, airy crunch that dissolves into an intense burst of fruit flavor. Once you try it, regular dried fruit feels like a compromise.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[#f0faf4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-white text-[#27ae60] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#c8e6d4] mb-4">
              How to Use Them
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#1a1a1a]">
              Snack Smarter, Every Day
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-[#c8e6d4] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#27ae60] rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">{item.title}</h3>
                <p className="text-[#6a5a4a] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-[#f0faf4] text-[#27ae60] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#c8e6d4] mb-4">
              Key Benefits
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#1a1a1a]">
              Why Choose Our Fruit Chunks
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
                className="flex items-start gap-4 p-6 bg-[#f0faf4] rounded-xl border border-[#c8e6d4]"
              >
                <CheckCircle2 className="w-5 h-5 text-[#27ae60] flex-shrink-0 mt-0.5" />
                <p className="text-[#4a3a2a] font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
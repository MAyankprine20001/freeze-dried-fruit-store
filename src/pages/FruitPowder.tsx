import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Blend, Cake, Baby } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const useCases = [
  {
    icon: Blend,
    title: 'Smoothies & Drinks',
    desc: 'Add a teaspoon of strawberry, mango, or blueberry powder to your morning smoothie for an intense burst of real fruit flavor and a natural color boost — no artificial dyes needed.',
  },
  {
    icon: Cake,
    title: 'Baking & Confectionery',
    desc: 'Fold raspberry powder into buttercream, swirl mango powder into cheesecake batter, or dust passion fruit powder over macarons. Natural flavor and color in one ingredient.',
  },
  {
    icon: Baby,
    title: 'Baby & Toddler Food',
    desc: 'Stir a small amount of our single-ingredient fruit powder into purees, oatmeal, or yogurt for a nutritious flavor boost. No added sugar, no additives — just fruit.',
  },
];

const benefits = [
  'Concentrated fruit flavor — up to 10x more intense than fresh fruit',
  'Retains up to 97% of vitamins, minerals, and antioxidants',
  'Natural food coloring — vibrant, stable color without artificial dyes',
  'Dissolves easily in liquids, batters, and creams',
  'Long shelf life — up to 25 years sealed, 12 months once opened',
];

export default function FruitPowder() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        tag="Freeze Dried Fruit Powder"
        title="Pure Fruit Flavor,"
        highlight="Powdered to Perfection"
        description="Our freeze-dried fruit powders are made from 100% whole fruit — nothing added, nothing removed except moisture. The result is an intensely flavored, vibrantly colored powder that transforms everything it touches."
        image="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=1600&h=600&fit=crop"
        tint="from-[#c0392b]/80"
      />

      {/* What It Is */}
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
                What Is Freeze Dried Fruit Powder?
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                The Most Concentrated Form of Real Fruit
              </h2>
              <div className="space-y-4 text-[#6a5a4a] text-base leading-relaxed">
                <p>
                  Freeze-dried fruit powder starts with whole fruit at peak ripeness. The fruit is frozen to sub-zero temperatures, then placed in a vacuum chamber where the ice crystals sublimate directly into vapor — bypassing the liquid phase entirely.
                </p>
                <p>
                  The result is a completely dry, shelf-stable fruit that retains its original color, flavor, and nutritional profile. We then mill this into a fine, free-flowing powder that dissolves easily and delivers an extraordinary depth of flavor.
                </p>
                <p>
                  Unlike spray-dried or drum-dried fruit powders, our freeze-dried process never uses heat — which means the delicate vitamins, enzymes, and phytonutrients that make fruit so beneficial are fully preserved.
                </p>
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
                src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=700&h=600&fit=crop"
                alt="Colorful fruit powders in small bowls"
                width={700}
                height={600}
                className="w-full h-[480px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[#fdf3ec]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-white text-[#e85d26] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#f0d9c8] mb-4">
              How to Use It
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#1a1a1a]">
              Endless Possibilities
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
                className="bg-white rounded-2xl p-8 border border-[#f0d9c8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#e85d26] rounded-xl flex items-center justify-center mb-6 shadow-sm">
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
            <span className="inline-block px-4 py-1.5 bg-[#fdf3ec] text-[#e85d26] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#f0d9c8] mb-4">
              Key Benefits
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#1a1a1a]">
              Why Choose Our Fruit Powder
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
                className="flex items-start gap-4 p-6 bg-[#fdf3ec] rounded-xl border border-[#f0d9c8]"
              >
                <CheckCircle2 className="w-5 h-5 text-[#e85d26] flex-shrink-0 mt-0.5" />
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
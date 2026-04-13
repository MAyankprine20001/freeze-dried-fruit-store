import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Gift, Candy, UtensilsCrossed } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const useCases = [
  {
    icon: Gift,
    title: 'Gifting',
    desc: 'Our chocolate bars make extraordinary gifts. The striking visual of vibrant freeze-dried fruit embedded in premium chocolate is as beautiful as it is delicious — perfect for any occasion.',
  },
  {
    icon: Candy,
    title: 'Everyday Snacking',
    desc: 'A square of dark chocolate with freeze-dried raspberry is a genuinely satisfying snack that feels indulgent but is made from real, recognizable ingredients. Treat yourself, guilt-free.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Dessert Topping',
    desc: 'Break our chocolate into shards and scatter over ice cream, panna cotta, or mousse for a dramatic, flavor-packed garnish that elevates any dessert to restaurant quality.',
  },
];

const benefits = [
  'Premium single-origin chocolate paired with real freeze-dried fruit',
  'The tartness of freeze-dried fruit perfectly balances the richness of chocolate',
  'Visually stunning — vibrant fruit pieces visible throughout',
  'No artificial flavors, colors, or preservatives',
  'Available in dark, milk, and white chocolate bases',
];

export default function Chocolate() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        tag="Chocolates"
        title="Where Chocolate Meets"
        highlight="Pure Fruit"
        description="We take premium chocolate and elevate it with the bold, tangy crunch of freeze-dried fruit. The result is a sensory experience that's visually stunning, intensely flavorful, and made from ingredients you can actually pronounce."
        image="https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1600&h=600&fit=crop"
        tint="from-[#4a1a0a]/90"
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
                The Perfect Pairing
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                How Freeze-Dried Fruit Transforms Chocolate
              </h2>
              <div className="space-y-4 text-[#6a5a4a] text-base leading-relaxed">
                <p>
                  Chocolate and fruit have always been natural partners. But fresh fruit brings moisture — the enemy of good chocolate. Freeze-dried fruit solves this beautifully: all the flavor, all the color, all the nutrition, with zero moisture to compromise the chocolate's texture or shelf life.
                </p>
                <p>
                  The tartness and acidity of freeze-dried raspberry, strawberry, or passion fruit cuts through the richness of chocolate in a way that fresh fruit simply can't. The contrast is extraordinary — a snap of chocolate, then a burst of intense, concentrated fruit flavor.
                </p>
                <p>
                  We source our chocolate from ethical, single-origin producers and pair each variety with the freeze-dried fruit that complements it best. Every bar is a considered combination, not an afterthought.
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
                src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=700&h=600&fit=crop"
                alt="Dark chocolate bar with freeze-dried raspberries"
                width={700}
                height={600}
                className="w-full h-[480px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[#2c1a0e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1600&h=600&fit=crop"
            alt=""
            aria-hidden="true"
            width={1600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-[#f4a435] text-xs font-semibold uppercase tracking-wider rounded-full border border-white/20 mb-4">
              How to Enjoy It
            </span>
            <h2 className="font-serif text-4xl font-bold text-white">
              Three Perfect Occasions
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
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/15 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#e85d26] rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
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
              Why Our Chocolate Stands Apart
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

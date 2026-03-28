import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import TrustBadges from '../components/TrustBadges';

const differentiators = [
  {
    title: 'Sourced at Peak Ripeness',
    desc: 'We work directly with trusted farms to source fruit only when it\'s at its nutritional and flavor peak — never underripe, never overripe.',
  },
  {
    title: 'Pharmaceutical-Grade Freeze Drying',
    desc: 'Our freeze-drying equipment meets the same standards used in pharmaceutical preservation, ensuring consistent quality in every batch.',
  },
  {
    title: 'Transparent Ingredients',
    desc: 'Every product contains exactly one ingredient: the fruit on the label. No fillers, no flow agents, no hidden additives — ever.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        tag="Our Story"
        title="Born from a Passion for"
        highlight="Real Food"
        description="FrostFruit started in a small kitchen with a simple obsession: why does fruit lose everything that makes it great the moment it's processed? We set out to change that."
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=600&fit=crop"
        tint="from-[#1a1a1a]/85"
      />

      {/* Origin Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=700&h=600&fit=crop"
                  alt="Fresh fruit being harvested on a farm"
                  width={700}
                  height={600}
                  className="w-full h-[480px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#e85d26] rounded-2xl p-6 shadow-xl text-white">
                <p className="font-serif text-3xl font-bold">2018</p>
                <p className="text-white/80 text-sm font-medium">Founded with purpose</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-[#fdf3ec] text-[#e85d26] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#f0d9c8] mb-6">
                Where It All Began
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                A Farmer's Daughter and a Freeze-Dryer
              </h2>
              <div className="space-y-4 text-[#6a5a4a] text-base leading-relaxed">
                <p>
                  Our founder, Elena, grew up on a fruit farm in the Pacific Northwest. Every summer, she watched her family's harvest — months of careful growing — go to waste because the market couldn't absorb it all. Perfectly ripe strawberries, peaches, and blueberries, composted by the ton.
                </p>
                <p>
                  After studying food science, Elena discovered freeze-drying: a process that removes moisture without heat, preserving the color, flavor, and nutrition of fruit at its absolute peak. She bought a small freeze-dryer, started experimenting in her garage, and FrostFruit was born.
                </p>
                <p>
                  What started as a way to save her family's harvest became a mission to bring the most honest, nutritious fruit products to families everywhere — with zero compromise on quality or transparency.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-[#fdf3ec]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white text-[#e85d26] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#f0d9c8] mb-6">
              Our Mission
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#1a1a1a] mb-8 leading-tight">
              Honest Food for a Healthier World
            </h2>
            <div className="space-y-4 text-[#6a5a4a] text-lg leading-relaxed">
              <p>
                Our mission is simple: to make the most nutritious, most flavorful, and most honest fruit products on the planet. We believe that real food shouldn't need a chemistry degree to understand — if you can't pronounce it, it shouldn't be in your food.
              </p>
              <p>
                We're committed to working with nature, not against it. That means sourcing sustainably, processing minimally, and packaging responsibly — so that every FrostFruit product is as good for the planet as it is for you.
              </p>
              <p>
                Health shouldn't be complicated. We make it easy to eat more fruit, more often, in more ways — without ever sacrificing quality, taste, or transparency.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#fdf3ec] text-[#e85d26] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#f0d9c8] mb-4">
              The FrostFruit Difference
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#1a1a1a]">
              What Sets Us Apart
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#fdf3ec] rounded-2xl p-8 border border-[#f0d9c8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#e85d26] rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">{item.title}</h3>
                <p className="text-[#6a5a4a] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />
      <Footer />
    </div>
  );
}
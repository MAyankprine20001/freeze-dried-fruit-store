import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import TrustBadges from '../components/TrustBadges';

const differentiators = [
  {
    title: 'Real Ingredients, No Shortcuts',
    desc: 'What you see is what you get. No hidden additives, no artificial flavours.',
  },
  {
    title: 'Freeze-Drying with Purpose',
    desc: 'Not just a process — a way to preserve real nutrition and real taste.',
  },
  {
    title: 'Built for Real Life',
    desc: 'Whether you’re at work, travelling, or at home - healthy should be easy.',
  },
  {
    title: 'Balanced, Not Extreme',
    desc: 'We don’t believe in perfection. Just better, cleaner everyday choices.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <PageHero
        tag="Our Story"
        title="Real Food,"
        highlight="Thoughtfully Preserved"
        description="We’re on a mission to bring you food that’s as real as it should be - clean, honest, and made to fit your everyday life."
        image="/About_main.png"
        tint="from-black/85"
      />

      {/* Origin Story */}
      <section className="py-24 bg-black">
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
                  src="/AboutLeft_Side.png"
                  alt="Fresh fruit being harvested on a farm"
                  width={700}
                  height={600}
                  className="w-full h-[480px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#D4AF37] rounded-2xl p-6 shadow-xl text-black">
                <p className="font-serif text-3xl font-bold">The Dry Factory</p>
                <p className="text-black/80 text-sm font-medium">Simple. Honest. Trustworthy.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/5 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full border border-white/10 mb-6">
                Where It All Began
              </span>
              <h2 className="font-serif text-3xl font-bold text-white mb-6 leading-tight">
                Our Story
              </h2>
              <div className="space-y-6 text-white/70 text-base leading-relaxed">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#D4AF37] mb-2">Why We Started</h3>
                  <p>
                    We noticed something strange. The more “convenient” food became, the less real it felt. Hidden sugars, artificial flavors, and long ingredient lists became the norm.
                  </p>
                  <p className="mt-2">
                    At the same time, perfectly good fruits were going to waste - just because they didn’t last long enough. That didn’t sit right with us.
                  </p>
                  <p className="mt-2">
                    So we asked a simple question: What if real food could stay real… longer? That question led to The Dry Factory.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#D4AF37] mb-2">The Problem We’re Solving</h3>
                  <p>
                    Fresh fruits are seasonal, fragile, and hard to store. Most processed alternatives? Loaded with things your body doesn’t need. We chose a different path.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#D4AF37] mb-2">Our Solution</h3>
                  <p>
                    Using freeze-drying, we remove moisture without heat - preserving the taste, nutrition, and texture of real fruit. No shortcuts. No additives. No compromises. Just real food, made smarter.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-black text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full border border-white/10 mb-6">
              Our Mission
            </span>
            <h2 className="font-serif text-4xl font-bold text-white mb-8 leading-tight">
              Honest Food for a Healthier Everyday
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed text-left max-w-3xl mx-auto">
              <p>
                Our mission is simple to make real food easy to trust again. In a world full of shortcuts, we want to bring back honesty to what people consume daily. No hidden ingredients, no unnecessary additives just clean, thoughtfully made products that actually do what they promise.
              </p>
              <p>
                We aim to make fruits more accessible beyond their seasons, reduce unnecessary waste, and create products that fit naturally into modern lifestyles without compromising health. Because for us, it's not just about selling products  it's about helping people build better, simpler food habits every day.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-white/5 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full border border-white/10 mb-4">
              The Dry Factory Difference
            </span>
            <h2 className="font-serif text-4xl font-bold text-white">
              What Sets Us Apart
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
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

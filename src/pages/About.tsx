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
    desc: 'We don’t believe in masking flavours with sugar or chemicals. What you see is what you get  real fruits, real ingredients, nothing unnecessary.',
  },
  {
    title: 'Freeze-Drying with Purpose',
    desc: 'We use freeze drying not just as a process, but as a solution to preserve taste, nutrition, and shelf life without adding preservatives.',
  },
  {
    title: 'Made for Everyday Life',
    desc: 'Our products are designed to be convenient, quick, and easy to use  so choosing healthy doesn’t feel like extra effort.',
  },
  {
    title: 'Balanced, Not Extreme',
    desc: 'We’re not here to sell “perfect” diets. We’re here to offer better alternatives  products that are cleaner, smarter, and realistically sustainable.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        tag="Our Story"
        title="Real Food,"
        highlight="Thoughtfully Preserved"
        description="At The Dry Factory, we believe that what you consume every day should not just taste good, but should genuinely be good for your body. Healthy should not be complicated."
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
                <p className="font-serif text-3xl font-bold">The Dry Factory</p>
                <p className="text-white/80 text-sm font-medium">Simple. Honest. Trustworthy.</p>
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
                Our Story
              </h2>
              <div className="space-y-4 text-[#6a5a4a] text-base leading-relaxed">
                <p>
                  At The Dry Factory, we believe that what you consume every day should not just taste good, but should genuinely be good for your body.
                  When we looked closely at the way food is consumed today, one thing became very clear — most “convenient” options are loaded with excess sugar, artificial flavours, preservatives, and hidden additives. What is marketed as healthy often isn’t truly so. And that didn’t sit right with us.
                </p>
                <p>
                  At the same time, we noticed a deeper problem with something as simple and natural as fruits. They don’t last long. They spoil quickly, are highly seasonal, and are difficult to store or transport without losing their quality. In a country like India, where we are blessed with such a wide variety of fruits and vegetables, it’s surprising that only a small portion actually reaches meaningful use, while a large percentage goes to waste. This leads to significant losses — not just for farmers, but for all of us.
                </p>
                <p>
                  We wanted to change this. Our journey started with a simple thought — what if we could preserve fruits in their most natural form, without adding anything artificial, and make them available anytime, anywhere?
                </p>
                <p>
                  That’s where freeze-drying came in. A process that removes moisture without heat, helping retain the real taste, nutrition, and texture of fruits. But for us, it wasn’t just about using a technology — it was about using it meaningfully. We explored ways to turn real ingredients into products that are clean, convenient, and enjoyable in everyday life.
                </p>
                <p>
                  From our smoothies to our chocolate creations, everything we make is built around real ingredients, honest processes, and a clear intention — to offer better choices without compromising on taste.
                </p>
                <p>
                  Our goal is simple — to make real fruit accessible in every season, without the worry of it going bad, and to take the authentic taste of our country beyond boundaries. We are not just building a brand. We are building a habit — a habit of choosing better, every day.
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
              Honest Food for a Healthier Everyday
            </h2>
            <div className="space-y-6 text-[#6a5a4a] text-lg leading-relaxed text-left max-w-3xl mx-auto">
              <div className="flex gap-4">
                <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#e85d26]" />
                <p>Our mission is simple — to make real food easy to trust again.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#e85d26]" />
                <p>In a world full of shortcuts, we want to bring back honesty to what people consume daily. No hidden ingredients, no unnecessary additives — just clean, thoughtfully made products that actually do what they promise.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#e85d26]" />
                <p>We aim to make fruits more accessible beyond their seasons, reduce unnecessary waste, and create products that fit naturally into modern lifestyles without compromising health.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#e85d26]" />
                <p>Because for us, it’s not just about selling products — it’s about helping people build better, simpler food habits every day.</p>
              </div>
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
              The Dry Factory Difference
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#1a1a1a]">
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

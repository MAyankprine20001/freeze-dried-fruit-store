import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Heart, Package } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrustBadges from '../components/TrustBadges';
import CategoryCard from '../components/CategoryCard';

const categories = [
  {
    title: 'Freeze Dried Fruit Powder',
    description: 'Intensely flavored, ultra-fine fruit powder made from 100% real fruit. Perfect for smoothies, baking, and natural food coloring.',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop',
    path: '/fruit-powder',
    tag: 'Bestseller',
  },
  {
    title: 'Freeze Dried Fruit Chunks',
    description: 'Crunchy, vibrant fruit pieces that retain all the flavor and nutrition of fresh fruit — with a satisfying snap in every bite.',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=400&fit=crop',
    path: '/fruit-chunks',
    tag: 'Fan Favorite',
  },
  {
    title: 'Chocolate with Freeze Dried Fruit',
    description: 'Premium chocolate elevated by the bold, tangy crunch of freeze-dried fruit. A sensory experience unlike any other.',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&h=400&fit=crop',
    path: '/chocolate',
    tag: 'New',
  },
];

const whyUs = [
  {
    icon: Zap,
    title: 'Peak Nutrition Locked In',
    desc: 'Our freeze-drying process removes moisture without heat, preserving up to 97% of the original vitamins, minerals, and antioxidants.',
  },
  {
    icon: Heart,
    title: 'Whole Fruit. Nothing Else.',
    desc: 'No added sugars, no artificial flavors, no preservatives. Just real fruit, harvested at peak ripeness and gently freeze-dried.',
  },
  {
    icon: Package,
    title: 'Long Shelf Life, Zero Waste',
    desc: 'Enjoy the taste of summer strawberries in January. Our products last up to 25 years sealed — and stay fresh for 12 months once opened.',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Nutritionist',
    quote: 'I recommend FrostFruit to all my clients. The powder is incredible in smoothies and the ingredient list is exactly what it should be — just fruit.',
    rating: 5,
  },
  {
    name: 'James T.',
    role: 'Home Baker',
    quote: 'The strawberry powder gives my macarons a natural pink color and real fruit flavor. No artificial dyes needed. Game changer.',
    rating: 5,
  },
  {
    name: 'Priya K.',
    role: 'Parent of Two',
    quote: 'My kids absolutely love the mango chunks as a snack. I love that there\'s nothing hidden in the ingredients. Just mango.',
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&h=900&fit=crop"
            alt="Colorful freeze-dried fruits arranged on a white surface"
            width={1600}
            height={900}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-[#1a1a1a]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block px-4 py-1.5 bg-[#e85d26]/90 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-6"
            >
              100% Natural Freeze Dried Fruit
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            >
              Nature's Best,{' '}
              <span className="text-[#f4a435]">Locked In</span>{' '}
              Forever
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/85 text-lg leading-relaxed mb-10"
            >
              Premium freeze-dried fruit snacks, powders, and chocolate — made from whole fruit harvested at peak ripeness. No preservatives. No compromise. Just pure, intense fruit flavor in every bite.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/fruit-powder"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e85d26] text-white font-semibold rounded-full hover:bg-[#d44f1a] hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shadow-lg"
              >
                Shop Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white font-semibold rounded-full border border-white/30 hover:bg-white/25 hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white backdrop-blur-sm"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Categories */}
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
              Our Products
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#1a1a1a] mb-4">
              Three Ways to Love Fruit
            </h2>
            <p className="text-[#6a5a4a] text-lg max-w-2xl mx-auto">
              Whether you're blending, baking, snacking, or gifting — we have the perfect freeze-dried fruit product for every moment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.path} {...cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-[#fdf3ec]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white text-[#e85d26] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#f0d9c8] mb-6">
                Why FrostFruit
              </span>
              <h2 className="font-serif text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                The Science of Keeping Fruit{' '}
                <span className="text-[#e85d26]">Perfect</span>
              </h2>
              <p className="text-[#6a5a4a] text-base leading-relaxed mb-10">
                Freeze-drying is the gold standard of food preservation. By removing moisture at sub-zero temperatures, we lock in the color, flavor, and nutrition of fruit at its absolute peak — without a single additive.
              </p>
              <div className="space-y-8">
                {whyUs.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 bg-[#e85d26] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] mb-1">{item.title}</h3>
                      <p className="text-[#6a5a4a] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=700&h=800&fit=crop"
                  alt="Vibrant freeze-dried fruit pieces in a bowl"
                  width={700}
                  height={800}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-[#f0e8e0]">
                <p className="font-serif text-3xl font-bold text-[#e85d26]">97%</p>
                <p className="text-[#6a5a4a] text-sm font-medium">Nutrients Preserved</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              What People Say
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#1a1a1a]">
              Loved by Foodies, Parents & Pros
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#fdf3ec] rounded-2xl p-8 border border-[#f0d9c8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#f4a435] text-[#f4a435]" />
                  ))}
                </div>
                <p className="text-[#4a3a2a] text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-[#1a1a1a] text-sm">{t.name}</p>
                  <p className="text-[#8a7a6a] text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&h=400&fit=crop"
            alt=""
            aria-hidden="true"
            width={1600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Taste the{' '}
              <span className="text-[#f4a435]">Difference?</span>
            </h2>
            <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
              Explore our full range of freeze-dried fruit products and discover why thousands of health-conscious families choose FrostFruit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/fruit-powder"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e85d26] text-white font-semibold rounded-full hover:bg-[#d44f1a] hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a435] shadow-lg"
              >
                Shop Fruit Powder
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white/30 hover:bg-white/10 hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Bulk Orders
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
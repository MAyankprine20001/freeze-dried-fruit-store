import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Blend, Zap, Heart, Sparkles, Smile, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const useCases = [
 {
  icon: Blend,
  title: 'Instant Morning Fuel',
  desc: 'Simply mix our Smoothie Premix with water, milk, or a plant-based alternative. In seconds, you have a nutrient-dense breakfast that tastes like it was freshly blended at a juice bar.',
 },
 {
  icon: Zap,
  title: 'Pre/Post Workout Boost',
  desc: 'Packed with natural sugars and vitamins, our premixes provide a steady energy release without the crash. Perfect for fueling your workout or recovering afterwards.',
 },
 {
  icon: Sparkles,
  title: 'Creative Smoothie Bowls',
  desc: 'Use our premix as a concentrated base for a thick, delicious smoothie bowl. Top with fresh fruit, granola, and seeds for a gourmet café experience at home.',
 },
];

const benefits = [
 '100% Raw nutrition preserves 97% of vitamins and minerals',
 'No added sugars, preservatives, or artificial flavors',
 'Inter-soluble powders for a perfectly smooth texture every time',
 'Real fruit pieces for a delightful, authentic experience',
 'Convenient, shelf-stable packaging take your nutrition anywhere',
];

export default function SmoothiePremix() {
 return (
  <div className="min-h-screen bg-white">
   <Header />

   <PageHero
    tag="Smoothie Premix"
    title="The Ultimate"
    highlight="Nutrition Shortcut"
    description="Our Smoothie Premixes are crafted from the finest freeze-dried fruits, ensuring you get peak nutrition and explosive flavor in every sip. Just add liquid and enjoy the pure essence of nature."
    image="https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=1600&h=900&fit=crop"
    tint="from-[#f4a435]/80"
   />

   {/* Why Smoothie Premix */}
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
        Purely Convenient
       </span>
       <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
        Nutrition Without the Prep Work
       </h2>
       <div className="space-y-4 text-[#6a5a4a] text-base leading-relaxed">
        <p>
         We know your life is busy. That's why we've perfected the Smoothie Premix. We do the sourcing, the cleaning, the slicing, and the freeze-drying. You just reap the benefits.
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
        src="https://images.unsplash.com/photo-1626330332822-a1f2f4a453c1?w=700&h=800&fit=crop"
        alt="Colorful smoothies in glasses"
        className="w-full h-[600px] object-cover"
       />
      </motion.div>
     </div>
    </div>
   </section>

   {/* Benefits */}
   <section className="py-24 bg-[#fdf3ec]">
    <div className="max-w-4xl mx-auto px-6 lg:px-8">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
     >
      <span className="inline-block px-4 py-1.5 bg-white text-[#e85d26] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#f0d9c8] mb-4">
       Premium Benefits
      </span>
      <h2 className="font-serif text-4xl font-bold text-[#1a1a1a]">
       The smoothie you've been waiting for
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
        className="flex items-start gap-4 p-6 bg-white rounded-xl border border-[#f0d9c8]"
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

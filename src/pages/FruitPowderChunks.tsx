import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Blend, Cake, Baby, Backpack, Coffee, Apple } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const powderUseCases = [
 {
  icon: Blend,
  title: 'Smoothies & Drinks',
  desc: 'Add a teaspoon of strawberry, mango, or blueberry powder to your morning smoothie for an intense burst of real fruit flavor and a natural color boost no artificial dyes needed.',
 },
 {
  icon: Cake,
  title: 'Baking & Confectionery',
  desc: 'Fold raspberry powder into buttercream, swirl mango powder into cheesecake batter, or dust passion fruit powder over macarons. Natural flavor and color in one ingredient.',
 },
 {
  icon: Baby,
  title: 'Baby & Toddler Food',
  desc: 'Stir a small amount of our single-ingredient fruit powder into purees, oatmeal, or yogurt for a nutritious flavor boost. No added sugar, no additives just fruit.',
 },
];

const chunkUseCases = [
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
  desc: 'Eat them straight from the bag. The satisfying crunch, the burst of concentrated fruit flavor, and the knowledge that you\'re eating nothing but real fruit it\'s snacking at its best.',
 },
];

const benefits = [
 'Concentrated fruit flavor up to 10x more intense than fresh fruit',
 'Satisfying crunch with zero added sugar or preservatives',
 'Retains up to 97% of vitamins, minerals, and antioxidants',
 'Lightweight and shelf-stable perfect for travel, baking, and snacks',
 'Natural food coloring and flavoring in one pure ingredient',
];

export default function FruitPowderChunks() {
 return (
  <div className="min-h-screen bg-white">
   <Header />

   <PageHero
    tag="Fruit Chunks & Powders"
    title="Pure Fruit,"
    highlight="Two Essential Forms"
    description="Whether you need the intense, dissolvable flavor of our ultra-fine powders or the satisfying, nutritious crunch of our whole chunks, we deliver the pure essence of fruit at its peak."
    image="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&h=600&fit=crop"
    tint="from-[#e85d26]/80"
   />

   {/* Introduction */}
   <section className="py-24 bg-white border-b border-[#fdf3ec]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
     >
      <h2 className="font-serif text-4xl font-bold text-[#1a1a1a] mb-6">
       The Dry Factory Standard
      </h2>
      <p className="text-[#6a5a4a] text-lg leading-relaxed">
       Our unique freeze-drying process never uses heat, preserving the delicate vitamins, enzymes, and phytonutrients that make fruit so beneficial. We start with whole fruit at peak ripeness and remove only the moisture, leaving behind nothing but pure, shelf-stable nutrition.
      </p>
     </motion.div>
    </div>
   </section>

   {/* Fruit Powder Section */}
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
        Fruit Powder
       </span>
       <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
        Concentrated Flavor for Every Creation
       </h2>
       <div className="space-y-4 text-[#6a5a4a] text-base leading-relaxed">
        <p>
         Milled into a fine, free-flowing powder, our freeze-dried fruits dissolve easily in liquids, batters, and creams. It's the most concentrated form of real fruit available, delivering extraordinary depth of flavor and vibrant, natural color without artificial dyes.
        </p>
        <div className="grid grid-cols-1 gap-4 pt-6">
         {powderUseCases.map((item) => (
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
        src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=700&h=800&fit=crop"
        alt="Colorful fruit powders"
        className="w-full h-[600px] object-cover"
       />
      </motion.div>
     </div>
    </div>
   </section>

   {/* Fruit Chunks Section */}
   <section className="py-24 bg-[#f0faf4]">
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
        src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=700&h=800&fit=crop"
        alt="Colorful fruit chunks"
        className="w-full h-[600px] object-cover"
       />
      </motion.div>

      <motion.div
       initial={{ opacity: 0, x: -24 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6 }}
       className="order-1 lg:order-2"
      >
       <span className="inline-block px-4 py-1.5 bg-white text-[#27ae60] text-xs font-semibold uppercase tracking-wider rounded-full border border-[#c8e6d4] mb-6">
        Fruit Chunks
       </span>
       <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-6 leading-tight">
        The Ultimate Crunchy, Healthy Snack
       </h2>
       <div className="space-y-4 text-[#6a5a4a] text-base leading-relaxed">
        <p>
         Whole pieces of real fruit sliced, diced, or left whole. Our freeze-dried chunks provide a uniquely satisfying, light crunch that dissolves into an intense burst of fruit flavor. Perfect for snacking straight from the bag or topping your favorite breakfast.
        </p>
        <div className="grid grid-cols-1 gap-4 pt-6">
         {chunkUseCases.map((item) => (
          <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-white border border-[#c8e6d4]">
           <div className="w-10 h-10 bg-[#27ae60] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
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
       Why Choose Us
      </span>
      <h2 className="font-serif text-4xl font-bold text-[#1a1a1a]">
       The Frozen Benefit
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

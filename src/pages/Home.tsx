import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Heart, Package, ChevronLeft, ChevronRight, Leaf, FlaskConical, Timer, Dumbbell, Briefcase, Laptop, Baby, Sparkles, Snowflake, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrustBadges from '../components/TrustBadges';
import CategoryCard from '../components/CategoryCard';
import { AnimatePresence } from 'framer-motion';

const heroSlides = [
 {
  image: "/SliderImage/Slideone.png",
  subtitle: (
   <div className="flex flex-col items-start gap-1">
    <span className="font-serif italic text-5xl text-[#9A7B3E] mb-1 drop-shadow-sm">SipReal</span>
    <span className="text-black text-sm font-black tracking-widest uppercase">FREEZE-DRIED SMOOTHIE MIX</span>
   </div>
  ),
  title: (
   <>
    <span className="text-black block mb-2 drop-shadow-sm">Real Fruit.</span>
    <span className="text-[#9A7B3E] drop-shadow-sm">Instant Energy.</span>
   </>
  ),
  description: (
   <span className="text-black text-xl font-bold block mb-2">
    Shake it. Sip it. Feel the <span className="text-[#9A7B3E] font-black">difference</span> in seconds.
   </span>
  ),
  badges: (
   <div className="grid grid-cols-4 gap-3 mt-6 mb-4 border border-white/60 p-3 rounded-xl bg-white/60 backdrop-blur-md max-w-[380px] shadow-lg">
    <div className="flex flex-col items-center text-center gap-1.5">
     <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white/40"><Leaf className="w-4 h-4 text-black" strokeWidth={2.5} /></div>
     <span className="text-[10px] text-black font-extrabold leading-tight">No Added<br/>Sugar</span>
    </div>
    <div className="flex flex-col items-center text-center gap-1.5">
     <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center relative bg-white/40">
      <FlaskConical className="w-4 h-4 text-black" strokeWidth={2.5} />
      <div className="absolute inset-0 border-t-2 border-black rotate-45 transform origin-center w-[120%] -left-[10%]"></div>
     </div>
     <span className="text-[10px] text-black font-extrabold leading-tight">No<br/>Preservatives</span>
    </div>
    <div className="flex flex-col items-center text-center gap-1.5">
     <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white/40"><CheckCircle2 className="w-4 h-4 text-black" strokeWidth={2.5} /></div>
     <span className="text-[10px] text-black font-extrabold leading-tight">100%<br/>Real Fruit</span>
    </div>
    <div className="flex flex-col items-center text-center gap-1.5">
     <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white/40"><Timer className="w-4 h-4 text-black" strokeWidth={2.5} /></div>
     <span className="text-[10px] text-black font-extrabold leading-tight">Ready in<br/>10 Seconds</span>
    </div>
    <div className="flex flex-col items-center text-center gap-1.5">
     <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white/40"><Dumbbell className="w-4 h-4 text-black" strokeWidth={2.5} /></div>
     <span className="text-[10px] text-black font-extrabold leading-tight">Best for<br/>Gym</span>
    </div>
    <div className="flex flex-col items-center text-center gap-1.5">
     <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white/40"><Briefcase className="w-4 h-4 text-black" strokeWidth={2.5} /></div>
     <span className="text-[10px] text-black font-extrabold leading-tight">Perfect for<br/>Travel</span>
    </div>
    <div className="flex flex-col items-center text-center gap-1.5">
     <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white/40"><Laptop className="w-4 h-4 text-black" strokeWidth={2.5} /></div>
     <span className="text-[10px] text-black font-extrabold leading-tight">Great for<br/>Office</span>
    </div>
    <div className="flex flex-col items-center text-center gap-1.5">
     <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white/40"><Baby className="w-4 h-4 text-black" strokeWidth={2.5} /></div>
     <span className="text-[10px] text-black font-extrabold leading-tight">Loved by<br/>Kids</span>
    </div>
   </div>
  ),
  overlay: "bg-gradient-to-r from-white/80 via-white/40 to-transparent",
  buttonText: "TRY SIPREAL NOW",
  buttonClass: "bg-[#C49E5D] text-white hover:bg-[#A58242]"
 },
 {
  image: "/SliderImage/Slidetwo.png",
  subtitle: (
   <div className="flex flex-col items-start gap-1">
    <span className="font-serif italic text-4xl text-[#D4AF37] mb-1">FreezeFusion</span>
    <span className="text-gray-300 text-sm font-bold tracking-widest uppercase">GOURMET CHOCOLATES</span>
   </div>
  ),
  title: (
   <>
    <span className="text-white block mb-2">Real Fruit.</span>
    <span className="text-white">Real Chocolate. <span className="text-[#D4AF37]">Real Bliss.</span></span>
   </>
  ),
  description: (
   <span className="text-gray-300 text-xl font-medium block max-w-[500px]">
    Freeze-dried fruits meet premium chocolate for a crunch that melts your heart.
   </span>
  ),
  badges: (
   <div className="flex gap-6 mt-8 mb-4 max-w-2xl">
    <div className="flex flex-col items-center text-center gap-2">
     <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center"><CheckCircle2 className="w-6 h-6 text-[#D4AF37]" /></div>
     <span className="text-xs text-gray-300 font-semibold leading-tight">Real Fruit<br/>Inside</span>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
     <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center"><Sparkles className="w-6 h-6 text-[#D4AF37]" /></div>
     <span className="text-xs text-gray-300 font-semibold leading-tight">Irresistible<br/>Crunch</span>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
     <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center"><Package className="w-6 h-6 text-[#D4AF37]" /></div>
     <span className="text-xs text-gray-300 font-semibold leading-tight">Premium<br/>Chocolate</span>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
     <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center relative">
      <Leaf className="w-6 h-6 text-[#D4AF37]" />
      <div className="absolute inset-0 border-t-2 border-[#D4AF37] rotate-45 transform origin-center w-[120%] -left-[10%]"></div>
     </div>
     <span className="text-xs text-gray-300 font-semibold leading-tight">No Artificial<br/>Flavours</span>
    </div>
   </div>
  ),
  overlay: "bg-gradient-to-r from-black/80 via-black/40 to-transparent",
  buttonText: "EXPLORE FLAVOURS",
  buttonClass: "bg-[#D4AF37] text-black hover:bg-[#BF953F]"
 },
 {
  image: "/SliderImage/Slidethree.png",
  subtitle: (
   <div className="flex items-center gap-2 mb-2">
    <span className="text-[#41622D] text-sm font-bold tracking-widest uppercase">FRUIT CHUNKS</span>
    <Leaf className="w-5 h-5 text-[#41622D]" />
   </div>
  ),
  title: (
   <>
    <span className="text-[#213b14] block mb-2">Real Fruit.</span>
    <span className="text-[#A83232]">Real Crunch.</span>
   </>
  ),
  description: (
   <span className="text-gray-800 text-xl font-medium block max-w-[500px]">
    Freeze-dried to lock in nutrition, flavour & crunch.<br/>
    Pure fruit, <span className="text-[#41622D] font-bold">nothing else.</span>
   </span>
  ),
  badges: (
   <div className="flex gap-6 mt-8 mb-4 max-w-2xl">
    <div className="flex flex-col items-center text-center gap-2">
     <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center"><Snowflake className="w-6 h-6 text-gray-800" /></div>
     <span className="text-xs text-gray-800 font-semibold leading-tight">Freeze-Dried<br/>Goodness</span>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
     <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center"><CheckCircle2 className="w-6 h-6 text-gray-800" /></div>
     <span className="text-xs text-gray-800 font-semibold leading-tight">100%<br/>Real Fruit</span>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
     <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center relative">
      <Leaf className="w-6 h-6 text-gray-800" />
      <div className="absolute inset-0 border-t-2 border-gray-700 rotate-45 transform origin-center w-[120%] -left-[10%]"></div>
     </div>
     <span className="text-xs text-gray-800 font-semibold leading-tight">No Added Sugar<br/>or Preservatives</span>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
     <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center relative">
      <FlaskConical className="w-6 h-6 text-gray-800" />
      <div className="absolute inset-0 border-t-2 border-gray-700 rotate-45 transform origin-center w-[120%] -left-[10%]"></div>
     </div>
     <span className="text-xs text-gray-800 font-semibold leading-tight">Clean. Natural.<br/>Wholesome.</span>
    </div>
   </div>
  ),
  overlay: "bg-gradient-to-r from-white/60 via-white/20 to-transparent",
  buttonText: "EXPLORE FLAVOURS",
  buttonClass: "bg-[#657841] text-white hover:bg-[#41622D]"
 }
];

const categories = [
 {
  title: 'Smoothie Premix',
  description: 'The ultimate nutrition shortcut. 100% raw freeze-dried fruit powders designed for instant, high-nutrient smoothies.',
  image: '/beverage-2.png',
  path: '/smoothie-premix',
  tag: 'Instant',
 },
 {
  title: 'Chocolates',
  description: 'Premium single-origin chocolate elevated by the bold, tangy crunch of freeze-dried fruit. A sensory experience unlike any other.',
  image: '/premium-chocolate.png',
  path: '/chocolate',
  tag: 'Premium',
 },
 {
  title: 'Combos',
  description: 'Curated bundles of our finest products. Perfect for gifting, sampling, or stocking up your healthy pantry.',
  image: '/SliderImage/Photo_one.jpg',
  path: '/combos',
  tag: 'Best Value',
 },
 {
  title: 'Fruit Chunks & Powders',
  description: 'The pure essence of fruit. Choose between crunchy whole chunks for snacking or ultra-fine powders for blending and baking.',
  image: '/milk-chocolate-chunks.png',
  path: '/fruit-powder-chunks',
  tag: 'Versatile',
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
  desc: 'Enjoy the taste of summer strawberries in January. Our products last up to 25 years sealed and stay fresh for 12 months once opened.',
 },
];

const testimonials = [
 {
  name: 'Sarah M.',
  role: 'Nutritionist',
  quote: 'I recommend Freeze Fruit to all my clients. The powder is incredible in smoothies and the ingredient list is exactly what it should be just fruit.',
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
  console.log("hello")
 const [heroIndex, setHeroIndex] = React.useState(0);
 // Auto-play hero
 React.useEffect(() => {
  const timer = setInterval(() => {
   setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  }, 6000);
  return () => clearInterval(timer);
 }, []);

 const nextHero = () => setHeroIndex((prev) => (prev + 1) % heroSlides.length);
 const prevHero = () => setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

 return (
  <div className="min-h-screen bg-black">
   <Header />

   {/* Hero */}
   <section className="relative pt-16 h-[90vh] lg:h-screen flex items-center overflow-hidden bg-black">
    <AnimatePresence mode="wait">
     <motion.div
      key={heroIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-0"
     >
      <img
       src={heroSlides[heroIndex].image}
       alt="Hero Slide"
       className="w-full h-full object-cover"
      />
      <div className={`absolute inset-0 ${heroSlides[heroIndex].overlay}`} />
     </motion.div>
    </AnimatePresence>

    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
     <div className="max-w-2xl">
      <AnimatePresence mode="wait">
       <motion.div
        key={heroIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
       >
        <div className="mb-4">
         {heroSlides[heroIndex].subtitle}
        </div>

        <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
         {heroSlides[heroIndex].title}
        </h1>

        <p className="mb-2">
         {heroSlides[heroIndex].description}
        </p>

        {heroSlides[heroIndex].badges}
       </motion.div>
      </AnimatePresence>

      <motion.div
       initial={{ opacity: 0, y: 24 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, delay: 0.3 }}
       className="flex flex-col sm:flex-row gap-4"
      >
       <Link
        to="/products"
        className={`inline-flex items-center justify-center gap-2 px-8 py-4 ${heroSlides[heroIndex].buttonClass} font-semibold rounded-full transition-all duration-200 focus:outline-none shadow-lg`}
       >
        {heroSlides[heroIndex].buttonText}
        <ArrowRight className="w-4 h-4" />
       </Link>
      </motion.div>
     </div>
    </div>

    {/* Hero Controls */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
     <button
      onClick={prevHero}
      className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
     >
      <ChevronLeft className="w-6 h-6" />
     </button>
     <div className="flex gap-2">
      {heroSlides.map((_, i) => (
       <button
        key={i}
        onClick={() => setHeroIndex(i)}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === heroIndex ? "bg-[#D4AF37] w-8" : "bg-white/30"
         }`}
       />
      ))}
     </div>
     <button
      onClick={nextHero}
      className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
     >
      <ChevronRight className="w-6 h-6" />
     </button>
    </div>
   </section>

   {/* Trust Badges */}
   <TrustBadges />

   {/* Categories */}
   <section className="py-24 bg-black overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
     >
      <span className="inline-block px-4 py-1.5 bg-white/5 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full border border-white/10 mb-4">
       Our Products
      </span>
      <h2 className="font-serif text-4xl font-bold text-white mb-4">
       Four Ways to Love Fruit
      </h2>
      <p className="text-white/70 text-lg max-w-2xl mx-auto">
       Whether you're blending, baking, snacking, or gifting we have the perfect freeze-dried fruit product for every moment.
      </p>
     </motion.div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
      {categories.map((cat, i) => (
       <CategoryCard key={i} {...cat} index={i} />
      ))}
     </div>
    </div>
   </section>

   {/* Why Us */}
   <section className="py-24 bg-white/5">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
       initial={{ opacity: 0, x: -24 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6 }}
      >
       <span className="inline-block px-4 py-1.5 bg-black text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full border border-white/10 mb-6">
        Why Freeze Drying?
       </span>
       <h2 className="font-serif text-4xl font-bold text-white mb-6 leading-tight">
        The Science of Keeping Fruit{' '}
        <span className="text-[#D4AF37]">Perfect</span>
       </h2>
       <p className="text-white/70 text-base leading-relaxed mb-10">
        Freeze drying is the gold standard of food preservation. By removing moisture at sub-zero temperatures, we lock in the color, flavor, and nutrition of fruit at its absolute peak without a single additive.
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
          <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
           <item.icon className="w-5 h-5 text-black" />
          </div>
          <div>
           <h3 className="font-semibold text-white mb-1">{item.title}</h3>
           <p className="text-white/70 text-sm leading-relaxed">
            {item.desc.split(/(heat)/i).map((part, i) =>
             part.toLowerCase() === 'heat' ? <span key={i} className="text-[#D4AF37] font-bold">{part}</span> : part
            )}
           </p>
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
       <div className="absolute -bottom-6 -left-6 bg-black rounded-2xl p-6 shadow-xl border border-white/10">
        <p className="font-serif text-3xl font-bold text-[#D4AF37]">97%</p>
        <p className="text-white/70 text-sm font-medium">Nutrients Preserved</p>
       </div>
      </motion.div>
     </div>
    </div>
   </section>

   {/* Testimonials */}
   {/* <section className="py-24 bg-white">
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
   </section> */}

   {/* CTA Banner */}
   <section className="py-24 bg-black relative overflow-hidden border-t border-white/10">
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
       <span className="text-[#D4AF37]">Difference?</span>
      </h2>
      <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
       Explore our full range of freeze-dried fruit products and discover why thousands of health-conscious families choose Freeze Fruit.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
       <Link
        to="/products"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-full hover:bg-[#BF953F] hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] shadow-lg"
       >
        Shop Products
        <ArrowRight className="w-4 h-4" />
       </Link>
       {/* <Link
        to="/contact"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white/30 hover:bg-white/10 hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
       >
        Bulk Orders
       </Link> */}
      </div>
     </motion.div>
    </div>
   </section>

   <Footer />
  </div>
 );
}

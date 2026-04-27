import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Heart, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrustBadges from '../components/TrustBadges';
import CategoryCard from '../components/CategoryCard';
import { AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&h=900&fit=crop",
    title: "Peak Wellness, Powered By Nature",
    subtitle: "100% Raw Nutrition",
    description: "Our unique freeze drying process preserves 97% of vitamins and minerals without heat. No added sugars, no preservatives—just the pure essence of peak-harvested fruit.",
    color: "#f4a435"
  },
  {
    image: "/hero-lifestyle.png",
    title: "Clean Energy for Your Lifestyle",
    subtitle: "Natural Superfoods",
    description: "Fuel your body with nutrient-dense snacks and elixirs designed for the modern wellness-seeker. Pure, plant-based power in every bite.",
    color: "#e85d26"
  },
  {
    image: "/beverage-1.png",
    title: "Detoxify and Rejuvenate",
    subtitle: "Wellness Elixirs",
    description: "Recharge with our new line of cold-pressed, fruit-infused elixirs. Crafted with antioxidants and raw nutrients to keep you vibrant and hydrated.",
    color: "#27ae60"
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
    desc: 'Enjoy the taste of summer strawberries in January. Our products last up to 25 years sealed  and stay fresh for 12 months once opened.',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Nutritionist',
    quote: 'I recommend Freeze Fruit to all my clients. The powder is incredible in smoothies and the ingredient list is exactly what it should be — just fruit.',
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
              alt={heroSlides[heroIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
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
                <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/90 text-black text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
                  {heroSlides[heroIndex].subtitle}
                </span>

                <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                  {heroSlides[heroIndex].title.split(', ').map((part, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && ", "}
                      {part.includes("Locked In") || part.includes("Flavor") ? (
                        <span className="text-[#D4AF37]">{part}</span>
                      ) : (
                        part
                      )}
                    </React.Fragment>
                  ))}
                </h1>

                <p className="text-white/85 text-lg leading-relaxed mb-10">
                  {heroSlides[heroIndex].description.split(/(heat)/i).map((part, i) =>
                    part.toLowerCase() === 'heat' ? <span key={i} className="text-[#D4AF37] font-bold">{part}</span> : part
                  )}
                </p>
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-full hover:bg-[#BF953F] hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shadow-lg"
              >
                Shop Products
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                Freeze drying is the gold standard of food preservation. By removing moisture at sub-zero temperatures, we lock in the color, flavor, and nutrition of fruit at its absolute peak  without a single additive.
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

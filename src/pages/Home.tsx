import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Heart, Package, ChevronLeft, ChevronRight, Leaf, FlaskConical, Timer, Dumbbell, Briefcase, Laptop, Baby, Sparkles, Snowflake, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrustBadges from '../components/TrustBadges';
import CategoryCard from '../components/CategoryCard';
import WhyFreezeDryingSection from '../components/WhyFreezeDryingSection';
import { AnimatePresence } from 'framer-motion';

/** Shared hero typography & spacing — keeps slides visually aligned across breakpoints */
const heroBrand =
  'font-serif italic text-3xl sm:text-[2.35rem] lg:text-5xl leading-none tracking-tight drop-shadow-sm';
const heroTagline =
  'font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] leading-snug';
const heroHeadline =
  'font-serif font-bold text-[clamp(2rem,5vw+1rem,4.25rem)] leading-[1.08] tracking-tight [&_span]:block [&>span+span]:mt-1 sm:[&>span+span]:mt-2';
const heroDescription = 'font-sans text-base sm:text-lg font-medium leading-relaxed max-w-xl lg:max-w-[32rem]';
/** DM Sans + !important so Radix Theme / globals cannot swap the hero body font between slides */
const heroBodyText = `${heroDescription} !font-sans`;
/** Tight horizontal rhythm: content-sized grid so 4-up row does not stretch with huge gutters */
const heroBadgeGrid =
  'inline-grid w-max max-w-full grid-cols-2 sm:grid-cols-4 gap-x-1.5 gap-y-2 sm:gap-x-2 sm:gap-y-2 mt-6 sm:mt-8 mb-4 justify-items-center';
/** Fruit Chunks slide: even tighter gutters so four icons read as one cluster */
const heroBadgeGridSlide3 =
  'inline-grid w-max max-w-full grid-cols-2 sm:grid-cols-4 gap-x-0.5 gap-y-1.5 sm:gap-x-1 sm:gap-y-1.5 mt-6 sm:mt-8 mb-4 justify-items-center';
const heroBadgeIconWrap =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 sm:h-12 sm:w-12';
const heroBadgeLabel =
  'font-sans text-[10px] sm:text-xs font-semibold leading-tight text-center [text-wrap:balance]';

const heroSlides = [
  {
    image: "/SliderImage/Slideone.png",
    subtitle: (
      <div className="flex flex-col items-start gap-1 sm:gap-1.5">
        <span className={`${heroBrand} text-[#9A7B3E]`}>SipReal</span>
        <span className={`${heroTagline} text-black`}>Freeze-dried smoothie mix</span>
      </div>
    ),
    title: (
      <>
        <span className="text-black drop-shadow-sm">Real Fruit.</span>
        <span className="text-[#9A7B3E] drop-shadow-sm">Instant Energy.</span>
      </>
    ),
    description: (
      <span className={`${heroBodyText} text-black`}>
        Shake it. Sip it. Feel the <span className="font-semibold text-[#9A7B3E]">difference</span> in seconds.
      </span>
    ),
    badges: (
      <div className={`${heroBadgeGrid} rounded-xl border border-white/60 bg-white/60 p-2 sm:p-2.5 shadow-lg backdrop-blur-md`}>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className={`${heroBadgeIconWrap} border-black bg-white/40`}>
            <Leaf className="h-4 w-4 text-black sm:h-5 sm:w-5" strokeWidth={2.5} />
          </div>
          <span className={`${heroBadgeLabel} text-black`}>No added sugar</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className={`${heroBadgeIconWrap} border-black bg-white/40`}>
            <FlaskConical className="h-4 w-4 text-black sm:h-5 sm:w-5" strokeWidth={2.5} />
          </div>
          <span className={`${heroBadgeLabel} text-black`}>No preservatives</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className={`${heroBadgeIconWrap} border-black bg-white/40`}>
            <CheckCircle2 className="h-4 w-4 text-black sm:h-5 sm:w-5" strokeWidth={2.5} />
          </div>
          <span className={`${heroBadgeLabel} text-black`}>100% real fruit</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className={`${heroBadgeIconWrap} border-black bg-white/40`}>
            <Timer className="h-4 w-4 text-black sm:h-5 sm:w-5" strokeWidth={2.5} />
          </div>
          <span className={`${heroBadgeLabel} text-black`}>Ready in 10 seconds</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className={`${heroBadgeIconWrap} border-black bg-white/40`}>
            <Dumbbell className="h-4 w-4 text-black sm:h-5 sm:w-5" strokeWidth={2.5} />
          </div>
          <span className={`${heroBadgeLabel} text-black`}>Best for gym</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className={`${heroBadgeIconWrap} border-black bg-white/40`}>
            <Briefcase className="h-4 w-4 text-black sm:h-5 sm:w-5" strokeWidth={2.5} />
          </div>
          <span className={`${heroBadgeLabel} text-black`}>Perfect for travel</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className={`${heroBadgeIconWrap} border-black bg-white/40`}>
            <Laptop className="h-4 w-4 text-black sm:h-5 sm:w-5" strokeWidth={2.5} />
          </div>
          <span className={`${heroBadgeLabel} text-black`}>Great for office</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className={`${heroBadgeIconWrap} border-black bg-white/40`}>
            <Baby className="h-4 w-4 text-black sm:h-5 sm:w-5" strokeWidth={2.5} />
          </div>
          <span className={`${heroBadgeLabel} text-black`}>Loved by kids</span>
        </div>
      </div>
    ),
    overlay: "",
    buttonText: "TRY SIPREAL NOW",
    buttonClass: "bg-[#C49E5D] text-white hover:bg-[#A58242]"
  },
  {
    image: "/SliderImage/Slidetwo.png",
    subtitle: (
      <div className="flex flex-col items-start gap-1 sm:gap-1.5">
        <span className={`${heroBrand} text-[#D4AF37]`}>FreezeFusion</span>
        <span className={`${heroTagline} text-neutral-200`}>Gourmet chocolates</span>
      </div>
    ),
    title: (
      <>
        <span className="text-white">Real Fruit.</span>
        <span className="text-white">Real Chocolate.</span>
        <span className="text-[#D4AF37]">Real Bliss.</span>
      </>
    ),
    description: (
      <span className={`${heroBodyText} text-neutral-200`}>
        Freeze-dried fruits meet premium chocolate for a crunch that melts your heart.
      </span>
    ),
    badges: (
      <div className={heroBadgeGrid}>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className={`${heroBadgeIconWrap} border border-[#D4AF37] bg-black/20`}>
            <CheckCircle2 className="h-5 w-5 text-[#D4AF37] sm:h-6 sm:w-6" />
          </div>
          <span className={`${heroBadgeLabel} text-neutral-200`}>Real fruit inside</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className={`${heroBadgeIconWrap} border border-[#D4AF37] bg-black/20`}>
            <Sparkles className="h-5 w-5 text-[#D4AF37] sm:h-6 sm:w-6" />
          </div>
          <span className={`${heroBadgeLabel} text-neutral-200`}>Irresistible crunch</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className={`${heroBadgeIconWrap} border border-[#D4AF37] bg-black/20`}>
            <Package className="h-5 w-5 text-[#D4AF37] sm:h-6 sm:w-6" />
          </div>
          <span className={`${heroBadgeLabel} text-neutral-200`}>Premium chocolate</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className={`${heroBadgeIconWrap} border border-[#D4AF37] bg-black/20`}>
            <Leaf className="h-5 w-5 text-[#D4AF37] sm:h-6 sm:w-6" />
          </div>
          <span className={`${heroBadgeLabel} text-neutral-200`}>No artificial flavours</span>
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
      <div className="flex flex-col items-start gap-1 sm:gap-1.5">
        <span className="flex flex-wrap items-center gap-2">
          <span className={`${heroBrand} text-[#41622D]`}>Fruit Chunks</span>
          <Leaf className="h-5 w-5 shrink-0 text-[#41622D] sm:h-6 sm:w-6" aria-hidden />
        </span>
        <span className={`${heroTagline} text-[#41622D]`}>Pure freeze-dried fruit</span>
      </div>
    ),
    title: (
      <>
        <span className="text-[#213b14] drop-shadow-sm">Real Fruit.</span>
        <span className="text-[#A83232] drop-shadow-sm">Real Crunch.</span>
      </>
    ),
    description: (
      <span className={`${heroBodyText} text-neutral-900`}>
        Freeze-dried to lock in nutrition, flavour & crunch. Pure fruit,{' '}
        <span className="!font-sans font-semibold text-[#41622D]">nothing else.</span>
      </span>
    ),
    badges: (
      <div className={heroBadgeGridSlide3}>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className={`${heroBadgeIconWrap} border-neutral-700 bg-white/40`}>
            <Snowflake className="h-5 w-5 text-neutral-800 sm:h-6 sm:w-6" />
          </div>
          <span className={`${heroBadgeLabel} max-w-[5.25rem] text-neutral-900`}>Freeze-dried goodness</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className={`${heroBadgeIconWrap} border-neutral-700 bg-white/40`}>
            <CheckCircle2 className="h-5 w-5 text-neutral-800 sm:h-6 sm:w-6" />
          </div>
          <span className={`${heroBadgeLabel} max-w-[5rem] text-neutral-900`}>100% real fruit</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className={`${heroBadgeIconWrap} border-neutral-700 bg-white/40`}>
            <Leaf className="h-5 w-5 text-neutral-800 sm:h-6 sm:w-6" />
          </div>
          <span className={`${heroBadgeLabel} max-w-[5.5rem] text-neutral-900`}>
            No added sugar or preservatives
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className={`${heroBadgeIconWrap} border-neutral-700 bg-white/40`}>
            <FlaskConical className="h-5 w-5 text-neutral-800 sm:h-6 sm:w-6" />
          </div>
          <span className={`${heroBadgeLabel} max-w-[5.25rem] text-neutral-900`}>Clean, natural, wholesome</span>
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
    subheading: 'Ready in 10 sec',
    description: 'The ultimate nutrition shortcut. 100% raw freeze-dried fruit powders designed for instant, high-nutrient smoothies.',
    image: '/beverage-2.png',
    path: '/smoothie-premix',
    tag: 'Instant',
  },
  {
    title: 'Chocolates',
    subheading: 'Real fruit + premium indulgence',
    description: 'Premium single-origin chocolate elevated by the bold, tangy crunch of freeze-dried fruit. A sensory experience unlike any other.',
    image: '/premium-chocolate.png',
    path: '/chocolate',
    tag: 'Premium',
  },
  {
    title: 'Combos',
    subheading: 'Best value packs for everyday snacking.',
    description: 'Curated bundles of our finest products. Perfect for gifting, sampling, or stocking up your healthy pantry.',
    image: '/SliderImage/Photo_one.jpg',
    path: '/combos',
    tag: 'Best Value',
  },
  {
    title: 'Fruit Chunks & Powders',
    subheading: 'Snack smarter',
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

      {/* Hero — consistent vertical rhythm; padding clears fixed nav + carousel controls */}
      <section className="relative flex min-h-[78vh] flex-col justify-center overflow-hidden bg-black pt-16 sm:min-h-[82vh] lg:min-h-[90vh]">
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
              className="h-full w-full object-cover object-center"
            />
            {heroSlides[heroIndex].overlay ? (
              <div className={`absolute inset-0 ${heroSlides[heroIndex].overlay}`} />
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-[clamp(5.5rem,14vw,9rem)] pt-[clamp(1.5rem,3.5vw,3rem)] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4 sm:gap-5"
              >
                <div className="shrink-0">{heroSlides[heroIndex].subtitle}</div>

                <h1 className={`${heroHeadline} mb-0 sm:mb-1`}>{heroSlides[heroIndex].title}</h1>

                <div className="max-w-prose">{heroSlides[heroIndex].description}</div>

                {heroSlides[heroIndex].badges}
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={`cta-${heroIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row"
            >
              <Link
                to="/products"
                className={`inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-base ${heroSlides[heroIndex].buttonClass}`}
              >
                {heroSlides[heroIndex].buttonText}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hero Controls */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 sm:bottom-8 sm:gap-6 lg:bottom-10">
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

      <WhyFreezeDryingSection />

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
            src="/ready_difference.png"
            alt=""
            aria-hidden="true"
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
              Start Your Healthy Routine{' '}
              <span className="text-[#D4AF37]">Today</span>
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

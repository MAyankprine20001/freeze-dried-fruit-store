import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Heart, Package, Plus } from 'lucide-react';

const intro =
  'Freeze drying is one of the most advanced ways to preserve fruit. By removing moisture at low temperatures, it helps retain the natural taste, color, and nutrients  without adding anything artificial.';

const features: {
  icon: typeof Zap;
  title: string;
  description: React.ReactNode;
}[] = [
  {
    icon: Zap,
    title: 'Peak Nutrition Locked In',
    description: (
      <>
        Our freeze-drying process helps preserve most of the natural vitamins and minerals found in
        fresh fruit  without using{' '}
        <span className="font-semibold text-[#D4AF37]">heat</span> that can reduce nutritional value.
      </>
    ),
  },
  {
    icon: Heart,
    title: '100% Real Fruit. Nothing Else.',
    description:
      'No added sugar, no artificial flavors, no preservatives. Just carefully selected fruit, freeze-dried to keep it clean, simple, and natural.',
  },
  {
    icon: Package,
    title: 'Long Shelf Life, Less Waste',
    description:
      'Stays fresh for months when stored properly. Enjoy real fruit whenever you like.',
  },
];

export default function WhyFreezeDryingSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-black py-16 pb-24 sm:py-20 sm:pb-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="text-left"
          >
            <header className="mb-8 max-w-xl sm:mb-10">
              <span className="inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37] sm:text-[11px]">
                Why freeze drying?
              </span>
              <h2 className="mt-5 font-serif text-[clamp(2rem,4.5vw+0.75rem,3.35rem)] font-bold leading-[1.1] tracking-tight sm:mt-6">
                <span className="block text-white">The Science of</span>
                <span className="block text-[#D4AF37]">Keeping Fruit</span>
                <span className="block text-[#D4AF37]">Perfect</span>
              </h2>
            </header>
            <p className="mb-10 max-w-xl text-base font-medium leading-relaxed text-white/90">
              {intro}
            </p>
            <ul className="flex flex-col gap-9 sm:gap-10">
              {features.map(({ icon: Icon, title, description }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-4 sm:gap-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-black shadow-md sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} aria-hidden />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="mb-2 font-sans text-base font-bold text-white sm:text-lg">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/65 sm:text-[15px]">
                      {description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-2xl rounded-b-[1.75rem] border border-white/10 shadow-2xl sm:rounded-3xl sm:rounded-b-[2rem]">
              <img
                src="/freeze_dying.png"
                alt="Freeze-dried fruit — colourful pieces and powder on a dark surface"
                className="aspect-[4/5] w-full object-cover object-center sm:aspect-[5/6] lg:min-h-[420px] lg:aspect-auto lg:min-h-[480px]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Link
        to="/products"
        className="absolute bottom-6 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-black shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-6 lg:bottom-8 lg:right-8"
        aria-label="Shop products"
      >
        <Plus className="h-7 w-7" strokeWidth={2.5} aria-hidden />
      </Link>
    </section>
  );
}

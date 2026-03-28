import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const faqs = [
  {
    q: 'How long do freeze-dried fruit products last?',
    a: 'Our freeze-dried fruit products have an exceptional shelf life. Sealed and stored in a cool, dry place away from direct sunlight, they last up to 25 years. Once opened, we recommend consuming within 12 months for optimal flavor and texture. Always reseal the bag tightly after each use.',
  },
  {
    q: 'How should I store freeze-dried fruit?',
    a: 'Store your FrostFruit products in a cool, dry location away from direct sunlight and heat sources. A pantry or kitchen cupboard is ideal. Avoid storing near the stove or in humid environments. Once opened, press out as much air as possible before resealing. Refrigeration is not necessary and can actually introduce unwanted moisture.',
  },
  {
    q: 'What are the ingredients in your products?',
    a: 'Every FrostFruit product contains exactly one ingredient: the fruit named on the label. No added sugar, no preservatives, no artificial flavors, no flow agents, no fillers. Our fruit powder and chunks are made from 100% whole fruit that has been freeze-dried and (in the case of powder) milled. Our chocolate products contain the chocolate ingredients plus the named freeze-dried fruit — all clearly listed on the label.',
  },
  {
    q: 'Are your products certified Non-GMO and Gluten Free?',
    a: 'Yes. All FrostFruit products are Non-GMO and naturally gluten-free. Our fruit products are also free from the top 14 allergens. Our chocolate products are produced in a facility that handles tree nuts and dairy — please check individual product labels if you have specific allergen concerns. We are committed to full transparency on all certifications and production practices.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'We currently ship throughout the United States and Canada. International shipping to select European and Asia-Pacific countries is available — please contact us for specific country availability and shipping rates. All orders are shipped in moisture-barrier packaging to ensure your products arrive in perfect condition regardless of transit time.',
  },
  {
    q: 'Do you offer bulk or wholesale orders?',
    a: 'Absolutely. We work with bakeries, smoothie bars, health food retailers, food manufacturers, and corporate gifting programs. Bulk pricing is available for orders over 5kg of any single product. For wholesale accounts, custom packaging, and private label options, please reach out via our contact form and our team will respond within 2 business days.',
  },
  {
    q: 'What is the difference between freeze-dried fruit powder and freeze-dried fruit chunks?',
    a: 'Both products start from the same whole fruit and use the same freeze-drying process — the difference is in the final form. Fruit chunks are pieces of freeze-dried fruit that retain their shape and deliver a satisfying crunch. They\'re ideal for snacking, trail mix, and toppings. Fruit powder is made by milling freeze-dried fruit into a fine powder that dissolves easily in liquids and batters — perfect for smoothies, baking, and natural food coloring. Both contain identical nutrition; the choice depends on your intended use.',
  },
  {
    q: 'Are freeze-dried fruit products suitable for children?',
    a: 'Yes, our freeze-dried fruit products are an excellent choice for children. They contain nothing but real fruit — no added sugar, no artificial colors, no preservatives — making them a genuinely healthy snack option. The fruit chunks are a great alternative to candy or processed snacks. For very young children (under 12 months), we recommend consulting your pediatrician before introducing any new food. The powder can be stirred into purees and porridge for toddlers from 6 months, subject to your healthcare provider\'s guidance.',
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-[#f0d9c8] rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left bg-white hover:bg-[#fdf3ec] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] focus-visible:ring-inset"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#1a1a1a] text-base pr-4">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#e85d26] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 bg-[#fdf3ec] border-t border-[#f0d9c8]">
              <p className="text-[#6a5a4a] text-sm leading-relaxed pt-4">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        tag="Frequently Asked Questions"
        title="Everything You Need"
        highlight="to Know"
        description="Got questions about freeze-dried fruit, our products, or how to order? We've answered the most common ones below. Can't find what you're looking for? Reach out — we're happy to help."
      />

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center p-10 bg-[#fdf3ec] rounded-2xl border border-[#f0d9c8]"
          >
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-3">
              Still Have Questions?
            </h2>
            <p className="text-[#6a5a4a] text-sm mb-6">
              Our team is happy to help with anything not covered above.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#e85d26] text-white font-semibold rounded-full hover:bg-[#d44f1a] hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] focus-visible:ring-offset-2"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { Link } from "react-router-dom";

const faqs = [
 {
  q: "What are freeze-dried fruits?",
  a: "Freeze-dried fruits are fresh fruits that have been dehydrated using advanced freeze-drying technology, which removes water while preserving up to 97% of nutrients, taste, and color.",
 },
 {
  q: "Are freeze-dried fruits healthy?",
  a: "Yes! They retain most of the vitamins, minerals, and antioxidants of fresh fruits, with no added preservatives or chemicals.",
 },
 {
  q: "Do your products contain added sugar or preservatives?",
  a: "No, our products are 100% natural with no added sugar, artificial flavors, or preservatives.",
 },
 {
  q: "How do I use smoothie premix?",
  a: "Simply add milk, water, or yogurt to the premix, blend or shake well, and your smoothie is ready in seconds.",
 },
 {
  q: "What is the shelf life of freeze-dried products?",
  a: "Freeze-dried fruits have a long shelf life (typically 6–12 months or more) when stored in a cool, dry place.",
 },
 {
  q: "Can I use fruit powders in baking or cooking?",
  a: "Absolutely! Our fruit powders are perfect for smoothies, baking, desserts, ice creams, and beverages.",
 },
 {
  q: "Are your products suitable for kids?",
  a: "Yes, they are completely natural and safe for kids, making them a healthy snacking option.",
 },
 {
  q: "Do you offer bulk or wholesale supply?",
  a: "Yes, we supply freeze-dried fruit powders and chunks in bulk for cafes, bakeries, and food businesses.",
 },
 {
  q: "How should I store freeze-dried fruits?",
  a: "Store them in an airtight container in a cool, dry place away from moisture for best quality.",
 },
 {
  q: "Do you offer customized products for businesses?",
  a: "Yes, we provide customized solutions including specific fruit types, cuts, and packaging for bulk buyers.",
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
   className="border border-white/10 rounded-xl overflow-hidden"
  >
   <button
    id={`faq-btn-${index}`}
    onClick={() => setOpen(!open)}
    className="w-full flex items-center justify-between gap-4 p-6 text-left bg-white/5 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-inset"
    aria-expanded={open}
    aria-controls={`faq-content-${index}`}
   >
    <span className="font-semibold text-white text-base pr-4">{q}</span>
    <ChevronDown
     className={`w-5 h-5 text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    />
   </button>
   <AnimatePresence initial={false}>
    {open && (
     <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
     >
       <div id={`faq-content-${index}`} className="overflow-hidden">
       <div className="px-6 pb-6 bg-white/5 border-t border-white/10">
        <p className="text-white/70 text-sm leading-relaxed pt-4">{a}</p>
       </div>
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </motion.div>
 );
}

export default function FAQ() {
 return (
  <div className="min-h-screen bg-black">
   <Header />

   <PageHero
    tag="Frequently Asked Questions"
    title="Everything You Need"
    highlight="to Know"
    description="Got questions about freeze-dried fruit, our products, or how to order? We've answered the most common ones below. Can't find what you're looking for? Reach out we're happy to help."
   />

    <section className="py-24 bg-black">
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
      className="mt-16 text-center p-10 bg-white/5 rounded-2xl border border-white/10"
     >
      <h2 className="font-serif text-2xl font-bold text-white mb-3">
       Still Have Questions?
      </h2>
      <p className="text-white/60 text-sm mb-6">
       Our team is happy to help with anything not covered above.
      </p>
      <Link
       id="faq-cta-contact-btn"
       to="/contact"
       className="inline-flex items-center justify-center px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-full hover:bg-[#BF953F] hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
      >
       Contact Us
      </Link>
     </motion.div>
    </div>
   </section>

   <Footer />
  </div>
 );
}

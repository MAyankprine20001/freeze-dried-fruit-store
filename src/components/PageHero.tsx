import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
 tag?: string;
 title: string;
 highlight?: string;
 description: string;
 image?: string;
 tint?: string;
}

export default function PageHero({ tag, title, highlight, description, image, tint = 'from-black/80' }: PageHeroProps) {
 return (
  <section className="relative pt-16 overflow-hidden bg-black">
   {image && (
    <div className="absolute inset-0 z-0">
     <img
      src={image}
      alt=""
      aria-hidden="true"
      width={1600}
      height={600}
      className="w-full h-full object-cover opacity-60"
     />
     <div className={`absolute inset-0 bg-gradient-to-r ${tint} via-black/40 to-transparent`} />
    </div>
   )}
   <div className={`relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-24 text-white`}>
    {tag && (
     <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 bg-white/10 text-[#D4AF37] border border-white/20 backdrop-blur-sm"
     >
      {tag}
     </motion.span>
    )}
    <motion.h1
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, delay: 0.1 }}
     className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-6"
    >
     {title}{' '}
     {highlight && (
      <span className="text-[#D4AF37]">{highlight}</span>
     )}
    </motion.h1>
    <motion.p
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, delay: 0.2 }}
     className="text-lg leading-relaxed max-w-2xl text-white/80"
    >
     {description}
    </motion.p>
   </div>
  </section>
 );
}

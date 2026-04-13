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

export default function PageHero({ tag, title, highlight, description, image, tint = 'from-[#e85d26]/80' }: PageHeroProps) {
  return (
    <section className="relative pt-16 overflow-hidden">
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            width={1600}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${tint} to-[#1a1a1a]/70`} />
        </div>
      )}
      <div className={`relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-24 ${image ? 'text-white' : 'text-[#1a1a1a]'}`}>
        {tag && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 ${image ? 'bg-white/20 text-white border border-white/30' : 'bg-[#fdf3ec] text-[#e85d26] border border-[#f0d9c8]'
              }`}
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
            <span className={image ? 'text-[#f4a435]' : 'text-[#e85d26]'}>{highlight}</span>
          )}
        </motion.h1>
      </div>
    </section>
  );
}

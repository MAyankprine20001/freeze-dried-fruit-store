import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  path: string;
  tag: string;
  index: number;
}

export default function CategoryCard({ title, description, image, path, tag, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link
        to={path}
        className="group flex flex-col h-full bg-black rounded-2xl overflow-hidden border border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <div className="relative overflow-hidden h-56 flex-shrink-0">
          <img
            src={image}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 bg-[#D4AF37] text-black text-xs font-semibold rounded-full">
            {tag}
          </span>
        </div>
        <div className="p-8 flex flex-col flex-1">
          <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-200">
            {title}
          </h3>
          <div className="mt-auto flex items-center gap-2 text-[#D4AF37] text-sm font-semibold">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

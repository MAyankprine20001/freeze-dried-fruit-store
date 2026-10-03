import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Testimonial } from "../data/testimonials";

interface Props {
  reviews: Testimonial[];
  /** Accent colour for the name and active controls (matches each page). */
  accent?: string;
  /** Wrap the quote in a white card (used on category pages). */
  card?: boolean;
  /** Auto-advance delay in ms (0 turns it off). */
  interval?: number;
}

/**
 * One-at-a-time slider for real customer reviews. Stars appear only when the customer gave a rating.
 * Advances on its own; pauses while hovered/focused, and supports swipe on touch screens.
 */
export default function ReviewSlider({ reviews, accent = "#3F622D", card = false, interval = 4000 }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = reviews.length;

  // Restarts after every change (manual or automatic), so a click always gets a full interval.
  useEffect(() => {
    if (!interval || paused || count < 2) return;
    const t = window.setTimeout(() => setI((p) => (p + 1) % count), interval);
    return () => window.clearTimeout(t);
  }, [i, paused, count, interval]);

  if (count === 0) return null;
  const idx = i % count;
  const r = reviews[idx];
  const go = (d: number) => setI((p) => (p + d + count) % count);

  return (
    <div
      className={card ? "bg-white p-6 sm:p-8 rounded-2xl border border-[#213B14]/5 shadow-sm" : ""}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      <AnimatePresence mode="wait">
      <motion.figure
        key={idx}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
        className="max-w-2xl mx-auto min-h-[150px] flex flex-col justify-center"
        aria-live={paused ? "polite" : "off"}
      >
        {r.rating ? (
          <div className="flex justify-center gap-1 mb-4" role="img" aria-label={`${r.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} className={`w-4 h-4 ${s < (r.rating ?? 0) ? "fill-amber-500 text-amber-500" : "text-amber-500/30"}`} />
            ))}
          </div>
        ) : null}
        <blockquote className="font-serif text-[#213B14] text-lg sm:text-xl italic leading-relaxed">“{r.text}”</blockquote>
        <figcaption className="mt-5">
          <span className="block font-bold text-sm uppercase tracking-wider" style={{ color: accent }}>
            — {r.author}
          </span>
          <span className="block mt-1 text-xs text-[#213B14]/55 font-semibold">{r.product}</span>
        </figcaption>
      </motion.figure>
      </AnimatePresence>

      {reviews.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-[#213B14]/20 flex items-center justify-center text-[#213B14] hover:bg-[#213B14] hover:text-[#FAF7F2] transition-all bg-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-[#213B14]/60 tabular-nums min-w-[3.5rem] text-center">
            {idx + 1} / {count}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-[#213B14]/20 flex items-center justify-center text-[#213B14] hover:bg-[#213B14] hover:text-[#FAF7F2] transition-all bg-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

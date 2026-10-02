import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Testimonial } from "../data/testimonials";

interface Props {
  reviews: Testimonial[];
  /** Accent colour for the name and active controls (matches each page). */
  accent?: string;
  /** Wrap the quote in a white card (used on category pages). */
  card?: boolean;
}

/** One-at-a-time slider for real customer reviews. Stars appear only when the customer gave a rating. */
export default function ReviewSlider({ reviews, accent = "#3F622D", card = false }: Props) {
  const [i, setI] = useState(0);
  if (reviews.length === 0) return null;
  const r = reviews[i];
  const go = (d: number) => setI((p) => (p + d + reviews.length) % reviews.length);

  return (
    <div className={card ? "bg-white p-6 sm:p-8 rounded-2xl border border-[#213B14]/5 shadow-sm" : ""}>
      <figure className="max-w-2xl mx-auto min-h-[150px] flex flex-col justify-center" aria-live="polite">
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
      </figure>

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
            {i + 1} / {reviews.length}
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

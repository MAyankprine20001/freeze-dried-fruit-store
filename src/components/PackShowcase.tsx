import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface PackSlide {
  name: string;
  front: string;
  back: string;
  /** Accent colour for the active dot. */
  color: string;
}

/**
 * All packs at once. Layers (back to front): the three back packs, then the two side
 * fronts, then the centre front — so every front stays readable.
 * slides[0] = centre (largest), slides[1] = left, slides[2] = right.
 */
export function PackLineup({ slides }: { slides: PackSlide[] }) {
  const [center, left, right] = slides;
  const img = (src: string, alt: string, cls: string, high = false) => (
    <img
      src={src}
      alt={alt}
      width={590}
      height={990}
      fetchPriority={high ? "high" : "auto"}
      className={`absolute bottom-0 w-auto object-contain ${cls}`}
    />
  );
  const backAlt = (s: PackSlide) => `Back of the Crispy Bites ${s.name} pack with ingredients and nutrition information`;
  const frontAlt = (s: PackSlide) => `Crispy Bites ${s.name} freeze-dried fruit pack`;

  return (
    <div className="relative mx-auto h-[190px] w-full max-w-[640px] sm:h-[320px] lg:h-[440px]">
      {/* Back packs (hidden on phones, where three fronts read more clearly) */}
      {left && img(left.back, backAlt(left), "z-0 hidden sm:block h-[66%] left-[-6%] bottom-[4%] -rotate-[12deg] drop-shadow-md")}
      {right && img(right.back, backAlt(right), "z-0 hidden sm:block h-[66%] right-[-6%] bottom-[4%] rotate-[12deg] drop-shadow-md")}
      {center && img(center.back, backAlt(center), "z-[1] hidden sm:block h-[84%] left-1/2 -translate-x-[78%] bottom-[8%] -rotate-[5deg] drop-shadow-md")}

      {/* Side fronts */}
      {left && img(left.front, frontAlt(left), "z-10 h-[62%] sm:h-[74%] left-[-8%] sm:left-[2%] -rotate-[6deg] drop-shadow-xl transition-transform duration-500 hover:-translate-y-2")}
      {right && img(right.front, frontAlt(right), "z-10 h-[62%] sm:h-[74%] right-[-8%] sm:right-[2%] rotate-[6deg] drop-shadow-xl transition-transform duration-500 hover:-translate-y-2")}

      {/* Centre front, on top */}
      {center && img(center.front, frontAlt(center), "z-20 h-[80%] sm:h-[92%] left-1/2 -translate-x-1/2 drop-shadow-2xl transition-transform duration-500 hover:-translate-y-2", true)}
    </div>
  );
}

/**
 * Hero showcase: real pack photos (front in front, back tilted behind),
 * cycling through flavours. Pauses on hover; dots let visitors pick a flavour.
 */
export default function PackShowcase({ slides, interval = 4000 }: { slides: PackSlide[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % slides.length), interval);
    return () => window.clearTimeout(t);
  }, [i, paused, slides.length, interval]);

  const s = slides[i];

  return (
    <div
      className="flex w-full flex-col items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex h-[200px] w-full items-end justify-center sm:h-[320px] lg:h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.name}
            className="absolute inset-0 flex items-end justify-center"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <img
              src={s.back}
              alt={`Back of the Crispy Bites ${s.name} pack with ingredients and nutrition information`}
              width={590}
              height={990}
              className="absolute h-[88%] w-auto object-contain -rotate-6 -translate-x-[30%] sm:-translate-x-[35%] opacity-95 drop-shadow-lg"
            />
            <img
              src={s.front}
              alt={`Crispy Bites ${s.name} freeze-dried fruit pack`}
              width={590}
              height={990}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="relative h-full w-auto object-contain rotate-3 translate-x-[18%] drop-shadow-xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <div className="mt-3 flex items-center gap-2 sm:mt-5" role="tablist" aria-label="Crispy Bites flavours">
          {slides.map((sl, n) => (
            <button
              key={sl.name}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={sl.name}
              onClick={() => setI(n)}
              className={`flex items-center justify-center rounded-full transition-all whitespace-nowrap
                h-6 min-w-6 p-[7px] sm:h-auto sm:min-w-0 sm:px-3 sm:py-1 text-xs font-bold uppercase tracking-wider ${
                n === i ? "text-white shadow-sm" : "bg-white/70 text-[#213B14]/70 hover:bg-white"
              }`}
              style={n === i ? { backgroundColor: sl.color } : undefined}
            >
              {/* Mobile: coloured dot; larger screens: flavour name */}
              <span className="block h-2.5 w-2.5 rounded-full sm:hidden" style={{ backgroundColor: n === i ? "#fff" : sl.color }} />
              <span className="hidden sm:inline">{sl.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Preload the other slides so switching is instant */}
      <div className="hidden" aria-hidden="true">
        {slides.map((sl) => (
          <span key={sl.name}>
            <link rel="preload" as="image" href={sl.front} />
          </span>
        ))}
      </div>
    </div>
  );
}

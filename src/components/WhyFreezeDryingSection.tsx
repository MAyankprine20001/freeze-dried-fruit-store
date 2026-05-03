import React from 'react';
import { Leaf, Snowflake, Droplets } from 'lucide-react';

export default function WhyFreezeDryingSection() {
  return (
    <section className="pt-24 pb-32 bg-black relative overflow-hidden min-h-[900px] border-y border-white/5">
      {/* Background Images Container - Locked to content width */}
      <div className="absolute inset-0 max-w-[1600px] mx-auto w-full pointer-events-none">
        {/* Fresh Fruit Image (Bottom Left) */}
        <div className="absolute -bottom-20 -left-10 lg:-left-20 w-[700px] h-[700px] z-0">
          <img src="/fresh_fruit_black_bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 px-6 py-2 border border-[#D4AF37]/30 rounded-full bg-black/90 backdrop-blur-sm text-[#D4AF37] text-[10px] tracking-[0.2em] font-bold uppercase shadow-xl pointer-events-auto">
            Fresh Fruit
          </div>
        </div>

        {/* Freeze-Dried Fruit Image (Middle/Right) */}
        <div className="absolute top-1/2 -translate-y-[40%] -right-10 lg:-right-20 w-[700px] h-[700px] z-0">
          <img src="/freeze_dried_black_bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 px-6 py-2 border border-[#D4AF37]/30 rounded-full bg-black/90 backdrop-blur-sm text-[#D4AF37] text-[10px] tracking-[0.2em] font-bold uppercase shadow-xl pointer-events-auto">
            Freeze-Dried Fruit
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-12 lg:-mt-16">
        {/* Left Column */}
        <div className="lg:col-span-4 relative z-10 pt-4 lg:pl-12">
          <span className="inline-block px-5 py-1.5 border border-[#D4AF37]/30 bg-[#120f09] text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-8 shadow-sm">
            Why Freeze Drying?
          </span>
          <h2 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
            The Science of <br />
            <span className="text-[#D4AF37]">Keeping Fruit</span>
            <br />
            <span className="text-[#D4AF37]">Perfect</span>
          </h2>
          <p className="text-white/70 text-sm leading-[1.8] max-w-sm mb-12">
            Freeze drying is the gold standard of food preservation. By removing moisture at sub-zero temperatures, we lock in the color, flavor, and nutrition of fruit at its absolute peak without a single additive.
          </p>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col items-center relative lg:col-span-4 pt-12 lg:-ml-8">
          {/* Logo */}
          <div className="w-36 h-36 rounded-full border border-[#D4AF37]/80 flex flex-col items-center justify-center mb-0 relative z-10 bg-black">
            <div className="flex flex-col items-center relative z-10 -mt-5">
              <Leaf className="w-6 h-6 text-[#D4AF37] mb-1" strokeWidth={1.5} />
              <h3 className="font-serif text-[42px] font-bold text-[#D4AF37] leading-none tracking-wider">TDF</h3>
            </div>
            <svg viewBox="0 0 100 100" className="w-[136px] h-[136px] absolute inset-0 m-auto pointer-events-none">
              <path id="curve" d="M 12 55 A 38 38 0 0 0 88 55" fill="transparent" />
              <text width="100" className="text-[8.5px] fill-[#D4AF37] tracking-[0.25em] font-bold uppercase">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  The Dry Factory
                </textPath>
              </text>
            </svg>
          </div>

          {/* Main Vertical Line */}
          <div className="absolute top-[180px] bottom-10 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-transparent" />

          {/* Timeline Steps */}
          <div className="relative w-full mt-16 lg:mt-24 flex flex-col items-center">
            {/* Step 1 */}
            <div className="relative w-full h-11 mb-24 lg:mb-32">
              <div className="absolute left-1/2 -translate-x-1/2 -top-8 lg:-top-12 w-2 h-2 border-r border-b border-[#D4AF37]/80 rotate-45"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-11 h-11 rounded-full border border-[#D4AF37]/80 bg-black flex items-center justify-center z-10">
                <Snowflake className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <div className="absolute left-[calc(50%+36px)] top-0 w-[250px]">
                <h4 className="text-[#D4AF37] font-bold tracking-[0.15em] uppercase text-base mb-1.5">Freeze</h4>
                <p className="text-white/70 text-sm leading-[1.6]">
                  Fruits are frozen at sub-zero temperatures to lock in nutrition and freshness.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative w-full h-11 mb-24 lg:mb-32">
              <div className="absolute left-1/2 -translate-x-1/2 -top-8 lg:-top-12 w-2 h-2 border-r border-b border-[#D4AF37]/80 rotate-45"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-11 h-11 rounded-full border border-[#D4AF37]/80 bg-black flex items-center justify-center z-10">
                <Droplets className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <div className="absolute left-[calc(50%+36px)] top-0 w-[250px]">
                <h4 className="text-[#D4AF37] font-bold tracking-[0.15em] uppercase text-base mb-1.5">Dry</h4>
                <p className="text-white/70 text-sm leading-[1.6]">
                  Moisture is removed through sublimation, leaving the fruit intact, not cooked.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative w-full h-11 mb-12 lg:mb-20">
              <div className="absolute left-1/2 -translate-x-1/2 -top-8 lg:-top-12 w-2 h-2 border-r border-b border-[#D4AF37]/80 rotate-45"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-11 h-11 rounded-full border border-[#D4AF37]/80 bg-black flex items-center justify-center z-10">
                <Leaf className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <div className="absolute left-[calc(50%+36px)] top-0 w-[250px]">
                <h4 className="text-[#D4AF37] font-bold tracking-[0.15em] uppercase text-base mb-1.5">Preserve</h4>
                <p className="text-white/70 text-sm leading-[1.6]">
                  The result is real fruit, with real nutrition, real flavor, and a long shelf life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

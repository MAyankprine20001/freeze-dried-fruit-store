import { useEffect, useRef, useState } from "react";
import { ArrowUpDown, Check, SlidersHorizontal, X } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "alpha-a-z", label: "Alphabetically, A-Z" },
  { value: "alpha-z-a", label: "Alphabetically, Z-A" },
  { value: "price-low-to-high", label: "Price, low to high" },
  { value: "price-high-to-low", label: "Price, high to low" },
];

interface Props {
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  outOfStockOnly: boolean;
  setOutOfStockOnly: (v: boolean) => void;
  priceFrom: string;
  setPriceFrom: (v: string) => void;
  priceTo: string;
  setPriceTo: (v: string) => void;
  sortOption: string;
  setSortOption: (v: string) => void;
  /** Page accent colour. */
  color?: string;
  className?: string;
}

/** Filter and Sort as dropdowns that open under their button (same pattern as the admin catalog). */
export default function FilterSortBar({
  inStockOnly, setInStockOnly, outOfStockOnly, setOutOfStockOnly,
  priceFrom, setPriceFrom, priceTo, setPriceTo,
  sortOption, setSortOption,
  color = "#2B4C1F", className = "",
}: Props) {
  const [open, setOpen] = useState<"filter" | "sort" | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeFilters =
    (inStockOnly ? 1 : 0) + (outOfStockOnly ? 1 : 0) + (priceFrom ? 1 : 0) + (priceTo ? 1 : 0);
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? "Featured";

  const btn =
    "inline-flex items-center gap-2 px-5 py-2.5 border border-[#213B14]/15 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-gray-50 transition-colors shadow-sm";
  const panel =
    "absolute top-full mt-2 z-30 w-[min(18rem,calc(100vw-2rem))] max-h-[70vh] overflow-y-auto bg-white rounded-2xl border border-[#213B14]/10 shadow-xl";

  return (
    <div ref={ref} className={`relative flex justify-between items-center gap-3 ${className}`}>
      {/* Filter */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(open === "filter" ? null : "filter")}
          aria-expanded={open === "filter"}
          className={btn}
        >
          <SlidersHorizontal className="w-4 h-4" style={{ color }} />
          Filter
          {activeFilters > 0 && (
            <span
              className="ml-0.5 w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              {activeFilters}
            </span>
          )}
        </button>

        {open === "filter" && (
          <div className={`${panel} left-0 p-5`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500">Availability</h4>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close filters"
                className="text-[#213B14]/50 hover:text-[#213B14]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    if (e.target.checked) setOutOfStockOnly(false);
                  }}
                  className="rounded border-[#213B14]/20"
                  style={{ accentColor: color }}
                />
                In stock
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={outOfStockOnly}
                  onChange={(e) => {
                    setOutOfStockOnly(e.target.checked);
                    if (e.target.checked) setInStockOnly(false);
                  }}
                  className="rounded border-[#213B14]/20"
                  style={{ accentColor: color }}
                />
                Out of stock
              </label>
            </div>

            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mt-5 mb-3">Price</h4>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={0}
                placeholder="From"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-[#213B14]/10 rounded-lg text-xs outline-none focus:border-[#213B14]/30"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min={0}
                placeholder="To"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-[#213B14]/10 rounded-lg text-xs outline-none focus:border-[#213B14]/30"
              />
            </div>

            {activeFilters > 0 && (
              <button
                type="button"
                onClick={() => {
                  setInStockOnly(false);
                  setOutOfStockOnly(false);
                  setPriceFrom("");
                  setPriceTo("");
                }}
                className="mt-4 w-full py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider text-[#213B14]/70 border border-[#213B14]/15 hover:bg-gray-50"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Sort */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(open === "sort" ? null : "sort")}
          aria-expanded={open === "sort"}
          className={btn}
        >
          <ArrowUpDown className="w-4 h-4" style={{ color }} />
          <span className="hidden sm:inline">Sort:</span>
          <span className="normal-case">{sortLabel}</span>
        </button>

        {open === "sort" && (
          <div className={`${panel} right-0 py-2`}>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setSortOption(opt.value);
                  setOpen(null);
                }}
                className="w-full flex items-center justify-between gap-2 px-5 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 text-left"
              >
                {opt.label}
                {sortOption === opt.value && <Check className="w-4 h-4 flex-shrink-0" style={{ color }} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

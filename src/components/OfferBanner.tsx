import { useState } from "react";
import { Tag, Copy, Check } from "lucide-react";
import type { ActiveOffer } from "../hooks/useActiveOffer";

/** Offer strip shown inside the top announcement bar while the coupon is live. */
export default function OfferBanner({ offer }: { offer: ActiveOffer }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(offer.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the code is still visible to type */
    }
  };

  return (
    <div className="flex w-full items-center justify-center gap-2 whitespace-nowrap text-[11px] sm:text-xs">
      <Tag className="hidden h-3.5 w-3.5 shrink-0 text-[#E4B34F] sm:block" aria-hidden="true" />
      <span className="truncate">
        Get <strong className="font-extrabold text-[#E4B34F]">{offer.headline}</strong>
        {offer.minOrderValue > 0 && <span className="hidden sm:inline"> on orders above ₹{offer.minOrderValue}</span>}
        <span className="hidden sm:inline"> — use code</span>
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy coupon code ${offer.code}`}
        className="inline-flex shrink-0 items-center gap-1 rounded border border-dashed border-[#E4B34F]/70 px-2 py-0.5 font-extrabold tracking-widest text-[#F3EFE0] transition-colors hover:bg-white/10"
      >
        {offer.code}
        {copied ? <Check className="h-3 w-3 text-[#B5C99A]" aria-hidden="true" /> : <Copy className="h-3 w-3 opacity-70" aria-hidden="true" />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Coupon code copied" : ""}
      </span>
    </div>
  );
}

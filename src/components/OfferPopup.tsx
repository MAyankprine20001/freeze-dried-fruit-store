import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Copy, Check, Leaf, ArrowRight } from "lucide-react";
import { useActiveOffer } from "../hooks/useActiveOffer";

/** Show again this long after the visitor closes it. */
const HIDE_FOR_MS = 7 * 24 * 60 * 60 * 1000;
const DELAY_MS = 2500;
/** Pages where a popup would get in the way of finishing a task. */
const SKIP_PATHS = ["/cart", "/checkout", "/order-success", "/login", "/signup", "/forgot-password", "/reset-password", "/verify-email", "/admin", "/profile"];

const storageKey = (code: string) => `tdf_offer_popup_${code}`;

const recentlyDismissed = (code: string) => {
  try {
    const at = Number(localStorage.getItem(storageKey(code)));
    return !!at && Date.now() - at < HIDE_FOR_MS;
  } catch {
    return false;
  }
};

const rememberDismissed = (code: string) => {
  try {
    localStorage.setItem(storageKey(code), String(Date.now()));
  } catch {
    /* private mode: popup may show again next visit */
  }
};

/** First-visit offer popup. Only appears while the offer coupon is live. */
export default function OfferPopup() {
  const offer = useActiveOffer();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [closedThisVisit, setClosedThisVisit] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const skip = SKIP_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    if (!offer || skip || open || closedThisVisit || recentlyDismissed(offer.code)) return;
    const t = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(t);
  }, [offer, skip, open, closedThisVisit]);

  const close = () => {
    setOpen(false);
    setClosedThisVisit(true);
    if (offer) rememberDismissed(offer.code);
  };

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open || !offer) return null;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-popup-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#FAF7F2] text-center shadow-2xl"
      >
        <div className="relative bg-[#1C2A18] px-6 pb-9 pt-10 text-[#F3EFE0]">
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close offer"
            className="absolute right-3 top-3 rounded-full p-2 text-[#F3EFE0]/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <Leaf className="mx-auto h-7 w-7 text-[#B5C99A]" aria-hidden="true" />
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#B5C99A]">Welcome to The Dry Factory</p>
          <h2 id="offer-popup-title" className="mt-3 font-serif text-5xl font-extrabold leading-none">
            <span className="text-[#E4B34F]">{offer.headline}</span>
          </h2>
          <p className="mt-3 text-sm text-[#F3EFE0]/85">
            on your order{offer.minOrderValue > 0 ? ` above ₹${offer.minOrderValue}` : ""}
          </p>
        </div>

        <div className="px-6 pb-7 pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#213B14]/60">Use code at checkout</p>
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy coupon code ${offer.code}`}
            className="mx-auto mt-3 flex w-full max-w-xs items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#213B14]/40 bg-white px-4 py-3 font-extrabold tracking-[0.2em] text-[#213B14] transition-colors hover:border-[#213B14]"
          >
            {offer.code}
            {copied ? <Check className="h-4 w-4 text-green-700" aria-hidden="true" /> : <Copy className="h-4 w-4 opacity-60" aria-hidden="true" />}
          </button>
          <p className="mt-2 h-4 text-xs font-semibold text-green-700" aria-live="polite">
            {copied ? "Code copied!" : ""}
          </p>

          <Link
            to="/products"
            onClick={close}
            className="mt-3 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#213B14] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#FAF7F2] transition-colors hover:bg-[#3F622D]"
          >
            Shop now <ArrowRight className="h-4 w-4" />
          </Link>
          <button type="button" onClick={close} className="mt-4 block w-full text-xs font-semibold text-[#213B14]/60 underline-offset-4 hover:underline">
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}

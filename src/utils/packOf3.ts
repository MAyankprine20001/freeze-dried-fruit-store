import { useState } from "react";

/** Suffix that turns a product id into its "Pack of 3" cart line. */
export const PACK3_SUFFIX = "__pack3";

export const pidOf = (p: any): string => String(p?._id || p?.id || "");

/** True when the admin has set a Pack of 3 price for this product. */
export const hasPack3 = (p: any) => Number(p?.pack3Price) > 0;

/** MRP to strike through for the pack: admin value, else 3 × single MRP/price. */
export const pack3Mrp = (p: any) =>
  Number(p?.pack3OriginalPrice) > 0 ? Number(p.pack3OriginalPrice) : 3 * Number(p?.originalPrice || p?.price || 0);

/**
 * The cart version of a product's Pack of 3: its own cart line (separate id, name and price),
 * so 1-pack and 3-pack of the same product can sit in the cart side by side.
 */
export function toPack3(p: any) {
  const id = pidOf(p) + PACK3_SUFFIX;
  return {
    ...p,
    id,
    _id: id,
    name: `${p.name} (Pack of 3)`,
    price: Number(p.pack3Price),
    originalPrice: pack3Mrp(p),
    weight: p.weight ? `3 × ${p.weight}` : "Pack of 3",
  };
}

/** Per-page memory of which cards have "Pack of 3" selected. */
export function usePack3Selection() {
  const [sel, setSel] = useState<Record<string, boolean>>({});
  const isPack3 = (p: any) => hasPack3(p) && !!sel[pidOf(p)];
  const setPack3 = (p: any, on: boolean) => setSel((s) => ({ ...s, [pidOf(p)]: on }));
  /** The product to show/add for this card: the pack version when selected. */
  const itemFor = (p: any) => (isPack3(p) ? toPack3(p) : p);
  return { isPack3, setPack3, itemFor };
}

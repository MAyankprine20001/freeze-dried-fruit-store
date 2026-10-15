/** "Fruit Chunks" / "fruit_chunks" -> "fruit-chunks" */
export const normCat = (c: any) => String(c ?? "").toLowerCase().replace(/[\s_]+/g, "-");

/**
 * Which products a brand page shows: its own categories, plus any combo pack
 * (admin category "Combos") whose name or subtitle names that brand.
 */
export function belongsToBrandPage(p: any, categories: string[], brand: RegExp) {
  const cat = normCat(p?.category);
  if (categories.includes(cat)) return true;
  return cat === "combos" && brand.test(`${p?.name ?? ""} ${p?.subtitle ?? ""}`);
}

export const isComboPack = (p: any) => normCat(p?.category) === "combos";

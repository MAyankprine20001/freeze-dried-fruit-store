/** Mirrors backend `computeOrderTotalsWithCoupon` — keep in sync with couponOrder.util.js */

export interface CouponDiscountInput {
  discountType: string;
  discountValue: number;
}

export function computeOrderTotalsWithCoupon(
  subtotal: number,
  shipping: number,
  coupon: CouponDiscountInput | null
): { finalShipping: number; discount: number; total: number } {
  const s = Number(subtotal) || 0;
  const sh = Number(shipping) || 0;
  if (!coupon) {
    return { finalShipping: sh, discount: 0, total: s + sh };
  }
  let itemDiscount = 0;
  let finalShipping = sh;
  const dv = Number(coupon.discountValue) || 0;
  if (coupon.discountType === "Percentage") {
    itemDiscount = Math.round((s * dv) / 100);
    itemDiscount = Math.min(Math.max(0, itemDiscount), s);
  } else if (coupon.discountType === "Flat") {
    itemDiscount = Math.min(Math.max(0, dv), s);
  } else if (coupon.discountType === "Free Shipping") {
    finalShipping = 0;
  }
  const total = Math.max(0, s - itemDiscount + finalShipping);
  const discount = s + sh - total;
  return { finalShipping, discount, total };
}

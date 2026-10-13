import { useQuery } from "@tanstack/react-query";
import { couponApi } from "../api/coupon.api";
import { OFFER_COUPON_CODE } from "../config/offer";

export interface ActiveOffer {
  code: string;
  /** e.g. "10% off", "₹100 off", "Free delivery" */
  headline: string;
  minOrderValue: number;
}

/**
 * Returns the banner offer only while its coupon is live (exists, active, within dates, usage left).
 * Expired or missing coupons return null, so the banner never advertises a code that won't work.
 */
export function useActiveOffer(): ActiveOffer | null {
  const { data } = useQuery({
    queryKey: ["offer-coupon", OFFER_COUPON_CODE],
    queryFn: async () => {
      const res = await couponApi.validate(OFFER_COUPON_CODE);
      return res?.success ? res.data : null;
    },
    retry: false,
    staleTime: 1000 * 60 * 10,
  });

  if (!data) return null;
  const value = Number(data.discountValue) || 0;
  const headline =
    data.discountType === "Percentage" && value > 0
      ? `${value}% off`
      : data.discountType === "Flat" && value > 0
        ? `₹${value} off`
        : data.discountType === "Free Shipping"
          ? "Free delivery"
          : "";
  if (!headline) return null;
  return { code: data.code || OFFER_COUPON_CODE, headline, minOrderValue: Number(data.minOrderValue) || 0 };
}

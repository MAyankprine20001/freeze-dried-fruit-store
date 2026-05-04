import { useState, useEffect } from "react";
import { settingsApi } from "../api/settings.api";

const DEFAULT_DELIVERY = 50;
const DEFAULT_THRESHOLD = 499;

export interface ShippingConfig {
  deliveryCharge: number;
  freeShippingThreshold: number;
  loading: boolean;
}

export function computeCartShipping(
  subtotal: number,
  itemCount: number,
  { deliveryCharge, freeShippingThreshold }: Pick<ShippingConfig, "deliveryCharge" | "freeShippingThreshold">
): number {
  if (itemCount === 0 || subtotal <= 0) return 0;
  if (freeShippingThreshold <= 0) return 0;
  if (subtotal >= freeShippingThreshold) return 0;
  return deliveryCharge;
}

export function useShippingConfig(): ShippingConfig {
  const [deliveryCharge, setDeliveryCharge] = useState(DEFAULT_DELIVERY);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(DEFAULT_THRESHOLD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    settingsApi
      .get()
      .then((res) => {
        if (cancelled || !res.success || !res.data) return;
        const d = res.data;
        setDeliveryCharge(Math.max(0, Number(d.deliveryCharge ?? DEFAULT_DELIVERY)));
        setFreeShippingThreshold(Math.max(0, Number(d.freeShippingThreshold ?? DEFAULT_THRESHOLD)));
      })
      .catch(() => {
        /* keep defaults */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { deliveryCharge, freeShippingThreshold, loading };
}

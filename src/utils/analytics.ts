/**
 * Google Analytics 4 (gtag.js).
 * Loads only on the live site (thedryfactory.com), never on localhost or Vercel previews,
 * and never on admin pages. Page views are sent on every route change (single-page app).
 */

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || "G-XV9FZBF6LR";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const isLiveSite = () =>
  typeof window !== "undefined" && /(^|\.)thedryfactory\.com$/.test(window.location.hostname);

const isAdminPath = (path = window.location.pathname) => path.startsWith("/admin");

let initialised = false;

export function initAnalytics() {
  if (initialised || !isLiveSite() || !GA_MEASUREMENT_ID) return;
  initialised = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // Page views are sent manually on route changes (see trackPageView).
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false, currency: "INR" });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

const send = (event: string, params: Record<string, unknown> = {}) => {
  if (!initialised || !window.gtag || isAdminPath()) return;
  window.gtag("event", event, params);
};

export function trackPageView(path: string) {
  if (isAdminPath(path)) return;
  send("page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** GA4 e-commerce item from a store product or cart item. */
const toItem = (p: any, quantity = 1) => ({
  item_id: p?._id || p?.id,
  item_name: p?.name,
  item_category: p?.category,
  price: Number(p?.price) || 0,
  quantity,
});

export const trackViewItem = (product: any) =>
  send("view_item", { currency: "INR", value: Number(product?.price) || 0, items: [toItem(product)] });

export const trackAddToCart = (product: any, quantity = 1) =>
  send("add_to_cart", { currency: "INR", value: (Number(product?.price) || 0) * quantity, items: [toItem(product, quantity)] });

export const trackBeginCheckout = (items: any[], value: number, coupon?: string) =>
  send("begin_checkout", { currency: "INR", value, ...(coupon ? { coupon } : {}), items: items.map((i) => toItem(i, i.quantity)) });

export const trackPurchase = (orderId: string, value: number, items: any[], shipping: number, coupon?: string) =>
  send("purchase", {
    transaction_id: orderId,
    currency: "INR",
    value,
    shipping,
    ...(coupon ? { coupon } : {}),
    items: items.map((i) => toItem(i, i.quantity)),
  });

export const trackCouponApplied = (code: string) => send("coupon_applied", { coupon: code });

export const trackWhatsAppClick = (where: string) => send("whatsapp_click", { location: where });

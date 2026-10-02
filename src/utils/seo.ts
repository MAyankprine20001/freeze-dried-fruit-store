/**
 * Client-side page metadata: <title>, meta description, canonical, Open Graph and robots per route.
 * Interim measure until public routes are server-rendered.
 */

export const SITE_URL = "https://thedryfactory.com";
const SITE_NAME = "The Dry Factory";

export const DEFAULT_TITLE = "The Dry Factory | Freeze-Dried Fruit Snacks, Smoothies & Chocolates";
export const DEFAULT_DESCRIPTION =
  "Freeze-dried fruit snacks, SipReal smoothie premixes and Freeze Fusion fruit chocolates from The Dry Factory. Made in India. Shop online.";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

export interface PageMeta {
  title?: string;
  description?: string;
  /** Path used for the canonical URL, e.g. "/smoothie-premix". */
  path?: string;
  noindex?: boolean;
  image?: string;
}

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href: string | null) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export const setPageMeta = ({ title, description, path, noindex, image }: PageMeta) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;
  const url = path ? `${SITE_URL}${path}` : null;
  const shareImage = (image || DEFAULT_IMAGE).replace(/^http:\/\//, "https://");

  document.title = fullTitle;
  upsertMeta("name", "description", desc);
  upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
  upsertMeta("property", "og:title", fullTitle);
  upsertMeta("property", "og:description", desc);
  upsertMeta("property", "og:image", shareImage);
  upsertMeta("name", "twitter:title", fullTitle);
  upsertMeta("name", "twitter:description", desc);
  upsertMeta("name", "twitter:image", shareImage);
  if (url) upsertMeta("property", "og:url", url);
  setCanonical(noindex ? null : url);
};

/** Metadata for routes whose content does not depend on API data. */
export const STATIC_ROUTE_META: Record<string, PageMeta> = {
  "/": {},
  "/products": {
    title: "Shop Freeze-Dried Fruit Snacks, Smoothies & Chocolates",
    description:
      "Browse every Dry Factory product: Crispy Bites freeze-dried fruit snacks, SipReal smoothie premixes and Freeze Fusion fruit chocolates.",
  },
  "/fruit-powder-chunks": {
    title: "Crispy Bites Freeze-Dried Fruit Snacks",
    description:
      "Crispy Bites freeze-dried fruit snacks in mango, jamun and mixed fruit. Crunchy real fruit with no frying, baking or oil. Shop online.",
  },
  "/smoothie-premix": {
    title: "SipReal Fruit Smoothie Premix",
    description:
      "SipReal smoothie premixes made with freeze-dried fruit: Royal Mango, Berry Blast and Banana Power. Mix, shake and sip.",
  },
  "/chocolate": {
    title: "Freeze Fusion Freeze-Dried Fruit Chocolates",
    description:
      "Freeze Fusion couverture chocolates with real freeze-dried fruit inside: strawberry, mango and banana in dark, milk and white.",
  },
  "/combos": {
    title: "Combos & Bundles",
    description: "Combos and bundles of freeze-dried fruit snacks, smoothie premixes and fruit chocolates from The Dry Factory.",
  },
  "/gift-hampers": {
    title: "Fruit Snack & Chocolate Gift Hampers",
    description: "Gift hampers with freeze-dried fruit snacks, smoothie premixes and fruit chocolates from The Dry Factory.",
  },
  "/bulk-orders": {
    title: "Bulk Freeze-Dried Fruits & Powders for Businesses",
    description:
      "Bulk freeze-dried fruit chunks, powders and smoothie premixes for cafes, bakeries, retailers and food brands. Send your requirements.",
  },
  "/about": {
    title: "Our Story",
    description: "Why The Dry Factory makes freeze-dried fruit snacks, smoothies and chocolates, and how we work.",
  },
  "/faq": {
    title: "FAQs",
    description: "Answers about freeze-dried fruit, SipReal preparation, storage, delivery and orders at The Dry Factory.",
  },
  "/contact": {
    title: "Contact Us",
    description: "Contact The Dry Factory for orders, product questions, bulk enquiries and support.",
  },
  "/reviews": {
    title: "Customer Reviews",
    description: "Read and share reviews of The Dry Factory products.",
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "How The Dry Factory collects, uses and protects your information.",
  },
  "/terms": {
    title: "Terms of Service",
    description: "Terms and conditions for shopping with The Dry Factory.",
  },
};

/** Routes that should never be indexed. */
const NOINDEX_PREFIXES = [
  "/cart",
  "/checkout",
  "/order-success",
  "/profile",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/admin",
];

export const isNoindexPath = (pathname: string) =>
  NOINDEX_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

const STOCK_HOSTS = ["images.unsplash.com", "plus.unsplash.com"];

/** A product's real photos (admin uploads). Stock-photo URLs are ignored: they don't show the actual product. */
export const productRealImages = (p: { image?: string; images?: string[] }): string[] =>
  [...(Array.isArray(p.images) ? p.images : []), p.image]
    .filter((u): u is string => typeof u === "string" && !!u && !STOCK_HOSTS.some((h) => u.includes(h)))
    .map((u) => u.replace(/^http:\/\//, "https://"))
    .filter((u, i, all) => all.indexOf(u) === i);

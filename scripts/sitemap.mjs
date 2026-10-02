#!/usr/bin/env node
/**
 * Writes public/sitemap.xml from the static routes plus live products.
 * Runs before `vite build`. If the API is unreachable, the static routes are still written.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://thedryfactory.com";
const API = "https://api.thedryfactory.com/api/v1";

/** Only real storefront ranges (keeps test/uncategorised products out). */
const STOREFRONT_CATEGORIES = ["fruit chunks", "smoothie premix", "chocolates"];

const STATIC = [
  ["/", "1.0", "weekly"],
  ["/products", "0.9", "weekly"],
  ["/fruit-powder-chunks", "0.9", "weekly"],
  ["/smoothie-premix", "0.9", "weekly"],
  ["/chocolate", "0.9", "weekly"],
  ["/gift-hampers", "0.6", "monthly"],
  ["/combos", "0.5", "monthly"],
  ["/bulk-orders", "0.6", "monthly"],
  ["/about", "0.5", "monthly"],
  ["/faq", "0.5", "monthly"],
  ["/contact", "0.4", "yearly"],
  ["/reviews", "0.4", "weekly"],
  ["/privacy", "0.2", "yearly"],
  ["/terms", "0.2", "yearly"],
];

let products = [];
try {
  const res = await fetch(`${API}/products`, { signal: AbortSignal.timeout(10000) });
  const json = await res.json();
  products = (json.data ?? []).filter((p) => STOREFRONT_CATEGORIES.includes(String(p.category).trim().toLowerCase()));
} catch (err) {
  console.warn(`sitemap: could not fetch products (${err.message}); writing static routes only.`);
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  ...STATIC.map(([loc, priority, changefreq]) => ({ loc, priority, changefreq, lastmod: today })),
  ...products.map((p) => ({
    loc: `/product/${p._id}`,
    priority: "0.8",
    changefreq: "weekly",
    lastmod: String(p.updatedAt || today).slice(0, 10),
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, "public/sitemap.xml"), xml);
console.log(`sitemap: wrote ${urls.length} URLs (${products.length} products).`);

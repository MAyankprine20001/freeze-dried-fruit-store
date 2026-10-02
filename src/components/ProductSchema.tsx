import { SITE_URL, productRealImages } from "../utils/seo";

/** Database category → its listing page, for breadcrumbs. */
const CATEGORY_PAGES: Record<string, { name: string; path: string }> = {
  "fruit chunks": { name: "Crispy Bites", path: "/fruit-powder-chunks" },
  "smoothie premix": { name: "SipReal Smoothie Premix", path: "/smoothie-premix" },
  chocolates: { name: "Freeze Fusion Chocolates", path: "/chocolate" },
};

/**
 * Product + BreadcrumbList structured data.
 * Ratings are only included when real customer reviews exist.
 */
export default function ProductSchema({ product, reviews }: { product: any; reviews: any[] }) {
  const url = `${SITE_URL}/product/${product._id}`;
  const category = CATEGORY_PAGES[String(product.category ?? "").trim().toLowerCase()];
  const images = productRealImages(product);
  const rated = reviews.filter((r) => Number(r.rating) > 0);
  const avg = rated.length ? rated.reduce((s, r) => s + Number(r.rating), 0) / rated.length : 0;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.subtitle || undefined,
    ...(images.length ? { image: images } : {}),
    ...(product.sku ? { sku: product.sku } : {}),
    brand: { "@type": "Brand", name: "The Dry Factory" },
    ...(category ? { category: category.name } : {}),
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price: product.price,
      availability: product.stock === "Out of Stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(rated.length
      ? {
          aggregateRating: { "@type": "AggregateRating", ratingValue: avg.toFixed(1), reviewCount: rated.length },
          review: rated.slice(0, 5).map((r) => ({
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: r.rating },
            author: { "@type": "Person", name: r.user?.fullName || "Customer" },
            ...(r.comment ? { reviewBody: r.comment } : {}),
            ...(r.createdAt ? { datePublished: String(r.createdAt).slice(0, 10) } : {}),
          })),
        }
      : {}),
  };

  const crumbs = [
    { name: "Home", item: `${SITE_URL}/` },
    { name: "Products", item: `${SITE_URL}/products` },
    ...(category ? [{ name: category.name, item: `${SITE_URL}${category.path}` }] : []),
    { name: product.name, item: url },
  ];
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}


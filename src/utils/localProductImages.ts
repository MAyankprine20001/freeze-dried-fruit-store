/**
 * Real pack photos stored in /public, used on the storefront in place of the
 * stock images saved in the database. Admin pages never see these, so nothing
 * here is written back to the database.
 *
 * To add another product: drop its images in public/images/products and add a line below
 * (key = exact product name from the admin).
 */
const LOCAL_IMAGES: Record<string, string[]> = {
  "Crispy Bites Mixed Fruit": [
    "/images/products/crispy-bites-mixed-fruit-front-800.webp",
    "/images/products/crispy-bites-mixed-fruit-back-800.webp",
  ],
};

const STOCK_HOSTS = ["images.unsplash.com", "plus.unsplash.com"];

export function withLocalImages<T extends { name?: string; image?: string; images?: string[] }>(product: T): T {
  const local = product?.name ? LOCAL_IMAGES[product.name] : undefined;
  if (!local) return product;
  const ownPhotos = [product.image, ...(product.images ?? [])].filter(
    (u): u is string => !!u && !STOCK_HOSTS.some((h) => u.includes(h)) && !local.includes(u),
  );
  return { ...product, image: local[0], images: [...local, ...ownPhotos] };
}

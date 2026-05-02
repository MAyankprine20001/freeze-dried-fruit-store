/** Primary image for listings: prefers `images[0]`, falls back to legacy `image`. */
export function getProductPrimaryImage(product: { image?: string; images?: string[] }): string {
  if (Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
    return product.images[0];
  }
  return product.image || "";
}

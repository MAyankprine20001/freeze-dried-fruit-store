import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, Truck, ShieldCheck, ShoppingBag, Package,
  ImageIcon, X, User, Leaf, Shield, Sparkles, Zap, Award, Droplets,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { productApi } from "../api/product.api";
import { reviewApi } from "../api/review.api";
import { getProductPrimaryImage } from "../utils/productImage";
import { productRealImages, setPageMeta } from "../utils/seo";
import ProductSchema from "../components/ProductSchema";
import { trackViewItem } from "../utils/analytics";
import CartStepper from "../components/CartStepper";

// Map badge label → icon
const BADGE_ICON_MAP: Record<string, React.ReactNode> = {
  "No Sugar": <Leaf className="w-3.5 h-3.5" />,
  "No Preservatives": <Shield className="w-3.5 h-3.5" />,
  "Real Fruit": <Sparkles className="w-3.5 h-3.5" />,
  "No Added Sugar": <Leaf className="w-3.5 h-3.5" />,
  "Freeze Dried": <Zap className="w-3.5 h-3.5" />,
  "Gluten Free": <Award className="w-3.5 h-3.5" />,
  "Vegan": <Droplets className="w-3.5 h-3.5" />,
  "100% Natural": <Award className="w-3.5 h-3.5" />,
};
const DEFAULT_BADGES = ["No Sugar", "No Preservatives", "Real Fruit"];


export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchReviews = async () => {
    try {
      if (!id) return;
      const revRes = await reviewApi.getProductReviews(id);
      setReviews(revRes.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!id) return;
        const res = await productApi.getById(id);
        const p = res.data;
        setProduct(p);
        trackViewItem(p);
        setPageMeta({
          title: [p.name, p.weight].filter(Boolean).join(", "),
          description: (p.subtitle || p.description || "").slice(0, 160) || undefined,
          path: `/product/${id}`,
          image: productRealImages(p)[0],
        });
        setActiveImg(0);
        // relatedProducts are now populated by the backend
        setRelatedProducts(Array.isArray(p.relatedProducts) ? p.relatedProducts : []);
        await fetchReviews();
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Please enter a comment");
    setSubmittingReview(true);
    try {
      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("comment", comment);
      if (imageFile) formData.append("image", imageFile);
      await reviewApi.addReview(id!, formData);
      toast.success("Review submitted!");
      setComment(""); setRating(5); setImageFile(null); setPreviewUrl(null);
      fetchReviews();
      const res = await productApi.getById(id!);
      setProduct(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#213B14] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-24">
        <Loader text="Loading product details..." />
      </main>
      <Footer />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#213B14] flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 text-center px-4">
        <h1 className="font-serif text-3xl font-extrabold mb-3 text-[#213B14]">Product Not Found</h1>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">The product you are looking for does not exist or may have been moved.</p>
        <Link to="/products" className="px-6 py-3 bg-[#213B14] hover:bg-[#3F622D] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all">
          Return to Products
        </Link>
      </main>
      <Footer />
    </div>
  );

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const galleryImages: string[] =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.filter(Boolean)
      : product.image
        ? [product.image]
        : [];
  const mainImg = galleryImages[activeImg] ?? getProductPrimaryImage(product);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-[#1C2A18]">
      <Header />
      <main className="flex-1 pt-32 sm:pt-36 pb-20 px-4 sm:px-6">
        <ProductSchema product={product} reviews={reviews} />
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center text-xs sm:text-sm text-[#213B14]/50 gap-1.5">
            <Link to="/" className="hover:text-[#3F622D] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#3F622D] transition-colors">Products</Link>
            <span>/</span>
            <span className="text-[#213B14]/60">{product.category}</span>
            <span>/</span>
            <span className="text-[#213B14] font-semibold truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">

            {/* ── LEFT: Image Gallery ── */}
            <div className="flex gap-3 lg:sticky lg:top-36">
              {/* Vertical Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex flex-col gap-2.5 w-16 flex-shrink-0">
                  {galleryImages.map((thumb, i) => (
                    <button
                      key={`${thumb}-${i}`}
                      onClick={() => setActiveImg(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 bg-white transition-all flex-shrink-0 ${activeImg === i ? "border-[#3F622D]" : "border-[#213B14]/10 hover:border-[#213B14]/30"
                        }`}
                    >
                      <img src={thumb} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              {/* Main Image */}
              <motion.div
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 aspect-square bg-white rounded-3xl border border-[#213B14]/10 shadow-sm overflow-hidden relative group"
              >
                {discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg">-{discount}% OFF</div>
                )}
                {product.featured && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[#213B14] text-white text-[10px] font-black rounded-sm tracking-widest uppercase">★ BESTSELLER</div>
                )}
                <img
                  src={mainImg}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>

            {/* ── RIGHT: Details ── */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">

              {/* Name */}
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-[#1C2A18] mb-2">{product.name}</h1>

              {/* Benefit line */}
              <p className="text-lg text-[#213B14]/70 font-medium mb-3 flex items-center gap-2">
                {product.subtitle || "Premium freeze-dried fruits for guilt-free snacking"}
                {/* <span className="text-lg">🌿</span> */}
              </p>

              {/* Price */}
              <div className="flex items-end gap-3 mb-1">
                <span className="text-3xl font-black text-[#213B14]">₹{product.price}</span>
                {product.originalPrice > 0 && (
                  <span className="text-lg text-[#213B14]/40 line-through mb-0.5">₹{product.originalPrice}</span>
                )}
              </div>
              <p className="text-[#213B14]/50 text-xs mb-5">Inclusive of all taxes</p>

              {/* Trust Points — from backend trustBadges */}
              <div className="flex flex-wrap gap-2.5 mb-5">
                {(product.trustBadges?.length > 0 ? product.trustBadges : DEFAULT_BADGES).map((badge: string, badgeIdx: number) => (
                  <div key={`${badge}-${badgeIdx}`} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#213B14]/10 bg-white">
                    <span className="text-[#3F622D]">{BADGE_ICON_MAP[badge] ?? <Award className="w-3.5 h-3.5" />}</span>
                    <span className="text-xs font-bold text-[#213B14]/80">{badge}</span>
                  </div>
                ))}
              </div>

              {/* Urgency Line */}
              {product.urgencyLine && (
                <div className="flex items-center gap-2 text-[#213B14]/75 font-medium mb-6">
                  <span className="text-xl">🔥</span>
                  <span>{product.urgencyLine}</span>
                </div>
              )}

              {/* CTA Row */}
              <div className="mb-5">
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  {/* Quantity */}
                  <div className="flex items-center bg-white rounded-xl border border-[#213B14]/15 h-14 w-fit">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center text-[#213B14]/50 hover:text-[#213B14] transition-colors text-lg font-bold">-</button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center text-[#213B14]/50 hover:text-[#213B14] transition-colors text-lg font-bold">+</button>
                  </div>
                  {/* Add to Cart */}
                  <button
                    onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); toast.success(`${quantity} × ${product.name} added!`); }}
                    className="flex-1 h-14 border-2 border-[#213B14] text-[#213B14] bg-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#213B14] hover:text-white transition-all"
                  >
                    <ShoppingBag className="w-5 h-5" /> Add to Cart
                  </button>
                  {/* Buy Now */}
                  <button
                    onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); navigate("/cart"); }}
                    className="flex-1 h-14 bg-[#213B14] text-white font-bold rounded-xl hover:bg-[#3F622D] transition-all shadow-lg shadow-[#213B14]/15"
                  >
                    Buy it now
                  </button>
                </div>
                {/* Stock Indicator */}
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${product.stock === "Out of Stock" ? "bg-red-500" : "bg-green-500 animate-pulse"}`} />
                  <span className={product.stock === "Out of Stock" ? "text-red-600" : "text-[#3F622D] font-medium"}>
                    {product.stock === "Out of Stock" ? "Out of stock" : "Only few left in stock — order soon!"}
                  </span>
                </div>
              </div>

              {/* Delivery & Security */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white border border-[#213B14]/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3F622D]/10 rounded-full flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-[#3F622D]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C2A18] text-sm">Fast Delivery</h4>
                    <p className="text-xs text-[#213B14]/55">Dispatched within 24 hours<br />Delivered in 3–5 days</p>
                  </div>
                </div>
                <div className="bg-white border border-[#213B14]/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3F622D]/10 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#3F622D]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C2A18] text-sm">Secure Checkout</h4>
                    <p className="text-xs text-[#213B14]/55">100% safe & secure<br />transactions</p>
                  </div>
                </div>
              </div>

              {/* Description + About TDF */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white border border-[#213B14]/10 rounded-2xl p-5">
                  <h3 className="text-base font-bold text-[#1C2A18] mb-3">Description</h3>
                  {product.description && (
                    <p className="text-[#213B14]/70 text-sm leading-relaxed mb-4">{product.description}</p>
                  )}
                  {product.highlights?.length > 0 && (
                    <ul className="space-y-2.5">
                      {product.highlights.map((h: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-[#213B14]/80 text-sm">
                          <span className="mt-0.5 text-[#3F622D] font-bold text-xs">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  {!product.description && !product.highlights?.length && (
                    <p className="text-[#213B14]/40 text-sm italic">No description added yet.</p>
                  )}
                </div>
                <div className="bg-white border border-[#213B14]/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                  <h3 className="text-base font-bold text-[#1C2A18] mb-4">About The Dry Factory</h3>
                  <img src="/logo.png" alt="The Dry Factory logo" width={56} height={56} className="w-14 h-14 rounded-full object-contain bg-[#FAF7F2] border border-[#213B14]/10 mb-3" />
                  <p className="text-[#213B14]/80 text-sm mb-1 font-medium">Trusted for clean, real-fruit products.</p>
                  <p className="text-[#213B14]/50 text-xs mb-5">Made with care • No shortcuts</p>
                  <div className="grid grid-cols-3 w-full gap-2">
                    {[
                      { icon: <Leaf className="w-4 h-4" />, l: "100% Natural" },
                      { icon: <Sparkles className="w-4 h-4" />, l: "Clean Ingredients" },
                      { icon: <Shield className="w-4 h-4" />, l: "Quality Assured" },
                    ].map((i) => (
                      <div key={i.l} className="flex flex-col items-center gap-1.5">
                        <span className="w-9 h-9 rounded-full bg-[#3F622D]/10 text-[#3F622D] flex items-center justify-center">{i.icon}</span>
                        <span className="text-[10px] font-bold text-[#213B14]/70 leading-tight">{i.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── You May Also Like — from relatedProducts (populated by backend) ── */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-[#213B14]/10 pt-12 mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1C2A18]">You may also like</h2>
                <Link to="/products" className="text-sm font-bold text-[#3F622D] hover:text-[#213B14] flex items-center gap-1 transition-colors">
                  View all <span className="text-lg leading-none">→</span>
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedProducts.map((p: any) => (
                  <div key={p._id} className="group bg-white rounded-2xl overflow-hidden border border-[#213B14]/10 hover:border-[#3F622D]/40 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/product/${p._id}`)}>
                    <div className="aspect-[4/3] bg-[#F3EFE0] overflow-hidden">
                      <img src={getProductPrimaryImage(p)} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold text-[#3F622D] uppercase tracking-wider mb-1">{p.category}</p>
                      <h3 className="font-bold text-[#1C2A18] text-sm leading-snug group-hover:text-[#3F622D] transition-colors">{p.name}</h3>
                      {p.subtitle && <p className="text-[#213B14]/55 text-xs mt-1 line-clamp-2">{p.subtitle}</p>}
                      <div className="mt-3 pt-3 border-t border-[#213B14]/10">
                        <span className="font-bold text-[#213B14] text-base block mb-2">₹{p.price}</span>
                        <CartStepper product={p} color="#213B14" textColor="#FFFFFF" className="w-full">
                        <button onClick={(e) => { e.stopPropagation(); addToCart(p); toast.success(`${p.name} added!`); }} className="w-full py-2 bg-transparent border border-[#213B14]/40 text-[#213B14] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#213B14] hover:text-white transition-all">
                          <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                        </button>
                        </CartStepper>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="border-t border-[#213B14]/10 pt-14 mb-16">
            <h2 className="text-2xl font-bold text-[#1C2A18] mb-8">Customer Reviews</h2>
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-6">
                {reviews.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-[#213B14]/10 text-center">
                    <Star className="w-10 h-10 text-[#213B14]/15 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-[#1C2A18] mb-1">No reviews yet</h3>
                    <p className="text-[#213B14]/55 text-sm">Be among the first 10 customers to review this product.</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review._id} className="bg-white p-5 rounded-2xl border border-[#213B14]/10">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#3F622D]/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-[#3F622D]" />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1C2A18] text-sm">{review.user?.fullName || "Anonymous"}</h4>
                            <p className="text-xs text-[#213B14]/45">{new Date(review.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "fill-current text-[#E8A317]" : "text-[#213B14]/15"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#213B14]/80 text-sm leading-relaxed">{review.comment}</p>
                      {review.image && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-[#213B14]/10 w-40 h-40 bg-[#F3EFE0]">
                          <img src={review.image} alt="Review" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              <div className="lg:col-span-5">
                <div className="bg-white p-6 rounded-2xl border border-[#213B14]/10 shadow-sm lg:sticky lg:top-36">
                  <h3 className="text-xl font-bold text-[#1C2A18] mb-5">Write a Review</h3>
                  {!user ? (
                    <div className="text-center py-6">
                      <p className="text-[#213B14]/60 mb-4 text-sm">You must be logged in to leave a review.</p>
                      <Link to="/login" className="inline-block bg-[#213B14] hover:bg-[#3F622D] text-white px-6 py-2 rounded-full font-bold text-sm transition-colors">Log In</Link>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-[#213B14]/70 mb-2">Rating</label>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button key={s} type="button" onClick={() => setRating(s)} className="hover:scale-110 transition-transform">
                              <Star className={`w-7 h-7 ${s <= rating ? "fill-current text-[#E8A317]" : "text-[#213B14]/15 hover:text-[#213B14]/30"}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#213B14]/70 mb-2">Your Review</label>
                        <textarea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="What did you think of this product?" className="w-full bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl p-3 text-[#1C2A18] placeholder-[#213B14]/35 focus:outline-none focus:border-[#3F622D] transition-colors resize-none text-sm" />
                      </div>
                      {previewUrl ? (
                        <div className="relative w-full">
                          <div className="h-40 w-full rounded-xl overflow-hidden border border-[#213B14]/10 bg-[#F3EFE0]">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                          <button type="button" onClick={() => { setImageFile(null); setPreviewUrl(null); }} className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-white hover:bg-red-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#213B14]/15 rounded-xl cursor-pointer hover:border-[#3F622D]/50 transition-colors">
                          <ImageIcon className="w-6 h-6 text-[#213B14]/35 mb-1.5" />
                          <p className="text-xs text-[#213B14]/60"><span className="text-[#3F622D] font-semibold">Click to upload</span> (optional)</p>
                          <input type="file" className="hidden" accept="image/png,image/jpeg,image/jpg" onChange={(e) => { if (e.target.files?.[0]) { setImageFile(e.target.files[0]); setPreviewUrl(URL.createObjectURL(e.target.files[0])); } }} />
                        </label>
                      )}
                      <button type="submit" disabled={submittingReview} className="w-full bg-[#213B14] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#3F622D] transition-colors disabled:opacity-50 flex items-center justify-center">
                        {submittingReview ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Write your review"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

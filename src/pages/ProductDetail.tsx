import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Truck, Heart, ArrowLeft, ShieldCheck, ShoppingBag, Package, ImageIcon, X, User } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { productApi } from "../api/product.api";
import { reviewApi } from "../api/review.api";

export default function ProductDetail() {
 const { id } = useParams<{ id: string }>();
 const [product, setProduct] = useState<any>(null);
 const [loading, setLoading] = useState(true);
 const [similarProducts, setSimilarProducts] = useState<any[]>([]);
 const { addToCart } = useCart();
 const { user } = useAuth();
 const [quantity, setQuantity] = useState(1);

 // Review states
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
    
    // Fetch single product
    const res = await productApi.getById(id);
    const p = res.data;
    setProduct(p);

    // Fetch similar products (same category)
    const allRes = await productApi.getAll();
    const similar = allRes.data
     .filter((item: any) => item.category === p.category && item._id !== p._id)
     .slice(0, 4); // get up to 4
    setSimilarProducts(similar);
    
    // Fetch reviews
    await fetchReviews();
   } catch (err) {
    console.error("Failed to fetch product", err);
   } finally {
    setLoading(false);
   }
  };
  fetchProduct();
 }, [id]);

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
   const file = e.target.files[0];
   setImageFile(file);
   setPreviewUrl(URL.createObjectURL(file));
  }
 };

 const removeImage = () => {
  setImageFile(null);
  setPreviewUrl(null);
 };

 const handleReviewSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!comment.trim()) {
   return toast.error("Please enter a comment");
  }
  
  setSubmittingReview(true);
  try {
   const formData = new FormData();
   formData.append("rating", rating.toString());
   formData.append("comment", comment);
   if (imageFile) {
    formData.append("image", imageFile);
   }
   
   await reviewApi.addReview(id!, formData);
   toast.success("Review submitted successfully!");
   setComment("");
   setRating(5);
   removeImage();
   fetchReviews(); // Refresh the reviews list
   
   // Optionally re-fetch product to update avg rating
   const res = await productApi.getById(id!);
   setProduct(res.data);
  } catch (err: any) {
   toast.error(err.response?.data?.message || "Failed to submit review");
  } finally {
   setSubmittingReview(false);
  }
 };

 if (loading) {
  return (
   <div className="min-h-screen bg-black flex flex-col">
    <Header />
    <main className="flex-1 flex items-center justify-center">
     <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
    </main>
    <Footer />
   </div>
  );
 }

 if (!product) {
  return (
   <div className="min-h-screen bg-black flex flex-col text-white">
    <Header />
    <main className="flex-1 flex flex-col items-center justify-center">
     <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
     <Link to="/products" className="text-[#D4AF37] hover:underline">Return to Products</Link>
    </main>
    <Footer />
   </div>
  );
 }

 const discount = product.originalPrice 
  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
  : 0;

 return (
  <div className="min-h-screen bg-black flex flex-col font-sans text-white">
   <Header />
   
   <main className="flex-1 pt-24 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
     {/* Breadcrumb */}
     <nav className="mb-8 flex items-center text-sm text-white/40">
      <Link to="/" className="hover:text-white transition-colors">Home</Link>
      <span className="mx-2">/</span>
      <Link to="/products" className="hover:text-white transition-colors">Products</Link>
      <span className="mx-2">/</span>
      <span className="text-white/80">{product.category}</span>
      <span className="mx-2">/</span>
      <span className="text-white font-medium">{product.name}</span>
     </nav>

     <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
      {/* Left: Image gallery */}
      <div className="space-y-4 sticky top-28">
       <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="aspect-square bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden relative group"
       >
        {discount > 0 && (
         <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg tracking-wider">
          -{discount}% OFF
         </div>
        )}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
        <img 
         src={product.image} 
         alt={product.name} 
         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
       </motion.div>
      </div>

       {/* Right: Details */}
       <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col"
       >
        {/* Header section */}
        <div className="mb-6">
         <div className="flex items-center gap-2 text-[#D4AF37] mb-3">
          <div className="flex">
           {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className={`w-4 h-4 ${star <= Math.round(product.rating || 5) ? 'fill-current text-[#D4AF37]' : 'text-white/20'}`} />
           ))}
          </div>
          <span className="text-white/60 text-sm font-medium">{product.rating ? Number(product.rating).toFixed(1) : "5.0"} ({product.reviews || 0} reviews)</span>
         </div>
         <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-2">{product.name}</h1>
         
         {/* Benefit Line */}
         <p className="text-xl text-white/80 font-medium mb-6">
          {product.subtitle || "Premium freeze-dried fruits for guilt-free snacking"}
         </p>

         <div className="flex items-end gap-4 mb-2">
          <span className="text-4xl font-bold text-[#D4AF37]">₹{product.price}</span>
          {product.originalPrice && (
           <span className="text-xl text-white/40 line-through mb-1">₹{product.originalPrice}</span>
          )}
         </div>
         <p className="text-white/40 text-sm mb-6">Inclusive of all taxes</p>

         {/* Trust Points */}
         <div className="flex flex-wrap gap-4 mb-6">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <span className="text-[#D4AF37]">🍃</span>
            <span className="text-xs font-bold text-white/80">No Added Sugar</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <span className="text-[#D4AF37]">🧪</span>
            <span className="text-xs font-bold text-white/80">No Preservatives</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <span className="text-[#D4AF37]">🍓</span>
            <span className="text-xs font-bold text-white/80">Made from Real Fruit</span>
           </div>
         </div>

         {/* Urgency Line */}
         <div className="text-white/80 font-medium flex items-center gap-2 mb-2">
           <span className="text-xl">🔥</span> 
           {product.urgencyLine || "Perfect for guilt-free snacking & sweet cravings"}
         </div>
        </div>

        {/* Add to Cart Actions */}
        <div className="mb-8">
         <div className="flex flex-col sm:flex-row gap-4 mb-3">
          <div className="flex items-center bg-[#1a1a1a] rounded-xl border border-white/10 h-14">
           <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
           >
            -
           </button>
           <span className="w-12 text-center font-bold">{quantity}</span>
           <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
           >
            +
           </button>
          </div>
          
          <button 
           onClick={() => {
            for(let i=0; i<quantity; i++) addToCart(product);
            toast.success(`${quantity} x ${product.name} added to cart!`);
           }}
           className="flex-1 h-14 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-black transition-all"
          >
           <ShoppingBag className="w-5 h-5" />
           Add to Cart
          </button>
          
          <button 
           onClick={() => {
            for(let i=0; i<quantity; i++) addToCart(product);
            window.location.href = '/cart';
           }}
           className="flex-1 h-14 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#b5952f] transition-all shadow-lg shadow-[#D4AF37]/20"
          >
           Buy it now
          </button>
         </div>
         {/* Low Stock Indicator */}
         <div className="flex items-center gap-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${product.stock === 'Out of Stock' ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
          <span className={product.stock === 'Out of Stock' ? 'text-red-400' : 'text-green-400'}>
           {product.stock === 'Out of Stock' ? 'Out of stock' : 'Only few left in stock - order soon!'}
          </span>
         </div>
        </div>

        {/* Delivery & Security */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
         <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-colors">
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
           <Truck className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
           <h4 className="font-bold text-white text-sm mb-0.5">Fast Delivery</h4>
           <p className="text-xs text-white/50">Dispatched within 24 hours<br/>Delivered in 3-5 days</p>
          </div>
         </div>
         <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-colors">
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
           <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
           <h4 className="font-bold text-white text-sm mb-0.5">Secure Checkout</h4>
           <p className="text-xs text-white/50">100% safe & secure<br/>transactions</p>
          </div>
         </div>
        </div>

        {/* Description & About TDF Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         {/* Description */}
         <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Description</h3>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
           {product.description || "Experience the pure essence of nature with our premium freeze-dried products. No additives, no compromises - just real ingredients for a wholesome snacking experience."}
          </p>
          
          <ul className="space-y-3">
           {(product.highlights && product.highlights.length > 0 ? product.highlights : [
             "Freeze-dried chunks for real fruit taste",
             "Premium quality natural ingredients",
             "No preservatives, no artificial colors or flavors",
             "Light, crunchy, and naturally satisfying"
           ]).map((highlight: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3 text-white/80 text-sm">
             <div className="mt-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#D4AF37]/20 shrink-0">
               <span className="text-[#D4AF37] text-[10px]">✓</span>
             </div>
             <span>{highlight}</span>
            </li>
           ))}
          </ul>
          <p className="mt-6 text-[#D4AF37] text-sm font-bold italic">Perfect balance of taste + health in every bite.</p>
         </div>

         {/* About The Dry Factory */}
         <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-bold mb-6">About The Dry Factory</h3>
          <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black font-serif text-2xl font-bold text-[#D4AF37] mb-4">
           TDF
          </div>
          <p className="text-white/80 text-sm mb-2 font-medium">Trusted for clean, real-fruit products.</p>
          <p className="text-white/50 text-xs mb-8">Made with care • No shortcuts</p>
          
          <div className="flex w-full justify-between px-2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🍃</span>
              <span className="text-[10px] font-bold text-white/70">100% Natural</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="text-[10px] font-bold text-white/70">Clean Ingredients</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-white/80" />
              <span className="text-[10px] font-bold text-white/70">Quality Assured</span>
            </div>
          </div>
         </div>
        </div>
       </motion.div>
     </div>
     
     {/* Reviews Section */}
     <div className="border-t border-white/10 pt-16 mb-20">
      <h2 className="text-3xl font-bold mb-10">Customer Reviews</h2>
      
      <div className="grid lg:grid-cols-12 gap-12">
       <div className="lg:col-span-7 space-y-8">
        {reviews.length === 0 ? (
         <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 text-center">
          <Star className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
          <p className="text-white/40">Be the first to review this product!</p>
         </div>
        ) : (
         reviews.map((review) => (
          <div key={review._id} className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10">
           <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-5 h-5 text-white/60" />
             </div>
             <div>
              <h4 className="font-bold text-white">{review.user?.fullName || "Anonymous"}</h4>
              <p className="text-xs text-white/40">{new Date(review.createdAt).toLocaleDateString()}</p>
             </div>
            </div>
            <div className="flex">
             {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-current text-[#D4AF37]' : 'text-white/20'}`} />
             ))}
            </div>
           </div>
           
           <p className="text-white/80 leading-relaxed mb-4">{review.comment}</p>
           
           {review.image && (
            <div className="mt-4 rounded-xl overflow-hidden border border-white/10 w-48 h-48 bg-[#2a2a2a]">
             <img src={review.image} alt="Review" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
           )}
          </div>
         ))
        )}
       </div>
       
       <div className="lg:col-span-5">
        <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 sticky top-28">
         <h3 className="text-2xl font-bold mb-6">Write a Review</h3>
         
         {!user ? (
          <div className="text-center py-8">
           <p className="text-white/60 mb-4">You must be logged in to leave a review.</p>
           <Link to="/login" className="inline-block bg-[#D4AF37] text-black px-6 py-2 rounded-full font-bold">
            Log In
           </Link>
          </div>
         ) : (
          <form onSubmit={handleReviewSubmit} className="space-y-6">
           <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Rating</label>
            <div className="flex gap-2">
             {[1, 2, 3, 4, 5].map((star) => (
              <button
               key={star}
               type="button"
               onClick={() => setRating(star)}
               className="focus:outline-none hover:scale-110 transition-transform"
              >
               <Star className={`w-8 h-8 ${star <= rating ? 'fill-current text-[#D4AF37]' : 'text-white/20 hover:text-white/40'}`} />
              </button>
             ))}
            </div>
           </div>
           
           <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Your Review</label>
            <textarea
             rows={4}
             value={comment}
             onChange={(e) => setComment(e.target.value)}
             placeholder="What did you think of this product?"
             className="w-full bg-black border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
            />
           </div>
           
           <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Attach an Image (Optional)</label>
            {previewUrl ? (
             <div className="relative inline-block w-full">
              <div className="h-48 w-full rounded-xl overflow-hidden border border-white/10 bg-[#2a2a2a]">
               <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <button
               type="button"
               onClick={removeImage}
               className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-white hover:bg-red-500 transition-colors"
              >
               <X className="w-4 h-4" />
              </button>
             </div>
            ) : (
             <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-[#D4AF37]/50 hover:bg-white/5 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
               <ImageIcon className="w-8 h-8 text-white/40 mb-2" />
               <p className="text-sm text-white/60"><span className="font-semibold text-[#D4AF37]">Click to upload</span> or drag and drop</p>
               <p className="text-xs text-white/40 mt-1">PNG, JPG or JPEG (MAX. 5MB)</p>
              </div>
              <input 
               type="file" 
               className="hidden" 
               accept="image/png, image/jpeg, image/jpg"
               onChange={handleImageChange}
              />
             </label>
            )}
           </div>
           
           <button
            type="submit"
            disabled={submittingReview}
            className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold text-lg hover:bg-[#b5952f] transition-colors shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50 flex items-center justify-center"
           >
            {submittingReview ? (
             <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
             "Submit Review"
            )}
           </button>
          </form>
         )}
        </div>
       </div>
      </div>
     </div>

     {/* Similar Items */}
     {similarProducts.length > 0 && (
      <div className="border-t border-white/10 pt-16">
       <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">You may also like</h2>
        <Link to={`/products?category=${product.category}`} className="text-sm font-bold text-white/60 hover:text-white flex items-center gap-1 transition-colors">
         View all <span className="textlg leading-none">→</span>
        </Link>
       </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((p) => (
         <div 
          key={p._id} 
          className="group bg-[#161616] rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/35 transition-all block relative cursor-pointer"
          onClick={() => window.location.href = `/product/${p._id}`}
         >
          <button
           aria-label="Add to wishlist"
           className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-red-400 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
          >
           <Heart className="w-3.5 h-3.5" />
          </button>
          
          <div className="aspect-[4/3] bg-[#222] overflow-hidden relative">
           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
           <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-5 flex flex-col flex-1">
           <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#D4AF37] transition-colors">{p.name}</h3>
           <p className="text-white/60 text-xs mt-1.5 line-clamp-2">{p.subtitle || "Premium freeze-dried fruit selection."}</p>
           
           <div className="mt-4 pt-4 border-t border-white/10">
            <span className="font-bold text-lg text-white mb-3 block">₹{p.price}</span>
            <button 
             onClick={(e) => {
              e.stopPropagation();
              addToCart(p);
              toast.success(`${p.name} added to cart!`);
             }}
             className="w-full py-2.5 bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-black transition-all"
            >
             <ShoppingBag className="w-4 h-4" />
             Add to Cart
            </button>
           </div>
          </div>
         </div>
        ))}
       </div>
      </div>
     )}
    </div>
   </main>
   
   <Footer />
  </div>
 );
}

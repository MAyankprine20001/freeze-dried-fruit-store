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
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
        <div className="flex items-end gap-4 mb-2">
         <span className="text-4xl font-bold text-[#D4AF37]">₹{product.price}</span>
         {product.originalPrice && (
          <span className="text-xl text-white/40 line-through mb-1">₹{product.originalPrice}</span>
         )}
        </div>
        <p className="text-white/40 text-sm">Inclusive of all taxes</p>
       </div>

       {/* Add to Cart Actions */}
       <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

       {/* Delivery info */}
       <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
         <Truck className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <div>
         <h4 className="font-bold text-white mb-1">Fast Delivery</h4>
         <p className="text-sm text-white/60">Dispatches within 24 hours. Delivered in 3-5 days.</p>
        </div>
       </div>

       {/* Description */}
       <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Description:</h3>
        <p className="text-white/60 leading-relaxed mb-6">
         {product.subtitle || "Experience the pure essence of nature with our premium freeze-dried selection. Zero additives, maximum flavor, and perfect crunch in every bite."}
        </p>
        
        {product.highlights && product.highlights.length > 0 && (
         <ul className="space-y-3">
          {product.highlights.map((highlight: string, idx: number) => (
           <li key={idx} className="flex items-start gap-3 text-white/80">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            <span>{highlight}</span>
           </li>
          ))}
         </ul>
        )}
       </div>

       {/* Store details equivalent */}
       <div className="pt-6 border-t border-white/10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black font-serif text-lg font-bold text-[#D4AF37]">
         TDF
        </div>
        <div>
         <h4 className="font-bold text-white">The Dry Factory</h4>
         <p className="text-xs text-white/40">Premium Freeze-Dried Fruits</p>
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
       <h2 className="text-2xl font-bold mb-8">Similar items</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((p) => (
         <Link 
          key={p._id} 
          to={`/product/${p._id}`}
          className="group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-colors block"
         >
          <div className="aspect-[4/3] bg-[#2a2a2a] overflow-hidden relative">
           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
           <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-5">
           <h3 className="font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{p.name}</h3>
           <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-lg">₹{p.price}</span>
           </div>
          </div>
         </Link>
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

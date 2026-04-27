import React, { useState, useEffect, useRef } from "react";
import { 
 Package, 
 Plus, 
 Search, 
 Filter, 
 Edit2, 
 Trash2, 
 Eye,
 ArrowUpDown,
 X,
 Loader2,
 Image as ImageIcon,
 Upload,
 Link as LinkIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { productApi } from "../../api/product.api";
import { toast } from "react-toastify";

export default function AdminProducts() {
 const [products, setProducts] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState("");
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
 const [editingProduct, setEditingProduct] = useState<any>(null);
 const [previewProduct, setPreviewProduct] = useState<any>(null);
 const [submitting, setSubmitting] = useState(false);

 const [isUploading, setIsUploading] = useState(false);
 const fileInputRef = useRef<HTMLInputElement>(null);

 // Form State
 const [formData, setFormData] = useState({
  name: "",
  category: "Fruit Powders",
  price: 0,
  stockCount: 0,
  stock: "In Stock",
  image: "",
  subtitle: "",
  weight: "",
  description: ""
 });

 const fetchProducts = async () => {
  try {
   setLoading(true);
   const res = await productApi.getAll();
   setProducts(res.data);
  } catch (error: any) {
   toast.error(error.response?.data?.message || "Failed to fetch products");
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchProducts();
 }, []);

 const handleOpenModal = (product: any = null) => {
  if (product) {
   setEditingProduct(product);
   setFormData({
    name: product.name,
    category: product.category,
    price: product.price,
    stockCount: product.stockCount || 0,
    stock: product.stock,
    image: product.image,
    subtitle: product.subtitle || "",
    weight: product.weight || "",
    description: product.description || ""
   });
  } else {
   setEditingProduct(null);
   setFormData({
    name: "",
    category: "Fruit Powders",
    price: 0,
    stockCount: 0,
    stock: "In Stock",
    image: "",
    subtitle: "",
    weight: "",
    description: ""
   });
  }
  setIsModalOpen(true);
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);
  try {
   if (editingProduct) {
    await productApi.update(editingProduct._id, formData);
    toast.success("Product updated successfully");
   } else {
    await productApi.create(formData);
    toast.success("Product created successfully");
   }
   setIsModalOpen(false);
   fetchProducts();
  } catch (error: any) {
   toast.error(error.response?.data?.message || "Failed to save product");
  } finally {
   setSubmitting(false);
  }
 };

 const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
   setIsUploading(true);
   const res = await productApi.uploadImage(file);
   setFormData({ ...formData, image: res.data.url });
   toast.success("Image uploaded successfully");
  } catch (error: any) {
   toast.error(error.response?.data?.message || "Failed to upload image");
  } finally {
   setIsUploading(false);
  }
 };

 const handleDelete = async (id: string) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;
  try {
   await productApi.delete(id);
   toast.success("Product deleted successfully");
   fetchProducts();
  } catch (error: any) {
   toast.error(error.response?.data?.message || "Failed to delete product");
  }
 };

 const filteredProducts = products.filter(p => 
  p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
  p.category.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
  <div className="space-y-6">
   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
     <h1 className="text-2xl font-bold text-[#1a1a1a]">Products</h1>
     <p className="text-[#6c757d]">Manage your product catalog and inventory.</p>
    </div>
    <button 
     onClick={() => handleOpenModal()}
     className="flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2a2a2a] transition-all shadow-lg shadow-[#1a1a1a]/10"
    >
     <Plus className="w-5 h-5" />
     Add Product
    </button>
   </div>

   {/* Filters & Search */}
   <div className="bg-white p-4 rounded-2xl border border-[#eef0f2] shadow-sm flex flex-col md:flex-row gap-4 items-center">
    <div className="relative flex-1 w-full">
     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#adb5bd]" />
     <input 
      type="text" 
      placeholder="Search products by name, category..." 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2.5 bg-[#f8f9fa] border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1a1a1a]/5"
     />
    </div>
    <div className="flex items-center gap-2 w-full md:w-auto">
     <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f8f9fa] text-[#6c757d] rounded-xl text-sm font-semibold hover:bg-[#eef0f2] transition-colors">
      <Filter className="w-4 h-4" />
      Filters
     </button>
     <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f8f9fa] text-[#6c757d] rounded-xl text-sm font-semibold hover:bg-[#eef0f2] transition-colors">
      <ArrowUpDown className="w-4 h-4" />
      Sort
     </button>
    </div>
   </div>

   {/* Products Table */}
   <div className="bg-white rounded-[32px] border border-[#eef0f2] shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
     {loading ? (
      <div className="p-20 flex flex-col items-center justify-center text-[#adb5bd]">
       <Loader2 className="w-10 h-10 animate-spin mb-4" />
       <p className="font-medium">Loading products...</p>
      </div>
     ) : (
      <table className="w-full text-left border-collapse">
       <thead>
        <tr className="bg-[#f8f9fa] border-b border-[#eef0f2]">
         <th className="px-6 py-4 text-xs font-bold text-[#adb5bd] uppercase tracking-wider">Product</th>
         <th className="px-6 py-4 text-xs font-bold text-[#adb5bd] uppercase tracking-wider">Category</th>
         <th className="px-6 py-4 text-xs font-bold text-[#adb5bd] uppercase tracking-wider">Price</th>
         <th className="px-6 py-4 text-xs font-bold text-[#adb5bd] uppercase tracking-wider">Stock</th>
         <th className="px-6 py-4 text-xs font-bold text-[#adb5bd] uppercase tracking-wider">Status</th>
         <th className="px-6 py-4 text-xs font-bold text-[#adb5bd] uppercase tracking-wider text-right">Actions</th>
        </tr>
       </thead>
       <tbody className="divide-y divide-[#eef0f2]">
        <AnimatePresence>
         {filteredProducts.map((product) => (
          <motion.tr 
           key={product._id}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="hover:bg-[#fafbfc] transition-colors group"
          >
           <td className="px-6 py-4">
            <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#f8f9fa] flex-shrink-0 border border-[#eef0f2]">
              <img src={product.image} alt="" className="w-full h-full object-cover" />
             </div>
             <div>
              <p className="text-sm font-bold text-[#1a1a1a]">{product.name}</p>
              <p className="text-[10px] font-bold text-[#adb5bd] uppercase tracking-tight">{product._id.slice(-6)}</p>
             </div>
            </div>
           </td>
           <td className="px-6 py-4">
            <span className="text-sm text-[#6c757d] font-medium">{product.category}</span>
           </td>
           <td className="px-6 py-4 font-bold text-[#1a1a1a]">₹{product.price}</td>
           <td className="px-6 py-4 font-bold text-[#1a1a1a]">{product.stockCount || 0}</td>
           <td className="px-6 py-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
             product.stock === "In Stock" ? "bg-green-50 text-green-600" :
             product.stock === "Low Stock" ? "bg-orange-50 text-orange-600" :
             "bg-red-50 text-red-600"
            }`}>
             {product.stock}
            </span>
           </td>
           <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2">
             <button 
              onClick={() => {
               setPreviewProduct(product);
               setIsPreviewModalOpen(true);
              }}
              className="p-2 text-[#8a8a8a] hover:text-[#1a1a1a] hover:bg-white rounded-lg shadow-sm transition-all"
              title="Preview"
             >
              <Eye className="w-4 h-4" />
             </button>

             <button 
              onClick={() => handleOpenModal(product)}
              className="p-2 text-[#8a8a8a] hover:text-blue-500 hover:bg-white rounded-lg shadow-sm transition-all"
              title="Edit"
             >
              <Edit2 className="w-4 h-4" />
             </button>
             <button 
              onClick={() => handleDelete(product._id)}
              className="p-2 text-[#8a8a8a] hover:text-red-500 hover:bg-white rounded-lg shadow-sm transition-all"
              title="Delete"
             >
              <Trash2 className="w-4 h-4" />
             </button>
            </div>
           </td>
          </motion.tr>
         ))}
        </AnimatePresence>
       </tbody>
      </table>
     )}
    </div>
    
    {!loading && filteredProducts.length === 0 && (
     <div className="p-12 text-center text-[#adb5bd]">
      <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
      <p className="font-medium">No products found matching your search.</p>
     </div>
    )}

    <div className="px-6 py-4 bg-[#f8f9fa] border-t border-[#eef0f2] flex items-center justify-between">
     <p className="text-xs font-bold text-[#adb5bd] uppercase">Showing {filteredProducts.length} of {products.length} Products</p>
     <div className="flex gap-2">
      <button className="px-3 py-1.5 bg-white border border-[#eef0f2] rounded-lg text-xs font-bold text-[#6c757d] hover:bg-[#fafbfc] disabled:opacity-50" disabled>Previous</button>
      <button className="px-3 py-1.5 bg-white border border-[#eef0f2] rounded-lg text-xs font-bold text-[#1a1a1a] hover:bg-[#fafbfc]">Next</button>
     </div>
    </div>
   </div>

   {/* Add/Edit Modal */}
   <AnimatePresence>
    {isModalOpen && (
     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       onClick={() => setIsModalOpen(false)}
       className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
       initial={{ opacity: 0, scale: 0.95, y: 20 }}
       animate={{ opacity: 1, scale: 1, y: 0 }}
       exit={{ opacity: 0, scale: 0.95, y: 20 }}
       className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
      >
       <div className="p-6 border-b border-[#eef0f2] flex items-center justify-between bg-[#f8f9fa]">
        <h2 className="text-xl font-bold text-[#1a1a1a]">
         {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <button 
         onClick={() => setIsModalOpen(false)}
         className="p-2 hover:bg-white rounded-xl transition-colors"
        >
         <X className="w-5 h-5 text-[#6c757d]" />
        </button>
       </div>

       <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[70vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Basic Info */}
         <div className="space-y-4 md:col-span-2">
          <label className="text-xs font-bold text-[#adb5bd] uppercase tracking-wider">Basic Information</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1a1a1a] ml-1">Product Name</label>
            <input 
             type="text"
             required
             value={formData.name}
             onChange={(e) => setFormData({...formData, name: e.target.value})}
             className="w-full px-4 py-3 bg-[#f8f9fa] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a1a1a]/5 outline-none"
             placeholder="e.g. Strawberry Powder"
            />
           </div>
           <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1a1a1a] ml-1">Category</label>
            <select 
             value={formData.category}
             onChange={(e) => setFormData({...formData, category: e.target.value})}
             className="w-full px-4 py-3 bg-[#f8f9fa] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a1a1a]/5 outline-none"
            >
             <option>Fruit Powders</option>
             <option>Fruit Chunks</option>
             <option>Smoothie Premix</option>
             <option>Chocolates</option>
             <option>Combos</option>
             <option>Gifts</option>
            </select>
           </div>
          </div>
         </div>

         {/* Pricing & Stock */}
         <div className="space-y-4">
          <label className="text-xs font-bold text-[#adb5bd] uppercase tracking-wider">Pricing & Stock</label>
          <div className="space-y-4">
           <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1a1a1a] ml-1">Price (₹)</label>
            <input 
             type="number"
             required
             value={formData.price}
             onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
             className="w-full px-4 py-3 bg-[#f8f9fa] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a1a1a]/5 outline-none"
            />
           </div>
           <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1a1a1a] ml-1">Stock Count</label>
            <input 
             type="number"
             required
             value={formData.stockCount}
             onChange={(e) => setFormData({...formData, stockCount: Number(e.target.value)})}
             className="w-full px-4 py-3 bg-[#f8f9fa] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a1a1a]/5 outline-none"
            />
           </div>
           <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1a1a1a] ml-1">Status</label>
            <select 
             value={formData.stock}
             onChange={(e) => setFormData({...formData, stock: e.target.value})}
             className="w-full px-4 py-3 bg-[#f8f9fa] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a1a1a]/5 outline-none"
            >
             <option>In Stock</option>
             <option>Low Stock</option>
             <option>Out of Stock</option>
            </select>
           </div>
          </div>
         </div>

         {/* Media & Details */}
         <div className="space-y-4">
          <label className="text-xs font-bold text-[#adb5bd] uppercase tracking-wider">Media & Details</label>
          <div className="space-y-4">
           <div className="space-y-1.5">
            <div className="flex items-center justify-between mb-1">
             <label className="text-sm font-semibold text-[#1a1a1a] ml-1">Product Image</label>
             <span className="text-[10px] font-bold text-[#adb5bd] uppercase">URL or Upload</span>
            </div>
            
            <div className="space-y-2">
             {/* Image Preview if exists */}
             {formData.image && (
              <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-[#eef0f2] mb-2 group">
               <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
               <button 
                type="button"
                onClick={() => setFormData({...formData, image: ""})}
                className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
               >
                <X className="w-4 h-4" />
               </button>
              </div>
             )}

             <div className="flex gap-2">
              <div className="relative flex-1">
               <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#adb5bd]" />
               <input 
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-[#f8f9fa] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a1a1a]/5 outline-none"
                placeholder="Paste Image URL..."
               />
              </div>
              
              <input 
               type="file" 
               ref={fileInputRef}
               onChange={handleFileUpload}
               className="hidden" 
               accept="image/*"
              />
              
              <button 
               type="button"
               disabled={isUploading}
               onClick={() => fileInputRef.current?.click()}
               className="px-4 py-3 bg-[#1a1a1a] text-white rounded-xl hover:bg-[#2a2a2a] transition-all disabled:opacity-50 flex items-center justify-center min-w-[48px]"
               title="Upload Image"
              >
               {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
               ) : (
                <Upload className="w-4 h-4" />
               )}
              </button>
             </div>
            </div>
           </div>
           
           <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1a1a1a] ml-1">Weight (e.g. 100g)</label>
            <input 
             type="text"
             value={formData.weight}
             onChange={(e) => setFormData({...formData, weight: e.target.value})}
             className="w-full px-4 py-3 bg-[#f8f9fa] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a1a1a]/5 outline-none"
            />
           </div>
           <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1a1a1a] ml-1">Subtitle</label>
            <input 
             type="text"
             value={formData.subtitle}
             onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
             className="w-full px-4 py-3 bg-[#f8f9fa] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a1a1a]/5 outline-none"
            />
           </div>
          </div>
         </div>
        </div>

        <div className="mt-8 flex gap-3">
         <button 
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="flex-1 py-4 bg-[#f8f9fa] text-[#1a1a1a] rounded-2xl font-bold hover:bg-[#eef0f2] transition-all"
         >
          Cancel
         </button>
         <button 
          type="submit"
          disabled={submitting || isUploading}
          className="flex-[2] py-4 bg-[#1a1a1a] text-white rounded-2xl font-bold hover:bg-[#2a2a2a] transition-all shadow-lg shadow-[#1a1a1a]/10 disabled:opacity-50 flex items-center justify-center gap-2"
         >
          {submitting ? (
           <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
           editingProduct ? "Update Product" : "Create Product"
          )}
         </button>
        </div>
       </form>
      </motion.div>
     </div>
    )}
   </AnimatePresence>
   {/* Preview Modal */}
   <AnimatePresence>
    {isPreviewModalOpen && previewProduct && (
     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       onClick={() => setIsPreviewModalOpen(false)}
       className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      <motion.div 
       initial={{ opacity: 0, scale: 0.9, y: 40 }}
       animate={{ opacity: 1, scale: 1, y: 0 }}
       exit={{ opacity: 0, scale: 0.9, y: 40 }}
       className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] max-h-[800px]"
      >
       {/* Left: Image Section */}
       <div className="md:w-1/2 bg-[#f8f9fa] relative overflow-hidden group">
        <img 
         src={previewProduct.image} 
         alt={previewProduct.name} 
         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-6 left-6">
         <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[#1a1a1a] text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
          {previewProduct.category}
         </span>
        </div>
       </div>

       {/* Right: Content Section */}
       <div className="md:w-1/2 p-10 flex flex-col justify-between bg-white relative">
        <button 
         onClick={() => setIsPreviewModalOpen(false)}
         className="absolute top-6 right-6 p-2 hover:bg-[#f8f9fa] rounded-full transition-colors"
        >
         <X className="w-5 h-5 text-[#adb5bd]" />
        </button>

        <div>
         <div className="mb-8">
          <h2 className="text-4xl font-black text-[#1a1a1a] mb-2 leading-tight">
           {previewProduct.name}
          </h2>
          <p className="text-[#6c757d] text-lg font-medium">{previewProduct.subtitle || "Premium freeze-dried fruit selection."}</p>
         </div>

         <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
           <p className="text-[10px] font-black text-[#adb5bd] uppercase tracking-[0.2em] mb-2">Price</p>
           <p className="text-3xl font-black text-[#1a1a1a]">₹{previewProduct.price}</p>
          </div>
          <div>
           <p className="text-[10px] font-black text-[#adb5bd] uppercase tracking-[0.2em] mb-2">Weight</p>
           <p className="text-xl font-bold text-[#6c757d]">{previewProduct.weight || "100g"}</p>
          </div>
          <div>
           <p className="text-[10px] font-black text-[#adb5bd] uppercase tracking-[0.2em] mb-2">Inventory</p>
           <p className="text-xl font-bold text-[#1a1a1a]">{previewProduct.stockCount} Units</p>
          </div>
          <div>
           <p className="text-[10px] font-black text-[#adb5bd] uppercase tracking-[0.2em] mb-2">Availability</p>
           <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            previewProduct.stock === "In Stock" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
           }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${previewProduct.stock === "In Stock" ? "bg-green-600 animate-pulse" : "bg-red-600"}`} />
            {previewProduct.stock}
           </span>
          </div>
         </div>

         <div className="space-y-4">
           <p className="text-[10px] font-black text-[#adb5bd] uppercase tracking-[0.2em]">Product Description</p>
           <p className="text-[#6c757d] text-sm leading-relaxed">
            {previewProduct.description || "Our premium freeze-dried fruits are harvested at peak ripeness and processed using advanced cold-press technology to preserve 97% of vitamins, minerals, and flavor. No added sugars, no preservativesjust the pure essence of nature."}
           </p>
         </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button 
           onClick={() => {
            setIsPreviewModalOpen(false);
            handleOpenModal(previewProduct);
           }}
           className="flex-1 py-4 bg-[#1a1a1a] text-white rounded-2xl font-bold hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-2"
          >
           <Edit2 className="w-4 h-4" />
           Edit Product
          </button>
          <button 
           onClick={() => setIsPreviewModalOpen(false)}
           className="px-8 py-4 bg-[#f8f9fa] text-[#1a1a1a] rounded-2xl font-bold hover:bg-[#eef0f2] transition-all"
          >
           Close
          </button>
        </div>
       </div>
      </motion.div>
     </div>
    )}
   </AnimatePresence>
  </div>
 );
}


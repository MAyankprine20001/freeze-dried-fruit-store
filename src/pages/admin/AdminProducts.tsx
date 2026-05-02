import React, { useState, useEffect, useRef } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  X,
  Loader2,
  Upload,
  Star,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowUpDown,
  MoreVertical,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { productApi } from "../../api/product.api";
import { toast } from "react-toastify";

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

const TRUST_BADGE_OPTIONS = [
  "No Sugar",
  "No Preservatives",
  "Real Fruit",
  "No Added Sugar",
  "Freeze Dried",
  "Gluten Free",
  "Vegan",
  "100% Natural",
];

const emptyForm = {
  name: "",
  sku: "",
  category: "Smoothie Premix",
  subtitle: "",
  description: "",
  price: 0,
  originalPrice: 0,
  weight: "",
  stockCount: 0,
  stock: "In Stock" as string,
  status: "Active" as string,
  image: "",
  featured: false,
  urgencyLine: "",
  highlights: "",
  trustBadges: [] as string[],
  relatedProducts: [] as string[],
};

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({ ...emptyForm });

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
        name: product.name || "",
        sku: product.sku || "",
        category: product.category || "Smoothie Premix",
        subtitle: product.subtitle || "",
        description: product.description || "",
        price: product.price || 0,
        originalPrice: product.originalPrice || 0,
        weight: product.weight || "",
        stockCount: product.stockCount || 0,
        stock: product.stock || "In Stock",
        status: product.status || "Active",
        image: product.image || "",
        featured: product.featured || false,
        urgencyLine: product.urgencyLine || "",
        highlights: Array.isArray(product.highlights) ? product.highlights.join(", ") : "",
        trustBadges: Array.isArray(product.trustBadges) ? product.trustBadges : [],
        relatedProducts: Array.isArray(product.relatedProducts)
          ? product.relatedProducts.map((r: any) => (typeof r === "object" ? r._id : r))
          : [],
      });
    } else {
      setEditingProduct(null);
      setFormData({ ...emptyForm });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        highlights: formData.highlights
          ? formData.highlights.split(",").map((h) => h.trim()).filter(Boolean)
          : [],
        originalPrice: formData.originalPrice || undefined,
        trustBadges: formData.trustBadges,
        relatedProducts: formData.relatedProducts,
      };
      if (editingProduct) {
        await productApi.update(editingProduct._id, payload);
        toast.success("Product updated successfully");
      } else {
        await productApi.create(payload);
        toast.success("Product created successfully");
      }
      handleCloseModal();
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
      setFormData((prev) => ({ ...prev, image: res.data.url }));
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

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const inStock = products.filter((p) => p.stock === "In Stock").length;
  const lowStock = products.filter((p) => p.stock === "Low Stock").length;
  const outOfStock = products.filter((p) => p.stock === "Out of Stock").length;

  const inputCls = "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none";
  const labelCls = "text-xs font-bold text-gray-700";

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500">Manage your product catalog and inventory.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#111827] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1f2937] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name, category, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p className="text-sm font-medium">Loading products...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Weight</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Featured</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">{product.name}</p>
                            {product.subtitle && <p className="text-[10px] text-gray-400 truncate max-w-[160px]">{product.subtitle}</p>}
                            <p className="text-[10px] font-semibold text-gray-400">SKU: {product.sku || product._id.slice(-6).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 font-semibold">{product.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-bold text-gray-800 text-sm">₹{product.price}</span>
                          {product.originalPrice > 0 && (
                            <span className="block text-[10px] text-gray-400 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-500">{product.weight || "—"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-800">{product.stockCount || 0}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wide mt-0.5 ${
                            product.stock === "In Stock" ? "text-green-600" :
                            product.stock === "Low Stock" ? "text-orange-500" : "text-red-500"
                          }`}>
                            {product.stock}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          product.status === "Active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                        }`}>
                          {product.status || "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={async () => {
                            try {
                              await productApi.update(product._id, { featured: !product.featured });
                              toast.success(`Product ${!product.featured ? "featured" : "unfeatured"}`);
                              fetchProducts();
                            } catch {
                              toast.error("Failed to update feature status");
                            }
                          }}
                          title={product.featured ? "Remove from Featured" : "Mark as Featured"}
                        >
                          <Star className={`w-4 h-4 ${product.featured ? "fill-[#D4A017] text-[#D4A017]" : "text-gray-300"}`} />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 text-gray-400">
                          <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all" title="Preview">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleOpenModal(product)} className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all" title="Edit">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(product._id)} className="p-1 hover:text-red-500 hover:bg-red-50 rounded transition-all" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all">
                            <MoreVertical className="w-3.5 h-3.5" />
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
          <div className="p-12 text-center text-gray-400">
            <Package className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium">No products found matching your search.</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400">Showing {filteredProducts.length} of {products.length} products</p>
        </div>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Products", value: products.length, color: "bg-blue-500", iconColor: "text-blue-500", icon: Package },
          { label: "In Stock", value: inStock, color: "bg-green-500", iconColor: "text-green-500", icon: CheckCircle },
          { label: "Low Stock", value: lowStock, color: "bg-orange-500", iconColor: "text-orange-500", icon: AlertTriangle },
          { label: "Out of Stock", value: outOfStock, color: "bg-red-500", iconColor: "text-red-500", icon: XCircle },
        ].map((card) => (
          <div key={card.label} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              <p className="text-xs font-semibold text-gray-500">{card.label}</p>
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* ── Centered Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col pointer-events-auto max-h-[92vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-2xl flex-shrink-0">
                  <div>
                    <h2 className="text-base font-bold text-gray-800">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Fill in all relevant product details</p>
                  </div>
                  <button onClick={handleCloseModal} className="p-1.5 hover:bg-white rounded-lg transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Scrollable Body */}
                <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                  {/* Section: Basic Info */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" /> Basic Info
                    </p>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className={labelCls}>Product Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} placeholder="e.g. Banana Cocoa Dark" />
                      </div>

                      <div className="space-y-1">
                        <label className={labelCls}>Benefit Line / Subtitle</label>
                        <input type="text" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className={inputCls} placeholder="e.g. Rich dark chocolate + real banana crunch" />
                      </div>

                      <div className="space-y-1">
                        <label className={labelCls}>Description</label>
                        <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`${inputCls} resize-none`} placeholder="Detailed product description for the product detail page..." />
                      </div>

                      <div className="space-y-1">
                        <label className={labelCls}>Highlights (comma-separated)</label>
                        <input type="text" value={formData.highlights} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} className={inputCls} placeholder="e.g. No preservatives, 100% real fruit, Freeze-dried" />
                        <p className="text-[10px] text-gray-400">Separate each bullet point with a comma</p>
                      </div>

                      <div className="space-y-1">
                        <label className={labelCls}>Urgency Line</label>
                        <input type="text" value={formData.urgencyLine} onChange={(e) => setFormData({ ...formData, urgencyLine: e.target.value })} className={inputCls} placeholder="e.g. Perfect for guilt-free snacking & sweet cravings" />
                      </div>
                    </div>
                  </div>

                  {/* Section: Category & Status */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Category & Status
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className={labelCls}>Category</label>
                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inputCls}>
                          <option>Smoothie Premix</option>
                          <option>Chocolates</option>
                          <option>Fruit Chunks</option>
                          <option>Fruit Powders</option>
                          <option>Combos</option>
                          <option>Gifts</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>Status</label>
                        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className={inputCls}>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 cursor-pointer" onClick={() => setFormData({ ...formData, featured: !formData.featured })}>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${formData.featured ? "bg-[#D4A017] border-[#D4A017]" : "border-gray-300"}`}>
                        {formData.featured && <span className="text-white text-[10px] font-bold">✓</span>}
                      </div>
                      <label className="text-xs font-bold text-gray-700 cursor-pointer flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#D4A017]" /> Mark as Bestseller / Featured
                      </label>
                    </div>
                  </div>

                  {/* Section: Pricing & Stock */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">💰 Pricing & Stock</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className={labelCls}>Selling Price (₹) *</label>
                        <input type="number" required min={0} value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className={inputCls} />
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>Original / MRP (₹)</label>
                        <input type="number" min={0} value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })} className={inputCls} placeholder="0 = no strikethrough" />
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>Weight / Size</label>
                        <input type="text" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} className={inputCls} placeholder="e.g. 70g, 100g, 30g" />
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>Stock Count *</label>
                        <input type="number" required min={0} value={formData.stockCount} onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })} className={inputCls} />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <label className={labelCls}>Stock Status</label>
                        <select value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className={inputCls}>
                          <option>In Stock</option>
                          <option>Low Stock</option>
                          <option>Out of Stock</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section: Trust Badges */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">🏷 Trust Badges</p>
                    <div className="grid grid-cols-2 gap-2">
                      {TRUST_BADGE_OPTIONS.map((badge) => {
                        const checked = formData.trustBadges.includes(badge);
                        return (
                          <label key={badge} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-xs font-semibold transition-all ${checked ? "bg-[#D4A017]/10 border-[#D4A017] text-[#D4A017]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={checked}
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  trustBadges: checked
                                    ? formData.trustBadges.filter((b) => b !== badge)
                                    : [...formData.trustBadges, badge],
                                })
                              }
                            />
                            <span className={`w-3.5 h-3.5 rounded border-2 flex-shrink-0 flex items-center justify-center ${checked ? "bg-[#D4A017] border-[#D4A017]" : "border-gray-300"}`}>
                              {checked && <span className="text-white text-[8px] font-black">✓</span>}
                            </span>
                            {badge}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section: Related Products */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">🔗 Related Products ("You may also like")</p>
                    <p className="text-[10px] text-gray-400 mb-3">Select products to show in the "You may also like" section on this product's detail page.</p>
                    <div className="max-h-40 overflow-y-auto space-y-1.5 border border-gray-200 rounded-lg p-2">
                      {products
                        .filter((p) => !editingProduct || p._id !== editingProduct._id)
                        .map((p) => {
                          const selected = formData.relatedProducts.includes(p._id);
                          return (
                            <label key={p._id} className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer text-xs transition-all ${selected ? "bg-[#D4A017]/10" : "hover:bg-gray-50"}`}>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={selected}
                                onChange={() =>
                                  setFormData({
                                    ...formData,
                                    relatedProducts: selected
                                      ? formData.relatedProducts.filter((id) => id !== p._id)
                                      : [...formData.relatedProducts, p._id],
                                  })
                                }
                              />
                              <span className={`w-3.5 h-3.5 rounded border-2 flex-shrink-0 flex items-center justify-center ${selected ? "bg-[#D4A017] border-[#D4A017]" : "border-gray-300"}`}>
                                {selected && <span className="text-white text-[8px] font-black">✓</span>}
                              </span>
                              <div className="w-7 h-7 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                <img src={p.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <span className={`font-semibold ${selected ? "text-[#D4A017]" : "text-gray-700"}`}>{p.name}</span>
                              <span className="text-gray-400 ml-auto">{p.category}</span>
                            </label>
                          );
                        })}
                    </div>
                    {formData.relatedProducts.length > 0 && (
                      <p className="text-[10px] text-[#D4A017] mt-1 font-semibold">{formData.relatedProducts.length} product(s) selected</p>
                    )}
                  </div>

                  {/* Section: Image */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">🖼 Product Image</p>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-2 text-gray-400 py-6 border-2 border-dashed border-gray-200 rounded-xl">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-xs font-bold">Uploading...</span>
                      </div>
                    ) : formData.image ? (
                      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111827] text-white rounded-lg text-xs font-bold hover:bg-[#1f2937] transition-colors">
                            <Upload className="w-3.5 h-3.5" /> Change Image
                          </button>
                          <button type="button" onClick={() => setFormData({ ...formData, image: "" })} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors border border-red-200">
                            <X className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-6">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-700">
                          <Upload className="w-5 h-5" />
                          <span className="text-xs font-bold">Upload Image</span>
                          <span className="text-[10px]">PNG, JPG, JPEG up to 5MB</span>
                        </button>
                      </div>
                    )}
                  </div>
                </form>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex gap-3 bg-white rounded-b-2xl flex-shrink-0">
                  <button type="button" onClick={handleCloseModal} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all">
                    Cancel
                  </button>
                  <button type="submit" form="product-form" disabled={submitting || isUploading} className="flex-1 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold hover:bg-[#1f2937] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingProduct ? "Update Product" : "Save Product")}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

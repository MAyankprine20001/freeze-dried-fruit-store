import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Copy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { productApi } from "../../api/product.api";
import { toast } from "react-toastify";
import { getProductPrimaryImage } from "../../utils/productImage";

const PAGE_LIMIT = 20;

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

/** Predefined badges in catalog order, then comma-separated customs (deduped, skipping predefined duplicates). */
function mergeTrustBadgesForSubmit(predefinedSelected: string[], customCsv: string): string[] {
  const predefinedOrdered = TRUST_BADGE_OPTIONS.filter((b) => predefinedSelected.includes(b));
  const customParsed = customCsv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const seen = new Set(predefinedOrdered);
  const customOrdered: string[] = [];
  for (const c of customParsed) {
    if (!seen.has(c)) {
      seen.add(c);
      customOrdered.push(c);
    }
  }
  return [...predefinedOrdered, ...customOrdered];
}

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
  images: [] as string[],
  featured: false,
  urgencyLine: "",
  highlights: "",
  trustBadgesPredefined: [] as string[],
  relatedProducts: [] as string[],
};

export default function AdminProducts() {
  const navigate = useNavigate();
  const [fullCatalog, setFullCatalog] = useState<any[]>([]);
  const [catalogItems, setCatalogItems] = useState<any[]>([]);
  const [pageCursors, setPageCursors] = useState<(string | null)[]>([null]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [catalogTotal, setCatalogTotal] = useState(0);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const relatedPickerRef = useRef<HTMLDivElement>(null);
  const [customTrustBadgeInput, setCustomTrustBadgeInput] = useState("");
  const [relatedSearch, setRelatedSearch] = useState("");
  const [relatedDropdownOpen, setRelatedDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({ ...emptyForm });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    setPageCursors([null]);
  }, [debouncedSearch]);

  const loadFullCatalog = useCallback(async () => {
    try {
      const res = await productApi.getAll();
      setFullCatalog(res.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
    }
  }, []);

  const loadCatalogPage = useCallback(async () => {
    setLoading(true);
    try {
      const cursor = pageCursors[pageCursors.length - 1];
      const res = await productApi.getAdminCatalog({
        limit: PAGE_LIMIT,
        cursor: cursor || undefined,
        search: debouncedSearch,
      });
      if (res.success) {
        setCatalogItems(res.data);
        setNextCursor(res.nextCursor);
        setHasNextPage(res.hasNextPage);
        setCatalogTotal(res.total);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch catalog page");
    } finally {
      setLoading(false);
    }
  }, [pageCursors, debouncedSearch]);

  useEffect(() => {
    loadFullCatalog();
  }, [loadFullCatalog]);

  useEffect(() => {
    loadCatalogPage();
  }, [loadCatalogPage]);

  const refreshAfterMutation = async () => {
    await loadFullCatalog();
    setPageCursors([null]);
  };

  useEffect(() => {
    const close = (ev: MouseEvent) => {
      if (!relatedPickerRef.current?.contains(ev.target as Node)) setRelatedDropdownOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleOpenModal = (product: any = null) => {
    if (product) {
      const badges = Array.isArray(product.trustBadges) ? product.trustBadges : [];
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
        images: Array.isArray(product.images) && product.images.length > 0
          ? product.images
          : product.image
            ? [product.image]
            : [],
        featured: product.featured || false,
        urgencyLine: product.urgencyLine || "",
        highlights: Array.isArray(product.highlights) ? product.highlights.join(", ") : "",
        trustBadgesPredefined: TRUST_BADGE_OPTIONS.filter((b) => badges.includes(b)),
        relatedProducts: Array.isArray(product.relatedProducts)
          ? product.relatedProducts.map((r: any) => (typeof r === "object" ? r._id : r))
          : [],
      });
      setCustomTrustBadgeInput(
        badges.filter((b: string) => !TRUST_BADGE_OPTIONS.includes(b)).join(", ")
      );
    } else {
      setEditingProduct(null);
      setFormData({ ...emptyForm });
      setCustomTrustBadgeInput("");
    }
    setRelatedSearch("");
    setRelatedDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setCustomTrustBadgeInput("");
    setRelatedSearch("");
    setRelatedDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const primaryImage = formData.images[0] || "";
      const trustBadges = mergeTrustBadgesForSubmit(formData.trustBadgesPredefined, customTrustBadgeInput);
      const highlights = formData.highlights
        ? formData.highlights.split(",").map((h) => h.trim()).filter(Boolean)
        : [];
      const payload = {
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        subtitle: formData.subtitle,
        description: formData.description,
        price: formData.price,
        originalPrice: formData.originalPrice || undefined,
        weight: formData.weight,
        stockCount: formData.stockCount,
        stock: formData.stock,
        status: formData.status,
        featured: formData.featured,
        urgencyLine: formData.urgencyLine,
        highlights,
        trustBadges,
        relatedProducts: formData.relatedProducts,
        images: formData.images,
        image: primaryImage,
      };
      if (editingProduct) {
        await productApi.update(editingProduct._id, payload);
        toast.success("Product updated successfully");
      } else {
        await productApi.create(payload);
        toast.success("Product created successfully");
      }
      handleCloseModal();
      await refreshAfterMutation();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    try {
      setIsUploading(true);
      const res = await productApi.uploadImages(Array.from(files));
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...res.data.urls] }));
      toast.success(res.data.urls.length > 1 ? `${res.data.urls.length} images uploaded` : "Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await productApi.delete(id);
      toast.success("Product deleted successfully");
      await refreshAfterMutation();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const filteredRelatedCandidates = fullCatalog.filter((p) => {
    if (editingProduct && p._id === editingProduct._id) return false;
    if (formData.relatedProducts.includes(p._id)) return false;
    const q = relatedSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      String(p.category || "").toLowerCase().includes(q) ||
      String(p.sku || "").toLowerCase().includes(q)
    );
  });

  const inStock = fullCatalog.filter((p) => p.stock === "In Stock").length;
  const lowStock = fullCatalog.filter((p) => p.stock === "Low Stock").length;
  const outOfStock = fullCatalog.filter((p) => p.stock === "Out of Stock").length;

  const rangeStart = (pageCursors.length - 1) * PAGE_LIMIT + (catalogItems.length ? 1 : 0);
  const rangeEnd = (pageCursors.length - 1) * PAGE_LIMIT + catalogItems.length;

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
                  {catalogItems.map((product) => (
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
                            <img src={getProductPrimaryImage(product)} alt="" className="w-full h-full object-cover" />
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
                          type="button"
                          onClick={async () => {
                            try {
                              await productApi.update(product._id, { featured: !product.featured });
                              toast.success(`Product ${!product.featured ? "featured" : "unfeatured"}`);
                              await refreshAfterMutation();
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
                          <button
                            type="button"
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"
                            title="View on store"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleOpenModal(product)} className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all" title="Edit">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(product._id)} className="p-1 hover:text-red-500 hover:bg-red-50 rounded transition-all" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setMenuOpenId(menuOpenId === product._id ? null : product._id)}
                              className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"
                              title="More"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                            {menuOpenId === product._id && (
                              <div className="absolute right-0 top-8 z-30 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px]">
                                <button
                                  type="button"
                                  className="w-full px-3 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                  onClick={() => {
                                    void navigator.clipboard.writeText(product._id);
                                    toast.success("Product ID copied");
                                    setMenuOpenId(null);
                                  }}
                                >
                                  <Copy className="w-3.5 h-3.5" /> Copy ID
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        {!loading && catalogItems.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <Package className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium">No products found matching your search.</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-semibold text-gray-400">
            {catalogItems.length === 0
              ? "No products on this page"
              : `Showing ${rangeStart} to ${rangeEnd} of ${catalogTotal} products`}
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={pageCursors.length <= 1}
              onClick={() => setPageCursors((p) => (p.length > 1 ? p.slice(0, -1) : p))}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!hasNextPage || !nextCursor}
              onClick={() => nextCursor && setPageCursors((p) => [...p, nextCursor])}
              className="px-3 py-1.5 bg-[#111827] text-white rounded text-xs font-bold hover:bg-[#1f2937] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Products", value: fullCatalog.length, color: "bg-blue-500", iconColor: "text-blue-500", icon: Package },
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
                        const checked = formData.trustBadgesPredefined.includes(badge);
                        return (
                          <label key={badge} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-xs font-semibold transition-all ${checked ? "bg-[#D4A017]/10 border-[#D4A017] text-[#D4A017]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={checked}
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  trustBadgesPredefined: checked
                                    ? formData.trustBadgesPredefined.filter((b) => b !== badge)
                                    : [...formData.trustBadgesPredefined, badge],
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
                    <div className="mt-3 space-y-1">
                      <label className={labelCls}>Additional badges (comma-separated)</label>
                      <input
                        type="text"
                        value={customTrustBadgeInput}
                        onChange={(e) => setCustomTrustBadgeInput(e.target.value)}
                        className={inputCls}
                        placeholder="e.g. Organic, Made in India"
                      />
                      <p className="text-[10px] text-gray-400">
                        Saved together with the options above; predefined badges are stored first in catalog order, then these labels (duplicates removed).
                      </p>
                    </div>
                  </div>

                  {/* Section: Related Products */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">🔗 Related Products (&quot;You may also like&quot;)</p>
                    <p className="text-[10px] text-gray-400 mb-3">
                      Search and pick products for this detail page&apos;s &quot;You may also like&quot; section.
                    </p>

                    {formData.relatedProducts.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {formData.relatedProducts.map((id) => {
                          const p = fullCatalog.find((x) => x._id === id);
                          if (!p) return null;
                          return (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-md bg-gray-100 text-gray-800 text-[11px] font-semibold border border-gray-200 max-w-full"
                            >
                              <span className="truncate max-w-[140px]">{p.name}</span>
                              <button
                                type="button"
                                className="p-0.5 rounded hover:bg-gray-200 text-gray-500 shrink-0"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    relatedProducts: formData.relatedProducts.filter((x) => x !== id),
                                  })
                                }
                                aria-label={`Remove ${p.name}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <div ref={relatedPickerRef} className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          className={`${inputCls} pl-9`}
                          placeholder="Search products by name, category, or SKU…"
                          value={relatedSearch}
                          onChange={(e) => {
                            setRelatedSearch(e.target.value);
                            setRelatedDropdownOpen(true);
                          }}
                          onFocus={() => setRelatedDropdownOpen(true)}
                          autoComplete="off"
                        />
                      </div>
                      {relatedDropdownOpen && (
                        <ul className="absolute z-[60] mt-1 w-full max-h-44 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg py-1">
                          {filteredRelatedCandidates.length === 0 ? (
                            <li className="px-3 py-2 text-[11px] text-gray-400 text-center">No matching products</li>
                          ) : (
                            filteredRelatedCandidates.slice(0, 80).map((p) => (
                              <li key={p._id}>
                                <button
                                  type="button"
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs hover:bg-gray-50 transition-colors"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      relatedProducts: [...formData.relatedProducts, p._id],
                                    });
                                    setRelatedSearch("");
                                    setRelatedDropdownOpen(false);
                                  }}
                                >
                                  <div className="w-8 h-8 rounded overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                                    <img src={getProductPrimaryImage(p)} alt="" className="w-full h-full object-cover" />
                                  </div>
                                  <span className="font-semibold text-gray-800 flex-1 min-w-0 truncate">{p.name}</span>
                                  <span className="text-gray-400 shrink-0 text-[10px]">{p.category}</span>
                                </button>
                              </li>
                            ))
                          )}
                        </ul>
                      )}
                    </div>

                    {formData.relatedProducts.length === 0 && (
                      <p className="text-[10px] text-gray-400 mt-2">No related products selected.</p>
                    )}
                  </div>

                  {/* Section: Images */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">🖼 Product Images</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*"
                      multiple
                    />
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-2 text-gray-400 py-6 border-2 border-dashed border-gray-200 rounded-xl">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-xs font-bold">Uploading...</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.images.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {formData.images.map((url, index) => (
                              <div
                                key={`${url}-${index}`}
                                className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square"
                              >
                                {index === 0 && (
                                  <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-[#111827] text-white">
                                    Cover
                                  </span>
                                )}
                                <img src={url} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setFormData({
                                        ...formData,
                                        images: formData.images.filter((_, i) => i !== index),
                                      })
                                    }
                                    className="px-2 py-1 rounded-lg bg-red-500 text-white text-[10px] font-bold"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#111827] text-white rounded-lg text-xs font-bold hover:bg-[#1f2937] transition-colors"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            {formData.images.length ? "Add more images" : "Upload images"}
                          </button>
                          {formData.images.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, images: [] })}
                              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-500 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors border border-red-200"
                            >
                              <X className="w-3.5 h-3.5" /> Remove all
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400">
                          First image is used as the cover on listings. You can select multiple files at once.
                        </p>
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

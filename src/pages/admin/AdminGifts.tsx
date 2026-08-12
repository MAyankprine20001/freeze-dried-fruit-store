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
  Gift,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { productApi } from "../../api/product.api";
import { toast } from "react-toastify";
import { getProductPrimaryImage } from "../../utils/productImage";

const PAGE_LIMIT = 20;

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
  category: "Gifts",
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
  isBulk: false,
  isGift: true, // Defaults to true for Gift Hampers page
  urgencyLine: "",
  highlights: "",
  trustBadgesPredefined: [] as string[],
  relatedProducts: [] as string[],
};

export default function AdminGifts() {
  const [previewProduct, setPreviewProduct] = useState<any | null>(null);
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
      const gifts = res.data.filter((p: any) => p.isGift === true || p.category === "Gifts" || p.category === "Combos");
      setFullCatalog(gifts);
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
        // Filter catalog items to only show gifts on this page
        const giftItems = res.data.filter((p: any) => p.isGift === true || p.category === "Gifts" || p.category === "Combos");
        setCatalogItems(giftItems);
        setNextCursor(res.nextCursor);
        setHasNextPage(res.hasNextPage);
        setCatalogTotal(giftItems.length);
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
    await loadCatalogPage();
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
        category: product.category || "Gifts",
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
        isBulk: product.isBulk || false,
        isGift: product.isGift || false,
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
        isBulk: formData.isBulk,
        isGift: formData.isGift,
        urgencyLine: formData.urgencyLine,
        highlights,
        trustBadges,
        relatedProducts: formData.relatedProducts,
        images: formData.images,
        image: primaryImage,
      };
      if (editingProduct) {
        await productApi.update(editingProduct._id, payload);
        toast.success("Gift Hamper updated successfully");
      } else {
        await productApi.create(payload);
        toast.success("Gift Hamper created successfully");
      }
      handleCloseModal();
      await refreshAfterMutation();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save Gift Hamper");
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
    if (!window.confirm("Are you sure you want to delete this Gift Hamper?")) return;
    try {
      await productApi.delete(id);
      toast.success("Gift Hamper deleted successfully");
      await refreshAfterMutation();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete Gift Hamper");
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
    <div className="space-y-4 text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Gift Hampers & Combos</h1>
          <p className="text-sm text-gray-500">Manage your dynamic gift hampers and combinations.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#111827] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1f2937] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Gift Hamper
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search hampers by name, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] transition-colors"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p className="text-sm font-medium">Loading gift hampers...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Hamper</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Weight</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Featured</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Gift</th>
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
                              toast.success(`Hamper ${!product.featured ? "featured" : "unfeatured"}`);
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
                       <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          disabled
                          title="Gifts managed on this page always have Gift enabled"
                        >
                          <Gift className="w-4 h-4 mx-auto text-purple-600 fill-purple-600/10" />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 text-gray-400">
                          <button
                            type="button"
                            onClick={() => {
                              setMenuOpenId(null);
                              setPreviewProduct(product);
                            }}
                            className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"
                            title="Preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleOpenModal(product)} className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all" title="Edit">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(product._id)} className="p-1 hover:text-red-500 hover:bg-red-50 rounded transition-all" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
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
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Gift Hampers", value: fullCatalog.length, color: "bg-blue-500", iconColor: "text-blue-500", icon: Package },
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

      {/* ── Preview modal ── */}
      <AnimatePresence>
        {previewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewProduct(null)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="w-full max-w-lg bg-white rounded-2xl shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 flex-shrink-0">
                  <div>
                    <h2 className="text-base font-bold text-gray-800">Product preview</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Read-only snapshot</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewProduct(null)}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="overflow-y-auto flex-1 p-5 space-y-4">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                    <img
                      src={getProductPrimaryImage(previewProduct)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{previewProduct.name}</h3>
                    {previewProduct.subtitle && (
                      <p className="text-sm text-gray-600 mt-1">{previewProduct.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Centered Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
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
                    <h2 className="text-base font-bold text-gray-800">{editingProduct ? "Edit Gift Hamper" : "Add New Gift Hamper"}</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Fill in all relevant product details</p>
                  </div>
                  <button onClick={handleCloseModal} className="p-1.5 hover:bg-white rounded-lg transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Scrollable Body */}
                <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5" /> Basic Info
                    </p>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className={labelCls}>Hamper Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} placeholder="e.g. Premium Celebration Box" />
                      </div>

                      <div className="space-y-1">
                        <label className={labelCls}>Subtitle</label>
                        <input type="text" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className={inputCls} placeholder="e.g. Curated selection for special occasions" />
                      </div>

                      <div className="space-y-1">
                        <label className={labelCls}>Description</label>
                        <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`${inputCls} resize-none`} placeholder="Detailed product description..." />
                      </div>

                      <div className="space-y-1">
                        <label className={labelCls}>Category</label>
                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inputCls}>
                          <option>Gifts</option>
                          <option>Festive Specials</option>
                          <option>Corporate Gifting</option>
                          <option>Personalized</option>
                          <option>New Arrivals</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">💰 Pricing & Stock</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className={labelCls}>Selling Price (₹) *</label>
                        <input type="number" required min={0} value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className={inputCls} />
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>Original / MRP (₹)</label>
                        <input type="number" min={0} value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })} className={inputCls} />
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>Weight / Size</label>
                        <input type="text" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} className={inputCls} />
                      </div>
                      <div className="space-y-1">
                        <label className={labelCls}>Stock Count *</label>
                        <input type="number" required min={0} value={formData.stockCount} onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })} className={inputCls} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">🖼 Images</p>
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
                              <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square">
                                <img src={url} alt="" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })}
                                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded text-xs"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-[#111827] text-white rounded-lg text-xs font-bold hover:bg-[#1f2937]">
                          Upload Image
                        </button>
                      </div>
                    )}
                  </div>
                </form>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex gap-3 bg-white rounded-b-2xl flex-shrink-0">
                  <button type="button" onClick={handleCloseModal} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200">
                    Cancel
                  </button>
                  <button type="submit" form="product-form" disabled={submitting || isUploading} className="flex-1 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold hover:bg-[#1f2937]">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Gift Hamper"}
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

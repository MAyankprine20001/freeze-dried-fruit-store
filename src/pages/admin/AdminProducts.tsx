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
  MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { productApi } from "../../api/product.api";
import { toast } from "react-toastify";

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Fruit Powders",
    price: 0,
    stockCount: 0,
    stock: "In Stock",
    status: "Active",
    image: "",
    featured: false,
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

  const handleOpenDrawer = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        sku: product.sku || "",
        category: product.category,
        price: product.price,
        stockCount: product.stockCount || 0,
        stock: product.stock,
        status: product.status || "Active",
        image: product.image,
        featured: product.featured || false,
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: "", sku: "", category: "Fruit Powders", price: 0, stockCount: 0, stock: "In Stock", status: "Active", image: "", featured: false });
    }
    setIsDrawerOpen(true);
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
      setIsDrawerOpen(false);
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

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const inStock = products.filter((p) => p.stock === "In Stock").length;
  const lowStock = products.filter((p) => p.stock === "Low Stock").length;
  const outOfStock = products.filter((p) => p.stock === "Out of Stock").length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500">Manage your product catalog and inventory.</p>
        </div>
        <button
          onClick={() => handleOpenDrawer()}
          className="flex items-center gap-2 bg-[#111827] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1f2937] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <NumberBadge n={1} color="bg-[#D4A017]" />
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
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
            <option>All Categories</option>
            <option>Fruit Powders</option>
            <option>Fruit Chunks</option>
            <option>Chocolates</option>
          </select>
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
            <option>Status: All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
            <option>Stock: All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
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
                            <p className="text-[10px] font-semibold text-gray-400">SKU: {product.sku || product._id.slice(-6).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 font-semibold">{product.category}</span>
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-800 text-sm">₹{product.price}</td>
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
                          <button onClick={() => handleOpenDrawer(product)} className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all" title="Edit">
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
          <div className="flex gap-1.5">
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{"<"}</button>
            <button className="px-2.5 py-1 bg-[#111827] text-white rounded text-xs font-bold">1</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">...</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{">"}</button>
          </div>
        </div>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { n: 8, label: "Total Products", value: products.length, link: null, linkText: "View all products →", color: "bg-blue-500", iconColor: "text-blue-500", iconBg: "bg-blue-50", icon: Package },
          { n: 9, label: "In Stock", value: inStock, link: null, linkText: "View products →", color: "bg-green-500", iconColor: "text-green-500", iconBg: "bg-green-50", icon: CheckCircle },
          { n: 10, label: "Low Stock", value: lowStock, link: null, linkText: "View products →", color: "bg-orange-500", iconColor: "text-orange-500", iconBg: "bg-orange-50", icon: AlertTriangle },
          { n: 11, label: "Out of Stock", value: outOfStock, link: null, linkText: "View products →", color: "bg-red-500", iconColor: "text-red-500", iconBg: "bg-red-50", icon: XCircle },
        ].map((card) => (
          <div key={card.n} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <NumberBadge n={card.n} color={card.color} />
              <p className="text-xs font-semibold text-gray-500">{card.label}</p>
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
            <button className="text-xs font-semibold text-blue-500 hover:underline mt-1">{card.linkText}</button>
          </div>
        ))}
      </div>

      {/* Add/Edit Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h2 className="text-base font-bold text-gray-800">{editingProduct ? "Edit Product" : "Add Product"}</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-1.5 hover:bg-white rounded-lg transition-colors">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Product Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none" placeholder="e.g. Strawberry Powder" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none">
                      <option>Fruit Powders</option>
                      <option>Fruit Chunks</option>
                      <option>Smoothie Premix</option>
                      <option>Chocolates</option>
                      <option>Combos</option>
                      <option>Gifts</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Price (₹)</label>
                    <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Stock</label>
                    <input type="number" required value={formData.stockCount} onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Product Image</label>
                  <div className="flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4">
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                    {formData.image ? (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setFormData({ ...formData, image: "" })} className="absolute top-1 right-1 bg-white/80 p-0.5 rounded-full">
                          <X className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-700">
                        <Upload className="w-5 h-5" />
                        <span className="text-xs font-bold">Upload Image</span>
                        <span className="text-[10px]">PNG, JPG, JPEG up to 5MB</span>
                      </button>
                    )}
                  </div>
                </div>
              </form>

              <div className="p-4 border-t border-gray-100 flex gap-2 bg-white">
                <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all">
                  Cancel
                </button>
                <button type="submit" onClick={handleSubmit} disabled={submitting || isUploading} className="flex-1 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold hover:bg-[#1f2937] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Product"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

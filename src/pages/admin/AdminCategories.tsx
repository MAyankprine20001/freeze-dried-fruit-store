import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Plus, Pencil, Trash2, Save, X, Package, Loader2 } from "lucide-react";
import { productApi } from "../../api/product.api";
import { toast } from "react-toastify";

export default function AdminCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});

  // Load categories derived from products + any custom ones stored in localStorage
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await productApi.getAll();
        const products = res.data as any[];

        // Derive unique categories from products
        const fromProducts = Array.from(new Set(products.map((p: any) => p.category).filter(Boolean))) as string[];

        // Merge with custom categories from localStorage
        const stored = JSON.parse(localStorage.getItem("tdf_categories") || "[]") as string[];
        const merged = Array.from(new Set([...fromProducts, ...stored])).sort();
        setCategories(merged);

        // Count products per category
        const counts: Record<string, number> = {};
        products.forEach((p: any) => {
          if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
        });
        setProductCounts(counts);
      } catch (err) {
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const saveToStorage = (cats: string[]) => {
    localStorage.setItem("tdf_categories", JSON.stringify(cats));
    setCategories(cats);
  };

  const handleAdd = () => {
    const val = newCategory.trim();
    if (!val) return;
    if (categories.includes(val)) {
      toast.error("Category already exists");
      return;
    }
    saveToStorage([...categories, val].sort());
    setNewCategory("");
    toast.success(`Category "${val}" added`);
  };

  const handleRename = (index: number) => {
    const val = editingValue.trim();
    if (!val) return;
    if (categories.includes(val) && categories[index] !== val) {
      toast.error("Category already exists");
      return;
    }
    const updated = [...categories];
    updated[index] = val;
    saveToStorage(updated.sort());
    setEditingIndex(null);
    setEditingValue("");
    toast.success("Category renamed");
  };

  const handleDelete = (cat: string) => {
    if (productCounts[cat] > 0) {
      if (!window.confirm(`"${cat}" has ${productCounts[cat]} product(s). Deleting this category won't affect existing products. Continue?`)) return;
    }
    saveToStorage(categories.filter((c) => c !== cat));
    toast.success(`Category "${cat}" removed`);
  };

  const CATEGORY_EMOJIS: Record<string, string> = {
    "Smoothie Premix": "🥤",
    "Chocolates": "🍫",
    "Fruit Chunks": "🍓",
    "Fruit Powders": "🍊",
    "Combos": "🎁",
    "Gifts": "🎀",
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Product Categories</h1>
        <p className="text-sm text-gray-500">Manage product categories used across the store.</p>
      </div>

      {/* Add New */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Add New Category
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="e.g. Fruit Powders, Combos, Gifts..."
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none transition-colors"
          />
          <button
            onClick={handleAdd}
            disabled={!newCategory.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#111827] text-white rounded-xl text-sm font-bold hover:bg-[#1f2937] disabled:opacity-40 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" /> All Categories
          </p>
          <span className="text-xs font-bold text-gray-400">{categories.length} total</span>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mb-2" />
            <p className="text-sm">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Tag className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium">No categories found. Add one above.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            <AnimatePresence mode="popLayout">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 group transition-colors"
                >
                  {/* Emoji */}
                  <div className="w-9 h-9 bg-[#D4A017]/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {CATEGORY_EMOJIS[cat] || "🏷️"}
                  </div>

                  {/* Name / Edit Input */}
                  <div className="flex-1 min-w-0">
                    {editingIndex === i ? (
                      <div className="flex items-center gap-2">
                        <input
                          autoFocus
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleRename(i);
                            if (e.key === "Escape") { setEditingIndex(null); setEditingValue(""); }
                          }}
                          className="flex-1 px-3 py-1.5 bg-white border border-[#D4A017] rounded-lg text-sm font-semibold focus:outline-none"
                        />
                        <button onClick={() => handleRename(i)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Save className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setEditingIndex(null); setEditingValue(""); }} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="font-bold text-gray-800 text-sm">{cat}</p>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <Package className="w-3 h-3" />
                          {productCounts[cat] || 0} product(s)
                        </p>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  {editingIndex !== i && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setEditingIndex(i); setEditingValue(cat); }}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Rename"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <p className="font-bold mb-0.5">ℹ️ About Categories</p>
        <p className="text-xs leading-relaxed">Categories shown here are derived from your products. Custom categories added here are saved locally and will appear in the product form's category dropdown when creating or editing products.</p>
      </div>
    </div>
  );
}

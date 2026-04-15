import React, { useState } from "react";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  ArrowUpDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialProducts = [
  { id: "P001", name: "Strawberry Powder", category: "Fruit Powders", price: 349, stock: 124, status: "In Stock", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=100&h=100&fit=crop" },
  { id: "P002", name: "Mango Chunks", category: "Fruit Chunks", price: 379, stock: 85, status: "In Stock", image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=100&h=100&fit=crop" },
  { id: "P003", name: "Berry Blast Smoothie", category: "Smoothie Premix", price: 399, stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=100&h=100&fit=crop" },
  { id: "P004", name: "Dark Chocolate Bar", category: "Chocolates", price: 299, stock: 15, status: "Low Stock", image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=100&h=100&fit=crop" },
];

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");

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
        <button className="flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2a2a2a] transition-all shadow-lg shadow-[#1a1a1a]/10">
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
                    key={product.id}
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
                          <p className="text-[10px] font-bold text-[#adb5bd] uppercase tracking-tight">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#6c757d] font-medium">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#1a1a1a]">₹{product.price}</td>
                    <td className="px-6 py-4 font-bold text-[#1a1a1a]">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        product.status === "In Stock" ? "bg-green-50 text-green-600" :
                        product.status === "Low Stock" ? "bg-orange-50 text-orange-600" :
                        "bg-red-50 text-red-600"
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-[#adb5bd] hover:text-[#1a1a1a] hover:bg-white rounded-lg shadow-sm transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#adb5bd] hover:text-blue-500 hover:bg-white rounded-lg shadow-sm transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#adb5bd] hover:text-red-500 hover:bg-white rounded-lg shadow-sm transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
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
    </div>
  );
}

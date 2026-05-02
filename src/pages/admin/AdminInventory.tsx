import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package, CheckCircle, AlertTriangle, XCircle, Search, Filter,
  Download, Eye, Edit2, Plus, Settings, History, Box
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { productApi } from "../../api/product.api";
import { toast } from "react-toastify";
import { getProductPrimaryImage } from "../../utils/productImage";

const categoryData = [
  { name: "Chocolates", value: 345200, color: "#4c1d95", pct: "39%" },
  { name: "Smoothie Premix", value: 212500, color: "#f4a435", pct: "24%" },
  { name: "Fruit Chunks", value: 125750, color: "#ec4899", pct: "14%" },
  { name: "Health Mix", value: 108600, color: "#10b981", pct: "12%" },
  { name: "Others", value: 84490, color: "#3b82f6", pct: "10%" },
];

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

export default function AdminInventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All Products");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await productApi.getAll();
      setProducts(res.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch inventory");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    if (!matchesSearch) return false;
    if (activeTab === "In Stock") return p.stock === "In Stock";
    if (activeTab === "Low Stock") return p.stock === "Low Stock";
    if (activeTab === "Out of Stock") return p.stock === "Out of Stock";
    return true;
  });

  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.stock === "In Stock").length;
  const lowStockCount = products.filter((p) => p.stock === "Low Stock").length;
  const outOfStockCount = products.filter((p) => p.stock === "Out of Stock").length;
  const totalValue = products.reduce((sum, p) => sum + (p.price || 0) * (p.stockCount || 0), 0);
  const inStockPercentage = totalProducts > 0 ? ((inStockCount / totalProducts) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Inventory</h1>
        <p className="text-sm text-gray-500">Monitor stock levels and get low stock alerts.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { n: 1, label: "Total Products", value: totalProducts, sub: "All listed products", icon: Package, iconBg: "bg-blue-50", iconColor: "text-blue-500", badge: "bg-blue-500" },
          { n: 2, label: "In Stock", value: inStockCount, sub: `${inStockPercentage}% of total`, icon: CheckCircle, iconBg: "bg-green-50", iconColor: "text-green-500", badge: "bg-green-500" },
          { n: 3, label: "Low Stock", value: lowStockCount, sub: "Need attention", icon: AlertTriangle, iconBg: "bg-yellow-50", iconColor: "text-yellow-600", badge: "bg-yellow-500" },
          { n: 4, label: "Out of Stock", value: outOfStockCount, sub: "Not available", icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-500", badge: "bg-red-500" },
          { n: 5, label: "Total Stock Value", value: `₹${totalValue.toLocaleString()}`, sub: "Based on selling price", icon: Filter, iconBg: "bg-indigo-50", iconColor: "text-indigo-500", badge: "bg-indigo-500" },
        ].map((card) => (
          <div key={card.n} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className={`w-9 h-9 ${card.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <card.icon className={`w-4 h-4 ${card.iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-gray-500 truncate">{card.label}</p>
              <p className="text-base font-bold text-gray-800 leading-tight">{card.value}</p>
              <p className="text-[10px] text-gray-400 truncate">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        {/* Search & Filters */}
        <div className="p-3 border-b border-gray-100 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
              <option>All Categories</option>
              <option>Fruit Powders</option>
              <option>Chocolates</option>
            </select>
            <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
              <option>Stock Status: All</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
              <option>Sort by: Low Stock</option>
              <option>Sort by: Value</option>
            </select>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50">
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#111827] text-white rounded-lg text-sm font-semibold hover:bg-[#1f2937] transition-colors shadow-sm">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto">
          {[
            { label: "All Products", count: totalProducts, countColor: "bg-gray-200 text-gray-700" },
            { label: "In Stock", count: inStockCount, countColor: "bg-green-100 text-green-700" },
            { label: "Low Stock", count: lowStockCount, countColor: "bg-yellow-100 text-yellow-700" },
            { label: "Out of Stock", count: outOfStockCount, countColor: "bg-red-100 text-red-700" },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.label
                  ? "bg-gray-100 border border-gray-200 text-gray-800 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 border border-transparent"
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${tab.countColor}`}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[280px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Stock Value (₹)</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-7 h-7 border-2 border-[#111827] border-t-transparent rounded-full animate-spin mb-3" />
                      <p className="text-sm font-medium">Loading inventory...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-800 font-bold">No products found</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const thumb = getProductPrimaryImage(product);
                  return (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                          {thumb ? (
                            <img src={thumb} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-full h-full p-2 text-gray-300" />
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-800 truncate max-w-[160px]">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                        {product.sku || `TDF-${product._id.slice(-5).toUpperCase()}`}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-semibold">{product.category}</td>
                    <td className="px-4 py-3 font-bold text-gray-800 text-sm">{product.stockCount || 0}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        product.stock === "In Stock" ? "bg-green-50 text-green-600" :
                        product.stock === "Low Stock" ? "bg-yellow-50 text-yellow-600" :
                        "bg-red-50 text-red-600"
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-gray-800 text-sm">
                      ₹{((product.price || 0) * (product.stockCount || 0)).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">{new Date(product.updatedAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span className="text-[10px] text-gray-400">10:30 AM</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 text-gray-400">
                        <button className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1 hover:text-orange-500 hover:bg-orange-50 rounded transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400">Showing 1 to {filteredProducts.length} of {totalProducts} products</p>
          <div className="flex gap-1.5">
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{"<"}</button>
            <button className="px-2.5 py-1 bg-[#111827] text-white rounded text-xs font-bold">1</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{">"}</button>
          </div>
        </div>
      </div>

      {/* Bottom Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Low Stock Alert */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-orange-500" /> Low Stock Alert
            </h3>
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">28 products</span>
          </div>
          <div className="space-y-2 mb-3">
            {[
              { name: "Mango Silk White", units: 8 },
              { name: "Banana Cocoa Dark", units: 5 },
              { name: "Almond Butter Crunch", units: 2 },
              { name: "Oats & Honey Granola", units: 7 },
              { name: "Choco Fudge Bites", units: 6 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-700 truncate max-w-[110px] text-xs">{item.name}</span>
                </div>
                <span className="text-gray-500 text-xs">{item.units} units</span>
              </div>
            ))}
          </div>
          <button className="text-xs font-bold text-blue-500 hover:underline">View all low stock products →</button>
        </div>

        {/* Out of Stock */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-red-500" /> Out of Stock
            </h3>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">20 products</span>
          </div>
          <div className="space-y-2 mb-3">
            {[
              { name: "Smoothie Premix Berry Blast", units: 0 },
              { name: "Vanilla Protein Cookies", units: 0 },
              { name: "Peanut Butter Smooth", units: 0 },
              { name: "Choco Hazelnut Spread", units: 0 },
              { name: "Cranberry Granola", units: 0 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-700 truncate max-w-[110px] text-xs">{item.name}</span>
                </div>
                <span className="text-gray-500 text-xs">{item.units} units</span>
              </div>
            ))}
          </div>
          <button className="text-xs font-bold text-blue-500 hover:underline">View all out of stock products →</button>
        </div>

        {/* Stock Value by Category */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Stock Value by Category</h3>
          <div className="flex gap-3 items-center flex-1">
            <div className="h-[100px] w-[100px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={30} outerRadius={45} paddingAngle={2} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 flex-1">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-gray-600 truncate flex-1">{item.name}</span>
                  <span className="text-[10px] font-bold text-gray-700">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-500">Total Stock Value</span>
            <span className="text-sm font-black text-gray-800">₹8,76,540</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
            <Box className="w-4 h-4 text-indigo-500" /> Quick Actions
          </h3>
          <div className="space-y-1 flex-1">
            {[
              { label: "Add New Product", icon: Plus, color: "text-indigo-600", bg: "bg-indigo-50" },
              { label: "Bulk Stock Update", icon: Edit2, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Low Stock Report", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
              { label: "Stock Movement History", icon: History, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Inventory Settings", icon: Settings, color: "text-gray-600", bg: "bg-gray-100" },
            ].map((action) => (
              <button key={action.label} className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                <div className={`${action.bg} p-1.5 rounded-md group-hover:shadow-sm`}>
                  <action.icon className={`w-3.5 h-3.5 ${action.color}`} />
                </div>
                <span className="text-xs font-semibold text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

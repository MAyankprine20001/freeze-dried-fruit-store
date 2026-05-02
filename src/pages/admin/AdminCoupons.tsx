import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag, Plus, Search, Filter, Edit2, Trash2, Eye,
  Clock, CheckCircle, XCircle, Copy, TrendingUp, Percent,
  IndianRupee, X, ToggleLeft, ToggleRight, Download
} from "lucide-react";
import { toast } from "react-toastify";

const dummyCoupons = [
  { id: 1, code: "TDF10", description: "Flat 10% OFF on all orders Sitewide", type: "Percentage", discount: 10, minOrder: 499, usageCount: 245, usageLimit: 1000, status: "Active", startDate: "2026-05-01", endDate: "2026-05-31" },
  { id: 2, code: "WELCOME15", description: "Get 15% OFF on your first order", type: "Percentage", discount: 15, minOrder: 399, usageCount: 312, usageLimit: 2000, status: "Active", startDate: "2026-04-20", endDate: "2026-05-20" },
  { id: 3, code: "TDF50", description: "Flat ₹50 OFF on orders above ₹699", type: "Flat", discount: 50, minOrder: 699, usageCount: 186, usageLimit: 1000, status: "Active", startDate: "2026-05-01", endDate: "2026-05-15" },
  { id: 4, code: "FREESHIP", description: "Free Shipping on orders above ₹999", type: "Free Shipping", discount: 0, minOrder: 999, usageCount: 430, usageLimit: 2000, status: "Active", startDate: "2026-04-15", endDate: "2026-06-15" },
  { id: 5, code: "SUMMER20", description: "20% OFF on Summer Special", type: "Percentage", discount: 20, minOrder: 599, usageCount: 88, usageLimit: 1000, status: "Expired", startDate: "2026-03-25", endDate: "2026-05-25" },
  { id: 6, code: "DIWALI100", description: "Flat ₹100 OFF on orders above ₹1299", type: "Flat", discount: 100, minOrder: 1299, usageCount: 0, usageLimit: 1500, status: "Scheduled", startDate: "2025-10-15", endDate: "2025-11-15" },
];

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

export default function AdminCoupons() {
  const [coupons] = useState(dummyCoupons);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [formData, setFormData] = useState({
    code: "", type: "Percentage", discountValue: "", minOrderValue: "",
    usageLimit: "", perCustomerLimit: "1", startDate: "", endDate: "", isActive: true
  });

  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDrawer = (coupon: any = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({ code: coupon.code, type: coupon.type, discountValue: coupon.discount.toString(), minOrderValue: coupon.minOrder.toString(), usageLimit: coupon.usageLimit.toString(), perCustomerLimit: "1", startDate: coupon.startDate, endDate: coupon.endDate, isActive: coupon.status === "Active" });
    } else {
      setEditingCoupon(null);
      setFormData({ code: "", type: "Percentage", discountValue: "", minOrderValue: "", usageLimit: "", perCustomerLimit: "1", startDate: "", endDate: "", isActive: true });
    }
    setIsDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editingCoupon ? "Coupon updated successfully" : "Coupon created successfully");
    setIsDrawerOpen(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${text}`);
  };

  const statusColor = (status: string) =>
    status === "Active" ? "bg-green-50 text-green-600" :
    status === "Scheduled" ? "bg-indigo-50 text-indigo-600" :
    "bg-red-50 text-red-600";

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Coupons</h1>
          <p className="text-sm text-gray-500">Create, manage and track discount coupons.</p>
        </div>
        <button
          onClick={() => handleOpenDrawer()}
          className="flex items-center gap-2 bg-[#111827] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1f2937] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create New Coupon
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { n: 1, label: "Total Coupons", value: "24", sub: "All time coupons", icon: Tag, iconBg: "bg-blue-50", iconColor: "text-blue-500", badge: "bg-blue-500" },
          { n: 2, label: "Active Coupons", value: "12", sub: "Currently active", icon: CheckCircle, iconBg: "bg-green-50", iconColor: "text-green-500", badge: "bg-green-500" },
          { n: 3, label: "Total Used", value: "1,248", sub: "Times used", icon: TrendingUp, iconBg: "bg-orange-50", iconColor: "text-orange-500", badge: "bg-orange-500" },
          { n: 4, label: "Total Discount Given", value: "₹48,560", sub: "All time", icon: IndianRupee, iconBg: "bg-purple-50", iconColor: "text-purple-500", badge: "bg-purple-500" },
          { n: 5, label: "Usage Rate", value: "23.5%", sub: "Avg. usage rate", icon: Percent, iconBg: "bg-red-50", iconColor: "text-red-500", badge: "bg-red-500" },
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

      {/* Filters & Table */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        {/* Search Row */}
        <div className="p-3 border-b border-gray-100 flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search coupons by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
              <option>Status: All</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Scheduled</option>
            </select>
            <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
              <option>Type: All</option>
              <option>Percentage</option>
              <option>Flat</option>
              <option>Free Shipping</option>
            </select>
            <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
              <option>Sort by: Latest</option>
              <option>Sort by: Usage</option>
            </select>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50">
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Coupon Code</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Min. Order</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Usage / Limit</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Validity</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-indigo-600 border border-indigo-200 bg-indigo-50 px-2 py-0.5 rounded text-xs tracking-wider">
                        {coupon.code}
                      </span>
                      <button onClick={() => copyToClipboard(coupon.code)} className="p-0.5 text-gray-300 hover:text-gray-600 transition-colors">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[160px] truncate">{coupon.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-semibold">{coupon.type}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">
                    {coupon.type === "Percentage" ? `${coupon.discount}%` : coupon.type === "Flat" ? `₹${coupon.discount}` : "–"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">₹{coupon.minOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-gray-800">{coupon.usageCount}</span>
                        <span className="text-gray-400">/ {coupon.usageLimit}</span>
                      </div>
                      <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${(coupon.usageCount / coupon.usageLimit) > 0.8 ? "bg-orange-500" : "bg-blue-500"}`}
                          style={{ width: `${Math.min((coupon.usageCount / coupon.usageLimit) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">{Math.round((coupon.usageCount / coupon.usageLimit) * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col text-xs">
                      <span className="text-gray-700">{new Date(coupon.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="text-gray-400">to {new Date(coupon.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusColor(coupon.status)}`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 text-gray-400">
                      <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleOpenDrawer(coupon)} className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1 hover:text-red-500 hover:bg-red-50 rounded transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400">Showing 1 to {filteredCoupons.length} of 24 coupons</p>
          <div className="flex gap-1.5">
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{"<"}</button>
            <button className="px-2.5 py-1 bg-[#111827] text-white rounded text-xs font-bold">1</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{">"}</button>
          </div>
        </div>
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
                <h2 className="text-base font-bold text-gray-800">{editingCoupon ? "Edit Coupon" : "Create New Coupon"}</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-1.5 hover:bg-white rounded-lg transition-colors"><X className="w-4 h-4 text-gray-500" /></button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Coupon Code</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono font-bold tracking-wider focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none uppercase" placeholder="e.g. WELCOME20" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Discount Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none font-semibold">
                    <option>Percentage</option>
                    <option>Flat</option>
                    <option>Free Shipping</option>
                  </select>
                </div>

                {formData.type !== "Free Shipping" && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Discount Value</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm">{formData.type === "Percentage" ? "%" : "₹"}</span>
                      <input type="number" required value={formData.discountValue} onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none font-bold" placeholder="0" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Min. Order (₹)</label>
                    <input type="number" value={formData.minOrderValue} onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none" placeholder="e.g. 500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Usage Limit</label>
                    <input type="number" value={formData.usageLimit} onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none" placeholder="Unlimited" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Valid From</label>
                    <input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none text-gray-600" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Valid Until</label>
                    <input type="date" required value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none text-gray-600" />
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Coupon Status</h4>
                    <p className="text-xs text-gray-500">Enable or disable this coupon</p>
                  </div>
                  <button type="button" onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}>
                    {formData.isActive ? <ToggleRight className="w-7 h-7 text-green-500" /> : <ToggleLeft className="w-7 h-7 text-gray-400" />}
                  </button>
                </div>
              </form>

              <div className="p-4 border-t border-gray-100 flex gap-2 bg-white">
                <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all">Cancel</button>
                <button type="submit" onClick={handleSubmit} className="flex-[1.5] py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold hover:bg-[#1f2937] transition-all">
                  {editingCoupon ? "Update Coupon" : "Save Coupon"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag, Plus, Search, Filter, Edit2, Trash2, Eye,
  CheckCircle, XCircle, Copy, TrendingUp, Percent,
  IndianRupee, X, ToggleLeft, ToggleRight, Download,
  Loader2, AlertCircle
} from "lucide-react";
import { toast } from "react-toastify";
import { couponApi } from "../../api/coupon.api";

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

const emptyForm = {
  code: "",
  description: "",
  discountType: "Percentage" as const,
  discountValue: "",
  minOrderValue: "",
  usageLimit: "",
  validFrom: "",
  validTo: "",
  isActive: true,
};

const statusColor = (status: string) =>
  status === "Active" ? "bg-green-50 text-green-600" :
  status === "Scheduled" ? "bg-indigo-50 text-indigo-600" :
  "bg-red-50 text-red-600";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [formData, setFormData] = useState({ ...emptyForm });

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await couponApi.getAll();
      setCoupons(res.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleOpenModal = (coupon: any = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        description: coupon.description || "",
        discountType: coupon.discountType,
        discountValue: coupon.discountValue?.toString() || "",
        minOrderValue: coupon.minOrderValue?.toString() || "",
        usageLimit: coupon.usageLimit?.toString() || "",
        validFrom: coupon.validFrom ? coupon.validFrom.slice(0, 10) : "",
        validTo: coupon.validTo ? coupon.validTo.slice(0, 10) : "",
        isActive: coupon.status === "Active",
      });
    } else {
      setEditingCoupon(null);
      setFormData({ ...emptyForm });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        code: formData.code.toUpperCase(),
        description: formData.description,
        discountType: formData.discountType,
        discountValue: formData.discountType !== "Free Shipping" ? Number(formData.discountValue) : 0,
        minOrderValue: Number(formData.minOrderValue) || 0,
        usageLimit: Number(formData.usageLimit) || 100,
        validFrom: formData.validFrom,
        validTo: formData.validTo,
        status: formData.isActive ? "Active" : "Expired",
      };
      if (editingCoupon) {
        await couponApi.update(editingCoupon._id, payload);
        toast.success("Coupon updated successfully");
      } else {
        await couponApi.create(payload as any);
        toast.success("Coupon created successfully");
      }
      handleCloseModal();
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save coupon");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await couponApi.delete(id);
      toast.success("Coupon deleted");
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete coupon");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${text}`);
  };

  const filteredCoupons = coupons.filter((c) =>
    c.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Coupons</h1>
          <p className="text-sm text-gray-500">Create, manage and track discount coupons.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#111827] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1f2937] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create New Coupon
        </button>
      </div>

      {/* KPI Cards — analytics data remains hardcoded */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { n: 1, label: "Total Coupons", value: coupons.length || "—", sub: "All time coupons", icon: Tag, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
          { n: 2, label: "Active Coupons", value: coupons.filter(c => c.status === "Active").length || "—", sub: "Currently active", icon: CheckCircle, iconBg: "bg-green-50", iconColor: "text-green-500" },
          { n: 3, label: "Total Used", value: "1,248", sub: "Times used", icon: TrendingUp, iconBg: "bg-orange-50", iconColor: "text-orange-500" },
          { n: 4, label: "Total Discount Given", value: "₹48,560", sub: "All time", icon: IndianRupee, iconBg: "bg-purple-50", iconColor: "text-purple-500" },
          { n: 5, label: "Usage Rate", value: "23.5%", sub: "Avg. usage rate", icon: Percent, iconBg: "bg-red-50", iconColor: "text-red-500" },
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

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
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
              <option>Status: All</option><option>Active</option><option>Expired</option><option>Scheduled</option>
            </select>
            <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
              <option>Type: All</option><option>Percentage</option><option>Flat</option><option>Free Shipping</option>
            </select>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50">
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[220px]">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p className="text-sm font-medium">Loading coupons...</p>
            </div>
          ) : filteredCoupons.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-gray-400">
              <AlertCircle className="w-10 h-10 opacity-20 mb-3" />
              <p className="text-sm font-medium">{searchTerm ? "No coupons match your search." : "No coupons yet. Create your first one!"}</p>
            </div>
          ) : (
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
                <AnimatePresence>
                  {filteredCoupons.map((coupon) => (
                    <motion.tr
                      key={coupon._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
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
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[160px] truncate">{coupon.description || "—"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-semibold">{coupon.discountType}</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-800">
                        {coupon.discountType === "Percentage" ? `${coupon.discountValue}%` : coupon.discountType === "Flat" ? `₹${coupon.discountValue}` : "–"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">₹{coupon.minOrderValue || 0}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-gray-800">{coupon.currentUsage || 0}</span>
                            <span className="text-gray-400">/ {coupon.usageLimit || "∞"}</span>
                          </div>
                          {coupon.usageLimit > 0 && (
                            <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${((coupon.currentUsage || 0) / coupon.usageLimit) > 0.8 ? "bg-orange-500" : "bg-blue-500"}`}
                                style={{ width: `${Math.min(((coupon.currentUsage || 0) / coupon.usageLimit) * 100, 100)}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col text-xs">
                          <span className="text-gray-700">{coupon.validFrom ? new Date(coupon.validFrom).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}</span>
                          <span className="text-gray-400">to {coupon.validTo ? new Date(coupon.validTo).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}</span>
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
                          <button onClick={() => handleOpenModal(coupon)} className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDelete(coupon._id)} className="p-1 hover:text-red-500 hover:bg-red-50 rounded transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400">Showing {filteredCoupons.length} of {coupons.length} coupons</p>
          <div className="flex gap-1.5">
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{"<"}</button>
            <button className="px-2.5 py-1 bg-[#111827] text-white rounded text-xs font-bold">1</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{">"}</button>
          </div>
        </div>
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
              <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col pointer-events-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-2xl flex-shrink-0">
                  <h2 className="text-base font-bold text-gray-800">{editingCoupon ? "Edit Coupon" : "Create New Coupon"}</h2>
                  <button onClick={handleCloseModal} className="p-1.5 hover:bg-white rounded-lg transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Scrollable Body */}
                <form id="coupon-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                  {/* Code */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Coupon Code *</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono font-bold tracking-wider focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none uppercase"
                        placeholder="e.g. WELCOME20"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Description</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none"
                      placeholder="e.g. Flat 10% OFF on all orders"
                    />
                  </div>

                  {/* Type + Value */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Discount Type *</label>
                      <select
                        value={formData.discountType}
                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none font-semibold"
                      >
                        <option>Percentage</option><option>Flat</option><option>Free Shipping</option>
                      </select>
                    </div>
                    {formData.discountType !== "Free Shipping" && (
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">Discount Value *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm">
                            {formData.discountType === "Percentage" ? "%" : "₹"}
                          </span>
                          <input
                            type="number"
                            required
                            value={formData.discountValue}
                            onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                            className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none font-bold"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Min Order + Usage Limit */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Min. Order (₹)</label>
                      <input
                        type="number"
                        value={formData.minOrderValue}
                        onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none"
                        placeholder="e.g. 500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Usage Limit</label>
                      <input
                        type="number"
                        value={formData.usageLimit}
                        onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none"
                        placeholder="Unlimited"
                      />
                    </div>
                  </div>

                  {/* Validity Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Valid From *</label>
                      <input
                        type="date"
                        required
                        value={formData.validFrom}
                        onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none text-gray-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Valid Until *</label>
                      <input
                        type="date"
                        required
                        value={formData.validTo}
                        onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 outline-none text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Coupon Status</h4>
                      <p className="text-xs text-gray-500">Enable or disable this coupon</p>
                    </div>
                    <button type="button" onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}>
                      {formData.isActive
                        ? <ToggleRight className="w-7 h-7 text-green-500" />
                        : <ToggleLeft className="w-7 h-7 text-gray-400" />}
                    </button>
                  </div>
                </form>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex gap-3 bg-white rounded-b-2xl flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="coupon-form"
                    disabled={submitting}
                    className="flex-[1.5] py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold hover:bg-[#1f2937] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingCoupon ? "Update Coupon" : "Save Coupon")}
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

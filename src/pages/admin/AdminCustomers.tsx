import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Mail, Phone, ShoppingBag,
  Check, Filter, Calendar, Download, Eye, MoreVertical, X,
  TrendingUp, IndianRupee, CheckCircle
} from "lucide-react";
import { getAllCustomers, type Customer } from "../../api/auth.api";
import { toast } from "react-toastify";

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    fetchCustomers(page, debouncedSearch);
  }, [page, debouncedSearch]);

  const fetchCustomers = async (pageNumber: number, search: string) => {
    setLoading(true);
    try {
      const response = await getAllCustomers(pageNumber, 20, search);
      if (response.success) {
        setCustomers(response.data);
        setTotalPages(response.pages || 1);
        setTotalCustomers(response.total || 0);
      } else {
        toast.error("Failed to load customers");
      }
    } catch {
      toast.error("An error occurred while fetching customers.");
    } finally {
      setLoading(false);
    }
  };

  const verifiedCount = useMemo(() => customers.filter((c) => c.isEmailVerified).length, [customers]);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const getAvatarColor = (name: string) => {
    const colors = ["bg-blue-600", "bg-purple-600", "bg-green-600", "bg-orange-600", "bg-pink-600", "bg-indigo-600"];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Customers</h1>
        <p className="text-sm text-gray-500">Manage and view all registered customers.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { n: 1, label: "Total Customers", value: totalCustomers.toLocaleString(), sub: "↑ 12.5% from last 7 days", icon: Users, iconBg: "bg-blue-50", iconColor: "text-blue-500", badge: "bg-blue-500" },
          { n: 2, label: "Verified Customers", value: verifiedCount.toLocaleString(), sub: "↑ 8.2% from last 7 days", icon: CheckCircle, iconBg: "bg-green-50", iconColor: "text-green-500", badge: "bg-green-500" },
          { n: 3, label: "Total Orders", value: "12,842", sub: "↑ 10.3% from last 7 days", icon: ShoppingBag, iconBg: "bg-orange-50", iconColor: "text-orange-500", badge: "bg-orange-500" },
          { n: 4, label: "Total Revenue", value: "₹18,76,430", sub: "↑ 14.6% from last 7 days", icon: IndianRupee, iconBg: "bg-red-50", iconColor: "text-red-500", badge: "bg-red-500" },
        ].map((card) => (
          <div key={card.n} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-3 left-3">
              <NumberBadge n={card.n} color={card.badge} />
            </div>
            <div className="flex items-center gap-3 pt-1 pl-8 mb-2">
              <div className={`w-9 h-9 ${card.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">{card.label}</p>
                <p className="text-lg font-bold text-gray-800 leading-tight">{card.value}</p>
              </div>
            </div>
            <p className="text-xs font-semibold text-green-500 pl-8">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <div className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-50">
            <Calendar className="w-3.5 h-3.5" /> Joined: All Time
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center text-gray-400">
              <div className="w-7 h-7 border-2 border-[#111827] border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm font-medium">Loading customers...</p>
            </div>
          ) : customers.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center">
              <Users className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-gray-800 font-bold text-base mb-1">No customers found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Email / Phone</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Verified</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Orders</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Order</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {customers.map((customer) => (
                    <motion.tr
                      key={customer._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${getAvatarColor(customer.fullName)} text-white flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                            {getInitials(customer.fullName)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">{customer.fullName}</p>
                            <span className={`text-[10px] font-bold ${customer.orderCount > 1 ? "text-green-600 bg-green-50" : "text-orange-600 bg-orange-50"} px-1.5 py-0.5 rounded`}>
                              {customer.orderCount > 1 ? "Repeat Customer" : "New Customer"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-700">{customer.email}</span>
                          <span className="text-xs text-gray-500">{customer.address?.phone || "+91 98765 43210"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {customer.isEmailVerified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold text-green-600">
                            <Check className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold text-red-500">
                            <X className="w-3 h-3" /> Unverified
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-gray-800 text-sm">{customer.orderCount}</td>
                      <td className="px-4 py-3 font-bold text-gray-800 text-sm">₹{customer.totalSpent.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{customer.orderCount > 0 ? "Apr 28, 2026" : "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(customer.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1 text-gray-400">
                          <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"><Calendar className="w-3.5 h-3.5" /></button>
                          <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"><MoreVertical className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400">Showing 1 to {customers.length} of {totalCustomers} customers</p>
          <div className="flex gap-1.5">
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{"<"}</button>
            <button className="px-2.5 py-1 bg-[#111827] text-white rounded text-xs font-bold">1</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">...</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{totalCustomers}</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{">"}</button>
          </div>
        </div>
      </div>

      {/* Customer Detail Drawer */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCustomer(null)} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-xs bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h2 className="text-sm font-bold text-gray-800">Customer Detail (Preview)</h2>
                <span className="text-xs font-semibold text-red-500 cursor-pointer" onClick={() => setSelectedCustomer(null)}>✕</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${getAvatarColor(selectedCustomer.fullName)} text-white flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                    {getInitials(selectedCustomer.fullName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center gap-1.5">
                      {selectedCustomer.fullName}
                      {selectedCustomer.isEmailVerified && <CheckCircle className="w-3.5 h-3.5 text-green-500" />}
                    </h3>
                    <span className={`text-[10px] font-bold ${selectedCustomer.orderCount > 1 ? "text-green-600 bg-green-50" : "text-orange-600 bg-orange-50"} px-1.5 py-0.5 rounded`}>
                      {selectedCustomer.orderCount > 1 ? "Repeat Customer" : "New Customer"}
                    </span>
                    <div className="flex gap-4 mt-2">
                      <div>
                        <p className="text-[10px] text-gray-400">Total Orders</p>
                        <p className="text-lg font-bold text-gray-800">{selectedCustomer.orderCount}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400">Total Spent</p>
                        <p className="text-lg font-bold text-gray-800">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{selectedCustomer.address?.phone || "+91 98765 43210"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Joined on {new Date(selectedCustomer.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                </div>

                <button className="w-full py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all">
                  View Order History →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Mail, Phone, ShoppingBag,
  Check, Filter, Calendar, Download, Eye, MoreVertical, X,
  IndianRupee, CheckCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getAllCustomers, type Customer } from "../../api/auth.api";
import { toast } from "react-toastify";

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

const PAGE_LIMIT = 20;

export default function AdminCustomers() {
  const location = useLocation();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageCursors, setPageCursors] = useState<(string | null)[]>([null]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [summary, setSummary] = useState<{
    totalOrdersAllTime: number;
    totalRevenueAllTime: number;
    verifiedCustomers: number;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  useEffect(() => {
    const s = (location.state as { search?: string } | null)?.search;
    if (s) setSearchQuery(s);
  }, [location.state]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setPageCursors([null]);
  }, [debouncedSearch]);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const cursor = pageCursors[pageCursors.length - 1];
      const response = await getAllCustomers({
        limit: PAGE_LIMIT,
        cursor: cursor || undefined,
        search: debouncedSearch,
      });
      if (response.success) {
        setCustomers(response.data);
        setNextCursor(response.nextCursor);
        setHasNextPage(response.hasNextPage);
        setTotalCustomers(response.total);
        if (response.summary) setSummary(response.summary);
      } else {
        toast.error("Failed to load customers");
      }
    } catch {
      toast.error("An error occurred while fetching customers.");
    } finally {
      setLoading(false);
    }
  }, [pageCursors, debouncedSearch]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const getAvatarColor = (name: string) => {
    const colors = ["bg-blue-600", "bg-purple-600", "bg-green-600", "bg-orange-600", "bg-pink-600", "bg-indigo-600"];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const formatLastOrder = (c: Customer) => {
    if (!c.lastOrderAt) return c.orderCount > 0 ? "—" : "-";
    return new Date(c.lastOrderAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const copyText = (text: string, label: string) => {
    void navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
    setMenuOpenId(null);
  };

  const rangeStart = (pageCursors.length - 1) * PAGE_LIMIT + (customers.length ? 1 : 0);
  const rangeEnd = (pageCursors.length - 1) * PAGE_LIMIT + customers.length;

  const verifiedTotal = summary?.verifiedCustomers ?? 0;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Customers</h1>
        <p className="text-sm text-gray-500">Manage and view all registered customers.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            n: 1,
            label: "Total Customers",
            value: totalCustomers.toLocaleString(),
            sub: "Matching search / filters",
            icon: Users,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
            badge: "bg-blue-500",
          },
          {
            n: 2,
            label: "Verified Customers",
            value: verifiedTotal.toLocaleString(),
            sub: "Verified emails (store-wide)",
            icon: CheckCircle,
            iconBg: "bg-green-50",
            iconColor: "text-green-500",
            badge: "bg-green-500",
          },
          {
            n: 3,
            label: "Total Orders",
            value: (summary?.totalOrdersAllTime ?? 0).toLocaleString(),
            sub: "All-time orders",
            icon: ShoppingBag,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500",
            badge: "bg-orange-500",
          },
          {
            n: 4,
            label: "Total Revenue",
            value: `₹${Math.round(summary?.totalRevenueAllTime ?? 0).toLocaleString("en-IN")}`,
            sub: "Paid orders (all-time)",
            icon: IndianRupee,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
            badge: "bg-red-500",
          },
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
            <p className="text-xs font-semibold text-gray-500 pl-8">{card.sub}</p>
          </div>
        ))}
      </div>

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
          <button type="button" className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <div className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-50">
            <Calendar className="w-3.5 h-3.5" /> Joined: All Time
          </div>
          <button type="button" className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

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
                          <span className="text-xs text-gray-500">{customer.address?.phone || "—"}</span>
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
                      <td className="px-4 py-3 text-sm text-gray-500">{formatLastOrder(customer)}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(customer.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3 text-right relative" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1 text-gray-400">
                          <button
                            type="button"
                            title="View"
                            onClick={() => setSelectedCustomer(customer)}
                            className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Joined date"
                            onClick={() => toast.info(`Joined ${new Date(customer.createdAt).toLocaleDateString()}`)}
                            className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            title="More"
                            onClick={() => setMenuOpenId(menuOpenId === customer._id ? null : customer._id)}
                            className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                          {menuOpenId === customer._id && (
                            <div className="absolute right-2 top-10 z-30 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] text-left">
                              <button
                                type="button"
                                className="w-full px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                                onClick={() => copyText(customer.email, "Email")}
                              >
                                Copy email
                              </button>
                              <button
                                type="button"
                                className="w-full px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                                onClick={() => copyText(customer._id, "Customer ID")}
                              >
                                Copy customer ID
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-semibold text-gray-400">
            {customers.length === 0
              ? "No customers on this page"
              : `Showing ${rangeStart} to ${rangeEnd} of ${totalCustomers} customers`}
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

      <AnimatePresence>
        {selectedCustomer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-xs bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h2 className="text-sm font-bold text-gray-800">Customer Detail</h2>
                <span className="text-xs font-semibold text-red-500 cursor-pointer" onClick={() => setSelectedCustomer(null)}>
                  ✕
                </span>
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
                    <span>{selectedCustomer.address?.phone || "—"}</span>
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

                <Link
                  to={`/admin/orders?search=${encodeURIComponent(selectedCustomer.email)}`}
                  className="block w-full py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all text-center"
                  onClick={() => setSelectedCustomer(null)}
                >
                  View orders for this customer →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

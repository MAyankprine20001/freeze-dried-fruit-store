import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Search, Filter, CheckCircle, XCircle,
  Eye, MoreHorizontal,
  ShoppingBag, Truck, MapPin, Mail, Phone, User,
  AlertCircle, Calendar, Download, X, Loader2, Copy,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  getAdminOrders,
  getAdminOrderStats,
  fetchOrderById,
  type Order,
} from "../../api/payment";
import { patchOrderStatus } from "../../api/admin.api";
import { toast } from "react-toastify";

const PAGE_LIMIT = 15;

export default function AdminOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const openFromUrl = searchParams.get("open");
  const searchFromUrl = searchParams.get("search") || "";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageCursors, setPageCursors] = useState<(string | null)[]>([null]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(0);

  const [orderStats, setOrderStats] = useState<{
    total: number;
    countsByStatus: Record<string, number>;
  } | null>(null);

  const [activeTab, setActiveTab] = useState("All Orders");
  const [expandedOrder, setExpandedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [debouncedSearch, setDebouncedSearch] = useState(searchFromUrl);
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  useEffect(() => {
    setSearchQuery(searchFromUrl);
    setDebouncedSearch(searchFromUrl);
  }, [searchFromUrl]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    setPageCursors([null]);
  }, [debouncedSearch, activeTab, paymentFilter]);

  const paymentQuery = useMemo(() => {
    let paymentStatus = "All";
    let paymentMethod = "All";
    if (paymentFilter === "Paid") paymentStatus = "paid";
    else if (paymentFilter === "Pending pay") paymentStatus = "pending";
    else if (paymentFilter === "Failed") paymentStatus = "failed";
    else if (paymentFilter === "COD") paymentMethod = "COD";
    return { paymentStatus, paymentMethod };
  }, [paymentFilter]);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const cursor = pageCursors[pageCursors.length - 1];
      const [statsRes, ordRes] = await Promise.all([
        getAdminOrderStats({
          search: debouncedSearch,
          paymentStatus: paymentQuery.paymentStatus,
          paymentMethod: paymentQuery.paymentMethod,
        }),
        getAdminOrders({
          limit: PAGE_LIMIT,
          cursor: cursor || undefined,
          search: debouncedSearch,
          orderStatus: activeTab === "All Orders" ? undefined : activeTab,
          paymentStatus: paymentQuery.paymentStatus,
          paymentMethod: paymentQuery.paymentMethod,
        }),
      ]);
      if (statsRes.success) {
        setOrderStats({
          total: statsRes.total,
          countsByStatus: statsRes.countsByStatus || {},
        });
      }
      if (ordRes.success) {
        setOrders(ordRes.data);
        setNextCursor(ordRes.nextCursor);
        setHasNextPage(ordRes.hasNextPage);
        setTotal(ordRes.total);
      }
    } catch {
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, [
    pageCursors,
    debouncedSearch,
    activeTab,
    paymentQuery.paymentStatus,
    paymentQuery.paymentMethod,
  ]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    if (!openFromUrl || loading) return;
    const found = orders.find((o) => o._id === openFromUrl);
    if (found) {
      setExpandedOrder(found);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const r = await fetchOrderById(openFromUrl);
        if (!cancelled && r.success && r.data) setExpandedOrder(r.data);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [openFromUrl, orders, loading]);

  const closeDrawer = () => {
    setExpandedOrder(null);
    if (openFromUrl) {
      const next = new URLSearchParams(searchParams);
      next.delete("open");
      setSearchParams(next, { replace: true });
    }
  };

  const tabCount = (name: string) => {
    if (name === "All Orders") return orderStats?.total ?? 0;
    return orderStats?.countsByStatus?.[name] ?? 0;
  };

  const tabs = [
    { name: "All Orders", count: tabCount("All Orders"), countColor: "text-gray-600 bg-gray-100" },
    { name: "Pending", count: tabCount("Pending"), countColor: "text-orange-500 bg-orange-50" },
    { name: "Confirmed", count: tabCount("Confirmed"), countColor: "text-blue-500 bg-blue-50" },
    { name: "Packed", count: tabCount("Packed"), countColor: "text-purple-500 bg-purple-50" },
    { name: "Shipped", count: tabCount("Shipped"), countColor: "text-indigo-500 bg-indigo-50" },
    { name: "Delivered", count: tabCount("Delivered"), countColor: "text-green-500 bg-green-50" },
    { name: "Cancelled", count: tabCount("Cancelled"), countColor: "text-red-500 bg-red-50" },
  ];

  const pendingCount = orderStats?.countsByStatus?.Pending ?? 0;
  const shippedCount = orderStats?.countsByStatus?.Shipped ?? 0;
  const deliveredCount = orderStats?.countsByStatus?.Delivered ?? 0;
  const cancelledCount = orderStats?.countsByStatus?.Cancelled ?? 0;

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-50 text-orange-600">Pending</span>;
      case "confirmed":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-600">Confirmed</span>;
      case "packed":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-50 text-purple-600">Packed</span>;
      case "shipped":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-600">Shipped</span>;
      case "delivered":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-50 text-green-600">Delivered</span>;
      case "cancelled":
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-red-600">Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-600 capitalize">{status || "Pending"}</span>;
    }
  };

  const getPaymentBadge = (status: string, method?: string) => {
    const s = (status || "").toLowerCase();
    const label =
      s === "paid"
        ? "Paid"
        : s === "pending"
          ? method === "COD"
            ? "COD"
            : "Pending"
          : s === "failed"
            ? "Failed"
            : status;
    const color =
      s === "paid" ? "text-green-600" : s === "failed" ? "text-red-500" : "text-blue-600";
    return (
      <div className="flex flex-col">
        <span className={`text-xs font-bold ${color} capitalize`}>{label}</span>
        {method && <span className="text-[10px] text-gray-400">{method}</span>}
      </div>
    );
  };

  const renderTimeline = (order: Order) => {
    const steps = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];
    const status = order.orderStatus || "Pending";
    let currentIdx = steps.findIndex((s) => s.toLowerCase() === status?.toLowerCase());
    if (currentIdx === -1) currentIdx = 0;
    const tl = (order as any).timeline || {};

    const stepDate = (step: string) => {
      const key = `${step.toLowerCase()}At`;
      const d = tl[key];
      return d
        ? new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })
        : "–";
    };

    return (
      <div className="relative pl-4 space-y-4 before:absolute before:inset-y-2 before:left-5 before:w-0.5 before:bg-gray-100">
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          return (
            <div key={step} className="relative flex items-center gap-3">
              <div className={`absolute -left-2.5 w-2.5 h-2.5 rounded-full border-2 ${isCompleted ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-white"}`} />
              <div className="flex justify-between w-full pl-1">
                <span className={`text-sm font-bold ${isCompleted ? "text-gray-800" : "text-gray-400"}`}>{step}</span>
                {isCurrent ? (
                  <span className="text-xs text-gray-500">{stepDate(step)}</span>
                ) : (
                  <span className="text-xs text-gray-300">–</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const applyOrderStatus = async (orderStatus: string) => {
    if (!expandedOrder) return;
    setStatusUpdating(true);
    try {
      await patchOrderStatus(expandedOrder._id, orderStatus);
      toast.success("Order status updated.");
      const updated = { ...expandedOrder, orderStatus } as Order;
      setExpandedOrder(updated);
      await loadOrders();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Update failed.");
    } finally {
      setStatusUpdating(false);
    }
  };

  const copyOrderId = (id: string) => {
    void navigator.clipboard.writeText(id);
    toast.success("Order ID copied.");
    setMenuOpenId(null);
  };

  const rangeStart = (pageCursors.length - 1) * PAGE_LIMIT + (orders.length ? 1 : 0);
  const rangeEnd = (pageCursors.length - 1) * PAGE_LIMIT + orders.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-500">Manage and track all customer orders from placement to delivery.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { n: 3, label: "Total Orders", value: orderStats?.total ?? "—", sub: "Matching filters", icon: ShoppingBag, iconBg: "bg-gray-50", iconColor: "text-gray-600", badge: "bg-gray-500", subTone: "text-gray-500" },
          { n: 4, label: "Pending Orders", value: pendingCount, sub: "Action required", icon: AlertCircle, iconBg: "bg-orange-50", iconColor: "text-orange-500", badge: "bg-orange-500", subTone: "text-orange-500" },
          { n: 5, label: "Shipped Orders", value: shippedCount, sub: "In transit", icon: Truck, iconBg: "bg-indigo-50", iconColor: "text-indigo-500", badge: "bg-indigo-500", subTone: "text-indigo-600" },
          { n: 6, label: "Delivered Orders", value: deliveredCount, sub: "Completed", icon: CheckCircle, iconBg: "bg-green-50", iconColor: "text-green-500", badge: "bg-green-500", subTone: "text-green-600" },
          { n: 7, label: "Cancelled Orders", value: cancelledCount, sub: "Stopped", icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-500", badge: "bg-red-500", subTone: "text-red-600" },
        ].map((card) => (
          <div key={card.n} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className={`w-9 h-9 ${card.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <card.icon className={`w-4 h-4 ${card.iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-gray-500 truncate">{card.label}</p>
              <p className="text-lg font-bold text-gray-800 leading-tight">{card.value}</p>
              <p className={`text-[10px] font-semibold ${card.subTone}`}>{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              type="button"
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.name
                  ? "bg-[#111827] text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 border border-transparent"
              }`}
            >
              {tab.name}
              {typeof tab.count === "number" && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${activeTab === tab.name ? "bg-white/20 text-white" : tab.countColor}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="px-3 py-2 border-b border-gray-100 flex flex-col md:flex-row gap-2 items-center justify-between">
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600">
              <Calendar className="w-3.5 h-3.5" /> Cursor pages
            </div>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none"
            >
              <option value="All">Payment: All</option>
              <option value="Paid">Paid</option>
              <option value="Pending pay">Payment pending</option>
              <option value="Failed">Failed</option>
              <option value="COD">COD</option>
            </select>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders by ID, customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none w-full md:w-56"
              />
            </div>
            <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Loader2 className="w-8 h-8 animate-spin mb-3" />
                      <p className="text-sm font-medium">Loading orders...</p>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-800 font-bold text-base mb-1">No orders found</p>
                    <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors group relative">
                    <td className="px-4 py-3 font-bold text-gray-800 text-sm">#{order._id.slice(-5).toUpperCase()}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">{order.shippingAddress.fullName}</span>
                        <span className="text-xs text-gray-500">{order.shippingAddress.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-700">
                      {order.items.length} Item{order.items.length > 1 ? "s" : ""}
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-800 text-sm">₹{order.total}</td>
                    <td className="px-4 py-3">{getPaymentBadge(order.status, order.paymentMethod)}</td>
                    <td className="px-4 py-3">{getStatusBadge(order.orderStatus || order.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 text-gray-400 relative">
                        <button
                          type="button"
                          onClick={() => setExpandedOrder(order)}
                          className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setMenuOpenId(menuOpenId === order._id ? null : order._id)}
                          className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"
                          title="More"
                        >
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                        {menuOpenId === order._id && (
                          <div className="absolute right-0 top-8 z-30 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px]">
                            <button
                              type="button"
                              className="w-full px-3 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              onClick={() => copyOrderId(order._id)}
                            >
                              <Copy className="w-3.5 h-3.5" /> Copy Mongo ID
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-semibold text-gray-400">
            {orders.length === 0
              ? "No orders on this page"
              : `Showing ${rangeStart} to ${rangeEnd} of ${total} orders`}
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
        {expandedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-gray-50 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                <div>
                  <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    Order Details
                    <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded">
                      #{expandedOrder._id.slice(-5).toUpperCase()}
                    </span>
                    {getStatusBadge(expandedOrder.orderStatus || expandedOrder.status)}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(expandedOrder.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <button type="button" onClick={closeDrawer} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-2">Customer Information</h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-semibold">{expandedOrder.shippingAddress.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{expandedOrder.shippingAddress.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-blue-500 text-xs break-all">
                        {typeof expandedOrder.user === "object" && expandedOrder.user?.email
                          ? expandedOrder.user.email
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-2">Delivery Address</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {expandedOrder.shippingAddress.addressLine1},<br />
                      {expandedOrder.shippingAddress.city}, {expandedOrder.shippingAddress.state} - {expandedOrder.shippingAddress.pincode}
                    </span>
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-2">Order Items</h3>
                  <div className="space-y-2 mb-3 pb-3 border-b border-gray-100">
                    {expandedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <div className="w-9 h-9 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-full h-full p-2 text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 text-xs truncate">{item.name}</p>
                          <p className="text-[10px] text-gray-500">{item.category || "—"}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-gray-800 text-sm">₹{item.price}</p>
                          <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{expandedOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Shipping</span>
                      <span>₹{expandedOrder.shipping || 0}</span>
                    </div>
                    <div className="flex justify-between text-gray-800 font-black text-sm pt-1 border-t border-gray-100">
                      <span>Total</span>
                      <span>₹{expandedOrder.total}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-2">Payment</h3>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Method</p>
                      <p className="font-bold text-gray-800 uppercase text-sm">{expandedOrder.paymentMethod || "—"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">Status</p>
                      <span className="font-bold text-sm capitalize">{expandedOrder.status}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-3">Order Timeline</h3>
                  {renderTimeline(expandedOrder)}
                </div>
              </div>

              <div className="p-3 border-t border-gray-100 flex flex-wrap gap-2 bg-white">
                <button
                  type="button"
                  disabled={statusUpdating}
                  onClick={() => applyOrderStatus("Cancelled")}
                  className="flex-1 min-w-[100px] py-2 border border-red-200 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={statusUpdating}
                  onClick={() => applyOrderStatus("Packed")}
                  className="flex-1 min-w-[100px] py-2 border border-indigo-200 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 disabled:opacity-50"
                >
                  Mark Packed
                </button>
                <button
                  type="button"
                  disabled={statusUpdating}
                  onClick={() => applyOrderStatus("Shipped")}
                  className="flex-1 min-w-[100px] py-2 bg-[#4c1d95] text-white rounded-lg text-xs font-bold hover:bg-[#3b0764] disabled:opacity-50"
                >
                  Mark Shipped
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

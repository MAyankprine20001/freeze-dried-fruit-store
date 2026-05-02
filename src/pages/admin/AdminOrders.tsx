import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Search, Filter, Clock, CheckCircle, XCircle,
  Eye, MoreHorizontal,
  TrendingUp, ShoppingBag, Truck, MapPin, Mail, Phone, User,
  AlertCircle, Calendar, Download, X, Loader2
} from "lucide-react";
import { getAllOrders } from "../../api/payment";
import type { Order } from "../../api/payment";
import { toast } from "react-toastify";

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [expandedOrder, setExpandedOrder] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await getAllOrders(pageNumber, 50);
      if (response.success) {
        setOrders(response.data);
        setTotalPages(response.pages || 1);
        setTotalOrders(response.total || 0);
      } else {
        toast.error("Failed to load orders");
      }
    } catch {
      toast.error("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const status = order.orderStatus || order.status || "Pending";
      const matchesTab = activeTab === "All Orders" || status.toLowerCase() === activeTab.toLowerCase();
      const matchesSearch =
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, searchQuery]);

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending": return <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-50 text-orange-600">Pending</span>;
      case "confirmed": return <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-600">Confirmed</span>;
      case "packed": return <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-50 text-purple-600">Packed</span>;
      case "shipped": return <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-600">Shipped</span>;
      case "delivered": return <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-50 text-green-600">Delivered</span>;
      case "cancelled": return <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-red-600">Cancelled</span>;
      default: return <span className="px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-600 capitalize">{status || "Pending"}</span>;
    }
  };

  const getPaymentBadge = (status: string, method?: string) => {
    const color = status?.toLowerCase() === "paid" ? "text-green-600" : status?.toLowerCase() === "failed" ? "text-red-500" : "text-blue-600";
    return (
      <div className="flex flex-col">
        <span className={`text-xs font-bold ${color} capitalize`}>{status === "cod" ? "COD" : status}</span>
        {method && <span className="text-[10px] text-gray-400">{method}</span>}
      </div>
    );
  };

  const pendingCount = orders.filter((o) => (o.orderStatus || o.status)?.toLowerCase() === "pending").length;
  const shippedCount = orders.filter((o) => (o.orderStatus || o.status)?.toLowerCase() === "shipped").length;
  const deliveredCount = orders.filter((o) => (o.orderStatus || o.status)?.toLowerCase() === "delivered").length;
  const cancelledCount = orders.filter((o) => (o.orderStatus || o.status)?.toLowerCase() === "cancelled").length;

  const tabs = [
    { name: "All Orders", count: null, countColor: "" },
    { name: "Pending", count: pendingCount, countColor: "text-orange-500 bg-orange-50" },
    { name: "Confirmed", count: orders.filter((o) => (o.orderStatus || o.status)?.toLowerCase() === "confirmed").length, countColor: "text-blue-500 bg-blue-50" },
    { name: "Packed", count: orders.filter((o) => (o.orderStatus || o.status)?.toLowerCase() === "packed").length, countColor: "text-purple-500 bg-purple-50" },
    { name: "Shipped", count: shippedCount, countColor: "text-indigo-500 bg-indigo-50" },
    { name: "Delivered", count: deliveredCount, countColor: "text-green-500 bg-green-50" },
    { name: "Cancelled", count: cancelledCount, countColor: "text-red-500 bg-red-50" },
  ];

  const renderTimeline = (status: string) => {
    const steps = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];
    let currentIdx = steps.findIndex((s) => s.toLowerCase() === status?.toLowerCase());
    if (currentIdx === -1) currentIdx = 0;
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
                {isCurrent && <span className="text-xs text-gray-500">Apr 28, 2026 10:30 AM</span>}
                {!isCurrent && <span className="text-xs text-gray-300">–</span>}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-500">Manage and track all customer orders from placement to delivery.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { n: 3, label: "Total Orders", value: totalOrders || 56, sub: "↑ 12.5% from last 7 days", icon: ShoppingBag, iconBg: "bg-gray-50", iconColor: "text-gray-600", badge: "bg-gray-500" },
          { n: 4, label: "Pending Orders", value: pendingCount || 12, sub: "Action required", icon: AlertCircle, iconBg: "bg-orange-50", iconColor: "text-orange-500", badge: "bg-orange-500" },
          { n: 5, label: "Shipped Orders", value: shippedCount || 18, sub: "↑ 8.4% from last 7 days", icon: Truck, iconBg: "bg-indigo-50", iconColor: "text-indigo-500", badge: "bg-indigo-500" },
          { n: 6, label: "Delivered Orders", value: deliveredCount || 23, sub: "↑ 15.3% from last 7 days", icon: CheckCircle, iconBg: "bg-green-50", iconColor: "text-green-500", badge: "bg-green-500" },
          { n: 7, label: "Cancelled Orders", value: cancelledCount || 3, sub: "↑ 2.1% from last 7 days", icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-500", badge: "bg-red-500" },
        ].map((card) => (
          <div key={card.n} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className={`w-9 h-9 ${card.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <card.icon className={`w-4 h-4 ${card.iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-gray-500 truncate">{card.label}</p>
              <p className="text-lg font-bold text-gray-800 leading-tight">{card.value}</p>
              <p className={`text-[10px] font-semibold ${card.n === 4 ? "text-orange-500" : card.n === 7 ? "text-red-500" : "text-green-500"}`}>{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.name
                  ? "bg-[#111827] text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 border border-transparent"
              }`}
            >
              {tab.name}
              {tab.count !== null && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${activeTab === tab.name ? "bg-white/20 text-white" : tab.countColor}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="px-3 py-2 border-b border-gray-100 flex flex-col md:flex-row gap-2 items-center justify-between">
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600">
              <Calendar className="w-3.5 h-3.5" /> Apr 28, 2026 - May 4, 2026
            </div>
            <select className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
              <option>Payment Status: All</option>
              <option>Paid</option>
              <option>COD</option>
              <option>Failed</option>
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
            <select className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
              <option>Sort: Latest First</option>
              <option>Oldest First</option>
            </select>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>

        {/* Table */}
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
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-800 font-bold text-base mb-1">No orders found</p>
                    <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-3 font-bold text-gray-800 text-sm">
                      #{order._id.slice(-5).toUpperCase()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">{order.shippingAddress.fullName}</span>
                        <span className="text-xs text-gray-500">{order.shippingAddress.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span className="text-xs text-gray-400">10:30 AM</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-700">{order.items.length} Item{order.items.length > 1 ? "s" : ""}</td>
                    <td className="px-4 py-3 font-bold text-gray-800 text-sm">₹{order.total}</td>
                    <td className="px-4 py-3">{getPaymentBadge(order.status, order.paymentMethod)}</td>
                    <td className="px-4 py-3">{getStatusBadge(order.orderStatus || order.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 text-gray-400">
                        <button onClick={() => setExpandedOrder(order)} className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400">Showing 1 to {filteredOrders.length} of {totalOrders} orders</p>
          <div className="flex gap-1.5">
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{"<"}</button>
            <button className="px-2.5 py-1 bg-[#111827] text-white rounded text-xs font-bold">1</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">...</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">12</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{">"}</button>
          </div>
        </div>
      </div>

      {/* Order Detail Drawer */}
      <AnimatePresence>
        {expandedOrder && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setExpandedOrder(null)} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
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
                  <p className="text-xs text-gray-500 mt-0.5">Apr 28, 2026 at 10:30 AM</p>
                </div>
                <button onClick={() => setExpandedOrder(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {/* Customer Info */}
                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-2">Customer Information</h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-gray-600"><User className="w-3.5 h-3.5 text-gray-400" /><span className="font-semibold">{expandedOrder.shippingAddress.fullName}</span></div>
                    <div className="flex items-center gap-2 text-sm text-gray-600"><Phone className="w-3.5 h-3.5 text-gray-400" /><span>{expandedOrder.shippingAddress.phone}</span></div>
                    <div className="flex items-center gap-2 text-sm text-gray-600"><Mail className="w-3.5 h-3.5 text-gray-400" /><span className="text-blue-500 text-xs">{expandedOrder.user?.email || "mayankp@gmail.com"}</span></div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-2">Delivery Address</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {expandedOrder.shippingAddress.addressLine1},<br />
                    {expandedOrder.shippingAddress.city}, {expandedOrder.shippingAddress.state} - {expandedOrder.shippingAddress.pincode}<br />
                    India
                  </p>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-2">Order Items</h3>
                  <div className="space-y-2 mb-3 pb-3 border-b border-gray-100">
                    {expandedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <div className="w-9 h-9 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0">
                          {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <Package className="w-full h-full p-2 text-gray-300" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 text-xs truncate">{item.name}</p>
                          <p className="text-[10px] text-gray-500">{item.category || "Fruit Chunks"}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-gray-800 text-sm">₹{item.price}</p>
                          <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{expandedOrder.subtotal}</span></div>
                    <div className="flex justify-between text-gray-500"><span>Shipping</span><span>₹{expandedOrder.shipping || 0}</span></div>
                    <div className="flex justify-between text-gray-500"><span>Discount</span><span>- ₹{expandedOrder.discount || 0}</span></div>
                    <div className="flex justify-between text-gray-800 font-black text-sm pt-1 border-t border-gray-100"><span>Total Amount</span><span>₹{expandedOrder.total}</span></div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-2">Payment Information</h3>
                  <div className="flex justify-between text-sm">
                    <div><p className="text-gray-500 text-xs">Method</p><p className="font-bold text-gray-800 uppercase text-sm">{expandedOrder.paymentMethod || "UPI"}</p></div>
                    <div className="text-right"><p className="text-gray-500 text-xs">Status</p><span className="font-bold text-green-600 text-sm">Paid</span></div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="bg-white rounded-xl border border-gray-100 p-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-3">Order Timeline</h3>
                  {renderTimeline(expandedOrder.orderStatus || expandedOrder.status)}
                </div>
              </div>

              <div className="p-3 border-t border-gray-100 flex gap-2 bg-white">
                <button className="flex-1 py-2 border border-red-200 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50 transition-all">Cancel Order</button>
                <button className="flex-1 py-2 border border-indigo-200 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-all">Mark as Packed</button>
                <button className="flex-1 py-2 bg-[#4c1d95] text-white rounded-lg text-xs font-bold hover:bg-[#3b0764] transition-all">Mark as Shipped</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

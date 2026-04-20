import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Search, Filter, Clock, CheckCircle, XCircle, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { getAllOrders } from "../../api/payment";
import type { Order } from "../../api/payment";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  // For expanded order view
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await getAllOrders(pageNumber, 10);
      if (response.success) {
        setOrders(response.data);
        setTotalPages(response.pages || 1);
        setTotalOrders(response.total || 0);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (err) {
      toast.error("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "cancelled":
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      case "cancelled":
      case "failed":
        return <XCircle className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Orders Management</h1>
          <p className="text-[#6c757d]">View and manage customer orders ({totalOrders} total).</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#adb5bd] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-9 pr-4 py-2 bg-white border border-[#eef0f2] rounded-xl text-sm focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent outline-none w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#eef0f2] rounded-xl text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white border border-[#eef0f2] rounded-[24px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fa] border-b border-[#eef0f2] text-[#6c757d]">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID & Date</th>
                <th className="px-6 py-4 font-semibold">Customer Details</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Total Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef0f2]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="w-6 h-6 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#6c757d]">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="hover:bg-[#f8f9fa] transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-mono text-[#1a1a1a] font-medium">{order._id.slice(-8).toUpperCase()}</p>
                        <p className="text-xs text-[#6c757d]">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#1a1a1a]">{order.shippingAddress.fullName}</p>
                        <p className="text-xs text-[#6c757d]">{order.shippingAddress.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-[#1a1a1a]">₹{order.total}</p>
                        <p className="text-xs text-[#6c757d]">{order.items.length} items</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                          className="p-2 text-[#6c757d] hover:bg-[#eef0f2] rounded-lg transition-colors focus:outline-none"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expanded View */}
                    {expandedOrder === order._id && (
                      <tr>
                        <td colSpan={5} className="px-0 py-0">
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[#fafbfc] border-y border-[#eef0f2] px-6 py-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {/* Order Items */}
                              <div>
                                <h4 className="text-xs font-bold text-[#6c757d] uppercase tracking-wider mb-4">
                                  Order Items
                                </h4>
                                <div className="space-y-4">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-[#eef0f2]">
                                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                          <Package className="w-full h-full p-3 text-gray-400" />
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-[#1a1a1a] truncate">{item.name}</p>
                                        <p className="text-xs text-[#6c757d]">Qty: {item.quantity}</p>
                                      </div>
                                      <div className="text-right font-bold text-[#1a1a1a]">
                                        ₹{item.price * item.quantity}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-4 flex justify-between items-center text-sm font-bold bg-white p-3 rounded-xl border border-[#eef0f2]">
                                  <span className="text-[#6c757d]">Total Amount</span>
                                  <span className="text-lg text-[#1a1a1a]">₹{order.total}</span>
                                </div>
                              </div>

                              {/* Shipping Info */}
                              <div>
                                <h4 className="text-xs font-bold text-[#6c757d] uppercase tracking-wider mb-4">
                                  Shipping Details
                                </h4>
                                <div className="bg-white p-5 rounded-xl border border-[#eef0f2] space-y-2">
                                  <p className="font-bold text-[#1a1a1a] text-base">{order.shippingAddress.fullName}</p>
                                  <p className="text-sm text-[#495057]">{order.shippingAddress.addressLine1}</p>
                                  {order.shippingAddress.addressLine2 && (
                                    <p className="text-sm text-[#495057]">{order.shippingAddress.addressLine2}</p>
                                  )}
                                  <p className="text-sm text-[#495057]">
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                                  </p>
                                  <div className="pt-3 mt-3 border-t border-[#eef0f2]">
                                    <p className="text-sm font-medium text-[#495057]">
                                      <span className="text-[#6c757d]">Phone:</span> {order.shippingAddress.phone}
                                    </p>
                                    <p className="text-sm font-medium text-[#495057] mt-1">
                                      <span className="text-[#6c757d]">Order Full ID:</span> {order._id}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-[#eef0f2] flex items-center justify-between">
            <span className="text-sm text-[#6c757d]">
              Showing page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-[#eef0f2] rounded-lg text-[#1a1a1a] hover:bg-[#f8f9fa] disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-[#eef0f2] rounded-lg text-[#1a1a1a] hover:bg-[#f8f9fa] disabled:opacity-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

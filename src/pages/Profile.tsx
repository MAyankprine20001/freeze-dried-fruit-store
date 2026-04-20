import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, MapPin, User, Clock, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../api/payment";
import type { Order } from "../api/payment";
import PageHero from "../components/PageHero";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders();
        if (response.success) {
          setOrders(response.data);
        } else {
          setError("Failed to fetch orders.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "cancelled":
      case "failed":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  if (!user) {
    return null; // Protected route handles redirect
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <PageHero
        title="My Profile"
        description="View your account details and order history."
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* User Details Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-28 shadow-lg">
              <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/30">
                <User className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h2 className="text-2xl font-bold text-center text-white mb-1">
                {user.name}
              </h2>
              <p className="text-white/50 text-center text-sm mb-6">
                {user.email}
              </p>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex items-center gap-3 text-white/70">
                  <Package className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm font-medium">
                    Total Orders: {orders.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Orders Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-2xl font-serif font-bold text-white mb-6">
              Order History
            </h3>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
                {error}
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-[#111] border border-white/10 p-12 rounded-2xl text-center">
                <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  No orders yet
                </h4>
                <p className="text-white/50 text-sm">
                  You haven't placed any orders with us yet.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-[#D4AF37]/30"
                  >
                    {/* Order Header */}
                    <div className="p-5 border-b border-white/10 bg-white/5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-white/50 mb-1">
                          Order ID: <span className="text-white/80 font-mono">{order._id}</span>
                        </p>
                        <p className="text-sm text-white/70">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#D4AF37]">
                          ₹{order.total}
                        </p>
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border mt-1 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Body */}
                    <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Items */}
                      <div className="md:col-span-2 space-y-4">
                        <h4 className="text-sm font-semibold text-white mb-3">
                          Items
                        </h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/10 overflow-hidden flex-shrink-0">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-5 h-5 text-white/20" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs text-white/50">
                                  Qty: {item.quantity} × ₹{item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#D4AF37]" />
                          Shipping Address
                        </h4>
                        <div className="text-sm text-white/70 space-y-1">
                          <p className="font-medium text-white">
                            {order.shippingAddress.fullName}
                          </p>
                          <p>{order.shippingAddress.addressLine1}</p>
                          {order.shippingAddress.addressLine2 && (
                            <p>{order.shippingAddress.addressLine2}</p>
                          )}
                          <p>
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}{" "}
                            {order.shippingAddress.pincode}
                          </p>
                          <p className="mt-2 text-white/50">
                            Ph: {order.shippingAddress.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Profile;

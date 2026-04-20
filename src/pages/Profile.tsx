import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, MapPin, Shield, Headset, 
  ChevronRight, ArrowLeft, Search,
  CheckCircle, Clock, XCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../api/payment";
import type { Order } from "../api/payment";

type Tab = 'overview' | 'orders' | 'security' | 'addresses' | 'contact';

export default function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [searchQuery, setSearchQuery] = useState('');

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
      case "paid": return "text-green-400";
      case "pending": return "text-yellow-400";
      case "cancelled":
      case "failed": return "text-red-400";
      default: return "text-white/60";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return "Order Confirmed - Preparing for Dispatch";
      case "pending": return "Payment Pending";
      case "cancelled": return "Order Cancelled";
      case "failed": return "Payment Failed";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "pending": return <Clock className="w-5 h-5 text-yellow-400" />;
      case "cancelled":
      case "failed": return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Package className="w-5 h-5 text-white/60" />;
    }
  };

  const filteredOrders = orders.filter(o => 
    o._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const accountCards = [
    {
      id: 'orders',
      title: "Your Orders",
      desc: "Track, return, or buy things again",
      icon: Package,
      imgSrc: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/box-t3.png"
    },
    {
      id: 'security',
      title: "Login & security",
      desc: "Edit login, name, and mobile number",
      icon: Shield,
      imgSrc: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/security-t3.png"
    },
    {
      id: 'addresses',
      title: "Your Addresses",
      desc: "Edit addresses for orders and gifts",
      icon: MapPin,
      imgSrc: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/address-t3.png"
    },
    {
      id: 'contact',
      title: "Contact Us",
      desc: "Contact our customer service",
      icon: Headset,
      imgSrc: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/contact-us-t3.png"
    }
  ];

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#000000] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          {activeTab !== 'overview' ? (
            <button 
              onClick={() => setActiveTab('overview')}
              className="flex items-center text-sm text-[#D4AF37] hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Your Account
            </button>
          ) : (
            <h1 className="text-3xl font-bold text-white mb-8 font-serif tracking-tight">Your Account</h1>
          )}
        </div>

        <AnimatePresence mode="wait">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {accountCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setActiveTab(card.id as Tab)}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-[#111] hover:bg-[#1a1a1a] hover:border-[#D4AF37]/50 transition-all text-left group"
                >
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    {/* Using lucide icons nicely styled since external images might break on black bg */}
                    <card.icon className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-snug">
                      {card.desc}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold text-white font-serif">Your Orders</h1>
                <div className="relative">
                  <Search className="w-5 h-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search all orders" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-80 pl-10 pr-4 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                  />
                  <button className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#D4AF37] text-black text-sm font-bold rounded-md hover:bg-[#BF953F] transition-colors">
                    Search Orders
                  </button>
                </div>
              </div>

              {/* Order Tabs */}
              <div className="flex border-b border-white/10 mb-6">
                <button className="px-4 py-2 border-b-2 border-[#D4AF37] text-[#D4AF37] font-semibold text-sm">
                  Orders
                </button>
                <button className="px-4 py-2 text-white/60 hover:text-white font-medium text-sm transition-colors">
                  Buy Again
                </button>
                <button className="px-4 py-2 text-white/60 hover:text-white font-medium text-sm transition-colors">
                  Cancelled Orders
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
                  {error}
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="py-12 text-center border-t border-b border-white/10">
                  <p className="text-lg text-white mb-2">Looks like you haven't placed an order.</p>
                  <button onClick={() => window.location.href = '/products'} className="text-[#D4AF37] hover:underline">
                    Continue shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div key={order._id} className="border border-white/10 rounded-xl overflow-hidden bg-black">
                      {/* Amazon Style Gray Header -> Dark Mode version */}
                      <div className="bg-[#111] border-b border-white/10 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                          <div>
                            <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-semibold">Order Placed</p>
                            <p className="text-white/90">
                              {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-semibold">Total</p>
                            <p className="text-white/90">₹{order.total}</p>
                          </div>
                          <div>
                            <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-semibold">Ship To</p>
                            <p className="text-[#D4AF37] hover:underline cursor-pointer group relative">
                              {order.shippingAddress.fullName}
                            </p>
                          </div>
                        </div>
                        <div className="md:text-right">
                          <p className="text-white/50 text-xs mb-1 uppercase tracking-wider font-semibold">
                            Order # {order._id.slice(-10).toUpperCase()}
                          </p>
                          <div className="flex gap-2 md:justify-end text-[#D4AF37] font-medium">
                            <span className="hover:underline cursor-pointer">View order details</span>
                            <span className="text-white/20">|</span>
                            <span className="hover:underline cursor-pointer">Invoice</span>
                          </div>
                        </div>
                      </div>

                      {/* Order Body */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-4">
                          {getStatusIcon(order.status)}
                          <h3 className={`text-lg font-bold ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </h3>
                        </div>

                        <div className="space-y-5">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row gap-5">
                              <div className="w-20 h-20 bg-[#111] rounded-lg border border-white/5 flex-shrink-0 overflow-hidden">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center"><Package className="w-8 h-8 text-white/20" /></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-[#D4AF37] hover:underline cursor-pointer text-base font-semibold mb-1">
                                  {item.name}
                                </h4>
                                <p className="text-white/60 text-sm mb-2">Quantity: {item.quantity}</p>
                                <button className="px-4 py-1.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-white/10 rounded-full text-xs font-bold text-white transition-colors">
                                  Buy it again
                                </button>
                              </div>
                              <div className="md:w-48 flex flex-col gap-2">
                                <button className="w-full py-2 bg-[#D4AF37] hover:bg-[#BF953F] text-black text-sm font-bold rounded-lg shadow-sm transition-colors text-center">
                                  Track package
                                </button>
                                <button className="w-full py-2 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 text-white text-sm font-semibold rounded-lg transition-colors text-center">
                                  Leave seller feedback
                                </button>
                                <button className="w-full py-2 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 text-white text-sm font-semibold rounded-lg transition-colors text-center">
                                  Write a product review
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* PLACEHOLDER TABS */}
          {['security', 'addresses', 'contact'].includes(activeTab) && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-10 text-center"
            >
              <div className="w-20 h-20 bg-black/50 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {accountCards.find(c => c.id === activeTab)?.title}
              </h2>
              <p className="text-white/60 max-w-md mx-auto mb-8">
                This section is currently under development. In the future, you will be able to manage your {activeTab} directly from here.
              </p>
              
              {activeTab === 'security' && (
                <div className="max-w-md mx-auto bg-black p-6 rounded-xl border border-white/10 text-left space-y-4">
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider font-semibold block mb-1">Name</label>
                    <p className="text-white font-medium">{user.name}</p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <label className="text-xs text-white/40 uppercase tracking-wider font-semibold block mb-1">Email</label>
                    <p className="text-white font-medium">{user.email}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}

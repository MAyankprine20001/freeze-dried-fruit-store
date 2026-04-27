import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
 Package, Search, Filter, Clock, CheckCircle, XCircle, 
 ChevronLeft, ChevronRight, Eye, MoreHorizontal, 
 TrendingUp, CreditCard, ShoppingBag, Truck, MapPin, Mail, Phone, User
} from "lucide-react";
import { getAllOrders } from "../../api/payment";
import type { Order } from "../../api/payment";
import { toast } from "react-toastify";

export default function AdminOrders() {
 const [orders, setOrders] = useState<Order[]>([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [totalOrders, setTotalOrders] = useState(0);
 
 const [activeTab, setActiveTab] = useState('all');
 const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
 const [searchQuery, setSearchQuery] = useState('');

 useEffect(() => {
  fetchOrders(page);
 }, [page]);

 const fetchOrders = async (pageNumber: number) => {
  setLoading(true);
  try {
   // In a real app, filtering by status/search would be done server-side.
   // We'll fetch more to allow local filtering for demonstration.
   const response = await getAllOrders(pageNumber, 50);
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

 const filteredOrders = useMemo(() => {
  return orders.filter(order => {
   const matchesTab = activeTab === 'all' || order.status.toLowerCase() === activeTab;
   const matchesSearch = 
    order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase());
   return matchesTab && matchesSearch;
  });
 }, [orders, activeTab, searchQuery]);

 const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
   case "paid":
    return (
     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#E8F5E9] text-[#2E7D32]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"></span> Paid
     </span>
    );
   case "pending":
    return (
     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#FFF3E0] text-[#E65100]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#E65100]"></span> Pending
     </span>
    );
   case "cancelled":
   case "failed":
    return (
     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#FFEBEE] text-[#C62828]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C62828]"></span> {status}
     </span>
    );
   default:
    return (
     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#F5F5F5] text-[#616161] capitalize">
      <span className="w-1.5 h-1.5 rounded-full bg-[#9E9E9E]"></span> {status}
     </span>
    );
  }
 };

 // Metrics calculations
 const totalRevenue = orders.reduce((sum, o) => o.status === 'paid' ? sum + o.total : sum, 0);
 const pendingCount = orders.filter(o => o.status === 'pending').length;

 return (
  <div className="space-y-8 max-w-7xl mx-auto pb-12">
   {/* Header */}
   <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
    <div>
     <h1 className="text-2xl font-bold text-[#1a1a1a] mb-1">Orders</h1>
     <p className="text-[#6c757d] text-sm">Manage {totalOrders} orders across your store.</p>
    </div>
    <div className="flex gap-3">
     <button className="px-4 py-2 border border-[#eef0f2] bg-white rounded-lg text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] shadow-sm transition-all">
      Export
     </button>
     <button className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-sm font-semibold hover:bg-[#2a2a2a] shadow-sm shadow-[#1a1a1a]/10 transition-all flex items-center gap-2">
      Create Order
     </button>
    </div>
   </div>

   {/* Metrics Cards */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-2xl border border-[#eef0f2] shadow-sm">
     <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
       <ShoppingBag className="w-5 h-5 text-blue-600" />
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
       <TrendingUp className="w-3 h-3" /> +12%
      </span>
     </div>
     <p className="text-sm font-medium text-[#6c757d] mb-1">Total Orders</p>
     <h3 className="text-2xl font-bold text-[#1a1a1a]">{totalOrders}</h3>
    </div>

    <div className="bg-white p-6 rounded-2xl border border-[#eef0f2] shadow-sm">
     <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
       <Clock className="w-5 h-5 text-orange-600" />
      </div>
     </div>
     <p className="text-sm font-medium text-[#6c757d] mb-1">Pending Fulfillment</p>
     <h3 className="text-2xl font-bold text-[#1a1a1a]">{pendingCount}</h3>
    </div>

    <div className="bg-white p-6 rounded-2xl border border-[#eef0f2] shadow-sm">
     <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
       <CreditCard className="w-5 h-5 text-green-600" />
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
       <TrendingUp className="w-3 h-3" /> +8%
      </span>
     </div>
     <p className="text-sm font-medium text-[#6c757d] mb-1">Total Revenue</p>
     <h3 className="text-2xl font-bold text-[#1a1a1a]">₹{totalRevenue.toLocaleString()}</h3>
    </div>
   </div>

   {/* Main Table Container */}
   <div className="bg-white border border-[#eef0f2] rounded-2xl shadow-sm overflow-hidden">
    
    {/* Filters and Search */}
    <div className="p-4 border-b border-[#eef0f2] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#fcfdfd]">
     {/* Tabs */}
     <div className="flex items-center gap-1">
      {['all', 'pending', 'paid', 'cancelled'].map((tab) => (
       <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
         activeTab === tab 
         ? 'bg-[#1a1a1a] text-white shadow-sm' 
         : 'text-[#6c757d] hover:bg-[#eef0f2] hover:text-[#1a1a1a]'
        }`}
       >
        {tab}
       </button>
      ))}
     </div>

     <div className="flex items-center gap-3">
      <div className="relative">
       <Search className="w-4 h-4 text-[#adb5bd] absolute left-3 top-1/2 -translate-y-1/2" />
       <input
        type="text"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 pr-4 py-2 bg-white border border-[#eef0f2] rounded-lg text-sm focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent outline-none w-full md:w-64 transition-all"
       />
      </div>
      <button className="p-2 bg-white border border-[#eef0f2] rounded-lg text-[#6c757d] hover:bg-[#f8f9fa] transition-colors">
       <Filter className="w-4 h-4" />
      </button>
     </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto min-h-[400px]">
     <table className="w-full text-left text-sm whitespace-nowrap">
      <thead className="bg-[#fcfdfd] border-b border-[#eef0f2] text-[#6c757d]">
       <tr>
        <th className="px-6 py-4 font-semibold w-16">Order</th>
        <th className="px-6 py-4 font-semibold">Date</th>
        <th className="px-6 py-4 font-semibold">Customer</th>
        <th className="px-6 py-4 font-semibold">Status</th>
        <th className="px-6 py-4 font-semibold text-right">Total</th>
       </tr>
      </thead>
      <tbody className="divide-y divide-[#eef0f2]">
       {loading ? (
        <tr>
         <td colSpan={5} className="px-6 py-20 text-center">
          <div className="flex flex-col items-center justify-center">
           <div className="w-8 h-8 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin mb-4"></div>
           <p className="text-[#6c757d] font-medium">Loading orders...</p>
          </div>
         </td>
        </tr>
       ) : filteredOrders.length === 0 ? (
        <tr>
         <td colSpan={5} className="px-6 py-20 text-center">
          <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center mx-auto mb-4">
           <Package className="w-8 h-8 text-[#adb5bd]" />
          </div>
          <p className="text-[#1a1a1a] font-bold text-lg mb-1">No orders found</p>
          <p className="text-[#6c757d]">Try adjusting your search or filters.</p>
         </td>
        </tr>
       ) : (
        filteredOrders.map((order) => (
         <React.Fragment key={order._id}>
          <tr 
           onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
           className={`hover:bg-[#f8f9fa] transition-colors cursor-pointer ${expandedOrder === order._id ? 'bg-[#f8f9fa]' : ''}`}
          >
           <td className="px-6 py-4 font-bold text-[#1a1a1a]">
            #{order._id.slice(-6).toUpperCase()}
           </td>
           <td className="px-6 py-4 text-[#6c757d]">
            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
           </td>
           <td className="px-6 py-4">
            <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-bold text-xs">
              {order.shippingAddress.fullName.charAt(0).toUpperCase()}
             </div>
             <div>
              <p className="font-bold text-[#1a1a1a]">{order.shippingAddress.fullName}</p>
              <p className="text-xs text-[#6c757d]">{order.items.length} items</p>
             </div>
            </div>
           </td>
           <td className="px-6 py-4">
            {getStatusBadge(order.status)}
           </td>
           <td className="px-6 py-4 text-right">
            <p className="font-bold text-[#1a1a1a]">₹{order.total}</p>
           </td>
          </tr>
          
          {/* Expanded CRM-Style View */}
          <AnimatePresence>
           {expandedOrder === order._id && (
            <tr>
             <td colSpan={5} className="p-0 border-b-0">
              <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: "auto" }}
               exit={{ opacity: 0, height: 0 }}
               className="bg-[#fafbfc] border-y border-[#eef0f2] overflow-hidden"
              >
               <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Order Items */}
                <div className="lg:col-span-2 space-y-6">
                 <div className="bg-white border border-[#eef0f2] rounded-xl overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-[#eef0f2] flex justify-between items-center">
                   <h4 className="font-bold text-[#1a1a1a] flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> Unfulfilled Items ({order.items.length})
                   </h4>
                   <button className="text-xs font-bold bg-[#1a1a1a] text-white px-3 py-1.5 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                    Fulfill Items
                   </button>
                  </div>
                  <div className="p-5 space-y-4">
                   {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                     <div className="w-16 h-16 bg-[#f8f9fa] rounded-lg border border-[#eef0f2] overflow-hidden flex-shrink-0">
                      {item.image ? (
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                       <Package className="w-full h-full p-4 text-[#adb5bd]" />
                      )}
                     </div>
                     <div className="flex-1">
                      <p className="font-bold text-[#1a1a1a] text-sm hover:underline cursor-pointer">{item.name}</p>
                      <p className="text-xs text-[#6c757d] mt-1">₹{item.price} � {item.quantity}</p>
                     </div>
                     <div className="text-right font-bold text-[#1a1a1a] text-sm">
                      ₹{item.price * item.quantity}
                     </div>
                    </div>
                   ))}
                  </div>
                  <div className="px-5 py-4 bg-[#fcfdfd] border-t border-[#eef0f2] space-y-2 text-sm">
                   <div className="flex justify-between text-[#6c757d]">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal}</span>
                   </div>
                   <div className="flex justify-between text-[#6c757d]">
                    <span>Shipping</span>
                    <span>₹{order.shipping}</span>
                   </div>
                   <div className="flex justify-between text-[#1a1a1a] font-bold text-base pt-2 border-t border-[#eef0f2] mt-2">
                    <span>Total</span>
                    <span>₹{order.total}</span>
                   </div>
                  </div>
                 </div>
                </div>

                {/* Right Column: Customer Info */}
                <div className="space-y-6">
                 {/* Customer Card */}
                 <div className="bg-white border border-[#eef0f2] rounded-xl shadow-sm">
                  <div className="px-5 py-4 border-b border-[#eef0f2]">
                   <h4 className="font-bold text-[#1a1a1a] flex items-center gap-2">
                    <User className="w-4 h-4" /> Customer
                   </h4>
                  </div>
                  <div className="p-5 space-y-4">
                   <div>
                    <p className="font-bold text-[#1a1a1a] text-sm">{order.shippingAddress.fullName}</p>
                    <p className="text-xs text-[#6c757d] mt-0.5">1 Order</p>
                   </div>
                   <div className="space-y-3 pt-4 border-t border-[#eef0f2]">
                    <div className="flex items-center gap-3 text-sm text-[#495057]">
                     <Mail className="w-4 h-4 text-[#adb5bd]" />
                     <span>
                       {order.user && typeof order.user === "object" && order.user.email
                         ? order.user.email
                         : "No email provided"}
                     </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#495057]">
                     <Phone className="w-4 h-4 text-[#adb5bd]" />
                     <span>{order.shippingAddress.phone}</span>
                    </div>
                   </div>
                  </div>
                 </div>

                 {/* Shipping Address Card */}
                 <div className="bg-white border border-[#eef0f2] rounded-xl shadow-sm">
                  <div className="px-5 py-4 border-b border-[#eef0f2] flex justify-between items-center">
                   <h4 className="font-bold text-[#1a1a1a] flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Shipping Address
                   </h4>
                   <button className="p-1 hover:bg-[#f8f9fa] rounded text-[#6c757d]">
                    <MoreHorizontal className="w-4 h-4" />
                   </button>
                  </div>
                  <div className="p-5">
                   <p className="text-sm text-[#495057] leading-relaxed">
                    {order.shippingAddress.fullName}<br />
                    {order.shippingAddress.addressLine1}<br />
                    {order.shippingAddress.addressLine2 && <>{order.shippingAddress.addressLine2}<br /></>}
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
                    India
                   </p>
                  </div>
                 </div>
                </div>
                
               </div>
              </motion.div>
             </td>
            </tr>
           )}
          </AnimatePresence>
         </React.Fragment>
        ))
       )}
      </tbody>
     </table>
    </div>

    {/* Pagination */}
    {!loading && totalPages > 1 && (
     <div className="px-6 py-4 border-t border-[#eef0f2] flex items-center justify-between bg-[#fcfdfd]">
      <span className="text-sm text-[#6c757d]">
       Showing <span className="font-bold text-[#1a1a1a]">{filteredOrders.length}</span> of {totalOrders} orders
      </span>
      <div className="flex items-center gap-2">
       <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="p-2 border border-[#eef0f2] bg-white rounded-lg text-[#1a1a1a] hover:bg-[#f8f9fa] disabled:opacity-50 transition-colors shadow-sm"
       >
        <ChevronLeft className="w-4 h-4" />
       </button>
       <button
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="p-2 border border-[#eef0f2] bg-white rounded-lg text-[#1a1a1a] hover:bg-[#f8f9fa] disabled:opacity-50 transition-colors shadow-sm"
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

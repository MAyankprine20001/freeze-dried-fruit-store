import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  Clock,
  AlertCircle,
  AlertTriangle,
  ClipboardList,
  Eye,
  IndianRupee
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Link } from "react-router-dom";

const chartData = [
  { name: "Apr 28", sales: 40000 },
  { name: "Apr 29", sales: 28000 },
  { name: "Apr 30", sales: 18000 },
  { name: "May 1", sales: 30000 },
  { name: "May 2", sales: 16000 },
  { name: "May 3", sales: 24000 },
  { name: "May 4", sales: 45000 },
];

const topProducts = [
  { name: "Strawberry Cream Crunch", category: "Fruit Chunks", sold: 320, image: "https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/logo_2_on76wp.png" },
  { name: "Mango Silk White", category: "Chocolates", sold: 245, image: "https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/logo_2_on76wp.png" },
  { name: "Blueberry Dual Swirl", category: "Chocolates", sold: 198, image: "https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/logo_2_on76wp.png" },
  { name: "Banana Cocoa Dark", category: "Chocolates", sold: 154, image: "https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/logo_2_on76wp.png" },
  { name: "Smoothie Premix Berry Blast", category: "Smoothie Premix", sold: 125, image: "https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/logo_2_on76wp.png" },
];

const recentOrders = [
  { id: "#3150A", customer: "Mayank P.", date: "Apr 28, 2026", amount: "₹179", status: "Pending", payment: "Paid" },
  { id: "#3149Z", customer: "Prince Pandey", date: "Apr 28, 2026", amount: "₹807", status: "Confirmed", payment: "Paid" },
  { id: "#3148Y", customer: "Richa Anand", date: "Apr 27, 2026", amount: "₹299", status: "Shipped", payment: "COD" },
  { id: "#3147X", customer: "Neha Sharma", date: "Apr 27, 2026", amount: "₹499", status: "Delivered", payment: "Paid" },
];

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${color}`}>
    {n}
  </span>
);

export default function Dashboard() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-600 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          Apr 28 – May 4, 2026
        </div>
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { n: 1, label: "Total Revenue", value: "₹1,28,430", pct: "12.5%", icon: IndianRupee, iconBg: "bg-blue-50", iconColor: "text-blue-500", badgeColor: "bg-blue-500" },
          { n: 2, label: "Total Orders", value: "56", pct: "8.2%", icon: ShoppingBag, iconBg: "bg-orange-50", iconColor: "text-orange-500", badgeColor: "bg-orange-500" },
          { n: 3, label: "Total Customers", value: "128", pct: "5.6%", icon: Users, iconBg: "bg-purple-50", iconColor: "text-purple-500", badgeColor: "bg-purple-500" },
          { n: 4, label: "Conversion Rate", value: "3.24%", pct: "1.1%", icon: TrendingUp, iconBg: "bg-green-50", iconColor: "text-green-500", badgeColor: "bg-green-500" },
        ].map((card, idx) => (
          <motion.div
            key={card.n}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-3 left-3">
              <NumberBadge n={card.n} color={card.badgeColor} />
            </div>
            <div className="flex items-center gap-3 mb-3 pt-1 pl-8">
              <div className={`w-9 h-9 ${card.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">{card.label}</p>
                <h3 className="text-lg font-bold text-gray-800 leading-tight">{card.value}</h3>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-500 pl-8">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{card.pct}</span>
              <span className="text-gray-400 font-medium">from last 7 days</span>
            </div>
            {/* Sparkline area placeholder */}
            <div className="mt-2 h-10 w-full opacity-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`grad${card.n}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={idx === 0 ? "#3b82f6" : idx === 1 ? "#f97316" : idx === 2 ? "#a855f7" : "#22c55e"} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={idx === 0 ? "#3b82f6" : idx === 1 ? "#f97316" : idx === 2 ? "#a855f7" : "#22c55e"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="sales" stroke={idx === 0 ? "#3b82f6" : idx === 1 ? "#f97316" : idx === 2 ? "#a855f7" : "#22c55e"} strokeWidth={1.5} fill={`url(#grad${card.n})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alert Cards Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { n: 5, label: "Today's Orders", value: "12", sub: "View all orders →", subLink: "/admin/orders", icon: ClipboardList, iconBg: "bg-yellow-50", iconColor: "text-yellow-600", badgeColor: "bg-yellow-500", subColor: "text-blue-500" },
          { n: 6, label: "Pending Orders", value: "7", sub: "Action required", subLink: null, icon: AlertCircle, iconBg: "bg-red-50", iconColor: "text-red-500", badgeColor: "bg-red-500", subColor: "text-red-500" },
          { n: 7, label: "Low Stock Alerts", value: "5", sub: "View inventory →", subLink: "/admin/inventory", icon: AlertTriangle, iconBg: "bg-orange-50", iconColor: "text-orange-500", badgeColor: "bg-orange-500", subColor: "text-blue-500" },
        ].map((card) => (
          <div key={card.n} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <NumberBadge n={card.n} color={card.badgeColor} />
              <div className={`w-9 h-9 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-600">{card.label}</p>
              <span className="text-2xl font-bold text-gray-800">{card.value}</span>
              <div className="mt-1">
                {card.subLink ? (
                  <Link to={card.subLink} className={`text-xs font-semibold ${card.subColor} hover:underline`}>{card.sub}</Link>
                ) : (
                  <span className={`text-xs font-semibold ${card.subColor}`}>{card.sub}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-3">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <NumberBadge n={8} color="bg-blue-500" />
              <h3 className="text-sm font-bold text-gray-800">Sales Overview</h3>
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold py-1 px-2.5 focus:ring-0 outline-none text-gray-600">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} dy={6} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} tickFormatter={(val) => val >= 1000 ? `${val / 1000}K` : val} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: "12px" }} />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <NumberBadge n={9} color="bg-purple-500" />
              <h3 className="text-sm font-bold text-gray-800">Top Selling Products</h3>
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold py-1 px-2.5 focus:ring-0 outline-none text-gray-600">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate max-w-[130px]">{product.name}</p>
                    <p className="text-[10px] text-gray-500">{product.category}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-600 whitespace-nowrap">{product.sold} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <NumberBadge n={10} color="bg-green-500" />
            <h3 className="text-sm font-bold text-gray-800">Recent Orders</h3>
          </div>
          <Link to="/admin/orders" className="text-xs font-semibold text-blue-500 hover:underline">
            View all orders →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="py-2.5 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="py-2.5 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="py-2.5 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-2.5 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="py-2.5 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-2.5 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="py-2.5 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-bold text-gray-800">{order.id}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-700">{order.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{order.date}</td>
                  <td className="py-3 px-4 text-sm font-bold text-gray-800">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      order.status === "Pending" ? "bg-orange-50 text-orange-600" :
                      order.status === "Confirmed" ? "bg-blue-50 text-blue-600" :
                      order.status === "Shipped" ? "bg-purple-50 text-purple-600" :
                      "bg-green-50 text-green-600"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-bold ${
                      order.payment === "Paid" ? "text-green-600" :
                      order.payment === "COD" ? "text-blue-600" : "text-red-600"
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

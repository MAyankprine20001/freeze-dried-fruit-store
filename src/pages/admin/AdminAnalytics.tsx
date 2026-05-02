import React, { useState } from "react";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  TrendingUp, IndianRupee, ShoppingBag, Users, BarChart2,
  Clock, ArrowUpRight, ArrowDownRight, RefreshCw
} from "lucide-react";

const salesData = [
  { name: "Apr 28", sales: 40000, orders: 28 },
  { name: "Apr 29", sales: 28000, orders: 20 },
  { name: "Apr 30", sales: 18000, orders: 12 },
  { name: "May 1", sales: 30000, orders: 22 },
  { name: "May 2", sales: 16000, orders: 11 },
  { name: "May 3", sales: 24000, orders: 18 },
  { name: "May 4", sales: 45000, orders: 40 },
];

const categoryData = [
  { name: "Fruit Chunks", value: 40, color: "#3b82f6" },
  { name: "Smoothie Premix", value: 30, color: "#10b981" },
  { name: "Chocolates", value: 20, color: "#f97316" },
  { name: "Powders", value: 10, color: "#a855f7" },
];

const paymentData = [
  { name: "UPI", value: 52, color: "#3b82f6" },
  { name: "Razorpay", value: 28, color: "#8b5cf6" },
  { name: "COD", value: 15, color: "#f97316" },
  { name: "Net Banking", value: 5, color: "#10b981" },
];

const topProducts = [
  { name: "Strawberry Cream Crunch", orders: 320, revenue: 53680, image: "" },
  { name: "Mango Silk White", orders: 245, revenue: 48755, image: "" },
  { name: "Blueberry Dual Swirl", orders: 198, revenue: 39402, image: "" },
  { name: "Banana Cocoa Dark", orders: 154, revenue: 30646, image: "" },
  { name: "Smoothie Premix Berry Blast", orders: 125, revenue: 24875, image: "" },
];

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

export default function AdminAnalytics() {
  const [dateRange] = useState("Apr 28, 2026 – May 4, 2026");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Analytics</h1>
          <p className="text-sm text-gray-500">Track performance and grow your business.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-600 shadow-sm">
          <NumberBadge n={1} color="bg-blue-500" />
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          {dateRange}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="flex items-center gap-2 mb-1">
        <NumberBadge n={2} color="bg-orange-500" />
        <span className="text-xs font-bold text-gray-600">KPI Summary Cards</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Revenue", value: "₹1,28,430", pct: "↑ 12.5%", icon: IndianRupee, iconBg: "bg-blue-50", iconColor: "text-blue-500", green: true },
          { label: "Total Orders", value: "56", pct: "↑ 8.2%", icon: ShoppingBag, iconBg: "bg-orange-50", iconColor: "text-orange-500", green: true },
          { label: "Average Order Value", value: "₹2,293", pct: "↑ 4.6%", icon: BarChart2, iconBg: "bg-purple-50", iconColor: "text-purple-500", green: true },
          { label: "Conversion Rate", value: "3.24%", pct: "↑ 1.1%", icon: TrendingUp, iconBg: "bg-green-50", iconColor: "text-green-500", green: true },
          { label: "Total Customers", value: "128", pct: "↑ 5.6%", icon: Users, iconBg: "bg-pink-50", iconColor: "text-pink-500", green: true },
        ].map((card, i) => (
          <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-8 h-8 ${card.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
              <p className="text-[10px] font-semibold text-gray-500">{card.label}</p>
            </div>
            <p className="text-lg font-bold text-gray-800 leading-tight">{card.value}</p>
            <p className="text-[10px] font-semibold text-green-500 mt-0.5">{card.pct} vs Apr 21 – Apr 27</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-3">
        {/* Sales Overview */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <NumberBadge n={3} color="bg-blue-500" />
              <h3 className="text-sm font-bold text-gray-800">Sales Overview</h3>
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold py-1 px-2.5 focus:ring-0 outline-none text-gray-600">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <p className="text-xs text-gray-400 mb-2">Revenue (₹)</p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} tickFormatter={(v) => v >= 1000 ? `${v / 1000}K` : v} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
                <Area type="monotone" dataKey="sales" stroke="#7c3aed" strokeWidth={2} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Overview */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <NumberBadge n={4} color="bg-green-500" />
              <h3 className="text-sm font-bold text-gray-800">Orders Overview</h3>
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold py-1 px-2.5 focus:ring-0 outline-none text-gray-600">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <p className="text-xs text-gray-400 mb-2">Orders</p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
                <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Conversion Funnel & Top Products */}
      <div className="grid lg:grid-cols-2 gap-3">
        {/* Conversion Funnel */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <NumberBadge n={5} color="bg-purple-500" />
            <h3 className="text-sm font-bold text-gray-800">Conversion Funnel <span className="text-gray-400 font-normal">(This Week)</span></h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Visitors", value: "12,540", pct: "100%", icon: "👥" },
              { label: "Add to Cart", value: "2,840", pct: "22.63%", icon: "🛒" },
              { label: "Checkout", value: "1,120", pct: "8.93%", icon: "📋" },
              { label: "Completed", value: "405", pct: "3.23%", icon: "✅" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-2 text-lg">{step.icon}</div>
                <p className="text-[10px] font-semibold text-gray-500">{step.label}</p>
                <p className="text-base font-bold text-gray-800">{step.value}</p>
                <p className="text-[10px] text-gray-400">{step.pct}</p>
                {i < 3 && <div className="text-gray-300 text-lg mt-1">→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Products */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <NumberBadge n={6} color="bg-orange-500" />
              <h3 className="text-sm font-bold text-gray-800">Top Performing Products</h3>
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold py-1 px-2.5 focus:ring-0 outline-none text-gray-600">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="grid grid-cols-3 text-xs font-bold text-gray-500 pb-2 border-b border-gray-100">
            <span>Product</span><span className="text-center">Orders</span><span className="text-right">Revenue</span>
          </div>
          <div className="space-y-2 mt-2">
            {topProducts.map((p, i) => (
              <div key={i} className="grid grid-cols-3 items-center text-sm">
                <span className="font-semibold text-gray-800 text-xs truncate pr-2">{p.name}</span>
                <span className="text-center text-gray-600">{p.orders}</span>
                <span className="text-right font-bold text-gray-800">₹{p.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Revenue by Category */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <NumberBadge n={7} color="bg-blue-500" />
              <h3 className="text-sm font-bold text-gray-800">Revenue by Category</h3>
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs py-1 px-2 outline-none text-gray-500">
              <option>This Week</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[100px] w-[100px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={30} outerRadius={45} paddingAngle={2} dataKey="value">
                    {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 flex-1">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-gray-600 flex-1">{item.name}</span>
                  <span className="text-[10px] font-bold text-gray-700">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue by Payment Method */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <NumberBadge n={8} color="bg-green-500" />
              <h3 className="text-sm font-bold text-gray-800">Revenue by Payment Method</h3>
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs py-1 px-2 outline-none text-gray-500">
              <option>This Week</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[100px] w-[100px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={paymentData} innerRadius={30} outerRadius={45} paddingAngle={2} dataKey="value">
                    {paymentData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 flex-1">
              {paymentData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-gray-600 flex-1">{item.name}</span>
                  <span className="text-[10px] font-bold text-gray-700">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <NumberBadge n={9} color="bg-pink-500" />
              <h3 className="text-sm font-bold text-gray-800">Customer Insights</h3>
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-lg text-xs py-1 px-2 outline-none text-gray-500">
              <option>This Week</option>
            </select>
          </div>
          <div className="space-y-3">
            {[
              { label: "New Customers", value: "32", pct: "↑ 14.3%", icon: "👤", color: "text-green-500" },
              { label: "Returning Customers", value: "96", pct: "↑ 9.8%", icon: "🔄", color: "text-green-500" },
              { label: "Repeat Purchase Rate", value: "28.6%", pct: "↑ 6.4%", icon: "₹", color: "text-green-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs font-semibold text-gray-600">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-800">{item.value}</span>
                  <span className={`text-[10px] font-bold ${item.color} ml-1`}>{item.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

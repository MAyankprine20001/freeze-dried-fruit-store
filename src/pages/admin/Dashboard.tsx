import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const data = [
  { name: "Mon", sales: 4000, orders: 24 },
  { name: "Tue", sales: 3000, orders: 18 },
  { name: "Wed", sales: 2000, orders: 12 },
  { name: "Thu", sales: 2780, orders: 20 },
  { name: "Fri", sales: 1890, orders: 15 },
  { name: "Sat", sales: 2390, orders: 19 },
  { name: "Sun", sales: 3490, orders: 28 },
];

const stats = [
  { 
    label: "Total Revenue", 
    value: "₹1,28,430", 
    change: "+12.5%", 
    isPositive: true, 
    icon: DollarSign,
    color: "bg-blue-50 text-blue-600"
  },
  { 
    label: "Active Orders", 
    value: "45", 
    change: "+5.2%", 
    isPositive: true, 
    icon: ShoppingBag,
    color: "bg-orange-50 text-orange-600"
  },
  { 
    label: "New Customers", 
    value: "128", 
    change: "-2.4%", 
    isPositive: false, 
    icon: Users,
    color: "bg-purple-50 text-purple-600"
  },
  { 
    label: "Conversion Rate", 
    value: "3.24%", 
    change: "+1.1%", 
    isPositive: true, 
    icon: TrendingUp,
    color: "bg-green-50 text-green-600"
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Good Morning, Mayank</h1>
        <p className="text-[#6c757d]">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-[24px] border border-[#eef0f2] shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                  stat.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                }`}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm font-semibold text-[#6c757d] mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#1a1a1a]">{stat.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-[#eef0f2] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Revenue Overview</h3>
            <select className="bg-[#f8f9fa] border-none rounded-lg text-sm font-semibold py-2 px-4 focus:ring-0 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#adb5bd' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#adb5bd' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#1a1a1a', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#1a1a1a" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-[32px] border border-[#eef0f2] shadow-sm">
          <h3 className="text-lg font-bold text-[#1a1a1a] mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#adb5bd]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">New Order #1234{i}</p>
                  <p className="text-xs text-[#6c757d] mb-1">Mayank P. purchased Strawberry Powder</p>
                  <p className="text-[10px] font-bold text-[#adb5bd] uppercase">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-[#eef0f2] text-sm font-bold text-[#6c757d] hover:bg-[#f8f9fa] hover:text-[#1a1a1a] transition-all">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}

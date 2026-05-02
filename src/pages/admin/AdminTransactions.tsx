import React, { useState } from "react";
import {
  Search, Filter, Download, Eye, RefreshCw,
  TrendingUp, IndianRupee, CheckCircle, Clock, XCircle, Calendar
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const transactions = [
  { id: "PAY_10001", orderId: "#3150A", customer: "Mayank P.", email: "mayankp@gmail.com", amount: 179, method: "UPI", status: "Paid", date: "Apr 28, 2026", time: "10:32 AM" },
  { id: "PAY_10002", orderId: "#3149Z", customer: "Prince Pandey", email: "princepandey@gmail.com", amount: 807, method: "Razorpay", status: "Paid", date: "Apr 28, 2026", time: "09:16 AM" },
  { id: "PAY_10003", orderId: "#3148Y", customer: "Richa Anand", email: "richa.anand09@gmail.com", amount: 299, method: "COD", status: "Paid", date: "Apr 27, 2026", time: "08:47 PM" },
  { id: "PAY_10004", orderId: "#3147X", customer: "Neha Sharma", email: "neha.sharma22@gmail.com", amount: 499, method: "Razorpay", status: "Paid", date: "Apr 27, 2026", time: "06:21 PM" },
  { id: "PAY_10005", orderId: "#3146W", customer: "Karan Mehta", email: "karanmehta@gmail.com", amount: 199, method: "Razorpay", status: "Failed", date: "Apr 27, 2026", time: "04:11 PM" },
  { id: "REF_20001", orderId: "#3147X", customer: "Neha Sharma", email: "neha.sharma22@gmail.com", amount: -499, method: "Refund", status: "Refunded", date: "Apr 27, 2026", time: "07:15 PM" },
  { id: "PAY_10005", orderId: "#3145V", customer: "Sneha Verma", email: "snehaverma@gmail.com", amount: 349, method: "UPI", status: "Pending", date: "Apr 27, 2026", time: "03:30 PM" },
];

const paymentMethodData = [
  { name: "UPI", value: 52, color: "#3b82f6" },
  { name: "Razorpay", value: 28, color: "#8b5cf6" },
  { name: "COD", value: 15, color: "#f97316" },
  { name: "Net Banking", value: 5, color: "#10b981" },
  { name: "Wallet", value: 2, color: "#ec4899" },
];

const recentRefunds = [
  { id: "REF_20001", orderId: "#3147X", customer: "Neha Sharma", amount: 499, date: "2 min ago" },
  { id: "REF_20002", orderId: "#3132T", customer: "Aditya Singh", amount: 299, date: "15 min ago" },
  { id: "REF_20003", orderId: "#3128Q", customer: "Pooja Verma", amount: 599, date: "1 hour ago" },
];

const failedPayments = [
  { id: "PAY_10005", customer: "Karan Mehta", amount: 199 },
  { id: "PAY_10007", customer: "Rahul Kumar", amount: 349 },
  { id: "PAY_10008", customer: "Anjali Verma", amount: 299 },
];

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

const statusColor = (status: string) =>
  status === "Paid" ? "bg-green-50 text-green-600" :
  status === "Pending" ? "bg-orange-50 text-orange-600" :
  status === "Failed" ? "bg-red-50 text-red-600" :
  "bg-purple-50 text-purple-600";

export default function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = transactions.filter(
    (t) =>
      t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Transactions</h1>
        <p className="text-sm text-gray-500">Track all payment transactions and refunds.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { n: 2, label: "Total Revenue", value: "₹18,76,430", sub: "↑ 14.6% from last 7 days", icon: IndianRupee, iconBg: "bg-blue-50", iconColor: "text-blue-500", badge: "bg-blue-500" },
          { n: 3, label: "Successful Payments", value: "1,245", sub: "↑ 11.3% from last 7 days", icon: CheckCircle, iconBg: "bg-green-50", iconColor: "text-green-500", badge: "bg-green-500" },
          { n: 4, label: "Pending Payments", value: "37", sub: "↑ 5.2% from last 7 days", icon: Clock, iconBg: "bg-orange-50", iconColor: "text-orange-500", badge: "bg-orange-500" },
          { n: 4, label: "Failed Payments", value: "18", sub: "↓ 2.1% from last 7 days", icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-500", badge: "bg-red-500" },
          { n: 6, label: "Total Refunds", value: "₹24,780", sub: "↑ 8.6% from last 7 days", icon: RefreshCw, iconBg: "bg-purple-50", iconColor: "text-purple-500", badge: "bg-purple-500" },
        ].map((card, i) => (
          <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className={`w-9 h-9 ${card.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <card.icon className={`w-4 h-4 ${card.iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-gray-500 truncate">{card.label}</p>
              <p className="text-base font-bold text-gray-800 leading-tight">{card.value}</p>
              <p className={`text-[10px] font-semibold ${i === 3 ? "text-red-500" : "text-green-500"}`}>{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600">
            <Calendar className="w-3.5 h-3.5" /> Apr 28, 2026 – May 4, 2026
          </div>
          <select className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
            <option>Payment Status: All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>
          <select className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none">
            <option>Payment Method: All</option>
            <option>UPI</option>
            <option>Razorpay</option>
            <option>COD</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, payment ID, customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none w-72"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <NumberBadge n={12} color="bg-gray-600" />
          <h3 className="text-sm font-bold text-gray-700">Transactions Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment ID</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((txn, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{txn.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-700">{txn.orderId}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{txn.customer}</p>
                      <p className="text-xs text-gray-400">{txn.email}</p>
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-sm font-bold ${txn.amount < 0 ? "text-red-500" : "text-gray-800"}`}>
                    {txn.amount < 0 ? `-₹${Math.abs(txn.amount)}` : `₹${txn.amount}`}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{txn.method}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColor(txn.status)}`}>{txn.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-gray-600">{txn.date}</p>
                      <p className="text-xs text-gray-400">{txn.time}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 text-gray-400">
                      <button className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all"><RefreshCw className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400">Showing 1 to {filtered.length} of 1,300 transactions</p>
          <div className="flex gap-1.5">
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{"<"}</button>
            <button className="px-2.5 py-1 bg-[#111827] text-white rounded text-xs font-bold">1</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">...</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">186</button>
            <button className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">{">"}</button>
          </div>
        </div>
      </div>

      {/* Bottom Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Payment Methods Breakdown */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <NumberBadge n={13} color="bg-blue-500" />
            <h3 className="text-sm font-bold text-gray-800">Payment Methods Breakdown</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[90px] w-[90px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={paymentMethodData} innerRadius={28} outerRadius={42} paddingAngle={2} dataKey="value">
                    {paymentMethodData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1">
              {paymentMethodData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-gray-600">{item.name}</span>
                  <span className="text-[10px] font-bold text-gray-700 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Refunds */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <NumberBadge n={14} color="bg-purple-500" />
            <h3 className="text-sm font-bold text-gray-800">Recent Refunds</h3>
          </div>
          <div className="space-y-2">
            {recentRefunds.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-xs font-bold text-gray-800">{r.id}</p>
                  <p className="text-[10px] text-gray-500">{r.orderId} • {r.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-red-500">₹{r.amount}</p>
                  <span className="text-[10px] bg-purple-50 text-purple-600 font-bold px-1.5 py-0.5 rounded">Refunded</span>
                </div>
              </div>
            ))}
          </div>
          <button className="text-xs font-bold text-blue-500 hover:underline mt-2">View all refunds →</button>
        </div>

        {/* Failed Payments */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <NumberBadge n={15} color="bg-red-500" />
            <h3 className="text-sm font-bold text-gray-800">Failed Payments</h3>
          </div>
          <div className="space-y-2">
            {failedPayments.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-xs font-bold text-gray-800">{f.id}</p>
                  <p className="text-[10px] text-gray-500">{f.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-800">₹{f.amount}</p>
                  <span className="text-[10px] bg-red-50 text-red-500 font-bold px-1.5 py-0.5 rounded">Failed</span>
                </div>
              </div>
            ))}
          </div>
          <button className="text-xs font-bold text-blue-500 hover:underline mt-2">View all failed payments →</button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <NumberBadge n={16} color="bg-gray-600" />
            <h3 className="text-sm font-bold text-gray-800">Quick Actions</h3>
          </div>
          <div className="space-y-2">
            {[
              { label: "Initiate Refund", icon: RefreshCw, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "View Payment Gateway Logs", icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Download Settlements", icon: Download, color: "text-green-600", bg: "bg-green-50" },
              { label: "Manage Refunds", icon: Filter, color: "text-orange-600", bg: "bg-orange-50" },
            ].map((action) => (
              <button key={action.label} className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className={`${action.bg} p-1.5 rounded-md`}>
                  <action.icon className={`w-3.5 h-3.5 ${action.color}`} />
                </div>
                <span className="text-xs font-semibold text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

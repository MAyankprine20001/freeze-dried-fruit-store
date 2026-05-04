import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search, Filter, Download, Eye, RefreshCw,
  IndianRupee, CheckCircle, Clock, XCircle, Calendar, Loader2
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getAdminTransactions,
  getAdminTransactionStats,
  type AdminTransactionStats,
  type Order,
} from "../../api/payment";

const PAGE_LIMIT = 15;

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${color}`}>{n}</span>
);

const statusColor = (status: string) =>
  status === "paid" ? "bg-green-50 text-green-600" :
  status === "pending" ? "bg-orange-50 text-orange-600" :
  status === "failed" ? "bg-red-50 text-red-600" :
  status === "refunded" ? "bg-purple-50 text-purple-600" :
  "bg-gray-50 text-gray-600";

const statusLabel = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "paid") return "Paid";
  if (s === "pending") return "Pending";
  if (s === "failed") return "Failed";
  if (s === "refunded") return "Refunded";
  if (s === "cancelled") return "Cancelled";
  return status || "Unknown";
};

const methodColors: Record<string, string> = {
  UPI: "#3b82f6",
  Razorpay: "#8b5cf6",
  COD: "#f97316",
  Refund: "#a855f7",
  "Net Banking": "#10b981",
  Unknown: "#94a3b8",
};

const fmtCurrency = (amount: number) =>
  `₹${Math.round(amount || 0).toLocaleString("en-IN")}`;

export default function AdminTransactions() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [paymentMethod, setPaymentMethod] = useState("All");
  const [transactions, setTransactions] = useState<Order[]>([]);
  const [stats, setStats] = useState<AdminTransactionStats | null>(null);
  const [total, setTotal] = useState(0);
  const [pageCursors, setPageCursors] = useState<(string | null)[]>([null]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    setPageCursors([null]);
  }, [debouncedSearch, paymentStatus, paymentMethod]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const cursor = pageCursors[pageCursors.length - 1];
      const [statsRes, listRes] = await Promise.all([
        getAdminTransactionStats({
          search: debouncedSearch,
          paymentStatus,
          paymentMethod,
        }),
        getAdminTransactions({
          limit: PAGE_LIMIT,
          cursor: cursor || undefined,
          search: debouncedSearch,
          paymentStatus,
          paymentMethod,
        }),
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (listRes.success) {
        setTransactions(listRes.data);
        setNextCursor(listRes.nextCursor);
        setHasNextPage(listRes.hasNextPage);
        setTotal(listRes.total);
      }
    } catch {
      toast.error("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, paymentStatus, paymentMethod, pageCursors]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const paymentMethodData = useMemo(
    () =>
      (stats?.paymentMethodBreakdown || []).map((item) => ({
        name: item.name,
        value: item.percentage,
        color: methodColors[item.name] || methodColors.Unknown,
      })),
    [stats]
  );

  const rangeStart = (pageCursors.length - 1) * PAGE_LIMIT + (transactions.length ? 1 : 0);
  const rangeEnd = (pageCursors.length - 1) * PAGE_LIMIT + transactions.length;

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
          { n: 2, label: "Total Revenue", value: fmtCurrency(stats?.totalRevenue || 0), sub: "Paid order value", icon: IndianRupee, iconBg: "bg-blue-50", iconColor: "text-blue-500", badge: "bg-blue-500" },
          { n: 3, label: "Successful Payments", value: String(stats?.successfulPayments || 0), sub: "Payment status: paid", icon: CheckCircle, iconBg: "bg-green-50", iconColor: "text-green-500", badge: "bg-green-500" },
          { n: 4, label: "Pending Payments", value: String(stats?.pendingPayments || 0), sub: "Payment status: pending", icon: Clock, iconBg: "bg-orange-50", iconColor: "text-orange-500", badge: "bg-orange-500" },
          { n: 5, label: "Failed Payments", value: String(stats?.failedPayments || 0), sub: "Payment status: failed", icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-500", badge: "bg-red-500" },
          { n: 6, label: "Total Refunds", value: fmtCurrency(stats?.totalRefunds || 0), sub: "Payment status: refunded", icon: RefreshCw, iconBg: "bg-purple-50", iconColor: "text-purple-500", badge: "bg-purple-500" },
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
            <Calendar className="w-3.5 h-3.5" /> Live transactions
          </div>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none"
          >
            <option value="All">Payment Status: All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 focus:ring-0 outline-none"
          >
            <option value="All">Payment Method: All</option>
            <option value="UPI">UPI</option>
            <option value="Razorpay">Razorpay</option>
            <option value="COD">COD</option>
            <option value="Net Banking">Net Banking</option>
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
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Loader2 className="w-8 h-8 animate-spin mb-2" />
                      <p className="text-sm font-medium">Loading transactions...</p>
                    </div>
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center text-sm text-gray-500">
                    No transactions found for selected filters.
                  </td>
                </tr>
              ) : (
                transactions.map((txn) => {
                  const paymentId = txn.razorpay?.paymentId || txn.razorpay?.orderId || `PAY_${txn._id.slice(-8).toUpperCase()}`;
                  const email = typeof txn.user === "object" ? txn.user?.email : "";
                  const customer = txn.shippingAddress?.fullName || (typeof txn.user === "object" ? txn.user?.fullName : "") || "Guest";
                  const amount = txn.status === "refunded" ? -Math.abs(txn.total) : txn.total;
                  return (
                    <tr key={txn._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-bold text-gray-800">{paymentId}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-700">#{txn._id.slice(-5).toUpperCase()}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-bold text-gray-800">{customer}</p>
                          <p className="text-xs text-gray-400">{email || "—"}</p>
                        </div>
                      </td>
                      <td className={`px-4 py-3 text-sm font-bold ${amount < 0 ? "text-red-500" : "text-gray-800"}`}>
                        {amount < 0 ? `-₹${Math.abs(amount)}` : `₹${amount}`}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{txn.paymentMethod || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColor(txn.status)}`}>
                          {statusLabel(txn.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-600">
                            {new Date(txn.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(txn.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 text-gray-400">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/orders?open=${txn._id}`)}
                            title="View order details"
                            className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 hover:text-blue-500 hover:bg-blue-50 rounded transition-all"><RefreshCw className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400">
            {transactions.length === 0
              ? "No transactions on this page"
              : `Showing ${rangeStart} to ${rangeEnd} of ${total} transactions`}
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={pageCursors.length <= 1}
              onClick={() => setPageCursors((p) => (p.length > 1 ? p.slice(0, -1) : p))}
              className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!hasNextPage || !nextCursor}
              onClick={() => nextCursor && setPageCursors((p) => [...p, nextCursor])}
              className="px-2.5 py-1 bg-[#111827] text-white rounded text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
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
            {(stats?.recentRefunds || []).map((r) => (
              <div key={r._id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-xs font-bold text-gray-800">{r.razorpay?.paymentId || r.razorpay?.orderId || `REF_${r._id.slice(-6).toUpperCase()}`}</p>
                  <p className="text-[10px] text-gray-500">#{r._id.slice(-5).toUpperCase()} • {r.shippingAddress?.fullName || "Guest"}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-red-500">₹{r.total}</p>
                  <span className="text-[10px] bg-purple-50 text-purple-600 font-bold px-1.5 py-0.5 rounded">Refunded</span>
                </div>
              </div>
            ))}
            {(stats?.recentRefunds || []).length === 0 && (
              <p className="text-xs text-gray-500">No recent refunds.</p>
            )}
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
            {(stats?.recentFailedPayments || []).map((f, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-xs font-bold text-gray-800">{f.razorpay?.paymentId || f.razorpay?.orderId || `PAY_${f._id.slice(-6).toUpperCase()}`}</p>
                  <p className="text-[10px] text-gray-500">{f.shippingAddress?.fullName || "Guest"}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-800">₹{f.total}</p>
                  <span className="text-[10px] bg-red-50 text-red-500 font-bold px-1.5 py-0.5 rounded">Failed</span>
                </div>
              </div>
            ))}
            {(stats?.recentFailedPayments || []).length === 0 && (
              <p className="text-xs text-gray-500">No failed payments.</p>
            )}
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

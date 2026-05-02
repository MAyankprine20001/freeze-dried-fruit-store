import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  AlertTriangle,
  ClipboardList,
  Eye,
  IndianRupee,
  Loader2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { getProductPrimaryImage } from "../../utils/productImage";
import { getDashboardStats, type DashboardData } from "../../api/admin.api";

const NumberBadge = ({ n, color }: { n: number; color: string }) => (
  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${color}`}>
    {n}
  </span>
);

const emptyTrend = [{ name: "—", sales: 0 }];

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dash, setDash] = useState<DashboardData | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getDashboardStats();
        if (!cancelled && res.success) setDash(res.data);
      } catch {
        if (!cancelled) setDash(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const salesOverview = dash?.salesOverview?.length ? dash.salesOverview : emptyTrend;
  const ordersTrend = dash?.ordersTrend?.length ? dash.ordersTrend : emptyTrend;
  const customersTrend = dash?.customersTrend?.length ? dash.customersTrend : emptyTrend;
  const conversionTrend = dash?.conversionTrend?.length ? dash.conversionTrend : emptyTrend;
  const trends = [salesOverview, ordersTrend, customersTrend, conversionTrend];
  const topProducts = dash?.topProducts?.length ? dash.topProducts : [];
  const recentOrders = dash?.recentOrders || [];
  const deltas = dash?.deltas || { revenuePct: 0, ordersPct: 0, customersPct: 0, conversionPct: 0 };

  const dateRangeLabel =
    salesOverview.length >= 2
      ? `${salesOverview[0]?.name} – ${salesOverview[salesOverview.length - 1]?.name} (UTC)`
      : "Last 7 days";

  const fmtPct = (v: number) => (
    <span className={`flex items-center gap-1 ${v >= 0 ? "text-green-500" : "text-red-500"}`}>
      {v >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
      <span>{Math.abs(v).toFixed(1)}%</span>
      <span className="text-gray-400 font-medium">from last 7 days</span>
    </span>
  );

  const mainCards = [
    {
      n: 1,
      label: "Total Revenue",
      value: dash ? `₹${Math.round(dash.totalRevenue).toLocaleString("en-IN")}` : "—",
      delta: fmtPct(deltas.revenuePct),
      icon: IndianRupee,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      badgeColor: "bg-blue-500",
    },
    {
      n: 2,
      label: "Total Orders",
      value: dash ? String(dash.totalOrders) : "—",
      delta: fmtPct(deltas.ordersPct),
      icon: ShoppingBag,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      badgeColor: "bg-orange-500",
    },
    {
      n: 3,
      label: "Total Customers",
      value: dash ? String(dash.totalCustomers) : "—",
      delta: fmtPct(deltas.customersPct),
      icon: Users,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
      badgeColor: "bg-purple-500",
    },
    {
      n: 4,
      label: "Conversion Rate",
      value: dash ? `${dash.conversionRate.toFixed(2)}%` : "—",
      delta: fmtPct(deltas.conversionPct),
      icon: TrendingUp,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
      badgeColor: "bg-green-500",
    },
  ];

  const paymentLabel = (status: string, method?: string) => {
    const s = (status || "").toLowerCase();
    if (s === "paid") return "Paid";
    if (s === "pending") return method === "COD" ? "COD" : "Pending";
    if (s === "failed") return "Failed";
    return status || "—";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#111827]" />
        <p className="text-sm font-semibold">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-600 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          {dateRangeLabel}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {mainCards.map((card, idx) => (
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
            <div className="flex items-center gap-1.5 text-xs font-bold pl-8">{card.delta}</div>
            <div className="mt-2 h-10 w-full opacity-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends[idx]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`grad${card.n}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={idx === 0 ? "#3b82f6" : idx === 1 ? "#f97316" : idx === 2 ? "#a855f7" : "#22c55e"} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={idx === 0 ? "#3b82f6" : idx === 1 ? "#f97316" : idx === 2 ? "#a855f7" : "#22c55e"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke={idx === 0 ? "#3b82f6" : idx === 1 ? "#f97316" : idx === 2 ? "#a855f7" : "#22c55e"}
                    strokeWidth={1.5}
                    fill={`url(#grad${card.n})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          {
            n: 5,
            label: "Today's Orders",
            value: dash ? String(dash.todaysOrders) : "—",
            sub: "View all orders →",
            subLink: "/admin/orders",
            icon: ClipboardList,
            iconBg: "bg-yellow-50",
            iconColor: "text-yellow-600",
            badgeColor: "bg-yellow-500",
            subColor: "text-blue-500",
          },
          {
            n: 6,
            label: "Pending Orders",
            value: dash ? String(dash.pendingOrders) : "—",
            sub: "Action required",
            subLink: "/admin/orders",
            icon: AlertCircle,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
            badgeColor: "bg-red-500",
            subColor: "text-red-500",
          },
          {
            n: 7,
            label: "Low Stock Alerts",
            value: dash ? String(dash.lowStockAlerts) : "—",
            sub: "View inventory →",
            subLink: "/admin/inventory",
            icon: AlertTriangle,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500",
            badgeColor: "bg-orange-500",
            subColor: "text-blue-500",
          },
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
                  <Link to={card.subLink} className={`text-xs font-semibold ${card.subColor} hover:underline`}>
                    {card.sub}
                  </Link>
                ) : (
                  <span className={`text-xs font-semibold ${card.subColor}`}>{card.sub}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <NumberBadge n={8} color="bg-blue-500" />
              <h3 className="text-sm font-bold text-gray-800">Sales Overview</h3>
            </div>
            <span className="text-xs font-semibold text-gray-500">Paid orders (7d, UTC)</span>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesOverview} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9CA3AF" }} dy={6} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                  tickFormatter={(val) => (val >= 1000 ? `${val / 1000}K` : val)}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <NumberBadge n={9} color="bg-purple-500" />
              <h3 className="text-sm font-bold text-gray-800">Top Selling Products</h3>
            </div>
            <span className="text-xs font-semibold text-gray-500">7d paid</span>
          </div>
          <div className="space-y-3">
            {topProducts.length === 0 ? (
              <p className="text-sm text-gray-500">No paid order data yet.</p>
            ) : (
              topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={getProductPrimaryImage(product)} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate max-w-[130px]">{product.name}</p>
                      <p className="text-[10px] text-gray-500">{product.category || "—"}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-600 whitespace-nowrap">{product.sold} sold</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

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
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 px-4 text-center text-sm text-gray-500">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order: any) => {
                  const oid = order._id;
                  const shortId = oid ? `#${String(oid).slice(-5).toUpperCase()}` : "—";
                  const customer =
                    order.user?.fullName ||
                    order.shippingAddress?.fullName ||
                    "Guest";
                  const dateStr = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—";
                  const os = order.orderStatus || "Pending";
                  const pay = paymentLabel(order.status, order.paymentMethod);
                  return (
                    <tr key={oid} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-bold text-gray-800">{shortId}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-700">{customer}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{dateStr}</td>
                      <td className="py-3 px-4 text-sm font-bold text-gray-800">₹{order.total}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold ${
                            os === "Pending"
                              ? "bg-orange-50 text-orange-600"
                              : os === "Confirmed"
                                ? "bg-blue-50 text-blue-600"
                                : os === "Shipped"
                                  ? "bg-purple-50 text-purple-600"
                                  : os === "Delivered"
                                    ? "bg-green-50 text-green-600"
                                    : os === "Cancelled"
                                      ? "bg-red-50 text-red-600"
                                      : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {os}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs font-bold ${
                            pay === "Paid" ? "text-green-600" : pay === "COD" ? "text-blue-600" : pay === "Failed" ? "text-red-600" : "text-orange-600"
                          }`}
                        >
                          {pay}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          title="Open in Orders"
                          onClick={() => navigate(`/admin/orders?open=${oid}`)}
                          className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

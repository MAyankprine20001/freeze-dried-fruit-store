import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  Search,
  Bell,
  DollarSign,
  BarChart2,
  Box,
  Ticket,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [headerSearch, setHeaderSearch] = useState("");

  const runHeaderSearch = () => {
    const q = headerSearch.trim();
    if (!q) return;
    if (q.includes("@")) {
      navigate("/admin/customers", { state: { search: q } });
      return;
    }
    navigate(`/admin/orders?search=${encodeURIComponent(q)}`);
  };

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { label: "Customers", path: "/admin/customers", icon: Users },
    { label: "Transactions", path: "/admin/transactions", icon: DollarSign },
    { label: "Analytics", path: "/admin/analytics", icon: BarChart2 },
    { label: "Inventory", path: "/admin/inventory", icon: Box },
    { label: "Coupons", path: "/admin/coupons", icon: Ticket },
    { label: "Reviews", path: "/admin/reviews", icon: MessageSquare },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111827] flex flex-col sticky top-0 h-screen z-20 shrink-0">
        {/* Logo */}
        <div className="px-4 py-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/logo_2_on76wp.png"
                alt="TDF Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-white text-sm leading-tight">The Dry Factory</span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${isActive
                  ? "bg-[#D4A017] text-[#111827]"
                  : "text-[#9CA3AF] hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#111827]" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-all duration-150"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") runHeaderSearch();
                }}
                placeholder="Search orders, products, customers… (Enter)"
                className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-800 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800 leading-tight">{user?.name || "Admin"}</p>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Administrator</p>
              </div>
              <div className="w-9 h-9 bg-[#111827] rounded-full flex items-center justify-center text-white font-bold text-sm">
                {(user?.name?.[0] || "A").toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

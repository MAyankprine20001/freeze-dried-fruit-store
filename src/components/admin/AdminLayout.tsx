import React from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { 
 LayoutDashboard, 
 Package, 
 Users, 
 ShoppingBag, 
 Settings, 
 LogOut, 
 ArrowLeft,
 Search,
 Bell,
 DollarSign
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
 const location = useLocation();
 const navigate = useNavigate();
 const { user, logout } = useAuth();

 const menuItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { label: "Transactions", path: "/admin/transactions", icon: DollarSign },
  { label: "Customers", path: "/admin/customers", icon: Users },
  { label: "Settings", path: "/admin/settings", icon: Settings },
 ];


 return (
  <div className="min-h-screen bg-[#f8f9fa] flex">
   {/* Sidebar */}
   <aside className="w-64 bg-white border-r border-[#eef0f2] flex flex-col sticky top-0 h-screen z-20">
    <div className="p-6 border-b border-[#eef0f2]">
     <Link to="/" className="flex items-center gap-3 group">
      <img src="https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/logo_2_on76wp.png" alt="Logo" className="w-10 h-10 object-contain" />
      <span className="font-serif font-bold text-[#1a1a1a] tracking-tight">Dry Factory</span>
     </Link>
    </div>

    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
     {menuItems.map((item) => {
      const isActive = location.pathname === item.path;
      const Icon = item.icon;
      return (
       <Link
        key={item.path}
        to={item.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
         isActive 
          ? "bg-[#1a1a1a] text-white shadow-lg shadow-[#1a1a1a]/10" 
          : "text-[#6c757d] hover:bg-[#f8f9fa] hover:text-[#1a1a1a]"
        }`}
       >
        <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#adb5bd]"}`} />
        {item.label}
       </Link>
      );
     })}
    </nav>

    <div className="p-4 border-t border-[#eef0f2]">
     <button
      onClick={() => {
       logout();
       navigate("/login");
      }}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all duration-200"
     >
      <LogOut className="w-5 h-5" />
      Sign Out
     </button>
    </div>
   </aside>

   {/* Main Content */}
   <div className="flex-1 flex flex-col min-w-0">
    <header className="h-20 bg-white border-b border-[#eef0f2] flex items-center justify-between px-8 sticky top-0 z-10">
     <div className="flex items-center gap-4 flex-1">
      <div className="relative max-w-md w-full">
       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#adb5bd]" />
       <input 
        type="text" 
        placeholder="Search analytics, orders..." 
        className="w-full pl-10 pr-4 py-2 bg-[#f8f9fa] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#1a1a1a]/5 outline-none"
       />
      </div>
     </div>

     <div className="flex items-center gap-6">
      <button className="relative p-2 text-[#6c757d] hover:text-[#1a1a1a] transition-colors">
       <Bell className="w-5 h-5" />
       <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>
      <div className="h-8 w-[1px] bg-[#eef0f2]" />
      <div className="flex items-center gap-3">
       <div className="text-right hidden sm:block">
        <p className="text-sm font-bold text-[#1a1a1a] leading-tight">{user?.name}</p>
        <p className="text-[10px] font-semibold text-[#adb5bd] uppercase tracking-wider">Administrator</p>
       </div>
       <div className="w-10 h-10 bg-gradient-to-tr from-[#1a1a1a] to-[#4a4a4a] rounded-xl flex items-center justify-center text-white font-bold">
        {user?.name?.[0]}
       </div>
      </div>
     </div>
    </header>

    <main className="p-8">
     <Outlet />
    </main>
   </div>
  </div>
 );
}

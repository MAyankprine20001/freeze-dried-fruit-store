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
import { useAuth } from "../../context/AuthContext";
import { productApi } from "../../api/product.api";
import { toast } from "react-toastify";



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
 const { user } = useAuth();
 
 return (
  <div className="space-y-8">
   <div className="flex items-center justify-between">
    <div>
     <h1 className="text-2xl font-bold text-[#1a1a1a]">Good Morning, {user?.name?.split(" ")[0] || "Admin"}</h1>
     <p className="text-[#6c757d]">Here's what's happening with your store today.</p>
    </div>
    <button 
     onClick={async () => {
      const initialData = [
       {
        category: "Fruit Powders",
        name: "Strawberry Powder",
        subtitle: "FreezeFusion · 100g",
        price: 349,
        originalPrice: 449,
        rating: 4.8,
        reviews: 156,
        tag: "Vibrant",
        tagColor: "#e84444",
        badge: "🍓",
        accent: "#e84444",
        bg: "from-[#fff2f2] to-[#ffe0e0]",
        borderColor: "#f5c0c0",
        gradientFrom: "#e84444",
        gradientTo: "#c0392b",
        emoji: "🍓",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&fit=crop",
        path: "/fruit-powders",
        highlights: ["Smoothie Ready", "Baking Grade", "100% Pure"],
        weight: "100g",
        stock: "In Stock",
       },
       {
        category: "Fruit Powders",
        name: "Mango Powder",
        subtitle: "FreezeFusion · 100g",
        price: 379,
        originalPrice: 479,
        rating: 4.9,
        reviews: 189,
        tag: "Tropical",
        tagColor: "#f4a435",
        badge: "🥭",
        accent: "#f4a435",
        bg: "from-[#fffaee] to-[#fff0cc]",
        borderColor: "#f5e0a0",
        gradientFrom: "#f4a435",
        gradientTo: "#f39c12",
        emoji: "🥭",
        image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=600&fit=crop",
        path: "/fruit-powders",
        highlights: ["King of Fruits", "Natural Color", "Perfect Base"],
        weight: "100g",
        stock: "In Stock",
       },
       {
        category: "Fruit Chunks",
        name: "Strawberry Chunks",
        subtitle: "FreezeFusion · 150g",
        price: 329,
        originalPrice: 429,
        image: "https://images.unsplash.com/photo-1543528176-61b239494933?w=600&fit=crop",
        stock: "In Stock"
       }
      ];
      try {
       await productApi.seed(initialData);
       toast.success("Database seeded successfully!");
      } catch (err) {
       toast.error("Seeding failed");
      }
     }}
     className="px-6 py-3 bg-[#1a1a1a] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#1a1a1a]/10 hover:bg-[#2a2a2a] transition-all"
    >
     Seed Initial Data
    </button>
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

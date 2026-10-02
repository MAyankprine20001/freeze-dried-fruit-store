import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, User, Leaf, FlaskConical, Sparkles, Snowflake, Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useActiveOffer } from "../hooks/useActiveOffer";
import OfferBanner from "./OfferBanner";

const navLinks = [
 { label: "HOME", path: "/" },
 { label: "SHOP", path: "/products" },
 { label: "GIFT HAMPERS", path: "/gift-hampers" },
 { label: "OUR STORY", path: "/about" },
 { label: "BULK ORDERS", path: "/bulk-orders" },
 { label: "CONTACT", path: "/contact" },
];

const announcementItems = [
 { icon: Leaf, text: "100% Real Fruits" },
 { icon: FlaskConical, text: "No Preservatives" },
 { icon: Sparkles, text: "No Artificial Flavors" },
 { icon: Snowflake, text: "Freeze Dried to Lock Nutrition" },
 { icon: Heart, text: "Made in India" },
];

export default function Header() {
 const [scrolled, setScrolled] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
 const location = useLocation();
 const navigate = useNavigate();
 const { user, logout, isAdmin } = useAuth();
 const { totalItems } = useCart();
 const offer = useActiveOffer();

 useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 useEffect(() => {
  setMenuOpen(false);
  setShopDropdownOpen(false);
 }, [location.pathname]);

 useEffect(() => {
  document.body.style.overflow = menuOpen ? "hidden" : "";
  return () => {
   document.body.style.overflow = "";
  };
 }, [menuOpen]);

 return (
  <>
   {/* Announcement Bar */}
   <div className="fixed top-0 left-0 right-0 z-50 bg-[#1C2A18] text-[#F3EFE0] h-9 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold tracking-wider flex items-center overflow-hidden border-b border-white/5 select-none shadow-sm">
     {offer ? (
      <OfferBanner offer={offer} />
     ) : (
     <>
     {/* Desktop: Centered List */}
     <div className="hidden md:flex justify-center items-center gap-6 w-full whitespace-nowrap">
       {announcementItems.map((item, idx) => (
         <React.Fragment key={idx}>
           <span className="flex items-center gap-1.5">
             <item.icon className="w-3.5 h-3.5 text-[#B5C99A]" /> {item.text}
           </span>
           {idx < announcementItems.length - 1 && <span className="opacity-30">|</span>}
         </React.Fragment>
       ))}
     </div>

     {/* Mobile: Smooth Infinite Marquee */}
     <div className="md:hidden flex overflow-hidden whitespace-nowrap w-full">
       <motion.div
         className="flex items-center gap-4 shrink-0"
         animate={{ x: ["0%", "-50%"] }}
         transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
       >
         {[...announcementItems, ...announcementItems].map((item, idx) => (
           <React.Fragment key={idx}>
             <span className="flex items-center gap-1.5 shrink-0 text-[10px] font-semibold">
               <item.icon className="w-3 h-3 text-[#B5C99A]" /> {item.text}
             </span>
             <span className="opacity-30 text-[10px]">|</span>
           </React.Fragment>
         ))}
       </motion.div>
     </div>
     </>
     )}
   </div>

   <header
    className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 select-none ${scrolled
     ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#213B14]/10 py-1"
     : "bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#213B14]/5 py-2"
     }`}
   >
    {/* relative positioning added to the wrapper container */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
     <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
      {/* ── Logo ── */}
      <Link
       to="/"
       draggable={false}
       className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none rounded-lg select-none shrink-0"
       aria-label="The Dry Factory Home"
      >
       <img 
        src="/logo.png" 
        alt="The Dry Factory Logo" 
        draggable={false}
        className="h-10 sm:h-12 w-auto object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
       />
       <div className="flex flex-col items-start">
        <div className="flex items-center gap-1">
          <span className="font-serif text-lg sm:text-xl font-bold text-[#1C2A18] tracking-wider uppercase leading-tight">
            THE DRY <span className="font-serif italic font-normal text-[#3F622D]">FACTORY</span>
          </span>
        </div>
        <span className="text-[7.5px] sm:text-[8.5px] font-bold text-[#3F622D] uppercase tracking-[0.2em] leading-none">
          REAL TASTE. REAL NUTRITION.
        </span>
       </div>
      </Link>

      {/* ── Desktop Nav ── */}
      <nav
       className="hidden lg:flex items-center gap-6"
       aria-label="Primary navigation"
      >
       {navLinks.map(({ label, path }) => {
        const isActive = location.pathname === path;

        if (label === "SHOP") {
          return (
            <div
              key={path}
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                onClick={() => navigate("/products")}
                className={`relative px-1 py-2 text-[12px] font-bold tracking-wider transition-all duration-200 focus:outline-none flex items-center gap-1 ${
                  isActive ? "text-[#213B14]" : "text-[#213B14]/70 hover:text-[#213B14]"
                }`}
              >
                <span>{label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdownOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          );
        }

        return (
         <Link
          key={path}
          to={path}
          className={`relative px-1 py-2 text-[12px] font-bold tracking-wider transition-all duration-200 focus:outline-none group ${isActive
           ? "text-[#213B14]"
           : "text-[#213B14]/70 hover:text-[#213B14]"
           }`}
         >
          <span className="leading-none">{label}</span>
          {isActive ? (
           <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#213B14]" />
          ) : (
           <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#213B14] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          )}
         </Link>
        );
       })}
      </nav>

      {/* ── Icons & Actions ── */}
      <div className="hidden lg:flex items-center gap-4">
       <button
        onClick={() => navigate("/products")}
        className="p-2 text-[#213B14] hover:scale-105 transition-all duration-200 focus:outline-none"
        aria-label="Search Products"
       >
        <Search className="w-5 h-5 stroke-[1.75]" />
       </button>

       {user ? (
        <div className="flex items-center gap-3">
         <Link to="/profile" className="text-[#213B14] hover:text-[#3F622D] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 p-2">
          <User className="w-5 h-5 stroke-[1.75]" />
          <span>Hi, {user.name.split(' ')[0]}</span>
         </Link>
         {isAdmin && (
          <Link
           to="/admin"
           className="px-3.5 py-1.5 border border-[#213B14]/30 text-[#213B14] text-[10px] font-bold uppercase tracking-wider rounded-md hover:bg-[#213B14]/5 transition-all duration-200"
          >
           Admin
          </Link>
         )}
         <button
          onClick={logout}
          className="px-3 py-1.5 border border-[#213B14]/15 text-[#213B14]/75 text-[10px] font-bold uppercase tracking-wider rounded-md hover:bg-black/5 transition-all duration-200"
         >
          Logout
         </button>
        </div>
       ) : (
        <Link
         to="/login"
         className="p-2 text-[#213B14] hover:scale-105 transition-all duration-200 focus:outline-none"
         aria-label="User Login"
        >
         <User className="w-5 h-5 stroke-[1.75]" />
        </Link>
       )}

       <Link
        to="/cart"
        className="relative p-2 text-[#213B14] hover:scale-105 transition-all duration-200 focus:outline-none"
        aria-label="View Cart"
       >
        <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
        {totalItems > 0 && (
         <span className="absolute top-0 right-0 bg-[#213B14] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FAF7F2]">
          {totalItems}
         </span>
        )}
       </Link>
      </div>

      {/* ── Mobile Actions (Cart + Hamburger) ── */}
      <div className="lg:hidden flex items-center gap-2">
       {/* Mobile Cart Icon */}
       <Link
        to="/cart"
        className="relative p-2 text-[#213B14] hover:bg-[#213B14]/5 transition-all duration-200 rounded-lg focus:outline-none"
        aria-label="View Cart"
       >
        <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
        {totalItems > 0 && (
         <span className="absolute top-1 right-1 bg-[#213B14] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {totalItems > 9 ? '9+' : totalItems}
         </span>
        )}
       </Link>

       {/* Hamburger */}
       <button
        className="p-2 text-[#213B14] hover:bg-[#213B14]/5 transition-all duration-200 rounded-lg focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
       >
        {menuOpen ? (
         <X className="w-5 h-5 stroke-[1.75]" />
        ) : (
         <Menu className="w-5 h-5 stroke-[1.75]" />
        )}
       </button>
      </div>
     </div>

     {/* Dropdown panel absolute to the max-w-7xl internal wrapper (Left to Right) */}
     <AnimatePresence>
      {shopDropdownOpen && (
       <motion.div
        onMouseEnter={() => setShopDropdownOpen(true)}
        onMouseLeave={() => setShopDropdownOpen(false)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        className="absolute left-4 right-4 bg-[#FAF7F2] border border-[#213B14]/10 rounded-2xl shadow-xl p-6 grid grid-cols-3 gap-6 z-50 top-full mt-1"
       >
        {/* Fruits -> Crispy Bites */}
        <Link 
          to="/fruit-powder-chunks" 
          draggable={false}
          onClick={() => setShopDropdownOpen(false)}
          className="group block text-center space-y-3 p-4 hover:bg-[#EEF4EC] rounded-xl transition-all border border-transparent hover:border-[#2B4C1F]/15 select-none"
        >
         <div className="w-full h-32 rounded-xl overflow-hidden bg-[#EEF4EC] relative flex items-center justify-center pointer-events-none">
          <img src="/images/products/crispy-bites-mixed-fruit-front-400.webp" alt="Crispy Bites Mixed Fruit pack" draggable={false} className="w-auto h-[90%] object-contain group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none" />
         </div>
         <div className="space-y-0.5">
           <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#2B4C1F]/60 block">Freeze Dried Snacks</span>
           <h5 className="font-serif text-sm font-black tracking-wider text-[#2B4C1F]">CRISPY BITES</h5>
         </div>
        </Link>

        {/* Ice Creams -> SipReal */}
        <Link 
          to="/smoothie-premix" 
          draggable={false}
          onClick={() => setShopDropdownOpen(false)}
          className="group block text-center space-y-3 p-4 hover:bg-[#FCEAEB] rounded-xl transition-all border border-transparent hover:border-[#B82A5F]/15 select-none"
        >
         <div className="w-full h-32 rounded-xl overflow-hidden bg-[#FCEAEB] relative flex items-center justify-center pointer-events-none">
          <img src="/home_slip_real.png" alt="SipReal" draggable={false} className="w-auto h-[90%] object-contain group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none" />
         </div>
         <div className="space-y-0.5">
           <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#B82A5F]/60 block">Smoothie Premix</span>
           <h5 className="font-serif text-sm font-black tracking-wider text-[#B82A5F]">SIPREAL</h5>
         </div>
        </Link>

        {/* Candies -> Freeze Fusion */}
        <Link 
          to="/chocolate" 
          draggable={false}
          onClick={() => setShopDropdownOpen(false)}
          className="group block text-center space-y-3 p-4 hover:bg-[#F5ECE6] rounded-xl transition-all border border-transparent hover:border-[#4A2D1B]/15 select-none"
        >
         <div className="w-full h-32 rounded-xl overflow-hidden bg-[#F5ECE6] relative flex items-center justify-center pointer-events-none">
          <img src="/home_freexze_frozen.png" alt="Freeze Fusion" draggable={false} className="w-auto h-[90%] object-contain group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none" />
         </div>
         <div className="space-y-0.5">
           <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#4A2D1B]/60 block">Chocolates</span>
           <h5 className="font-serif text-sm font-black tracking-wider text-[#4A2D1B]">FREEZE FUSION</h5>
         </div>
        </Link>
       </motion.div>
      )}
     </AnimatePresence>
    </div>
   </header>

   {/* ── Mobile Menu ── */}
   <AnimatePresence>
    {menuOpen && (
     <>
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{ duration: 0.2 }}
       className="fixed inset-0 top-24 bg-black/40 z-40 lg:hidden"
       onClick={() => setMenuOpen(false)}
       aria-hidden="true"
      />
      <motion.div
       id="mobile-menu"
       initial={{ x: "100%" }}
       animate={{ x: 0 }}
       exit={{ x: "100%" }}
       transition={{ type: "spring", damping: 25, stiffness: 200 }}
       className="fixed top-24 right-0 bottom-0 w-72 z-50 shadow-2xl lg:hidden flex flex-col bg-[#FAF7F2] border-l border-[#213B14]/10"
       role="dialog"
       aria-modal="true"
       aria-label="Mobile navigation"
      >
       <nav
        className="flex flex-col p-6 gap-2 flex-1 overflow-y-auto"
        aria-label="Mobile navigation links"
       >
        {navLinks.map(({ label, path }) => {
         const isActive = location.pathname === path;
         if (label === "SHOP") {
          return (
           <div key={path} className="space-y-1">
            <Link
             to={path}
             onClick={() => setMenuOpen(false)}
             className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-all duration-200 ${isActive
              ? "bg-[#213B14]/5 text-[#213B14]"
              : "text-[#213B14]/70 hover:bg-[#213B14]/5 hover:text-[#213B14]"
              }`}
            >
             <span>{label}</span>
             <span className="text-[10px] font-semibold text-[#213B14]/40 uppercase tracking-widest">All</span>
            </Link>
            <div className="pl-3 pr-1 space-y-1">
             <Link
              to="/fruit-powder-chunks"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg text-xs font-bold text-[#2B4C1F] hover:bg-[#EEF4EC] transition-colors"
             >
              <span>Crispy Bites</span>
              <span className="text-[9px] font-semibold text-[#2B4C1F]/60 uppercase">Snacks</span>
             </Link>
             <Link
              to="/smoothie-premix"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg text-xs font-bold text-[#B82A5F] hover:bg-[#FCEAEB] transition-colors"
             >
              <span>SipReal</span>
              <span className="text-[9px] font-semibold text-[#B82A5F]/60 uppercase">Smoothie</span>
             </Link>
             <Link
              to="/chocolate"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between p-2 rounded-lg text-xs font-bold text-[#4A2D1B] hover:bg-[#F5ECE6] transition-colors"
             >
              <span>Freeze Fusion</span>
              <span className="text-[9px] font-semibold text-[#4A2D1B]/60 uppercase">Chocolates</span>
             </Link>
            </div>
           </div>
          );
         }
         return (
          <Link
           key={path}
           to={path}
           onClick={() => setMenuOpen(false)}
           className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-all duration-200 ${isActive
            ? "bg-[#213B14]/5 text-[#213B14]"
            : "text-[#213B14]/70 hover:bg-[#213B14]/5 hover:text-[#213B14]"
            }`}
          >
           <span>{label}</span>
          </Link>
         );
        })}
       </nav>

       <div className="p-6 border-t border-[#213B14]/10 space-y-3">
        {user ? (
         <>
          <Link
           to="/profile"
           onClick={() => setMenuOpen(false)}
           className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-[#213B14]/20 text-[#213B14] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#213B14]/5 transition-all"
          >
           Profile & Orders
          </Link>
          <button
           onClick={logout}
           className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-red-500/20 text-red-600 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-red-500/5 transition-all"
          >
           Logout
          </button>
         </>
        ) : (
         <>
          <Link
           to="/login"
           onClick={() => setMenuOpen(false)}
           className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-[#213B14]/20 text-[#213B14] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#213B14]/5 transition-all"
          >
           Login
          </Link>
          <Link
           to="/signup"
           onClick={() => setMenuOpen(false)}
           className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#3F622D] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#213B14] transition-all shadow-sm"
          >
           Sign Up
          </Link>
         </>
        )}
       </div>
      </motion.div>
     </>
    )}
   </AnimatePresence>
  </>
 );
}

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// ─── Thematic inline SVG icons ────────────────────────────────────────────────
// Each is a 20×20 viewBox SVG drawn in a clean line/outline style
// matching the aesthetic of food & organic product brand websites.

const IconHome = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9.5L10 3l7 6.5" />
    <path d="M5 8.5V17h4v-4h2v4h4V8.5" />
  </svg>
);

const IconAbout = ({ className }: { className?: string }) => (
  // Leaf / plant sprout — "About our nature"
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 17V9" />
    <path d="M10 9C10 9 6 8 5 4c3.5.5 5.5 2.5 5 5z" />
    <path d="M10 12c0 0 4-1 5-5-3.5.5-5.5 2.5-5 5z" />
    <path d="M7 17h6" />
  </svg>
);

const IconProducts = ({ className }: { className?: string }) => (
  // Shopping basket with fruit
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 5l-2 4h12l-2-4" />
    <path d="M4 9l1.5 7h9L16 9" />
    <circle cx="8" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
    <path d="M7 5c0-1.5 1-3 3-3s3 1.5 3 3" />
  </svg>
);

const IconFruitPowderChunks = ({ className }: { className?: string }) => (
  // Combined Jar and Fruit icon
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="8" width="7" height="8" rx="1.5" />
    <path d="M5.5 8V6.5C5.5 5.9 6 5.5 6.5 5.5h2c.5 0 1 .4 1 1V8" />
    <path d="M14 15c0 0-3-2-3-4.5 0-1.5 1-2.5 2-2.5.5 0 1 .3 1.5.7l.5.3.5-.3c.5-.4 1-.7 1.5-.7 1 0 2 1 2 2.5 0 2.5-3 4.5-3 4.5z" />
  </svg>
);

const IconChocolate = ({ className }: { className?: string }) => (
  // Chocolate bar with segments
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="14" height="10" rx="2" />
    <line x1="3" y1="10" x2="17" y2="10" />
    <line x1="8.5" y1="5" x2="8.5" y2="15" />
    <line x1="13.5" y1="5" x2="13.5" y2="15" />
  </svg>
);

const IconReviews = ({ className }: { className?: string }) => (
  // Star with small fruit leaf accent
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 12.8l-4.2 2.2.8-4.7L3.2 7l4.7-.7L10 2z" />
  </svg>
);

const IconFAQ = ({ className }: { className?: string }) => (
  // Speech bubble with question mark
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 3h12a1 1 0 011 1v8a1 1 0 01-1 1H7l-3 3V4a1 1 0 011-1z" />
    <path d="M10 6c0 0-1 0-1 1.5S10 9 10 9" />
    <circle cx="10" cy="11" r=".5" fill="currentColor" stroke="none" />
  </svg>
);

const IconBulk = ({ className }: { className?: string }) => (
  // Boxes stacked — "Bulk / wholesale"
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="10" width="6" height="6" rx="1" />
    <rect x="11" y="10" width="6" height="6" rx="1" />
    <rect x="7" y="4" width="6" height="6" rx="1" />
  </svg>
);

const IconBlog = ({ className }: { className?: string }) => (
  // Newspaper / article icon
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h12v12H4z" />
    <path d="M7 7h6" />
    <path d="M7 10h6" />
    <path d="M7 13h4" />
  </svg>
);

const IconSmoothie = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 3l-1.5 2" />
    <path d="M6 5h8v2H6z" />
    <path d="M6.5 7L5.5 17h9l-1-10" />
    <path d="M10 7v4" />
  </svg>
);

const IconCombos = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="8" width="12" height="8" rx="1" />
    <path d="M3 5h14v3H3z" />
    <path d="M10 5v11" />
  </svg>
);

// ─── Nav config ───────────────────────────────────────────────────────────────

const IconContact = ({ className }: { className?: string }) => (
  // Envelope with leaf detail
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="16" height="11" rx="1.5" />
    <path d="M2 6l8 6 8-6" />
  </svg>
);

const navLinks = [
  { label: "HOME", path: "/", Icon: IconHome },
  { label: "ABOUT", path: "/about", Icon: IconAbout },
  { label: "PRODUCTS", path: "/products", Icon: IconProducts },
  { label: "BULK ORDERS", path: "/bulk-orders", Icon: IconBulk },
  { label: "BLOG", path: "/blog", Icon: IconBlog },
  { label: "FAQ", path: "/faq", Icon: IconFAQ },
];


// ─── Component ────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-black/95 backdrop-blur-md shadow-sm border-b border-[#D4AF37]/20"
          : "bg-black/70 backdrop-blur-md"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg"
              aria-label="Freeze Fruit Home"
            >
              <img
                src="https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/logo_2_on76wp.png"
                alt=""
                className="w-24 h-24 object-contain"
              />
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                The Dry<span className="text-[#D4AF37]"> Factory</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Primary navigation"
            >
              {navLinks.map(({ label, path, Icon, badge }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`relative inline-flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-[11px] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] group ${isActive
                      ? "text-[#D4AF37] bg-white/5"
                      : "text-white/70 hover:text-[#D4AF37] hover:bg-white/5"
                      }`}
                  >
                    {badge && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#f4a435] rounded-full shadow-sm" />
                    )}
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors duration-200 ${isActive
                         ? "text-[#D4AF37]"
                        : "text-white/40 group-hover:text-[#D4AF37]"
                        }`}
                    />
                    <span className="leading-none">{label}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#D4AF37] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── CTA & Actions ── */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/cart"
                className="relative p-2.5 bg-white/5 text-[#D4AF37] rounded-full hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1a1a1a] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </Link>


              
              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="text-white/80 hover:text-[#D4AF37] text-sm font-medium transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/5">
                    Hi, {user.name.split(' ')[0]}
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider rounded-full hover:bg-[#D4AF37]/10 transition-all duration-200"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="px-4 py-2 border border-white/10 text-white text-[11px] font-bold uppercase tracking-wider rounded-full hover:bg-white/5 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-white/70 text-sm font-semibold hover:text-[#D4AF37] transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 bg-[#D4AF37] text-black text-sm font-semibold rounded-full hover:bg-[#BF953F] hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* ── Mobile Actions (Cart + Hamburger) ── */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2 rounded-lg text-[#D4AF37] hover:bg-white/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Hamburger */}
              <button
                className="p-2 rounded-lg text-white/70 hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
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
              className="fixed inset-0 top-16 bg-black/30 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-72 z-50 shadow-2xl lg:hidden flex flex-col bg-black border-l border-white/10"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <nav
                className="flex flex-col p-4 gap-1 flex-1"
                aria-label="Mobile navigation links"
              >
                {navLinks.map(({ label, path, Icon, badge }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link
                      key={path}
                      to={path}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${isActive
                        ? "bg-white/5 text-[#D4AF37] font-semibold"
                        : "text-white/70 hover:bg-white/5 hover:text-[#D4AF37]"
                        }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${isActive ? "bg-[#D4AF37]" : "bg-white/10"
                          }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${isActive ? "text-black" : "text-[#D4AF37]"}`}
                        />
                      </span>
                      <span>{label}</span>
                      {badge && (
                        <span className="absolute top-3.5 right-4 w-2 h-2 bg-[#f4a435] rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-5 border-t border-white/10 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-white/10 text-white text-sm font-semibold rounded-full hover:bg-white/5 transition-all duration-200"
                    >
                      Profile & Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-red-500/20 text-red-400 text-sm font-semibold rounded-full hover:bg-red-500/10 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-white/10 text-white text-sm font-semibold rounded-full hover:bg-white/5 transition-all duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#D4AF37] text-black text-sm font-semibold rounded-full hover:bg-[#BF953F] transition-all duration-200"
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

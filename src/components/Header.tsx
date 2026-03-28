import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Fruit Powder", path: "/fruit-powder" },
  { label: "Fruit Chunks", path: "/fruit-chunks" },
  { label: "Chocolate", path: "/chocolate" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
  { label: "Products", path: "/products" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e8d5c4]/40"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] rounded-lg"
            aria-label="FrostFruit Home"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#e85d26] to-[#f4a435] rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-[#1a1a1a] tracking-tight">
              Frost<span className="text-[#e85d26]">Fruit</span>
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] group ${
                    isActive
                      ? "text-[#e85d26]"
                      : "text-[#4a4a4a] hover:text-[#e85d26]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-0.5 bg-[#e85d26] rounded-full transition-all duration-200 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-60"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-[#e85d26] text-white text-sm font-semibold rounded-full hover:bg-[#d44f1a] hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] focus-visible:ring-offset-2 shadow-sm"
            >
              Get in Touch
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-[#4a4a4a] hover:text-[#e85d26] hover:bg-[#fdf3ec] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

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
              className="fixed top-16 right-0 bottom-0 w-72 bg-white z-50 shadow-2xl lg:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <nav
                className="flex flex-col p-6 gap-1 flex-1"
                aria-label="Mobile navigation links"
              >
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] ${
                        isActive
                          ? "bg-[#fdf3ec] text-[#e85d26] font-semibold"
                          : "text-[#4a4a4a] hover:bg-[#fdf3ec] hover:text-[#e85d26]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-6 border-t border-[#f0e8e0]">
                <Link
                  to="/contact"
                  className="block w-full text-center px-5 py-3 bg-[#e85d26] text-white text-sm font-semibold rounded-full hover:bg-[#d44f1a] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26]"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

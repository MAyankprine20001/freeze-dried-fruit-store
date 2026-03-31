import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const IconFruitPowder = ({ className }: { className?: string }) => (
  // Jar / powder container with sparkle
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="7" width="10" height="10" rx="2" />
    <path d="M7 7V5.5C7 4.7 7.7 4 8.5 4h3c.8 0 1.5.7 1.5 1.5V7" />
    <path d="M8 11h4" />
    <path d="M10 9v4" />
    {/* sparkle dots suggesting powder */}
    <circle cx="4" cy="4" r=".6" fill="currentColor" stroke="none" />
    <circle cx="16" cy="3" r=".6" fill="currentColor" stroke="none" />
    <circle cx="15" cy="5.5" r=".5" fill="currentColor" stroke="none" />
    <circle cx="5" cy="6" r=".5" fill="currentColor" stroke="none" />
  </svg>
);

const IconFruitChunks = ({ className }: { className?: string }) => (
  // Strawberry silhouette
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 17C10 17 4 13.5 4 9c0-2.5 1.5-4 3-4 .8 0 1.6.4 2.2 1 .3.3.5.6.8.6s.5-.3.8-.6C11.4 5.4 12.2 5 13 5c1.5 0 3 1.5 3 4 0 4.5-6 8-6 8z" />
    <path d="M8 5c0 0-.5-2 .5-3" />
    <path d="M10 5c0 0 0-2 1-3" />
    <path d="M12 5c0 0 .5-2-.5-3" />
    {/* seed dots */}
    <circle cx="9" cy="10" r=".5" fill="currentColor" stroke="none" />
    <circle cx="11" cy="9" r=".5" fill="currentColor" stroke="none" />
    <circle cx="10" cy="12" r=".5" fill="currentColor" stroke="none" />
    <circle cx="8" cy="12" r=".5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r=".5" fill="currentColor" stroke="none" />
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

// ─── Nav config ───────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", path: "/", Icon: IconHome },
  { label: "About", path: "/about", Icon: IconAbout },
  { label: "Products", path: "/products", Icon: IconProducts },
  { label: "Fruit Powder", path: "/fruit-powder", Icon: IconFruitPowder },
  { label: "Fruit Chunks", path: "/fruit-chunks", Icon: IconFruitChunks },
  { label: "Chocolate", path: "/chocolate", Icon: IconChocolate },
  { label: "Reviews", path: "/reviews", Icon: IconReviews, badge: true },
  { label: "FAQ", path: "/faq", Icon: IconFAQ },
  { label: "Contact", path: "/contact", Icon: IconContact },
];

// ─── Component ────────────────────────────────────────────────────────────────

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e8d5c4]/40"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] rounded-lg"
              aria-label="FrostFruit Home"
            >
              <img
                src="/logo2.jpeg"
                alt=""
                className="w-16 h-16 object-contain"
              />
              <span className="font-serif text-xl font-bold text-[#1a1a1a] tracking-tight">
                The Dry<span className="text-[#e85d26]"> Factory</span>
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
                    className={`relative inline-flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-[11px] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] group ${
                      isActive
                        ? "text-[#e85d26] bg-[#fdf3ec]"
                        : "text-[#5a5a5a] hover:text-[#e85d26] hover:bg-[#fdf3ec]"
                    }`}
                  >
                    {badge && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#f4a435] rounded-full shadow-sm" />
                    )}
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors duration-200 ${
                        isActive
                          ? "text-[#e85d26]"
                          : "text-[#9a8a7a] group-hover:text-[#e85d26]"
                      }`}
                    />
                    <span className="leading-none">{label}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#e85d26] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── CTA ── */}
            <div className="hidden lg:flex items-center">
              <Link
                to="/contact"
                className="px-5 py-2.5 bg-[#e85d26] text-white text-sm font-semibold rounded-full hover:bg-[#d44f1a] hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] focus-visible:ring-offset-2 shadow-sm"
              >
                Get in Touch
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
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
              className="fixed top-16 right-0 bottom-0 w-72 z-50 shadow-2xl lg:hidden flex flex-col bg-white"
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
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85d26] ${
                        isActive
                          ? "bg-[#fdf3ec] text-[#e85d26] font-semibold"
                          : "text-[#4a4a4a] hover:bg-[#fdf3ec] hover:text-[#e85d26]"
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                          isActive ? "bg-[#e85d26]" : "bg-[#f5ede5]"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${isActive ? "text-white" : "text-[#e85d26]"}`}
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

              <div className="p-5 border-t border-[#f0e8e0]">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#e85d26] text-white text-sm font-semibold rounded-full hover:bg-[#d44f1a] transition-all duration-200"
                >
                  <IconContact className="w-4 h-4" />
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

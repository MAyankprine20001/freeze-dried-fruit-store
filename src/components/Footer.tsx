import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin, Mail, Phone, Globe, Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] text-[#213B14] border-t border-[#213B14]/10 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex flex-col items-start gap-0.5 group focus:outline-none">
              <div className="flex items-center gap-1">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#1C2A18] tracking-wider uppercase">
                  THE DRY <span className="font-serif italic font-normal text-[#3F622D]">FACTORY</span>
                </span>
                <Leaf className="w-4 h-4 text-[#3F622D] -rotate-12 fill-[#3F622D]/10 shrink-0" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#3F622D] uppercase tracking-[0.2em] leading-none">
                REAL TASTE. REAL NUTRITION.
              </span>
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
              We bring you premium freeze dried goodness that lets you snack smart and live better.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/thedryfactoryofficial/?hl=en" },
                { icon: Facebook, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  className="w-8 h-8 rounded-full border border-[#213B14]/15 flex items-center justify-center text-[#213B14]/75 hover:bg-[#213B14] hover:text-white transition-all duration-200"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#3F622D] mb-4">
              SHOP
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-gray-500">
              <li><Link to="/smoothie-premix" className="hover:text-[#213B14] transition-colors">SipReal Premix Smoothie</Link></li>
              <li><Link to="/chocolate" className="hover:text-[#213B14] transition-colors">Freeze Fusion Chocolates</Link></li>
              <li><Link to="/fruit-powder-chunks" className="hover:text-[#213B14] transition-colors">Crispy Bites Snacks</Link></li>
              <li><Link to="/products" className="hover:text-[#213B14] transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#3F622D] mb-4">
              HELP
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-gray-500">
              <li><Link to="/faq" className="hover:text-[#213B14] transition-colors">FAQs</Link></li>
              <li><a href="#" className="hover:text-[#213B14] transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-[#213B14] transition-colors">Returns & Refunds</a></li>
              <li><Link to="/terms" className="hover:text-[#213B14] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#3F622D] mb-4">
              COMPANY
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-gray-500">
              <li><Link to="/about" className="hover:text-[#213B14] transition-colors">Our Story</Link></li>
              <li><a href="#" className="hover:text-[#213B14] transition-colors">Why Freeze Dried?</a></li>
              <li><Link to="/blog" className="hover:text-[#213B14] transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-[#213B14] transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="mt-16 pt-8 border-t border-[#213B14]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-semibold text-gray-400">
          <p>© 2026 The Dry Factory. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-[#3F622D]" /> thedryfactory.com</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#3F622D]" /> hello@thedryfactory.com</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#3F622D]" /> +91 7567350328</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin, Mail, Phone, Globe, Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#161616] text-[#FAF7F2] border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Info Column */}
          <div className="lg:col-span-3 space-y-6">
            <Link to="/" className="flex flex-col items-start gap-0.5 group focus:outline-none">
              <div className="flex items-center gap-1">
                <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-wider uppercase">
                  THE DRY <span className="font-serif italic font-normal text-[#B5C99A]">FACTORY</span>
                </span>
                <Leaf className="w-4 h-4 text-[#B5C99A] -rotate-12 fill-[#B5C99A]/10 shrink-0" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#B5C99A] uppercase tracking-[0.2em] leading-none">
                REAL TASTE. REAL NUTRITION.
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              We craft premium freeze-dried goodness that lets you snack smart and live better.
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
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#FAF7F2] hover:text-[#161616] transition-all duration-200"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D6C5A0] mb-4">
              SHOP
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-gray-400">
              <li><Link to="/smoothie-premix" className="hover:text-white transition-colors">SipReal Premix Smoothie</Link></li>
              <li><Link to="/chocolate" className="hover:text-white transition-colors">Freeze Fusion Chocolates</Link></li>
              <li><Link to="/fruit-powder-chunks" className="hover:text-white transition-colors">Crispy Bites Snacks</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D6C5A0] mb-4">
              HELP
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D6C5A0] mb-4">
              COMPANY
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Why Freeze Dried?</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter / Stay Updated Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D6C5A0] mb-4">
              STAY UPDATED
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Get exclusive offers, new launches & healthy tips straight to your inbox.
            </p>
            <div className="flex w-full items-center bg-white rounded-lg overflow-hidden p-1 max-w-[280px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-1.5 text-xs text-[#213B14] bg-transparent border-none outline-none placeholder-gray-400"
              />
              <button className="bg-[#E4B34F] hover:bg-[#D4A13F] text-[#213B14] text-[10px] font-black tracking-widest px-4 py-2 rounded-md uppercase transition-colors shrink-0">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-semibold text-gray-500">
          <p>© 2024 The Dry Factory. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-[#B5C99A]" /> thedryfactory.com</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#B5C99A]" /> hello@thedryfactory.com</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#B5C99A]" /> +91 7567350328</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

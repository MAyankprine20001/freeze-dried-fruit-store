import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Linkedin } from "lucide-react";

const productLinks = [
  { label: "Smoothie Premix", path: "/smoothie-premix" },
  { label: "Chocolates", path: "/chocolate" },
  { label: "Combos", path: "/combos" },
  { label: "Fruit Chunks & Powders", path: "/fruit-powder-chunks" },
];

const supportLinks = [
  { label: "Blog", path: "/blog" },
  { label: "Reviews", path: "/reviews" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/thedryfactoryofficial/?hl=en",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://youtube.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 mb-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg"
            >
              <img
                src="https://res.cloudinary.com/doi7id29n/image/upload/q_auto/f_auto/v1776528652/logo_2_on76wp.png"
                alt=""
                className="w-12 h-12 object-contain"
              />
              <span className="font-serif text-xl font-bold">
                The Dry<span className="text-[#D4AF37]"> Factory</span>
              </span>
            </Link>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
              Real Fruit. Real Taste. Naturally Crafted
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#a0a0a0] hover:bg-[#D4AF37] hover:text-black transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <Link to="/products" className="inline-block group/title">
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 group-hover/title:text-[#D4AF37] transition-colors duration-200">
                Products
              </h3>
            </Link>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#a0a0a0] text-sm hover:text-[#D4AF37] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#a0a0a0] text-sm hover:text-[#D4AF37] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Trust Badges
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "No Preservatives",
                "100% Natural",
              ].map((badge) => (
                <div
                  key={badge}
                  className="px-2 py-2 bg-white/5 border border-white/10 rounded-lg text-center text-xs text-[#a0a0a0] font-medium"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#606060] text-xs">
            © 2026 Freeze Fruit. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[#606060] text-xs hover:text-[#D4AF37] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

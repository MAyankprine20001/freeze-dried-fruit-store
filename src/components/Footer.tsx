import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const productLinks = [
  { label: "Fruit Powder", path: "/fruit-powder" },
  { label: "Fruit Chunks", path: "/fruit-chunks" },
  { label: "Chocolate", path: "/chocolate" },
];

const companyLinks = [
  { label: "About Us", path: "/about" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 mb-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a435] rounded-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#e85d26] to-[#f4a435] rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-bold">
                The Dry<span className="text-white"> Factory</span>
              </span>
            </Link>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
              Nature's best, locked in at peak freshness. Pure fruit. Zero
              compromise.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#a0a0a0] hover:bg-[#e85d26] hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a435]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#a0a0a0] text-sm hover:text-[#f4a435] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a435] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#a0a0a0] text-sm hover:text-[#f4a435] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a435] rounded"
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
                "Non-GMO",
                "Gluten Free",
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
            © 2026 FrostFruit. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[#606060] text-xs hover:text-[#a0a0a0] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a435] rounded"
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

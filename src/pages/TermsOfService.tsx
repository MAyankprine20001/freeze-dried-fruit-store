import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  ShoppingCart,
  RefreshCw,
  AlertTriangle,
  Scale,
  Globe,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Leaf,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const lastUpdated = "March 28, 2026";

const tocItems = [
  { id: "acceptance", label: "Acceptance of Terms", icon: FileText },
  { id: "products", label: "Products & Orders", icon: ShoppingCart },
  { id: "returns", label: "Returns & Refunds", icon: RefreshCw },
  { id: "conduct", label: "User Conduct", icon: AlertTriangle },
  { id: "liability", label: "Limitation of Liability", icon: Scale },
  { id: "intellectual", label: "Intellectual Property", icon: Globe },
  { id: "disputes", label: "Disputes & Governing Law", icon: MessageSquare },
];

const sections = [
  {
    id: "acceptance",
    icon: FileText,
    color: "#e85d26",
    title: "Acceptance of Terms",
    highlight:
      "By accessing our website or purchasing our products, you agree to these Terms of Service.",
    content: [
      {
        subtitle: "Agreement to Terms",
        text: 'These Terms of Service ("Terms") govern your access to and use of the FrostFruit website (frostfruit.com) and purchase of our products. By browsing the website, placing an order, or creating an account, you confirm that you have read, understood, and agree to be bound by these Terms.',
      },
      {
        subtitle: "Eligibility",
        text: "You must be at least 18 years of age to place an order on our website. By using our services, you represent and warrant that you meet this requirement. If you are under 18, you may only use our website under the supervision of a parent or legal guardian.",
      },
      {
        subtitle: "Changes to Terms",
        text: "FrostFruit reserves the right to modify these Terms at any time. We will provide notice of significant changes via email or a banner on our website. Your continued use of our services after the effective date of changes constitutes your acceptance of the revised Terms.",
      },
    ],
  },
  {
    id: "products",
    icon: ShoppingCart,
    color: "#f4a435",
    title: "Products & Orders",
    highlight:
      "All prices are in Indian Rupees (₹) and inclusive of applicable taxes unless stated otherwise.",
    content: [
      {
        subtitle: "Product Descriptions",
        text: "We make every effort to accurately describe our products, including ingredients, weights, and nutritional information. However, we do not warrant that product descriptions, images, or other content are completely accurate, complete, or error-free. Product packaging may vary from images shown.",
      },
      {
        subtitle: "Pricing",
        text: "All prices are listed in Indian Rupees (₹) and are inclusive of GST unless explicitly stated otherwise. We reserve the right to modify prices at any time without prior notice. Prices at the time of order placement are the prices charged.",
      },
      {
        subtitle: "Order Acceptance",
        text: "Placing an order constitutes an offer to purchase. Your order is accepted when we send you a confirmation email. We reserve the right to refuse or cancel any order for reasons including product unavailability, errors in product information or pricing, or suspected fraudulent activity.",
      },
      {
        subtitle: "Delivery",
        text: "We ship pan-India. Estimated delivery times are 3–7 business days depending on your location. Free shipping is available on orders above ₹499. We are not responsible for delays caused by courier partners, natural events, or circumstances beyond our control.",
      },
      {
        subtitle: "Out of Stock",
        text: "If a product you have ordered is out of stock, we will notify you promptly and offer a full refund, a substitute product, or the option to wait until the product is restocked.",
      },
    ],
  },
  {
    id: "returns",
    icon: RefreshCw,
    color: "#27ae60",
    title: "Returns & Refunds",
    highlight:
      "We offer a 7-day return window on all products from the date of delivery.",
    content: [
      {
        subtitle: "Return Eligibility",
        text: "Products may be returned within 7 days of delivery if they are unused, in original sealed packaging, and accompanied by proof of purchase. Due to the nature of food products, we cannot accept returns of opened or partially consumed items unless they are defective.",
      },
      {
        subtitle: "Damaged or Defective Products",
        text: "If your order arrives damaged, defective, or incorrect, please contact us within 48 hours of delivery with photographs of the item and packaging. We will arrange a free replacement or issue a full refund at your discretion.",
      },
      {
        subtitle: "Refund Process",
        text: "Approved refunds are processed within 5–7 business days of us receiving the returned product. Refunds are credited to the original payment method. Shipping charges are non-refundable unless the return is due to our error.",
      },
      {
        subtitle: "How to Initiate a Return",
        text: "To initiate a return, email us at returns@frostfruit.com with your order number, reason for return, and supporting photographs (if applicable). Our team will guide you through the process.",
      },
    ],
  },
  {
    id: "conduct",
    icon: AlertTriangle,
    color: "#e84444",
    title: "User Conduct",
    highlight:
      "Our platform must be used lawfully and respectfully. Misuse may result in account termination.",
    content: [
      {
        subtitle: "Prohibited Activities",
        text: "You agree not to: use our website for any unlawful purpose; attempt to gain unauthorised access to our systems; transmit spam, viruses, or malicious code; scrape or copy content from our website without permission; impersonate any person or entity; or engage in any activity that disrupts or interferes with our services.",
      },
      {
        subtitle: "User-Generated Content",
        text: "If you submit reviews, comments, or other content to our website, you grant FrostFruit a non-exclusive, royalty-free licence to use, reproduce, and display such content. You are solely responsible for the accuracy and legality of content you submit.",
      },
      {
        subtitle: "Account Termination",
        text: "We reserve the right to suspend or terminate your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.",
      },
    ],
  },
  {
    id: "liability",
    icon: Scale,
    color: "#6c5ce7",
    title: "Limitation of Liability",
    highlight:
      "Our liability is limited to the value of the order in question.",
    content: [
      {
        subtitle: "Disclaimer of Warranties",
        text: 'Our website and products are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.',
      },
      {
        subtitle: "Limitation of Liability",
        text: "To the maximum extent permitted by applicable law, FrostFruit shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or website. Our total liability for any claim arising out of or relating to these Terms shall not exceed the amount you paid for the order in question.",
      },
      {
        subtitle: "Allergen Disclaimer",
        text: "Our products are made in a facility that may process tree nuts, peanuts, dairy, gluten, and soy. While we maintain high hygiene standards, we cannot guarantee the complete absence of cross-contamination. Customers with severe allergies should consult a medical professional before consuming our products.",
      },
      {
        subtitle: "Health Claims",
        text: "Nothing on our website constitutes medical advice. Nutritional information is provided for general guidance only. Our products are not intended to diagnose, treat, cure, or prevent any disease.",
      },
    ],
  },
  {
    id: "intellectual",
    icon: Globe,
    color: "#e85d26",
    title: "Intellectual Property",
    highlight:
      "All content on this website is the property of FrostFruit and protected by copyright law.",
    content: [
      {
        subtitle: "Ownership",
        text: "All content on the FrostFruit website — including text, graphics, logos, images, product descriptions, and software — is the exclusive property of FrostFruit or its content suppliers and is protected by Indian and international copyright, trademark, and other intellectual property laws.",
      },
      {
        subtitle: "Limited Licence",
        text: "We grant you a limited, non-exclusive, non-transferable licence to access and use our website for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content without our express written permission.",
      },
      {
        subtitle: "Trademarks",
        text: '"FrostFruit" and our logo are trademarks of FrostFruit. You may not use our trademarks in connection with any product or service without our prior written consent.',
      },
    ],
  },
  {
    id: "disputes",
    icon: MessageSquare,
    color: "#f4a435",
    title: "Disputes & Governing Law",
    highlight:
      "These Terms are governed by the laws of India. Disputes shall be resolved in Mumbai courts.",
    content: [
      {
        subtitle: "Governing Law",
        text: "These Terms shall be governed by and construed in accordance with the laws of the Republic of India, without regard to its conflict of law provisions.",
      },
      {
        subtitle: "Dispute Resolution",
        text: "In the event of a dispute, we encourage you to first contact us directly at legal@frostfruit.com so we can attempt to resolve the matter amicably. If resolution cannot be reached informally, the dispute shall be submitted to arbitration under the Arbitration and Conciliation Act, 1996.",
      },
      {
        subtitle: "Jurisdiction",
        text: "For matters not subject to arbitration, you agree to submit to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra, India.",
      },
      {
        subtitle: "Consumer Rights",
        text: "Nothing in these Terms limits your statutory rights under the Consumer Protection Act, 2019 (India) or any other applicable consumer protection legislation.",
      },
    ],
  },
];

// ─── Accordion Section ────────────────────────────────────────────────────────

function Section({
  section,
  index,
}: {
  section: (typeof sections)[0];
  index: number;
}) {
  const [open, setOpen] = useState(true);
  const Icon = section.icon;

  return (
    <motion.div
      id={section.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="rounded-2xl border border-[#ede5dc] overflow-hidden bg-white shadow-sm"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#fdf8f5] transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: `${section.color}15`,
              border: `1px solid ${section.color}25`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: section.color }} />
          </div>
          <h2 className="font-serif text-lg font-bold text-[#1a1a1a]">
            {section.title}
          </h2>
        </div>
        <ChevronDown
          className="w-5 h-5 text-[#9a8a7a] transition-transform duration-300 flex-shrink-0"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-[#f0e8de]">
          {/* Highlight box */}
          <div
            className="mt-4 mb-5 px-4 py-3 rounded-xl text-sm font-semibold"
            style={{
              backgroundColor: `${section.color}10`,
              borderLeft: `3px solid ${section.color}`,
              color: section.color,
            }}
          >
            {section.highlight}
          </div>

          <div className="space-y-5">
            {section.content.map((item, i) => (
              <div key={i}>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-1.5 flex items-center gap-2">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: section.color }}
                  />
                  {item.subtitle}
                </h3>
                <p className="text-[#5a4a3a] text-sm leading-relaxed pl-3.5">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 px-6 lg:px-8 bg-white border-b border-[#ede5dc]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1a1a1a] to-[#4a3a2a] rounded-xl flex items-center justify-center shadow-sm">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-[#1a1a1a]/30 to-transparent" />
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#fdf3ec] text-[#e85d26] text-xs font-bold uppercase tracking-widest rounded-full border border-[#f0d9c8] mb-4">
              <Leaf className="w-3 h-3" /> Legal
            </span>

            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4 leading-tight">
              Terms of Service
            </h1>
            <p className="text-[#6a5a4a] text-base leading-relaxed max-w-2xl mb-4">
              These terms explain the rules and conditions that apply when you
              shop with FrostFruit or use our website. Please read them
              carefully before placing an order.
            </p>
            <p className="text-xs text-[#9a8a7a] font-medium">
              Last updated:{" "}
              <span className="text-[#4a3a2a] font-semibold">
                {lastUpdated}
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sticky TOC */}
          <aside className="lg:w-64 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:sticky lg:top-28"
            >
              <div className="bg-white rounded-2xl border border-[#ede5dc] p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-[#9a8a7a] mb-4">
                  Contents
                </p>
                <nav className="space-y-1">
                  {tocItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#6a5a4a] hover:bg-[#fdf3ec] hover:text-[#e85d26] transition-all duration-200 group"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#c0a898] group-hover:text-[#e85d26] transition-colors" />
                        {item.label}
                        <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-5 pt-5 border-t border-[#f0e8de]">
                  <p className="text-xs text-[#9a8a7a] mb-1">Also see:</p>
                  <Link
                    to="/privacy"
                    className="flex items-center gap-2 text-xs font-semibold text-[#e85d26] hover:underline mb-3"
                  >
                    <ChevronRight className="w-3 h-3" /> Privacy Policy
                  </Link>
                  <Link
                    to="/contact"
                    className="block text-center px-4 py-2.5 bg-[#1a1a1a] text-white text-xs font-bold rounded-xl hover:bg-[#2c1a0e] transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Quick Summary Card */}
              <div className="mt-4 bg-gradient-to-br from-[#fdf3ec] to-[#fff7f2] rounded-2xl border border-[#f0d9c8] p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#e85d26] mb-3">
                  Quick Summary
                </p>
                <ul className="space-y-2">
                  {[
                    "7-day returns window",
                    "Free ship above ₹499",
                    "No hidden fees",
                    "Secure payments",
                    "Indian law governs",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-[#5a4a3a] font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e85d26] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </aside>

          {/* Sections */}
          <main className="flex-1 space-y-4">
            {/* Intro note */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-4 p-5 bg-[#1a1a1a] rounded-2xl"
            >
              <FileText className="w-5 h-5 text-[#f4a435] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white/80 leading-relaxed">
                <strong className="text-[#f4a435]">
                  Plain English summary:
                </strong>{" "}
                Buy from us, enjoy great freeze-dried products, and if anything
                is wrong we'll make it right. These terms protect both you and
                us, and they are governed by Indian law.
              </p>
            </motion.div>

            {sections.map((section, i) => (
              <Section key={section.id} section={section} index={i} />
            ))}

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white rounded-2xl border border-[#ede5dc] text-center"
            >
              <p className="text-[#6a5a4a] text-sm leading-relaxed mb-3">
                If you have any questions about these Terms, please don't
                hesitate to reach out. We're humans, not lawyers, and we're
                happy to explain anything in plain language.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e85d26] text-white text-sm font-bold rounded-full hover:bg-[#d44f1a] transition-colors duration-200"
              >
                Get in Touch
              </Link>
              <p className="text-[#9a8a7a] text-xs font-medium mt-4">
                © 2026 FrostFruit. All rights reserved.
              </p>
            </motion.div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

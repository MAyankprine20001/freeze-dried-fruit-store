import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
 Shield,
 Lock,
 Eye,
 Database,
 Bell,
 UserCheck,
 Mail,
 ChevronDown,
 ChevronRight,
 Leaf,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const lastUpdated = "March 28, 2026";

const tocItems = [
 { id: "information", label: "Information We Collect", icon: Database },
 { id: "usage", label: "How We Use Your Information", icon: Eye },
 { id: "sharing", label: "Sharing of Information", icon: UserCheck },
 { id: "security", label: "Data Security", icon: Lock },
 { id: "cookies", label: "Cookies & Tracking", icon: Bell },
 { id: "rights", label: "Your Rights", icon: Shield },
 { id: "contact", label: "Contact Us", icon: Mail },
];

const sections = [
 {
  id: "information",
  icon: Database,
  color: "#e85d26",
  title: "Information We Collect",
  content: [
   {
    subtitle: "Information You Provide",
    text: "When you place an order, create an account, or contact us, we collect personal information such as your name, email address, phone number, shipping address, and payment details. We also collect any messages or feedback you send us directly.",
   },
   {
    subtitle: "Information Collected Automatically",
    text: "When you visit our website, we automatically collect certain information about your device and browsing behavior, including your IP address, browser type, operating system, referring URLs, pages viewed, and the date and time of your visit.",
   },
   {
    subtitle: "Information from Third Parties",
    text: "We may receive information about you from third-party services such as payment processors, shipping partners, and analytics providers that help us operate our business.",
   },
  ],
 },
 {
  id: "usage",
  icon: Eye,
  color: "#f4a435",
  title: "How We Use Your Information",
  content: [
   {
    subtitle: "Order Fulfilment",
    text: "We use your personal information to process and deliver your orders, send order confirmations and shipping updates, handle returns and refunds, and provide customer support.",
   },
   {
    subtitle: "Communication",
    text: 'With your consent, we may send you promotional emails about new products, offers, and updates. You can opt out of marketing communications at any time by clicking the "Unsubscribe" link in any email.',
   },
   {
    subtitle: "Improving Our Services",
    text: "We use aggregated and anonymised data to understand how customers use our website, identify areas for improvement, conduct research, and develop new products and features.",
   },
   {
    subtitle: "Legal Compliance",
    text: "We may use your information to comply with applicable laws and regulations, respond to lawful requests from public authorities, and protect our legal rights.",
   },
  ],
 },
 {
  id: "sharing",
  icon: UserCheck,
  color: "#27ae60",
  title: "Sharing of Information",
  content: [
   {
    subtitle: "Service Providers",
    text: "We share your information with trusted third-party service providers who assist us in operating our website and business including payment processors (Razorpay, Stripe), shipping carriers, email service providers, and cloud hosting services. These parties are contractually obligated to keep your information confidential.",
   },
   {
    subtitle: "We Do Not Sell Your Data",
    text: "The Dry Factory does not sell, rent, or trade your personal information to any third party for their marketing purposes. Your data is yours.",
   },
   {
    subtitle: "Legal Requirements",
    text: "We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
   },
  ],
 },
 {
  id: "security",
  icon: Lock,
  color: "#6c5ce7",
  title: "Data Security",
  content: [
   {
    subtitle: "How We Protect Your Data",
    text: "We implement industry-standard security measures including SSL/TLS encryption for all data transmitted between your browser and our servers, secure storage of personal information with restricted access, and regular security audits of our systems.",
   },
   {
    subtitle: "Payment Security",
    text: "We do not store your full credit card or debit card details on our servers. All payment transactions are processed through PCI-DSS compliant payment processors.",
   },
   {
    subtitle: "Retention",
    text: "We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Typically, order data is retained for 7 years for accounting purposes.",
   },
  ],
 },
 {
  id: "cookies",
  icon: Bell,
  color: "#e84444",
  title: "Cookies & Tracking",
  content: [
   {
    subtitle: "What Are Cookies",
    text: "Cookies are small text files placed on your device when you visit our website. They help us remember your preferences, understand how you use our site, and improve your experience.",
   },
   {
    subtitle: "Types of Cookies We Use",
    text: "Essential cookies (required for the website to function), preference cookies (remembering your choices like language), analytics cookies (understanding usage patterns via Google Analytics), and marketing cookies (showing relevant advertisements on third-party platforms).",
   },
   {
    subtitle: "Managing Cookies",
    text: "You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our website. For more information, visit www.allaboutcookies.org.",
   },
  ],
 },
 {
  id: "rights",
  icon: Shield,
  color: "#e85d26",
  title: "Your Rights",
  content: [
   {
    subtitle: "Access & Portability",
    text: "You have the right to request a copy of the personal data we hold about you and to receive it in a structured, machine-readable format.",
   },
   {
    subtitle: "Correction & Deletion",
    text: "You may request that we correct inaccurate information or delete your personal data. We will honour such requests unless we are required to retain the information by law.",
   },
   {
    subtitle: "Withdrawal of Consent",
    text: "Where we process your data based on your consent (e.g., marketing emails), you may withdraw that consent at any time without affecting the lawfulness of processing prior to withdrawal.",
   },
   {
    subtitle: "How to Exercise Your Rights",
    text: "To exercise any of these rights, please contact us at support@thedryfactory.com. We will respond within 30 days.",
   },
  ],
 },
 {
  id: "contact",
  icon: Mail,
  color: "#f4a435",
  title: "Contact Us",
  content: [
   {
    subtitle: "Privacy Enquiries",
    text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us. We are committed to resolving any concerns promptly and transparently.",
   },
   {
    subtitle: "Contact Details",
    text: "Email: support@thedryfactory.com\nPhone: +91 75673 50328\nAddress: The Dry Factory, 12 Cold Chain Avenue, Andheri East, Mumbai 400 069, Maharashtra, India.",
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
    className="w-full flex items-center justify-between p-6 text-left group hover:bg-[#fdf8f5] transition-colors duration-200"
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

   {/* Content */}
   {open && (
    <div className="px-6 pb-6 border-t border-[#f0e8de]">
     <div className="pt-5 space-y-5">
      {section.content.map((item, i) => (
       <div key={i}>
        <h3
         className="text-sm font-bold mb-1.5"
         style={{ color: section.color }}
        >
         {item.subtitle}
        </h3>
        <p className="text-[#5a4a3a] text-sm leading-relaxed whitespace-pre-line">
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

export default function PrivacyPolicy() {
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
       <div className="w-10 h-10 bg-gradient-to-br from-[#e85d26] to-[#f4a435] rounded-xl flex items-center justify-center shadow-sm">
        <Shield className="w-5 h-5 text-white" />
       </div>
       <div className="h-px flex-1 bg-gradient-to-r from-[#e85d26]/30 to-transparent" />
      </div>

      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#fdf3ec] text-[#e85d26] text-xs font-bold uppercase tracking-widest rounded-full border border-[#f0d9c8] mb-4">
       <Leaf className="w-3 h-3" /> Legal
      </span>

      <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4 leading-tight">
       Privacy Policy
      </h1>
      <p className="text-[#6a5a4a] text-base leading-relaxed max-w-2xl mb-4">
       At The Dry Factory, your privacy is as important to us as the quality
       of our products. This policy explains what data we collect, how we
       use it, and the rights you have over your information.
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
         <p className="text-xs text-[#9a8a7a] mb-3">
          Questions about privacy?
         </p>
         <Link
          to="/contact"
          className="block text-center px-4 py-2.5 bg-[#e85d26] text-white text-xs font-bold rounded-xl hover:bg-[#d44f1a] transition-colors duration-200"
         >
          Contact Us
         </Link>
        </div>
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
       className="flex gap-4 p-5 bg-[#fdf3ec] rounded-2xl border border-[#f0d9c8]"
      >
       <Shield className="w-5 h-5 text-[#e85d26] flex-shrink-0 mt-0.5" />
       <p className="text-sm text-[#5a4a3a] leading-relaxed">
        <strong className="text-[#e85d26]">Our promise:</strong> We will
        never sell your personal data. We collect only what is necessary
        to serve you well, and we protect it with the same care we put
        into our products.
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
       className="p-6 bg-[#1a1a1a] rounded-2xl text-center"
      >
       <p className="text-white/70 text-sm leading-relaxed">
        This Privacy Policy may be updated from time to time. We will
        notify you of significant changes via email or a prominent
        notice on our website. Continued use of our services after
        changes constitutes acceptance.
       </p>
       <p className="text-[#f4a435] text-xs font-semibold mt-3">
        © 2026 The Dry Factory. All rights reserved.
       </p>
      </motion.div>
     </main>
    </div>
   </div>

   <Footer />
  </div>
 );
}

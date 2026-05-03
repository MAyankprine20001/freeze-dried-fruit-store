import React from "react";
import { motion } from "framer-motion";
import { 
  Package, Truck, ShieldCheck, Mail, ArrowRight, CheckCircle2, Leaf, 
  FlaskConical, Users, CupSoda, Coffee, Store, Tag, Headphones, 
  Clock, MessageCircle, Phone, Award, Handshake, Star 
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function BulkOrders() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-8 px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="relative rounded-[2rem] border border-[#D4AF37]/30 bg-[#0a0a0a] overflow-hidden min-h-[500px] flex items-center">
          {/* Background Image & Gradient */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/BulkSection.png" 
              alt="Wholesale bulk freeze-dried fruit products for cafes and retailers" 
              className="w-full h-full object-cover object-center"
            />
            {/* Narrower, softer left scrim so the warehouse stays visible */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/85 via-black/35 via-[45%] sm:via-[40%] to-transparent md:max-w-[58%] md:via-[48%]"
              aria-hidden
            />
            {/* Light bottom fade only — avoids washing out the whole frame */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/55 via-black/15 to-transparent"
              aria-hidden
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full md:w-1/2 p-10 lg:p-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-transparent text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase mb-6">
                Wholesale & Bulk
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
                Bulk Freeze-Dried<br />
                Products for <span className="text-[#D4AF37]">Cafes,<br/>Brands & Retailers</span>
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-md [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
                Consistent supply. Premium quality.<br/>Zero additives.
              </p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[#D4AF37]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-white">100% Real Fruit</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#D4AF37]">
                  <Leaf className="w-4 h-4" />
                  <span className="text-white">No Preservatives</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#D4AF37]">
                  <FlaskConical className="w-4 h-4" />
                  <span className="text-white">No Artificial Additives</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="px-6 lg:px-8 max-w-[1400px] mx-auto pb-16">
        <div className="bg-[#111111] rounded-2xl border border-white/5 py-8 px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-white text-sm mb-0.5">Trusted by<br/>50+ Businesses</h4>
                <p className="text-[11px] text-white/50">Cafes, Bars, Retailers<br/>& Brands</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
              <Package className="w-8 h-8 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-white text-sm mb-0.5">Bulk Orders<br/>Starting From</h4>
                <p className="text-[#D4AF37] font-bold text-lg leading-none mt-1">₹5,000</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
              <Truck className="w-8 h-8 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-white text-sm mb-0.5">Pan India<br/>Delivery</h4>
                <p className="text-[11px] text-white/50">Fast & Reliable Shipping</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-white text-sm mb-0.5">Secure & On-Time<br/>Supply Guaranteed</h4>
                <p className="text-[11px] text-white/50">Your business never<br/>runs out of stock</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. USE CASES */}
      <section className="py-12 px-6 lg:px-8 max-w-[1400px] mx-auto text-center">
        <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-10">Who Is This For?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            { img: "/who_smoothie_bars_1777735698941.png", icon: CupSoda, title: "Smoothie Bars", desc: "Power your menu with premium ingredients." },
            { img: "/who_cafes_1777735721993.png", icon: Coffee, title: "Cafes & Cloud Kitchens", desc: "Delight customers with unique & natural offerings." },
            { img: "/who_retail_1777735737071.png", icon: Store, title: "Retail Stores", desc: "High-quality products your customers can trust." },
            { img: "/who_d2c_1777735752557.png", icon: Package, title: "D2C Brands & Resellers", desc: "Perfect for your brand, made for your audience." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0f0f0f] rounded-2xl border border-white/5 overflow-hidden group"
            >
              <div className="h-44 overflow-hidden relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent"></div>
              </div>
              <div className="relative px-6 pb-8 pt-4">
                <div className="absolute -top-7 left-6 w-12 h-12 bg-[#0a0a0a] border border-[#D4AF37]/50 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-base mb-1.5 mt-2">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. FEATURES (IMPACT DRIVEN) */}
      <section className="py-8 px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Tag, title: "Better Margins\nFor Your Business", desc: "Save more on bigger orders with tiered pricing." },
            { icon: Truck, title: "Never Run Out\nOf Stock", desc: "Reliable logistics & planning for uninterrupted supply." },
            { icon: ShieldCheck, title: "Consistent Taste\nEvery Batch", desc: "Strict quality checks to ensure purity, taste & nutrition." },
            { icon: Headphones, title: "Your Personal\nSupply Partner", desc: "Dedicated account manager for all your needs." }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-white/5 rounded-2xl bg-[#0f0f0f] hover:border-[#D4AF37]/30 transition-colors">
              <item.icon className="w-6 h-6 text-[#D4AF37] mb-6" strokeWidth={1.5} />
              <h3 className="font-bold text-[15px] mb-3 whitespace-pre-line leading-tight">{item.title}</h3>
              <p className="text-[13px] text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCT RANGE GLIMPSE */}
      <section className="py-16 px-6 lg:px-8 max-w-[1400px] mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-[#D4AF37]/30 w-12"></div>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold">Our Bulk Product Range</h2>
          <div className="h-px bg-[#D4AF37]/30 w-12"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: "/bulk_smoothie_premix_1777735623121.png", title: "Smoothie Premixes", desc: "Natural. Instant. Delicious." },
            { img: "/bulk_freeze_dried_1777735637810.png", title: "Freeze-Dried Fruits", desc: "Real fruit. Real crunch." },
            { img: "/bulk_chocolate_1777735653312.png", title: "Chocolate Covered", desc: "Indulgent & irresistible." },
            { img: "/bulk_fruit_chunks_1777735674215.png", title: "Fruit Chunks", desc: "Versatile & convenient." }
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer bg-[#0f0f0f] rounded-2xl overflow-hidden border border-white/5 pb-6">
              <div className="overflow-hidden mb-5 h-40">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
              </div>
              <h3 className="font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-[12px] text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. STRONG CTA SECTION & 7. CONTACT OPTIONS */}
      <section className="py-12 px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="bg-[#0a0a0a] rounded-3xl border border-[#D4AF37]/20 overflow-hidden relative shadow-[0_0_50px_rgba(212,175,55,0.05)]">
          <div className="grid lg:grid-cols-[1.2fr_1fr] items-stretch relative z-10">
            <div className="p-10 lg:p-14 border-r border-white/5">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
                Start Your <span className="text-[#D4AF37]">Bulk Partnership</span> Today
              </h2>
              <p className="text-white/60 text-sm mb-10">
                Get custom pricing, product details and samples for your business.
              </p>
              
              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                  <span className="text-xs text-white/80 font-medium">Get Quote in<br/>2 Minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                  <span className="text-xs text-white/80 font-medium">Response Within<br/>24 Hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                  <span className="text-xs text-white/80 font-medium">100% Secure &<br/>Confidential</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#BF953F] transition-all duration-200 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Get Bulk Pricing <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <a
                  href="https://wa.me/917567350328"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all duration-200 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="relative min-h-[300px] lg:min-h-full">
              <img 
                src="/cta_bulk_boxes.png" 
                alt="Bulk boxes" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent md:bg-gradient-to-l md:from-transparent md:via-black/20 md:to-[#0a0a0a] opacity-80"></div>
              
              {/* Floating Contact Box */}
              <div className="absolute bottom-8 right-8 bg-[#0a0a0a] p-5 rounded-2xl border border-white/10 shadow-2xl min-w-[240px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider mb-0.5">Email Us</p>
                    <a href="mailto:contact@thedryfactory.com" className="text-[13px] font-medium hover:text-[#D4AF37] transition-colors text-white">contact@thedryfactory.com</a>
                  </div>
                </div>
                <div className="w-full h-px bg-white/5 mb-4"></div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider mb-0.5">Call Us</p>
                    <a href="tel:+917567350328" className="text-[13px] font-medium hover:text-[#D4AF37] transition-colors text-white">+91 75673 50328</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ADDITIONAL TRUST BUILDERS */}
      <section className="py-16 px-6 lg:px-8 max-w-[1400px] mx-auto text-center border-t border-white/5 mt-4 mb-12">
        <h3 className="font-serif text-xl lg:text-2xl font-bold mb-12">
          Why Businesses Choose <span className="text-[#D4AF37]">The Dry Factory</span>
        </h3>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 lg:gap-16">
          {[
            { icon: Leaf, text: "100% Natural\nIngredients" },
            { icon: FlaskConical, text: "No Preservatives\nNo Additives" },
            { icon: Award, text: "Premium Quality\nGuaranteed" },
            { icon: Truck, text: "Fast & Reliable\nDelivery" },
            { icon: Handshake, text: "Long Term\nPartnerships" },
            { icon: Star, text: "Rated 4.8/5\nBy Our Partners" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center max-w-[120px]">
              <item.icon className="w-7 h-7 text-[#D4AF37] mb-4" strokeWidth={1} />
              <p className="text-[11px] text-white/50 whitespace-pre-line leading-relaxed font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}


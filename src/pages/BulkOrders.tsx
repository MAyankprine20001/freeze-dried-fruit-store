import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Package, Truck, ShieldCheck, Mail, ArrowRight, CheckCircle2, Leaf, 
  FlaskConical, Users, CupSoda, Coffee, Store, Tag, Headphones, 
  Clock, MessageCircle, Phone, Award, Handshake, Star, ChevronDown, CheckCircle
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { productApi } from "../api/product.api";
import { getProductPrimaryImage } from "../utils/productImage";
import { toast } from "react-toastify";

export default function BulkOrders() {
  const [bulkProducts, setBulkProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    interestType: "Fruit Chunks",
    productsRequired: "",
    quantity: "",
    packaging: "Bulk Pack",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    productApi.getAll()
      .then((res) => {
        // Filter products that have isBulk set to true
        const bulkItems = res.data.filter((p: any) => p.isBulk === true);
        setBulkProducts(bulkItems);
      })
      .catch(() => {})
      .finally(() => setLoadingProducts(false));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInquireProduct = (productName: string) => {
    setFormData(prev => ({
      ...prev,
      productsRequired: prev.productsRequired 
        ? `${prev.productsRequired}, ${productName}` 
        : productName
    }));
    toast.info(`Added ${productName} to inquiry form!`);
    
    // Scroll to form
    const formElement = document.getElementById("inquiry-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      toast.success("Thank you! Your bulk inquiry has been submitted. Our team will contact you shortly.");
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        interestType: "Fruit Chunks",
        productsRequired: "",
        quantity: "",
        packaging: "Bulk Pack",
        message: ""
      });
      setSubmitting(false);
    }, 1500);
  };

  const handleCategoryScroll = (categoryName: string) => {
    setFormData(prev => ({ ...prev, interestType: categoryName }));
    const section = document.getElementById("dynamic-products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#213B14]">
      <Header />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[780px] flex items-center pt-40 pb-28 overflow-hidden w-full">
        {/* Absolute Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/Home_backgroun_Image.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient scrim for readable text */}
          <div className="absolute inset-0 bg-[#FAF7F2] md:bg-transparent md:bg-gradient-to-r md:from-[#FAF7F2]/90 md:to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-5 text-left space-y-6 z-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#213B14]/20 bg-white text-[#213B14] text-[10px] font-black tracking-widest uppercase shadow-sm">
                  <Package className="w-3.5 h-3.5" /> Bulk Orders
                </div>
                
                <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#1C2A18] leading-[1.1]">
                  Premium Freeze Dried<br />
                  Ingredients for <span className="text-[#3F622D]">Your Business.</span>
                </h1>
                
                <p className="text-sm sm:text-base text-[#213B14]/75 max-w-md font-semibold leading-relaxed">
                  High quality. Consistent supply. Custom packs.<br />
                  Perfect for manufacturers, retailers, distributors and HoReCa.
                </p>
                
                {/* Features Row */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#213B14]/10 max-w-md">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#3F622D]/10 flex items-center justify-center text-[#3F622D] shrink-0">
                      <Award className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18] leading-none">Premium Quality</p>
                      <p className="text-[9px] text-[#213B14]/60 font-semibold">100% Real Fruit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#3F622D]/10 flex items-center justify-center text-[#3F622D] shrink-0">
                      <FlaskConical className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18] leading-none">Lab Tested</p>
                      <p className="text-[9px] text-[#213B14]/60 font-semibold">Safe & Certified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#3F622D]/10 flex items-center justify-center text-[#3F622D] shrink-0">
                      <Truck className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18] leading-none">Reliable Supply</p>
                      <p className="text-[9px] text-[#213B14]/60 font-semibold">Pan India Delivery</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#3F622D]/10 flex items-center justify-center text-[#3F622D] shrink-0">
                      <Tag className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18] leading-none">Best Pricing</p>
                      <p className="text-[9px] text-[#213B14]/60 font-semibold">Competitive Rates</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="#inquiry-form-section"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#213B14] hover:bg-[#3F622D] text-white font-black rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Request A Quote <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Foreground Product Showcase Image */}
            <div className="lg:col-span-7 flex justify-center z-20 lg:translate-x-12">
              <img
                src="/bulk_order_banner.png"
                alt="Wholesale ingredients showcase"
                className="w-full max-w-2xl lg:max-w-[850px] xl:max-w-[950px] h-auto object-contain lg:scale-[1.35] hover:scale-[1.37] transition-transform duration-500"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. TRUST CERTIFICATION BAR ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto py-4">
        <div className="bg-white rounded-2xl border border-[#213B14]/10 py-5 px-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-x divide-[#213B14]/10">
            <div className="flex flex-col items-center justify-center px-2">
              <ShieldCheck className="w-5 h-5 text-[#3F622D] mb-1.5" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">FSSAI Compliant</p>
              <p className="text-[9px] text-[#213B14]/50 font-semibold">& Quality Assured</p>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
              <Award className="w-5 h-5 text-[#3F622D] mb-1.5" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">Custom Cut & Size</p>
              <p className="text-[9px] text-[#213B14]/50 font-semibold">& Packaging</p>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
              <Star className="w-5 h-5 text-[#3F622D] mb-1.5" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">MOQ Flexible</p>
              <p className="text-[9px] text-[#213B14]/50 font-semibold">As per Requirement</p>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
              <Truck className="w-5 h-5 text-[#3F622D] mb-1.5" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">On-time Delivery</p>
              <p className="text-[9px] text-[#213B14]/50 font-semibold">Pan India</p>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
              <Headphones className="w-5 h-5 text-[#3F622D] mb-1.5" />
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">Dedicated Support</p>
              <p className="text-[9px] text-[#213B14]/50 font-semibold">For Bulk Buyers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PRODUCT CATEGORIES SECTION ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto text-center space-y-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1C2A18] flex items-center justify-center gap-2">
            Our Bulk Ingredient Categories
          </h2>
          <p className="text-sm text-[#213B14]/50 font-semibold max-w-md mx-auto">
            A wide range of freeze dried ingredients for diverse applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {/* Card 1: Fruit Chunks */}
          <div className="bg-white rounded-3xl border border-[#213B14]/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full group">
            <div>
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="/bulk_fruit_chunks_hero.png" 
                  alt="Freeze Dried Fruit Chunks" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="px-6 pb-6 pt-8 relative space-y-4">
                <div className="absolute -top-6 left-6 w-12 h-12 bg-white border border-[#213B14]/10 rounded-full flex items-center justify-center text-[#3F622D] shadow-sm">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-[#1C2A18]">Freeze Dried Fruit Chunks</h3>
                <p className="text-xs text-[#213B14]/65 font-medium leading-relaxed">
                  Naturally sweet, crispy and full of real fruit goodness.
                </p>
                <ul className="space-y-1.5 text-xs text-[#213B14]/75 font-semibold border-t border-[#213B14]/5 pt-3">
                  <li>• Mango Chunks</li>
                  <li>• Strawberry Slices</li>
                  <li>• Banana Slices</li>
                  <li>• Pineapple Chunks</li>
                  <li>• Jamun Chunks</li>
                  <li className="text-[#3F622D] font-bold">• And more</li>
                </ul>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button 
                onClick={() => handleCategoryScroll("Fruit Chunks")}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#213B14] hover:text-white border border-[#213B14]/15 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                View Products <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Fruit Powders */}
          <div className="bg-white rounded-3xl border border-[#213B14]/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full group">
            <div>
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="/bulk_fruit_powder_hero.png" 
                  alt="Freeze Dried Fruit Powders" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="px-6 pb-6 pt-8 relative space-y-4">
                <div className="absolute -top-6 left-6 w-12 h-12 bg-white border border-[#213B14]/10 rounded-full flex items-center justify-center text-[#3F622D] shadow-sm">
                  <CupSoda className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-[#1C2A18]">Freeze Dried Fruit Powder</h3>
                <p className="text-xs text-[#213B14]/65 font-medium leading-relaxed">
                  Fine, natural powders for nutrition, beverages & food applications.
                </p>
                <ul className="space-y-1.5 text-xs text-[#213B14]/75 font-semibold border-t border-[#213B14]/5 pt-3">
                  <li>• Mango Powder</li>
                  <li>• Strawberry Powder</li>
                  <li>• Banana Powder</li>
                  <li>• Jamun Powder</li>
                  <li className="text-[#3F622D] font-bold">• And more</li>
                </ul>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button 
                onClick={() => handleCategoryScroll("Fruit Powders")}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#213B14] hover:text-white border border-[#213B14]/15 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                View Products <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Vegetable Flakes */}
          <div className="bg-white rounded-3xl border border-[#213B14]/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full group">
            <div>
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="/bulk_vegetable_flakes_hero.png" 
                  alt="Freeze Dried Vegetable Flakes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="px-6 pb-6 pt-8 relative space-y-4">
                <div className="absolute -top-6 left-6 w-12 h-12 bg-white border border-[#213B14]/10 rounded-full flex items-center justify-center text-[#3F622D] shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-[#1C2A18]">Freeze Dried Vegetable Flakes</h3>
                <p className="text-xs text-[#213B14]/65 font-medium leading-relaxed">
                  Lightweight, nutritious & ready to use in any recipe.
                </p>
                <ul className="space-y-1.5 text-xs text-[#213B14]/75 font-semibold border-t border-[#213B14]/5 pt-3">
                  <li>• Onion Flakes</li>
                  <li>• Garlic Flakes</li>
                  <li>• Carrot Flakes</li>
                  <li>• Okra (Bhindi) Flakes</li>
                  <li>• Spinach Flakes</li>
                  <li className="text-[#3F622D] font-bold">• And more</li>
                </ul>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button 
                onClick={() => handleCategoryScroll("Vegetable Flakes")}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#213B14] hover:text-white border border-[#213B14]/15 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                View Products <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Edible Flowers */}
          <div className="bg-white rounded-3xl border border-[#213B14]/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full group">
            <div>
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="/bulk_edible_flowers_hero.png" 
                  alt="Freeze Dried Edible Flowers" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="px-6 pb-6 pt-8 relative space-y-4">
                <div className="absolute -top-6 left-6 w-12 h-12 bg-white border border-[#213B14]/10 rounded-full flex items-center justify-center text-[#3F622D] shadow-sm">
                  <Star className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-[#1C2A18]">Freeze Dried Edible Flowers</h3>
                <p className="text-xs text-[#213B14]/65 font-medium leading-relaxed">
                  Beautiful, natural & aromatic flowers for food & wellness.
                </p>
                <ul className="space-y-1.5 text-xs text-[#213B14]/75 font-semibold border-t border-[#213B14]/5 pt-3">
                  <li>• Rose Petals</li>
                  <li>• Marigold Petals</li>
                  <li>• Jasmine Flowers</li>
                  <li>• Blue Pea Flowers</li>
                  <li className="text-[#3F622D] font-bold">• And more</li>
                </ul>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button 
                onClick={() => handleCategoryScroll("Edible Flowers")}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#213B14] hover:text-white border border-[#213B14]/15 rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                View Products <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. DYNAMIC PRODUCTS GRID SECTION ── */}
      <section id="dynamic-products-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-[#1C2A18]">Available Dynamic Wholesale Catalog</h2>
          <p className="text-xs text-[#213B14]/50 font-bold uppercase tracking-wider">Managed live from your admin panel</p>
        </div>

        {loadingProducts ? (
          <div className="py-12 flex justify-center items-center gap-2 text-sm text-[#213B14]/50">
            <div className="w-5 h-5 border-2 border-[#213B14] border-t-transparent rounded-full animate-spin" />
            <span>Fetching wholesale products...</span>
          </div>
        ) : bulkProducts.length === 0 ? (
          <div className="py-16 bg-white rounded-3xl border border-[#213B14]/10 max-w-md mx-auto text-center p-6 space-y-3">
            <Package className="w-8 h-8 mx-auto text-[#E4B34F] opacity-40" />
            <p className="text-sm font-bold text-[#1C2A18]">No wholesale products found</p>
            <p className="text-xs text-[#213B14]/65 font-medium leading-relaxed">
              Mark products as "Bulk Products" in your admin panel to list them dynamically here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
            {bulkProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-3xl p-4 border border-[#213B14]/10 shadow-sm flex flex-col gap-3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#213B14]/5">
                  <img src={getProductPrimaryImage(product)} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-[#E4B34F] uppercase tracking-wider">{product.category}</span>
                  <h3 className="text-sm font-extrabold text-[#1C2A18] leading-tight">{product.name}</h3>
                  {product.subtitle && <p className="text-[10px] text-[#213B14]/50 line-clamp-1 font-semibold">{product.subtitle}</p>}
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#213B14]/5">
                  <div>
                    <span className="text-xs text-[#213B14]/50 font-bold">Price: </span>
                    <span className="text-sm font-black text-[#213B14]">₹{product.price}</span>
                    {product.weight && <span className="text-[10px] text-[#213B14]/40 font-semibold block">{product.weight}</span>}
                  </div>
                  <button
                    onClick={() => handleInquireProduct(product.name)}
                    className="text-[10px] font-black px-3.5 py-2 bg-[#213B14] hover:bg-[#3F622D] text-white rounded-xl uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── 5. WHY CHOOSE & PROCESS SECTION ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Why Choose */}
          <div className="bg-white rounded-[2.5rem] border border-[#213B14]/10 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-[#1C2A18]">Why Choose The Dry Factory?</h3>
              <ul className="space-y-4">
                {[
                  "100% Natural & Real Ingredients (Zero fillers)",
                  "No Preservatives & Additives (Completely clean label)",
                  "Advanced Freeze Drying Technology (Retains 97% nutrients)",
                  "Long Shelf Life with Maximum Nutrition & Taste",
                  "Bulk Supply for All Business Needs (MOQ flexible)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm font-semibold text-[#213B14]/80">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 h-40 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#213B14]/5 relative">
              <img src="/SliderImage/slider-2.png" alt="Fresh fruits" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Our Bulk Order Process */}
          <div className="bg-white rounded-[2.5rem] border border-[#213B14]/10 p-8 sm:p-10 shadow-sm space-y-6">
            <h3 className="text-2xl font-extrabold text-[#1C2A18]">Our Bulk Order Process</h3>
            
            <div className="relative border-l-2 border-[#213B14]/10 pl-6 ml-3 space-y-6">
              {[
                { title: "1. Inquiry", desc: "Share your business details and requirements in the form below." },
                { title: "2. Quotation", desc: "Get custom pricing, sample options, and technical specifications." },
                { title: "3. Confirmation", desc: "Approve the quotation and confirm delivery schedules." },
                { title: "4. Production", desc: "We prepare and pack with strict quality checks." },
                { title: "5. Delivery", desc: "Get safe, trackable, and on-time shipment to your address." }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[#3F622D] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3F622D]" />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#1C2A18] leading-none mb-1">{step.title}</h4>
                  <p className="text-xs text-[#213B14]/65 font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. TELL US YOUR REQUIREMENTS INQUIRY FORM ── */}
      <section id="inquiry-form-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="bg-white rounded-[2.5rem] border border-[#213B14]/10 overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-12 items-stretch">
            
            {/* Form Column */}
            <div className="lg:col-span-8 p-8 sm:p-12 text-left space-y-6 border-r border-[#213B14]/10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2A18]">Tell Us Your Requirements</h2>
                <p className="text-xs text-[#213B14]/50 font-semibold mt-1">Fill the form below and our team will get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#213B14]/65">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      required 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                      placeholder="Enter your full name" 
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl text-xs font-semibold placeholder:text-[#213B14]/30 outline-none focus:bg-white focus:border-[#213B14]" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#213B14]/65">Company / Business Name *</label>
                    <input 
                      type="text" 
                      name="companyName" 
                      required 
                      value={formData.companyName} 
                      onChange={handleInputChange} 
                      placeholder="Enter company name" 
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl text-xs font-semibold placeholder:text-[#213B14]/30 outline-none focus:bg-white focus:border-[#213B14]" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#213B14]/65">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="Enter your email" 
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl text-xs font-semibold placeholder:text-[#213B14]/30 outline-none focus:bg-white focus:border-[#213B14]" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#213B14]/65">Mobile Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="Enter mobile number" 
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl text-xs font-semibold placeholder:text-[#213B14]/30 outline-none focus:bg-white focus:border-[#213B14]" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#213B14]/65">What are you interested in?</label>
                    <select 
                      name="interestType" 
                      value={formData.interestType} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-[#213B14]"
                    >
                      <option>Fruit Chunks</option>
                      <option>Fruit Powders</option>
                      <option>Vegetable Flakes</option>
                      <option>Edible Flowers</option>
                      <option>Others</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#213B14]/65">Product / Ingredients Required *</label>
                    <input 
                      type="text" 
                      name="productsRequired" 
                      required 
                      value={formData.productsRequired} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Mango Chunks, Onion Flakes" 
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl text-xs font-semibold placeholder:text-[#213B14]/30 outline-none focus:bg-white focus:border-[#213B14]" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#213B14]/65">Estimated Quantity (Per Month)</label>
                    <input 
                      type="text" 
                      name="quantity" 
                      value={formData.quantity} 
                      onChange={handleInputChange} 
                      placeholder="e.g. 50 KG" 
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl text-xs font-semibold placeholder:text-[#213B14]/30 outline-none focus:bg-white focus:border-[#213B14]" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#213B14]/65">Packaging Preference</label>
                    <select 
                      name="packaging" 
                      value={formData.packaging} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-[#213B14]"
                    >
                      <option>Bulk Pack</option>
                      <option>Retail Pack</option>
                      <option>Custom Packaging</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#213B14]/65">Additional Requirements / Message</label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder="Tell us more about your specifications..." 
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#213B14]/15 rounded-xl text-xs font-semibold placeholder:text-[#213B14]/30 outline-none focus:bg-white focus:border-[#213B14] resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-[#213B14] hover:bg-[#3F622D] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-colors shadow-sm disabled:opacity-50"
                >
                  {submitting ? "Submitting Inquiry..." : "Submit Inquiry →"}
                </button>
              </form>
            </div>

            {/* Contact Info Column */}
            <div className="lg:col-span-4 p-8 sm:p-12 text-left flex flex-col justify-between bg-[#FAF7F2]/50">
              <div className="space-y-6">
                <h3 className="text-lg font-black text-[#1C2A18]">For immediate assistance reach out to us</h3>
                
                <div className="space-y-4">
                  <a href="mailto:bulk@thedryfactory.com" className="flex items-center gap-3 text-xs font-bold hover:text-[#3F622D] transition-colors">
                    <div className="w-8 h-8 rounded-full border border-[#213B14]/15 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[#3F622D]" />
                    </div>
                    <span>bulk@thedryfactory.com</span>
                  </a>
                  <a href="tel:+917567350328" className="flex items-center gap-3 text-xs font-bold hover:text-[#3F622D] transition-colors">
                    <div className="w-8 h-8 rounded-full border border-[#213B14]/15 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#3F622D]" />
                    </div>
                    <span>+91 7567350328</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white rounded-2xl border border-[#213B14]/10 text-[10px] text-[#213B14]/65 leading-relaxed font-semibold">
                🔒 We respect your information. Your details are safe with us.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. FOOTER STRIP ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto pb-12">
        <div className="bg-white rounded-2xl border border-[#213B14]/10 p-5 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-[10px] font-black uppercase tracking-wider text-[#1C2A18]">
            <div className="flex items-center justify-center gap-2">
              <Package className="w-4 h-4 text-[#3F622D]" /> Minimum Order
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-[#3F622D]" /> Flexible Packaging
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-4 h-4 text-[#3F622D]" /> Pan India Delivery
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3F622D]" /> Secure Payments
            </div>
            <div className="flex items-center justify-center gap-2">
              <Headphones className="w-4 h-4 text-[#3F622D]" /> After Sales Support
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

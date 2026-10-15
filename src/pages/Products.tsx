import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ArrowUpDown, X, Star, Heart, ShoppingBag, CheckCircle2, Award, Zap, ShieldCheck } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { productApi } from "../api/product.api";
import CartStepper from "../components/CartStepper";
import PackChooser from "../components/PackChooser";
import FilterSortBar from "../components/FilterSortBar";
import { usePack3Selection } from "../utils/packOf3";

export default function Products() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  // Filter Drawer State
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  // Sort Drawer State
  const [sortOption, setSortOption] = useState("featured");

  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const pack = usePack3Selection();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productApi.getRetail();
        const data = res.data ?? res;
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle Filtering & Sorting
  const applyFiltersAndSort = () => {
    let result = [...allProducts];

    // Category filter mapping
    if (activeCategory === "fruits") {
      result = result.filter(p => p.category.toLowerCase().replace(/[\s_]+/g, "-") === "fruit-chunks");
    } else if (activeCategory === "ice-creams") {
      result = result.filter(p => p.category.toLowerCase().replace(/[\s_]+/g, "-") === "smoothie-premix");
    } else if (activeCategory === "candies") {
      result = result.filter(p => p.category.toLowerCase().replace(/[\s_]+/g, "-") === "chocolates");
    }

    // Availability filter
    if (inStockOnly && !outOfStockOnly) {
      result = result.filter(p => !p.stock || p.stock === "In Stock");
    } else if (outOfStockOnly && !inStockOnly) {
      result = result.filter(p => p.stock === "Out of Stock");
    }

    // Price filter
    if (priceFrom) {
      result = result.filter(p => p.price >= parseFloat(priceFrom));
    }
    if (priceTo) {
      result = result.filter(p => p.price <= parseFloat(priceTo));
    }

    // Sorting options
    if (sortOption === "featured") {
      result = result.filter(p => p.featured).concat(result.filter(p => !p.featured));
    } else if (sortOption === "best-selling") {
      result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
    } else if (sortOption === "price-low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-to-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "alpha-a-z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "alpha-z-a") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "date-new-to-old") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === "date-old-to-new") {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    setFilteredProducts(result);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [activeCategory, allProducts, inStockOnly, outOfStockOnly, priceFrom, priceTo, sortOption]);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product._id || product.id]: true }));
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product._id || product.id]: false }));
    }, 1500);
  };

  // Helper to show category labels
  const getCategoryTitle = () => {
    if (activeCategory === "fruits") return "Fruits / Crispy Bites";
    if (activeCategory === "ice-creams") return "Ice Creams / SipReal Premixes";
    if (activeCategory === "candies") return "Candies / Freeze Fusion Chocolates";
    return "All Products";
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#213B14]">
      <Header />

      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Page Heading */}
        <div className="text-center">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#213B14]">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-widest mt-2">
            Enjoy organic, freeze-dried goodness crafted for taste & health.
          </p>
        </div>

        {/* 3 Dedicated Categories Option Cards (Shop Selector Index) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              id: "ice-creams",
              title: "SipReal",
              subtitle: "SMOOTHIE PREMIX",
              desc: "Real fruit smoothie premixes. Just add water & sip.",
              bgClass: "bg-[#FCEAEB]",
              btnBg: "bg-[#B82A5F]",
              textColor: "text-[#B82A5F]",
              btnText: "EXPLORE SIPREAL →",
              image: "/home_slip_real.png"
            },
            {
              id: "candies",
              title: "Freeze Fusion",
              subtitle: "CHOCOLATES",
              desc: "Real fruit infused rich couverture chocolates.",
              bgClass: "bg-[#F5ECE6]",
              btnBg: "bg-[#4A2D1B]",
              textColor: "text-[#4A2D1B]",
              btnText: "EXPLORE CHOCOLATES →",
              image: "/home_freexze_frozen.png"
            },
            {
              id: "fruits",
              title: "Crispy Bites",
              subtitle: "FREEZE DRIED SNACKS",
              desc: "Crispy, crunchy & naturally delicious fruit bites.",
              bgClass: "bg-[#EEF4EC]",
              btnBg: "bg-[#2B4C1F]",
              textColor: "text-[#2B4C1F]",
              btnText: "EXPLORE BITES →",
              image: "/home_cripsey.png"
            }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === "fruits") navigate("/fruit-powder-chunks");
                if (cat.id === "ice-creams") navigate("/smoothie-premix");
                if (cat.id === "candies") navigate("/chocolate");
              }}
              className={`rounded-[24px] p-6 flex flex-col text-left transition-all duration-300 hover:shadow-lg ${cat.bgClass} hover:scale-[1.01]`}
            >
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className={`font-serif text-2xl font-black ${cat.textColor}`}>
                    {cat.title}
                  </h3>
                  {cat.id === "ice-creams" && (
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#B82A5F] text-white text-[9px] font-bold uppercase tracking-widest">
                      Coming Soon
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-gray-500 tracking-[0.15em] block mt-0.5">
                    {cat.subtitle}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {cat.desc}
                </p>
                <div className="w-full h-36 rounded-xl overflow-hidden relative flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="h-[92%] w-auto object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full mt-6">
                <div className={`w-full py-3 ${cat.btnBg} text-white rounded-full text-[10px] font-black uppercase tracking-widest text-center shadow-sm`}>
                  {cat.btnText}
                </div>
              </div>
            </button>
          ))}
        </section>

        {/* Filter and Sort Action Buttons Row */}
        <FilterSortBar
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            outOfStockOnly={outOfStockOnly}
            setOutOfStockOnly={setOutOfStockOnly}
            priceFrom={priceFrom}
            setPriceFrom={setPriceFrom}
            priceTo={priceTo}
            setPriceTo={setPriceTo}
            sortOption={sortOption}
            setSortOption={setSortOption}
            color="#3F622D"
            className="max-w-5xl mx-auto pt-6 border-t border-[#213B14]/10"
          />

        {/* Products Grid */}
        {loading ? (
          <Loader color="#213B14" text="Loading all products..." />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-2xl border border-[#213B14]/5 max-w-5xl mx-auto">
            <h3 className="font-serif text-xl font-bold text-gray-400">No Products Found</h3>
            <p className="text-xs text-gray-400 mt-1">Try resetting your filters or select a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {filteredProducts.map((product) => (
              <div
                key={product._id || product.id}
                onClick={() => navigate(`/product/${product._id || product.id}`)}
                className="bg-white rounded-2xl p-4 border border-[#213B14]/5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="aspect-square w-full rounded-xl bg-[#FAF7F2] overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#3F622D] uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-serif text-sm font-bold text-[#213B14] mt-1 line-clamp-1">{product.name}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">{product.subtitle}</p>
                  </div>
                </div>

                <div>
                <PackChooser product={product} pack3={pack.isPack3(product)} onChange={(on) => pack.setPack3(product, on)} color="#213B14" className="mt-4" />
                <div className="mt-4 pt-4 border-t border-[#213B14]/5 flex items-center justify-between">
                  <span className="font-serif text-base font-black text-[#213B14]">₹{pack.itemFor(product).price}</span>
                  <CartStepper product={pack.itemFor(product)} color="#213B14" textColor="#FFFFFF">
                    <button
                      onClick={(e) => handleAddToCart(pack.itemFor(product), e)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                        addedItems[product._id || product.id]
                          ? "bg-green-700 text-white"
                          : "bg-[#213B14] text-white hover:bg-[#3F622D]"
                      }`}
                    >
                      {addedItems[product._id || product.id] ? "Added!" : "ADD TO CART"}
                    </button>
                  </CartStepper>
                </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
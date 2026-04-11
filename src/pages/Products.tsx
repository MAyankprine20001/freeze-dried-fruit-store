import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Star,
  ShoppingBag,
  Zap,
  Shield,
  BadgeCheck,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  Heart,
  Eye,
  Gift,
  Package,
  Ribbon,
  Tag,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── Image component with guaranteed fallback ────────────────────────────────
interface SafeImgProps {
  src: string;
  alt: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  className?: string;
}

function SafeImg({
  src,
  alt,
  emoji,
  gradientFrom,
  gradientTo,
  className = "",
}: SafeImgProps) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center ${className}`}
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>{emoji}</span>
        <span className="text-white/80 text-xs font-semibold mt-2 text-center px-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onError={() => setBroken(true)}
    />
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  { id: "all", label: "All Products", emoji: "✨" },
  { id: "powder-chunks", label: "Powder & Chunks", emoji: "🍓" },
  { id: "chocolate", label: "Chocolate", emoji: "🍫" },
  { id: "combo", label: "Combos", emoji: "📦" },
  { id: "gift", label: "Gift Sets", emoji: "🎁" },
];

const allProducts = [
  // ── POWDERS ──────────────────────────────────────────────────────────────
  {
    id: "p1",
    category: "powder-chunks",
    name: "Raspberry Powder",
    subtitle: "Freeze Dried · 100g",
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviews: 214,
    tag: "Best Seller",
    tagColor: "#e85d26",
    badge: "🏆",
    accent: "#e85d26",
    bg: "from-[#fff2ee] to-[#ffe8df]",
    borderColor: "#f5cfc0",
    gradientFrom: "#e85d26",
    gradientTo: "#f4a435",
    emoji: "🍓",
    image:
      "https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e?w=600&h=600&fit=crop&auto=format",
    path: "/fruit-powder-chunks",
    highlights: ["97% Nutrients", "Natural Color", "25yr shelf life"],
    weight: "100g",
    stock: "In Stock",
  },
  {
    id: "p2",
    category: "powder-chunks",
    name: "Mango Powder",
    subtitle: "Freeze Dried · 100g",
    price: 379,
    originalPrice: 479,
    rating: 4.8,
    reviews: 189,
    tag: "Popular",
    tagColor: "#f4a435",
    badge: "🥭",
    accent: "#f4a435",
    bg: "from-[#fffaee] to-[#fff0cc]",
    borderColor: "#f5e0a0",
    gradientFrom: "#f4a435",
    gradientTo: "#f39c12",
    emoji: "🥭",
    image:
      "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=600&h=600&fit=crop&auto=format",
    path: "/fruit-powder-chunks",
    highlights: ["Tropical Flavor", "Smoothie Ready", "Natural Dye"],
    weight: "100g",
    stock: "In Stock",
  },
  {
    id: "p3",
    category: "powder-chunks",
    name: "Strawberry Powder",
    subtitle: "Freeze Dried · 100g",
    price: 349,
    originalPrice: 449,
    rating: 4.7,
    reviews: 156,
    tag: "New",
    tagColor: "#e84444",
    badge: "🍓",
    accent: "#e84444",
    bg: "from-[#fff2f2] to-[#ffe0e0]",
    borderColor: "#f5c0c0",
    gradientFrom: "#e84444",
    gradientTo: "#c0392b",
    emoji: "🍓",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=600&fit=crop&auto=format",
    path: "/fruit-powder-chunks",
    highlights: ["Kids Favourite", "Baking Grade", "Vibrant Pink"],
    weight: "100g",
    stock: "In Stock",
  },
  {
    id: "p4",
    category: "powder-chunks",
    name: "Blueberry Powder",
    subtitle: "Freeze Dried · 100g",
    price: 429,
    originalPrice: 529,
    rating: 4.9,
    reviews: 98,
    tag: "Premium",
    tagColor: "#6c5ce7",
    badge: "🫐",
    accent: "#6c5ce7",
    bg: "from-[#f4f2ff] to-[#e8e4ff]",
    borderColor: "#c8c0f0",
    gradientFrom: "#6c5ce7",
    gradientTo: "#4a3ab0",
    emoji: "🫐",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&h=600&fit=crop&auto=format",
    path: "/fruit-powder-chunks",
    highlights: ["Antioxidant Rich", "Deep Color", "Superfood"],
    weight: "100g",
    stock: "Low Stock",
  },

  // ── CHUNKS ───────────────────────────────────────────────────────────────
  {
    id: "c1",
    category: "powder-chunks",
    name: "Mixed Fruit Chunks",
    subtitle: "Freeze Dried · 150g",
    price: 349,
    originalPrice: 449,
    rating: 4.8,
    reviews: 178,
    tag: "Best Seller",
    tagColor: "#27ae60",
    badge: "🏆",
    accent: "#27ae60",
    bg: "from-[#f0fff6] to-[#e0f7ea]",
    borderColor: "#b0e0c0",
    gradientFrom: "#27ae60",
    gradientTo: "#2ecc71",
    emoji: "🍇",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=600&fit=crop&auto=format",
    path: "/fruit-powder-chunks",
    highlights: ["Zero Sugar Added", "Trail Mix Ready", "No Refrigeration"],
    weight: "150g",
    stock: "In Stock",
  },
  {
    id: "c2",
    category: "powder-chunks",
    name: "Mango Chunks",
    subtitle: "Freeze Dried · 150g",
    price: 329,
    originalPrice: 429,
    rating: 4.9,
    reviews: 142,
    tag: "Tropical",
    tagColor: "#f4a435",
    badge: "🥭",
    accent: "#f4a435",
    bg: "from-[#fffaee] to-[#fff0cc]",
    borderColor: "#f5e0a0",
    gradientFrom: "#f4a435",
    gradientTo: "#e67e22",
    emoji: "🥭",
    image:
      "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=600&h=600&fit=crop&auto=format",
    path: "/fruit-powder-chunks",
    highlights: ["Airy Crunch", "Snack Anywhere", "Intense Flavor"],
    weight: "150g",
    stock: "In Stock",
  },
  {
    id: "c3",
    category: "powder-chunks",
    name: "Strawberry Chunks",
    subtitle: "Freeze Dried · 150g",
    price: 309,
    originalPrice: 399,
    rating: 4.7,
    reviews: 121,
    tag: "Kids Pick",
    tagColor: "#e84444",
    badge: "🍓",
    accent: "#e84444",
    bg: "from-[#fff2f2] to-[#ffe0e0]",
    borderColor: "#f5c0c0",
    gradientFrom: "#e84444",
    gradientTo: "#c0392b",
    emoji: "🍓",
    image:
      "https://images.unsplash.com/photo-1543528176-61b239494933?w=600&h=600&fit=crop&auto=format",
    path: "/fruit-powder-chunks",
    highlights: ["School Lunch", "Yogurt Topping", "Rehydrates Well"],
    weight: "150g",
    stock: "In Stock",
  },
  {
    id: "c4",
    category: "powder-chunks",
    name: "Pineapple Chunks",
    subtitle: "Freeze Dried · 150g",
    price: 359,
    originalPrice: 459,
    rating: 4.6,
    reviews: 87,
    tag: "New",
    tagColor: "#c8a800",
    badge: "🍍",
    accent: "#c8a800",
    bg: "from-[#fffdf0] to-[#fff8d0]",
    borderColor: "#f0e090",
    gradientFrom: "#f4d03f",
    gradientTo: "#c8a800",
    emoji: "🍍",
    image:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&h=600&fit=crop&auto=format",
    path: "/fruit-powder-chunks",
    highlights: ["Tangy & Sweet", "Hiking Snack", "Enzyme Rich"],
    weight: "150g",
    stock: "In Stock",
  },

  // ── CHOCOLATE ─────────────────────────────────────────────────────────────
  {
    id: "ch1",
    category: "chocolate",
    name: "Dark + Raspberry",
    subtitle: "Single Origin · 80g Bar",
    price: 449,
    originalPrice: 549,
    rating: 5.0,
    reviews: 96,
    tag: "Staff Pick",
    tagColor: "#4a1a0a",
    badge: "⭐",
    accent: "#4a1a0a",
    bg: "from-[#fdf6f0] to-[#f5e8dc]",
    borderColor: "#e0c8b0",
    gradientFrom: "#4a1a0a",
    gradientTo: "#8b4513",
    emoji: "🍫",
    image:
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&h=600&fit=crop&auto=format",
    path: "/chocolate",
    highlights: ["Single Origin", "No Artificial Flavor", "Gift Ready"],
    weight: "80g",
    stock: "In Stock",
  },
  {
    id: "ch2",
    category: "chocolate",
    name: "Milk + Strawberry",
    subtitle: "Single Origin · 80g Bar",
    price: 429,
    originalPrice: 529,
    rating: 4.9,
    reviews: 74,
    tag: "Popular",
    tagColor: "#c0392b",
    badge: "🍓",
    accent: "#c0392b",
    bg: "from-[#fff2f2] to-[#ffe8e4]",
    borderColor: "#f0c8c0",
    gradientFrom: "#c0392b",
    gradientTo: "#7b2d2d",
    emoji: "🍫",
    image:
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&h=600&fit=crop&auto=format",
    path: "/chocolate",
    highlights: ["Creamy Milk Base", "Tart & Sweet", "Stunning Visual"],
    weight: "80g",
    stock: "In Stock",
  },
  {
    id: "ch3",
    category: "chocolate",
    name: "White + Mango",
    subtitle: "Single Origin · 80g Bar",
    price: 469,
    originalPrice: 569,
    rating: 4.8,
    reviews: 58,
    tag: "Exotic",
    tagColor: "#e8950a",
    badge: "🥭",
    accent: "#e8950a",
    bg: "from-[#fffaee] to-[#fff0cc]",
    borderColor: "#f5e0a0",
    gradientFrom: "#e8950a",
    gradientTo: "#c47a05",
    emoji: "🍫",
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&h=600&fit=crop&auto=format",
    path: "/chocolate",
    highlights: ["White Cacao", "Tropical Twist", "Hamper Perfect"],
    weight: "80g",
    stock: "Low Stock",
  },
  {
    id: "ch4",
    category: "chocolate",
    name: "Dark + Blueberry",
    subtitle: "Single Origin · 80g Bar",
    price: 479,
    originalPrice: 579,
    rating: 4.9,
    reviews: 41,
    tag: "New",
    tagColor: "#6c5ce7",
    badge: "🫐",
    accent: "#6c5ce7",
    bg: "from-[#f4f2ff] to-[#e8e4ff]",
    borderColor: "#c8c0f0",
    gradientFrom: "#6c5ce7",
    gradientTo: "#4a3ab0",
    emoji: "🍫",
    image:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop&auto=format",
    path: "/chocolate",
    highlights: ["Antioxidant Boost", "Bold Flavor", "Artisan Craft"],
    weight: "80g",
    stock: "In Stock",
  },

  // ── COMBOS ────────────────────────────────────────────────────────────────
  {
    id: "co1",
    category: "combo",
    name: "Powder Trio Pack",
    subtitle: "Best Value · 3 × 100g",
    price: 999,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 312,
    tag: "Save 23%",
    tagColor: "#0a7a4a",
    badge: "💰",
    accent: "#0a7a4a",
    bg: "from-[#edfff6] to-[#d4f5e5]",
    borderColor: "#9de0c0",
    gradientFrom: "#0a7a4a",
    gradientTo: "#27ae60",
    emoji: "📦",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=600&fit=crop&auto=format",
    path: "/combos",
    highlights: [
      "Raspberry + Mango + Strawberry",
      "Free Shipping",
      "Save ₹300",
    ],
    weight: "3 × 100g",
    stock: "In Stock",
    comboItems: ["Raspberry Powder", "Mango Powder", "Strawberry Powder"],
  },
  {
    id: "co2",
    category: "combo",
    name: "Snacker's Bundle",
    subtitle: "Chunks Variety · 4 × 150g",
    price: 1199,
    originalPrice: 1556,
    rating: 4.8,
    reviews: 198,
    tag: "Top Value",
    tagColor: "#1a6bb5",
    badge: "🎯",
    accent: "#1a6bb5",
    bg: "from-[#eff6ff] to-[#dbeafe]",
    borderColor: "#93c5fd",
    gradientFrom: "#1a6bb5",
    gradientTo: "#2563eb",
    emoji: "📦",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=600&fit=crop&auto=format",
    path: "/combos",
    highlights: ["All 4 Chunk Flavors", "No Refrigeration", "Save ₹357"],
    weight: "4 × 150g",
    stock: "In Stock",
    comboItems: ["Mango", "Strawberry", "Pineapple", "Mixed Fruit"],
  },
  {
    id: "co3",
    category: "combo",
    name: "Choco Lovers Duo",
    subtitle: "Chocolate Bars · 2 × 80g",
    price: 799,
    originalPrice: 998,
    rating: 5.0,
    reviews: 134,
    tag: "Fan Fave",
    tagColor: "#7b2d2d",
    badge: "❤️",
    accent: "#7b2d2d",
    bg: "from-[#fdf6f0] to-[#f5e8dc]",
    borderColor: "#e0c8b0",
    gradientFrom: "#7b2d2d",
    gradientTo: "#4a1a0a",
    emoji: "🍫",
    image:
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&h=600&fit=crop&auto=format",
    path: "/combos",
    highlights: ["Dark + Raspberry", "Milk + Strawberry", "Save ₹199"],
    weight: "2 × 80g",
    stock: "In Stock",
    comboItems: ["Dark + Raspberry", "Milk + Strawberry"],
  },
  {
    id: "co4",
    category: "combo",
    name: "The FrostFruit Sampler",
    subtitle: "All Categories · 6-piece",
    price: 1499,
    originalPrice: 2024,
    rating: 5.0,
    reviews: 421,
    tag: "Best Deal",
    tagColor: "#e85d26",
    badge: "🌟",
    accent: "#e85d26",
    bg: "from-[#fff2ee] to-[#ffe8df]",
    borderColor: "#f5cfc0",
    gradientFrom: "#e85d26",
    gradientTo: "#f4a435",
    emoji: "🌟",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=600&fit=crop&auto=format",
    path: "/combos",
    highlights: ["Powder + Chunks + Choco", "All 3 Categories", "Save ₹525"],
    weight: "6-piece set",
    stock: "In Stock",
    comboItems: ["2 Powders", "2 Chunks", "2 Chocolates"],
  },

  // ── GIFT SETS ─────────────────────────────────────────────────────────────
  {
    id: "g1",
    category: "gift",
    name: "Celebration Box",
    subtitle: "Premium Gift · 5-piece",
    price: 1799,
    originalPrice: 2299,
    rating: 5.0,
    reviews: 267,
    tag: "Top Gift",
    tagColor: "#9b1d6a",
    badge: "🎁",
    accent: "#9b1d6a",
    bg: "from-[#fdf0f8] to-[#f8e0f0]",
    borderColor: "#e8b0d8",
    gradientFrom: "#9b1d6a",
    gradientTo: "#c0396a",
    emoji: "🎁",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop&auto=format",
    path: "/gift-sets",
    highlights: ["Luxury Packaging", "Handwritten Card", "Ribbon Wrapped"],
    weight: "5-piece",
    stock: "In Stock",
    isGift: true,
    giftNote: "Includes personalised message card",
  },
  {
    id: "g2",
    category: "gift",
    name: "Wellness Hamper",
    subtitle: "Health Gift · 4-piece",
    price: 1599,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 183,
    tag: "Gifted Most",
    tagColor: "#2e7d32",
    badge: "🌿",
    accent: "#2e7d32",
    bg: "from-[#f1f8f1] to-[#e0f0e0]",
    borderColor: "#a0d0a0",
    gradientFrom: "#2e7d32",
    gradientTo: "#43a047",
    emoji: "🌿",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&h=600&fit=crop&auto=format",
    path: "/gift-sets",
    highlights: ["Superfoods Focus", "Eco Box", "Zero Waste Wrap"],
    weight: "4-piece",
    stock: "In Stock",
    isGift: true,
    giftNote: "Packed in recycled kraft box",
  },
  {
    id: "g3",
    category: "gift",
    name: "Choco & Fruit Luxe",
    subtitle: "Indulgence Gift · 6-piece",
    price: 2199,
    originalPrice: 2799,
    rating: 5.0,
    reviews: 309,
    tag: "Luxury",
    tagColor: "#b8860b",
    badge: "✨",
    accent: "#b8860b",
    bg: "from-[#fffbf0] to-[#fef3c7]",
    borderColor: "#f0d080",
    gradientFrom: "#b8860b",
    gradientTo: "#d4a017",
    emoji: "✨",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop&auto=format",
    path: "/gift-sets",
    highlights: ["Gold Foil Box", "3 Chocolates + 3 Snacks", "Save ₹600"],
    weight: "6-piece",
    stock: "Low Stock",
    isGift: true,
    giftNote: "Gold-embossed luxury box",
  },
  {
    id: "g4",
    category: "gift",
    name: "Mini Surprise Set",
    subtitle: "Starter Gift · 3-piece",
    price: 899,
    originalPrice: 1149,
    rating: 4.8,
    reviews: 145,
    tag: "Budget Pick",
    tagColor: "#1565c0",
    badge: "🎀",
    accent: "#1565c0",
    bg: "from-[#eff3ff] to-[#dde8ff]",
    borderColor: "#99b8f0",
    gradientFrom: "#1565c0",
    gradientTo: "#1976d2",
    emoji: "🎀",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&h=600&fit=crop&auto=format",
    path: "/gift-sets",
    highlights: ["Affordable Gift", "Cute Pouch", "Great Starter"],
    weight: "3-piece",
    stock: "In Stock",
    isGift: true,
    giftNote: "Comes in a drawstring pouch",
  },
];

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Highest Rated",
  "Most Reviewed",
];

const categoryBanners: Record<
  string,
  { title: string; sub: string; color: string; emoji: string }
> = {
  all: {
    title: "Shop All FrostFruit",
    sub: "Three extraordinary product lines. One uncompromising promise — real fruit, zero additives, maximum flavor.",
    color: "#e85d26",
    emoji: "✨",
  },
  "powder-chunks": {
    title: "Fruit Powder & Chunks",
    sub: "100% whole fruit in two essential forms. Concentrated powders for your recipes or crunchy chunks for on-the-go snacking.",
    color: "#e85d26",
    emoji: "🍓",
  },
  chocolate: {
    title: "Chocolate with Freeze Dried Fruit",
    sub: "Premium single-origin chocolate elevated with tangy, crunchy freeze-dried fruit.",
    color: "#4a1a0a",
    emoji: "🍫",
  },
  combo: {
    title: "Value Combo Packs",
    sub: "More flavors, bigger savings. Curated bundles that give you the best of FrostFruit at unbeatable prices.",
    color: "#0a7a4a",
    emoji: "📦",
  },
  gift: {
    title: "Gift Sets & Hampers",
    sub: "Beautifully boxed and ready to delight. The perfect gift for every occasion — from birthdays to corporate.",
    color: "#9b1d6a",
    emoji: "🎁",
  },
};

const categoryCards = [
  {
    id: "powder-chunks",
    label: "Powder & Chunks",
    emoji: "🍓",
    count: 8,
    color: "#e85d26",
    bg: "from-[#fff2ee] to-[#ffe8df]",
    border: "#f5cfc0",
    gradientFrom: "#e85d26",
    gradientTo: "#f4a435",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop&auto=format",
    desc: "100% pure freeze-dried goodness",
  },
  {
    id: "chocolate",
    label: "Chocolate",
    emoji: "🍫",
    count: 4,
    color: "#4a1a0a",
    bg: "from-[#fdf6f0] to-[#f5e8dc]",
    border: "#e0c8b0",
    gradientFrom: "#4a1a0a",
    gradientTo: "#8b4513",
    image:
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&h=400&fit=crop&auto=format",
    desc: "Single-origin chocolate bars",
  },
  {
    id: "combo",
    label: "Combo Packs",
    emoji: "📦",
    count: 4,
    color: "#0a7a4a",
    bg: "from-[#edfff6] to-[#d4f5e5]",
    border: "#9de0c0",
    gradientFrom: "#0a7a4a",
    gradientTo: "#27ae60",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop&auto=format",
    desc: "Curated bundles, bigger savings",
  },
  {
    id: "gift",
    label: "Gift Sets",
    emoji: "🎁",
    count: 4,
    color: "#9b1d6a",
    bg: "from-[#fdf0f8] to-[#f8e0f0]",
    border: "#e8b0d8",
    gradientFrom: "#9b1d6a",
    gradientTo: "#c0396a",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=400&fit=crop&auto=format",
    desc: "Beautifully boxed, ready to gift",
  },
];

// ─── Safe Category Card Image ─────────────────────────────────────────────────

function CatImg({
  cat,
  selected,
}: {
  cat: (typeof categoryCards)[0];
  selected: boolean;
}) {
  const [broken, setBroken] = useState(false);
  return broken ? (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${cat.gradientFrom}, ${cat.gradientTo})`,
      }}
    >
      <span style={{ fontSize: "3rem" }}>{cat.emoji}</span>
    </div>
  ) : (
    <img
      src={cat.image}
      alt={cat.label}
      className={`w-full h-full object-cover transition-all duration-500 ${
        selected ? "opacity-100" : "opacity-80 group-hover:opacity-100"
      } group-hover:scale-105`}
      onError={() => setBroken(true)}
    />
  );
}

// ─── Combo Badge strip ─────────────────────────────────────────────────────────

function ComboStrip({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 mb-3">
      {items.map((item) => (
        <span
          key={item}
          className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-[#f0faf5] text-[#0a7a4a] border border-[#0a7a4a30]"
        >
          ✓ {item}
        </span>
      ))}
    </div>
  );
}

// ─── Gift badge ───────────────────────────────────────────────────────────────

function GiftNote({ note }: { note: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-xl bg-[#fdf0f8] border border-[#e8b0d830]">
      <span className="text-[10px]">🎀</span>
      <span className="text-[10px] font-semibold text-[#9b1d6a]">{note}</span>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  index,
}: {
  product: (typeof allProducts)[0];
  index: number;
}) {
  const [wished, setWished] = useState(false);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{
        duration: 0.45,
        delay: index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-shadow duration-300"
      style={{
        borderColor: product.borderColor,
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      }}
    >
      {/* Gift ribbon decoration */}
      {product.isGift && (
        <div
          className="absolute top-0 left-0 right-0 h-1 z-20"
          style={{
            background: `linear-gradient(90deg, ${product.gradientFrom}, ${product.gradientTo})`,
          }}
        />
      )}

      {/* ── Image ── */}
      <div
        className={`relative h-52 bg-gradient-to-br ${product.bg} overflow-hidden`}
      >
        {/* Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full text-white shadow-sm"
            style={{ backgroundColor: product.tagColor }}
          >
            {product.badge} {product.tag}
          </span>
        </div>

        {/* Discount */}
        <div className="absolute top-3 right-9 z-10">
          <span className="inline-block px-2 py-0.5 bg-[#1a1a1a] text-white text-[10px] font-bold rounded-full">
            -{discount}%
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 z-10 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
        >
          <Heart
            className="w-3 h-3 transition-colors duration-200"
            fill={wished ? "#e85d26" : "none"}
            stroke={wished ? "#e85d26" : "#aaa"}
          />
        </button>

        {/* The image — with emoji+gradient fallback */}
        <SafeImg
          src={product.image}
          alt={product.name}
          emoji={product.emoji}
          gradientFrom={product.gradientFrom}
          gradientTo={product.gradientTo}
          className="group-hover:scale-105 transition-transform duration-500"
        />

        {/* Low Stock pill */}
        {product.stock === "Low Stock" && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#e85d26] text-[10px] font-bold rounded-full border border-[#f0d9c8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e85d26] animate-pulse inline-block" />
              Low Stock
            </span>
          </div>
        )}

        {/* Quick view on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center z-20">
          <Link
            to={product.path}
            className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#1a1a1a] text-xs font-bold rounded-full shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </Link>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-serif text-base font-bold text-[#1a1a1a] leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-[#9a8a7a] mt-0.5">{product.subtitle}</p>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="w-3 h-3"
                fill={s <= Math.round(product.rating) ? "#f4a435" : "#e0d5c8"}
                stroke="none"
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#4a3a2a]">
            {product.rating}
          </span>
          <span className="text-xs text-[#9a8a7a]">({product.reviews})</span>
        </div>

        {/* Combo items strip */}
        {product.comboItems && <ComboStrip items={product.comboItems} />}

        {/* Gift note */}
        {product.giftNote && <GiftNote note={product.giftNote} />}

        {/* Highlight chips — only if no combo items or gift note */}
        {!product.comboItems && !product.giftNote && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.highlights.map((h) => (
              <span
                key={h}
                className="px-2 py-0.5 text-[10px] font-semibold rounded-full border"
                style={{
                  color: product.accent,
                  backgroundColor: `${product.accent}12`,
                  borderColor: `${product.accent}30`,
                }}
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Highlight chips for combos/gifts (smaller, below combo strip) */}
        {(product.comboItems || product.giftNote) && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.highlights.map((h) => (
              <span
                key={h}
                className="px-2 py-0.5 text-[10px] font-semibold rounded-full border"
                style={{
                  color: product.accent,
                  backgroundColor: `${product.accent}12`,
                  borderColor: `${product.accent}30`,
                }}
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#1a1a1a]">
                ₹{product.price}
              </span>
              <span className="text-xs text-[#bbb] line-through">
                ₹{product.originalPrice}
              </span>
            </div>
            <p className="text-[10px] text-[#9a8a7a]">
              {product.weight} · Free ship ₹499+
            </p>
          </div>
          <Link
            to={product.path}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
            style={{
              backgroundColor: product.accent,
              boxShadow: `0 4px 12px ${product.accent}40`,
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {product.isGift ? "Gift Now" : "Buy Now"}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Combo Section Banner ─────────────────────────────────────────────────────

function ComboBanner() {
  return (
    <section className="px-6 lg:px-8 py-10 bg-gradient-to-br from-[#edfff6] to-[#d4f5e5]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-3xl bg-white border border-[#9de0c0] p-8 lg:p-12 shadow-lg">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#edfff6] text-[#0a7a4a] text-xs font-bold uppercase tracking-widest rounded-full border border-[#9de0c0] mb-4">
              <Package className="w-3.5 h-3.5" />
              Combo Packs
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-3">
              More Flavors,{" "}
              <span className="text-[#0a7a4a]">Bigger Savings</span>
            </h2>
            <p className="text-[#4a5a4a] text-sm leading-relaxed mb-6 max-w-lg">
              Can't choose just one? Our combos bundle the best of FrostFruit —
              handpicked for taste, nutrition, and value. Save up to 25% versus
              buying individually.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Up to 25% Off", icon: "💰" },
                { label: "Free Shipping", icon: "🚀" },
                { label: "Mix & Match", icon: "🎨" },
                { label: "Best Value", icon: "⭐" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#edfff6] text-[#0a7a4a] text-xs font-bold rounded-full border border-[#9de0c0]"
                >
                  {b.icon} {b.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-3 w-full lg:w-auto lg:max-w-xs">
            {[
              { label: "Powder Trio", save: "₹300", emoji: "🌸" },
              { label: "Snacker's Bundle", save: "₹357", emoji: "🍓" },
              { label: "Choco Duo", save: "₹199", emoji: "🍫" },
              { label: "Sampler", save: "₹525", emoji: "✨" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#edfff6] rounded-2xl p-4 text-center border border-[#9de0c0]"
              >
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-[10px] font-bold text-[#1a1a1a] leading-tight">
                  {item.label}
                </div>
                <div className="text-[10px] font-bold text-[#0a7a4a] mt-1">
                  Save {item.save}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gift Section Banner ──────────────────────────────────────────────────────

function GiftBanner() {
  return (
    <section className="px-6 lg:px-8 py-10 bg-gradient-to-br from-[#fdf0f8] to-[#f5e0f0]">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #2d0a1a 0%, #5a1035 50%, #9b1d6a 100%)",
            boxShadow: "0 20px 60px rgba(155,29,106,0.3)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(#f4a435, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(#e85d26, transparent)" }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            {/* Left text */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-[#f4d0e8] text-xs font-bold uppercase tracking-widest rounded-full border border-white/20 mb-5">
                🎁 Gift Sets & Hampers
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-3">
                Gift Someone
                <br />
                <span style={{ color: "#f4a435" }}>Unforgettable.</span>
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
                Every gift box is hand-packed, ribbon-wrapped, and paired with a
                personalised message card. Perfect for birthdays, festivals,
                thank-yous, and everything in between.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                {[
                  { label: "Luxury Packaging", icon: "🎀" },
                  { label: "Personalised Card", icon: "✉️" },
                  { label: "Same-Day Dispatch", icon: "⚡" },
                  { label: "Corporate Orders", icon: "🏢" },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/20"
                  >
                    {b.icon} {b.label}
                  </span>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(90deg, #e85d26, #f4a435)",
                }}
              >
                Order a Custom Gift Box <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: gift occasion pills */}
            <div className="flex-shrink-0 w-full lg:w-72">
              <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-3 text-center lg:text-left">
                Perfect for every occasion
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {[
                  "🎂 Birthdays",
                  "🪔 Diwali",
                  "💐 Mother's Day",
                  "🎄 Christmas",
                  "💍 Weddings",
                  "🤝 Corporate",
                  "🏥 Get Well Soon",
                  "🎓 Graduation",
                  "❤️ Anniversary",
                  "🎉 Just Because",
                ].map((occ) => (
                  <span
                    key={occ}
                    className="px-3 py-1.5 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-200 cursor-default"
                  >
                    {occ}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("Featured");
  const [showSort, setShowSort] = useState(false);

  const banner = categoryBanners[activeCategory];

  const filtered = allProducts
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Highest Rated") return b.rating - a.rating;
      if (sortBy === "Most Reviewed") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />

      {/* ── Page Header ── */}
      <section className="pt-28 pb-10 px-6 lg:px-8 bg-white border-b border-[#ede5dc]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fdf3ec] text-[#e85d26] text-xs font-bold uppercase tracking-widest rounded-full border border-[#f0d9c8] mb-5">
              <Leaf className="w-3.5 h-3.5" />
              FrostFruit Shop
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-3">
              All Products
            </h1>
            <p className="text-[#6a5a4a] text-base max-w-xl mx-auto">
              Real fruit. Zero additives. Maximum flavor. — Browse our full
              collection below.
            </p>
          </motion.div>

          {/* ── Category Cards — 3 + 2 grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {categoryCards.slice(0, 3).map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "scale-[1.02] shadow-xl"
                    : "hover:scale-[1.01] hover:shadow-lg"
                }`}
                style={{
                  borderColor:
                    activeCategory === cat.id ? cat.color : cat.border,
                  boxShadow:
                    activeCategory === cat.id
                      ? `0 8px 32px ${cat.color}30`
                      : undefined,
                }}
              >
                <div
                  className={`h-40 bg-gradient-to-br ${cat.bg} relative overflow-hidden`}
                >
                  <CatImg cat={cat} selected={activeCategory === cat.id} />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${cat.color}60 0%, transparent 70%)`,
                    }}
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span style={{ fontSize: "2rem" }}>{cat.emoji}</span>
                  </div>
                  {activeCategory === cat.id && (
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className="inline-block px-2.5 py-1 text-[10px] font-bold text-white rounded-full uppercase tracking-wider"
                        style={{ backgroundColor: cat.color }}
                      >
                        Selected
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1a1a1a]">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-[#9a8a7a] mt-0.5">
                        {cat.desc}
                      </p>
                    </div>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.count}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Combo + Gift cards row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categoryCards.slice(3).map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "scale-[1.02] shadow-xl"
                    : "hover:scale-[1.01] hover:shadow-lg"
                }`}
                style={{
                  borderColor:
                    activeCategory === cat.id ? cat.color : cat.border,
                  boxShadow:
                    activeCategory === cat.id
                      ? `0 8px 32px ${cat.color}30`
                      : undefined,
                }}
              >
                <div
                  className={`h-40 bg-gradient-to-br ${cat.bg} relative overflow-hidden`}
                >
                  <CatImg cat={cat} selected={activeCategory === cat.id} />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${cat.color}60 0%, transparent 70%)`,
                    }}
                  />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span style={{ fontSize: "2rem" }}>{cat.emoji}</span>
                    {/* Special badge for combo/gift */}
                    <span
                      className="px-2 py-0.5 text-[9px] font-bold text-white rounded-full uppercase tracking-wider"
                      style={{ backgroundColor: cat.color + "cc" }}
                    >
                      {cat.id === "combo" ? "Best Value" : "Gifting"}
                    </span>
                  </div>
                  {activeCategory === cat.id && (
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className="inline-block px-2.5 py-1 text-[10px] font-bold text-white rounded-full uppercase tracking-wider"
                        style={{ backgroundColor: cat.color }}
                      >
                        Selected
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1a1a1a]">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-[#9a8a7a] mt-0.5">
                        {cat.desc}
                      </p>
                    </div>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.count}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Filter + Sort Bar ── */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#ede5dc] px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-md"
                    : "bg-white text-[#4a3a2a] border-[#e0d8d0] hover:border-[#1a1a1a]"
                }`}
              >
                {cat.emoji} {cat.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-[#f0e8de] text-[#9a8a7a]"
                  }`}
                >
                  {cat.id === "all"
                    ? allProducts.length
                    : allProducts.filter((p) => p.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#e0d8d0] text-xs font-semibold text-[#4a3a2a] hover:border-[#1a1a1a] transition-colors duration-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {sortBy}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${showSort ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#e8ddd5] overflow-hidden z-50"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setShowSort(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-xs font-semibold transition-colors duration-150 ${
                        sortBy === opt
                          ? "bg-[#fdf3ec] text-[#e85d26]"
                          : "text-[#4a3a2a] hover:bg-[#faf8f5]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Dynamic Banner ── */}
      <section className="px-6 lg:px-8 pt-8 pb-2">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between flex-wrap gap-4 mb-6"
            >
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1a1a1a]">
                  {banner.emoji} {banner.title}
                </h2>
                <p className="text-sm text-[#6a5a4a] mt-1">{banner.sub}</p>
              </div>
              <div className="flex items-center gap-6">
                {[
                  { label: "Products", value: String(filtered.length) },
                  { label: "Avg Rating", value: "4.8★" },
                  { label: "Customers", value: "2k+" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-bold text-[#1a1a1a] font-serif">
                      {s.value}
                    </div>
                    <div className="text-[11px] text-[#9a8a7a]">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Combo Section Banner (shown for all or combo) ── */}
      {(activeCategory === "all" || activeCategory === "combo") && (
        <ComboBanner />
      )}

      {/* ── Gift Section Banner (shown for all or gift) ── */}
      {(activeCategory === "all" || activeCategory === "gift") && (
        <GiftBanner />
      )}

      {/* ── Product Grid ── */}
      <section className="pb-16 px-6 lg:px-8 pt-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-[#9a8a7a] font-medium mb-5">
            Showing{" "}
            <span className="text-[#1a1a1a] font-bold">{filtered.length}</span>{" "}
            products · Sorted by{" "}
            <span className="font-semibold text-[#4a3a2a]">{sortBy}</span>
          </p>
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Marquee ── */}
      <section className="py-4 bg-[#1a1a1a] overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 24s linear infinite" }}
        >
          {[...Array(2)]
            .flatMap(() => [
              { icon: Shield, label: "No Preservatives" },
              { icon: Leaf, label: "100% Natural" },
              { icon: BadgeCheck, label: "Non-GMO Certified" },
              { icon: Sparkles, label: "Gluten Free" },
              { icon: Zap, label: "97% Nutrients Retained" },
              { icon: Star, label: "Lab Tested & Verified" },
            ])
            .map((b, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <b.icon className="w-3.5 h-3.5 text-[#f4a435]" />
                <span className="text-white text-[11px] font-semibold uppercase tracking-widest">
                  {b.label}
                </span>
                <span className="text-white/25 ml-4">·</span>
              </div>
            ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 lg:px-8 bg-[#fff7f2]">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-10 lg:p-14 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #2c1a0e 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(#e85d26, transparent)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(#f4a435, transparent)" }}
            />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-white/10 text-[#f4a435] text-xs font-bold uppercase tracking-widest rounded-full border border-white/20 mb-5">
                🎁 Not Sure Where to Start?
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-3">
                Try Our Sampler Pack
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                One pack. All three categories — powder, chunks & chocolate.
                Discover your favourite FrostFruit product with free delivery.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#e85d26] to-[#f4a435] text-white font-bold rounded-full text-sm hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  Get the Sampler <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

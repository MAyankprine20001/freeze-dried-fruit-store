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
  CheckCircle2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

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
  { id: "smoothie-premix", label: "Smoothie Premix", emoji: "🥤" },
  { id: "chocolate", label: "Chocolates", emoji: "🍫" },
  { id: "fruit-chunks", label: "Fruit Chunks", emoji: "🍓" },
  { id: "fruit-powders", label: "Fruit Powders", emoji: "🌟" },
  { id: "combo", label: "Combos", emoji: "📦" },
  { id: "gift", label: "Gifts", emoji: "🎁" },
];

const allProducts = [
  // ── FRUIT POWDERS ────────────────────────────────────────────────────────
  {
    id: "p1",
    category: "fruit-powders",
    name: "Strawberry Powder",
    subtitle: "FreezeFusion · 100g",
    price: 349,
    originalPrice: 449,
    rating: 4.8,
    reviews: 156,
    tag: "Vibrant",
    tagColor: "#e84444",
    badge: "🍓",
    accent: "#e84444",
    bg: "from-[#fff2f2] to-[#ffe0e0]",
    borderColor: "#f5c0c0",
    gradientFrom: "#e84444",
    gradientTo: "#c0392b",
    emoji: "🍓",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&fit=crop",
    path: "/fruit-powders",
    highlights: ["Smoothie Ready", "Baking Grade", "100% Pure"],
    weight: "100g",
    stock: "In Stock",
  },
  {
    id: "p2",
    category: "fruit-powders",
    name: "Mango Powder",
    subtitle: "FreezeFusion · 100g",
    price: 379,
    originalPrice: 479,
    rating: 4.9,
    reviews: 189,
    tag: "Tropical",
    tagColor: "#f4a435",
    badge: "🥭",
    accent: "#f4a435",
    bg: "from-[#fffaee] to-[#fff0cc]",
    borderColor: "#f5e0a0",
    gradientFrom: "#f4a435",
    gradientTo: "#f39c12",
    emoji: "🥭",
    image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=600&fit=crop",
    path: "/fruit-powders",
    highlights: ["King of Fruits", "Natural Color", "Perfect Base"],
    weight: "100g",
    stock: "In Stock",
  },
  {
    id: "p3",
    category: "fruit-powders",
    name: "Banana Powder",
    subtitle: "FreezeFusion · 100g",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviews: 124,
    tag: "Energizing",
    tagColor: "#f1c40f",
    badge: "🍌",
    accent: "#d4af37",
    bg: "from-[#fffdf0] to-[#fff8d0]",
    borderColor: "#f0e090",
    gradientFrom: "#f1c40f",
    gradientTo: "#f39c12",
    emoji: "🍌",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed2bb4?w=600&fit=crop",
    path: "/fruit-powders",
    highlights: ["High Fiber", "Baby Food Safe", "Natural Sweetener"],
    weight: "100g",
    stock: "In Stock",
  },
  {
    id: "p4",
    category: "fruit-powders",
    name: "Jamun Powder",
    subtitle: "FreezeFusion · 100g",
    price: 449,
    originalPrice: 549,
    rating: 4.9,
    reviews: 87,
    tag: "Superfood",
    tagColor: "#4b0082",
    badge: "🫐",
    accent: "#4b0082",
    bg: "from-[#f3f0ff] to-[#e6e0ff]",
    borderColor: "#d0c0f5",
    gradientFrom: "#4b0082",
    gradientTo: "#6a5acd",
    emoji: "🍇",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&fit=crop",
    path: "/fruit-powders",
    highlights: ["Antioxidant Rich", "Pure Indian Berry", "Health Boost"],
    weight: "100g",
    stock: "In Stock",
  },

  // ── FRUIT CHUNKS ──────────────────────────────────────────────────────────
  {
    id: "c1",
    category: "fruit-chunks",
    name: "Strawberry Chunks",
    subtitle: "FreezeFusion · 150g",
    price: 329,
    originalPrice: 429,
    rating: 4.8,
    reviews: 214,
    tag: "Crunchy",
    tagColor: "#e84444",
    badge: "🍓",
    accent: "#e84444",
    bg: "from-[#fff2f2] to-[#ffe0e0]",
    borderColor: "#f5c0c0",
    gradientFrom: "#e84444",
    gradientTo: "#c0392b",
    emoji: "🍓",
    image: "https://images.unsplash.com/photo-1543528176-61b239494933?w=600&fit=crop",
    path: "/fruit-chunks",
    highlights: ["Bite-Sized", "Sweet & Tart", "Healthy Snack"],
    weight: "150g",
    stock: "In Stock",
  },
  {
    id: "c2",
    category: "fruit-chunks",
    name: "Banana Chunks",
    subtitle: "FreezeFusion · 150g",
    price: 289,
    originalPrice: 389,
    rating: 4.7,
    reviews: 145,
    tag: "Energy",
    tagColor: "#f1c40f",
    badge: "🍌",
    accent: "#d4af37",
    bg: "from-[#fffdf0] to-[#fff8d0]",
    borderColor: "#f0e090",
    gradientFrom: "#f1c40f",
    gradientTo: "#f39c12",
    emoji: "🍌",
    image: "https://images.unsplash.com/photo-1550586671-f71ee155799b?w=600&fit=crop",
    path: "/fruit-chunks",
    highlights: ["Potassium Rich", "Kid's Pick", "Perfect Crunch"],
    weight: "150g",
    stock: "In Stock",
  },
  {
    id: "c3",
    category: "fruit-chunks",
    name: "Mango Chunks",
    subtitle: "FreezeFusion · 150g",
    price: 349,
    originalPrice: 449,
    rating: 4.9,
    reviews: 198,
    tag: "Tropical",
    tagColor: "#f4a435",
    badge: "🥭",
    accent: "#f4a435",
    bg: "from-[#fffaee] to-[#fff0cc]",
    borderColor: "#f5e0a0",
    gradientFrom: "#f4a435",
    gradientTo: "#e67e22",
    emoji: "🥭",
    image: "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=600&fit=crop",
    path: "/fruit-chunks",
    highlights: ["Alphonso Quality", "Sun-Drenched", "Intensely Sweet"],
    weight: "150g",
    stock: "In Stock",
  },
  {
    id: "c4",
    category: "fruit-chunks",
    name: "Blueberry Chunks",
    subtitle: "FreezeFusion · 150g",
    price: 399,
    originalPrice: 499,
    rating: 4.8,
    reviews: 132,
    tag: "Brain Food",
    tagColor: "#6c5ce7",
    badge: "🫐",
    accent: "#6c5ce7",
    bg: "from-[#f4f2ff] to-[#e8e4ff]",
    borderColor: "#c8c0f0",
    gradientFrom: "#6c5ce7",
    gradientTo: "#4a3ab0",
    emoji: "🫐",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&fit=crop",
    path: "/fruit-chunks",
    highlights: ["Antioxidants", "Wild Grown", "Tart Pop"],
    weight: "150g",
    stock: "In Stock",
  },
  {
    id: "c5",
    category: "fruit-chunks",
    name: "Pomegranate Chunks",
    subtitle: "FreezeFusion · 150g",
    price: 379,
    originalPrice: 479,
    rating: 4.8,
    reviews: 96,
    tag: "Premium",
    tagColor: "#c0392b",
    badge: "🍎",
    accent: "#c0392b",
    bg: "from-[#fff2f2] to-[#ffe8e4]",
    borderColor: "#f0c8c0",
    gradientFrom: "#c0392b",
    gradientTo: "#7b2d2d",
    emoji: "🍎",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&fit=crop",
    path: "/fruit-chunks",
    highlights: ["Heart Health", "Ruby Seeds", "Juicy Crunch"],
    weight: "150g",
    stock: "In Stock",
  },
  {
    id: "c6",
    category: "fruit-chunks",
    name: "Raspberry Chunks",
    subtitle: "FreezeFusion · 150g",
    price: 389,
    originalPrice: 489,
    rating: 4.9,
    reviews: 112,
    tag: "Berry Luxe",
    tagColor: "#e84393",
    badge: "🍓",
    accent: "#e84393",
    bg: "from-[#fff0f6] to-[#ffdeeb]",
    borderColor: "#f5c0d8",
    gradientFrom: "#e84393",
    gradientTo: "#d63031",
    emoji: "🍓",
    image: "https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e?w=600&fit=crop",
    path: "/fruit-chunks",
    highlights: ["Floral Note", "Velvet Feel", "Tart Zest"],
    weight: "150g",
    stock: "In Stock",
  },
  {
    id: "c7",
    category: "fruit-chunks",
    name: "Mulberry Chunks",
    subtitle: "FreezeFusion · 150g",
    price: 349,
    originalPrice: 449,
    rating: 4.7,
    reviews: 84,
    tag: "Wild Pick",
    tagColor: "#4b0082",
    badge: "🫐",
    accent: "#4b0082",
    bg: "from-[#f3f0ff] to-[#e6e0ff]",
    borderColor: "#d0c0f5",
    gradientFrom: "#4b0082",
    gradientTo: "#6a5acd",
    emoji: "🍇",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&fit=crop",
    path: "/fruit-chunks",
    highlights: ["Iron Rich", "Earthy Sweet", "Rare Find"],
    weight: "150g",
    stock: "In Stock",
  },
  {
    id: "c8",
    category: "fruit-chunks",
    name: "Cranberry Chunks",
    subtitle: "FreezeFusion · 150g",
    price: 329,
    originalPrice: 429,
    rating: 4.6,
    reviews: 78,
    tag: "Tangy",
    tagColor: "#c0392b",
    badge: "🍒",
    accent: "#c0392b",
    bg: "from-[#fff5f5] to-[#ffe5e5]",
    borderColor: "#f5d0d0",
    gradientFrom: "#c0392b",
    gradientTo: "#e74c3c",
    emoji: "🍒",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&fit=crop",
    path: "/fruit-chunks",
    highlights: ["Vitamin E Boost", "Bold Red", "Super Tangy"],
    weight: "150g",
    stock: "In Stock",
  },

  // ── CHOCOLATE (FREEZEFUSION) ──────────────────────────────────────────────
  {
    id: "ch1",
    category: "chocolate",
    name: "Strawberry Cream Crunch",
    subtitle: "FreezeFusion · 25g each",
    price: 449,
    originalPrice: 549,
    rating: 5.0,
    reviews: 124,
    tag: "Luxe Treat",
    tagColor: "#4a1a0a",
    badge: "🍓",
    accent: "#4a1a0a",
    bg: "from-[#fdf6f0] to-[#f5e8dc]",
    borderColor: "#e0c8b0",
    gradientFrom: "#4a1a0a",
    gradientTo: "#8b4513",
    emoji: "🍫",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&fit=crop",
    path: "/chocolate",
    highlights: ["Real Couverture", "Strawberry Burst", "Artisan Bar"],
    weight: "25g x 3",
    stock: "In Stock",
  },
  {
    id: "ch2",
    category: "chocolate",
    name: "Mango Silk White",
    subtitle: "FreezeFusion · Couverture Base",
    price: 469,
    originalPrice: 569,
    rating: 4.9,
    reviews: 92,
    tag: "Silky",
    tagColor: "#e8950a",
    badge: "🥭",
    accent: "#e8950a",
    bg: "from-[#fffaee] to-[#fff0cc]",
    borderColor: "#f5e0a0",
    gradientFrom: "#f4a435",
    gradientTo: "#c47a05",
    emoji: "🍫",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&fit=crop",
    path: "/chocolate",
    highlights: ["White Cocoa Butter", "Exotic Mango", "Smooth Finish"],
    weight: "80g Bar",
    stock: "In Stock",
  },
  {
    id: "ch3",
    category: "chocolate",
    name: "Blueberry Dual Swirl",
    subtitle: "FreezeFusion · Dark & White Mix",
    price: 489,
    originalPrice: 589,
    rating: 5.0,
    reviews: 86,
    tag: "Visual Bliss",
    tagColor: "#6c5ce7",
    badge: "🫐",
    accent: "#6c5ce7",
    bg: "from-[#f4f2ff] to-[#e8e4ff]",
    borderColor: "#c8c0f0",
    gradientFrom: "#6c5ce7",
    gradientTo: "#4a3ab0",
    emoji: "🍫",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&fit=crop",
    path: "/chocolate",
    highlights: ["Marbled Chocolate", "Wild Blueberry", "Rich Contrast"],
    weight: "80g Bar",
    stock: "In Stock",
  },
  {
    id: "ch4",
    category: "chocolate",
    name: "Banana Cocoa Dark",
    subtitle: "FreezeFusion · 70% Dark",
    price: 429,
    originalPrice: 529,
    rating: 4.8,
    reviews: 64,
    tag: "Bold Energy",
    tagColor: "#1a1a1a",
    badge: "🍌",
    accent: "#1a1a1a",
    bg: "from-[#fafafa] to-[#f0f0f0]",
    borderColor: "#e0e0e0",
    gradientFrom: "#1a1a1a",
    gradientTo: "#3d3d3d",
    emoji: "🍫",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&fit=crop",
    path: "/chocolate",
    highlights: ["High Cacao", "Energizing Banana", "Guilt-Free"],
    weight: "80g Bar",
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
    name: "The The Dry Factory Sampler",
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
  // ── SMOOTHIE PREMIX ──────────────────────────────────────────────────────
  {
    id: "s1",
    category: "smoothie-premix",
    name: "Berry Blast",
    subtitle: "Mixed berries bursting with flavours",
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviews: 245,
    tag: "Nutrient Rich",
    tagColor: "#e84393",
    badge: "🫐",
    accent: "#e84393",
    bg: "from-[#fff0f6] to-[#ffdeeb]",
    borderColor: "#f5c0d8",
    gradientFrom: "#e84393",
    gradientTo: "#d63031",
    emoji: "🫐",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&h=600&fit=crop&auto=format",
    path: "/smoothie-premix",
    highlights: ["Antioxidant Rich", "200ml each", "Quick Prep"],
    weight: "200ml per serving",
    stock: "In Stock",
  },
  {
    id: "s2",
    category: "smoothie-premix",
    name: "Strawberry Bliss",
    subtitle: "Sweet and tangy strawberry delight",
    price: 379,
    originalPrice: 479,
    rating: 4.8,
    reviews: 182,
    tag: "Kids Favorite",
    tagColor: "#e84444",
    badge: "🍓",
    accent: "#e84444",
    bg: "from-[#fff2f2] to-[#ffe0e0]",
    borderColor: "#f5c0c0",
    gradientFrom: "#e84444",
    gradientTo: "#c0392b",
    emoji: "🍓",
    image:
      "https://images.unsplash.com/photo-1510629954389-c1e0da47d414?w=600&h=600&fit=crop&auto=format",
    path: "/smoothie-premix",
    highlights: ["Vitamin C Plus", "Creamy Texture", "Natural Sweetness"],
    weight: "200ml serving",
    stock: "In Stock",
  },
  {
    id: "s3",
    category: "smoothie-premix",
    name: "Royal Mango",
    subtitle: "Tropical Mango indulgence",
    price: 429,
    originalPrice: 529,
    rating: 4.9,
    reviews: 156,
    tag: "Premium",
    tagColor: "#f4a435",
    badge: "🥭",
    accent: "#f4a435",
    bg: "from-[#fffaee] to-[#fff0cc]",
    borderColor: "#f5e0a0",
    gradientFrom: "#f4a435",
    gradientTo: "#e67e22",
    emoji: "🥭",
    image:
      "https://images.unsplash.com/photo-1550586671-f71ee155799b?w=600&h=600&fit=crop&auto=format",
    path: "/smoothie-premix",
    highlights: ["Alphonso Goodness", "Sun-Ripened", "Smooth Texture"],
    weight: "200ml serving",
    stock: "In Stock",
  },
  {
    id: "s4",
    category: "smoothie-premix",
    name: "Banana Power",
    subtitle: "Creamy, energising banana boost",
    price: 349,
    originalPrice: 449,
    rating: 4.7,
    reviews: 124,
    tag: "High Energy",
    tagColor: "#f1c40f",
    badge: "🍌",
    accent: "#d4af37",
    bg: "from-[#fffdf0] to-[#fff8d0]",
    borderColor: "#f0e090",
    gradientFrom: "#f1c40f",
    gradientTo: "#f39c12",
    emoji: "🍌",
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed2bb4?w=600&h=600&fit=crop&auto=format",
    path: "/smoothie-premix",
    highlights: ["Potassium Rich", "Post-Workout", "Satisfyingly Sweet"],
    weight: "200ml serving",
    stock: "In Stock",
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
    title: "Shop All Products",
    sub: "Four extraordinary product lines. One uncompromising promise — real fruit, zero additives, maximum flavor.",
    color: "#D4AF37",
    emoji: "✨",
  },
  "smoothie-premix": {
    title: "Smoothie Premix – SipReal",
    sub: "Real Taste. Real nutrition. Just SipReal · NO ADDED SUGAR, NO PRESERVATIVE · Ready in 10 seconds",
    color: "#D4AF37",
    emoji: "🥤",
  },

  chocolate: {
    title: "Chocolates – FreezeFusion",
    sub: "Crafted with real fruits and rich couverture chocolate · PERFECT FOR: PREMIUM GIFTING, HEALTHY SNACKING",
    color: "#D4AF37",
    emoji: "🍫",
  },
  "fruit-chunks": {
    title: "Fruit Chunks – FreezeFusion",
    sub: "Intensely flavored crunchy chunks. 100% whole fruit, zero additives. Perfect for healthy snacking on the go.",
    color: "#D4AF37",
    emoji: "🍓",
  },
  "fruit-powders": {
    title: "Fruit Powders – FreezeFusion",
    sub: "Concentrated fruit essence in fine powder form. Perfect for smoothies, baking, and natural nutrient boosts.",
    color: "#D4AF37",
    emoji: "🌟",
  },
  combo: {
    title: "Combos & Bundles",
    sub: "More flavors, bigger savings. Curated bundles that give you the best of our range at unbeatable prices.",
    color: "#D4AF37",
    emoji: "📦",
  },
  gift: {
    title: "Gifts – Coming Soon",
    sub: "Curated gift sets and premium hampers for your special occasions. Opening soon!",
    color: "#D4AF37",
    emoji: "🎁",
  },
};

const categoryCards = [
  {
    id: "smoothie-premix",
    label: "Smoothie Premix",
    emoji: "🥤",
    count: 3,
    color: "#D4AF37",
    bg: "from-[#1a1a1a] to-[#000000]",
    border: "rgba(255,255,255,0.1)",
    gradientFrom: "#D4AF37",
    gradientTo: "#BF953F",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&h=400&fit=crop&auto=format",
    desc: "Instant high-nutrient morning fuel",
  },
  {
    id: "chocolate",
    label: "Chocolates",
    emoji: "🍫",
    count: 4,
    color: "#D4AF37",
    bg: "from-[#1a1a1a] to-[#000000]",
    border: "rgba(255,255,255,0.1)",
    gradientFrom: "#D4AF37",
    gradientTo: "#BF953F",
    image:
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&h=400&fit=crop&auto=format",
    desc: "Single-origin chocolate bars",
  },
  {
    id: "combo",
    label: "Combos",
    emoji: "📦",
    count: 4,
    color: "#D4AF37",
    bg: "from-[#1a1a1a] to-[#000000]",
    border: "rgba(255,255,255,0.1)",
    gradientFrom: "#D4AF37",
    gradientTo: "#BF953F",
    image:
      "https://images.unsplash.com/photo-1549007994-cb92cd87dd39?w=600&h=400&fit=crop&auto=format",
    desc: "Curated bundles, bigger savings",
  },
  {
    id: "fruit-chunks",
    label: "Fruit Chunks",
    emoji: "🍓",
    count: 8,
    color: "#D4AF37",
    bg: "from-[#1a1a1a] to-[#000000]",
    border: "rgba(255,255,255,0.1)",
    gradientFrom: "#D4AF37",
    gradientTo: "#BF953F",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&fit=crop",
    desc: "100% crunchy fruit chunks",
  },
  {
    id: "fruit-powders",
    label: "Fruit Powders",
    emoji: "🌟",
    count: 4,
    color: "#D4AF37",
    bg: "from-[#1a1a1a] to-[#000000]",
    border: "rgba(255,255,255,0.1)",
    gradientFrom: "#D4AF37",
    gradientTo: "#BF953F",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&fit=crop",
    desc: "Pure concentrated fruit essence",
  },
  {
    id: "gift",
    label: "Gifts",
    emoji: "🎁",
    count: 0,
    comingSoon: true,
    color: "#D4AF37",
    bg: "from-[#1a1a1a] to-[#000000]",
    border: "rgba(255,255,255,0.1)",
    gradientFrom: "#D4AF37",
    gradientTo: "#BF953F",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&fit=crop",
    desc: "Premium gift hampers & sets",
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
          className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-white/5 text-[#D4AF37] border border-[#D4AF37]/30"
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
    <div className="flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10">
      <span className="text-[10px]">🎀</span>
      <span className="text-[10px] font-semibold text-[#D4AF37]">{note}</span>
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
  const { addToCart } = useCart();
  
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      weight: product.weight
    });
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      progressStyle: { background: product.accent }
    });
  };

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
      className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden border hover:shadow-xl transition-shadow duration-300"
      style={{
        borderColor: "rgba(255,255,255,0.1)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
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
          className="absolute top-3 right-3 z-10 w-6 h-6 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
        >
          <Heart
            className="w-3 h-3 transition-colors duration-200"
            fill={wished ? "#D4AF37" : "none"}
            stroke={wished ? "#D4AF37" : "rgba(255,255,255,0.5)"}
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
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-[#D4AF37] text-[10px] font-bold rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse inline-block" />
              Low Stock
            </span>
          </div>
        )}

        {/* Quick view on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center z-20">
          <Link
            to={product.path}
            className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-full shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </Link>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-serif text-base font-bold text-white leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-white/40 mt-0.5">{product.subtitle}</p>
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
          <span className="text-xs font-semibold text-white/40 ml-1">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-white">
                ₹{product.price}
              </span>
              <span className="text-xs text-white/20 line-through">
                ₹{product.originalPrice}
              </span>
            </div>
            <p className="text-[10px] text-white/40">
              {product.weight} · Free ship ₹499+
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-[#D4AF37] transition-all duration-200 hover:scale-105 hover:bg-[#BF953F] active:scale-95"
            style={{
              boxShadow: `0 4px 12px rgba(212, 175, 55, 0.2)`,
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {product.isGift ? "Gift Now" : "Buy Now"}
          </button>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4 mt-3">
          {product.highlights.map((h) => (
            <span
              key={h}
              className="px-2 py-0.5 bg-white/5 text-white/40 text-[9px] font-bold rounded-full border border-white/10 uppercase tracking-widest"
            >
              {h}
            </span>
          ))}
        </div>

        {(product.comboItems || product.giftNote) && (
          <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
            {product.comboItems && <ComboStrip items={product.comboItems} />}
            {product.giftNote && <GiftNote note={product.giftNote} />}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ComboBanner() {
  return (
    <section className="px-6 lg:px-8 py-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-3xl bg-[#1a1a1a] border border-white/10 p-8 lg:p-12 shadow-lg overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex-1 relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-[#D4AF37] text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 mb-4">
              <Package className="w-3.5 h-3.5" />
              Combo Packs
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-3">
              More Flavors,{" "}
              <span className="text-[#D4AF37]">Bigger Savings</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-lg">
              Can't choose just one? Our combos bundle the best of The Dry Factory —
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/70 text-xs font-bold rounded-full border border-white/10"
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
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"
              >
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-[10px] font-bold text-white leading-tight">
                  {item.label}
                </div>
                <div className="text-[10px] font-bold text-[#D4AF37] mt-1">
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
    <section className="px-6 lg:px-8 py-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl p-8 lg:p-12 relative overflow-hidden border border-white/10"
          style={{
            background:
              "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(#D4AF37, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-5 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(#BF953F, transparent)" }}
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
                <span className="text-[#D4AF37]">Unforgettable.</span>
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(90deg, #D4AF37, #BF953F)",
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

// ── Highlight Category Title ──
function HighlightTitle({ title }: { title: string }) {
  const parts = title.split(" – ");
  if (parts.length < 2) return <>{title}</>;

  return (
    <>
      {parts[0]} –{" "}
      <span className="relative inline-block">
        <span className="relative z-10 px-2">{parts[1]}</span>
        <span 
          className="absolute inset-0 z-0 bg-[#D4AF37]/10 rounded-md -rotate-1 skew-x-2 border border-[#D4AF37]/20" 
        />
      </span>
    </>
  );
}

// ── Smoothie Category Info (Simplified) ──────────────────────────────────────

function SmoothieInfoSection() {
  return (
    <section className="px-6 lg:px-8 py-16 bg-black border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl font-bold text-white">Smoothie Guide</h2>
          <p className="text-sm text-white/40 mt-1">Everything you need to know about SipReal Premixes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-bold text-white uppercase tracking-wider text-xs">Nutrition</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="border-b border-white/10 pb-1">
                <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Added Sugar</p>
                <p className="text-xs font-bold text-white">0g</p>
              </div>
              <div className="border-b border-white/10 pb-1">
                <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Vitamins</p>
                <p className="text-xs font-bold text-white">97% Retained</p>
              </div>
              <div className="border-b border-white/10 pb-1">
                <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Preservatives</p>
                <p className="text-xs font-bold text-white">None</p>
              </div>
              <div className="border-b border-white/10 pb-1">
                <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Nature</p>
                <p className="text-xs font-bold text-white">100% Real</p>
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
    <div className="min-h-screen bg-black">
      <Header />

      {/* ── Page Header ── */}
      <section className="pt-28 pb-10 px-6 lg:px-8 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 text-[#D4AF37] text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 mb-5">
              <Leaf className="w-3.5 h-3.5" />
              The Dry Factory Shop
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-3">
              All Products
            </h1>
            <p className="text-white/70 text-base max-w-xl mx-auto">
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
                <div className="p-4 bg-[#1a1a1a]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-white/40 mt-0.5">
                        {cat.desc}
                      </p>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.comingSoon ? "COMING SOON" : cat.count}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Combo + Gift cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                <div className="p-4 bg-[#1a1a1a]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-white/40 mt-0.5">
                        {cat.desc}
                      </p>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.comingSoon ? "COMING SOON" : cat.count}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Filter + Sort Bar ── */}
      <div className="sticky top-16 lg:top-20 z-30 bg-black/95 backdrop-blur-md border-b border-white/10 px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-md"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-[#D4AF37]"
                }`}
              >
                {cat.emoji} {cat.label}
                <span
                   className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeCategory === cat.id
                      ? "bg-black/20 text-black/70"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {cat.comingSoon
                    ? "TBA"
                    : cat.id === "all"
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
                  className="absolute right-0 top-full mt-2 w-52 bg-black rounded-2xl shadow-xl border border-white/10 overflow-hidden z-50"
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
                          ? "bg-white/10 text-[#D4AF37]"
                          : "text-white/70 hover:bg-white/5"
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

      {/* ── Coming Soon Messenger ── */}
      {categoryCards.find(c => c.id === activeCategory)?.comingSoon && (
        <section className="px-6 lg:px-8 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-4">Opening Soon!</h3>
            <p className="text-[#6a5a4a] leading-relaxed mb-8">
              We're currently perfecting our premium gift sets. These will be available for purchase very soon. Stay tuned!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a1a1a] text-white font-bold rounded-full transition-all hover:scale-105"
            >
              Get Notified <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* ── Product Grid ── */}
      {!categoryCards.find(c => c.id === activeCategory)?.comingSoon && (
        <>
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
                      {banner.emoji} <HighlightTitle title={banner.title} />
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
        </>
      )}

      {/* ── Smoothie Guide (Simplified) ── */}
      {activeCategory === "smoothie-premix" && <SmoothieInfoSection />}

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
                Discover your favourite The Dry Factory product with free delivery.
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

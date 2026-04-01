import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  Star,
  ThumbsUp,
  Filter,
  ChevronDown,
  Leaf,
  Quote,
  CheckCircle,
  Camera,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  MessageSquare,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const overallStats = {
  average: 4.9,
  total: 1284,
  breakdown: [
    { stars: 5, count: 1043, pct: 81 },
    { stars: 4, count: 180, pct: 14 },
    { stars: 3, count: 45, pct: 4 },
    { stars: 2, count: 10, pct: 1 },
    { stars: 1, count: 6, pct: 0 },
  ],
};

const filterCategories = [
  { id: "all", label: "All Reviews", emoji: "✨" },
  { id: "powder", label: "Fruit Powder", emoji: "🌸" },
  { id: "chunks", label: "Fruit Chunks", emoji: "🍓" },
  { id: "chocolate", label: "Chocolate", emoji: "🍫" },
  { id: "combo", label: "Combos", emoji: "📦" },
  { id: "gift", label: "Gift Sets", emoji: "🎁" },
];

const sortOptions = [
  "Most Recent",
  "Most Helpful",
  "Highest Rated",
  "Lowest Rated",
];

const reviewTags = [
  "Great Taste",
  "Amazing Quality",
  "Fast Delivery",
  "Perfect Gift",
  "Kids Love It",
  "Great for Baking",
  "Healthy Snack",
  "Value for Money",
];

const allReviews = [
  {
    id: "r1",
    category: "powder",
    product: "Raspberry Powder",
    productEmoji: "🍓",
    name: "Ananya Sharma",
    location: "Mumbai",
    avatar: "AS",
    avatarColor: "#e85d26",
    rating: 5,
    date: "March 18, 2026",
    title: "Absolutely transformed my morning smoothies!",
    body: "I've been using the raspberry powder for three weeks now and I genuinely can't imagine going back to fresh berries for smoothies. The color is a stunning deep pink and the flavor is SO much more concentrated. I use just one teaspoon and it's like eating a whole punnet of raspberries. My daughter asks for it every morning now.",
    helpful: 142,
    verified: true,
    hasPhoto: true,
    tags: ["Great Taste", "Kids Love It", "Amazing Quality"],
    photoGradient: "from-[#e85d26] to-[#f4a435]",
    photoEmoji: "🍓",
  },
  {
    id: "r2",
    category: "chocolate",
    product: "Dark + Raspberry Bar",
    productEmoji: "🍫",
    name: "Rohit Mehra",
    location: "Delhi",
    avatar: "RM",
    avatarColor: "#4a1a0a",
    rating: 5,
    date: "March 15, 2026",
    title: "Best chocolate I've had in years. Not exaggerating.",
    body: "I'm a self-confessed chocolate snob. I've tried bars from Belgium, Switzerland, everywhere. This Dark + Raspberry is genuinely world-class. The chocolate is rich and complex, and the freeze-dried raspberry pieces add this extraordinary tart crunch that just hits differently. Bought 4 more boxes immediately.",
    helpful: 98,
    verified: true,
    hasPhoto: false,
    tags: ["Amazing Quality", "Great Taste"],
    photoGradient: "from-[#4a1a0a] to-[#8b4513]",
    photoEmoji: "🍫",
  },
  {
    id: "r3",
    category: "gift",
    product: "Celebration Box",
    productEmoji: "🎁",
    name: "Priya Kapoor",
    location: "Bangalore",
    avatar: "PK",
    avatarColor: "#9b1d6a",
    rating: 5,
    date: "March 12, 2026",
    title: "My mother-in-law was DELIGHTED — packaging is stunning",
    body: "Ordered the Celebration Box for my mother-in-law's birthday. When it arrived I was honestly impressed — the packaging looks like something from a high-end boutique. The ribbon, the card, the way everything is arranged inside. She said it was the most thoughtful gift she'd received in years. Will definitely order again for Diwali.",
    helpful: 211,
    verified: true,
    hasPhoto: true,
    tags: ["Perfect Gift", "Amazing Quality", "Fast Delivery"],
    photoGradient: "from-[#9b1d6a] to-[#c0396a]",
    photoEmoji: "🎁",
  },
  {
    id: "r4",
    category: "chunks",
    product: "Mango Chunks",
    productEmoji: "🥭",
    name: "Vikram Nair",
    location: "Chennai",
    avatar: "VN",
    avatarColor: "#f4a435",
    rating: 5,
    date: "March 10, 2026",
    title: "School lunch game-changer. My kids fight over them.",
    body: "Two kids, 7 and 10. Both of them were instantly obsessed with these mango chunks. No sugar added, nothing artificial, just pure mango — and somehow it tastes even more intensely of mango than fresh mango does. The crunch is addictive. I've been ordering the 4-pack every two weeks.",
    helpful: 187,
    verified: true,
    hasPhoto: false,
    tags: ["Kids Love It", "Healthy Snack", "Great Taste"],
    photoGradient: "from-[#f4a435] to-[#e67e22]",
    photoEmoji: "🥭",
  },
  {
    id: "r5",
    category: "powder",
    product: "Blueberry Powder",
    productEmoji: "🫐",
    name: "Dr. Sneha Iyer",
    location: "Pune",
    avatar: "SI",
    avatarColor: "#6c5ce7",
    rating: 5,
    date: "March 8, 2026",
    title: "As a nutritionist, I recommend this without hesitation",
    body: "I've been researching freeze-dried fruit products for a while. The antioxidant retention in freeze-drying is genuinely superior to air-drying or dehydration. FrostFruit's blueberry powder tests exceptionally well — my patients who've added it to their diet report better energy levels. The fact it's just one ingredient is exactly what I look for.",
    helpful: 324,
    verified: true,
    hasPhoto: false,
    tags: ["Amazing Quality", "Healthy Snack", "Great Taste"],
    photoGradient: "from-[#6c5ce7] to-[#4a3ab0]",
    photoEmoji: "🫐",
  },
  {
    id: "r6",
    category: "combo",
    product: "The FrostFruit Sampler",
    productEmoji: "🌟",
    name: "Kavitha Reddy",
    location: "Hyderabad",
    avatar: "KR",
    avatarColor: "#e85d26",
    rating: 5,
    date: "March 5, 2026",
    title: "Perfect intro pack — now I'm hooked on everything",
    body: "Ordered the sampler because I couldn't decide what to try first. Best decision. Got to taste all three categories and now I have strong opinions about each one. The raspberry powder in my yogurt every morning, the pineapple chunks as my afternoon snack, and the dark chocolate bar on weekends. It's basically a self-care ritual now.",
    helpful: 156,
    verified: true,
    hasPhoto: true,
    tags: ["Value for Money", "Great Taste", "Amazing Quality"],
    photoGradient: "from-[#e85d26] to-[#f4a435]",
    photoEmoji: "🌟",
  },
  {
    id: "r7",
    category: "powder",
    product: "Strawberry Powder",
    productEmoji: "🍓",
    name: "James Fernandez",
    location: "Goa",
    avatar: "JF",
    avatarColor: "#e84444",
    rating: 5,
    date: "February 28, 2026",
    title: "My macarons have never looked or tasted better",
    body: "I'm a home baker and I've been searching for a natural pink powder that actually tastes like strawberry (not perfume). This is IT. The color is gorgeous — a true blush pink, not neon — and the flavor is unmistakably real strawberry. My macarons have been getting compliments like crazy. I've started using it in buttercream too.",
    helpful: 203,
    verified: true,
    hasPhoto: true,
    tags: ["Great for Baking", "Amazing Quality", "Great Taste"],
    photoGradient: "from-[#e84444] to-[#c0392b]",
    photoEmoji: "🍓",
  },
  {
    id: "r8",
    category: "chunks",
    product: "Mixed Fruit Chunks",
    productEmoji: "🍇",
    name: "Meera Pillai",
    location: "Kochi",
    avatar: "MP",
    avatarColor: "#27ae60",
    rating: 4,
    date: "February 24, 2026",
    title: "Excellent quality, wish there were more pieces per bag",
    body: "The mixed fruit chunks are genuinely delicious and the quality is top-notch. Each piece is perfectly dried — not too crunchy, not too chewy. My only feedback is that 150g disappears very quickly in our household of four! Would love a larger family pack option. That said, I've ordered four times already so that speaks for itself.",
    helpful: 89,
    verified: true,
    hasPhoto: false,
    tags: ["Great Taste", "Amazing Quality"],
    photoGradient: "from-[#27ae60] to-[#2ecc71]",
    photoEmoji: "🍇",
  },
  {
    id: "r9",
    category: "gift",
    product: "Wellness Hamper",
    productEmoji: "🌿",
    name: "Aditya Bose",
    location: "Kolkata",
    avatar: "AB",
    avatarColor: "#2e7d32",
    rating: 5,
    date: "February 20, 2026",
    title: "Gifted to my colleague — she's already ordered more herself",
    body: "My colleague had been talking about clean eating and I thought the Wellness Hamper would be perfect. She messaged me the same day it arrived, completely bowled over. Two weeks later she placed her own order. The eco packaging was also a big plus — she's very environmentally conscious and appreciated that detail.",
    helpful: 134,
    verified: true,
    hasPhoto: false,
    tags: ["Perfect Gift", "Fast Delivery", "Amazing Quality"],
    photoGradient: "from-[#2e7d32] to-[#43a047]",
    photoEmoji: "🌿",
  },
  {
    id: "r10",
    category: "chocolate",
    product: "White + Mango Bar",
    productEmoji: "🥭",
    name: "Tanya Singh",
    location: "Jaipur",
    avatar: "TS",
    avatarColor: "#e8950a",
    rating: 5,
    date: "February 15, 2026",
    title: "This flavour combination shouldn't work but it's PERFECT",
    body: "White chocolate and mango — I was skeptical. But every single person I've shared this with has had the same reaction: eyes wide, immediate silence, then 'where did you get this?'. The mango pieces are intensely fruity and the white chocolate is creamy without being sickly. It's genuinely one of the best things I've eaten.",
    helpful: 178,
    verified: true,
    hasPhoto: true,
    tags: ["Great Taste", "Amazing Quality"],
    photoGradient: "from-[#e8950a] to-[#c47a05]",
    photoEmoji: "🍫",
  },
  {
    id: "r11",
    category: "combo",
    product: "Powder Trio Pack",
    productEmoji: "📦",
    name: "Suresh Kumar",
    location: "Ahmedabad",
    avatar: "SK",
    avatarColor: "#0a7a4a",
    rating: 5,
    date: "February 10, 2026",
    title: "Incredible value — three powders that actually last",
    body: "Bought the trio pack expecting to finish it in a week. Still going strong after a month! A little goes a very long way with these powders. The raspberry is my favourite but honestly all three are excellent. Having all three means I can rotate and experiment. Great savings over buying individually too.",
    helpful: 101,
    verified: true,
    hasPhoto: false,
    tags: ["Value for Money", "Great Taste", "Amazing Quality"],
    photoGradient: "from-[#0a7a4a] to-[#27ae60]",
    photoEmoji: "📦",
  },
  {
    id: "r12",
    category: "chunks",
    product: "Pineapple Chunks",
    productEmoji: "🍍",
    name: "Ritu Chawla",
    location: "Chandigarh",
    avatar: "RC",
    avatarColor: "#c8a800",
    rating: 4,
    date: "February 5, 2026",
    title: "Surprisingly addictive — tangy, crunchy, impossible to stop",
    body: "I wasn't sure about pineapple chunks but my husband kept raving about them and eventually I caved. Within ten minutes I'd eaten half the bag. The tang is real — it catches you off guard in the best way. Great for trail mix. Docking one star only because delivery took slightly longer than expected, but the product itself is a 5.",
    helpful: 67,
    verified: true,
    hasPhoto: false,
    tags: ["Great Taste", "Healthy Snack"],
    photoGradient: "from-[#f4d03f] to-[#c8a800]",
    photoEmoji: "🍍",
  },
];

const featuredReviews = allReviews.slice(0, 3);

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRow({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "lg";
}) {
  const sz = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={sz}
          fill={s <= rating ? "#f4a435" : "#e0d5c8"}
          stroke="none"
        />
      ))}
    </div>
  );
}

function RatingBar({
  stars,
  pct,
  count,
}: {
  stars: number;
  pct: number;
  count: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-[#4a3a2a] w-4 text-right">
        {stars}
      </span>
      <Star className="w-3 h-3 flex-shrink-0" fill="#f4a435" stroke="none" />
      <div className="flex-1 h-2 bg-[#f0e8de] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: (5 - stars) * 0.08,
            ease: "easeOut",
          }}
          className="h-full rounded-full bg-gradient-to-r from-[#f4a435] to-[#e85d26]"
        />
      </div>
      <span className="text-xs text-[#9a8a7a] w-8">{count}</span>
    </div>
  );
}

function PhotoPlaceholder({
  gradient,
  emoji,
}: {
  gradient: string;
  emoji: string;
}) {
  return (
    <div
      className={`w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${gradient} shadow-sm`}
    >
      <span style={{ fontSize: "2rem" }}>{emoji}</span>
    </div>
  );
}

function ReviewCard({
  review,
  index,
  featured = false,
}: {
  review: (typeof allReviews)[0];
  index: number;
  featured?: boolean;
}) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`bg-white rounded-2xl border border-[#ede5dc] hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
        featured ? "ring-2 ring-[#f4a435]/40" : ""
      }`}
    >
      {featured && (
        <div className="h-1 bg-gradient-to-r from-[#e85d26] to-[#f4a435]" />
      )}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: review.avatarColor }}
            >
              {review.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1a1a1a]">
                  {review.name}
                </span>
                {review.verified && (
                  <CheckCircle className="w-3.5 h-3.5 text-[#27ae60]" />
                )}
              </div>
              <span className="text-xs text-[#9a8a7a]">
                {review.location} · {review.date}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StarRow rating={review.rating} />
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold rounded-full text-white"
              style={{ backgroundColor: review.avatarColor }}
            >
              {review.productEmoji} {review.product}
            </span>
          </div>
        </div>

        {/* Quote mark accent */}
        <div className="relative mb-3">
          <Quote className="w-5 h-5 text-[#f0d9c8] absolute -top-1 -left-1" />
          <h4 className="font-serif text-base font-bold text-[#1a1a1a] pl-5 leading-snug">
            {review.title}
          </h4>
        </div>

        <p className="text-sm text-[#5a4a3a] leading-relaxed mb-4">
          {review.body}
        </p>

        {/* Photo placeholder */}
        {review.hasPhoto && (
          <div className="flex gap-2 mb-4">
            <PhotoPlaceholder
              gradient={review.photoGradient}
              emoji={review.photoEmoji}
            />
            <PhotoPlaceholder gradient={review.photoGradient} emoji="📸" />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-[#fdf3ec] text-[#e85d26] border border-[#f0d9c8]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#f5efe8]">
          <span className="text-xs text-[#9a8a7a]">Was this helpful?</span>
          <button
            onClick={() => {
              if (!voted) {
                setHelpful((h) => h + 1);
                setVoted(true);
              }
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              voted
                ? "bg-[#e85d26] text-white border-[#e85d26]"
                : "bg-white text-[#4a3a2a] border-[#e0d8d0] hover:border-[#e85d26] hover:text-[#e85d26]"
            }`}
          >
            <ThumbsUp className="w-3 h-3" />
            {helpful}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Write Review Modal ───────────────────────────────────────────────────────

// ─── Write Review Modal ───────────────────────────────────────────────────────

function WriteReviewModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    product: "",
    title: "",
    body: "",
  });

  const handleSubmit = async () => {
    if (!rating || !form.name || !form.email || !form.title || !form.body)
      return;

    setSending(true);
    try {
      await emailjs.send(
        (import.meta as any).env.VITE_EMAILJS_SERVICE_ID,
        (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_name_initial: form.name.charAt(0).toUpperCase(),
          from_email: form.email,
          subject: `New Review (${rating}★) — ${form.product || "General"}`,
          message: `⭐ Rating: ${rating}/5\n📦 Product: ${form.product || "Not specified"}\n📍 City: ${form.location || "Not specified"}\n\n📝 Title: ${form.title}\n\n${form.body}`,
          reply_to: form.email,
        },
        (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const isValid =
    rating > 0 && form.name && form.email && form.title && form.body;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        transition={{ type: "spring", damping: 24, stiffness: 260 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 bg-gradient-to-r from-[#e85d26] to-[#f4a435]" />

        {submitted ? (
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-2">
              Thank you for your review!
            </h3>
            <p className="text-[#6a5a4a] text-sm mb-6">
              Your feedback helps thousands of people discover the best of
              FrostFruit.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#e85d26] text-white font-bold rounded-full text-sm hover:bg-[#d44f1a] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-8">
            <h3 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-1">
              Write a Review
            </h3>
            <p className="text-sm text-[#9a8a7a] mb-6">
              Share your honest experience with the FrostFruit community
            </p>

            {/* Star picker */}
            <div className="mb-5">
              <label className="text-xs font-bold text-[#4a3a2a] uppercase tracking-wider mb-2 block">
                Your Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(s)}
                    className="transition-transform duration-100 hover:scale-125"
                  >
                    <Star
                      className="w-8 h-8"
                      fill={s <= (hovered || rating) ? "#f4a435" : "#e0d5c8"}
                      stroke="none"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name + City */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { key: "name", label: "Your Name *", placeholder: "Ananya S." },
                { key: "location", label: "City", placeholder: "Mumbai" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-xs font-bold text-[#4a3a2a] uppercase tracking-wider mb-1.5 block">
                    {f.label}
                  </label>
                  <input
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value })
                    }
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 text-sm border border-[#e0d8d0] rounded-xl focus:outline-none focus:border-[#e85d26] transition-colors bg-[#faf8f5]"
                  />
                </div>
              ))}
            </div>

            {/* Email — full width */}
            <div className="mb-3">
              <label className="text-xs font-bold text-[#4a3a2a] uppercase tracking-wider mb-1.5 block">
                Email Address *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 text-sm border border-[#e0d8d0] rounded-xl focus:outline-none focus:border-[#e85d26] transition-colors bg-[#faf8f5]"
              />
              <p className="text-[10px] text-[#b0a090] mt-1">
                Your email won't be published. We may follow up if needed.
              </p>
            </div>

            {/* Product */}
            <div className="mb-3">
              <label className="text-xs font-bold text-[#4a3a2a] uppercase tracking-wider mb-1.5 block">
                Product
              </label>
              <select
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-[#e0d8d0] rounded-xl focus:outline-none focus:border-[#e85d26] transition-colors bg-[#faf8f5] appearance-none"
              >
                <option value="">Select a product…</option>
                <option>Raspberry Powder</option>
                <option>Mango Powder</option>
                <option>Strawberry Powder</option>
                <option>Blueberry Powder</option>
                <option>Mixed Fruit Chunks</option>
                <option>Mango Chunks</option>
                <option>Strawberry Chunks</option>
                <option>Pineapple Chunks</option>
                <option>Dark + Raspberry Bar</option>
                <option>Milk + Strawberry Bar</option>
                <option>White + Mango Bar</option>
                <option>Dark + Blueberry Bar</option>
                <option>FrostFruit Sampler</option>
                <option>Celebration Gift Box</option>
              </select>
            </div>

            {/* Title */}
            <div className="mb-3">
              <label className="text-xs font-bold text-[#4a3a2a] uppercase tracking-wider mb-1.5 block">
                Review Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Summarise your experience…"
                className="w-full px-3 py-2.5 text-sm border border-[#e0d8d0] rounded-xl focus:outline-none focus:border-[#e85d26] transition-colors bg-[#faf8f5]"
              />
            </div>

            {/* Body */}
            <div className="mb-5">
              <label className="text-xs font-bold text-[#4a3a2a] uppercase tracking-wider mb-1.5 block">
                Your Review *
              </label>
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="Tell us what you loved (or didn't)…"
                rows={4}
                className="w-full px-3 py-2.5 text-sm border border-[#e0d8d0] rounded-xl focus:outline-none focus:border-[#e85d26] transition-colors bg-[#faf8f5] resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-[#e0d8d0] text-sm font-semibold text-[#4a3a2a] hover:bg-[#faf8f5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isValid || sending}
                className="flex-1 py-3 rounded-xl bg-[#e85d26] text-white text-sm font-bold hover:bg-[#d44f1a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {sending ? "Sending…" : "Submit Review"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Reviews() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [showSort, setShowSort] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = allReviews
    .filter((r) => activeCategory === "all" || r.category === activeCategory)
    .filter((r) => !activeTag || r.tags.includes(activeTag))
    .sort((a, b) => {
      if (sortBy === "Most Helpful") return b.helpful - a.helpful;
      if (sortBy === "Highest Rated") return b.rating - a.rating;
      if (sortBy === "Lowest Rated") return a.rating - b.rating;
      return 0; // Most Recent = default order
    });

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />

      {/* ── Hero ── */}
      <section className="pt-28 pb-12 px-6 lg:px-8 bg-white border-b border-[#ede5dc]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fdf3ec] text-[#e85d26] text-xs font-bold uppercase tracking-widest rounded-full border border-[#f0d9c8] mb-5">
              <MessageSquare className="w-3.5 h-3.5" />
              Customer Reviews
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-3">
              Real People. Real Results.
            </h1>
            <p className="text-[#6a5a4a] text-base max-w-xl mx-auto mb-8">
              Over 1,200 verified reviews from customers across India who've
              made FrostFruit part of their everyday life.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#e85d26] to-[#f4a435] text-white font-bold rounded-full text-sm hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <Star className="w-4 h-4" fill="white" stroke="none" />
              Write a Review
            </button>
          </motion.div>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[
              {
                icon: Star,
                label: "Average Rating",
                value: "4.9 / 5",
                color: "#f4a435",
              },
              {
                icon: Users,
                label: "Total Reviews",
                value: "1,284",
                color: "#e85d26",
              },
              {
                icon: Award,
                label: "5-Star Reviews",
                value: "81%",
                color: "#27ae60",
              },
              {
                icon: TrendingUp,
                label: "Repeat Buyers",
                value: "68%",
                color: "#6c5ce7",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-[#ede5dc] p-5 text-center shadow-sm"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${stat.color}18` }}
                >
                  <stat.icon
                    className="w-5 h-5"
                    style={{ color: stat.color }}
                    fill={stat.icon === Star ? stat.color : "none"}
                    stroke={stat.icon === Star ? "none" : stat.color}
                  />
                </div>
                <div className="font-serif text-2xl font-bold text-[#1a1a1a]">
                  {stat.value}
                </div>
                <div className="text-xs text-[#9a8a7a] mt-0.5">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Rating Breakdown ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Big rating */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-8"
            >
              <div className="text-center">
                <div className="font-serif text-8xl font-bold text-[#1a1a1a] leading-none">
                  {overallStats.average}
                </div>
                <StarRow rating={5} size="lg" />
                <p className="text-xs text-[#9a8a7a] mt-2">
                  {overallStats.total.toLocaleString()} reviews
                </p>
              </div>
              <div className="flex-1 space-y-2">
                {overallStats.breakdown.map((row) => (
                  <RatingBar key={row.stars} {...row} />
                ))}
              </div>
            </motion.div>

            {/* Featured testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-[#fff2ee] to-[#ffe8df] rounded-2xl p-6 border border-[#f5cfc0] relative"
            >
              <Quote className="w-8 h-8 text-[#f0d9c8] mb-3" />
              <p className="font-serif text-lg font-medium text-[#1a1a1a] italic leading-relaxed mb-4">
                "I recommend FrostFruit to all my clients. The ingredient list
                is exactly what it should be — just fruit."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#6c5ce7] flex items-center justify-center text-white text-xs font-bold">
                  SI
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1a1a1a]">
                    Dr. Sneha Iyer
                  </div>
                  <div className="text-xs text-[#9a8a7a]">
                    Nutritionist · Pune
                  </div>
                </div>
                <StarRow rating={5} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#ede5dc] px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {filterCategories.map((cat) => (
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
                    ? allReviews.length
                    : allReviews.filter((r) => r.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#e0d8d0] text-xs font-semibold text-[#4a3a2a] hover:border-[#1a1a1a] transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              {sortBy}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showSort ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#e8ddd5] overflow-hidden z-50"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setShowSort(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-xs font-semibold transition-colors ${
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

      {/* ── Tag filters ── */}
      <section className="px-6 lg:px-8 pt-6 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {reviewTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-[#e85d26] text-white border-[#e85d26]"
                    : "bg-white text-[#4a3a2a] border-[#e0d8d0] hover:border-[#e85d26] hover:text-[#e85d26]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Reviews ── */}
      {activeCategory === "all" && !activeTag && (
        <section className="px-6 lg:px-8 pt-8 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-4 h-4 text-[#f4a435]" />
              <h2 className="font-serif text-lg font-bold text-[#1a1a1a]">
                Featured Reviews
              </h2>
              <span className="text-xs text-[#9a8a7a] ml-1">
                — Highest rated & most helpful
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredReviews.map((r, i) => (
                <ReviewCard key={r.id} review={r} index={i} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Reviews Grid ── */}
      <section className="px-6 lg:px-8 pt-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs text-[#9a8a7a] font-medium">
              Showing{" "}
              <span className="text-[#1a1a1a] font-bold">
                {filtered.length}
              </span>{" "}
              reviews
              {activeTag && (
                <>
                  {" "}
                  tagged{" "}
                  <span className="text-[#e85d26] font-bold">
                    "{activeTag}"
                  </span>
                </>
              )}
            </p>
            {activeTag && (
              <button
                onClick={() => setActiveTag(null)}
                className="text-xs text-[#9a8a7a] hover:text-[#e85d26] transition-colors"
              >
                Clear filter ×
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#9a8a7a]">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-semibold text-[#4a3a2a]">
                No reviews match this filter
              </p>
              <p className="text-sm mt-1">Try a different category or tag</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((review, i) => (
                  <ReviewCard key={review.id} review={review} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 lg:px-8 bg-[#fff7f2]">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="rounded-3xl p-10 lg:p-14 relative overflow-hidden"
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
                ⭐ Share Your Experience
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-3">
                Tried FrostFruit?
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                Your review helps real people make better choices. Take 2
                minutes and tell the FrostFruit community what you thought.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#e85d26] to-[#f4a435] text-white font-bold rounded-full text-sm hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  <Star className="w-4 h-4" fill="white" stroke="none" />
                  Write a Review
                </button>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Write Review Modal ── */}
      <AnimatePresence>
        {showModal && <WriteReviewModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
}

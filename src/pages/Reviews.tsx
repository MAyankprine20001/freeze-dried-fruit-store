import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Star,
  ThumbsUp,
  Filter,
  ChevronDown,
  Quote,
  CheckCircle,
  Camera,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  MessageSquare,
  Loader2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  generalReviewApi,
  type GeneralReview,
  type ReviewStats,
} from "../api/review.api";

// ─── Static config ────────────────────────────────────────────────────────────

const filterCategories = [
  { id: "all", label: "All Reviews", emoji: "✨" },
  { id: "powder", label: "Fruit Powder", emoji: "🌸" },
  { id: "chunks", label: "Fruit Chunks", emoji: "🍓" },
  { id: "chocolate", label: "Chocolate", emoji: "🍫" },
  { id: "combo", label: "Combos", emoji: "📦" },
  { id: "gift", label: "Gift Sets", emoji: "🎁" },
];

const sortOptions = [
  { label: "Most Recent", value: "recent" },
  { label: "Most Helpful", value: "helpful" },
  { label: "Highest Rated", value: "highest" },
  { label: "Lowest Rated", value: "lowest" },
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

const categoryColors: Record<string, string> = {
  powder: "#e85d26",
  chunks: "#f4a435",
  chocolate: "#4a1a0a",
  combo: "#9b1d6a",
  gift: "#2e7d32",
  other: "#6c5ce7",
};

const categoryEmojis: Record<string, string> = {
  powder: "🌸",
  chunks: "🍓",
  chocolate: "🍫",
  combo: "📦",
  gift: "🎁",
  other: "⭐",
};

function getAvatarColor(name: string, category: string): string {
  if (categoryColors[category]) return categoryColors[category];
  const colors = ["#e85d26", "#f4a435", "#6c5ce7", "#27ae60", "#9b1d6a", "#e84444", "#0a7a4a"];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={sz}
          fill={s <= rating ? "#D4AF37" : "rgba(255,255,255,0.1)"}
          stroke="none"
        />
      ))}
    </div>
  );
}

function RatingBar({ stars, pct, count }: { stars: number; pct: number; count: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-white/70 w-4 text-right">{stars}</span>
      <Star className="w-3 h-3 flex-shrink-0" fill="#D4AF37" stroke="none" />
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: (5 - stars) * 0.08, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BF953F]"
        />
      </div>
      <span className="text-xs text-white/40 w-8">{count}</span>
    </div>
  );
}

function ReviewCard({
  review,
  index,
  featured = false,
}: {
  review: GeneralReview;
  index: number;
  featured?: boolean;
}) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);
  const avatarColor = getAvatarColor(review.name, review.category);

  const handleHelpful = async () => {
    if (voted) return;
    setHelpful((h) => h + 1);
    setVoted(true);
    try {
      await generalReviewApi.markHelpful(review._id);
    } catch {
      setHelpful((h) => h - 1);
      setVoted(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white/5 rounded-2xl border border-white/10 hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
        featured ? "ring-2 ring-[#D4AF37]/40" : ""
      }`}
    >
      {featured && <div className="h-1 bg-gradient-to-r from-[#D4AF37] to-[#BF953F]" />}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: avatarColor }}
            >
              {getInitials(review.name)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{review.name}</span>
                <CheckCircle className="w-3.5 h-3.5 text-[#27ae60]" />
              </div>
              <span className="text-xs text-white/40">
                {review.location ? `${review.location} · ` : ""}
                {formatDate(review.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StarRow rating={review.rating} />
            {review.product && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold rounded-full text-white"
                style={{ backgroundColor: avatarColor }}
              >
                {categoryEmojis[review.category] || "⭐"} {review.product}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="relative mb-3">
          <Quote className="w-5 h-5 text-white/10 absolute -top-1 -left-1" />
          <h4 className="font-serif text-base font-bold text-white pl-5 leading-snug">
            {review.title}
          </h4>
        </div>

        <p className="text-sm text-white/70 leading-relaxed mb-4">{review.comment}</p>

        {/* Image */}
        {review.image && (
          <div className="mb-4">
            <img
              src={review.image}
              alt="Review photo"
              className="w-20 h-20 rounded-xl object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {review.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-white/5 text-[#D4AF37] border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-xs text-white/40">Was this helpful?</span>
          <button
            onClick={handleHelpful}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              voted
                ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                : "bg-white/5 text-white border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]"
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

function WriteReviewModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    product: "",
    category: "other",
    title: "",
    comment: "",
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!rating || !form.name || !form.email || !form.title || !form.comment) return;

    setSending(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("location", form.location);
      fd.append("product", form.product);
      fd.append("category", form.category);
      fd.append("title", form.title);
      fd.append("comment", form.comment);
      fd.append("rating", String(rating));
      fd.append("tags", JSON.stringify(selectedTags));
      if (imageFile) fd.append("image", imageFile);

      await generalReviewApi.submit(fd);
      setSubmitted(true);
      onSuccess();
    } catch (err) {
      console.error("Review submit error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const isValid = rating > 0 && form.name && form.email && form.title && form.comment;

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
        className="bg-black border border-white/10 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#BF953F]" />

        {submitted ? (
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Thank you for your review!
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Your feedback helps thousands of people discover the best of The Dry Factory.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-full text-sm hover:bg-[#BF953F] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-8">
            <h3 className="font-serif text-2xl font-bold text-white mb-1">Write a Review</h3>
            <p className="text-sm text-white/40 mb-6">
              Share your honest experience with The Dry Factory community
            </p>

            {/* Star picker */}
            <div className="mb-5">
              <label className="text-xs font-bold text-white uppercase tracking-wider mb-2 block">
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
                      fill={s <= (hovered || rating) ? "#D4AF37" : "rgba(255,255,255,0.1)"}
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
                  <label className="text-xs font-bold text-white uppercase tracking-wider mb-1.5 block">
                    {f.label}
                  </label>
                  <input
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors bg-white/5 text-white placeholder:text-white/30"
                  />
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider mb-1.5 block">
                Email Address *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors bg-white/5 text-white placeholder:text-white/30"
              />
              <p className="text-[10px] text-white/40 mt-1">
                Your email won't be published. We may follow up if needed.
              </p>
            </div>

            {/* Category + Product */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider mb-1.5 block">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors bg-[#111] text-white appearance-none"
                >
                  <option value="other">General</option>
                  <option value="powder">Fruit Powder</option>
                  <option value="chunks">Fruit Chunks</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="combo">Combo</option>
                  <option value="gift">Gift Set</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider mb-1.5 block">
                  Product
                </label>
                <input
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  placeholder="e.g. Raspberry Powder"
                  className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors bg-white/5 text-white placeholder:text-white/30"
                />
              </div>
            </div>

            {/* Title */}
            <div className="mb-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider mb-1.5 block">
                Review Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Summarise your experience…"
                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            {/* Body */}
            <div className="mb-4">
              <label className="text-xs font-bold text-white uppercase tracking-wider mb-1.5 block">
                Your Review *
              </label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Tell us what you loved (or didn't)…"
                rows={4}
                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors bg-white/5 text-white resize-none placeholder:text-white/30"
              />
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="text-xs font-bold text-white uppercase tracking-wider mb-2 block">
                Tags (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {reviewTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-150 ${
                      selectedTags.includes(tag)
                        ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-[#D4AF37]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo upload */}
            <div className="mb-5">
              <label className="text-xs font-bold text-white uppercase tracking-wider mb-1.5 block">
                Photo (optional)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border border-white/10 rounded-xl text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                {imageFile ? imageFile.name : "Upload a photo"}
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isValid || sending}
                className="flex-1 py-3 rounded-xl bg-[#D4AF37] text-black text-sm font-bold hover:bg-[#BF953F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sending && <Loader2 className="w-4 h-4 animate-spin" />}
                {sending ? "Submitting…" : "Submit Review"}
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
  const [sortBy, setSortBy] = useState<string>("recent");
  const [showSort, setShowSort] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const [reviews, setReviews] = useState<GeneralReview[]>([]);
  const [stats, setStats] = useState<ReviewStats>({ average: 0, total: 0, breakdown: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await generalReviewApi.getAll();
      setReviews(data.reviews);
      setStats(data.stats);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Client-side filter + sort
  const filtered = reviews
    .filter((r) => activeCategory === "all" || r.category === activeCategory)
    .filter((r) => !activeTag || r.tags.includes(activeTag))
    .sort((a, b) => {
      if (sortBy === "helpful") return b.helpful - a.helpful;
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const featured = [...reviews]
    .sort((a, b) => b.rating - a.rating || b.helpful - a.helpful)
    .slice(0, 3);

  const showFeaturedStrip = activeCategory === "all" && !activeTag;
  const featuredIdSet = new Set(featured.map((r) => r._id));
  const gridReviews = showFeaturedStrip
    ? filtered.filter((r) => !featuredIdSet.has(r._id))
    : filtered;

  const activeSortLabel = sortOptions.find((o) => o.value === sortBy)?.label ?? "Most Recent";

  const fiveStarPct = stats.breakdown.find((b) => b.stars === 5)?.pct ?? 0;

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* ── Hero ── */}
      <section className="pt-28 pb-12 px-6 lg:px-8 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 text-[#D4AF37] text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 mb-5">
              <MessageSquare className="w-3.5 h-3.5" />
              Customer Reviews
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-3">
              Real People. Real Results.
            </h1>
            <p className="text-white/70 text-base max-w-xl mx-auto mb-8">
              {stats.total > 0
                ? `Over ${stats.total.toLocaleString()} verified review${stats.total === 1 ? "" : "s"} from customers across India who've made The Dry Factory part of their everyday life.`
                : "Be the first to share your experience with The Dry Factory community."}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#BF953F] text-black font-bold rounded-full text-sm hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <Star className="w-4 h-4" fill="black" stroke="none" />
              Write a Review
            </button>
          </motion.div>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[
              {
                icon: Star,
                label: "Average Rating",
                value: stats.total > 0 ? `${stats.average} / 5` : "–",
                color: "#f4a435",
                isStar: true,
              },
              {
                icon: Users,
                label: "Total Reviews",
                value: stats.total > 0 ? stats.total.toLocaleString() : "0",
                color: "#e85d26",
                isStar: false,
              },
              {
                icon: Award,
                label: "5-Star Reviews",
                value: stats.total > 0 ? `${fiveStarPct}%` : "–",
                color: "#27ae60",
                isStar: false,
              },
              {
                icon: TrendingUp,
                label: "Repeat Buyers",
                value: "68%",
                color: "#6c5ce7",
                isStar: false,
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 rounded-2xl border border-white/10 p-5 text-center shadow-sm"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${stat.color}18` }}
                >
                  <stat.icon
                    className="w-5 h-5"
                    style={{ color: stat.color }}
                    fill={stat.isStar ? stat.color : "none"}
                    stroke={stat.isStar ? "none" : stat.color}
                  />
                </div>
                <div className="font-serif text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* ── Rating Breakdown ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-8"
            >
              <div className="text-center">
                <div className="font-serif text-8xl font-bold text-white leading-none">
                  {stats.average || "–"}
                </div>
                <StarRow rating={Math.round(stats.average)} size="lg" />
                <p className="text-xs text-white/40 mt-2">
                  {stats.total.toLocaleString()} review{stats.total !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex-1 space-y-2">
                {stats.breakdown.map((row) => (
                  <RatingBar key={row.stars} {...row} />
                ))}
              </div>
            </motion.div>

            {/* Featured testimonial — first top review */}
            {featured[0] ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-[#2c2c2a] to-[#1a1a1a] rounded-2xl p-6 border border-white/10 relative"
              >
                <Quote className="w-8 h-8 text-[#D4AF37]/40 mb-3" />
                <p className="font-serif text-lg font-medium text-white italic leading-relaxed mb-4">
                  "{featured[0].comment.length > 160
                    ? featured[0].comment.slice(0, 160) + "…"
                    : featured[0].comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: getAvatarColor(featured[0].name, featured[0].category) }}
                  >
                    {getInitials(featured[0].name)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{featured[0].name}</div>
                    <div className="text-xs text-white/40">
                      {featured[0].location
                        ? `${featured[0].location} · `
                        : ""}
                      {formatDate(featured[0].createdAt)}
                    </div>
                  </div>
                  <StarRow rating={featured[0].rating} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-[#2c2c2a] to-[#1a1a1a] rounded-2xl p-6 border border-white/10 relative flex flex-col items-center justify-center text-center gap-3 min-h-[160px]"
              >
                <Quote className="w-8 h-8 text-[#D4AF37]/20" />
                <p className="text-white/40 text-sm">
                  No reviews yet. Be the first to share your experience!
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="text-[#D4AF37] text-xs font-bold underline underline-offset-2"
                >
                  Write a Review →
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <div className="sticky top-16 lg:top-20 z-30 bg-black/95 backdrop-blur-md border-b border-white/10 px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {filterCategories.map((cat) => (
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
                  {cat.id === "all"
                    ? reviews.length
                    : reviews.filter((r) => r.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-semibold text-white/70 hover:border-[#D4AF37] transition-colors"
            >
              <Filter className="w-3.5 h-3.5" />
              {activeSortLabel}
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
                  className="absolute right-0 top-full mt-2 w-48 bg-black rounded-2xl shadow-xl border border-white/10 overflow-hidden z-50"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                      className={`w-full text-left px-4 py-3 text-xs font-semibold transition-colors ${
                        sortBy === opt.value
                          ? "bg-white/10 text-[#D4AF37]"
                          : "text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {opt.label}
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
                    ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Reviews ── */}
      {showFeaturedStrip && featured.length > 0 && (
        <section className="px-6 lg:px-8 pt-8 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <h2 className="font-serif text-lg font-bold text-white">Featured Reviews</h2>
              <span className="text-xs text-white/40 ml-1">Highest rated &amp; most helpful</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featured.map((r, i) => (
                <ReviewCard key={r._id} review={r} index={i} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Reviews Grid ── */}
      <section className="px-6 lg:px-8 pt-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs text-white/40 font-medium">
              Showing{" "}
              <span className="text-white font-bold">{filtered.length}</span> reviews
              {activeTag && (
                <>
                  {" "}tagged{" "}
                  <span className="text-[#D4AF37] font-bold">"{activeTag}"</span>
                </>
              )}
            </p>
            {activeTag && (
              <button
                onClick={() => setActiveTag(null)}
                className="text-xs text-white/40 hover:text-[#D4AF37] transition-colors"
              >
                Clear filter ×
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/40">
              <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
              <p className="text-sm">Loading reviews…</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-white/30">
              <div className="text-4xl mb-3">⚠️</div>
              <p className="font-semibold text-white/70">Could not load reviews</p>
              <p className="text-sm mt-1">Please try again later.</p>
              <button
                onClick={fetchReviews}
                className="mt-4 text-xs text-[#D4AF37] underline underline-offset-2"
              >
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-semibold text-white/70">
                {reviews.length === 0 ? "No reviews yet" : "No reviews match this filter"}
              </p>
              <p className="text-sm mt-1">
                {reviews.length === 0
                  ? "Be the first to write one!"
                  : "Try a different category or tag"}
              </p>
              {reviews.length === 0 && (
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 px-6 py-2.5 bg-[#D4AF37] text-black font-bold rounded-full text-sm hover:bg-[#BF953F] transition-colors"
                >
                  Write a Review
                </button>
              )}
            </div>
          ) : gridReviews.length === 0 ? null : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {gridReviews.map((review, i) => (
                  <ReviewCard key={review._id} review={review} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="rounded-3xl p-10 lg:p-14 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(#D4AF37, transparent)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(#BF953F, transparent)" }}
            />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-white/5 text-[#D4AF37] text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 mb-5">
                ⭐ Share Your Experience
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-3">
                Tried The Dry Factory?
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                Your review helps real people make better choices. Take 2 minutes and tell The Dry
                Factory community what you thought.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#BF953F] text-black font-bold rounded-full text-sm hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  <Star className="w-4 h-4" fill="black" stroke="none" />
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
        {showModal && (
          <WriteReviewModal
            onClose={() => setShowModal(false)}
            onSuccess={fetchReviews}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

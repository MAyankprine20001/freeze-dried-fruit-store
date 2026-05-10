import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  Loader2,
  Trash2,
  AlertCircle,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import { generalReviewApi, type GeneralReview } from "../../api/review.api";
import { deleteGeneralReview } from "../../api/admin.api";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<GeneralReview[]>([]);
  const [stats, setStats] = useState<{ average: number; total: number }>({
    average: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await generalReviewApi.getAll();
      setReviews(data.reviews ?? []);
      setStats({
        average: data.stats?.average ?? 0,
        total: data.stats?.total ?? 0,
      });
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (review: GeneralReview) => {
    const ok = window.confirm(
      `Delete this review from "${review.name}"?\n\n"${review.title.slice(0, 80)}${review.title.length > 80 ? "…" : ""}"`
    );
    if (!ok) return;

    setDeletingId(review._id);
    try {
      await deleteGeneralReview(review._id);
      toast.success("Review deleted");
      await fetchReviews();
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      toast.error(msg || "Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = reviews.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q) ||
      (r.product && r.product.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Reviews</h1>
          <p className="text-sm text-gray-500">
            Customer reviews submitted from the public Reviews page (MongoDB collection{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">generalreviews</code>).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-500 uppercase">Total</p>
            <p className="text-lg font-bold text-gray-800">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-500 uppercase">Avg. rating</p>
            <p className="text-lg font-bold text-gray-800">
              {stats.total > 0 ? `${stats.average} / 5` : "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, title…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A017]/20 focus:border-[#D4A017]"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[200px]">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p className="text-sm font-medium">Loading reviews…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-gray-400">
              <AlertCircle className="w-10 h-10 opacity-20 mb-3" />
              <p className="text-sm font-medium">
                {searchTerm ? "No reviews match your search." : "No reviews yet."}
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Title &amp; review
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Product / Category
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((r) => (
                  <motion.tr
                    key={r._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="font-semibold text-gray-900 text-sm">{r.name}</div>
                      <div className="text-xs text-gray-500 break-all">{r.email}</div>
                      {r.location ? (
                        <div className="text-xs text-gray-400">{r.location}</div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 align-top text-sm font-bold text-gray-800">
                      {r.rating}★
                    </td>
                    <td className="px-4 py-3 align-top max-w-xs">
                      <div className="font-semibold text-gray-900 text-sm">{r.title}</div>
                      <div className="text-xs text-gray-600 mt-1 line-clamp-3">{r.comment}</div>
                      {r.tags?.length ? (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {r.tags.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-gray-700">
                      {r.product || "—"}
                      <div className="text-xs text-gray-400 capitalize">{r.category}</div>
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-gray-600 whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(r)}
                        disabled={deletingId === r._id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 disabled:opacity-50"
                      >
                        {deletingId === r._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400">
            Showing {filtered.length} of {reviews.length} reviews
          </p>
        </div>
      </div>
    </div>
  );
}

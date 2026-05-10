import axiosInstance from "./axiosInstance";

// ─── Product Reviews (for ProductDetail page) ─────────────────────────────────
export const reviewApi = {
  getProductReviews: async (productId: string) => {
    const response = await axiosInstance.get(`/reviews/product/${productId}`);
    return response.data;
  },
  addReview: async (productId: string, formData: FormData) => {
    const response = await axiosInstance.post(
      `/reviews/product/${productId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },
};

// ─── General Reviews (for /reviews page) ─────────────────────────────────────
export interface GeneralReview {
  _id: string;
  name: string;
  email: string;
  location: string;
  product: string;
  category: "powder" | "chunks" | "chocolate" | "combo" | "gift" | "other";
  title: string;
  comment: string;
  rating: number;
  tags: string[];
  image: string | null;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewStats {
  average: number;
  total: number;
  breakdown: { stars: number; count: number; pct: number }[];
}

export interface GeneralReviewsResponse {
  reviews: GeneralReview[];
  stats: ReviewStats;
}

export const generalReviewApi = {
  getAll: async (): Promise<GeneralReviewsResponse> => {
    const response = await axiosInstance.get("/general-reviews");
    return response.data.data;
  },

  submit: async (formData: FormData): Promise<GeneralReview> => {
    const response = await axiosInstance.post("/general-reviews", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  markHelpful: async (id: string): Promise<{ helpful: number }> => {
    const response = await axiosInstance.post(`/general-reviews/${id}/helpful`);
    return response.data.data;
  },
};

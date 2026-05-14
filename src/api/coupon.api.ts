import axiosInstance from "./axiosInstance";

export interface CouponPayload {
  code: string;
  description?: string;
  discountType: "Percentage" | "Flat" | "Free Shipping";
  discountValue?: number;
  minOrderValue?: number;
  usageLimit?: number;
  validFrom: string;
  validTo: string;
  status?: "Active" | "Expired" | "Scheduled";
}

export const couponApi = {
  getAll: async () => {
    const response = await axiosInstance.get("/coupons");
    return response.data;
  },

  create: async (data: CouponPayload) => {
    const response = await axiosInstance.post("/coupons", data);
    return response.data;
  },

  update: async (id: string, data: Partial<CouponPayload>) => {
    const response = await axiosInstance.put(`/coupons/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/coupons/${id}`);
    return response.data;
  },

  validate: async (code: string, orderValue?: number) => {
    const params = orderValue !== undefined ? { orderValue } : {};
    const response = await axiosInstance.get(
      `/coupons/validate/${encodeURIComponent(code)}`,
      { params }
    );
    return response.data;
  },
};

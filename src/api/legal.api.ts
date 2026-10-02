import axiosInstance from "./axiosInstance";
import type { LegalPageContent, LegalSlug } from "../data/legalDefaults";

export const legalApi = {
  /** Resolves to null when the page hasn't been edited in the admin yet (API 404). */
  get: async (slug: LegalSlug): Promise<LegalPageContent | null> => {
    try {
      const res = await axiosInstance.get<{ success: boolean; data: LegalPageContent }>(`/legal/${slug}`);
      return res.data.data;
    } catch (err: any) {
      if (err?.response?.status === 404) return null;
      throw err;
    }
  },
  update: async (slug: LegalSlug, body: LegalPageContent) => {
    const res = await axiosInstance.put<{ success: boolean; data: LegalPageContent }>(`/legal/${slug}`, body);
    return res.data.data;
  },
  reset: async (slug: LegalSlug) => {
    await axiosInstance.delete(`/legal/${slug}`);
  },
};

import axiosInstance from "./axiosInstance";

export interface StoreSettings {
  storeName?: string;
  storeEmail?: string;
  storePhone?: string;
  storeAddress?: string;
  currency?: string;
  enableTax?: boolean;
  taxRate?: number;
  enableCoupons?: boolean;
  minOrderAmount?: number;
  deliveryCharge?: number;
  freeShippingThreshold?: number;
  enableCOD?: boolean;
  maintenanceMode?: boolean;
  maintenanceMessage?: string;
}

export const settingsApi = {
  get: async () => {
    const res = await axiosInstance.get<{ success: boolean; data: StoreSettings }>("/settings");
    return res.data;
  },
  update: async (body: Partial<StoreSettings>) => {
    const res = await axiosInstance.put<{ success: boolean; data: StoreSettings }>("/settings", body);
    return res.data;
  },
};

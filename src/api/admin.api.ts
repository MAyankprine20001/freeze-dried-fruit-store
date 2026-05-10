import axiosInstance from "./axiosInstance";

export interface DashboardData {
  totalRevenue: number;
  revenueLast7Days: number;
  totalOrders: number;
  totalCustomers: number;
  conversionRate: number;
  todaysOrders: number;
  pendingOrders: number;
  lowStockAlerts: number;
  recentOrders: any[];
  salesOverview: { name: string; sales: number }[];
  ordersTrend: { name: string; sales: number }[];
  customersTrend: { name: string; sales: number }[];
  conversionTrend: { name: string; sales: number }[];
  topProducts: {
    productId: string;
    name: string;
    sold: number;
    image: string;
    category: string;
  }[];
  deltas: {
    revenuePct: number;
    ordersPct: number;
    customersPct: number;
    conversionPct: number;
  };
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export const getDashboardStats = async (): Promise<DashboardResponse> => {
  const res = await axiosInstance.get<DashboardResponse>("/admin/dashboard");
  return res.data;
};

export const patchOrderStatus = async (
  orderId: string,
  orderStatus: string
): Promise<{ success: boolean; data: unknown }> => {
  const res = await axiosInstance.patch(`/admin/orders/${orderId}/status`, {
    orderStatus,
  });
  return res.data;
};

export const deleteGeneralReview = async (
  id: string
): Promise<{ success: boolean; message?: string }> => {
  const res = await axiosInstance.delete(`/admin/general-reviews/${id}`);
  return res.data;
};

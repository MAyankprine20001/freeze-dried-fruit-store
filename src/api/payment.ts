import axiosInstance from "./axiosInstance";

// ─────────────────────────────────────────────────────────────────────────────
// ALL types are defined here no imports from CartContext or anywhere else.
// This avoids Vite ESM circular-dependency resolution errors.
// ─────────────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight?: string;
  category?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CreateOrderPayload {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  /** Deprecated: server computes from items + store delivery settings */
  subtotal?: number;
  shipping?: number;
  total?: number;
}

export interface CreateOrderResponse {
  success: boolean;
  data: {
    orderId: string;
    amount: number;
    currency: string;
    dbOrderId: string;
    keyId: string;
  };
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  dbOrderId: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  data: {
    orderId: string;
    razorpayPaymentId: string;
    amount: number;
    status: string;
  };
}

// ─── API calls ────────────────────────────────────────────────────────────────

export const createRazorpayOrder = async (
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> => {
  const res = await axiosInstance.post<CreateOrderResponse>(
    "/payments/create-order",
    payload
  );
  return res.data;
};

export const verifyRazorpayPayment = async (
  payload: VerifyPaymentPayload
): Promise<VerifyPaymentResponse> => {
  const res = await axiosInstance.post<VerifyPaymentResponse>(
    "/payments/verify",
    payload
  );
  return res.data;
};

export interface Order {
  _id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  orderStatus?: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  user?: string | { _id: string; email: string; fullName: string; phone?: string } | null;
}

export interface GetOrdersResponse {
  success: boolean;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
  data: Order[];
}

export interface AdminOrdersResponse {
  success: boolean;
  data: Order[];
  nextCursor: string | null;
  hasNextPage: boolean;
  limit: number;
  total: number;
}

export interface AdminOrderStatsResponse {
  success: boolean;
  total: number;
  countsByStatus: Record<string, number>;
}

export const getMyOrders = async (): Promise<GetOrdersResponse> => {
  const res = await axiosInstance.get<GetOrdersResponse>("/payments/my-orders");
  return res.data;
};

export const fetchOrderById = async (
  orderId: string
): Promise<{ success: boolean; data: Order }> => {
  const res = await axiosInstance.get<{ success: boolean; data: Order }>(
    `/payments/order/${orderId}`
  );
  return res.data;
};

export const getAdminOrderStats = async (params: {
  search?: string;
  paymentStatus?: string;
  paymentMethod?: string;
} = {}): Promise<AdminOrderStatsResponse> => {
  const q = new URLSearchParams();
  if (params.search) q.set("search", params.search);
  if (params.paymentStatus) q.set("paymentStatus", params.paymentStatus);
  if (params.paymentMethod) q.set("paymentMethod", params.paymentMethod);
  const qs = q.toString();
  const res = await axiosInstance.get<AdminOrderStatsResponse>(
    `/payments/admin/orders/stats${qs ? `?${qs}` : ""}`
  );
  return res.data;
};

export const getAdminOrders = async (params: {
  limit?: number;
  cursor?: string | null;
  search?: string;
  orderStatus?: string;
  paymentStatus?: string;
  paymentMethod?: string;
} = {}): Promise<AdminOrdersResponse> => {
  const q = new URLSearchParams();
  q.set("limit", String(params.limit ?? 20));
  if (params.cursor) q.set("cursor", params.cursor);
  if (params.search) q.set("search", params.search);
  if (params.orderStatus) q.set("orderStatus", params.orderStatus);
  if (params.paymentStatus) q.set("paymentStatus", params.paymentStatus);
  if (params.paymentMethod) q.set("paymentMethod", params.paymentMethod);
  const res = await axiosInstance.get<AdminOrdersResponse>(
    `/payments/admin/orders?${q.toString()}`
  );
  return res.data;
};

// ─── Razorpay SDK loader ──────────────────────────────────────────────────────

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
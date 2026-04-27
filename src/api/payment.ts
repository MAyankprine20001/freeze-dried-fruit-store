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
  subtotal: number;
  shipping: number;
  total: number;
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
  createdAt: string;
  updatedAt: string;
  user?: string | { _id: string; email: string; fullName: string } | null;
}

export interface GetOrdersResponse {
  success: boolean;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
  data: Order[];
}

export const getMyOrders = async (): Promise<GetOrdersResponse> => {
  const res = await axiosInstance.get<GetOrdersResponse>("/payments/my-orders");
  return res.data;
};

export const getAllOrders = async (page: number = 1, limit: number = 20): Promise<GetOrdersResponse> => {
  const res = await axiosInstance.get<GetOrdersResponse>(`/payments/admin/orders?page=${page}&limit=${limit}`);
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
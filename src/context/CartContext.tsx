import React, { createContext, useContext, useState, useEffect } from "react";
import { getProductPrimaryImage } from "../utils/productImage";
import type { CouponDiscountInput } from "../utils/couponDiscount";

export interface CartItem {
 id: string;
 name: string;
 price: number;
 image: string;
 quantity: number;
 weight?: string;
 category?: string;
}

export type AppliedCouponPayload = CouponDiscountInput & { code: string };

interface CartContextType {
 items: CartItem[];
 addToCart: (product: any) => void;
 removeFromCart: (id: string) => void;
 updateQuantity: (id: string, quantity: number) => void;
 clearCart: () => void;
 totalItems: number;
 subtotal: number;
 appliedCoupon: AppliedCouponPayload | null;
 setAppliedCoupon: (coupon: AppliedCouponPayload | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [appliedCoupon, setAppliedCoupon] = useState<AppliedCouponPayload | null>(null);
 const [items, setItems] = useState<CartItem[]>(() => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
   try {
    const parsed = JSON.parse(savedCart);
    return parsed.map((item: any) => ({
     ...item,
     id: item.id || item._id,
    })).filter((item: any) => item.id); // Also remove items with no ID at all
   } catch (e) {
    return [];
   }
  }
  return [];
 });

 useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(items));
 }, [items]);

 const addToCart = (product: any) => {
  setAppliedCoupon(null);
  const productId = product.id || product._id;
  const image = getProductPrimaryImage(product);
  setItems((prevItems) => {
   const existingItem = prevItems.find((item) => item.id === productId);
   if (existingItem) {
    return prevItems.map((item) =>
     item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
   }
   return [...prevItems, { ...product, id: productId, quantity: 1, image }];
  });
 };

 const removeFromCart = (id: string) => {
  setAppliedCoupon(null);
  setItems((prevItems) => prevItems.filter((item) => item.id !== id));
 };

 const updateQuantity = (id: string, quantity: number) => {
  setAppliedCoupon(null);
  if (quantity < 1) return;
  setItems((prevItems) =>
   prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
  );
 };

 const clearCart = () => {
  setItems([]);
  setAppliedCoupon(null);
 };

 const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
 const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

 return (
  <CartContext.Provider
   value={{
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    appliedCoupon,
    setAppliedCoupon,
   }}
  >
   {children}
  </CartContext.Provider>
 );
};

export const useCart = () => {
 const context = useContext(CartContext);
 if (context === undefined) {
  throw new Error("useCart must be used within a CartProvider");
 }
 return context;
};

import React, { Suspense, lazy } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";

import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import ProtectedRoute from "./src/components/ProtectedRoute";

import Home from "./src/pages/Home";
import NotFound from "./src/pages/NotFound";
import ContactWidget from "./src/components/ContactWidget";

const About = lazy(() => import("./src/pages/About"));
const FruitPowderChunks = lazy(() => import("./src/pages/FruitPowderChunks"));
const Chocolate = lazy(() => import("./src/pages/Chocolate"));
const FAQ = lazy(() => import("./src/pages/FAQ"));
const Contact = lazy(() => import("./src/pages/Contact"));
const Products = lazy(() => import("./src/pages/Products"));
const ProductDetail = lazy(() => import("./src/pages/ProductDetail"));
const SmoothiePremix = lazy(() => import("./src/pages/SmoothiePremix"));
const Combos = lazy(() => import("./src/pages/Combos"));
const Reviews = lazy(() => import("./src/pages/Reviews"));
const BulkOrders = lazy(() => import("./src/pages/BulkOrders"));
const Blog = lazy(() => import("./src/pages/Blog"));
const PrivacyPolicy = lazy(() => import("./src/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./src/pages/TermsOfService"));

// Auth Pages
const Login = lazy(() => import("./src/pages/auth/Login"));
const Signup = lazy(() => import("./src/pages/auth/Signup"));
const ForgotPassword = lazy(() => import("./src/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./src/pages/auth/ResetPassword"));
const VerifyEmail = lazy(() => import("./src/pages/auth/VerifyEmail"));

// Store Pages
const Cart = lazy(() => import("./src/pages/Cart"));
const Checkout = lazy(() => import("./src/pages/Checkout"));          // ← NEW
const OrderSuccess = lazy(() => import("./src/pages/OrderSuccess"));  // ← NEW
const Profile = lazy(() => import("./src/pages/Profile"));            // ← NEW

// Admin Pages
const AdminLayout = lazy(() => import("./src/components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./src/pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./src/pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("./src/pages/admin/AdminOrders"));
const AdminCustomers = lazy(() => import("./src/pages/admin/AdminCustomers"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
  </div>
);

const App: React.FC = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <AuthProvider>
        <CartProvider>
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/fruit-powder-chunks" element={<FruitPowderChunks />} />
                <Route path="/chocolate" element={<Chocolate />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/bulk-orders" element={<BulkOrders />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/smoothie-premix" element={<SmoothiePremix />} />
                <Route path="/combos" element={<Combos />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                {/* Store */}
                <Route path="/cart" element={<Cart />} />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="transactions" element={<div>Transactions List (Coming Soon)</div>} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="settings" element={<div>Admin Settings (Coming Soon)</div>} />
                </Route>


                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <ToastContainer
              position="top-right"
              autoClose={4000}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
            <ContactWidget />
          </Router>
        </CartProvider>
      </AuthProvider>
    </Theme>
  );
};

export default App;

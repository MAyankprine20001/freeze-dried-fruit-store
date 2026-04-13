import React, { Suspense, lazy } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";

import Home from "./src/pages/Home";
import NotFound from "./src/pages/NotFound";
import ContactWidget from "./src/components/ContactWidget";

const About = lazy(() => import("./src/pages/About"));
const FruitPowderChunks = lazy(() => import("./src/pages/FruitPowderChunks"));
const Chocolate = lazy(() => import("./src/pages/Chocolate"));
const FAQ = lazy(() => import("./src/pages/FAQ"));
const Contact = lazy(() => import("./src/pages/Contact"));
const Products = lazy(() => import("./src/pages/Products"));
const SmoothiePremix = lazy(() => import("./src/pages/SmoothiePremix"));
const Combos = lazy(() => import("./src/pages/Combos"));
const Reviews = lazy(() => import("./src/pages/Reviews"));
const BulkOrders = lazy(() => import("./src/pages/BulkOrders"));
const Blog = lazy(() => import("./src/pages/Blog"));
const PrivacyPolicy = lazy(() => import("./src/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./src/pages/TermsOfService"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-[#e85d26] border-t-transparent rounded-full animate-spin" />
  </div>
);

const App: React.FC = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/fruit-powder-chunks" element={<FruitPowderChunks />} />
            <Route path="/chocolate" element={<Chocolate />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/bulk-orders" element={<BulkOrders />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/smoothie-premix" element={<SmoothiePremix />} />
            <Route path="/combos" element={<Combos />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
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
    </Theme>
  );
};

export default App;

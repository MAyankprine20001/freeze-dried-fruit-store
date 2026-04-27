import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
 children: React.ReactNode;
 adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
 const { user, loading, isAdmin } = useAuth();
 const location = useLocation();

 if (loading) {
  return (
   <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-[#e85d26] border-t-transparent rounded-full animate-spin" />
   </div>
  );
 }

 if (!user) {
  // Redirect to login but save the current location they were trying to access
  return <Navigate to="/login" state={{ from: location }} replace />;
 }

 if (adminOnly && !isAdmin) {
  // If user is logged in but not an admin, redirect to home
  return <Navigate to="/" replace />;
 }

 return <>{children}</>;
};

export default ProtectedRoute;

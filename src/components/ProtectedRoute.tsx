import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

interface ProtectedRouteProps {
 children: React.ReactNode;
 adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
 const { user, loading, isAdmin } = useAuth();
 const location = useLocation();

 if (loading) {
  return <Loader size="fullscreen" text="Authenticating..." />;
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

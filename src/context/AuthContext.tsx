import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/auth.api";
import type { User } from "../api/auth.api";
import { setAccessToken } from "../api/axiosInstance";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (userData: { fullName: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On app load — try to fetch current user using cookie-based refresh
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try refreshing first to get a fresh access token (cookie is sent automatically)
        const { token } = await authApi.refreshToken();
        setAccessToken(token);

        // Now fetch user with fresh token
        const userData = await authApi.getMe();
        setUser(userData);
      } catch {
        // No valid session — user not logged in
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const { token, user: userData } = await authApi.login(credentials);
    setAccessToken(token); // store in memory
    setUser(userData);
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    await authApi.register(userData);
  };

  const logout = async () => {
    try {
      await authApi.logout(); // clears httpOnly cookie on server
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
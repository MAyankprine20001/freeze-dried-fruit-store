import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/auth.api";
import type { User } from "../api/auth.api";
import { setAccessToken } from "../api/axiosInstance";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (userData: { fullName: string; email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On app load — try to restore session via httpOnly refresh token cookie
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Cookie is sent automatically (withCredentials: true)
        const { token } = await authApi.refreshToken();
        setAccessToken(token); // store in memory only

        // Fetch user with fresh access token
        const userData = await authApi.getMe();
        setUser(userData);
      } catch {
        // No valid session — not logged in
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const { success, message, data } = await authApi.login(credentials);

    if (!success) throw new Error(message);

    setAccessToken(data.token); // ✅ memory only — never localStorage
    setUser(data.user);
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    const { success, message } = await authApi.register(userData);

    if (!success) throw new Error(message);

    // Don't auto-login — user needs to verify email first
    return { success, message };
  };

  const logout = async () => {
    try {
      await authApi.logout(); // clears httpOnly refreshToken cookie on server
    } finally {
      setAccessToken(null); // clear memory token
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
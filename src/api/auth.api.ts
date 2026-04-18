import axiosInstance from "./axiosInstance";

export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "customer";
    isEmailVerified: boolean;
}

interface AuthResponse {
    token: string;
    user: User;
}

interface ApiSuccess<T> {
    success: boolean;
    message: string;
    data: T;
}

export const authApi = {
    register: async (data: {
        fullName: string;
        email: string;
        password: string;
    }) => {
        const res = await axiosInstance.post<ApiSuccess<AuthResponse>>("/auth/register", data);
        return res.data; // { success, message, data: { token, user } }
    },

    login: async (data: { email: string; password: string }) => {
        const res = await axiosInstance.post<ApiSuccess<AuthResponse>>("/auth/login", data);
        return res.data; // { success, message, data: { token, user } }
    },

    getMe: async () => {
        const res = await axiosInstance.get<ApiSuccess<User>>("/auth/me");
        return res.data.data; // just the user object
    },

    logout: async () => {
        await axiosInstance.post("/auth/logout");
    },

    refreshToken: async () => {
        const res = await axiosInstance.post<ApiSuccess<{ token: string }>>("/auth/refresh-token");
        return res.data.data; // { token }
    },

    verifyEmail: async (token: string) => {
        const res = await axiosInstance.get<ApiSuccess<null>>(`/auth/verify-email?token=${token}`);
        return res.data;
    },
};
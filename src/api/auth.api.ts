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

export const authApi = {
    register: async (data: {
        fullName: string;
        email: string;
        password: string;
    }) => {
        const res = await axiosInstance.post<{ data: AuthResponse }>("/auth/register", data);
        return res.data.data;
    },

    login: async (data: { email: string; password: string }) => {
        const res = await axiosInstance.post<{ data: AuthResponse }>("/auth/login", data);
        return res.data.data;
    },

    getMe: async () => {
        const res = await axiosInstance.get<{ data: User }>("/auth/me");
        return res.data.data;
    },

    logout: async () => {
        await axiosInstance.post("/auth/logout");
    },

    refreshToken: async () => {
        const res = await axiosInstance.post<{ data: { token: string } }>("/auth/refresh-token");
        return res.data.data;
    },
};
import axios from "axios";

// This line already handles it perfectly ✅
const BASE_URL = import.meta.env.VITE_API_URL || "https://api.thedryfactory.com/api/v1";

// ─── Access token stored in memory only (not localStorage) ───────────────────
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

// ─── Axios Instance ───────────────────────────────────────────────────────────
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // sends httpOnly refresh token cookie automatically
    headers: {
        "Content-Type": "application/json",
    },
});

// ─── Request Interceptor: attach access token to every request ────────────────
axiosInstance.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor: auto-refresh on 401 ───────────────────────────────
let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // ✅ CRITICAL: Don't retry refresh-token requests — breaks infinite loop
        if (originalRequest.url?.includes("/auth/refresh-token")) {
            return Promise.reject(error);
        }

        // ✅ CRITICAL: Don't retry login/register — no point refreshing on auth routes
        if (
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/register")
        ) {
            return Promise.reject(error);
        }

        // If 401 and not already retrying
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue requests while refresh is in progress
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Cookie is sent automatically (withCredentials: true)
                const { data } = await axios.post(
                    `${BASE_URL}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                const newToken = data.data.token;
                setAccessToken(newToken);
                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                setAccessToken(null);
                // Only redirect if user was actually logged in
                if (accessToken) {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
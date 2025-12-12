import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { routeConfig } from "./routeConfig";
import { toastConfig } from "./toastConfig";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
}

// =============================
// axios instance chính
// =============================
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_LOCAL,
    timeout: 60000,
    headers: { "Content-Type": "application/json" }
});

// =============================
// axios instance riêng cho refresh
// KHÔNG có interceptor → tránh loop
// =============================
const refreshClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_LOCAL,
    timeout: 60000,
    headers: { "Content-Type": "application/json" }
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onTokenRefreshed(newToken: string) {
    refreshSubscribers.forEach(cb => cb(newToken));
    refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
    refreshSubscribers.push(callback);
}

// =============================
// Request Interceptor
// =============================
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers?.set("Authorization", `Bearer ${token}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// =============================
// Response Interceptor
// =============================
api.interceptors.response.use(
    (response: AxiosResponse) => response.data,

    async (error: AxiosError): Promise<any> => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry;

        // ================
        // Nếu API refresh Token lỗi → redirect luôn
        // ================
        if (originalRequest?.url?.includes("/auth/refresh")) {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            toastConfig({
                toastType: "error",
                toastMessage: "Phiên đăng nhập đã hết hạn"
            });

            window.location.replace(routeConfig.login.root);
            return Promise.reject(error);
        }

        // ================
        // Token hết hạn → refresh
        // ================
        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            // Đang refresh → queue request lại
            if (isRefreshing) {
                return new Promise((resolve) => {
                    addRefreshSubscriber((newToken) => {
                        originalRequest.headers = {
                            ...originalRequest.headers,
                            Authorization: `Bearer ${newToken}`
                        };
                        resolve(api(originalRequest));
                    });
                });
            }

            // Bắt đầu refresh
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) throw new Error("Missing refresh token");

                const res = await refreshClient.post("/auth/refresh", {
                    refresh_token: refreshToken
                });

                const newAccessToken = res.data.accessToken;
                const newRefreshToken = res.data.refresh_token;

                // Lưu token mới
                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                // Gọi lại các request bị queue
                onTokenRefreshed(newAccessToken);

                // Gán lại token vào request ban đầu
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${newAccessToken}`
                };

                return api(originalRequest);

            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);

                // Xóa token
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                toastConfig({
                    toastType: "error",
                    toastMessage: "Phiên đăng nhập đã hết hạn"
                });

                // Redirect chắc chắn chạy
                setTimeout(() => {
                    window.location.replace(routeConfig.login.root);
                }, 0);

                return Promise.reject(refreshError);

            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;

export const cloudinaryRoot = import.meta.env.VITE_PATH_CLOUDINARY
export const cloudinaryThumbnail = "https://res.cloudinary.com/dz1o0fpi6/image/upload/w_200,h_200,c_fill,g_auto,f_auto,q_auto:eco,fl_strip_profile/v1762183131/"
export const noImageURL = "https://res.cloudinary.com/dz1o0fpi6/image/upload/w_200,h_200,c_fill,g_auto,f_auto,q_auto:eco,fl_strip_profile/v1762183131/noImage_eakrcb"

// w_200,h_200 → resize xuống 200x200px
// c_fill → crop đầy đủ, giữ center
// g_auto → crop focus thông minh, nếu là người/subject thì lấy trọng tâm
// f_auto → Cloudinary tự chuyển định dạng (WebP/AVIF) → nhẹ hơn JPEG/PNG
// q_auto:eco → nén cực mạnh, giảm dung lượng
// fl_strip_profile → loại bỏ metadata thừa (EXIF…)
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { routeConfig } from "./routeConfig";
import { toastConfig } from "./toastConfig";
import { store } from "../redux/store";
import { setAuth, setUserData } from "../redux/state/authReducer";
import axiosRetry from 'axios-retry';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

/* =============================
   Config
============================= */

const BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_LOCAL;

const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/require-reset",
];

/* =============================
   Axios instances
============================= */

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

const refreshClient = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

/* =============================
   Axios retry
============================= */

axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay, // Tự động tăng thời gian chờ (2s, 4s, 8s)
  shouldResetTimeout: true,
  retryCondition: (error) => {
    // Retry nếu lỗi mạng, timeout, hoặc lỗi 500 từ Render/Supabase
    toastConfig({
      toastType: "error",
      toastMessage: "Lấy dữ liệu thất bại. Đang thử lại..."
    })

    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === 'ECONNABORTED' ||
      (error.response?.status ?? 0) >= 500;
  },
  onRetry: (retryCount, error) => {
    console.log(`Retry attempt #${retryCount}`);
  }
});

/* =============================
   Refresh state
============================= */

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

/* 🔧 [SỬA] thêm xử lý refresh fail */
function onRefreshFailed() {
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

/* =============================
   Request interceptor
============================= */

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

/* =============================
   Response interceptor
============================= */

api.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (!originalRequest || !originalRequest.url) {
      return Promise.reject(error);
    }

    /* =============================
       1. Bỏ qua PUBLIC endpoints
    ============================= */

    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
      originalRequest.url!.includes(endpoint)
    );

    if (isPublicEndpoint) {
      return Promise.reject(error);
    }

    /* =============================
       2. Chưa login → reject
    ============================= */

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return Promise.reject(error);
    }

    /* =============================
       3. BẮT 401 LÀ UNAUTHORIZED
       🔧 [SỬA] bỏ check code === TOKEN_EXPIRED
    ============================= */

    const isUnauthorized = error.response?.status === 401;

    if (!isUnauthorized || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /* =============================
       4. Đang refresh → queue request
    ============================= */

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        addRefreshSubscriber((newToken) => {
          if (!newToken) {
            reject(error);
            return;
          }

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };

          resolve(api(originalRequest));
        });
      });
    }

    /* =============================
       5. Thực hiện refresh
    ============================= */

    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("Missing refresh token");
      }

      const res = await refreshClient.post("/auth/refresh", {
        refresh_token: refreshToken,
      });

      const newAccessToken = res.data.accessToken;
      const newRefreshToken = res.data.refresh_token;
      const newExpiresAt = res.data.expires_at;

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      if (newExpiresAt) {
        localStorage.setItem("expires_at", newExpiresAt.toString());
      }

      onTokenRefreshed(newAccessToken);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return api(originalRequest);
    } catch (refreshError) {
      const axiosError = refreshError as AxiosError

      // 1. Client tự huỷ request → KHÔNG logout
      if (
        axios.isCancel(axiosError) ||
        axiosError.code === 'ERR_CANCELED'
      ) {
        onRefreshFailed()
        return Promise.reject(refreshError)
      }

      // 2. Không phải Unauthorized → KHÔNG logout
      if (axiosError.response?.status !== 401) {
        onRefreshFailed()
        return Promise.reject(refreshError)
      }

      // 3. Chỉ refresh fail + 401 mới logout
      onRefreshFailed()
      cleanupAndRedirect()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false;
    }
  }
);

/* =============================
   Helpers
============================= */

function cleanupAndRedirect() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expires_at");
  store.dispatch(setUserData({ userData: null }))
  store.dispatch(setAuth({ auth: false }))

  toastConfig({
    toastType: "error",
    toastMessage: "Phiên đăng nhập đã hết hạn",
  });
}

/* =============================
   Exports
============================= */

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
// Không làm ảnh hưởng ảnh gốc
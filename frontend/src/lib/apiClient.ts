import axios from "axios";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// In-memory token store
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true, // sends httpOnly refresh token cookie
});

// Attach access token to every request
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// Auto-refresh on 401
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

if (
  error.response?.status === 401 &&
  !originalRequest._retry &&
  !originalRequest.url?.includes("/auth/refresh") &&
  !originalRequest.url?.includes("/auth/login") &&
  !originalRequest.url?.includes("/auth/register")
) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${BACKEND_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken: string = res.data.data.accessToken;
        setAccessToken(newToken);
        onRefreshed(newToken);
        isRefreshing = false;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch {
        isRefreshing = false;
        setAccessToken(null);
        // redirect to login handled by AuthContext
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

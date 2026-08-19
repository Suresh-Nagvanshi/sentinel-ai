import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
const apiClient = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } });
let refreshRequest = null;

const clearSession = () => {
  localStorage.removeItem('sentinel_access_token');
  localStorage.removeItem('sentinel_refresh_token');
  window.dispatchEvent(new Event('sentinel:auth-expired'));
};

const refreshAccessToken = async () => {
  if (!refreshRequest) {
    refreshRequest = axios.post(`${baseURL}/auth/refresh`, {
      refreshToken: localStorage.getItem('sentinel_refresh_token'),
    }).then(({ data }) => {
      const payload = data.data;
      localStorage.setItem('sentinel_access_token', payload.accessToken);
      localStorage.setItem('sentinel_refresh_token', payload.refreshToken);
      return payload.accessToken;
    }).finally(() => { refreshRequest = null; });
  }
  return refreshRequest;
};

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('sentinel_access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint = originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/refresh');
    if (error.response?.status !== 401 || originalRequest?._retry || isAuthEndpoint) return Promise.reject(error);

    originalRequest._retry = true;
    try {
      const accessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      clearSession();
      if (window.location.pathname !== '/login') window.location.assign('/login');
      return Promise.reject(refreshError);
    }
  }
);

export { clearSession };
export default apiClient;

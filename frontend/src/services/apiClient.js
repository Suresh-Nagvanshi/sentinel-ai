import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor — unwrap .data, pass errors through
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default apiClient;

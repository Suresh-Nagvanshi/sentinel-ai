import apiClient from './apiClient';

export const authService = {
  login: async (credentials) => {
    const payload = {
      email: credentials.email || credentials.username,
      password: credentials.password,
    };
    const res = await apiClient.post('/auth/login', payload);
    const data = res?.data || res;
    const token = data?.accessToken || data?.token;
    if (token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('token', token);
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
    }
    return res;
  },
  refresh: (refreshToken) => apiClient.post('/auth/refresh', { refreshToken }),
  logout: (refreshToken) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return apiClient.post('/auth/logout', { refreshToken });
  },
  getCurrentUser: () => apiClient.get('/auth/me'),
};

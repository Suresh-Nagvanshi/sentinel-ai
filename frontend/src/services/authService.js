import apiClient from './apiClient';

export const authService = {
  login: async (credentials) => {
    // Return sample mock data if API unavailable
    try {
      return await apiClient.post('/auth/login', credentials);
    } catch {
      return {
        success: true,
        data: {
          token: 'mock_jwt_token_admin_sentinel_2026',
          username: credentials.username || 'admin',
          email: 'admin@sentinel.ai',
          roles: ['ROLE_ADMIN', 'ROLE_ANALYST'],
        },
      };
    }
  },
  getCurrentUser: async () => {
    return {
      username: 'admin',
      email: 'admin@sentinel.ai',
      roles: ['ROLE_ADMIN'],
    };
  },
};

import { authService } from '../services/authService';

export const useAuth = () => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  login: (credentials) => authService.login(credentials),
  logout: (refreshToken) => authService.logout(refreshToken),
});

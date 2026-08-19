import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { clearSession } from '../services/apiClient';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('sentinel_access_token');

  const resetSession = () => {
    clearSession();
    setUser(null);
  };

  useEffect(() => {
    const onExpired = () => setUser(null);
    window.addEventListener('sentinel:auth-expired', onExpired);
    if (accessToken) {
      authService
        .getCurrentUser()
        .then((response) => setUser(response.data))
        .catch(resetSession)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => window.removeEventListener('sentinel:auth-expired', onExpired);
  }, [accessToken]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const payload = response.data;
    localStorage.setItem('sentinel_access_token', payload.accessToken);
    localStorage.setItem('sentinel_refresh_token', payload.refreshToken);
    setUser(payload.user);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('sentinel_refresh_token');
    try {
      if (refreshToken) await authService.logout(refreshToken);
    } finally {
      resetSession();
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), loading, login, logout, refreshToken: () => authService.refresh(localStorage.getItem('sentinel_refresh_token')) }}>
      {children}
    </AuthContext.Provider>
  );
};

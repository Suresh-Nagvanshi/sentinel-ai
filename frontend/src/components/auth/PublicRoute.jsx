import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../ui/Loader';

export const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loader size="lg" className="min-h-screen" />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

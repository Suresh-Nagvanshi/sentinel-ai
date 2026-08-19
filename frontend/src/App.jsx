import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Loader } from './components/ui/Loader';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { LiveMonitoring } from './pages/LiveMonitoring';
import { Incidents } from './pages/Incidents';
import { Reports } from './pages/Reports';
import { Analytics } from './pages/Analytics';
import { Policies } from './pages/Policies';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader size="lg" className="min-h-screen" />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loader size="lg" className="min-h-screen" />;
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default function App() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/live-monitoring" element={<LiveMonitoring />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { RoleProtectedRoute } from './components/auth/RoleProtectedRoute';
import { PublicRoute } from './components/auth/PublicRoute';
import { ROLES } from './constants/roles';
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

export default function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<RoleProtectedRoute roles={[ROLES.ADMIN, ROLES.SECURITY_OFFICER]} />}>
          <Route path="/monitoring" element={<LiveMonitoring />} />
        </Route>
        <Route path="/live-monitoring" element={<Navigate to="/monitoring" replace />} />
        <Route element={<RoleProtectedRoute roles={[ROLES.ADMIN, ROLES.SECURITY_OFFICER]} />}>
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
        <Route element={<RoleProtectedRoute roles={[ROLES.ADMIN]} />}>
          <Route path="/policies" element={<Policies />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

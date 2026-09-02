import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/monitoring" element={<LiveMonitoring />} />
      <Route path="/live-monitoring" element={<Navigate to="/monitoring" replace />} />
      <Route path="/incidents" element={<Incidents />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="/users" element={<Users />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

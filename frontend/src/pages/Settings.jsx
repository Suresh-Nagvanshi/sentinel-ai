import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';

export const Settings = () => (
  <MainLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-100">Platform Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Environment and integration settings reserved for future configuration APIs.</p>
      </div>
      <Card title="Service Configuration">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <label className="space-y-2"><span className="text-slate-400">Backend API</span><input readOnly value={import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'} className="w-full bg-sentinel-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200" /></label>
          <label className="space-y-2"><span className="text-slate-400">AI Engine</span><input readOnly value={import.meta.env.VITE_AI_ENGINE_URL || 'http://localhost:8000'} className="w-full bg-sentinel-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200" /></label>
        </div>
      </Card>
    </div>
  </MainLayout>
);

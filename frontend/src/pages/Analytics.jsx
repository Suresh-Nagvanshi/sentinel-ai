import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { IncidentTrendChart } from '../components/charts/IncidentTrendChart';
import { RiskDistributionChart } from '../components/charts/RiskDistributionChart';

export const Analytics = () => (
  <MainLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-100">Security Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">Placeholder analytics surface for aggregated threat telemetry.</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <IncidentTrendChart />
        <RiskDistributionChart />
      </div>
      <Card title="Analytics API Contract" subtitle="Ready for backend aggregation endpoints">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-sentinel-900 border border-slate-800 rounded-lg p-4">Incident trends</div>
          <div className="bg-sentinel-900 border border-slate-800 rounded-lg p-4">Risk distribution</div>
          <div className="bg-sentinel-900 border border-slate-800 rounded-lg p-4">Endpoint coverage</div>
        </div>
      </Card>
    </div>
  </MainLayout>
);

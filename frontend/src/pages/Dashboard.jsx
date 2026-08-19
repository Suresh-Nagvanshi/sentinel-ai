import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { MetricCard } from '../components/dashboard/MetricCard';
import { Timeline } from '../components/dashboard/Timeline';
import { IncidentTable } from '../components/incidents/IncidentTable';
import { AlertPanel } from '../components/alerts/AlertPanel';
import { RiskGauge } from '../components/monitoring/RiskGauge';
import { IncidentTrendChart } from '../components/charts/IncidentTrendChart';
import { useIncidents } from '../hooks/useIncidents';
import { useAlerts } from '../hooks/useAlerts';
import { ShieldAlert, Video, Eye, AlertOctagon } from 'lucide-react';

export const Dashboard = () => {
  const { data: incidentRes } = useIncidents();
  const { data: alertsRes, acknowledgeAlert } = useAlerts();

  const incidents = incidentRes?.data?.content || [];
  const alerts = alertsRes?.data || [];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 tracking-tight">Security Command Operations Center</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time AI telemetry analysis and insider threat protection dashboard.</p>
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Engine Online (v1.0)
            </span>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard title="Monitored Endpoints" value="1,420" change="+12" changeType="positive" icon={ShieldAlert} color="blue" />
          <MetricCard title="Screen Recording Blocked" value="38" change="+4" changeType="positive" icon={Video} color="rose" />
          <MetricCard title="Optical Devices Detected" value="14" change="-2" changeType="positive" icon={Eye} color="amber" />
          <MetricCard title="Active Incident Tickets" value="3" change="0" changeType="positive" icon={AlertOctagon} color="emerald" />
        </div>

        {/* Middle Charts & Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <IncidentTrendChart />
          </div>
          <div>
            <RiskGauge score={14.8} status="LOW" />
          </div>
        </div>

        {/* Alert Panel & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AlertPanel alerts={alerts} onAcknowledge={acknowledgeAlert} />
          </div>
          <div>
            <Timeline />
          </div>
        </div>

        {/* Incident Table */}
        <div className="glass-card rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <h3 className="text-base font-semibold text-slate-100">Recent Critical Incidents</h3>
            <span className="text-xs text-slate-400">Auto-synced from Spring Boot JPA</span>
          </div>
          <IncidentTable incidents={incidents} />
        </div>
      </div>
    </MainLayout>
  );
};

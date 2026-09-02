import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { IncidentTrendChart } from '../components/charts/IncidentTrendChart';
import { RiskDistributionChart } from '../components/charts/RiskDistributionChart';
import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../services/analyticsService';
import {
  BarChart3,
  ShieldAlert,
  AlertTriangle,
  Eye,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

const ENGINE_DATA = [
  { engine: 'ProcessMonitor',    detections: 42, blocked: 38 },
  { engine: 'YOLOv8 Object',     detections: 31, blocked: 27 },
  { engine: 'MediaPipe Face',    detections: 19, blocked: 17 },
  { engine: 'EasyOCR',           detections: 14, blocked: 11 },
  { engine: 'Screen Capture',    detections: 28, blocked: 24 },
];

const WEEKLY_RISK = [
  { week: 'W1 Aug', score: 62 },
  { week: 'W2 Aug', score: 74 },
  { week: 'W3 Aug', score: 58 },
  { week: 'W4 Aug', score: 81 },
  { week: 'W1 Sep', score: 48 },
  { week: 'W2 Sep', score: 55 },
];

const KpiCard = ({ label, value, sub, Icon, color, trend }) => (
  <div className="glass-card rounded-xl p-5 border border-slate-800 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-400 font-medium">{label}</span>
      <div className={`p-2 rounded-xl ${color}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
    </div>
    <p className="text-3xl font-extrabold text-slate-100">{value}</p>
    <div className="flex items-center gap-1 text-[11px]">
      {trend === 'up' ? (
        <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
      ) : (
        <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
      )}
      <span className={trend === 'up' ? 'text-rose-400' : 'text-emerald-400'}>{sub}</span>
    </div>
  </div>
);

const CUSTOM_TOOLTIP_STYLE = {
  contentStyle: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, fontSize: 11 },
  labelStyle: { color: '#94a3b8' },
  itemStyle: { color: '#cbd5e1' },
};

export const Analytics = () => {
  const [engineTab, setEngineTab] = useState('detections');
  const { data: trendsData } = useQuery({ queryKey: ['trends'], queryFn: analyticsService.getTrends });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Security Analytics
            </h1>
            <p className="text-xs text-slate-400 mt-1">Aggregated threat telemetry and engine-level detection intelligence.</p>
          </div>
          <div className="flex gap-2 text-xs">
            {['detections', 'blocked'].map((t) => (
              <button
                key={t}
                onClick={() => setEngineTab(t)}
                className={`px-3 py-1.5 rounded-xl border font-medium transition capitalize ${
                  engineTab === t
                    ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                    : 'border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Total Detections (7d)" value="134" sub="+18% vs last week" Icon={ShieldAlert} color="bg-blue-600" trend="up" />
          <KpiCard label="Threats Blocked"       value="117" sub="87% block rate" Icon={AlertTriangle}  color="bg-rose-600"  trend="down" />
          <KpiCard label="Avg Risk Score"        value="14.8" sub="-6pt vs last week" Icon={Eye}           color="bg-amber-600" trend="down" />
          <KpiCard label="Open Incidents"        value="3"   sub="-2 resolved today" Icon={BarChart3}     color="bg-emerald-600" trend="down" />
        </div>

        {/* Incident Trend + Risk Distribution */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <IncidentTrendChart />
          <RiskDistributionChart />
        </div>

        {/* Engine Breakdown Bar Chart */}
        <Card
          title="AI Engine Detection Breakdown"
          subtitle="Detections vs blocked events per engine module (last 30 days)"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ENGINE_DATA} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="engine" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip {...CUSTOM_TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              <Bar dataKey={engineTab === 'detections' ? 'detections' : 'blocked'}
                   name={engineTab === 'detections' ? 'Detections' : 'Blocked'}
                   fill={engineTab === 'detections' ? '#3b82f6' : '#ef4444'}
                   radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Weekly Risk Trend */}
        <Card title="Weekly Aggregate Risk Score Trend" subtitle="Composite risk index across all monitored endpoints">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY_RISK} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip {...CUSTOM_TOOLTIP_STYLE} />
              <Bar dataKey="score" name="Risk Score" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </MainLayout>
  );
};

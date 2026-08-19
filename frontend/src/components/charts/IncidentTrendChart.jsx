import React from 'react';
import { Card } from '../ui/Card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const IncidentTrendChart = ({ data = [] }) => {
  const defaultData = [
    { day: 'Mon', critical: 4, high: 8, medium: 12 },
    { day: 'Tue', critical: 2, high: 5, medium: 9 },
    { day: 'Wed', critical: 7, high: 11, medium: 14 },
    { day: 'Thu', critical: 3, high: 6, medium: 10 },
    { day: 'Fri', critical: 9, high: 15, medium: 20 },
    { day: 'Sat', critical: 1, high: 2, medium: 4 },
    { day: 'Sun', critical: 0, high: 1, medium: 3 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <Card title="Threat Incident Trends (7 Days)" subtitle="Daily distribution of detected security anomalies">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4d" />
            <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: '#0e1526', borderColor: '#1e2d4d', borderRadius: '8px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="critical" stroke="#ef4444" fillOpacity={1} fill="url(#colorCritical)" name="Critical Threats" />
            <Area type="monotone" dataKey="high" stroke="#f97316" fillOpacity={1} fill="url(#colorHigh)" name="High Threats" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

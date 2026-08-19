import React from 'react';
import { Card } from '../ui/Card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const RiskDistributionChart = ({ data }) => {
  const defaultData = [
    { name: 'Critical', value: 8, color: '#ef4444' },
    { name: 'High', value: 24, color: '#f97316' },
    { name: 'Medium', value: 45, color: '#eab308' },
    { name: 'Low', value: 120, color: '#10b981' },
  ];

  return (
    <Card title="Incident Risk Breakdown" subtitle="Distribution by severity level">
      <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={defaultData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {defaultData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#0e1526', borderColor: '#1e2d4d', borderRadius: '8px', fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

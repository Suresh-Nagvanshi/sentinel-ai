import React from 'react';
import { Card } from '../ui/Card';

export const MetricCard = ({ title, value, change, changeType = 'positive', icon: Icon, color = 'blue' }) => {
  const iconGradients = {
    blue: 'from-blue-600 to-cyan-600 text-blue-100 shadow-blue-500/30',
    rose: 'from-rose-600 to-pink-600 text-rose-100 shadow-rose-500/30',
    amber: 'from-amber-600 to-yellow-600 text-amber-100 shadow-amber-500/30',
    emerald: 'from-emerald-600 to-teal-600 text-emerald-100 shadow-emerald-500/30',
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-extrabold text-slate-100 mt-2 font-mono">{value}</h3>
          {change && (
            <p className={`text-xs font-semibold mt-2 ${changeType === 'positive' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {change} <span className="text-slate-500 font-normal">vs last week</span>
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl bg-gradient-to-tr ${iconGradients[color] || iconGradients.blue} shadow-lg`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
};

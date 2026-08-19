import React from 'react';
import { Card } from '../ui/Card';

export const RiskGauge = ({ score = 14.8, status = 'LOW' }) => {
  const getScoreColor = (val) => {
    if (val > 75) return 'from-rose-600 to-red-500 text-rose-400';
    if (val > 50) return 'from-amber-600 to-yellow-500 text-amber-400';
    return 'from-emerald-600 to-teal-500 text-emerald-400';
  };

  return (
    <Card title="Overall Enterprise Risk Index" subtitle="Aggregated AI composite risk assessment">
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="relative flex items-center justify-center w-36 h-36 rounded-full glass-panel border border-slate-700 shadow-2xl">
          <div className="text-center">
            <span className={`text-4xl font-extrabold font-mono ${getScoreColor(score).split(' ')[2]}`}>
              {score}
            </span>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-1">/ 100 Risk</span>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-xs font-semibold text-slate-300">Status: <span className="text-emerald-400 font-bold">{status}</span></span>
          <p className="text-[11px] text-slate-500 mt-0.5">Evaluated across 1,420 connected endpoints</p>
        </div>
      </div>
    </Card>
  );
};

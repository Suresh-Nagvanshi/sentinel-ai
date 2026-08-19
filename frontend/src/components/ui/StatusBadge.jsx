import React from 'react';

export const StatusBadge = ({ status }) => {
  const styles = {
    CRITICAL: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    HIGH: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    MEDIUM: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    LOW: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    OPEN: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    UNDER_INVESTIGATION: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    RESOLVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    ACTIVE_PROTECTION: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  };

  const currentClass = styles[status] || 'bg-slate-800 text-slate-300 border-slate-700';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {status}
    </span>
  );
};

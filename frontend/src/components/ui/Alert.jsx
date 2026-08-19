import React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

export const Alert = ({ type = 'info', title, message, className = '' }) => {
  const styles = {
    info: { bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400', icon: Info },
    success: { bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', icon: CheckCircle },
    warning: { bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400', icon: AlertTriangle },
    error: { bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400', icon: XCircle },
  };

  const current = styles[type] || styles.info;
  const Icon = current.icon;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${current.bg} ${className}`}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div>
        {title && <h4 className="text-sm font-semibold mb-0.5">{title}</h4>}
        <p className="text-xs text-slate-300 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

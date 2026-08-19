import React from 'react';
import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';

export const AlertPanel = ({ alerts = [], onAcknowledge }) => {
  return (
    <Card title="Active Threat Alerts" subtitle="Real-time triggered alerts requiring analyst response">
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">No unacknowledged alerts pending.</p>
        ) : (
          alerts.map((alt) => (
            <div key={alt.id} className="p-3.5 rounded-xl bg-sentinel-900 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge status={alt.severity} />
                  <span className="text-xs font-semibold text-slate-200">{alt.alertType}</span>
                </div>
                <p className="text-xs text-slate-400">{alt.message}</p>
              </div>
              <button
                onClick={() => onAcknowledge && onAcknowledge(alt.id)}
                className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-semibold shrink-0 transition"
              >
                Acknowledge
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

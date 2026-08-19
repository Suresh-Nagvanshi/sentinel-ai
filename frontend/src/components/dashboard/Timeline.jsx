import React from 'react';
import { Card } from '../ui/Card';
import { formatDate } from '../../utils/formatters';

export const Timeline = ({ events = [] }) => {
  const defaultEvents = [
    { id: 1, title: 'Screen Capture Hook Blocked', time: new Date().toISOString(), user: 'john.doe', type: 'CRITICAL' },
    { id: 2, title: 'YOLOv8 Phone Lens Detection', time: new Date(Date.now() - 1800000).toISOString(), user: 'alice.s', type: 'HIGH' },
    { id: 3, title: 'Security Policy Updated', time: new Date(Date.now() - 3600000).toISOString(), user: 'admin', type: 'INFO' },
  ];

  const items = events.length > 0 ? events : defaultEvents;

  return (
    <Card title="Real-Time Threat Activity Timeline" subtitle="Live endpoint security events log">
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
        {items.map((event) => (
          <div key={event.id} className="relative flex items-start gap-4 pl-8">
            <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-sentinel-950" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-slate-200">{event.title}</h4>
                <span className="text-[10px] text-slate-500 font-mono">{formatDate(event.time)}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Target endpoint user: <span className="text-slate-300 font-mono">{event.user}</span></p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

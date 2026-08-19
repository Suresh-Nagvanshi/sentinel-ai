import React from 'react';
import { StatusBadge } from '../ui/StatusBadge';
import { formatDate, formatRiskScore } from '../../utils/formatters';

export const IncidentTable = ({ incidents = [], onViewDetails }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-sentinel-900/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
          <tr>
            <th className="py-3.5 px-4">Incident ID</th>
            <th className="py-3.5 px-4">Threat Title</th>
            <th className="py-3.5 px-4">Severity</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4">Risk Index</th>
            <th className="py-3.5 px-4">User</th>
            <th className="py-3.5 px-4">Detected At</th>
            <th className="py-3.5 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-slate-300 font-normal">
          {incidents.map((inc) => (
            <tr key={inc.id} className="hover:bg-sentinel-800/40 transition">
              <td className="py-3.5 px-4 font-mono font-semibold text-blue-400">{inc.id}</td>
              <td className="py-3.5 px-4 font-medium text-slate-100">{inc.title}</td>
              <td className="py-3.5 px-4">
                <StatusBadge status={inc.severity} />
              </td>
              <td className="py-3.5 px-4">
                <StatusBadge status={inc.status} />
              </td>
              <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{formatRiskScore(inc.riskScore)}</td>
              <td className="py-3.5 px-4 font-mono text-slate-400">{inc.targetedUser}</td>
              <td className="py-3.5 px-4 text-slate-500">{formatDate(inc.detectedAt)}</td>
              <td className="py-3.5 px-4 text-right">
                <button
                  onClick={() => onViewDetails && onViewDetails(inc)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition"
                >
                  Investigate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

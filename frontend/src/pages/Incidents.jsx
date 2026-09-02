import React, { useState, useMemo } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { IncidentTable } from '../components/incidents/IncidentTable';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useIncidents } from '../hooks/useIncidents';
import { Filter, Download, AlertOctagon, ShieldCheck, Clock, CheckCheck } from 'lucide-react';
import { formatDate } from '../utils/formatters';

const SEVERITY_COLORS = {
  CRITICAL: 'text-rose-400   bg-rose-500/10   border-rose-500/30',
  HIGH:     'text-amber-400  bg-amber-500/10  border-amber-500/30',
  MEDIUM:   'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  LOW:      'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
};

const STATUS_FLOW = ['OPEN', 'UNDER_INVESTIGATION', 'RESOLVED'];

const SeverityBadge = ({ sev }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
    SEVERITY_COLORS[sev] ?? 'text-slate-400 bg-slate-800 border-slate-700'
  }`}>{sev}</span>
);

const exportCSV = (rows) => {
  const header = ['ID', 'Title', 'Severity', 'Status', 'Risk Score', 'User', 'Engine', 'Detected At'];
  const lines = rows.map((r) =>
    [r.id, `"${r.title}"`, r.severity, r.status, r.riskScore, r.targetedUser, r.detectedByEngine, r.detectedAt].join(',')
  );
  const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sentinel_incidents_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const Incidents = () => {
  const { data: incidentRes, isLoading } = useIncidents();
  const rawIncidents = incidentRes?.data?.content || [];

  const [localIncidents, setLocalIncidents] = useState(null);
  const incidents = localIncidents ?? rawIncidents;

  React.useEffect(() => {
    if (rawIncidents.length && !localIncidents) setLocalIncidents(rawIncidents);
  }, [rawIncidents]);

  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterStatus, setFilterStatus]     = useState('ALL');
  const [sortBy, setSortBy]                 = useState('riskScore');
  const [sortDir, setSortDir]               = useState('desc');

  const displayed = useMemo(() => {
    let rows = [...incidents];
    if (filterSeverity !== 'ALL') rows = rows.filter((r) => r.severity === filterSeverity);
    if (filterStatus   !== 'ALL') rows = rows.filter((r) => r.status   === filterStatus);
    rows.sort((a, b) => {
      const va = a[sortBy];
      const vb = b[sortBy];
      if (typeof va === 'number') return sortDir === 'desc' ? vb - va : va - vb;
      return sortDir === 'desc' ? String(vb).localeCompare(String(va)) : String(va).localeCompare(String(vb));
    });
    return rows;
  }, [incidents, filterSeverity, filterStatus, sortBy, sortDir]);

  const advanceStatus = (id) => {
    setLocalIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id !== id) return inc;
        const idx = STATUS_FLOW.indexOf(inc.status);
        const next = STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)];
        return { ...inc, status: next };
      })
    );
  };

  // Stats
  const totalCrit = incidents.filter((i) => i.severity === 'CRITICAL').length;
  const totalOpen = incidents.filter((i) => i.status === 'OPEN').length;
  const avgRisk   = incidents.length
    ? (incidents.reduce((s, i) => s + (i.riskScore || 0), 0) / incidents.length).toFixed(1)
    : '0';

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-400" />
              Security Incidents
            </h1>
            <p className="text-xs text-slate-400 mt-1">Audit and investigate detected screen capture &amp; insider threat events.</p>
          </div>
          <Button variant="secondary" icon={Download} onClick={() => exportCSV(displayed)}>
            Export CSV
          </Button>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Open',     value: totalOpen, Icon: Clock,       color: 'text-amber-400' },
            { label: 'Critical', value: totalCrit, Icon: AlertOctagon, color: 'text-rose-400' },
            { label: 'Avg Risk', value: avgRisk,   Icon: ShieldCheck,  color: 'text-blue-400' },
          ].map(({ label, value, Icon, color }) => (
            <div key={label} className="glass-card rounded-xl border border-slate-800 p-4 flex items-center gap-3">
              <Icon className={`w-6 h-6 ${color}`} />
              <div>
                <p className="text-xl font-extrabold text-slate-100">{value}</p>
                <p className="text-[10px] text-slate-400">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-xs text-slate-400 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Severity:</span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((s) => (
            <button key={s} onClick={() => setFilterSeverity(s)}
              className={`px-3 py-1 rounded-xl text-xs font-medium border transition ${
                filterSeverity === s ? 'bg-blue-600/20 border-blue-500/40 text-blue-300' : 'border-slate-700 text-slate-400 hover:text-slate-200'
              }`}>{s}</button>
          ))}
          <span className="text-xs text-slate-400 ml-2">Status:</span>
          {['ALL', ...STATUS_FLOW].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 rounded-xl text-xs font-medium border transition ${
                filterStatus === s ? 'bg-blue-600/20 border-blue-500/40 text-blue-300' : 'border-slate-700 text-slate-400 hover:text-slate-200'
              }`}>{s.replace(/_/g, ' ')}</button>
          ))}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="ml-auto bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 transition"
          >
            <option value="riskScore">Sort: Risk Score</option>
            <option value="detectedAt">Sort: Date</option>
            <option value="severity">Sort: Severity</option>
          </select>
          <button
            onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
            className="text-xs text-slate-400 border border-slate-700 px-2 py-1.5 rounded-xl hover:text-slate-200 hover:border-slate-500 transition"
          >
            {sortDir === 'desc' ? '↓ Desc' : '↑ Asc'}
          </button>
        </div>

        {/* Table */}
        <Card>
          {isLoading && !localIncidents ? (
            <p className="text-xs text-slate-400 py-8 text-center">Loading incidents…</p>
          ) : (
            <IncidentTable
              incidents={displayed}
              onViewDetails={(inc) => setSelectedIncident(inc)}
            />
          )}
        </Card>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
        title="Incident Forensics & Telemetry"
      >
        {selectedIncident && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-blue-400">{selectedIncident.id}</span>
                <SeverityBadge sev={selectedIncident.severity} />
              </div>
              <p><strong className="text-slate-400">Title:</strong> <span className="text-slate-100">{selectedIncident.title}</span></p>
              <p><strong className="text-slate-400">Description:</strong> {selectedIncident.description}</p>
              <p><strong className="text-slate-400">Status:</strong> <StatusBadge status={selectedIncident.status} /></p>
              <p><strong className="text-slate-400">Target User:</strong> <span className="font-mono text-blue-300">{selectedIncident.targetedUser}</span></p>
              <p><strong className="text-slate-400">Engine:</strong> {selectedIncident.detectedByEngine}</p>
              <p><strong className="text-slate-400">Risk Score:</strong> <span className="text-rose-400 font-bold">{selectedIncident.riskScore}</span></p>
              <p><strong className="text-slate-400">Detected:</strong> {formatDate(selectedIncident.detectedAt)}</p>
            </div>

            <div className="flex justify-between gap-3 pt-1">
              <Button variant="outline" onClick={() => setSelectedIncident(null)}>Close</Button>
              <div className="flex gap-2">
                {selectedIncident.status !== 'RESOLVED' && (
                  <Button
                    variant="secondary"
                    icon={CheckCheck}
                    onClick={() => {
                      advanceStatus(selectedIncident.id);
                      setSelectedIncident((inc) => {
                        const idx = STATUS_FLOW.indexOf(inc.status);
                        return { ...inc, status: STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)] };
                      });
                    }}
                  >
                    {selectedIncident.status === 'OPEN' ? 'Investigate' : 'Mark Resolved'}
                  </Button>
                )}
                <Button variant="danger">Isolate Endpoint</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
};

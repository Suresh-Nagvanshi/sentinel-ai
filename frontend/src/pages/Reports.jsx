import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Download, Plus, FileText, Clock, CheckCircle } from 'lucide-react';
import { formatDate } from '../utils/formatters';

const REPORT_TYPES = ['All', 'EXECUTIVE_SUMMARY', 'INCIDENT_DENSITY', 'RISK_AUDIT', 'COMPLIANCE'];

const INITIAL_REPORTS = [
  {
    id: 'rpt-01',
    title: 'Weekly Insider Threat Executive Briefing',
    type: 'EXECUTIVE_SUMMARY',
    date: new Date().toISOString(),
    size: '2.4 MB',
    status: 'READY',
    author: 'AutoGen Engine',
  },
  {
    id: 'rpt-02',
    title: 'Monthly Screen Recording Vulnerability Audit',
    type: 'INCIDENT_DENSITY',
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    size: '5.1 MB',
    status: 'READY',
    author: 'Security Analyst',
  },
  {
    id: 'rpt-03',
    title: 'Q3 Enterprise Risk & Compliance Summary',
    type: 'RISK_AUDIT',
    date: new Date(Date.now() - 86400000 * 30).toISOString(),
    size: '8.7 MB',
    status: 'READY',
    author: 'AutoGen Engine',
  },
  {
    id: 'rpt-04',
    title: 'SOC 2 Insider Threat Compliance Checklist',
    type: 'COMPLIANCE',
    date: new Date(Date.now() - 86400000 * 14).toISOString(),
    size: '1.2 MB',
    status: 'READY',
    author: 'Security Admin',
  },
];

const TYPE_COLORS = {
  EXECUTIVE_SUMMARY: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  INCIDENT_DENSITY:  'text-rose-400 bg-rose-500/10 border-rose-500/30',
  RISK_AUDIT:        'text-amber-400 bg-amber-500/10 border-amber-500/30',
  COMPLIANCE:        'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
};

export const Reports = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [showGenModal, setShowGenModal] = useState(false);
  const [genForm, setGenForm] = useState({ title: '', type: 'EXECUTIVE_SUMMARY' });
  const [generating, setGenerating] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  const filtered = activeFilter === 'All'
    ? reports
    : reports.filter((r) => r.type === activeFilter);

  const handleGenerate = () => {
    if (!genForm.title.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const newReport = {
        id: `rpt-${Date.now()}`,
        title: genForm.title,
        type: genForm.type,
        date: new Date().toISOString(),
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
        status: 'READY',
        author: 'Security Admin',
      };
      setReports((prev) => [newReport, ...prev]);
      setGenerating(false);
      setShowGenModal(false);
      setGenForm({ title: '', type: 'EXECUTIVE_SUMMARY' });
    }, 1800);
  };

  const handleDownload = (id) => {
    setDownloadingId(id);
    setTimeout(() => setDownloadingId(null), 1500);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Compliance &amp; Executive Reports
            </h1>
            <p className="text-xs text-slate-400 mt-1">Generate and download audit reports for executive stakeholders and compliance reviews.</p>
          </div>
          <Button variant="primary" icon={Plus} onClick={() => setShowGenModal(true)}>
            Generate New Report
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {REPORT_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setActiveFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                activeFilter === t
                  ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                  : 'border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500'
              }`}
            >
              {t.replace(/_/g, ' ')}
              {t !== 'All' && (
                <span className="ml-1.5 opacity-60">
                  ({reports.filter((r) => r.type === t).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Report Cards */}
        {filtered.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center text-slate-500 text-sm border border-slate-800">
            No reports found for this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((rpt) => (
              <div
                key={rpt.id}
                className="glass-card rounded-xl border border-slate-800 p-5 flex flex-col gap-4 hover:border-slate-700 transition"
              >
                {/* Title row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-800 mt-0.5">
                      <FileText className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-100 leading-snug">{rpt.title}</h3>
                      <span
                        className={`mt-1 inline-block px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${
                          TYPE_COLORS[rpt.type]
                        }`}
                      >
                        {rpt.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {rpt.status}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(rpt.date)}
                    </span>
                    <span className="text-slate-600">|</span>
                    <span>{rpt.size}</span>
                    <span className="text-slate-600">|</span>
                    <span>{rpt.author}</span>
                  </div>
                  <Button
                    variant="secondary"
                    icon={Download}
                    size="sm"
                    onClick={() => handleDownload(rpt.id)}
                  >
                    {downloadingId === rpt.id ? 'Preparing…' : 'Download PDF'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Generate Modal */}
      <Modal
        isOpen={showGenModal}
        onClose={() => setShowGenModal(false)}
        title="Generate New Assessment Report"
      >
        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-xs text-slate-400">Report Title</span>
            <input
              type="text"
              value={genForm.title}
              onChange={(e) => setGenForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Q4 Insider Threat Summary"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-xs text-slate-400">Report Type</span>
            <select
              value={genForm.type}
              onChange={(e) => setGenForm((f) => ({ ...f, type: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition"
            >
              {REPORT_TYPES.filter((t) => t !== 'All').map((t) => (
                <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowGenModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleGenerate} disabled={generating || !genForm.title.trim()}>
              {generating ? 'Generating…' : 'Generate Report'}
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

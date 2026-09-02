import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useQuery } from '@tanstack/react-query';
import { policyService } from '../services/policyService';
import { Sliders, Plus, Trash2, Shield, Eye, Monitor, Lock } from 'lucide-react';

const CATEGORY_META = {
  SCREEN_SECURITY: { label: 'Screen Security', icon: Monitor, color: 'text-blue-400' },
  WEBCAM_RULES:    { label: 'Webcam Rules',     icon: Eye,     color: 'text-cyan-400' },
  DATA_EXFIL:      { label: 'Data Exfiltration',icon: Lock,    color: 'text-rose-400' },
  PROCESS_WATCH:   { label: 'Process Watch',    icon: Shield,  color: 'text-amber-400' },
};

const EMPTY_FORM = { name: '', description: '', category: 'SCREEN_SECURITY', confidenceThreshold: '0.85', action: 'TERMINATE_AND_ALERT' };

export const Policies = () => {
  const { data, isLoading } = useQuery({ queryKey: ['policies'], queryFn: policyService.getPolicies });

  const [localPolicies, setLocalPolicies] = useState(null);
  const policies = localPolicies ?? (data?.data || []);

  const [catFilter, setCatFilter] = useState('ALL');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // Only seed local state once when server data first arrives
  useEffect(() => {
    if (data?.data && localPolicies === null) {
      setLocalPolicies(data.data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleToggle = async (id, enabled) => {
    setLocalPolicies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !enabled } : p))
    );
    try {
      await policyService.togglePolicy(id, !enabled);
    } catch {
      setLocalPolicies((prev) =>
        prev.map((p) => (p.id === id ? { ...p, enabled } : p))
      );
    }
  };

  const handleDelete = (id) => {
    setLocalPolicies((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    setSaving(true);
    setTimeout(() => {
      const newPolicy = {
        id: `pol-${Date.now()}`,
        name: form.name,
        description: form.description,
        category: form.category,
        enabled: true,
        ruleConfigJson: JSON.stringify({
          action: form.action,
          confidenceThreshold: parseFloat(form.confidenceThreshold),
        }),
      };
      setLocalPolicies((prev) => [newPolicy, ...(prev || [])]);
      setSaving(false);
      setShowAdd(false);
      setForm(EMPTY_FORM);
    }, 900);
  };

  const filtered = catFilter === 'ALL'
    ? policies
    : policies.filter((p) => p.category === catFilter);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-400" />
              Security Policies
            </h1>
            <p className="text-xs text-slate-400 mt-1">Manage detection enforcement rules and configure AI engine behaviour thresholds.</p>
          </div>
          <Button variant="primary" icon={Plus} onClick={() => setShowAdd(true)}>Add Policy</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {['ALL', ...Object.keys(CATEGORY_META)].map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                catFilter === cat
                  ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                  : 'border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Policies' : CATEGORY_META[cat].label}
            </button>
          ))}
        </div>

        <Card title={`Configured Policies (${filtered.length})`}>
          {isLoading && !localPolicies ? (
            <p className="text-xs text-slate-400 py-8 text-center">Loading policies…</p>
          ) : filtered.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No policies for this category.</p>
          ) : (
            <div className="space-y-3">
              {filtered.map((policy) => {
                const meta = CATEGORY_META[policy.category];
                const Icon = meta?.icon ?? Shield;
                return (
                  <div
                    key={policy.id}
                    className={`flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/50 border rounded-xl p-4 transition ${
                      policy.enabled ? 'border-slate-700/60' : 'border-slate-800/40 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-slate-800 mt-0.5">
                        <Icon className={`w-4 h-4 ${meta?.color ?? 'text-slate-400'}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">{policy.name}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{policy.description}</p>
                        <span className="mt-1 text-[10px] font-mono text-slate-500">
                          {meta?.label ?? policy.category} &bull; Rule: {policy.ruleConfigJson}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={policy.enabled ? 'ACTIVE_PROTECTION' : 'DISABLED'} />
                      <button
                        onClick={() => handleToggle(policy.id, policy.enabled)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                          policy.enabled ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                        title={policy.enabled ? 'Disable policy' : 'Enable policy'}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                            policy.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(policy.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                        title="Delete policy"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Security Policy">
        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs text-slate-400">Policy Name *</span>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Block Loom Screen Recorder"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs text-slate-400">Description</span>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Describe what this policy enforces…"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition resize-none"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1.5">
              <span className="text-xs text-slate-400">Category</span>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition"
              >
                {Object.entries(CATEGORY_META).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs text-slate-400">Action</span>
              <select
                value={form.action}
                onChange={(e) => setForm((f) => ({ ...f, action: e.target.value }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition"
              >
                <option>TERMINATE_AND_ALERT</option>
                <option>ALERT_ONLY</option>
                <option>LOG_SILENT</option>
              </select>
            </label>
          </div>
          <label className="block space-y-1.5">
            <span className="text-xs text-slate-400">Confidence Threshold (0–1)</span>
            <input
              type="number" step="0.05" min="0" max="1"
              value={form.confidenceThreshold}
              onChange={(e) => setForm((f) => ({ ...f, confidenceThreshold: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition"
            />
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAdd} disabled={saving || !form.name.trim()}>
              {saving ? 'Saving…' : 'Save Policy'}
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

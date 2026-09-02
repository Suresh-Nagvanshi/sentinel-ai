import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Users as UsersIcon, Plus, Search, Trash2, UserCircle } from 'lucide-react';

const ROLE_COLORS = {
  ROLE_ADMIN:            'text-rose-400   bg-rose-500/10   border-rose-500/30',
  ROLE_SECURITY_OFFICER: 'text-amber-400  bg-amber-500/10  border-amber-500/30',
  ROLE_ANALYST:          'text-blue-400   bg-blue-500/10   border-blue-500/30',
  ROLE_EMPLOYEE:         'text-slate-300  bg-slate-700/40  border-slate-600/40',
};

const INITIAL_USERS = [
  { id: 'usr-001', name: 'Security Admin',    email: 'admin@sentinel.ai',    role: 'ROLE_ADMIN',            status: 'ACTIVE_PROTECTION', lastSeen: '2 min ago',  riskScore: 2 },
  { id: 'usr-002', name: 'Sarah Connor',      email: 'sarah@sentinel.ai',    role: 'ROLE_SECURITY_OFFICER', status: 'ACTIVE_PROTECTION', lastSeen: '15 min ago', riskScore: 8 },
  { id: 'usr-003', name: 'Alex Ross',         email: 'alex.ross@corp.local', role: 'ROLE_EMPLOYEE',         status: 'FLAGGED',           lastSeen: '1 hr ago',   riskScore: 95 },
  { id: 'usr-004', name: 'David Miller',      email: 'david@corp.local',     role: 'ROLE_EMPLOYEE',         status: 'ACTIVE_PROTECTION', lastSeen: '3 hr ago',   riskScore: 22 },
  { id: 'usr-005', name: 'Priya Sharma',      email: 'priya@corp.local',     role: 'ROLE_ANALYST',          status: 'ACTIVE_PROTECTION', lastSeen: '30 min ago', riskScore: 5 },
];

const EMPTY_FORM = { name: '', email: '', role: 'ROLE_EMPLOYEE' };

const RoleBadge = ({ role }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-semibold border font-mono ${
    ROLE_COLORS[role] ?? 'text-slate-400 bg-slate-800 border-slate-700'
  }`}>
    {role.replace('ROLE_', '')}
  </span>
);

const RiskBar = ({ score }) => {
  const color = score >= 80 ? 'bg-rose-500' : score >= 50 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-slate-800">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-[10px] font-mono ${
        score >= 80 ? 'text-rose-400' : score >= 50 ? 'text-amber-400' : 'text-emerald-400'
      }`}>{score}</span>
    </div>
  );
};

export const Users = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'ACTIVE_PROTECTION' ? 'DISABLED' : 'ACTIVE_PROTECTION' }
          : u
      )
    );
  };

  const handleDelete = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));

  const handleAdd = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    setSaving(true);
    setTimeout(() => {
      setUsers((prev) => [
        ...prev,
        {
          id: `usr-${Date.now()}`,
          name: form.name,
          email: form.email,
          role: form.role,
          status: 'ACTIVE_PROTECTION',
          lastSeen: 'Never',
          riskScore: 0,
        },
      ]);
      setSaving(false);
      setShowAdd(false);
      setForm(EMPTY_FORM);
    }, 800);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-blue-400" />
              User Directory
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {users.length} monitored users &bull; {users.filter((u) => u.status === 'FLAGGED').length} flagged
            </p>
          </div>
          <Button variant="primary" icon={Plus} onClick={() => setShowAdd(true)}>Add User</Button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Table */}
        <Card title={`Workspace Users (${filtered.length})`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase border-b border-slate-800 text-[10px] tracking-wide">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Risk Score</th>
                  <th className="py-3 px-4">Last Seen</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-full bg-slate-800 text-slate-400">
                          <UserCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-slate-100 font-medium">{user.name}</p>
                          <p className="text-slate-500 text-[10px]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><RoleBadge role={user.role} /></td>
                    <td className="py-3 px-4"><StatusBadge status={user.status} /></td>
                    <td className="py-3 px-4"><RiskBar score={user.riskScore} /></td>
                    <td className="py-3 px-4 text-slate-400">{user.lastSeen}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`relative w-8 h-4 rounded-full transition-colors ${
                            user.status === 'ACTIVE_PROTECTION' ? 'bg-emerald-500' : 'bg-slate-700'
                          }`}
                          title="Toggle status"
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                              user.status === 'ACTIVE_PROTECTION' ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                          title="Remove user"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Add User Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New User">
        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs text-slate-400">Full Name *</span>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Jane Doe"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs text-slate-400">Email Address *</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="jane@corp.local"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs text-slate-400">Role</span>
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition"
            >
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_SECURITY_OFFICER">Security Officer</option>
              <option value="ROLE_ANALYST">Analyst</option>
              <option value="ROLE_EMPLOYEE">Employee</option>
            </select>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={handleAdd}
              disabled={saving || !form.name.trim() || !form.email.trim()}
            >
              {saving ? 'Adding…' : 'Add User'}
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

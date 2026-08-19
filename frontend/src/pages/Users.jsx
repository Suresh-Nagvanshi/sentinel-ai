import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';

const users = [
  { id: 'usr-001', name: 'Security Admin', email: 'admin@sentinel.ai', role: 'ROLE_ADMIN', status: 'ACTIVE_PROTECTION' },
  { id: 'usr-002', name: 'Security Analyst', email: 'analyst@sentinel.ai', role: 'ROLE_ANALYST', status: 'ACTIVE_PROTECTION' },
];

export const Users = () => (
  <MainLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-100">User Directory</h1>
        <p className="text-xs text-slate-400 mt-1">RBAC administration surface for authorized platform operators.</p>
      </div>
      <Card title="Workspace Users">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 uppercase border-b border-slate-800"><tr><th className="py-3 px-4">User</th><th className="py-3 px-4">Email</th><th className="py-3 px-4">Role</th><th className="py-3 px-4">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-800/60">{users.map((user) => <tr key={user.id}><td className="py-3 px-4 text-slate-100">{user.name}</td><td className="py-3 px-4 text-slate-400">{user.email}</td><td className="py-3 px-4 font-mono text-blue-400">{user.role}</td><td className="py-3 px-4"><StatusBadge status={user.status} /></td></tr>)}</tbody>
          </table>
        </div>
      </Card>
    </div>
  </MainLayout>
);

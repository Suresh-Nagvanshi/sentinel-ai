import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { policyService } from '../services/policyService';
import { useQuery } from '@tanstack/react-query';

export const Policies = () => {
  const { data } = useQuery({ queryKey: ['policies'], queryFn: policyService.getPolicies });
  const policies = data?.data || [];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100">Security Policies</h1>
          <p className="text-xs text-slate-400 mt-1">Review policy definitions before enforcement workflows are connected.</p>
        </div>
        <Card title="Configured Detection Policies">
          <div className="space-y-3">
            {policies.map((policy) => (
              <div key={policy.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-sentinel-900 border border-slate-800 rounded-lg p-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-100">{policy.name}</h2>
                  <p className="text-xs text-slate-400 mt-1">{policy.description}</p>
                </div>
                <StatusBadge status={policy.enabled ? 'ACTIVE_PROTECTION' : 'DISABLED'} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

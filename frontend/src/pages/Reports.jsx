import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Download, Plus } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export const Reports = () => {
  const reports = [
    { id: 'rpt-01', title: 'Weekly Insider Threat Executive Briefing', type: 'EXECUTIVE_SUMMARY', date: new Date().toISOString(), size: '2.4 MB' },
    { id: 'rpt-02', title: 'Monthly Screen Recording Vulnerability Audit', type: 'INCIDENT_DENSITY', date: new Date(Date.now() - 86400000 * 7).toISOString(), size: '5.1 MB' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 tracking-tight">Compliance & Executive Reports</h1>
            <p className="text-xs text-slate-400 mt-1">Generate and download audit reports for executive stakeholders.</p>
          </div>
          <Button variant="primary" icon={Plus}>Generate New Assessment</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((rpt) => (
            <Card key={rpt.id} title={rpt.title} subtitle={`Format: ${rpt.type}`}>
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-800 text-xs">
                <div>
                  <p className="text-slate-400">Generated: <span className="text-slate-200">{formatDate(rpt.date)}</span></p>
                  <p className="text-slate-500 font-mono">File Size: {rpt.size}</p>
                </div>
                <Button variant="secondary" icon={Download} size="sm">Download PDF</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

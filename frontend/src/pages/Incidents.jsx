import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { IncidentTable } from '../components/incidents/IncidentTable';
import { Modal } from '../components/ui/Modal';
import { useIncidents } from '../hooks/useIncidents';
import { Filter, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Incidents = () => {
  const { data: incidentRes, isLoading } = useIncidents();
  const [selectedIncident, setSelectedIncident] = useState(null);

  const incidents = incidentRes?.data?.content || [];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 tracking-tight">Security Incidents Repository</h1>
            <p className="text-xs text-slate-400 mt-1">Audit and investigate detected unauthorized screen capture & insider threats.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" icon={Filter} size="sm">Filter Severity</Button>
            <Button variant="secondary" icon={Download} size="sm">Export CSV</Button>
          </div>
        </div>

        <Card>
          {isLoading ? (
            <p className="text-xs text-slate-400 py-8 text-center">Loading incidents from Spring Boot backend...</p>
          ) : (
            <IncidentTable incidents={incidents} onViewDetails={(inc) => setSelectedIncident(inc)} />
          )}
        </Card>

        {/* Modal for Incident Detail Inspection */}
        <Modal
          isOpen={!!selectedIncident}
          onClose={() => setSelectedIncident(null)}
          title="Incident Forensics & Telemetry Detail"
        >
          {selectedIncident && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-sentinel-900 border border-slate-800 space-y-2">
                <p><strong className="text-slate-400">Incident ID:</strong> <span className="font-mono text-blue-400">{selectedIncident.id}</span></p>
                <p><strong className="text-slate-400">Threat Title:</strong> {selectedIncident.title}</p>
                <p><strong className="text-slate-400">Detailed Description:</strong> {selectedIncident.description}</p>
                <p><strong className="text-slate-400">Target User Endpoint:</strong> <span className="font-mono">{selectedIncident.targetedUser}</span></p>
                <p><strong className="text-slate-400">AI Detection Engine:</strong> {selectedIncident.detectedByEngine}</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setSelectedIncident(null)}>Close</Button>
                <Button variant="danger">Isolate User Endpoint</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Settings as SettingsIcon, Bell, Cpu, Link, CheckCircle } from 'lucide-react';

const TABS = [
  { id: 'general',       label: 'General',       icon: SettingsIcon },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ai',            label: 'AI Thresholds', icon: Cpu },
  { id: 'integrations',  label: 'Integrations',  icon: Link },
];

const ToggleRow = ({ label, description, checked, onChange }) => (
  <div className="flex items-start justify-between gap-4 py-4 border-b border-slate-800 last:border-0">
    <div>
      <p className="text-sm font-medium text-slate-200">{label}</p>
      <p className="text-xs text-slate-400 mt-0.5">{description}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`mt-0.5 relative w-10 h-5 rounded-full shrink-0 transition-colors ${
        checked ? 'bg-blue-500' : 'bg-slate-700'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

const SliderRow = ({ label, value, min, max, step, onChange, unit }) => (
  <div className="space-y-2 py-4 border-b border-slate-800 last:border-0">
    <div className="flex justify-between text-xs">
      <span className="text-slate-300 font-medium">{label}</span>
      <span className="text-blue-400 font-mono">{value}{unit}</span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-blue-500 h-1.5"
    />
    <div className="flex justify-between text-[10px] text-slate-500">
      <span>{min}{unit}</span><span>{max}{unit}</span>
    </div>
  </div>
);

export const Settings = () => {
  const [tab, setTab] = useState('general');
  const [saved, setSaved] = useState(false);

  // General
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1');
  const [aiUrl, setAiUrl] = useState(import.meta.env.VITE_AI_ENGINE_URL || 'http://localhost:8000');
  const [platformName, setPlatformName] = useState('SentinelAI Enterprise');
  const [orgName, setOrgName] = useState('Acme Corporation');

  // Notifications
  const [emailAlerts, setEmailAlerts]       = useState(true);
  const [criticalOnly, setCriticalOnly]     = useState(false);
  const [dailyDigest, setDailyDigest]       = useState(true);
  const [slackWebhook, setSlackWebhook]     = useState('');
  const [webhookEnabled, setWebhookEnabled] = useState(false);

  // AI Thresholds
  const [yoloThresh, setYoloThresh]     = useState(0.85);
  const [faceThresh, setFaceThresh]     = useState(0.80);
  const [ocrThresh, setOcrThresh]       = useState(0.70);
  const [riskThresh, setRiskThresh]     = useState(75);
  const [scanInterval, setScanInterval] = useState(30);

  // Integrations
  const [syslogEnabled, setSyslogEnabled] = useState(false);
  const [splunkEnabled, setSplunkEnabled] = useState(false);
  const [splunkUrl, setSplunkUrl]         = useState('');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-blue-400" />
              Platform Settings
            </h1>
            <p className="text-xs text-slate-400 mt-1">Configure AI engine, notification preferences and integration endpoints.</p>
          </div>
          <Button variant="primary" onClick={handleSave} icon={saved ? CheckCircle : undefined}>
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-slate-800 pb-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-t-xl border-b-2 transition ${
                tab === id
                  ? 'border-blue-500 text-blue-300 bg-blue-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab: General */}
        {tab === 'general' && (
          <Card title="General Configuration">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-2">
              {[
                { label: 'Platform Name', value: platformName, set: setPlatformName },
                { label: 'Organisation Name', value: orgName, set: setOrgName },
                { label: 'Backend API Base URL', value: apiUrl, set: setApiUrl },
                { label: 'AI Engine URL', value: aiUrl, set: setAiUrl },
              ].map(({ label, value, set }) => (
                <label key={label} className="block space-y-1.5">
                  <span className="text-xs text-slate-400">{label}</span>
                  <input
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition"
                  />
                </label>
              ))}
            </div>
          </Card>
        )}

        {/* Tab: Notifications */}
        {tab === 'notifications' && (
          <Card title="Alert & Notification Preferences">
            <ToggleRow label="Email Alerts" description="Send real-time threat alerts to registered admin email." checked={emailAlerts} onChange={setEmailAlerts} />
            <ToggleRow label="Critical-Only Mode" description="Suppress HIGH and MEDIUM alerts; only send CRITICAL." checked={criticalOnly} onChange={setCriticalOnly} />
            <ToggleRow label="Daily Digest Email" description="Send a morning summary of yesterday's incidents." checked={dailyDigest} onChange={setDailyDigest} />
            <ToggleRow label="Outbound Webhook" description="POST alert payloads to a custom webhook endpoint." checked={webhookEnabled} onChange={setWebhookEnabled} />
            {webhookEnabled && (
              <label className="block space-y-1.5 pt-3">
                <span className="text-xs text-slate-400">Webhook URL</span>
                <input
                  value={slackWebhook}
                  onChange={(e) => setSlackWebhook(e.target.value)}
                  placeholder="https://hooks.slack.com/..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                />
              </label>
            )}
          </Card>
        )}

        {/* Tab: AI Thresholds */}
        {tab === 'ai' && (
          <Card title="AI Engine Detection Thresholds">
            <p className="text-xs text-slate-400 pb-2">Tune detection sensitivity per engine module. Higher threshold = fewer but more confident detections.</p>
            <SliderRow label="YOLOv8 Object Detection Confidence"  value={yoloThresh}    min={0.5}  max={1}   step={0.01} onChange={setYoloThresh}    unit="" />
            <SliderRow label="MediaPipe Face Detection Threshold" value={faceThresh}    min={0.5}  max={1}   step={0.01} onChange={setFaceThresh}    unit="" />
            <SliderRow label="EasyOCR Confidence Threshold"       value={ocrThresh}     min={0.3}  max={1}   step={0.01} onChange={setOcrThresh}     unit="" />
            <SliderRow label="Risk Score Alert Threshold"         value={riskThresh}    min={10}   max={100} step={1}    onChange={setRiskThresh}    unit="" />
            <SliderRow label="Screen Scan Interval (seconds)"     value={scanInterval}  min={5}    max={120} step={5}    onChange={setScanInterval}  unit="s" />
          </Card>
        )}

        {/* Tab: Integrations */}
        {tab === 'integrations' && (
          <Card title="External System Integrations">
            <ToggleRow label="Syslog (CEF/RFC 5424)" description="Forward all alert events as CEF formatted syslog messages." checked={syslogEnabled} onChange={setSyslogEnabled} />
            <ToggleRow label="Splunk HEC Integration" description="Index threat events into Splunk via HTTP Event Collector." checked={splunkEnabled} onChange={setSplunkEnabled} />
            {splunkEnabled && (
              <label className="block space-y-1.5 pt-3">
                <span className="text-xs text-slate-400">Splunk HEC Endpoint</span>
                <input
                  value={splunkUrl}
                  onChange={(e) => setSplunkUrl(e.target.value)}
                  placeholder="https://splunk.corp.local:8088/services/collector"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                />
              </label>
            )}
            <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Service Health</p>
              <p>&#9679; <span className="text-emerald-400">Backend API</span> &mdash; {apiUrl}</p>
              <p>&#9679; <span className="text-emerald-400">AI Engine</span> &mdash; {aiUrl}</p>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

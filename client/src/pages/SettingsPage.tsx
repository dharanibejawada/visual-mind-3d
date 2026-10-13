import React, { useEffect, useState } from 'react';
import {
  Settings,
  Key,
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Info,
  RefreshCw,
} from 'lucide-react';
import { api } from '../services/api';
import { SystemStatus } from '../types';

export const SettingsPage: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshStatus = () => {
    setLoading(true);
    api.getSystemStatus()
      .then(setStatus)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan mb-2">
          <Settings className="w-4 h-4" />
          <span>SYSTEM & API SETTINGS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Platform Settings & Status</h1>
        <p className="text-slate-400 text-sm mt-1">
          Monitor your Google Gemini AI engine connection, Supabase cloud database status, and configuration details.
        </p>
      </div>

      {/* Integration Status Cards */}
      <div className="space-y-6">
        {/* Google Gemini Card */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-brand-cyan/10 text-brand-cyan">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Google Gemini LLM Engine</h3>
                <p className="text-xs text-slate-400">
                  Configured model: <code className="text-brand-cyan font-mono">{status?.geminiModel || 'gemini-2.5-flash'}</code>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {status?.liveAI ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/40 border border-emerald-800 text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Live API Active
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/40 border border-amber-800 text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Demo Mode Active
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-850">
            {status?.notice}
          </p>

          {!status?.liveAI && (
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Key className="w-4 h-4 text-brand-cyan" />
                <span>How to enable live Google Gemini AI generation:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-2">
                <li>
                  Get a free Gemini API key from{' '}
                  <a
                    href="https://aistudio.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-cyan hover:underline"
                  >
                    Google AI Studio
                  </a>.
                </li>
                <li>
                  Open the root <code className="text-white font-mono">.env</code> file in this workspace.
                </li>
                <li>
                  Set <code className="text-white font-mono">GEMINI_API_KEY=your_actual_key</code> and save.
                </li>
                <li>Restart the server to immediately enjoy unlimited custom live topic generation!</li>
              </ol>
            </div>
          )}
        </div>

        {/* Supabase Database Card */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-brand-violet/10 text-brand-violet">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Data Persistence Layer</h3>
                <p className="text-xs text-slate-400">
                  Active backend: <strong className="text-white">{status?.database}</strong>
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/40 border border-emerald-800 text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Operational
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            In Guest Mode, lessons and quiz attempts persist seamlessly in memory and local storage.
            When <code className="text-white font-mono">SUPABASE_URL</code> and{' '}
            <code className="text-white font-mono">SUPABASE_ANON_KEY</code> are provided in <code className="text-white font-mono">.env</code>,
            data is saved to your cloud PostgreSQL database.
          </p>
        </div>
      </div>

      {/* Refresh Status Button */}
      <div className="flex justify-end">
        <button
          onClick={refreshStatus}
          disabled={loading}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh System Health</span>
        </button>
      </div>
    </div>
  );
};

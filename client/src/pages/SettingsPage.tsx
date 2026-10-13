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
  User,
  LogIn,
  LogOut,
  Shield,
} from 'lucide-react';
import { api } from '../services/api';
import { SystemStatus } from '../types';
import { useAuth } from '../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, openLoginModal, openSignupModal, logout, isSupabase } = useAuth();

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
          Monitor your account session, Google Gemini AI connection, and Supabase cloud database status.
        </p>
      </div>

      {/* Integration Status Cards */}
      <div className="space-y-6">
        {/* User Account Card */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-brand-violet/10 text-brand-violet">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Account & Authentication</h3>
                <p className="text-xs text-slate-400">
                  {user ? (
                    <>
                      Logged in as <strong className="text-white">{user.displayName || user.email}</strong>
                    </>
                  ) : (
                    'Not signed in. Operating in Guest Session.'
                  )}
                </p>
              </div>
            </div>

            <div>
              {user ? (
                <button
                  onClick={logout}
                  className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openLoginModal}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={openSignupModal}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-brand-cyan to-brand-indigo text-navy-950 font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Auth Engine:</span>
              <span className="font-mono text-white font-semibold">
                {isSupabase ? 'Supabase Cloud Auth' : 'Local Persistence Engine'}
              </span>
            </div>
            {user && (
              <span className="font-mono text-[11px] text-slate-500 truncate max-w-xs">
                User ID: {user.id}
              </span>
            )}
          </div>
        </div>

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
                  Offline Demo Fallback
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            When <code className="text-white font-mono">GEMINI_API_KEY</code> is set, VisualMind 3D uses real-time Gemini Generative AI to author dynamic curriculum, structure 3D models, and respond via the AI Voice Companion.
          </p>
        </div>

        {/* Database & Persistence Card */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-brand-indigo/10 text-brand-indigo">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Storage & Database</h3>
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
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh System Health</span>
        </button>
      </div>
    </div>
  );
};

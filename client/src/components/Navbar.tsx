import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Compass,
  UploadCloud,
  LayoutDashboard,
  Settings,
  Sparkles,
  Zap,
  LogIn,
  LogOut,
  User as UserIcon,
  ChevronDown,
  Shield,
  BookOpen,
} from 'lucide-react';
import { api } from '../services/api';
import { SystemStatus } from '../types';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, openLoginModal, openSignupModal, logout, isSupabase } = useAuth();

  useEffect(() => {
    api.getSystemStatus().then(setStatus).catch(() => {});
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: Box },
    { to: '/explore', label: 'Explore Topic', icon: Compass },
    { to: '/notes', label: 'Upload Notes', icon: UploadCloud },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return name.slice(0, 2).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return 'VM';
  };

  return (
    <nav className="sticky top-0 z-40 bg-navy-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-violet p-0.5 shadow-lg shadow-brand-cyan/20 group-hover:shadow-brand-cyan/40 transition-all">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Box className="w-5 h-5 text-brand-cyan group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                VisualMind
              </span>
              <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                3D
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
              See It. Understand It. Remember It.
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-slate-800/80 text-brand-cyan shadow-sm border border-slate-700/60'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-cyan' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Badges & Auth CTAs */}
        <div className="flex items-center gap-2.5">
          {/* Status Badge */}
          {status && (
            <Link
              to="/settings"
              title={status.notice}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                status.liveAI
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                  : 'bg-amber-950/40 text-amber-300 border-amber-800/60'
              }`}
            >
              {status.liveAI ? (
                <>
                  <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                  <span>Gemini Live</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>3D Demo Mode</span>
                </>
              )}
            </Link>
          )}

          {/* User Auth Section */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 pr-2.5 bg-slate-900/80 hover:bg-slate-850 border border-slate-700/80 rounded-xl transition-all text-xs font-medium text-slate-200"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-violet text-navy-950 font-extrabold text-[11px] flex items-center justify-center shadow-sm">
                  {getInitials(user.displayName, user.email)}
                </div>
                <span className="hidden sm:inline-block max-w-[110px] truncate">
                  {user.displayName || user.email.split('@')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-navy-900/95 border border-slate-700/90 rounded-2xl shadow-2xl shadow-brand-cyan/10 backdrop-blur-xl p-2 z-50 animate-fade-in">
                  <div className="p-3 border-b border-slate-800 mb-1">
                    <p className="text-xs font-bold text-white truncate">
                      {user.displayName || 'Explorer'}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{user.email}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          user.isGuest
                            ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                            : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                        }`}
                      >
                        {user.isGuest ? 'Guest Explorer' : isSupabase ? 'Supabase Synced' : 'Local User'}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-xl transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-brand-cyan" />
                    <span>My Saved Lessons</span>
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-xl transition-colors"
                  >
                    <Settings className="w-4 h-4 text-brand-indigo" />
                    <span>Account & Preferences</span>
                  </Link>

                  <div className="border-t border-slate-800 my-1" />

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={openLoginModal}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl border border-slate-700/60 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Sign In</span>
              </button>

              <button
                onClick={openSignupModal}
                className="px-3.5 py-1.5 bg-gradient-to-r from-brand-cyan to-brand-indigo hover:opacity-95 text-navy-950 font-bold rounded-xl text-xs shadow-md shadow-brand-cyan/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-850 bg-navy-950/90 text-xs">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg ${
                isActive ? 'text-brand-cyan' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px]">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

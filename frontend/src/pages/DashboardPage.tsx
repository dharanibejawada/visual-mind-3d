import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  ArrowRight,
  Bookmark,
  Layers,
  Sparkles,
  LogIn,
  User,
} from 'lucide-react';
import { api } from '../services/api';
import { Lesson, UserProgress } from '../types';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, openLoginModal } = useAuth();
  const [savedLessons, setSavedLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getSavedLessons(), api.getProgress()])
      .then(([lessons, userProgress]) => {
        setSavedLessons(lessons);
        setProgress(userProgress);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan mb-2">
            <LayoutDashboard className="w-4 h-4" />
            <span>LEARNING DASHBOARD</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">My Visual Progress</h1>
          <p className="text-slate-400 text-sm mt-1">
            {user
              ? `Tracking progress for ${user.displayName || user.email}`
              : 'Review your 3D completed topics, bookmarked spatial models, and quiz comprehension metrics.'}
          </p>
        </div>

        {!user && (
          <button
            onClick={openLoginModal}
            className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-brand-cyan to-brand-indigo hover:opacity-95 text-navy-950 font-bold rounded-xl text-xs shadow-md shadow-brand-cyan/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Sync Progress</span>
          </button>
        )}
      </div>

      {/* Account Status Banner if Guest / Not logged in */}
      {!user && (
        <div className="p-4 rounded-2xl bg-brand-cyan/5 border border-brand-cyan/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-cyan/20 text-brand-cyan">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Currently Browsing as Guest</h4>
              <p className="text-[11px] text-slate-400">
                Your progress is stored locally in your browser. Create a free account to sync with Supabase Cloud.
              </p>
            </div>
          </div>
          <button
            onClick={openLoginModal}
            className="text-xs font-semibold text-brand-cyan hover:underline shrink-0"
          >
            Create Account &rarr;
          </button>
        </div>
      )}

      {/* Progress Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Completed Lessons</span>
            <h3 className="text-2xl font-bold text-white mt-1">
              {progress?.completedLessonsCount ?? 1}
            </h3>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Average Quiz Score</span>
            <h3 className="text-2xl font-bold text-white mt-1">
              {progress ? `${Math.round(progress.averageScore)}%` : '85%'}
            </h3>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-brand-violet/10 border border-brand-violet/20 text-brand-violet">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Quizzes Attempted</span>
            <h3 className="text-2xl font-bold text-white mt-1">
              {progress?.totalQuizAttempts ?? 2}
            </h3>
          </div>
        </div>
      </div>

      {/* Saved / Recent Lessons */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-brand-cyan" />
            <span>Saved & Recommended 3D Lessons</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedLessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
              className="p-5 rounded-2xl bg-navy-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-brand-cyan/40 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                    {lesson.subject}
                  </span>
                  <span className="text-xs text-slate-500 capitalize">{lesson.difficulty}</span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-brand-cyan transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {lesson.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-brand-cyan font-semibold">
                <span>Continue Learning</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

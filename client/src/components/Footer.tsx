import React from 'react';
import { Box, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-brand-cyan" />
            <span className="font-bold text-white text-sm">VisualMind 3D</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            "See It. Understand It. Remember It." An AI-powered interactive 3D learning platform
            converting complex textbook notes and educational concepts into intuitive spatial models.
          </p>
        </div>

        {/* Subjects */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
            Explore Subjects
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/explore?subject=Biology" className="hover:text-brand-cyan">Biology & Anatomy</Link></li>
            <li><Link to="/explore?subject=Physics" className="hover:text-brand-cyan">Physics & Astrophysics</Link></li>
            <li><Link to="/explore?subject=Chemistry" className="hover:text-brand-cyan">Chemistry & Quantum Orbitals</Link></li>
            <li><Link to="/explore?subject=ComputerScience" className="hover:text-brand-cyan">Computer Science & Algorithms</Link></li>
          </ul>
        </div>

        {/* Learning Modes */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
            Learning Modes
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/notes" className="hover:text-brand-cyan">Learn from My Notes (PDF, DOCX, TXT)</Link></li>
            <li><Link to="/explore" className="hover:text-brand-cyan">Explore Any Topic in 3D</Link></li>
            <li><Link to="/dashboard" className="hover:text-brand-cyan">Quiz & Revision Practice</Link></li>
            <li><Link to="/settings" className="hover:text-brand-cyan">API & Model Settings</Link></li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div>
          <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
            Engineered With
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Three.js & React Three Fiber, Google Gemini LLM API, Node.js & Express, Supabase PostgreSQL, and Tailwind CSS.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500">
            <span>Built with precision for visual learners worldwide.</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
        <span>© {new Date().getFullYear()} VisualMind 3D Learning Platform. All rights reserved.</span>
        <span>Secure server-side AI execution • Zero client-side API secrets</span>
      </div>
    </footer>
  );
};

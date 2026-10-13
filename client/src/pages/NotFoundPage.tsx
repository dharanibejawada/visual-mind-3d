import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Box } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-cyan mb-2">
        <Box className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-white">404</h1>
      <h2 className="text-lg font-bold text-slate-200">Concept Dimension Not Found</h2>
      <p className="text-xs text-slate-400 max-w-sm">
        The 3D model or educational page you're searching for hasn't materialized in our space.
      </p>
      <Link
        to="/"
        className="px-5 py-2.5 bg-brand-cyan text-navy-950 font-bold rounded-xl text-xs flex items-center gap-2 hover:bg-cyan-400 transition-all"
      >
        <Compass className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

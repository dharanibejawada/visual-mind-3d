import React, { useState } from 'react';
import { InteractiveElement } from '../types';

interface Props {
  title?: string;
  elements?: InteractiveElement[];
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  activeStepIndex?: number;
}

export const InteractiveDiagramVisualization: React.FC<Props> = ({
  title = 'System Overview',
  elements = [
    { id: 'input', label: '1. Primary Input', description: 'Raw energy, stimulus, or parameters entering the system.', color: '#06b6d4' },
    { id: 'processor', label: '2. Transformation Core', description: 'Active metabolic, computational, or physical processing unit.', color: '#8b5cf6' },
    { id: 'feedback', label: '3. Feedback Regulation', description: 'Self-correcting loop maintaining equilibrium and stability.', color: '#10b981' },
    { id: 'output', label: '4. Result / Output', description: 'Finished products, physiological action, or output state.', color: '#f59e0b' },
  ],
  selectedComponentId,
  onSelectComponent,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-navy-950/80 rounded-2xl relative overflow-hidden select-none">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <span className="text-xs uppercase tracking-widest text-brand-cyan font-mono font-semibold px-2.5 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
          Interactive Diagram
        </span>
        <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
        <p className="text-xs text-slate-400 mt-1">Click any node to explore its function</p>
      </div>

      {/* Interactive Flow Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl relative z-10">
        {elements.map((el, idx) => {
          const isSelected = selectedComponentId === el.id;
          const isHovered = hoveredId === el.id;

          return (
            <div
              key={el.id}
              onClick={() => onSelectComponent?.(el.id)}
              onMouseEnter={() => setHoveredId(el.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-brand-cyan shadow-lg shadow-brand-cyan/20 scale-105'
                  : isHovered
                  ? 'bg-slate-800/60 border-slate-600 scale-102'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block"
                    style={{ backgroundColor: el.color || '#38bdf8' }}
                  />
                  <span className="text-[10px] font-mono text-slate-400">Node #{idx + 1}</span>
                </div>
                <h4 className="font-semibold text-sm text-slate-100">{el.label}</h4>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3">{el.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className={isSelected ? 'text-brand-cyan font-medium' : 'text-slate-500'}>
                  {isSelected ? 'Selected' : 'Click to inspect'}
                </span>
                <span className="text-slate-600">➔</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

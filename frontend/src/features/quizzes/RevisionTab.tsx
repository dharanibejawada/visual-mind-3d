import React, { useState } from 'react';
import { BookOpen, AlertTriangle, Layers, RotateCw, Check } from 'lucide-react';
import { RevisionMaterial } from '../../types';

interface Props {
  revision?: RevisionMaterial;
  keyTakeaways: string[];
}

export const RevisionTab: React.FC<Props> = ({ revision, keyTakeaways }) => {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

  const toggleCard = (idx: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const flashcards = revision?.flashcards || [
    { front: 'What is the primary mechanism shown in this 3D model?', back: 'Coordinated energy transfer and structural equilibrium.' },
    { front: 'Why does visualizing in 3D improve learning retention?', back: 'Dual coding theory: visual-spatial processing reinforces verbal-conceptual understanding.' },
  ];

  const definitions = revision?.keyDefinitions || [];
  const mistakes = revision?.commonMistakes || [
    'Confusing inputs with products or assuming systems remain static.',
    'Overlooking the role of regulatory boundary conditions.',
  ];

  return (
    <div className="space-y-6">
      {/* Flashcards Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-cyan" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Interactive Flashcards (Click to Flip)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {flashcards.map((card, i) => {
            const isFlipped = flippedCards[i] || false;

            return (
              <div
                key={i}
                onClick={() => toggleCard(i)}
                className="h-36 cursor-pointer select-none perspective-1000"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-2xl border p-4 flex flex-col justify-between ${
                    isFlipped
                      ? 'bg-slate-800/90 border-brand-cyan shadow-lg shadow-brand-cyan/10 rotate-y-180'
                      : 'bg-navy-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {!isFlipped ? (
                    <>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>QUESTION #{i + 1}</span>
                        <RotateCw className="w-3 h-3 text-slate-500" />
                      </div>
                      <p className="text-xs font-semibold text-white leading-relaxed">{card.front}</p>
                      <span className="text-[10px] text-brand-cyan">Tap to see answer ➔</span>
                    </>
                  ) : (
                    <div className="rotate-y-180 flex flex-col justify-between h-full">
                      <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                        <span>ANSWER</span>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">{card.back}</p>
                      <span className="text-[10px] text-slate-400">Tap to flip back</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Definitions */}
      {definitions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-violet" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Key Definitions & Terminology
            </h4>
          </div>
          <div className="space-y-2">
            {definitions.map((def, idx) => (
              <div
                key={idx}
                className="p-3 bg-navy-900/60 rounded-xl border border-slate-800 text-xs"
              >
                <strong className="text-brand-cyan">{def.term}: </strong>
                <span className="text-slate-300">{def.definition}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Misconceptions */}
      {mistakes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Common Mistakes & Exam Pitfalls
            </h4>
          </div>
          <div className="space-y-2">
            {mistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="p-3 bg-amber-950/20 rounded-xl border border-amber-900/40 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2"
              >
                <span className="text-amber-400 font-bold">⚠️</span>
                <span>{mistake}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Takeaways */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Core Summary Points
        </h4>
        <ul className="space-y-2 text-xs text-slate-300">
          {keyTakeaways.map((item, idx) => (
            <li
              key={idx}
              className="p-2.5 bg-slate-900/50 rounded-xl border border-slate-850 flex items-start gap-2.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

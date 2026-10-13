import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { QuizQuestion, QuizResult } from '../../types';
import { api } from '../../services/api';

interface Props {
  lessonId: string;
  quiz: QuizQuestion[];
  onQuizComplete?: (score: number) => void;
}

export const QuizModule: React.FC<Props> = ({ lessonId, quiz, onQuizComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedCurrent, setSelectedCurrent] = useState<number | null>(null);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const currentQ = quiz[currentIdx];

  const handleSelectOption = (index: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedCurrent(index);
    setHasAnsweredCurrent(true);

    const updated = [...selectedAnswers];
    updated[currentIdx] = index;
    setSelectedAnswers(updated);
  };

  const handleNext = async () => {
    if (currentIdx < quiz.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedCurrent(selectedAnswers[currentIdx + 1] ?? null);
      setHasAnsweredCurrent(selectedAnswers[currentIdx + 1] !== undefined);
    } else {
      // Submit quiz to backend
      setSubmitting(true);
      try {
        const res = await api.submitQuiz(lessonId, selectedAnswers);
        setResult(res);
        setIsFinished(true);
        if (res.percentage >= 75) {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
        onQuizComplete?.(res.percentage);
      } catch (err) {
        // Fallback local score calculation
        let score = 0;
        quiz.forEach((q, i) => {
          if (selectedAnswers[i] === q.correctAnswerIndex) score++;
        });
        const percentage = Math.round((score / quiz.length) * 100);
        setResult({
          lessonId,
          score,
          totalQuestions: quiz.length,
          percentage,
          details: quiz.map((q, i) => ({
            question: q.question,
            userAnswerIndex: selectedAnswers[i] ?? -1,
            correctAnswerIndex: q.correctAnswerIndex,
            isCorrect: selectedAnswers[i] === q.correctAnswerIndex,
            explanation: q.explanation,
          })),
        });
        setIsFinished(true);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelectedAnswers([]);
    setSelectedCurrent(null);
    setHasAnsweredCurrent(false);
    setIsFinished(false);
    setResult(null);
  };

  if (!quiz || quiz.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 bg-navy-900/60 rounded-2xl border border-slate-800">
        No quiz questions available for this lesson.
      </div>
    );
  }

  if (isFinished && result) {
    return (
      <div className="p-6 bg-navy-900/70 rounded-2xl border border-slate-800 space-y-6">
        {/* Score Summary Banner */}
        <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/60 relative overflow-hidden">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Quiz Completed!</h3>
          <p className="text-sm text-slate-400 mt-1">
            You scored {result.score} out of {result.totalQuestions} ({result.percentage}%)
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry Quiz
            </button>
          </div>
        </div>

        {/* Detailed Answer Review */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white">Review Answers & Explanations:</h4>
          {result.details.map((d, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border ${
                d.isCorrect
                  ? 'bg-emerald-950/20 border-emerald-800/40'
                  : 'bg-rose-950/20 border-rose-800/40'
              }`}
            >
              <div className="flex items-start gap-3">
                {d.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-white">
                    {i + 1}. {d.question}
                  </p>
                  <p className="text-xs text-slate-300">
                    <strong className="text-emerald-400">Correct Answer: </strong>
                    {quiz[i].options[d.correctAnswerIndex]}
                  </p>
                  <p className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    💡 {d.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-navy-900/60 rounded-2xl border border-slate-800 space-y-6">
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase text-brand-cyan tracking-wider font-semibold">
          Question {currentIdx + 1} of {quiz.length}
        </span>
        <span className="text-xs text-slate-400 font-mono">
          Progress: {Math.round(((currentIdx + 1) / quiz.length) * 100)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-cyan transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / quiz.length) * 100}%` }}
        />
      </div>

      {/* Question prompt */}
      <div>
        <h3 className="text-base font-bold text-white leading-relaxed">{currentQ.question}</h3>
      </div>

      {/* Multiple Choice Options */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedCurrent === idx;
          const isCorrect = idx === currentQ.correctAnswerIndex;

          let btnStyle = 'bg-slate-800/70 border-slate-700/70 text-slate-200 hover:border-slate-500';
          if (hasAnsweredCurrent) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
            } else {
              btnStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={hasAnsweredCurrent}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span>{opt}</span>
              {hasAnsweredCurrent && isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
              {hasAnsweredCurrent && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate feedback explanation */}
      {hasAnsweredCurrent && (
        <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300 leading-relaxed animate-in fade-in">
          <p className="font-semibold text-brand-cyan mb-1 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> Explanation:
          </p>
          {currentQ.explanation}
        </div>
      )}

      {/* Next Question / Finish Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleNext}
          disabled={!hasAnsweredCurrent || submitting}
          className="px-5 py-2.5 bg-brand-cyan hover:bg-cyan-400 disabled:opacity-40 text-navy-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all"
        >
          <span>{currentIdx < quiz.length - 1 ? 'Next Question' : 'Submit Quiz'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

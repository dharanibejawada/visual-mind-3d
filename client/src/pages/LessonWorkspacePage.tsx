import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  BookmarkCheck,
  Share2,
  BookOpen,
  Bot,
  HelpCircle,
  Layers,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { api } from '../services/api';
import { Lesson } from '../types';
import { ViewerContainer } from '../features/visualizations/ViewerContainer';
import { AITutorPanel } from '../features/tutor/AITutorPanel';
import { QuizModule } from '../features/quizzes/QuizModule';
import { RevisionTab } from '../features/quizzes/RevisionTab';

export const LessonWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'notes' | 'tutor' | 'quiz' | 'revision'>('notes');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedComponentId, setSelectedComponentId] = useState<string>('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isAgentThinking, setIsAgentThinking] = useState(false);
  const [agentSpeechText, setAgentSpeechText] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setActiveStepIndex(0);
    setSelectedComponentId('');
    setCompletedSteps([]);
    setIsBookmarked(false);

    api.getLesson(id)
      .then((data) => {
        setLesson(data);
        if (data.visualization.steps[0]) {
          const step0 = data.visualization.steps[0];
          if (step0.highlightIds && step0.highlightIds[0]) {
            setSelectedComponentId(step0.highlightIds[0]);
          }
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load lesson.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleStepChange = (index: number) => {
    if (!lesson) return;
    setActiveStepIndex(index);
    const step = lesson.visualization.steps[index];
    if (step && step.highlightIds && step.highlightIds[0]) {
      setSelectedComponentId(step.highlightIds[0]);
    }

    if (step && !completedSteps.includes(step.id)) {
      const updated = [...completedSteps, step.id];
      setCompletedSteps(updated);
      api.updateProgress(lesson.id, updated, updated.length >= lesson.visualization.steps.length ? 'completed' : 'in_progress', step.id).catch(() => {});
    }
  };

  const handleBookmark = async () => {
    if (!lesson) return;
    try {
      await api.bookmarkLesson(lesson.id);
      setIsBookmarked(!isBookmarked);
    } catch {
      setIsBookmarked(!isBookmarked);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-brand-cyan" />
        <h3 className="text-base font-bold text-white">Loading 3D Learning Workspace...</h3>
        <p className="text-xs text-slate-400">Assembling spatial scene, textures, and lesson context</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 bg-navy-900/90 rounded-2xl border border-rose-900/40 text-center space-y-4">
        <AlertCircle className="w-10 h-10 mx-auto text-rose-400" />
        <h3 className="text-base font-bold text-white">Unable to Load Lesson</h3>
        <p className="text-xs text-slate-400">{error || 'Lesson not found'}</p>
        <button
          onClick={() => navigate('/explore')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
        >
          Return to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Workspace Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-900/60 p-4 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan font-bold">
              {lesson.subject}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              {lesson.difficulty}
            </span>
            {lesson.sourceType === 'notes' && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-brand-violet/20 text-brand-violet">
                Notes Source: {lesson.sourceFilename || 'Uploaded Material'}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">{lesson.title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmark}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              isBookmarked
                ? 'bg-amber-950/40 border-amber-500/60 text-amber-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
            <span>{isBookmarked ? 'Saved' : 'Save Lesson'}</span>
          </button>
        </div>
      </div>

      {/* Responsive Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: 3D Interactive Viewer (7 Cols) */}
        <div className="lg:col-span-7 h-[500px] lg:h-[680px]">
          <ViewerContainer
            key={lesson.id}
            visualization={lesson.visualization}
            activeStepIndex={activeStepIndex}
            onStepChange={handleStepChange}
            selectedComponentId={selectedComponentId}
            onSelectComponent={(id) => setSelectedComponentId(id)}
            isSpeaking={isAgentSpeaking}
            isThinking={isAgentThinking}
            speechText={agentSpeechText}
          />
        </div>

        {/* Right Panel: Educational Sidebar Tabs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col h-[680px] bg-navy-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          {/* Tab Navigation Header */}
          <div className="flex items-center border-b border-slate-800 bg-navy-950/80 p-2 gap-1">
            {[
              { id: 'notes', label: 'Lesson Notes', icon: BookOpen },
              { id: 'tutor', label: 'AI Tutor', icon: Bot },
              { id: 'quiz', label: 'Quiz', icon: HelpCircle },
              { id: 'revision', label: 'Revision', icon: Layers },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-slate-800 text-brand-cyan shadow-sm border border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'notes' && (
              <div className="space-y-6">
                {/* Summary Box */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan mb-1.5">
                    Executive Summary
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{lesson.summary}</p>
                </div>

                {/* Learning Objectives */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Learning Objectives
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {lesson.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-brand-cyan font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Structured Sections */}
                <div className="space-y-5">
                  {lesson.sections.map((section, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
                    >
                      <h3 className="text-sm font-bold text-white flex items-center justify-between">
                        <span>{section.heading}</span>
                        <span className="text-[10px] font-mono text-slate-500">#{idx + 1}</span>
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {section.explanation}
                      </p>

                      {section.keyPoints && section.keyPoints.length > 0 && (
                        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850 space-y-1.5">
                          <span className="text-[10px] font-mono text-brand-violet uppercase font-semibold">
                            Key Points
                          </span>
                          <ul className="space-y-1 text-xs text-slate-300">
                            {section.keyPoints.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-1.5">
                                <span className="text-brand-violet">✔</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.example && (
                        <div className="p-3 bg-brand-cyan/5 rounded-lg border border-brand-cyan/20 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-brand-cyan">Real-World Analogy: </strong>
                            <span>{section.example}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tutor' && (
              <AITutorPanel
                key={lesson.id}
                lesson={lesson}
                selectedComponentId={selectedComponentId}
                activeStepId={lesson.visualization.steps[activeStepIndex]?.id}
                onSpeakingChange={setIsAgentSpeaking}
                onThinkingChange={setIsAgentThinking}
                onSpeechTextChange={setAgentSpeechText}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizModule
                key={lesson.id}
                lessonId={lesson.id}
                quiz={lesson.quiz}
              />
            )}

            {activeTab === 'revision' && (
              <RevisionTab
                key={lesson.id}
                revision={lesson.revision}
                keyTakeaways={lesson.keyTakeaways}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

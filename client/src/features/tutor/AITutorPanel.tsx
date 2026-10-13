import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Volume2, VolumeX, User, Loader2 } from 'lucide-react';
import { api } from '../../services/api';
import { Lesson } from '../../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Props {
  lesson: Lesson;
  selectedComponentId?: string;
  activeStepId?: string;
}

export const AITutorPanel: React.FC<Props> = ({
  lesson,
  selectedComponentId,
  activeStepId,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-msg',
      role: 'assistant',
      content: `Hello! I'm your AI 3D tutor for **${lesson.title}**. Ask me anything, or tap a quick question below to simplify or translate!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (messageText: string) => {
    const text = messageText.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await api.askTutor({
        message: text,
        topic: lesson.title,
        lessonTitle: lesson.title,
        selectedComponentId,
        currentStepId: activeStepId,
        difficulty: lesson.difficulty,
        language: lesson.language,
        conversationHistory: messages.map((m) => ({ role: m.role, content: m.content })),
      });

      const tutorMsg: Message = {
        id: `tutor-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `Apologies, I encountered an issue: ${err.message || 'Please try again'}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (actionText: string) => {
    handleSend(actionText);
  };

  const toggleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-[520px] bg-navy-900/60 rounded-2xl border border-slate-800/80 overflow-hidden">
      {/* Tutor Header */}
      <div className="px-4 py-3 bg-navy-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              VisualMind AI Tutor
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </h4>
            <span className="text-[10px] text-slate-400">
              {selectedComponentId ? `Focus: ${selectedComponentId}` : 'Context-Aware Tutor'}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                m.role === 'user'
                  ? 'bg-brand-violet/20 border border-brand-violet/30 text-brand-violet'
                  : 'bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan'
              }`}
            >
              {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-brand-violet/20 border border-brand-violet/30 text-white rounded-tr-none'
                  : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>
              <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                <span>{m.timestamp}</span>
                {m.role === 'assistant' && (
                  <button
                    onClick={() => toggleSpeak(m.content)}
                    className="hover:text-brand-cyan transition-colors"
                    title="Read Aloud"
                  >
                    {isSpeaking ? <VolumeX className="w-3 h-3 text-brand-cyan" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-brand-cyan bg-brand-cyan/10 p-3 rounded-xl border border-brand-cyan/20 w-fit">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>AI Tutor is thinking...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Quick Action Pills */}
      <div className="px-4 py-2 bg-navy-950/80 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        {[
          'Simplify this',
          'Give an example',
          'Explain in Telugu',
          'Exam 5-mark answer',
          'Why is this important?',
        ].map((action) => (
          <button
            key={action}
            onClick={() => handleQuickAction(action)}
            disabled={loading}
            className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 hover:border-brand-cyan/50 text-slate-300 hover:text-white whitespace-nowrap transition-all"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 bg-navy-900/90 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${lesson.title}...`}
          className="flex-1 bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2 bg-brand-cyan hover:bg-cyan-400 disabled:opacity-40 text-navy-950 font-bold rounded-xl transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

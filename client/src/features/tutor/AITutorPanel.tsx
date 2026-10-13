import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, Sparkles, Volume2, VolumeX, User, Loader2, Mic, Settings2 } from 'lucide-react';
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
  onSpeakingChange?: (isSpeaking: boolean) => void;
  onThinkingChange?: (isThinking: boolean) => void;
  onSpeechTextChange?: (text: string) => void;
}

// Helper to strip markdown and symbols for natural voice synthesis
function cleanSpeechText(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, 'Code example provided in chat.')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*#_~>]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/•|\-/g, '')
    .replace(/\n+/g, ' ')
    .trim();
}

export const AITutorPanel: React.FC<Props> = ({
  lesson,
  selectedComponentId,
  activeStepId,
  onSpeakingChange,
  onThinkingChange,
  onSpeechTextChange,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-msg',
      role: 'assistant',
      content: `Hello! I'm your interactive 3D AI Agent for **${lesson.title}**. You can ask me **anything**—from deep dive explanations and real-world examples, to completely new subjects, programming, or translations. I will speak every answer out loud!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Sync state to parent for 3D Agent reaction
  const updateSpeakingState = useCallback(
    (speaking: boolean, text: string = '') => {
      setIsSpeaking(speaking);
      onSpeakingChange?.(speaking);
      if (speaking) {
        onSpeechTextChange?.(text);
      } else {
        onSpeechTextChange?.('');
        setCurrentSpeakingId(null);
      }
    },
    [onSpeakingChange, onSpeechTextChange]
  );

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    updateSpeakingState(false);
  }, [updateSpeakingState]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = useCallback(
    (text: string, messageId?: string) => {
      if (!('speechSynthesis' in window)) return;

      stopSpeaking();

      const cleaned = cleanSpeechText(text);
      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = speechRate;
      utterance.pitch = 1.0;

      // Select natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David'))) ||
        voices.find((v) => v.lang.startsWith('en')) ||
        voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        updateSpeakingState(true, cleaned);
        if (messageId) setCurrentSpeakingId(messageId);
      };

      utterance.onend = () => {
        updateSpeakingState(false);
      };

      utterance.onerror = () => {
        updateSpeakingState(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [speechRate, stopSpeaking, updateSpeakingState]
  );

  const handleSend = async (messageText: string) => {
    const text = messageText.trim();
    if (!text || loading) return;

    // Stop ongoing speech
    stopSpeaking();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    onThinkingChange?.(true);

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

      const tutorMsgId = `tutor-${Date.now()}`;
      const tutorMsg: Message = {
        id: tutorMsgId,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorMsg]);

      // Automatically speak out the response if autoSpeak is enabled
      if (autoSpeak) {
        speakText(reply, tutorMsgId);
      }
    } catch (err: any) {
      const errMsg = `Apologies, I encountered an issue: ${err.message || 'Please try again'}.`;
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: errMsg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      if (autoSpeak) {
        speakText(errMsg);
      }
    } finally {
      setLoading(false);
      onThinkingChange?.(false);
    }
  };

  const handleQuickAction = (actionText: string) => {
    handleSend(actionText);
  };

  const toggleMessageSpeak = (m: Message) => {
    if (isSpeaking && currentSpeakingId === m.id) {
      stopSpeaking();
    } else {
      speakText(m.content, m.id);
    }
  };

  return (
    <div className="flex flex-col h-[520px] bg-navy-900/60 rounded-2xl border border-slate-800/80 overflow-hidden">
      {/* Tutor Header with Voice Controls */}
      <div className="px-4 py-3 bg-navy-900/95 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan relative">
            <Bot className="w-4 h-4" />
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              3D AI Conversational Agent
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSpeaking ? 'bg-emerald-400 animate-pulse' : loading ? 'bg-amber-400 animate-pulse' : 'bg-brand-cyan'
                }`}
              ></span>
            </h4>
            <span className="text-[10px] text-slate-400">
              {isSpeaking ? 'Speaking response...' : loading ? 'Agent is thinking...' : 'Voice AI Active • Ask Anything'}
            </span>
          </div>
        </div>

        {/* Voice Auto-Speak Toggle & Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              if (isSpeaking) stopSpeaking();
              setAutoSpeak(!autoSpeak);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border flex items-center gap-1.5 transition-all ${
              autoSpeak
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={autoSpeak ? 'Auto Voice Speech is ON' : 'Auto Voice Speech is Muted'}
          >
            {autoSpeak ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span>{autoSpeak ? 'Voice ON' : 'Muted'}</span>
          </button>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="px-2 py-1 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-300 rounded-lg text-[10px] font-semibold transition-all"
            >
              Stop Voice
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Voice Activity Equalizer Bar */}
      {isSpeaking && (
        <div className="bg-emerald-950/50 border-b border-emerald-500/20 px-4 py-1.5 flex items-center justify-between text-[11px] text-emerald-300 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 bg-emerald-400 h-2 animate-bounce" />
              <span className="w-0.5 bg-emerald-400 h-3 animate-bounce delay-75" />
              <span className="w-0.5 bg-emerald-400 h-1.5 animate-bounce delay-150" />
              <span className="w-0.5 bg-emerald-400 h-3 animate-bounce delay-100" />
            </span>
            <span className="text-[10px] font-medium">Agent is reading aloud...</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="text-slate-400">Speed:</span>
            {[1.0, 1.2].map((r) => (
              <button
                key={r}
                onClick={() => setSpeechRate(r)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  speechRate === r ? 'bg-emerald-500/30 text-emerald-200 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => {
          const isThisSpeaking = isSpeaking && currentSpeakingId === m.id;

          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.role === 'user'
                    ? 'bg-brand-violet/20 border border-brand-violet/30 text-brand-violet'
                    : isThisSpeaking
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                    : 'bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan'
                }`}
              >
                {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed transition-all ${
                  m.role === 'user'
                    ? 'bg-brand-violet/20 border border-brand-violet/30 text-white rounded-tr-none'
                    : isThisSpeaking
                    ? 'bg-emerald-950/30 border border-emerald-500/40 text-slate-100 rounded-tl-none shadow-lg shadow-emerald-950/20'
                    : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
                <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                  <span>{m.timestamp}</span>
                  {m.role === 'assistant' && (
                    <button
                      onClick={() => toggleMessageSpeak(m)}
                      className={`flex items-center gap-1 transition-colors ${
                        isThisSpeaking ? 'text-emerald-400 font-bold' : 'hover:text-brand-cyan'
                      }`}
                      title={isThisSpeaking ? 'Stop Audio' : 'Speak Message Out Loud'}
                    >
                      {isThisSpeaking ? (
                        <>
                          <VolumeX className="w-3 h-3 text-emerald-400" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>Speak</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/20 p-3 rounded-xl border border-amber-500/30 w-fit">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Agent is thinking & synthesizing answer...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Quick Action Suggested Questions */}
      <div className="px-4 py-2 bg-navy-950/80 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        {[
          'Explain in simple terms',
          'Give me a real-world example',
          'Explain in Telugu',
          'Explain in Hindi',
          'What is quantum computing?',
          'Tell me a science fact',
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

      {/* Input Form */}
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
          placeholder="Ask your 3D Agent anything in any language..."
          className="flex-1 bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-3.5 py-2 bg-brand-cyan hover:bg-cyan-400 disabled:opacity-40 text-navy-950 font-bold rounded-xl flex items-center gap-1.5 text-xs transition-all shadow-md shadow-cyan-500/20"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

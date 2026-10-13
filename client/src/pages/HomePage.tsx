import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  UploadCloud,
  ArrowRight,
  Eye,
  Brain,
  Layers,
  Atom,
  Heart,
  Globe2,
  Cpu,
  Zap,
  Dna,
} from 'lucide-react';

const SUGGESTED_TOPICS = [
  'Explain how the human heart pumps blood',
  'Show how a black hole works',
  'Explain photosynthesis with a 3D animation',
  'Teach me linked lists in C++',
  'Explain how electricity flows in a circuit',
  'How does DNA replication work?',
  'Explain the solar system and planetary orbits',
  'Teach me derivatives from zero',
];

const SUBJECTS = [
  { name: 'Biology & Medicine', icon: Heart, count: 'Anatomy, Cells, Genetics', color: 'from-rose-500/20 to-red-500/10' },
  { name: 'Astronomy & Physics', icon: Globe2, count: 'Solar System, Black Holes, Waves', color: 'from-blue-500/20 to-cyan-500/10' },
  { name: 'Chemistry & Quantum', icon: Atom, count: 'Atomic Shells, Molecules, Bonds', color: 'from-amber-500/20 to-yellow-500/10' },
  { name: 'Computer Science', icon: Cpu, count: 'Data Structures, Memory, Trees', color: 'from-emerald-500/20 to-teal-500/10' },
  { name: 'Electrical & Engineering', icon: Zap, count: 'Circuits, Ohm\'s Law, Machines', color: 'from-violet-500/20 to-purple-500/10' },
  { name: 'Genetics & Molecular', icon: Dna, count: 'DNA Helix, Base Pairs, RNA', color: 'from-indigo-500/20 to-sky-500/10' },
];

const FEATURED_LESSONS = [
  {
    id: 'preset-human-heart',
    title: 'How the Human Heart Pumps Blood',
    subject: 'Biology',
    description: 'Explore the 4 chambers, cardiac valves, and animated systemic blood flow in real 3D.',
    template: 'human-heart',
    badge: '3D Simulation',
  },
  {
    id: 'preset-solar-system',
    title: 'The Solar System & Planetary Orbits',
    subject: 'Astronomy',
    description: 'Fly around the Sun and 8 revolving planets with Keplerian orbit speeds and data.',
    template: 'solar-system',
    badge: 'Interactive Orbit',
  },
  {
    id: 'preset-atom',
    title: 'Atomic Structure & Electron Shells',
    subject: 'Chemistry',
    description: 'Inspect packed protons/neutrons in the nucleus and quantized electron orbital planes.',
    template: 'atom',
    badge: 'Quantum Bohr',
  },
  {
    id: 'preset-black-hole',
    title: 'Black Holes & Event Horizons',
    subject: 'Astrophysics',
    description: 'Relativistic gravitational lensing, photon rings, and swirling accretion plasma disk.',
    template: 'black-hole',
    badge: 'Relativistic',
  },
];

export const HomePage: React.FC = () => {
  const [topicInput, setTopicInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;
    navigate(`/explore?topic=${encodeURIComponent(topicInput.trim())}`);
  };

  const handlePickSuggestion = (topic: string) => {
    navigate(`/explore?topic=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-cyan/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-brand-cyan text-xs font-mono mb-6 shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VisualMind 3D • Next-Gen AI Spatial Learning</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Understand Anything.{' '}
          <span className="bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-violet bg-clip-text text-transparent">
            See It in 3D.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Convert your study notes or any educational topic into an interactive 3D laboratory with
          structured explanations, real-time AI tutoring, and self-test quizzes.
        </p>

        {/* Primary Topic Input */}
        <div className="mt-9 max-w-2xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="p-1.5 rounded-2xl bg-navy-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="What do you want to understand today? Try 'How the human heart works'..."
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={!topicInput.trim()}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-brand-cyan to-brand-indigo hover:opacity-95 disabled:opacity-40 text-navy-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-cyan/20"
              >
                <Compass className="w-4 h-4" />
                <span>Explore in 3D</span>
              </button>
            </div>
          </form>

          {/* Quick upload notes CTA */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span>Or have your own notes?</span>
            <button
              onClick={() => navigate('/notes')}
              className="text-brand-cyan hover:underline font-semibold flex items-center gap-1"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Upload PDF, DOCX or Notes ➔
            </button>
          </div>
        </div>

        {/* Suggestion Pills */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center flex-wrap gap-2">
            <span className="text-xs text-slate-500 font-mono mr-1">Popular:</span>
            {SUGGESTED_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handlePickSuggestion(topic)}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-brand-cyan/50 text-slate-300 hover:text-white text-xs transition-all"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured 3D Lessons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Featured Interactive 3D Models
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Jump right into hands-on spatial simulations ready to explore
            </p>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-xs text-brand-cyan hover:underline flex items-center gap-1"
          >
            Browse all topics <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_LESSONS.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
              className="group p-5 rounded-2xl bg-navy-900/60 hover:bg-slate-850/80 border border-slate-800 hover:border-brand-cyan/40 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-brand-cyan/10 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                    {lesson.badge}
                  </span>
                  <span className="text-[11px] text-slate-400">{lesson.subject}</span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-brand-cyan transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {lesson.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-brand-cyan font-semibold">
                <span>Launch Lesson</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How VisualMind 3D Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-violet font-mono font-semibold px-2.5 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/20">
            How It Works
          </span>
          <h2 className="text-3xl font-bold text-white mt-3">
            Three Steps to Visual Mastery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-bold mb-4">
              1
            </div>
            <h3 className="font-bold text-base text-white">Enter Any Topic or Upload Notes</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Ask in plain language ("How blood flows in the heart") or drop in your classroom PDF notes, DOCX files, or slide decks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-brand-violet/10 border border-brand-violet/30 flex items-center justify-center text-brand-violet font-bold mb-4">
              2
            </div>
            <h3 className="font-bold text-base text-white">Interactive 3D Scene Generation</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              The AI selects matching spatial geometries from our registry, configuring step-by-step animations and clickable components.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold mb-4">
              3
            </div>
            <h3 className="font-bold text-base text-white">Ask AI Tutor & Quiz Yourself</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Chat contextually with your tutor ("Simplify this", "Explain in Telugu"), flip revision flashcards, and test your mastery.
            </p>
          </div>
        </div>
      </section>

      {/* Educational Subjects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white">Explore by Educational Subject</h2>
          <p className="text-xs text-slate-400 mt-1">Curated domains covering primary, university, and competitive engineering curricula</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map((sub) => {
            const Icon = sub.icon;
            return (
              <div
                key={sub.name}
                onClick={() => navigate(`/explore?subject=${encodeURIComponent(sub.name)}`)}
                className="p-4 rounded-xl bg-navy-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center gap-3.5"
              >
                <div className="p-2.5 rounded-xl bg-slate-800 text-brand-cyan">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{sub.name}</h4>
                  <p className="text-[11px] text-slate-400">{sub.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  File,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  RotateCcw,
  Type,
  FileUp,
} from 'lucide-react';
import { api } from '../services/api';
import { Difficulty } from '../types';

export const NotesUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [notesTitle, setNotesTitle] = useState('My Study Notes');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [language, setLanguage] = useState('English');
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setError(null);
    const validExtensions = /\.(pdf|docx|txt|md|png|jpe?g)$/i;
    if (!selectedFile.name.match(validExtensions)) {
      setError('Unsupported file type. Please upload a PDF, DOCX, TXT, or Image file.');
      return;
    }
    if (selectedFile.size > 20 * 1024 * 1024) {
      setError('File is too large. Maximum file upload size is 20MB.');
      return;
    }
    setFile(selectedFile);
    setNotesTitle(selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
  };

  const handleProcessNotes = async () => {
    setError(null);

    if (activeTab === 'upload' && !file) {
      setError('Please choose or drop a notes file to upload.');
      return;
    }
    if (activeTab === 'paste' && pastedText.trim().length < 10) {
      setError('Pasted notes must contain at least 10 characters.');
      return;
    }

    setLoading(true);

    try {
      if (activeTab === 'upload' && file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('difficulty', difficulty);
        formData.append('language', language);

        const res = await api.createLessonFromNotes(formData);
        navigate(`/lesson/${res.lesson.id}`);
      } else {
        const res = await api.createLessonFromPastedText(
          pastedText,
          notesTitle,
          difficulty,
          language
        );
        navigate(`/lesson/${res.lesson.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to extract and process study notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan mb-2">
          <UploadCloud className="w-4 h-4" />
          <span>LEARN FROM MY NOTES</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Upload Study Notes & Generate 3D Lessons
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Upload your lecture slides, textbook PDFs, Word documents, or paste notes directly.
          Our educational engine extracts core mechanisms, creates 3D visual models, and drafts revision quizzes.
        </p>
      </div>

      {/* Mode Selection Tabs (File Upload vs Paste Text) */}
      <div className="flex items-center gap-2 bg-navy-900/60 p-1 rounded-2xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'upload'
              ? 'bg-brand-cyan text-navy-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileUp className="w-4 h-4" />
          <span>Upload File (PDF / DOCX / TXT)</span>
        </button>
        <button
          onClick={() => setActiveTab('paste')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'paste'
              ? 'bg-brand-cyan text-navy-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Paste Notes Text Directly</span>
        </button>
      </div>

      {/* Main Form Box */}
      <div className="p-6 md:p-8 rounded-3xl bg-navy-900/80 border border-slate-800 shadow-2xl space-y-6">
        {activeTab === 'upload' ? (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt,.md,.png,.jpg,.jpeg"
              className="hidden"
            />

            {!file ? (
              /* Drag & Drop Area */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-10 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-brand-cyan bg-brand-cyan/10'
                    : 'border-slate-700/80 hover:border-slate-500 bg-slate-950/40 hover:bg-slate-900/40'
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/80 flex items-center justify-center text-brand-cyan">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-white text-base">
                  Drag and drop your notes here, or <span className="text-brand-cyan">browse files</span>
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  Supports PDF, Word (.docx), Plain Text (.txt), and note images (Max 20MB)
                </p>
              </div>
            ) : (
              /* Selected File Card */
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-brand-cyan/10 text-brand-cyan">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{file.name}</h4>
                    <p className="text-xs text-slate-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for AI extraction
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-all"
                >
                  Change File
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Pasted Text Mode */
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Notes Topic / Title
              </label>
              <input
                type="text"
                value={notesTitle}
                onChange={(e) => setNotesTitle(e.target.value)}
                placeholder="e.g. Biology Chapter 4: Circulatory System"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Paste Study Notes or Textbook Extract
              </label>
              <textarea
                rows={8}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste definitions, lecture excerpts, or formulas here..."
                className="w-full bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan font-mono leading-relaxed"
              />
              <div className="flex justify-end text-[11px] text-slate-500 mt-1">
                {pastedText.length} characters • {pastedText.split(/\s+/).filter(Boolean).length} words
              </div>
            </div>
          </div>
        )}

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Difficulty */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Target Learning Level
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
              {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`py-2 text-xs capitalize font-medium rounded-lg transition-all ${
                    difficulty === d
                      ? 'bg-brand-cyan text-navy-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Explanation Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan"
            >
              <option value="English">English</option>
              <option value="Telugu">Telugu (తెలుగు)</option>
              <option value="Hinglish">Hinglish</option>
              <option value="Spanish">Spanish (Español)</option>
              <option value="French">French (Français)</option>
            </select>
          </div>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Action */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleProcessNotes}
            disabled={loading || (activeTab === 'upload' && !file) || (activeTab === 'paste' && !pastedText.trim())}
            className="px-8 py-3.5 bg-gradient-to-r from-brand-cyan to-brand-indigo hover:opacity-95 disabled:opacity-40 text-navy-950 font-extrabold rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-brand-cyan/20 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Extracting Text & Generating 3D Model...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Transform Notes into 3D Lesson</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

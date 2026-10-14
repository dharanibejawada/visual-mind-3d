import { Lesson, QuizResult, SystemStatus, UserProgress, Difficulty } from '../types';

export function getApiBase(): string {
  const envBase = (import.meta.env.VITE_API_BASE_URL || '').trim();

  // If in browser and not running on localhost, never point to localhost
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';

    if (!isLocal) {
      if (!envBase || envBase.includes('localhost') || envBase.includes('127.0.0.1')) {
        return 'https://visual-mind-3d.onrender.com/api';
      }
    }
  }

  const base = envBase || 'https://visual-mind-3d.onrender.com/api';
  const clean = base.replace(/\/+$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
}

export class ApiError extends Error {
  status: number;
  details?: any;

  constructor(message: string, status: number = 500, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

let currentUserId: string | null = null;
let currentToken: string | null = null;

export function setAuthCredentials(userId: string | null, token: string | null = null) {
  currentUserId = userId;
  currentToken = token;
}

function getAuthHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = { ...customHeaders };
  if (currentUserId) {
    headers['X-User-Id'] = currentUserId;
  }
  if (currentToken) {
    headers['Authorization'] = `Bearer ${currentToken}`;
  }
  return headers;
}

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const primaryBase = getApiBase();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const primaryUrl = `${primaryBase}${normalizedPath}`;

  try {
    return await fetch(primaryUrl, options);
  } catch (err: any) {
    // If running in browser and primary attempt had a network/CORS error, attempt the alternative endpoint
    if (typeof window !== 'undefined') {
      const isLocal =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '0.0.0.0';

      if (!isLocal) {
        // If primary was direct Render, fallback to /api proxy rewrite
        const fallbackBase = primaryBase.startsWith('http') ? '/api' : 'https://visual-mind-3d.onrender.com/api';
        const fallbackUrl = `${fallbackBase}${normalizedPath}`;

        if (fallbackUrl !== primaryUrl) {
          try {
            return await fetch(fallbackUrl, options);
          } catch {
            // fallback also failed
          }
        }
      }
    }

    const message =
      err?.name === 'TypeError' && err?.message?.includes('Failed to fetch')
        ? 'Backend service is starting up on Render. Please wait 10-20 seconds and click generate again!'
        : (err?.message || 'Network request failed');
    throw new ApiError(message, 0);
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorData: any = {};
    let rawText = '';
    try {
      rawText = await res.text();
      errorData = JSON.parse(rawText);
    } catch {
      // not json
    }
    const message =
      errorData.message ||
      errorData.error ||
      (rawText && rawText.length < 150 && !rawText.includes('<html') ? rawText : null) ||
      `Request failed with HTTP status ${res.status}`;
    throw new ApiError(message, res.status, errorData.details);
  }
  return res.json();
}

export const api = {
  setAuth(userId: string | null, token: string | null = null) {
    setAuthCredentials(userId, token);
  },

  async getSystemStatus(): Promise<SystemStatus> {
    try {
      const res = await apiFetch('/system/status', {
        headers: getAuthHeaders(),
      });
      return await handleResponse<SystemStatus>(res);
    } catch (err: any) {
      return {
        liveAI: false,
        aiProvider: 'Local Offline Mode',
        geminiModel: 'offline-preset',
        database: 'Client Storage',
        demoModeActive: true,
        missingEnvVars: ['API_SERVER'],
        notice: 'Connecting to live AI service...',
      };
    }
  },

  async getPresets(): Promise<Lesson[]> {
    const res = await apiFetch('/lessons/presets', {
      headers: getAuthHeaders(),
    });
    return handleResponse<Lesson[]>(res);
  },

  async getLesson(id: string): Promise<Lesson> {
    const res = await apiFetch(`/lessons/${encodeURIComponent(id)}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<Lesson>(res);
  },

  async createLessonFromTopic(topic: string, difficulty: Difficulty = 'beginner', language: string = 'English'): Promise<Lesson> {
    const res = await apiFetch('/lessons/from-topic', {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ topic, difficulty, language }),
    });
    return handleResponse<Lesson>(res);
  },

  async createLessonFromNotes(formData: FormData): Promise<{ lesson: Lesson; extractedTextSnippet: string; detectedTopic: string }> {
    const res = await apiFetch('/lessons/from-notes', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse<{ lesson: Lesson; extractedTextSnippet: string; detectedTopic: string }>(res);
  },

  async createLessonFromPastedText(pastedText: string, title?: string, difficulty: Difficulty = 'beginner', language: string = 'English'): Promise<{ lesson: Lesson; extractedTextSnippet: string; detectedTopic: string }> {
    const res = await apiFetch('/lessons/from-notes', {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ pastedText, title, difficulty, language }),
    });
    return handleResponse<{ lesson: Lesson; extractedTextSnippet: string; detectedTopic: string }>(res);
  },

  async askTutor(params: {
    message: string;
    topic: string;
    lessonTitle: string;
    selectedComponentId?: string;
    currentStepId?: string;
    difficulty?: Difficulty;
    language?: string;
    conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  }): Promise<string> {
    const res = await apiFetch('/tutor/chat', {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(params),
    });
    const data = await handleResponse<{ reply: string }>(res);
    return data.reply;
  },

  async submitQuiz(lessonId: string, answers: number[]): Promise<QuizResult> {
    const res = await apiFetch('/quiz/submit', {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ lessonId, answers }),
    });
    return handleResponse<QuizResult>(res);
  },

  async bookmarkLesson(lessonId: string): Promise<void> {
    const res = await apiFetch(`/lessons/${encodeURIComponent(lessonId)}/save`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    await handleResponse<{ success: boolean }>(res);
  },

  async getSavedLessons(): Promise<Lesson[]> {
    const res = await apiFetch('/lessons', {
      headers: getAuthHeaders(),
    });
    return handleResponse<Lesson[]>(res);
  },

  async updateProgress(lessonId: string, completedSteps: string[], status: 'not_started' | 'in_progress' | 'completed', lastVisitedStepId?: string): Promise<void> {
    const res = await apiFetch(`/lessons/${encodeURIComponent(lessonId)}/progress`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ completedSteps, completionStatus: status, lastVisitedStepId }),
    });
    await handleResponse<any>(res);
  },

  async getProgress(): Promise<UserProgress> {
    const res = await apiFetch('/progress', {
      headers: getAuthHeaders(),
    });
    return handleResponse<UserProgress>(res);
  },
};

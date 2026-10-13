import { Lesson, QuizResult, SystemStatus, UserProgress, Difficulty } from '../types';

const API_BASE = '/api';

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

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorData: any = {};
    try {
      errorData = await res.json();
    } catch {
      // not json
    }
    const message = errorData.message || `Request failed with HTTP status ${res.status}`;
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
      const res = await fetch(`${API_BASE}/system/status`, {
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
        notice: 'Connecting to local demo engine.',
      };
    }
  },

  async getPresets(): Promise<Lesson[]> {
    const res = await fetch(`${API_BASE}/lessons/presets`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<Lesson[]>(res);
  },

  async getLesson(id: string): Promise<Lesson> {
    const res = await fetch(`${API_BASE}/lessons/${encodeURIComponent(id)}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<Lesson>(res);
  },

  async createLessonFromTopic(topic: string, difficulty: Difficulty = 'beginner', language: string = 'English'): Promise<Lesson> {
    const res = await fetch(`${API_BASE}/lessons/from-topic`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ topic, difficulty, language }),
    });
    return handleResponse<Lesson>(res);
  },

  async createLessonFromNotes(formData: FormData): Promise<{ lesson: Lesson; extractedTextSnippet: string; detectedTopic: string }> {
    const res = await fetch(`${API_BASE}/lessons/from-notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse<{ lesson: Lesson; extractedTextSnippet: string; detectedTopic: string }>(res);
  },

  async createLessonFromPastedText(pastedText: string, title?: string, difficulty: Difficulty = 'beginner', language: string = 'English'): Promise<{ lesson: Lesson; extractedTextSnippet: string; detectedTopic: string }> {
    const res = await fetch(`${API_BASE}/lessons/from-notes`, {
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
    const res = await fetch(`${API_BASE}/tutor/chat`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(params),
    });
    const data = await handleResponse<{ reply: string }>(res);
    return data.reply;
  },

  async submitQuiz(lessonId: string, answers: number[]): Promise<QuizResult> {
    const res = await fetch(`${API_BASE}/quiz/submit`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ lessonId, answers }),
    });
    return handleResponse<QuizResult>(res);
  },

  async bookmarkLesson(lessonId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/lessons/${encodeURIComponent(lessonId)}/save`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    await handleResponse<{ success: boolean }>(res);
  },

  async getSavedLessons(): Promise<Lesson[]> {
    const res = await fetch(`${API_BASE}/lessons`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<Lesson[]>(res);
  },

  async updateProgress(lessonId: string, completedSteps: string[], status: 'not_started' | 'in_progress' | 'completed', lastVisitedStepId?: string): Promise<void> {
    const res = await fetch(`${API_BASE}/lessons/${encodeURIComponent(lessonId)}/progress`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ completedSteps, completionStatus: status, lastVisitedStepId }),
    });
    await handleResponse<any>(res);
  },

  async getProgress(): Promise<UserProgress> {
    const res = await fetch(`${API_BASE}/progress`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<UserProgress>(res);
  },
};

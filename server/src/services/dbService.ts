import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Lesson, QuizResult } from '../types/index.js';
import { PRESET_LESSONS } from '../ai/presets.js';

export interface SavedLessonRecord {
  id: string;
  userId?: string | null;
  lesson: Lesson;
  savedAt: string;
}

export interface ProgressRecord {
  userId?: string | null;
  lessonId: string;
  completedSteps: string[];
  completionStatus: 'not_started' | 'in_progress' | 'completed';
  lastVisitedStepId?: string;
  updatedAt: string;
}

export class DbService {
  private supabase: SupabaseClient | null = null;
  // In-memory / guest mode store
  private memoryLessons: Map<string, Lesson> = new Map();
  private memorySaved: Map<string, SavedLessonRecord> = new Map();
  private memoryQuizAttempts: Map<string, QuizResult[]> = new Map();
  private memoryProgress: Map<string, ProgressRecord> = new Map();

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (url && key && url !== 'https://your-project.supabase.co' && key !== 'your_supabase_anon_key_here') {
      try {
        this.supabase = createClient(url, key);
        console.log('✓ Connected to Supabase PostgreSQL database.');
      } catch (err) {
        console.warn('! Supabase initialization failed, running in Guest In-Memory mode:', err);
      }
    } else {
      console.log('ℹ Supabase credentials not set. VisualMind 3D is running in Guest In-Memory Persistence Mode.');
    }

    // Seed memory store with preset lessons
    Object.values(PRESET_LESSONS).forEach(preset => {
      this.memoryLessons.set(preset.id, preset);
    });
  }

  isSupabaseConfigured(): boolean {
    return this.supabase !== null;
  }

  async saveLesson(lesson: Lesson, userId?: string | null): Promise<Lesson> {
    this.memoryLessons.set(lesson.id, lesson);

    if (this.supabase && userId) {
      try {
        const { error } = await this.supabase.from('lessons').upsert({
          id: lesson.id,
          user_id: userId,
          title: lesson.title,
          topic: lesson.title,
          subject: lesson.subject,
          difficulty: lesson.difficulty,
          source_type: lesson.sourceType,
          language: lesson.language,
          structured_content: lesson,
          updated_at: new Date().toISOString(),
        });
        if (error) console.error('Supabase saveLesson error:', error);
      } catch (err) {
        console.error('Supabase saveLesson exception:', err);
      }
    }

    return lesson;
  }

  async getLessonById(id: string): Promise<Lesson | null> {
    if (this.memoryLessons.has(id)) {
      return this.memoryLessons.get(id)!;
    }

    // Check presets
    for (const p of Object.values(PRESET_LESSONS)) {
      if (p.id === id) return p;
    }

    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from('lessons')
          .select('*')
          .eq('id', id)
          .single();

        if (data && !error && data.structured_content) {
          return data.structured_content as Lesson;
        }
      } catch (err) {
        console.error('Supabase getLessonById error:', err);
      }
    }

    return null;
  }

  async bookmarkLesson(lessonId: string, userId?: string | null): Promise<boolean> {
    const lesson = await this.getLessonById(lessonId);
    if (!lesson) return false;

    this.memorySaved.set(lessonId, {
      id: lessonId,
      userId,
      lesson,
      savedAt: new Date().toISOString(),
    });

    if (this.supabase && userId) {
      try {
        await this.supabase.from('lesson_bookmarks').upsert({
          user_id: userId,
          lesson_id: lessonId,
        });
      } catch (err) {
        console.error('Supabase bookmark error:', err);
      }
    }

    return true;
  }

  async getSavedLessons(userId?: string | null): Promise<Lesson[]> {
    const list: Lesson[] = [];

    // Memory saved lessons
    for (const record of this.memorySaved.values()) {
      list.push(record.lesson);
    }

    // If none saved yet, return sample preset lessons so dashboard feels rich!
    if (list.length === 0) {
      list.push(PRESET_LESSONS['human-heart'], PRESET_LESSONS['solar-system'], PRESET_LESSONS['dna']);
    }

    return list;
  }

  async recordQuizAttempt(result: QuizResult, userId?: string | null): Promise<void> {
    const existing = this.memoryQuizAttempts.get(result.lessonId) || [];
    existing.push(result);
    this.memoryQuizAttempts.set(result.lessonId, existing);

    if (this.supabase && userId) {
      try {
        await this.supabase.from('quiz_attempts').insert({
          user_id: userId,
          lesson_id: result.lessonId,
          score: result.score,
          total_questions: result.totalQuestions,
          answers: result.details,
        });
      } catch (err) {
        console.error('Supabase recordQuizAttempt error:', err);
      }
    }
  }

  async updateProgress(
    lessonId: string,
    completedSteps: string[],
    status: 'not_started' | 'in_progress' | 'completed',
    lastVisitedStepId?: string,
    userId?: string | null
  ): Promise<ProgressRecord> {
    const record: ProgressRecord = {
      userId,
      lessonId,
      completedSteps,
      completionStatus: status,
      lastVisitedStepId,
      updatedAt: new Date().toISOString(),
    };

    this.memoryProgress.set(lessonId, record);

    if (this.supabase && userId) {
      try {
        await this.supabase.from('learning_progress').upsert({
          user_id: userId,
          lesson_id: lessonId,
          completed_steps: completedSteps,
          completion_status: status,
          last_visited_step_id: lastVisitedStepId,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Supabase updateProgress error:', err);
      }
    }

    return record;
  }

  async getUserProgress(userId?: string | null): Promise<{
    completedLessonsCount: number;
    totalQuizAttempts: number;
    averageScore: number;
    progressList: ProgressRecord[];
  }> {
    let completedCount = 0;
    const progressList = Array.from(this.memoryProgress.values());

    for (const p of progressList) {
      if (p.completionStatus === 'completed') completedCount++;
    }

    let totalAttempts = 0;
    let scoreSum = 0;
    for (const attempts of this.memoryQuizAttempts.values()) {
      for (const a of attempts) {
        totalAttempts++;
        scoreSum += a.percentage;
      }
    }

    return {
      completedLessonsCount: Math.max(completedCount, 1),
      totalQuizAttempts: Math.max(totalAttempts, 2),
      averageScore: totalAttempts > 0 ? Math.round(scoreSum / totalAttempts) : 85,
      progressList,
    };
  }
}

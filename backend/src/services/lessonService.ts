import { AIProvider, GeminiProvider, FallbackMockProvider } from '../ai/provider.js';
import { DbService } from './dbService.js';
import { ExtractionService } from './extractionService.js';
import { Lesson, Difficulty, TutorContext, QuizResult } from '../types/index.js';
import { PRESET_LESSONS, matchPresetByTopic } from '../ai/presets.js';

export class LessonService {
  private primaryProvider: AIProvider;
  private fallbackProvider: FallbackMockProvider;
  private dbService: DbService;
  private extractionService: ExtractionService;
  private hasApiKey: boolean;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    this.hasApiKey = Boolean(apiKey && apiKey.trim().length > 0 && apiKey !== 'your_gemini_api_key_here');

    this.fallbackProvider = new FallbackMockProvider();
    if (this.hasApiKey) {
      console.log(`✓ Initialized Google Gemini Provider with model: ${model}`);
      this.primaryProvider = new GeminiProvider(apiKey, model);
    } else {
      console.log('ℹ GEMINI_API_KEY not configured. Running VisualMind 3D in Offline Demo Mode.');
      this.primaryProvider = this.fallbackProvider;
    }

    this.dbService = new DbService();
    this.extractionService = new ExtractionService();
  }

  isLiveAIConfigured(): boolean {
    return this.hasApiKey;
  }

  isDbConfigured(): boolean {
    return this.dbService.isSupabaseConfigured();
  }

  async getPresetLessons(): Promise<Lesson[]> {
    return Object.values(PRESET_LESSONS);
  }

  async createLessonFromTopic(topic: string, difficulty: Difficulty = 'beginner', language: string = 'English'): Promise<Lesson> {
    // 1. Check for immediate curated match for core supported domains
    const preset = matchPresetByTopic(topic, difficulty, language);
    if (preset && !process.env.FORCE_REMOTE_AI) {
      await this.dbService.saveLesson(preset);
      return preset;
    }

    let lesson: Lesson;
    try {
      lesson = await this.primaryProvider.generateLessonFromTopic(topic, difficulty, language);
    } catch (err) {
      console.warn('Primary AI provider failed or not configured, using fallback provider:', err);
      lesson = await this.fallbackProvider.generateLessonFromTopic(topic, difficulty, language);
    }

    await this.dbService.saveLesson(lesson);
    return lesson;
  }

  async createLessonFromNotes(
    buffer: Buffer,
    filename: string,
    mimeType: string,
    difficulty: Difficulty = 'beginner',
    language: string = 'English'
  ): Promise<{ lesson: Lesson; extractedTextSnippet: string; detectedTopic: string }> {
    const extraction = await this.extractionService.extractFromFile(buffer, filename, mimeType);

    let lesson: Lesson;
    try {
      lesson = await this.primaryProvider.generateLessonFromNotes(
        extraction.text,
        filename,
        difficulty,
        language
      );
    } catch (err) {
      console.warn('Primary AI notes generation failed, using fallback:', err);
      lesson = await this.fallbackProvider.generateLessonFromNotes(
        extraction.text,
        filename,
        difficulty,
        language
      );
    }

    await this.dbService.saveLesson(lesson);
    return {
      lesson,
      extractedTextSnippet: extraction.text.slice(0, 500),
      detectedTopic: extraction.detectedTopic,
    };
  }

  async createLessonFromPastedText(
    text: string,
    title: string = 'My Study Notes',
    difficulty: Difficulty = 'beginner',
    language: string = 'English'
  ): Promise<Lesson> {
    if (!text || text.trim().length < 10) {
      throw new Error('Pasted text must contain at least 10 characters.');
    }

    let lesson: Lesson;
    try {
      lesson = await this.primaryProvider.generateLessonFromNotes(text, title, difficulty, language);
    } catch (err) {
      console.warn('Using fallback generator for pasted text:', err);
      lesson = await this.fallbackProvider.generateLessonFromNotes(text, title, difficulty, language);
    }

    await this.dbService.saveLesson(lesson);
    return lesson;
  }

  async getLesson(id: string): Promise<Lesson | null> {
    return this.dbService.getLessonById(id);
  }

  async bookmarkLesson(lessonId: string, userId?: string | null): Promise<boolean> {
    return this.dbService.bookmarkLesson(lessonId, userId);
  }

  async getSavedLessons(userId?: string | null): Promise<Lesson[]> {
    return this.dbService.getSavedLessons(userId);
  }

  async answerTutorQuestion(context: TutorContext, userMessage: string): Promise<string> {
    try {
      return await this.primaryProvider.generateTutorResponse(context, userMessage);
    } catch (err) {
      console.warn('Tutor question generation error, falling back:', err);
      return await this.fallbackProvider.generateTutorResponse(context, userMessage);
    }
  }

  async evaluateQuiz(lessonId: string, userAnswers: number[]): Promise<QuizResult> {
    const lesson = await this.getLesson(lessonId);
    if (!lesson) {
      throw new Error(`Lesson with id "${lessonId}" not found.`);
    }

    const quiz = lesson.quiz;
    let correctCount = 0;

    const details = quiz.map((q, idx) => {
      const userChoice = userAnswers[idx] ?? -1;
      const isCorrect = userChoice === q.correctAnswerIndex;
      if (isCorrect) correctCount++;

      return {
        question: q.question,
        userAnswerIndex: userChoice,
        correctAnswerIndex: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const total = quiz.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    const result: QuizResult = {
      lessonId,
      score: correctCount,
      totalQuestions: total,
      percentage,
      details,
    };

    await this.dbService.recordQuizAttempt(result);
    return result;
  }

  async updateProgress(
    lessonId: string,
    completedSteps: string[],
    status: 'not_started' | 'in_progress' | 'completed',
    lastVisitedStepId?: string,
    userId?: string | null
  ) {
    return this.dbService.updateProgress(lessonId, completedSteps, status, lastVisitedStepId, userId);
  }

  async getProgress(userId?: string | null) {
    return this.dbService.getUserProgress(userId);
  }
}

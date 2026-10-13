import { Router, Request, Response } from 'express';
import { LessonService } from '../services/lessonService.js';

export function createSystemRouter(lessonService: LessonService): Router {
  const router = Router();

  router.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'VisualMind 3D API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  router.get('/status', (req: Request, res: Response) => {
    const isLiveAI = lessonService.isLiveAIConfigured();
    const isDb = lessonService.isDbConfigured();

    res.json({
      liveAI: isLiveAI,
      aiProvider: isLiveAI ? 'Google Gemini' : 'Demo / Built-in High-Fidelity Generator',
      geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      database: isDb ? 'Supabase PostgreSQL' : 'Local In-Memory Guest Persistence',
      demoModeActive: !isLiveAI,
      missingEnvVars: [
        ...(!isLiveAI ? ['GEMINI_API_KEY'] : []),
        ...(!isDb ? ['SUPABASE_URL', 'SUPABASE_ANON_KEY'] : []),
      ],
      notice: !isLiveAI 
        ? 'Running in Demo Mode. Rich interactive 3D lessons, quizzes, AI tutor explanations, and presets work out-of-the-box! Configure GEMINI_API_KEY in .env for custom live LLM generation.'
        : 'Google Gemini AI and Supabase are active.',
    });
  });

  return router;
}

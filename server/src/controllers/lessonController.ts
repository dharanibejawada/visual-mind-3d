import { Request, Response, NextFunction } from 'express';
import { LessonService } from '../services/lessonService.js';
import { CreateFromTopicInputSchema } from '../schemas/lessonSchema.js';

export class LessonController {
  constructor(private lessonService: LessonService) {}

  getPresets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const presets = await this.lessonService.getPresetLessons();
      res.json(presets);
    } catch (err) {
      next(err);
    }
  };

  createFromTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = CreateFromTopicInputSchema.parse(req.body);
      const lesson = await this.lessonService.createLessonFromTopic(
        validated.topic,
        validated.difficulty,
        validated.language
      );
      res.status(201).json(lesson);
    } catch (err) {
      next(err);
    }
  };

  createFromNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const difficulty = (req.body.difficulty || 'beginner') as any;
      const language = (req.body.language || 'English') as string;
      const pastedText = req.body.pastedText as string | undefined;

      // Check if file uploaded or pasted text provided
      if (req.file) {
        const result = await this.lessonService.createLessonFromNotes(
          req.file.buffer,
          req.file.originalname,
          req.file.mimetype,
          difficulty,
          language
        );
        return res.status(201).json(result);
      } else if (pastedText && pastedText.trim().length >= 10) {
        const lesson = await this.lessonService.createLessonFromPastedText(
          pastedText,
          req.body.title || 'My Study Notes',
          difficulty,
          language
        );
        return res.status(201).json({
          lesson,
          extractedTextSnippet: pastedText.slice(0, 300),
          detectedTopic: lesson.title,
        });
      } else {
        return res.status(400).json({
          error: 'MissingContent',
          message: 'Please either upload a valid study document (PDF, DOCX, TXT, image) or paste text notes.',
        });
      }
    } catch (err) {
      next(err);
    }
  };

  getLessonById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lessonId } = req.params;
      const lesson = await this.lessonService.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({
          error: 'NotFound',
          message: `Lesson with id "${lessonId}" was not found.`,
        });
      }
      res.json(lesson);
    } catch (err) {
      next(err);
    }
  };

  bookmarkLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lessonId } = req.params;
      const userId = (req.headers['x-user-id'] as string) || null;
      const success = await this.lessonService.bookmarkLesson(lessonId, userId);
      if (!success) {
        return res.status(404).json({ error: 'NotFound', message: 'Lesson not found' });
      }
      res.json({ success: true, message: 'Lesson saved successfully.' });
    } catch (err) {
      next(err);
    }
  };

  getSavedLessons = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req.headers['x-user-id'] as string) || null;
      const lessons = await this.lessonService.getSavedLessons(userId);
      res.json(lessons);
    } catch (err) {
      next(err);
    }
  };

  updateProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lessonId } = req.params;
      const { completedSteps, completionStatus, lastVisitedStepId } = req.body;
      const userId = (req.headers['x-user-id'] as string) || null;

      const record = await this.lessonService.updateProgress(
        lessonId,
        completedSteps || [],
        completionStatus || 'in_progress',
        lastVisitedStepId,
        userId
      );
      res.json(record);
    } catch (err) {
      next(err);
    }
  };

  getProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req.headers['x-user-id'] as string) || null;
      const progress = await this.lessonService.getProgress(userId);
      res.json(progress);
    } catch (err) {
      next(err);
    }
  };
}

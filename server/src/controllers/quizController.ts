import { Request, Response, NextFunction } from 'express';
import { LessonService } from '../services/lessonService.js';
import { QuizSubmitInputSchema } from '../schemas/lessonSchema.js';

export class QuizController {
  constructor(private lessonService: LessonService) {}

  submit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = QuizSubmitInputSchema.parse(req.body);
      const result = await this.lessonService.evaluateQuiz(
        validated.lessonId,
        validated.answers
      );

      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  getQuizForLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lessonId } = req.params;
      const lesson = await this.lessonService.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ error: 'NotFound', message: 'Lesson not found' });
      }
      res.json({
        lessonId,
        title: lesson.title,
        quiz: lesson.quiz,
      });
    } catch (err) {
      next(err);
    }
  };
}

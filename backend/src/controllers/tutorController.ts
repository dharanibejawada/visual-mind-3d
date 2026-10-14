import { Request, Response, NextFunction } from 'express';
import { LessonService } from '../services/lessonService.js';
import { TutorChatInputSchema } from '../schemas/lessonSchema.js';

export class TutorController {
  constructor(private lessonService: LessonService) {}

  chat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = TutorChatInputSchema.parse(req.body);
      const answer = await this.lessonService.answerTutorQuestion(
        {
          topic: validated.topic,
          lessonTitle: validated.lessonTitle,
          currentStepId: validated.currentStepId,
          selectedComponentId: validated.selectedComponentId,
          difficulty: validated.difficulty,
          language: validated.language,
          recentMessages: validated.conversationHistory,
        },
        validated.message
      );

      res.json({
        reply: answer,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };
}

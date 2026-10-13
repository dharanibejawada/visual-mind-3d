import { Router } from 'express';
import { QuizController } from '../controllers/quizController.js';

export function createQuizRouter(controller: QuizController): Router {
  const router = Router();
  router.post('/submit', controller.submit);
  router.get('/lessons/:lessonId/quiz', controller.getQuizForLesson);
  return router;
}

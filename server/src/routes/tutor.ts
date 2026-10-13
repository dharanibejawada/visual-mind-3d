import { Router } from 'express';
import { TutorController } from '../controllers/tutorController.js';

export function createTutorRouter(controller: TutorController): Router {
  const router = Router();
  router.post('/chat', controller.chat);
  return router;
}

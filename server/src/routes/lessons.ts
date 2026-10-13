import { Router } from 'express';
import multer from 'multer';
import { LessonController } from '../controllers/lessonController.js';

// Configure multer memory storage with 20MB limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];
    if (allowed.includes(file.mimetype) || file.originalname.match(/\.(pdf|docx|txt|md|png|jpe?g)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload PDF, DOCX, TXT, or image files.'));
    }
  },
});

export function createLessonRouter(controller: LessonController): Router {
  const router = Router();

  router.get('/presets', controller.getPresets);
  router.post('/from-topic', controller.createFromTopic);
  router.post('/from-notes', upload.single('file'), controller.createFromNotes);
  router.get('/', controller.getSavedLessons);
  router.get('/:lessonId', controller.getLessonById);
  router.post('/:lessonId/save', controller.bookmarkLesson);
  router.post('/:lessonId/progress', controller.updateProgress);

  return router;
}

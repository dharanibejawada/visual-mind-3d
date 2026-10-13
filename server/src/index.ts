import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Load environment variables from workspace root or current directory
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config();

import { LessonService } from './services/lessonService.js';
import { LessonController } from './controllers/lessonController.js';
import { TutorController } from './controllers/tutorController.js';
import { QuizController } from './controllers/quizController.js';
import { createLessonRouter } from './routes/lessons.js';
import { createTutorRouter } from './routes/tutor.js';
import { createQuizRouter } from './routes/quiz.js';
import { createSystemRouter } from './routes/system.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Id'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiter for expensive AI endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'RateLimitExceeded',
    message: 'Too many requests created from this IP, please try again after 15 minutes.',
  },
});

app.use('/api/', apiLimiter);

// Service & Controller Instances
const lessonService = new LessonService();
const lessonController = new LessonController(lessonService);
const tutorController = new TutorController(lessonService);
const quizController = new QuizController(lessonService);

// Mount API Routes
app.use('/api/lessons', createLessonRouter(lessonController));
app.use('/api/tutor', createTutorRouter(tutorController));
app.use('/api/quiz', createQuizRouter(quizController));
app.use('/api/system', createSystemRouter(lessonService));

// Progress Route
app.get('/api/progress', lessonController.getProgress);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    app: 'VisualMind 3D Backend API',
    status: 'Running',
    docs: '/api/system/status',
  });
});

// Centralized Error Handling
app.use(errorHandler);

// Start Server if not imported by tests
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 VisualMind 3D Backend running at http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/system/health`);
    console.log(`   Status check: http://localhost:${PORT}/api/system/status`);
    console.log(`=======================================================`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use.`);
      console.error(`   To resolve, kill the conflicting process or change PORT in .env (e.g. PORT=5002).`);
      process.exit(1);
    } else {
      console.error(`❌ Server error:`, err);
      process.exit(1);
    }
  });

  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

export default app;

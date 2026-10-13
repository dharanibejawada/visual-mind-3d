export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type SourceType = 'topic' | 'notes' | 'preset';

export interface VisualizationStep {
  id: string;
  title: string;
  explanation: string;
  highlightIds: string[];
  cameraPreset?: 'front' | 'top' | 'close-up' | 'isometric' | 'side' | string;
  playbackSpeed?: number;
}

export interface InteractiveElement {
  id: string;
  label: string;
  description: string;
  color?: string;
}

export interface VisualizationSpec {
  templateId: string;
  title: string;
  description: string;
  parameters: Record<string, any>;
  steps: VisualizationStep[];
  interactiveElements?: InteractiveElement[];
}

export interface LessonSection {
  heading: string;
  explanation: string;
  keyPoints: string[];
  example: string;
  visualizationStepIds: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface RevisionMaterial {
  keyDefinitions: Array<{ term: string; definition: string }>;
  commonMistakes: string[];
  flashcards: Flashcard[];
  summaryPoints: string[];
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  difficulty: Difficulty;
  language: string;
  learningObjectives: string[];
  summary: string;
  sections: LessonSection[];
  visualization: VisualizationSpec;
  keyTakeaways: string[];
  quiz: QuizQuestion[];
  revision?: RevisionMaterial;
  sourceType: SourceType;
  sourceFilename?: string;
  extractedSnippet?: string;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QuizResult {
  lessonId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  details: Array<{
    question: string;
    userAnswerIndex: number;
    correctAnswerIndex: number;
    isCorrect: boolean;
    explanation: string;
  }>;
}

export interface SystemStatus {
  liveAI: boolean;
  aiProvider: string;
  geminiModel: string;
  database: string;
  demoModeActive: boolean;
  missingEnvVars: string[];
  notice: string;
}

export interface UserProgress {
  completedLessonsCount: number;
  totalQuizAttempts: number;
  averageScore: number;
  progressList: Array<{
    lessonId: string;
    completedSteps: string[];
    completionStatus: 'not_started' | 'in_progress' | 'completed';
    lastVisitedStepId?: string;
    updatedAt: string;
  }>;
}

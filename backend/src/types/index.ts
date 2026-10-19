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

export interface SceneObject3D {
  id: string;
  name: string;
  geometry:
    | 'box'
    | 'sphere'
    | 'cylinder'
    | 'cone'
    | 'torus'
    | 'capsule'
    | 'ring'
    | 'plane'
    | 'arrow'
    | 'wedge'
    | 'gear'
    | 'tube'
    | 'text';
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  dimensions?: number[];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  roughness?: number;
  metalness?: number;
  opacity?: number;
  wireframe?: boolean;
  label?: string;
  description?: string;
  animation?: {
    type: 'rotate' | 'oscillate' | 'pulse' | 'orbit' | 'float' | 'flow' | 'piston';
    axis?: 'x' | 'y' | 'z';
    speed?: number;
    amplitude?: number;
    frequency?: number;
  };
}

export interface SceneConnection3D {
  id: string;
  fromId: string;
  toId: string;
  type: 'arrow' | 'tube' | 'dashed_line' | 'particle_flow' | 'spring' | 'bracket';
  label?: string;
  color?: string;
  animatedFlow?: boolean;
}

export interface Universal3DScene {
  category:
    | 'mechanical'
    | 'biological'
    | 'astronomical'
    | 'chemical_molecular'
    | 'geometric_math'
    | 'physics_field'
    | 'environmental_terrain'
    | 'historical_spatial'
    | 'economic_system'
    | 'computer_science'
    | 'conceptual_system';
  topic: string;
  metaphor: string;
  cameraPreset?: [number, number, number];
  targetPreset?: [number, number, number];
  environmentLighting?: 'studio' | 'sunset' | 'night' | 'dawn' | 'space' | 'laboratory' | 'outdoor';
  groundPlane?: {
    show: boolean;
    type?: 'grid' | 'terrain' | 'circular_shadow' | 'water' | 'checkerboard';
    color?: string;
  };
  objects: SceneObject3D[];
  connections?: SceneConnection3D[];
}

export interface VisualizationSpec {
  templateId: string;
  title: string;
  description: string;
  parameters: Record<string, any>;
  scene?: Universal3DScene;
  steps: VisualizationStep[];
  interactiveElements?: Array<{
    id: string;
    label: string;
    description: string;
    color?: string;
  }>;
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

export interface QuizSubmission {
  lessonId: string;
  answers: number[]; // index of chosen answers
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

export interface TutorContext {
  topic: string;
  lessonTitle: string;
  currentStepId?: string;
  selectedComponentId?: string;
  difficulty: Difficulty;
  language: string;
  recentMessages?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

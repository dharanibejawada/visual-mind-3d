import { z } from 'zod';

export const SupportedTemplates = [
  'universal-3d',
  'butterfly',
  'animal-biology',
  'animal',
  'snake',
  'human-heart',
  'solar-system',
  'atom',
  'dna',
  'photosynthesis',
  'electric-circuit',
  'linked-list',
  'wave',
  'black-hole',
  'coordinate-geometry',
  'cell',
  'sorting-algorithm',
  'interactive-diagram',
] as const;

export const DifficultySchema = z.enum(['beginner', 'intermediate', 'advanced']);

export const SceneObjectAnimationSchema = z.object({
  type: z.enum(['rotate', 'oscillate', 'pulse', 'orbit', 'float', 'flow', 'piston']).default('float'),
  axis: z.enum(['x', 'y', 'z']).default('y'),
  speed: z.number().default(1),
  amplitude: z.number().optional(),
  frequency: z.number().optional(),
});

export const SceneObjectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  geometry: z.enum([
    'box',
    'sphere',
    'cylinder',
    'cone',
    'torus',
    'capsule',
    'ring',
    'plane',
    'arrow',
    'wedge',
    'gear',
    'tube',
    'text',
  ]).default('box'),
  position: z.tuple([z.number(), z.number(), z.number()]).default([0, 0, 0]),
  rotation: z.tuple([z.number(), z.number(), z.number()]).optional(),
  scale: z.tuple([z.number(), z.number(), z.number()]).optional(),
  dimensions: z.array(z.number()).optional(),
  color: z.string().default('#38bdf8'),
  emissive: z.string().optional(),
  emissiveIntensity: z.number().optional(),
  roughness: z.number().min(0).max(1).optional(),
  metalness: z.number().min(0).max(1).optional(),
  opacity: z.number().min(0).max(1).optional(),
  wireframe: z.boolean().optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  animation: SceneObjectAnimationSchema.optional(),
});

export const SceneConnectionSchema = z.object({
  id: z.string().min(1),
  fromId: z.string().min(1),
  toId: z.string().min(1),
  type: z.enum(['arrow', 'tube', 'dashed_line', 'particle_flow', 'spring', 'bracket']).default('arrow'),
  label: z.string().optional(),
  color: z.string().default('#38bdf8'),
  animatedFlow: z.boolean().default(true),
});

export const Universal3DSceneSchema = z.object({
  category: z.enum([
    'mechanical',
    'biological',
    'astronomical',
    'chemical_molecular',
    'geometric_math',
    'physics_field',
    'environmental_terrain',
    'historical_spatial',
    'economic_system',
    'computer_science',
    'conceptual_system',
  ]).default('conceptual_system'),
  topic: z.string().min(1),
  metaphor: z.string().default(''),
  cameraPreset: z.tuple([z.number(), z.number(), z.number()]).default([0, 2, 7]),
  targetPreset: z.tuple([z.number(), z.number(), z.number()]).default([0, 0, 0]),
  environmentLighting: z.enum(['studio', 'sunset', 'night', 'dawn', 'space', 'laboratory', 'outdoor']).default('studio'),
  groundPlane: z.object({
    show: z.boolean().default(true),
    type: z.enum(['grid', 'terrain', 'circular_shadow', 'water', 'checkerboard']).default('circular_shadow'),
    color: z.string().default('#0f172a'),
  }).default({ show: true, type: 'circular_shadow', color: '#0f172a' }),
  objects: z.array(SceneObjectSchema).min(1),
  connections: z.array(SceneConnectionSchema).default([]),
});

export const VisualizationStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  explanation: z.string().min(1),
  highlightIds: z.array(z.string()).default([]),
  cameraPreset: z.string().optional(),
  playbackSpeed: z.number().min(0.1).max(5).optional(),
});

export const InteractiveElementSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
  color: z.string().optional(),
});

export const VisualizationSpecSchema = z.object({
  templateId: z.enum(SupportedTemplates).or(z.string()),
  title: z.string().min(1),
  description: z.string().min(1),
  parameters: z.record(z.any()).default({}),
  scene: Universal3DSceneSchema.optional(),
  steps: z.array(VisualizationStepSchema).min(1),
  interactiveElements: z.array(InteractiveElementSchema).optional(),
});

export const LessonSectionSchema = z.object({
  heading: z.string().min(1),
  explanation: z.string().min(1),
  keyPoints: z.array(z.string()).min(1),
  example: z.string().default(''),
  visualizationStepIds: z.array(z.string()).default([]),
});

export const QuizQuestionSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string()).min(2),
  correctAnswerIndex: z.number().int().min(0),
  explanation: z.string().min(1),
});

export const FlashcardSchema = z.object({
  front: z.string().min(1),
  back: z.string().min(1),
});

export const RevisionMaterialSchema = z.object({
  keyDefinitions: z.array(z.object({
    term: z.string(),
    definition: z.string()
  })).default([]),
  commonMistakes: z.array(z.string()).default([]),
  flashcards: z.array(FlashcardSchema).default([]),
  summaryPoints: z.array(z.string()).default([]),
});

export const LessonSchema = z.object({
  title: z.string().min(1),
  subject: z.string().min(1),
  difficulty: DifficultySchema,
  language: z.string().default('English'),
  learningObjectives: z.array(z.string()).min(1),
  summary: z.string().min(1),
  sections: z.array(LessonSectionSchema).min(1),
  visualization: VisualizationSpecSchema,
  keyTakeaways: z.array(z.string()).min(1),
  quiz: z.array(QuizQuestionSchema).min(1),
  revision: RevisionMaterialSchema.optional(),
});

export const CreateFromTopicInputSchema = z.object({
  topic: z.string().trim().min(2, 'Topic must be at least 2 characters long').max(300),
  difficulty: DifficultySchema.default('beginner'),
  language: z.string().default('English'),
});

export const TutorChatInputSchema = z.object({
  message: z.string().trim().min(1, 'Message cannot be empty'),
  topic: z.string().min(1),
  lessonTitle: z.string().min(1),
  currentStepId: z.string().optional(),
  selectedComponentId: z.string().optional(),
  difficulty: DifficultySchema.default('beginner'),
  language: z.string().default('English'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
});

export const QuizSubmitInputSchema = z.object({
  lessonId: z.string().min(1),
  answers: z.array(z.number().int().min(0)),
});

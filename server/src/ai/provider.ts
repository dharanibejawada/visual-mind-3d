import { GoogleGenerativeAI } from '@google/generative-ai';
import { Lesson, Difficulty, TutorContext, QuizQuestion, Flashcard } from '../types/index.js';
import { LessonSchema, SupportedTemplates } from '../schemas/lessonSchema.js';
import { v4 as uuidv4 } from 'uuid';
import { PRESET_LESSONS, matchPresetByTopic, createDynamicLesson } from './presets.js';

export interface AIProvider {
  generateLessonFromTopic(topic: string, difficulty: Difficulty, language: string): Promise<Lesson>;
  generateLessonFromNotes(extractedText: string, filename: string, difficulty: Difficulty, language: string): Promise<Lesson>;
  generateTutorResponse(context: TutorContext, userMessage: string): Promise<string>;
  generateQuiz(lesson: Lesson): Promise<QuizQuestion[]>;
}

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI | null = null;
  private modelName: string;

  constructor(apiKey?: string, modelName: string = 'gemini-2.5-flash') {
    this.modelName = modelName;
    if (apiKey && apiKey.trim().length > 0 && apiKey !== 'your_gemini_api_key_here') {
      this.genAI = new GoogleGenerativeAI(apiKey.trim());
    }
  }

  isConfigured(): boolean {
    return this.genAI !== null;
  }

  async generateLessonFromTopic(topic: string, difficulty: Difficulty, language: string): Promise<Lesson> {
    if (!this.genAI) {
      throw new Error('Gemini API key is not configured. Falling back to Demo mode.');
    }

    const prompt = `You are VisualMind 3D, an expert educational AI tutor.
Generate a comprehensive, scientifically accurate educational lesson with an interactive visual specification for the following topic:
Topic: "${topic}"
Target Audience Difficulty: "${difficulty}" (beginner: intuitive analogies & everyday terms; intermediate: technical depth & reasoning; advanced: formal mathematics, rigorous mechanisms, edge cases)
Language: "${language}"

Supported visualization templates:
${SupportedTemplates.map(t => `- "${t}"`).join('\n')}

MANDATORY TEMPLATE SELECTION RULES:
1. Animal or Zoology topics (e.g. Tiger, Lion, Predator, Anatomy of organism, Wildlife) -> MUST use "animal-biology".
2. Cardiovascular or Heart topics (e.g. Human Heart, Blood Circulation, Ventricles) -> MUST use "human-heart".
3. Astronomy or Planetary topics (e.g. Solar System, Orbits, Planets) -> MUST use "solar-system".
4. Black holes or Relativity -> MUST use "black-hole".
5. Atomic structure or Chemistry (e.g. Atom, Electrons, Molecules) -> MUST use "atom".
6. Genetics or DNA -> MUST use "dna".
7. Plant biology or Photosynthesis -> MUST use "photosynthesis".
8. Circuits or Ohm's Law -> MUST use "electric-circuit".
9. Waves or Oscillations -> MUST use "wave".
10. Computer Science / Data Structures (ONLY if the topic specifically asks for linked lists or pointer structures) -> "linked-list".
11. If no specialized 3D template matches the domain, use "interactive-diagram".

CRITICAL: NEVER select "linked-list" or generate C++ code for an unrelated topic such as an animal, anatomy, chemistry, or physics!

You MUST return ONLY valid raw JSON matching this schema with NO Markdown backticks and NO introductory text:
{
  "title": "Clear educational title",
  "subject": "e.g. Biology, Zoology, Physics, Chemistry, Astronomy, Computer Science, Mathematics",
  "difficulty": "${difficulty}",
  "language": "${language}",
  "learningObjectives": ["3-5 clear bullet points"],
  "summary": "2-3 sentence clear conceptual summary",
  "sections": [
    {
      "heading": "Section title",
      "explanation": "Engaging, thorough educational explanation",
      "keyPoints": ["Bullet 1", "Bullet 2"],
      "example": "Relatable real-world analogy or example",
      "visualizationStepIds": ["step-1"]
    }
  ],
  "visualization": {
    "templateId": "one of the supported template IDs",
    "title": "Visualization title",
    "description": "What is shown in the visual scene",
    "parameters": {},
    "steps": [
      {
        "id": "step-1",
        "title": "Step 1 Title",
        "explanation": "What to observe in this step",
        "highlightIds": ["component-id"],
        "cameraPreset": "front"
      }
    ],
    "interactiveElements": [
      {
        "id": "component-id",
        "label": "Component Label",
        "description": "Component function and explanation",
        "color": "#06b6d4"
      }
    ]
  },
  "keyTakeaways": ["3-5 concise summary takeaways"],
  "quiz": [
    {
      "question": "Clear conceptual question testing understanding",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0,
      "explanation": "Explanation of why this answer is correct"
    }
  ],
  "revision": {
    "keyDefinitions": [
      { "term": "Term", "definition": "Clear concise definition" }
    ],
    "commonMistakes": ["Common misconceptions students make"],
    "flashcards": [
      { "front": "Concept Question", "back": "Clear Answer" }
    ],
    "summaryPoints": ["Bullet points for quick revision before exam"]
  }
}`;

    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        }
      });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const cleaned = cleanJsonString(responseText);
      const parsed = JSON.parse(cleaned);

      const validated = LessonSchema.parse(parsed);

      // Centralized subject and visualization sanitizer
      const resolved = resolveSubjectAndVisualization(topic, validated.subject, validated.visualization.templateId);
      validated.visualization.templateId = resolved.templateId;
      if (resolved.subject) {
        validated.subject = resolved.subject;
      }

      return {
        ...validated,
        id: uuidv4(),
        sourceType: 'topic',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (err) {
      console.warn('Gemini topic generation or validation encountered an error, activating resilient generator:', err);
      const preset = matchPresetByTopic(topic, difficulty, language);
      if (preset) return preset;
      return createDynamicLesson(topic, difficulty, language, 'topic');
    }
  }

  async generateLessonFromNotes(extractedText: string, filename: string, difficulty: Difficulty, language: string): Promise<Lesson> {
    if (!this.genAI) {
      throw new Error('Gemini API key is not configured.');
    }

    const truncatedText = extractedText.slice(0, 15000);
    const prompt = `You are VisualMind 3D, an expert educational AI tutor.
Analyze the student's uploaded study material from file "${filename}":

STUDENT NOTES EXTRACT:
"""
${truncatedText}
"""

Generate a structured lesson that organizes their notes into an intuitive 3D learning experience.
Difficulty: "${difficulty}"
Language: "${language}"

Supported 3D visualization templates:
${SupportedTemplates.map(t => `- "${t}"`).join('\n')}

Rules:
1. Prioritize and preserve key definitions, formulas, and terminology from the student's notes.
2. Select the most appropriate 3D/interactive template from the list.
3. NEVER pick "linked-list" unless the uploaded material is specifically about computer science data structures.
4. Return ONLY valid JSON adhering strictly to the Lesson schema with learningObjectives, sections, visualization steps, interactiveElements, keyTakeaways, quiz (at least 4 questions), and revision materials.`;

    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        }
      });

      const result = await model.generateContent(prompt);
      const cleaned = cleanJsonString(result.response.text());
      const parsed = JSON.parse(cleaned);
      const validated = LessonSchema.parse(parsed);

      const resolved = resolveSubjectAndVisualization(filename, validated.subject, validated.visualization.templateId);
      validated.visualization.templateId = resolved.templateId;
      if (resolved.subject) {
        validated.subject = resolved.subject;
      }

      return {
        ...validated,
        id: uuidv4(),
        sourceType: 'notes',
        sourceFilename: filename,
        extractedSnippet: truncatedText.slice(0, 400),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (err) {
      console.warn('Gemini notes generation or validation encountered an error, falling back:', err);
      const preset = matchPresetByTopic(extractedText, difficulty, language);
      if (preset) {
        return {
          ...preset,
          id: uuidv4(),
          sourceType: 'notes',
          sourceFilename: filename,
          extractedSnippet: extractedText.slice(0, 300) + '...',
        };
      }
      const dynamic = createDynamicLesson(
        filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        difficulty,
        language,
        'notes',
        extractedText
      );
      dynamic.sourceFilename = filename;
      dynamic.extractedSnippet = extractedText.slice(0, 400);
      return dynamic;
    }
  }

  async generateTutorResponse(context: TutorContext, userMessage: string): Promise<string> {
    if (!this.genAI) {
      throw new Error('Gemini API key is not configured.');
    }

    const prompt = `You are VisualMind 3D's interactive AI Tutor.
Context:
- Current Topic: "${context.topic}"
- Lesson Title: "${context.lessonTitle}"
- Learning Level: "${context.difficulty}"
- Preferred Language: "${context.language}"
- Selected 3D Component: "${context.selectedComponentId || 'None selected'}"
- Active Animation Step: "${context.currentStepId || 'General'}"

Student's Request: "${userMessage}"

Guidelines:
- Keep the tone encouraging, educational, and crystal clear.
- If they ask "Explain in Telugu", explain warmly in Telugu with English technical terms in parentheses.
- If they ask "Simplify", provide a tangible real-life analogy.
- If they ask "Exam Answer", provide bullet points formatted for maximum exam marks with keywords highlighted.
- Connect your explanation directly to the visual element being viewed.`;

    const model = this.genAI.getGenerativeModel({ model: this.modelName });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async generateQuiz(lesson: Lesson): Promise<QuizQuestion[]> {
    if (!this.genAI) {
      return lesson.quiz;
    }

    const prompt = `Generate 5 fresh multiple-choice quiz questions based on the lesson "${lesson.title}" (${lesson.subject}).
Difficulty: ${lesson.difficulty}.
Return ONLY valid JSON array of objects:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctAnswerIndex": 0,
    "explanation": "..."
  }
]`;

    const model = this.genAI.getGenerativeModel({
      model: this.modelName,
      generationConfig: { responseMimeType: 'application/json' }
    });

    const result = await model.generateContent(prompt);
    const cleaned = cleanJsonString(result.response.text());
    return JSON.parse(cleaned);
  }
}

export class FallbackMockProvider implements AIProvider {
  async generateLessonFromTopic(topic: string, difficulty: Difficulty, language: string): Promise<Lesson> {
    // 1. Try matching with rich built-in presets
    const preset = matchPresetByTopic(topic, difficulty, language);
    if (preset) {
      return preset;
    }

    // 2. Otherwise generate dynamic procedural educational lesson
    return createDynamicLesson(topic, difficulty, language, 'topic');
  }

  async generateLessonFromNotes(extractedText: string, filename: string, difficulty: Difficulty, language: string): Promise<Lesson> {
    // Analyze extracted text keywords to match template
    const preset = matchPresetByTopic(extractedText, difficulty, language);
    if (preset) {
      return {
        ...preset,
        id: uuidv4(),
        sourceType: 'notes',
        sourceFilename: filename,
        extractedSnippet: extractedText.slice(0, 300) + '...',
      };
    }

    // Create customized lesson from notes
    const dynamic = createDynamicLesson(
      filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      difficulty,
      language,
      'notes',
      extractedText
    );
    dynamic.sourceFilename = filename;
    dynamic.extractedSnippet = extractedText.slice(0, 400);
    return dynamic;
  }

  async generateTutorResponse(context: TutorContext, userMessage: string): Promise<string> {
    const msg = userMessage.toLowerCase();
    const comp = context.selectedComponentId;

    if (msg.includes('telugu') || context.language.toLowerCase() === 'telugu') {
      return `VisualMind 3D ట్యూటర్ సమాధానం:
"${context.topic}" గురించి సులభమైన వివరణ:
ఈ కాన్సెప్ట్ అర్థం చేసుకోవడానికి ఒక ఉదాహరణ: మన శరీరంలో గుండె రక్తాన్ని నిరంతరం పంప్ చేసినట్లే, ఈ వ్యవస్థ క్రమపద్ధతిలో పనిచేస్తుంది.
${comp ? `మీరు ఎంచుకున్న భాగం (${comp}) ముఖ్యమైన పాత్ర పోషిస్తుంది.` : ''}
పరీక్షలో రాయడానికి ముఖ్యమైన అంశాలు గుర్తుంచుకోండి:
1. ప్రాథమిక భావనను స్పష్టంగా వివరించండి.
2. రేఖాచిత్రం (Diagram) వేసి లేబుల్ చేయండి.
3. ఉదాహరణలతో ముగించండి.`;
    }

    if (msg.includes('simplify') || msg.includes('simpler')) {
      return `Here is the simplest way to think about **${context.topic}**:
Imagine a busy city with traffic lights and courier trucks. 
Everything here has a specific job:
${comp ? `• **${comp}** works like the central engine or intersection directing the entire flow.` : '• Energy or signals enter from one side, get processed systematically, and produce the intended output on the other.'}
Instead of memorizing definitions, just remember: Input ➔ Transformation ➔ Output.`;
    }

    if (msg.includes('example') || msg.includes('real-life')) {
      return `**Real-Life Analogy for ${context.topic}:**
Think about your home plumbing or a highway delivery network!
Water flows under pressure through valves and pipes. When a valve opens, pressure directs the fluid to exactly where it's needed without backflow.
Similarly, in this system${comp ? ` (specifically at **${comp}**)` : ''}, controlled channels prevent disruption and keep everything functioning smoothly.`;
    }

    if (msg.includes('exam') || msg.includes('marks')) {
      return `**High-Yield Exam Answer (5 Marks Template):**
1. **Definition:** Define ${context.topic} concisely focusing on primary function and mechanism.
2. **Key Components:**
   - Mention the primary structural elements${comp ? ` (highlighting **${comp}**)` : ''}.
   - State the function of each element in one bullet point.
3. **Working Principle:** Explain the step-by-step cycle/process in 3 ordered steps.
4. **Significance:** Why this mechanism is critical (e.g. homeostasis, computational efficiency, energy conservation).`;
    }

    if (msg.includes('step')) {
      return `**Step-by-Step Breakdown:**
1. **Initiation:** The system receives the triggering stimulus or starting input.
2. **Action Phase:** The primary components interact (${comp || 'active components'} undergo physical or chemical state changes).
3. **Completion:** The output or cycle resets back to resting state ready for the next iteration.`;
    }

    return `Great question! In **${context.topic}**, ${comp ? `the **${comp}** component` : 'each element'} works cooperatively to ensure efficiency and stability.
Try clicking on the 3D visual labels and stepping through the animation controls at the bottom to see how the state changes in real time. Would you like me to give you a real-world example or simplify any specific part?`;
  }

  async generateQuiz(lesson: Lesson): Promise<QuizQuestion[]> {
    return lesson.quiz;
  }
}

function cleanJsonString(str: string): string {
  let cleaned = str.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

export function resolveSubjectAndVisualization(
  topic: string,
  aiSubject?: string,
  suggestedTemplate?: string
): { templateId: string; subject: string } {
  const q = (topic || '').toLowerCase();
  const s = (aiSubject || '').toLowerCase();

  // 1. Strict Computer Science / Linked List Check (Must have explicit CS context)
  const isExplicitCS =
    /\b(linked[ -]?lists?|singly linked|doubly linked|linkedlist)\b/i.test(q) ||
    (/\b(data structure|c\+\+|pointers?|heap memory|algorithm)\b/i.test(q) && /\blists?\b/i.test(q));
  
  if (isExplicitCS) {
    return {
      templateId: 'linked-list',
      subject: 'Computer Science & Data Structures'
    };
  }

  // 2. Animal / Zoology / Predator / Wildlife (Tiger, Lion, Panthera, organism anatomy)
  const isAnimal =
    /\b(tigers?|panthera|lions?|cheetahs?|leopards?|cats?|dogs?|wolves?|wolf|bears?|elephants?|predators?|animals?|fauna|mammals?|wildlife|carnivores?|herbivores?|birds?|reptiles?|amphibians?|fishes?|sharks?|whales?|zoology|species|prey)\b/i.test(q) ||
    s.includes('zoology') || (s.includes('animal') && !s.includes('computer'));
  if (isAnimal) {
    return {
      templateId: 'animal-biology',
      subject: 'Zoology & Animal Biology'
    };
  }

  // 3. Human Cardiovascular / Heart
  const isCardio =
    /\b(hearts?|cardiac|cardiovascular|blood|ventricles?|atrium|atria|artery|arteries|veins?|circulation|pulse)\b/i.test(q) ||
    s.includes('cardio') || s.includes('anatomy');
  if (isCardio) {
    return {
      templateId: 'human-heart',
      subject: 'Human Biology & Anatomy'
    };
  }

  // 4. Plant Biology / Photosynthesis
  const isPlant =
    /\b(photosynthesis|chloroplasts?|chlorophyll|thylakoids?|plants?|leaf|leaves|botany|calvin cycle)\b/i.test(q) ||
    s.includes('botany');
  if (isPlant) {
    return {
      templateId: 'photosynthesis',
      subject: 'Plant Biology & Botany'
    };
  }

  // 5. Genetics / DNA
  const isDna =
    /\b(dna|double helix|genetics?|chromosomes?|nucleotides?|genes?|mutation|rna)\b/i.test(q) ||
    s.includes('genetics');
  if (isDna) {
    return {
      templateId: 'dna',
      subject: 'Genetics & Molecular Biology'
    };
  }

  // 6. Cell Biology
  const isCell =
    (/\b(cells?|cell membrane|mitochondria|cytoplasm|organelles?)\b/i.test(q) && !s.includes('phone')) ||
    s.includes('cytology');
  if (isCell) {
    return {
      templateId: 'cell',
      subject: 'Cell Biology'
    };
  }

  // 7. Astrophysics / Black Hole
  const isBlackHole =
    /\b(black[ -]holes?|singularity|event horizon|accretion disk|relativity|schwarzschild)\b/i.test(q);
  if (isBlackHole) {
    return {
      templateId: 'black-hole',
      subject: 'Astrophysics & Relativity'
    };
  }

  // 8. Astronomy / Solar System / Orbits
  const isAstro =
    /\b(solar[ -]system|planets?|planetary|orbits?|galaxy|galaxies|spaces?|astronomy|cosmos|jupiter|mars|saturn|earth|sun|kepler)\b/i.test(q) ||
    s.includes('astronomy');
  if (isAstro) {
    return {
      templateId: 'solar-system',
      subject: 'Astronomy & Planetary Science'
    };
  }

  // 9. Chemistry / Atoms / Molecules
  const isAtomic =
    /\b(atoms?|atomic|electrons?|protons?|neutrons?|bohr|quantum|nucleus|orbitals?|molecules?|chemical|reactions?|bonds?)\b/i.test(q) ||
    s.includes('chemistry');
  if (isAtomic) {
    return {
      templateId: 'atom',
      subject: 'Chemistry & Atomic Physics'
    };
  }

  // 10. Physics / Electric Circuit
  const isCircuit =
    /\b(circuits?|electric|ohm'?s law|resistors?|voltages?|currents?|batteries?|electronics?)\b/i.test(q) ||
    s.includes('electrical');
  if (isCircuit) {
    return {
      templateId: 'electric-circuit',
      subject: 'Physics & Electrical Engineering'
    };
  }

  // 11. Physics / Waves
  const isWave =
    /\b(waves?|wave mechanics|oscillat\w+|frequency|wavelength|sound waves?|optics|amplitude)\b/i.test(q);
  if (isWave) {
    return {
      templateId: 'wave',
      subject: 'Physics & Wave Mechanics'
    };
  }

  // 12. Mathematics
  const isMath =
    /\b(math|mathematics|derivatives?|calculus|functions?|geometry|algebra|coordinates?|integrals?)\b/i.test(q) ||
    s.includes('mathematics');
  if (isMath) {
    return {
      templateId: 'coordinate-geometry',
      subject: 'Mathematics'
    };
  }

  // 13. Other Computer Science / Algorithms
  const isOtherCS =
    /\b(sort|sorting|quicksort|mergesort|algorithms?|stacks?|queues?|trees?|binary search|databases?)\b/i.test(q) ||
    s.includes('computer science');
  if (isOtherCS) {
    return {
      templateId: 'sorting-algorithm',
      subject: 'Computer Science & Algorithms'
    };
  }

  // 14. If suggestedTemplate is valid, ensure it is NOT linked-list for non-CS topics!
  if (suggestedTemplate && SupportedTemplates.includes(suggestedTemplate as any)) {
    if (suggestedTemplate === 'linked-list' && !isExplicitCS) {
      return {
        templateId: 'interactive-diagram',
        subject: aiSubject || 'General Science & Technology'
      };
    }
    return {
      templateId: suggestedTemplate,
      subject: aiSubject || 'General Science & Technology'
    };
  }

  // 15. Default Fallback
  return {
    templateId: 'interactive-diagram',
    subject: aiSubject || 'General Science & Technology'
  };
}

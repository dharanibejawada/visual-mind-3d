# VisualMind 3D - AI-Powered 3D Educational Learning Platform

> **"See It. Understand It. Remember It."**

VisualMind 3D is a full-stack educational web platform designed to transform difficult textbook concepts and study notes into interactive, intuitive 3D spatial models, structured lessons, real-time AI personal tutoring, and self-test quizzes.

---

## 🌟 Key Features

### 1. Two Primary Learning Modes
- **Explore Any Topic Without Notes:**
  - Type any scientific or technical topic in plain, everyday language (e.g., *"How the human heart pumps blood"*, *"Show how a black hole works"*, *"Teach me linked lists in C++"*).
  - Configurable learning levels: **Beginner** (intuitive analogies), **Intermediate** (technical mechanisms), and **Advanced** (rigorous mathematical & formal principles).
  - Multi-language explanation support: **English**, **Telugu (తెలుగు)**, **Hinglish**, **Spanish**, and **French**.
- **Learn from My Notes:**
  - Drag-and-drop or browse uploads supporting **PDF**, **Word (.docx)**, **Plain Text (.txt)**, and **Image Notes**.
  - Direct paste text alternative with live character & word metrics.
  - Automatic key concept detection and dynamic 3D model mapping.

### 2. Intelligent 3D Visualization Registry
Built with **Three.js** and **React Three Fiber (R3F)** with procedural models and WebGL optimizations:
- 🫀 **Human Heart 3D (`human-heart`):** Pulsing anatomical chambers (Left/Right Atria & Ventricles), Aortic arch, Pulmonary artery, and animated dual-loop blood flow particles.
- 🪐 **Solar System 3D (`solar-system`):** Glowing central Sun with corona, Keplerian elliptical orbit trails, 8 revolving planets, and Saturn's rings with speed controls.
- ⚛️ **Rutherford-Bohr Atom (`atom`):** Dense central nucleus with protons (+1) and neutrons (0), multi-plane inclined electron shells (n=1, n=2), and whirling quantum leptons.
- 🧬 **DNA Double Helix (`dna`):** Antiparallel spiraling sugar-phosphate backbones, color-coded complementary base pairs (A-T, G-C), and hydrogen bond links.
- 🕳️ **Relativistic Black Hole (`black-hole`):** Pitch-black event horizon, photon sphere glow, swirling high-temperature accretion disk particle cloud, and relativistic jet cones.
- ⚡ **Electric Circuit 3D (`electric-circuit`):** DC battery cell, resistor load, interactive toggle switch (opens/closes), glowing tungsten filament bulb, and circulating electron charges.
- 🌿 **Photosynthesis 3D (`photosynthesis`):** Chloroplast double-membrane body, thylakoid grana stacks, stroma matrix, incoming solar photon streams, and glucose/oxygen outputs.
- 🔗 **Linked List 3D (`linked-list`):** Dynamic heap memory node capsules [Value | Next Pointer], memory addresses, and illuminated directional pointer arrows.
- 〰️ **Wave Mechanics 3D (`wave`):** Real-time sine wave particle oscillation with crests, troughs, and amplitude/wavelength modulators.
- 📊 **Interactive Diagram 2D/3D (`interactive-diagram`):** Universal high-contrast flow diagram for arbitrary educational topics with clickable hotspots.

### 3. Interactive 3D Viewer & Controls
- OrbitControls: Full Rotate, Zoom, and Pan with mouse or touch.
- Play / Pause animation and speed multiplier controls (0.5x, 1x, 2x).
- Step-by-step timeline navigation (Previous / Next Step).
- Click-to-inspect 3D component highlight with dedicated inspector cards.
- Reset camera and Fullscreen mode.

### 4. Contextual AI Personal Tutor
- Side-panel AI tutor aware of: current topic, active step, selected 3D component, and learning level.
- Quick action pills: **"Simplify this"**, **"Give an example"**, **"Explain in Telugu"**, **"Exam 5-mark answer"**, **"Why is this important?"**.
- Text-to-speech audio read-aloud button for auditory learners and accessibility.

### 5. Interactive Quizzes & Exam Revision
- Auto-generated multiple-choice questions testing conceptual depth.
- Instant feedback with detailed explanations for every option.
- Score tracker with confetti celebration on high scores.
- Interactive 3D flip flashcards (click to reveal answers).
- Key definitions, common exam misconceptions, and core summary bullet points.

### 6. Resilient Architecture & Demo Mode
- **Zero-barrier Out-of-the-Box Experience:** Runs in high-fidelity Demo Mode if `GEMINI_API_KEY` is not yet configured, letting students and evaluators immediately interact with full 3D lessons, quizzes, and tutor queries!
- **Guest In-Memory Persistence:** Progress, bookmarks, and quiz scores persist without requiring external database credentials.
- **Enterprise-Ready:** Connects seamlessly to Google Gemini AI and Supabase PostgreSQL whenever keys are provided.

---

## 🏗️ Technology Stack

- **Frontend:**
  - React 18 & TypeScript
  - Vite 6
  - Tailwind CSS (Deep navy `#070b14` palette with cyan `#06b6d4` & violet `#8b5cf6` accents)
  - Three.js & `@react-three/fiber` & `@react-three/drei`
  - Lucide Icons
  - `canvas-confetti`
- **Backend:**
  - Node.js & Express
  - TypeScript & `tsx`
  - Zod (Runtime JSON schema validation)
  - Multer (Safe multipart file uploads)
  - `pdf-parse` & `mammoth` (PDF & DOCX text extraction)
  - `express-rate-limit` & CORS
  - `@google/generative-ai` (Google Gemini LLM SDK)
  - `@supabase/supabase-js` (PostgreSQL client)
- **Testing:**
  - Vitest & Supertest (Automated unit and integration test suites)

---

## 📂 Project Structure

```
visualmind-3d/
├── frontend/                         # Frontend React Application
│   ├── src/
│   │   ├── components/               # Navbar, Footer
│   │   ├── features/
│   │   │   ├── tutor/                # AITutorPanel.tsx
│   │   │   ├── quizzes/              # QuizModule.tsx, RevisionTab.tsx
│   │   │   └── visualizations/       # ViewerContainer.tsx
│   │   ├── visualization-registry/   # 3D R3F Scenes & Central Registry
│   │   │   ├── HeartVisualization.tsx
│   │   │   ├── SolarSystemVisualization.tsx
│   │   │   ├── AtomVisualization.tsx
│   │   │   ├── DnaVisualization.tsx
│   │   │   ├── BlackHoleVisualization.tsx
│   │   │   ├── CircuitVisualization.tsx
│   │   │   ├── PhotosynthesisVisualization.tsx
│   │   │   ├── LinkedListVisualization.tsx
│   │   │   ├── WaveVisualization.tsx
│   │   │   ├── InteractiveDiagramVisualization.tsx
│   │   │   └── registry.ts
│   │   ├── pages/                    # HomePage, ExplorePage, NotesUploadPage, LessonWorkspacePage, DashboardPage, SettingsPage
│   │   ├── services/                 # api.ts
│   │   ├── types/                    # index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── .env
│   └── package.json
│
├── backend/                          # Backend Express REST API
│   ├── src/
│   │   ├── ai/                       # provider.ts, presets.ts
│   │   ├── controllers/              # lessonController, tutorController, quizController
│   │   ├── routes/                   # lessons.ts, tutor.ts, quiz.ts, system.ts
│   │   ├── schemas/                  # lessonSchema.ts (Zod schemas)
│   │   ├── services/                 # lessonService.ts, dbService.ts, extractionService.ts
│   │   ├── middleware/               # errorHandler.ts
│   │   ├── types/                    # index.ts, declarations.d.ts
│   │   ├── test/                     # server.test.ts (Vitest tests)
│   │   └── index.ts                  # Server entrypoint
│   ├── supabase/
│   │   └── migrations/               # PostgreSQL schema & migrations
│   ├── tsconfig.json
│   ├── .env
│   └── package.json
│
├── .env                              # Workspace environment variables
├── .gitignore
├── package.json                      # Root orchestration scripts
└── README.md
```

---

## ⚡ Quick Start (Windows PowerShell)

### 1. Clone & Enter Project Directory
```powershell
cd c:\Users\dhara\OneDrive\Documents\Desktop\3d
```

### 2. Configure Environment Variables (Optional)
Ensure `.env` exists in root or backend:
*(VisualMind 3D works out-of-the-box in Demo Mode even if left unchanged!)*

To enable live Google Gemini AI generation:
1. Open `.env` in any text editor.
2. Set `GEMINI_API_KEY=your_actual_key_from_aistudio`.

### 3. Install Dependencies
```powershell
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 4. Run Both Frontend and Backend Concurrently
```powershell
npm run dev
```

The application will be live at:
- 🌐 **Frontend Web App:** [http://localhost:5173](http://localhost:5173)
- 🚀 **Backend API:** [http://localhost:5000](http://localhost:5000)
- 🩺 **Health Check:** [http://localhost:5000/api/system/health](http://localhost:5000/api/system/health)
- ⚙️ **System Status:** [http://localhost:5000/api/system/status](http://localhost:5000/api/system/status)

---

## 🧪 Running Automated Tests

Run backend tests:
```powershell
npm --prefix backend test
```

Run frontend tests:
```powershell
npm --prefix frontend test
```

Run all tests together:
```powershell
npm test
```

---

## 🛠️ Building for Production

```powershell
npm run build
```
- Backend outputs compiled JavaScript to `backend/dist/`.
- Frontend outputs optimized production static assets to `frontend/dist/`.

---

## 🔒 Security & Privacy Practices
- **No Client Secrets:** All AI and database credentials are held strictly server-side.
- **Strict Zod Validation:** All incoming and outgoing AI responses pass strict schema validation. No `eval` or dynamic code execution is ever permitted.
- **Upload Restrictions:** File size limit enforced at 20MB with mime-type filters and memory buffer processing.

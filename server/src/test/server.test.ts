import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index.js';

describe('VisualMind 3D Backend API Tests', () => {
  it('GET /api/system/health returns 200 ok', async () => {
    const res = await request(app).get('/api/system/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('VisualMind 3D API');
  });

  it('GET /api/system/status returns system status and demo mode', async () => {
    const res = await request(app).get('/api/system/status');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('liveAI');
    expect(res.body).toHaveProperty('aiProvider');
  });

  it('GET /api/lessons/presets returns preset lessons with 3D specs', async () => {
    const res = await request(app).get('/api/lessons/presets');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const first = res.body[0];
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('visualization');
    expect(first.visualization).toHaveProperty('templateId');
    expect(first.visualization.steps.length).toBeGreaterThan(0);
  });

  it('POST /api/lessons/from-topic rejects empty or whitespace topics', async () => {
    const res = await request(app)
      .post('/api/lessons/from-topic')
      .send({ topic: '' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation Error');
  });

  it('POST /api/lessons/from-topic generates animal biology lesson for "Tiger" with zero C++ content', async () => {
    const res = await request(app)
      .post('/api/lessons/from-topic')
      .send({ topic: 'Tiger', difficulty: 'beginner', language: 'English' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title.toLowerCase()).toContain('tiger');
    expect(res.body.visualization.templateId).toBe('animal-biology');
    expect(res.body.subject).toContain('Zoology');

    // Confirm absolutely zero C++ or linked list leakage
    const bodyStr = JSON.stringify(res.body).toLowerCase();
    expect(bodyStr).not.toContain('linked list');
    expect(bodyStr).not.toContain('c++');
    expect(bodyStr).not.toContain('heap memory');
    expect(bodyStr).not.toContain('nullptr');
  });

  it('POST /api/lessons/from-topic generates a structured lesson for "human heart"', async () => {
    const res = await request(app)
      .post('/api/lessons/from-topic')
      .send({ topic: 'human heart', difficulty: 'beginner', language: 'English' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toContain('Heart');
    expect(res.body.visualization.templateId).toBe('human-heart');
    expect(res.body.sections.length).toBeGreaterThan(0);
    expect(res.body.quiz.length).toBeGreaterThan(0);
  });

  it('POST /api/lessons/from-topic generates astronomy lesson for "Solar System"', async () => {
    const res = await request(app)
      .post('/api/lessons/from-topic')
      .send({ topic: 'Solar System', difficulty: 'beginner', language: 'English' });
    expect(res.status).toBe(201);
    expect(res.body.visualization.templateId).toBe('solar-system');
    expect(res.body.title).toContain('Solar');
  });

  it('POST /api/lessons/from-topic generates programming lesson for "Linked List in C++"', async () => {
    const res = await request(app)
      .post('/api/lessons/from-topic')
      .send({ topic: 'Linked List in C++', difficulty: 'intermediate', language: 'English' });
    expect(res.status).toBe(201);
    expect(res.body.visualization.templateId).toBe('linked-list');
    expect(res.body.subject).toContain('Computer Science');
  });

  it('POST /api/lessons/from-topic generates botany lesson for "Photosynthesis"', async () => {
    const res = await request(app)
      .post('/api/lessons/from-topic')
      .send({ topic: 'Photosynthesis', difficulty: 'beginner', language: 'English' });
    expect(res.status).toBe(201);
    expect(res.body.visualization.templateId).toBe('photosynthesis');
  });

  it('POST /api/lessons/from-topic generates astrophysics lesson for "Black Hole"', async () => {
    const res = await request(app)
      .post('/api/lessons/from-topic')
      .send({ topic: 'Black Hole', difficulty: 'beginner', language: 'English' });
    expect(res.status).toBe(201);
    expect(res.body.visualization.templateId).toBe('black-hole');
  });

  it('POST /api/tutor/chat generates contextual response', async () => {
    const res = await request(app)
      .post('/api/tutor/chat')
      .send({
        message: 'Simplify this for me',
        topic: 'Human Heart',
        lessonTitle: 'How the Human Heart Pumps Blood',
        selectedComponentId: 'Left Ventricle',
        difficulty: 'beginner',
        language: 'English',
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('reply');
    expect(typeof res.body.reply).toBe('string');
    expect(res.body.reply.length).toBeGreaterThan(10);
  });

  it('POST /api/quiz/submit accurately evaluates answers and calculates score', async () => {
    // Fetch preset heart lesson to get lessonId and quiz
    const presetRes = await request(app).get('/api/lessons/presets');
    const heart = presetRes.body.find((l: any) => l.visualization.templateId === 'human-heart');
    expect(heart).toBeDefined();

    // Submit answers where index 0 is chosen for all
    const correctAnswers = heart.quiz.map((q: any) => q.correctAnswerIndex);
    const submitRes = await request(app)
      .post('/api/quiz/submit')
      .send({
        lessonId: heart.id,
        answers: correctAnswers,
      });

    expect(submitRes.status).toBe(200);
    expect(submitRes.body.score).toBe(heart.quiz.length);
    expect(submitRes.body.percentage).toBe(100);
  });
});

import { describe, it, expect } from 'vitest';
import { getVisualizationEntry, VISUALIZATION_REGISTRY } from '../visualization-registry/registry';

describe('VisualMind 3D Client Registry & Logic Tests', () => {
  it('registers all required 3D educational templates', () => {
    expect(VISUALIZATION_REGISTRY['animal-biology']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['animal']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['human-heart']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['solar-system']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['atom']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['dna']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['black-hole']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['electric-circuit']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['photosynthesis']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['linked-list']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['wave']).toBeDefined();
    expect(VISUALIZATION_REGISTRY['interactive-diagram']).toBeDefined();
  });

  it('animal-biology visualization has correct subject and 3d render mode', () => {
    const animal = getVisualizationEntry('animal-biology');
    expect(animal.subject).toBe('Zoology & Animal Biology');
    expect(animal.renderMode).toBe('3d');
    expect(animal.cameraPosition).toHaveLength(3);
  });

  it('getVisualizationEntry falls back gracefully to interactive-diagram for unknown templates', () => {
    const entry = getVisualizationEntry('unknown-arbitrary-topic');
    expect(entry).toBeDefined();
    expect(entry.id).toBe('interactive-diagram');
  });

  it('heart visualization has correct subject and 3d render mode', () => {
    const heart = getVisualizationEntry('human-heart');
    expect(heart.subject).toBe('Biology');
    expect(heart.renderMode).toBe('3d');
    expect(heart.cameraPosition).toHaveLength(3);
  });
});

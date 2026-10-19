import React from 'react';
import { HeartVisualization } from './HeartVisualization';
import { SolarSystemVisualization } from './SolarSystemVisualization';
import { AtomVisualization } from './AtomVisualization';
import { DnaVisualization } from './DnaVisualization';
import { BlackHoleVisualization } from './BlackHoleVisualization';
import { CircuitVisualization } from './CircuitVisualization';
import { PhotosynthesisVisualization } from './PhotosynthesisVisualization';
import { LinkedListVisualization } from './LinkedListVisualization';
import { WaveVisualization } from './WaveVisualization';
import { InteractiveDiagramVisualization } from './InteractiveDiagramVisualization';
import { AnimalVisualization } from './AnimalVisualization';
import { SnakeVisualization } from './SnakeVisualization';
import { ButterflyVisualization } from './ButterflyVisualization';
import { Universal3DViewer } from './Universal3DViewer';

export interface VisualizationRegistryEntry {
  id: string;
  name: string;
  subject: string;
  renderMode: '3d' | '2d';
  cameraPosition: [number, number, number];
  component: React.ComponentType<any>;
}

export const VISUALIZATION_REGISTRY: Record<string, VisualizationRegistryEntry> = {
  'butterfly': {
    id: 'butterfly',
    name: 'Lepidoptera & Butterfly Anatomy 3D',
    subject: 'Entomology & Evolutionary Biology',
    renderMode: '3d',
    cameraPosition: [0, 2, 6],
    component: ButterflyVisualization,
  },
  'butterflies': {
    id: 'butterflies',
    name: 'Butterfly Anatomy & Aerodynamics 3D',
    subject: 'Entomology & Evolutionary Biology',
    renderMode: '3d',
    cameraPosition: [0, 2, 6],
    component: ButterflyVisualization,
  },
  'lepidoptera': {
    id: 'lepidoptera',
    name: 'Lepidoptera Biology 3D',
    subject: 'Entomology & Evolutionary Biology',
    renderMode: '3d',
    cameraPosition: [0, 2, 6],
    component: ButterflyVisualization,
  },
  'moth': {
    id: 'moth',
    name: 'Lepidoptera Anatomy 3D',
    subject: 'Entomology & Evolutionary Biology',
    renderMode: '3d',
    cameraPosition: [0, 2, 6],
    component: ButterflyVisualization,
  },
  'caterpillar': {
    id: 'caterpillar',
    name: 'Metamorphosis & Butterfly Biology 3D',
    subject: 'Entomology & Evolutionary Biology',
    renderMode: '3d',
    cameraPosition: [0, 2, 6],
    component: ButterflyVisualization,
  },
  'snake': {
    id: 'snake',
    name: 'Serpent & Snake Anatomy 3D',
    subject: 'Zoology & Herpetology',
    renderMode: '3d',
    cameraPosition: [0, 2.5, 6.5],
    component: SnakeVisualization,
  },
  'serpent': {
    id: 'serpent',
    name: 'Serpent Anatomy 3D',
    subject: 'Zoology & Herpetology',
    renderMode: '3d',
    cameraPosition: [0, 2.5, 6.5],
    component: SnakeVisualization,
  },
  'cobra': {
    id: 'cobra',
    name: 'Cobra Biology 3D',
    subject: 'Zoology & Herpetology',
    renderMode: '3d',
    cameraPosition: [0, 2.5, 6.5],
    component: SnakeVisualization,
  },
  'viper': {
    id: 'viper',
    name: 'Viper Anatomy 3D',
    subject: 'Zoology & Herpetology',
    renderMode: '3d',
    cameraPosition: [0, 2.5, 6.5],
    component: SnakeVisualization,
  },
  'python': {
    id: 'python',
    name: 'Python Anatomy 3D',
    subject: 'Zoology & Herpetology',
    renderMode: '3d',
    cameraPosition: [0, 2.5, 6.5],
    component: SnakeVisualization,
  },
  'animal-biology': {
    id: 'animal-biology',
    name: 'Panthera Tigris & Animal Biology 3D',
    subject: 'Zoology & Animal Biology',
    renderMode: '3d',
    cameraPosition: [0, 1.5, 6],
    component: AnimalVisualization,
  },
  'animal': {
    id: 'animal',
    name: 'Animal Anatomy 3D',
    subject: 'Zoology & Animal Biology',
    renderMode: '3d',
    cameraPosition: [0, 1.5, 6],
    component: AnimalVisualization,
  },
  'human-heart': {
    id: 'human-heart',
    name: 'Human Heart 3D',
    subject: 'Biology',
    renderMode: '3d',
    cameraPosition: [0, 0, 4.5],
    component: HeartVisualization,
  },
  'solar-system': {
    id: 'solar-system',
    name: 'Solar System 3D',
    subject: 'Astronomy / Physics',
    renderMode: '3d',
    cameraPosition: [0, 8, 14],
    component: SolarSystemVisualization,
  },
  'planet': {
    id: 'planet',
    name: 'Planetary Orbits',
    subject: 'Astronomy',
    renderMode: '3d',
    cameraPosition: [0, 6, 12],
    component: SolarSystemVisualization,
  },
  'atom': {
    id: 'atom',
    name: 'Rutherford-Bohr Atom',
    subject: 'Chemistry / Physics',
    renderMode: '3d',
    cameraPosition: [0, 0, 5],
    component: AtomVisualization,
  },
  'molecule': {
    id: 'molecule',
    name: 'Molecular Structure',
    subject: 'Chemistry',
    renderMode: '3d',
    cameraPosition: [0, 0, 5],
    component: AtomVisualization,
  },
  'dna': {
    id: 'dna',
    name: 'DNA Double Helix',
    subject: 'Biology / Genetics',
    renderMode: '3d',
    cameraPosition: [0, 0, 5.5],
    component: DnaVisualization,
  },
  'black-hole': {
    id: 'black-hole',
    name: 'Black Hole & Relativity',
    subject: 'Astrophysics',
    renderMode: '3d',
    cameraPosition: [0, 2, 6.5],
    component: BlackHoleVisualization,
  },
  'electric-circuit': {
    id: 'electric-circuit',
    name: 'Electric Circuit & Ohm\'s Law',
    subject: 'Physics / Engineering',
    renderMode: '3d',
    cameraPosition: [0, 0, 7],
    component: CircuitVisualization,
  },
  'photosynthesis': {
    id: 'photosynthesis',
    name: 'Photosynthesis & Chloroplast',
    subject: 'Biology / Botany',
    renderMode: '3d',
    cameraPosition: [0, 0, 6],
    component: PhotosynthesisVisualization,
  },
  'cell': {
    id: 'cell',
    name: 'Plant Cell Structure',
    subject: 'Biology',
    renderMode: '3d',
    cameraPosition: [0, 0, 6],
    component: PhotosynthesisVisualization,
  },
  'linked-list': {
    id: 'linked-list',
    name: 'Linked List Data Structure',
    subject: 'Computer Science',
    renderMode: '3d',
    cameraPosition: [0, 0, 7.5],
    component: LinkedListVisualization,
  },
  'stack': {
    id: 'stack',
    name: 'Stack Memory Structure',
    subject: 'Computer Science',
    renderMode: '3d',
    cameraPosition: [0, 0, 7.5],
    component: LinkedListVisualization,
  },
  'queue': {
    id: 'queue',
    name: 'Queue Memory Structure',
    subject: 'Computer Science',
    renderMode: '3d',
    cameraPosition: [0, 0, 7.5],
    component: LinkedListVisualization,
  },
  'wave': {
    id: 'wave',
    name: 'Wave Mechanics & Oscillation',
    subject: 'Physics',
    renderMode: '3d',
    cameraPosition: [0, 0, 6.5],
    component: WaveVisualization,
  },
  'universal-3d': {
    id: 'universal-3d',
    name: 'Universal AI 3D Explorer',
    subject: 'Universal Educational Concepts',
    renderMode: '3d',
    cameraPosition: [0, 2.8, 7.5],
    component: Universal3DViewer,
  },
  'interactive-diagram': {
    id: 'interactive-diagram',
    name: 'Interactive Conceptual Diagram',
    subject: 'General Education',
    renderMode: '2d',
    cameraPosition: [0, 0, 5],
    component: InteractiveDiagramVisualization,
  },
};

export function getVisualizationEntry(templateId?: string, hasScene?: boolean): VisualizationRegistryEntry {
  if (templateId && templateId !== 'universal-3d' && templateId !== 'dynamic-3d' && VISUALIZATION_REGISTRY[templateId]) {
    return VISUALIZATION_REGISTRY[templateId];
  }
  if (hasScene || templateId === 'universal-3d' || templateId === 'dynamic-3d') {
    return VISUALIZATION_REGISTRY['universal-3d'];
  }
  // Default fallback for any arbitrary topic: Universal 3D Explorer!
  return VISUALIZATION_REGISTRY['universal-3d'];
}

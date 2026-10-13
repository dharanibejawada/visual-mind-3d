import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  playbackSpeed?: number;
  isPlaying?: boolean;
}

export const DnaVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!isPlaying || !groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.4 * playbackSpeed;
  });

  const basePairs = [
    { base1: 'adenine', label1: 'A', color1: '#ef4444', base2: 'thymine', label2: 'T', color2: '#22c55e' },
    { base1: 'guanine', label1: 'G', color1: '#06b6d4', base2: 'cytosine', label2: 'C', color2: '#eab308' },
    { base1: 'thymine', label1: 'T', color1: '#22c55e', base2: 'adenine', label2: 'A', color2: '#ef4444' },
    { base1: 'cytosine', label1: 'C', color1: '#eab308', base2: 'guanine', label2: 'G', color2: '#06b6d4' },
    { base1: 'adenine', label1: 'A', color1: '#ef4444', base2: 'thymine', label2: 'T', color2: '#22c55e' },
    { base1: 'guanine', label1: 'G', color1: '#06b6d4', base2: 'cytosine', label2: 'C', color2: '#eab308' },
    { base1: 'thymine', label1: 'T', color1: '#22c55e', base2: 'adenine', label2: 'A', color2: '#ef4444' },
    { base1: 'cytosine', label1: 'C', color1: '#eab308', base2: 'guanine', label2: 'G', color2: '#06b6d4' },
    { base1: 'adenine', label1: 'A', color1: '#ef4444', base2: 'thymine', label2: 'T', color2: '#22c55e' },
  ];

  const radius = 1.0;
  const heightStep = 0.55;

  return (
    <group ref={groupRef} position={[0, -2.2, 0]}>
      {basePairs.map((pair, index) => {
        const y = index * heightStep;
        const angle = index * 0.7; // Spiral twist
        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;

        return (
          <group key={index} position={[0, y, 0]}>
            {/* Strand 1 Backbone Sphere */}
            <mesh
              position={[x1, 0, z1]}
              onClick={(e) => { e.stopPropagation(); onSelectComponent?.('backbone'); }}
            >
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial
                color={selectedComponentId === 'backbone' ? '#38bdf8' : '#8b5cf6'}
                metalness={0.2}
                roughness={0.3}
              />
            </mesh>

            {/* Base 1 Cylinder Rung */}
            <mesh
              position={[x1 * 0.5, 0, z1 * 0.5]}
              rotation={[0, -angle, Math.PI / 2]}
              onClick={(e) => { e.stopPropagation(); onSelectComponent?.(pair.base1); }}
            >
              <cylinderGeometry args={[0.07, 0.07, radius, 12]} />
              <meshStandardMaterial
                color={selectedComponentId === pair.base1 ? '#38bdf8' : pair.color1}
                emissive={selectedComponentId === pair.base1 ? '#0284c7' : '#000000'}
                emissiveIntensity={0.5}
              />
            </mesh>

            {/* Hydrogen Bond Center Gap */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Base 2 Cylinder Rung */}
            <mesh
              position={[x2 * 0.5, 0, z2 * 0.5]}
              rotation={[0, -angle, Math.PI / 2]}
              onClick={(e) => { e.stopPropagation(); onSelectComponent?.(pair.base2); }}
            >
              <cylinderGeometry args={[0.07, 0.07, radius, 12]} />
              <meshStandardMaterial
                color={selectedComponentId === pair.base2 ? '#38bdf8' : pair.color2}
                emissive={selectedComponentId === pair.base2 ? '#0284c7' : '#000000'}
                emissiveIntensity={0.5}
              />
            </mesh>

            {/* Strand 2 Backbone Sphere */}
            <mesh
              position={[x2, 0, z2]}
              onClick={(e) => { e.stopPropagation(); onSelectComponent?.('backbone'); }}
            >
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial
                color={selectedComponentId === 'backbone' ? '#38bdf8' : '#6366f1'}
                metalness={0.2}
                roughness={0.3}
              />
            </mesh>
          </group>
        );
      })}

      {/* Legend Annotation */}
      <Float speed={1} floatIntensity={0.1}>
        <Text position={[0, 5.2, 0]} fontSize={0.22} color="#ffffff">
          DNA Double Helix: A-T & G-C Hydrogen Bonds
        </Text>
      </Float>
    </group>
  );
};

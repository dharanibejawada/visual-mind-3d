import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  playbackSpeed?: number;
  isPlaying?: boolean;
}

export const WaveVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const pointsRef = useRef<THREE.Group>(null);
  const particleCount = 40;

  useFrame(({ clock }) => {
    if (!isPlaying || !pointsRef.current) return;
    const t = clock.getElapsedTime() * playbackSpeed * 2;

    pointsRef.current.children.forEach((mesh, i) => {
      const x = (i - particleCount / 2) * 0.2;
      const k = 1.2; // wave number
      const y = Math.sin(k * x - t) * 1.2;
      mesh.position.set(x, y, 0);
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Equilibrium Line */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('equilibrium'); }}
      >
        <boxGeometry args={[8.5, 0.02, 0.02]} />
        <meshBasicMaterial color="#64748b" opacity={0.5} transparent />
      </mesh>

      {/* Oscillating Particles forming continuous Sine Wave */}
      <group ref={pointsRef}>
        {Array.from({ length: particleCount }).map((_, i) => (
          <mesh
            key={i}
            onClick={(e) => { e.stopPropagation(); onSelectComponent?.('crest'); }}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={selectedComponentId === 'crest' ? '#38bdf8' : '#06b6d4'}
              emissive="#06b6d4"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Amplitude and Wavelength Indicators */}
      <Float speed={1} floatIntensity={0.1}>
        <Text position={[0, 1.8, 0]} fontSize={0.24} color="#38bdf8">
          Amplitude (A) ➔ Peak Crest
        </Text>
        <Text position={[0, -1.8, 0]} fontSize={0.24} color="#8b5cf6">
          Trough ➔ Maximum Negative Displacement
        </Text>
        <Text position={[0, -2.4, 0]} fontSize={0.2} color="#94a3b8">
          Universal Wave Equation: v = f × λ
        </Text>
      </Float>
    </group>
  );
};

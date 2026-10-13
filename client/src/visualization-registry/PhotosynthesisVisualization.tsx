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

export const PhotosynthesisVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const photonsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!isPlaying || !photonsRef.current) return;
    const t = clock.getElapsedTime() * playbackSpeed;
    photonsRef.current.children.forEach((p, idx) => {
      // Golden photons descending diagonally into leaf/chloroplast
      p.position.y = 3 - ((t * 2 + idx * 0.8) % 4);
      p.position.x = -2 + ((t * 2 + idx * 0.8) % 4) * 0.8;
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Chloroplast Capsule Body */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('chloroplast'); }}
      >
        <sphereGeometry args={[2.2, 32, 24]} />
        <meshStandardMaterial
          color={selectedComponentId === 'chloroplast' ? '#38bdf8' : '#059669'}
          transparent
          opacity={0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Internal Grana / Thylakoid Stacks */}
      {[-0.9, 0, 0.9].map((xOffset, colIdx) => (
        <group key={colIdx} position={[xOffset, -0.4, 0]}>
          {[-0.4, -0.15, 0.1, 0.35].map((yOffset, diskIdx) => (
            <mesh
              key={diskIdx}
              position={[0, yOffset, 0]}
              onClick={(e) => { e.stopPropagation(); onSelectComponent?.('thylakoid'); }}
            >
              <cylinderGeometry args={[0.35, 0.35, 0.1, 24]} />
              <meshStandardMaterial
                color={selectedComponentId === 'thylakoid' ? '#38bdf8' : '#10b981'}
                emissive="#047857"
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Stroma Matrix Indicator */}
      <mesh
        position={[0, 0, -0.2]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('stroma'); }}
      >
        <planeGeometry args={[2, 1.2]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.1} />
      </mesh>

      {/* Inbound Sun Photons */}
      <group ref={photonsRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[-2, 2, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color="#facc15" emissive="#f59e0b" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>

      {/* Inputs and Outputs Chemical Tags */}
      <Float speed={1} floatIntensity={0.2}>
        <Text position={[-2.4, 1.5, 0]} fontSize={0.24} color="#facc15">
          Light (Photons) ➔
        </Text>
        <Text position={[-2.4, -1.2, 0]} fontSize={0.22} color="#38bdf8">
          H₂O + CO₂ In ➔
        </Text>
        <Text position={[2.2, 0, 0]} fontSize={0.24} color="#22c55e">
          ➔ C₆H₁₂O₆ (Glucose) + O₂
        </Text>
        <Text position={[0, -2.5, 0]} fontSize={0.22} color="#ffffff">
          Chloroplast: Thylakoid Grana (Light) & Stroma (Calvin Cycle)
        </Text>
      </Float>
    </group>
  );
};

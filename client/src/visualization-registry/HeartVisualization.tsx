import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  playbackSpeed?: number;
  isPlaying?: boolean;
}

export const HeartVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const heartGroupRef = useRef<THREE.Group>(null);
  const bloodParticlesRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Animate heartbeat pulsation
  useFrame(({ clock }) => {
    if (!heartGroupRef.current) return;
    const t = clock.getElapsedTime() * playbackSpeed * (isPlaying ? 1 : 0);

    // Double-pulse rhythm (lub-dub)
    const cycle = (t * 2.5) % (Math.PI * 2);
    const beat1 = Math.sin(cycle) > 0.85 ? 0.08 : 0;
    const beat2 = Math.sin(cycle + 0.4) > 0.85 ? 0.05 : 0;
    const scale = 1 + (beat1 + beat2) * 1.5;

    heartGroupRef.current.scale.set(scale, scale, scale);

    // Animate blood particles along circulatory paths
    if (bloodParticlesRef.current) {
      bloodParticlesRef.current.rotation.y = t * 0.5;
    }
  });

  const getMaterial = (id: string, baseColor: string) => {
    const isSelected = selectedComponentId === id;
    const isHovered = hovered === id;
    return (
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : isHovered ? '#67e8f9' : baseColor}
        roughness={0.3}
        metalness={0.2}
        emissive={isSelected ? '#0284c7' : isHovered ? '#0891b2' : '#000000'}
        emissiveIntensity={isSelected ? 0.6 : isHovered ? 0.3 : 0}
      />
    );
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Main Heart Muscular Core */}
      <group ref={heartGroupRef}>
        {/* Left Ventricle (Thick muscular lower-left chamber) */}
        <mesh
          position={[0.5, -0.6, 0.1]}
          rotation={[0, 0, -0.2]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('left-ventricle'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('left-ventricle'); }}
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[0.9, 32, 32]} />
          {getMaterial('left-ventricle', '#b91c1c')}
        </mesh>

        {/* Right Ventricle (Lower-right chamber) */}
        <mesh
          position={[-0.5, -0.6, 0.2]}
          rotation={[0, 0, 0.2]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('right-ventricle'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('right-ventricle'); }}
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[0.75, 32, 32]} />
          {getMaterial('right-ventricle', '#1d4ed8')}
        </mesh>

        {/* Left Atrium (Upper-left chamber) */}
        <mesh
          position={[0.6, 0.5, -0.1]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('left-atrium'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('left-atrium'); }}
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[0.6, 28, 28]} />
          {getMaterial('left-atrium', '#dc2626')}
        </mesh>

        {/* Right Atrium (Upper-right chamber) */}
        <mesh
          position={[-0.7, 0.4, 0]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('right-atrium'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('right-atrium'); }}
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[0.65, 28, 28]} />
          {getMaterial('right-atrium', '#2563eb')}
        </mesh>

        {/* Aorta (Great Arch carrying oxygenated blood) */}
        <group
          position={[0.1, 1.1, -0.2]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('aorta'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('aorta'); }}
          onPointerOut={() => setHovered(null)}
        >
          <mesh rotation={[0, 0, -0.4]}>
            <torusGeometry args={[0.6, 0.2, 16, 32, Math.PI * 0.9]} />
            {getMaterial('aorta', '#ef4444')}
          </mesh>
          {/* Branching Arteries */}
          <mesh position={[0.2, 0.6, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
            {getMaterial('aorta', '#ef4444')}
          </mesh>
          <mesh position={[-0.1, 0.6, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
            {getMaterial('aorta', '#ef4444')}
          </mesh>
        </group>

        {/* Pulmonary Artery (Carrying deoxygenated blood to lungs) */}
        <mesh
          position={[-0.2, 0.8, 0.3]}
          rotation={[0.3, 0.2, 0.5]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('pulmonary-artery'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('pulmonary-artery'); }}
          onPointerOut={() => setHovered(null)}
        >
          <cylinderGeometry args={[0.22, 0.22, 0.9, 20]} />
          {getMaterial('pulmonary-artery', '#3b82f6')}
        </mesh>

        {/* Superior Vena Cava */}
        <mesh
          position={[-0.8, 1.1, -0.2]}
          rotation={[0.1, 0, 0]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('vena-cava'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('vena-cava'); }}
          onPointerOut={() => setHovered(null)}
        >
          <cylinderGeometry args={[0.18, 0.18, 0.8, 16]} />
          {getMaterial('vena-cava', '#1e40af')}
        </mesh>
      </group>

      {/* Floating 3D Labels */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <Text position={[1.4, -0.7, 0]} fontSize={0.16} color="#ffffff" anchorX="left">
          Left Ventricle
        </Text>
        <Text position={[-1.4, -0.7, 0]} fontSize={0.16} color="#ffffff" anchorX="right">
          Right Ventricle
        </Text>
        <Text position={[0.5, 1.9, 0]} fontSize={0.18} color="#ef4444" anchorX="center">
          Aorta
        </Text>
      </Float>
    </group>
  );
};

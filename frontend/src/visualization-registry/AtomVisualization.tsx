import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  playbackSpeed?: number;
  isPlaying?: boolean;
}

export const AtomVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const shell1Ref = useRef<THREE.Group>(null);
  const shell2Ref = useRef<THREE.Group>(null);
  const shell3Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!isPlaying) return;
    const t = clock.getElapsedTime() * playbackSpeed;

    if (shell1Ref.current) shell1Ref.current.rotation.z = t * 1.5;
    if (shell2Ref.current) shell2Ref.current.rotation.y = t * 1.2;
    if (shell3Ref.current) shell3Ref.current.rotation.x = t * 0.9;
  });

  // Nucleus cluster coordinates
  const nucleons = [
    { type: 'proton', pos: [0.15, 0.15, 0.15], color: '#ef4444' },
    { type: 'neutron', pos: [-0.15, 0.15, -0.15], color: '#94a3b8' },
    { type: 'proton', pos: [-0.15, -0.15, 0.15], color: '#ef4444' },
    { type: 'neutron', pos: [0.15, -0.15, -0.15], color: '#94a3b8' },
    { type: 'proton', pos: [0.0, 0.25, -0.1], color: '#ef4444' },
    { type: 'neutron', pos: [0.0, -0.25, 0.1], color: '#94a3b8' },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* Central Dense Nucleus */}
      <group
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('protons'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('nucleus'); }}
        onPointerOut={() => setHovered(null)}
      >
        {nucleons.map((n, i) => (
          <mesh key={i} position={n.pos as [number, number, number]}>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial
              color={selectedComponentId === 'protons' ? '#38bdf8' : n.color}
              roughness={0.3}
              metalness={0.3}
              emissive={selectedComponentId === 'protons' ? '#0284c7' : '#000000'}
              emissiveIntensity={selectedComponentId === 'protons' ? 0.6 : 0}
            />
          </mesh>
        ))}
      </group>

      {/* Orbital Shell 1 (Inclined Plane 1) */}
      <group ref={shell1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" opacity={0.4} transparent />
        </mesh>
        {/* Orbiting Electrons */}
        <mesh position={[1.8, 0, 0]} onClick={(e) => { e.stopPropagation(); onSelectComponent?.('electrons'); }}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1} />
        </mesh>
        <mesh position={[-1.8, 0, 0]} onClick={(e) => { e.stopPropagation(); onSelectComponent?.('electrons'); }}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Orbital Shell 2 (Inclined Plane 2) */}
      <group ref={shell2Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.02, 16, 64]} />
          <meshBasicMaterial color="#818cf8" opacity={0.4} transparent />
        </mesh>
        <mesh position={[2.5, 0, 0]} onClick={(e) => { e.stopPropagation(); onSelectComponent?.('electrons'); }}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={1} />
        </mesh>
        <mesh position={[-2.5, 0, 0]} onClick={(e) => { e.stopPropagation(); onSelectComponent?.('electrons'); }}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Orbital Shell 3 (Horizontal Ring) */}
      <group ref={shell3Ref} rotation={[0, 0, Math.PI / 3]}>
        <mesh>
          <torusGeometry args={[3.2, 0.02, 16, 64]} />
          <meshBasicMaterial color="#a855f7" opacity={0.4} transparent />
        </mesh>
        <mesh position={[3.2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSelectComponent?.('electrons'); }}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
        </mesh>
        <mesh position={[-3.2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSelectComponent?.('electrons'); }}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Floating 3D Annotations */}
      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.1}>
        <Text position={[0, -0.6, 0]} fontSize={0.2} color="#ffffff">
          Nucleus (Protons + Neutrons)
        </Text>
        <Text position={[2.4, 1.8, 0]} fontSize={0.18} color="#06b6d4">
          Quantized Electron Shell (n=2)
        </Text>
      </Float>
    </group>
  );
};

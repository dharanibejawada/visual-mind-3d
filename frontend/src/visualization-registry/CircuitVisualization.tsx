import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  playbackSpeed?: number;
  isPlaying?: boolean;
}

export const CircuitVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const [switchClosed, setSwitchClosed] = useState(true);
  const electronsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!isPlaying || !electronsRef.current || !switchClosed) return;
    const t = clock.getElapsedTime() * playbackSpeed * 1.5;
    electronsRef.current.children.forEach((child, idx) => {
      // Loop around a rectangular perimeter of 6 x 4
      const perimeter = 20;
      const progress = ((t * 2 + idx * 2.5) % perimeter) / perimeter;

      let x = 0;
      let y = 0;
      if (progress < 0.3) {
        // Top edge: -3 to 3 at y = 2
        x = -3 + (progress / 0.3) * 6;
        y = 2;
      } else if (progress < 0.5) {
        // Right edge: y = 2 to -2 at x = 3
        x = 3;
        y = 2 - ((progress - 0.3) / 0.2) * 4;
      } else if (progress < 0.8) {
        // Bottom edge: 3 to -3 at y = -2
        x = 3 - ((progress - 0.5) / 0.3) * 6;
        y = -2;
      } else {
        // Left edge: -2 to 2 at x = -3
        x = -3;
        y = -2 + ((progress - 0.8) / 0.2) * 4;
      }
      child.position.set(x, y, 0);
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Rectangular Conductive Wire Loop */}
      <mesh>
        {/* Top wire */}
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 6, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        {/* Bottom wire */}
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 6, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        {/* Left wire */}
        <mesh position={[-3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 4, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        {/* Right wire */}
        <mesh position={[3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 4, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
      </mesh>

      {/* DC Battery (Left Side) */}
      <group
        position={[-3, 0, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('battery'); }}
      >
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.6, 20]} />
          <meshStandardMaterial color={selectedComponentId === 'battery' ? '#38bdf8' : '#ef4444'} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.6, 20]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <Text position={[-0.6, 0, 0]} fontSize={0.2} color="#ffffff">
          9V Battery
        </Text>
      </group>

      {/* Light Bulb (Top Side) */}
      <group
        position={[0, 2, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('bulb'); }}
      >
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.4, 24, 24]} />
          <meshStandardMaterial
            color={switchClosed ? '#fef08a' : '#64748b'}
            emissive={switchClosed ? '#facc15' : '#000000'}
            emissiveIntensity={switchClosed ? 1.5 : 0}
            roughness={0.2}
          />
        </mesh>
        {switchClosed && (
          <pointLight color="#fde047" intensity={2} distance={8} decay={1} />
        )}
        <Text position={[0, 1.1, 0]} fontSize={0.2} color="#ffffff">
          Lamp / Load
        </Text>
      </group>

      {/* Switch (Bottom Side - Clickable to open/close!) */}
      <group
        position={[0, -2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setSwitchClosed(!switchClosed);
          onSelectComponent?.('switch');
        }}
      >
        {/* Terminals */}
        <mesh position={[-0.5, 0, 0]}><sphereGeometry args={[0.1, 12, 12]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
        <mesh position={[0.5, 0, 0]}><sphereGeometry args={[0.1, 12, 12]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
        {/* Switch Lever Blade */}
        <mesh
          position={[0, switchClosed ? 0 : 0.25, 0]}
          rotation={[0, 0, switchClosed ? 0 : 0.6]}
        >
          <boxGeometry args={[1.0, 0.08, 0.08]} />
          <meshStandardMaterial color={switchClosed ? '#22c55e' : '#f97316'} />
        </mesh>
        <Text position={[0, -0.6, 0]} fontSize={0.18} color="#e2e8f0">
          {switchClosed ? 'Switch: CLOSED (Click to open)' : 'Switch: OPEN (Click to close)'}
        </Text>
      </group>

      {/* Resistor (Right Side) */}
      <group
        position={[3, 0, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('resistor'); }}
      >
        <mesh>
          <boxGeometry args={[0.3, 0.9, 0.3]} />
          <meshStandardMaterial
            color={selectedComponentId === 'resistor' ? '#38bdf8' : '#e2e8f0'}
            roughness={0.5}
          />
        </mesh>
        <Text position={[0.7, 0, 0]} fontSize={0.2} color="#ffffff">
          10Ω Resistor
        </Text>
      </group>

      {/* Circulating Electron Particles */}
      <group ref={electronsRef}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={1.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

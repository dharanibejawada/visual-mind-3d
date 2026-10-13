import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  playbackSpeed?: number;
  isPlaying?: boolean;
}

export const BlackHoleVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const diskRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Generate accretion disk particle positions
  const particleCount = 2000;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const colorHot = new THREE.Color('#fef08a');
    const colorCool = new THREE.Color('#ea580c');

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 3.2;
      const angle = Math.random() * Math.PI * 2;
      const zOffset = (Math.random() - 0.5) * 0.15 * (radius / 2);

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = zOffset;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const lerpFactor = (radius - 1.3) / 3.2;
      const c = colorHot.clone().lerp(colorCool, lerpFactor);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (!isPlaying) return;
    const t = clock.getElapsedTime() * playbackSpeed;

    if (diskRef.current) {
      diskRef.current.rotation.y = t * 0.8;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Event Horizon: Pure Black Absorbent Core */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('event-horizon'); }}
      >
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial
          color={selectedComponentId === 'event-horizon' ? '#38bdf8' : '#030712'}
        />
      </mesh>

      {/* Photon Sphere Glow (Warped light bending around horizon) */}
      <mesh
        ref={ringRef}
        rotation={[Math.PI / 4, 0, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('photon-ring'); }}
      >
        <torusGeometry args={[1.2, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#fbbf24"
          emissiveIntensity={2}
          roughness={0.1}
        />
      </mesh>

      {/* Swirling Accretion Disk Particle Cloud */}
      <points
        ref={diskRef}
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('accretion-disk'); }}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Relativistic Jet Cones */}
      <mesh position={[0, 2.0, 0]}>
        <coneGeometry args={[0.2, 2.5, 16, 1, true]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -2.0, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.2, 2.5, 16, 1, true]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Annotations */}
      <Float speed={1} floatIntensity={0.1}>
        <Text position={[0, 3.4, 0]} fontSize={0.22} color="#ffffff">
          Relativistic Jet & Accretion Infall
        </Text>
      </Float>
    </group>
  );
};

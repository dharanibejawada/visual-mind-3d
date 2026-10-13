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

const PLANETS = [
  { id: 'mercury', name: 'Mercury', distance: 1.8, size: 0.12, speed: 4.15, color: '#94a3b8' },
  { id: 'venus', name: 'Venus', distance: 2.6, size: 0.22, speed: 1.62, color: '#f59e0b' },
  { id: 'earth', name: 'Earth', distance: 3.6, size: 0.25, speed: 1.0, color: '#38bdf8' },
  { id: 'mars', name: 'Mars', distance: 4.6, size: 0.16, speed: 0.53, color: '#ef4444' },
  { id: 'jupiter', name: 'Jupiter', distance: 6.2, size: 0.55, speed: 0.28, color: '#d97706' },
  { id: 'saturn', name: 'Saturn', distance: 8.0, size: 0.45, speed: 0.18, color: '#eab308', hasRings: true },
  { id: 'uranus', name: 'Uranus', distance: 9.8, size: 0.32, speed: 0.11, color: '#06b6d4' },
  { id: 'neptune', name: 'Neptune', distance: 11.4, size: 0.30, speed: 0.08, color: '#2563eb' },
];

export const SolarSystemVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const planetRefs = useRef<{ [key: string]: THREE.Group | null }>({});

  useFrame(({ clock }) => {
    if (!isPlaying) return;
    const t = clock.getElapsedTime() * playbackSpeed * 0.4;

    PLANETS.forEach((planet) => {
      const ref = planetRefs.current[planet.id];
      if (ref) {
        const angle = t * planet.speed;
        ref.position.x = Math.cos(angle) * planet.distance;
        ref.position.z = Math.sin(angle) * planet.distance;
        ref.rotation.y += 0.02;
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Sun */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('sun'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('sun'); }}
        onPointerOut={() => setHovered(null)}
      >
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color={selectedComponentId === 'sun' ? '#67e8f9' : '#fbbf24'}
          emissive="#f59e0b"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>
      <pointLight color="#fffbeb" intensity={2.5} distance={30} decay={1} />

      {/* Orbit Rings and Revolving Planets */}
      {PLANETS.map((planet) => {
        const isSelected = selectedComponentId === planet.id;
        const isHovered = hovered === planet.id;

        return (
          <React.Fragment key={planet.id}>
            {/* Orbital Path Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[planet.distance - 0.02, planet.distance + 0.02, 64]} />
              <meshBasicMaterial
                color={isSelected ? '#38bdf8' : '#334155'}
                side={THREE.DoubleSide}
                transparent
                opacity={isSelected ? 0.8 : 0.3}
              />
            </mesh>

            {/* Orbiting Planet Group */}
            <group
              ref={(el) => (planetRefs.current[planet.id] = el)}
              position={[planet.distance, 0, 0]}
              onClick={(e) => { e.stopPropagation(); onSelectComponent?.(planet.id); }}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(planet.id); }}
              onPointerOut={() => setHovered(null)}
            >
              {/* Planet Sphere */}
              <mesh>
                <sphereGeometry args={[planet.size, 24, 24]} />
                <meshStandardMaterial
                  color={isSelected ? '#38bdf8' : isHovered ? '#67e8f9' : planet.color}
                  roughness={0.4}
                  emissive={isSelected ? '#0284c7' : '#000000'}
                  emissiveIntensity={isSelected ? 0.5 : 0}
                />
              </mesh>

              {/* Saturn's Rings */}
              {planet.hasRings && (
                <mesh rotation={[Math.PI / 3, 0, 0]}>
                  <ringGeometry args={[planet.size * 1.4, planet.size * 2.3, 32]} />
                  <meshStandardMaterial
                    color="#fde047"
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.7}
                  />
                </mesh>
              )}

              {/* Planet Label */}
              <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
                <Text
                  position={[0, planet.size + 0.25, 0]}
                  fontSize={0.22}
                  color={isSelected ? '#38bdf8' : '#e2e8f0'}
                  anchorX="center"
                  anchorY="bottom"
                >
                  {planet.name}
                </Text>
              </Float>
            </group>
          </React.Fragment>
        );
      })}
    </group>
  );
};

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

export const AnimalVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const animalGroupRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Subtle breathing and prowling animation
  useFrame(({ clock }) => {
    if (!isPlaying || !animalGroupRef.current) return;
    const t = clock.getElapsedTime() * playbackSpeed;

    // Breathing motion on torso
    const breath = Math.sin(t * 2) * 0.03;
    animalGroupRef.current.position.y = breath;

    // Tail gentle sway
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(t * 2.5) * 0.2;
      tailRef.current.rotation.z = Math.cos(t * 1.8) * 0.1;
    }

    // Head subtle alertness motion
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.08;
    }
  });

  const getMaterial = (id: string, baseColor: string, emissiveColor: string = '#000000') => {
    const isSelected = selectedComponentId === id;
    const isHovered = hovered === id;
    return (
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : isHovered ? '#67e8f9' : baseColor}
        roughness={0.4}
        metalness={0.15}
        emissive={isSelected ? '#0284c7' : isHovered ? '#0891b2' : emissiveColor}
        emissiveIntensity={isSelected ? 0.7 : isHovered ? 0.4 : 0.1}
      />
    );
  };

  return (
    <group position={[0, -0.4, 0]}>
      <group ref={animalGroupRef}>
        {/* =========================================
            1. MUSCULAR TORSO & CAMOUFLAGE COAT
           ========================================= */}
        {/* Main Muscular Ribcage & Chest */}
        <mesh
          position={[0.3, 0.4, 0]}
          rotation={[0, 0, -0.05]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('tiger-musculature'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('tiger-musculature'); }}
          onPointerOut={() => setHovered(null)}
        >
          <capsuleGeometry args={[0.55, 1.2, 16, 32]} />
          {getMaterial('tiger-musculature', '#ea580c')}
        </mesh>

        {/* Hindquarters & Pelvic Musculature */}
        <mesh
          position={[-0.8, 0.45, 0]}
          rotation={[0, 0, 0.1]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('tiger-musculature'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('tiger-musculature'); }}
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[0.62, 24, 24]} />
          {getMaterial('tiger-musculature', '#d97706')}
        </mesh>

        {/* Disruptive Camouflage Stripes (Decorative Rings across Spine) */}
        {[-0.6, -0.3, 0.0, 0.3, 0.6].map((x, i) => (
          <mesh
            key={i}
            position={[x, 0.42, 0]}
            rotation={[0, 0, Math.PI / 2]}
            onClick={(e) => { e.stopPropagation(); onSelectComponent?.('tiger-coat'); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered('tiger-coat'); }}
            onPointerOut={() => setHovered(null)}
          >
            <torusGeometry args={[0.57, 0.04, 12, 32, Math.PI * 0.9]} />
            <meshStandardMaterial
              color={selectedComponentId === 'tiger-coat' ? '#38bdf8' : '#1c1917'}
              roughness={0.8}
            />
          </mesh>
        ))}

        {/* =========================================
            2. HEAD, NIGHT-VISION EYES, DENTITION
           ========================================= */}
        <group
          ref={headRef}
          position={[1.2, 0.75, 0]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('tiger-senses'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('tiger-senses'); }}
          onPointerOut={() => setHovered(null)}
        >
          {/* Cranium / Head Skull */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.42, 24, 24]} />
            {getMaterial('tiger-senses', '#ea580c')}
          </mesh>

          {/* Snout / Muzzle */}
          <mesh position={[0.3, -0.1, 0]}>
            <boxGeometry args={[0.38, 0.28, 0.35]} />
            {getMaterial('tiger-senses', '#fed7aa')}
          </mesh>

          {/* Nose Tip */}
          <mesh position={[0.5, -0.06, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#f43f5e" roughness={0.3} />
          </mesh>

          {/* Night-Vision Eyes with Tapetum Lucidum Glow */}
          <mesh position={[0.26, 0.12, 0.18]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#fef08a" emissive="#eab308" emissiveIntensity={1.2} />
          </mesh>
          <mesh position={[0.26, 0.12, -0.18]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#fef08a" emissive="#eab308" emissiveIntensity={1.2} />
          </mesh>

          {/* Predator Ears with Ocelli (White Spots on back) */}
          <mesh position={[-0.1, 0.35, 0.24]} rotation={[0.2, 0, -0.2]}>
            <coneGeometry args={[0.13, 0.25, 12]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[-0.1, 0.35, -0.24]} rotation={[-0.2, 0, -0.2]}>
            <coneGeometry args={[0.13, 0.25, 12]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>

          {/* Canine Dentition & Carnassial Teeth */}
          <group
            onClick={(e) => { e.stopPropagation(); onSelectComponent?.('tiger-canines'); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered('tiger-canines'); }}
            onPointerOut={() => setHovered(null)}
          >
            {/* Upper Canines */}
            <mesh position={[0.36, -0.25, 0.1]} rotation={[0, 0, 0.2]}>
              <coneGeometry args={[0.04, 0.14, 8]} />
              <meshStandardMaterial
                color={selectedComponentId === 'tiger-canines' ? '#38bdf8' : '#f8fafc'}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0.36, -0.25, -0.1]} rotation={[0, 0, 0.2]}>
              <coneGeometry args={[0.04, 0.14, 8]} />
              <meshStandardMaterial
                color={selectedComponentId === 'tiger-canines' ? '#38bdf8' : '#f8fafc'}
                roughness={0.2}
              />
            </mesh>
          </group>
        </group>

        {/* =========================================
            3. LIMBS & EXPLOSIVE LOCOMOTION
           ========================================= */}
        {/* Forelimb Left */}
        <mesh position={[0.65, -0.25, 0.3]} rotation={[0.05, 0, -0.05]}>
          <cylinderGeometry args={[0.14, 0.11, 0.8, 16]} />
          {getMaterial('tiger-musculature', '#ea580c')}
        </mesh>
        {/* Forelimb Right */}
        <mesh position={[0.65, -0.25, -0.3]} rotation={[-0.05, 0, -0.05]}>
          <cylinderGeometry args={[0.14, 0.11, 0.8, 16]} />
          {getMaterial('tiger-musculature', '#ea580c')}
        </mesh>
        {/* Hindlimb Left */}
        <mesh position={[-0.75, -0.25, 0.34]} rotation={[-0.1, 0, 0.1]}>
          <cylinderGeometry args={[0.18, 0.12, 0.85, 16]} />
          {getMaterial('tiger-musculature', '#d97706')}
        </mesh>
        {/* Hindlimb Right */}
        <mesh position={[-0.75, -0.25, -0.34]} rotation={[0.1, 0, 0.1]}>
          <cylinderGeometry args={[0.18, 0.12, 0.85, 16]} />
          {getMaterial('tiger-musculature', '#d97706')}
        </mesh>

        {/* Paws with Retractable Claws Base */}
        {[-0.75, 0.65].map((x, i) => (
          <React.Fragment key={i}>
            <mesh position={[x, -0.7, 0.32]}>
              <boxGeometry args={[0.26, 0.12, 0.22]} />
              <meshStandardMaterial color="#fed7aa" />
            </mesh>
            <mesh position={[x, -0.7, -0.32]}>
              <boxGeometry args={[0.26, 0.12, 0.22]} />
              <meshStandardMaterial color="#fed7aa" />
            </mesh>
          </React.Fragment>
        ))}

        {/* =========================================
            4. COUNTER-BALANCE TAIL
           ========================================= */}
        <group ref={tailRef} position={[-1.25, 0.6, 0]}>
          <mesh position={[-0.4, -0.3, 0]} rotation={[0, 0, -0.7]}>
            <cylinderGeometry args={[0.07, 0.05, 0.9, 12]} />
            <meshStandardMaterial color="#ea580c" roughness={0.5} />
          </mesh>
          {/* Black tip of the tail */}
          <mesh position={[-0.7, -0.65, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#1c1917" />
          </mesh>
        </group>

        {/* =========================================
            5. ECOLOGICAL FOREST HABITAT GROUND PLANE
           ========================================= */}
        <group
          position={[0, -0.78, 0]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('tiger-habitat'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('tiger-habitat'); }}
          onPointerOut={() => setHovered(null)}
        >
          {/* Forest Ground Disc */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[2.8, 32]} />
            <meshStandardMaterial
              color={selectedComponentId === 'tiger-habitat' ? '#0284c7' : '#14532d'}
              roughness={0.9}
            />
          </mesh>

          {/* Tropical Forest Flora Markers */}
          {[-1.6, 1.8, -0.9, 1.2].map((gx, idx) => (
            <mesh key={idx} position={[gx, 0.25, idx % 2 === 0 ? 1.4 : -1.4]}>
              <coneGeometry args={[0.18, 0.6, 8]} />
              <meshStandardMaterial color="#15803d" roughness={0.7} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Floating 3D Anatomical & Ecological Labels */}
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
        <Text position={[1.5, 1.6, 0]} fontSize={0.18} color="#facc15" anchorX="left">
          Sensory Acuity & Vision
        </Text>
        <Text position={[-0.2, 1.3, 0]} fontSize={0.18} color="#fb923c" anchorX="center">
          Muscular Skeletal Frame
        </Text>
        <Text position={[-1.6, 1.3, 0]} fontSize={0.18} color="#fdba74" anchorX="right">
          Counter-balance Tail
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.2} color="#4ade80" anchorX="center">
          Apex Predator Trophic Habitat
        </Text>
      </Float>
    </group>
  );
};

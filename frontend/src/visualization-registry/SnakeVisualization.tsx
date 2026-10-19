import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  playbackSpeed?: number;
  isPlaying?: boolean;
}

export const SnakeVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const jawRef = useRef<THREE.Group>(null);
  const tongueRef = useRef<THREE.Group>(null);
  const segmentsRef = useRef<(THREE.Group | null)[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  // Number of vertebral body segments along the serpentine S-curve
  const SEGMENT_COUNT = 24;

  // Base spine positions along a relaxed serpentine S-curve
  const segmentData = useMemo(() => {
    return Array.from({ length: SEGMENT_COUNT }, (_, i) => {
      const progress = i / (SEGMENT_COUNT - 1); // 0 (neck) to 1 (tail tip)
      // Taper radius: thickest around midbody (index 6-10), narrow at neck and tail
      let radius = 0.28;
      if (progress < 0.2) {
        radius = 0.16 + (progress / 0.2) * 0.12; // neck
      } else if (progress > 0.6) {
        radius = 0.28 * Math.pow(1 - (progress - 0.6) / 0.4, 0.8) + 0.04; // tail taper
      }

      // Initial resting S-curve layout
      const x = -1.8 + progress * 3.8;
      const z = Math.sin(progress * Math.PI * 2.2) * 0.85;

      return {
        index: i,
        progress,
        radius: Math.max(0.06, radius),
        length: 0.22,
        initialX: x,
        initialZ: z,
      };
    });
  }, []);

  // Real-time serpentine lateral undulation & tongue flicking animation
  useFrame(({ clock }) => {
    if (!isPlaying) return;
    const t = clock.getElapsedTime() * playbackSpeed;

    // 1. Serpentine Lateral Undulation along vertebrae
    segmentData.forEach((seg, i) => {
      const segGroup = segmentsRef.current[i];
      if (!segGroup) return;

      // Phase-delayed lateral traveling wave
      const phase = t * 2.6 - seg.progress * Math.PI * 3.2;
      const lateralAmplitude = 0.42 * (0.6 + seg.progress * 0.6); // stronger wave towards tail
      const lateralOffset = Math.sin(phase) * lateralAmplitude;

      segGroup.position.z = seg.initialZ + lateralOffset;
      // Gentle breathing pulsation
      const breath = Math.sin(t * 1.8 + i * 0.2) * 0.015;
      segGroup.position.y = 0.02 + breath;

      // Angle following the lateral wave gradient
      const tangent = Math.cos(phase);
      segGroup.rotation.y = tangent * 0.35;
    });

    // 2. Head alert motion following neck undulation
    if (headGroupRef.current) {
      const headPhase = t * 2.6;
      headGroupRef.current.position.z = Math.sin(headPhase) * 0.22;
      headGroupRef.current.rotation.y = Math.cos(headPhase) * 0.2 + Math.sin(t * 0.8) * 0.05;
      headGroupRef.current.rotation.x = -0.04 + Math.sin(t * 1.5) * 0.03;
    }

    // 3. Lower jaw subtle breathing / striking readiness
    if (jawRef.current) {
      const isFangsSelected = selectedComponentId === 'snake-fangs' || selectedComponentId === 'snake-jaw';
      const targetJawOpen = isFangsSelected ? 0.45 : 0.08 + Math.sin(t * 2) * 0.04;
      jawRef.current.rotation.x = targetJawOpen;
    }

    // 4. Chemosensory Forked Tongue Rapid Flickering Cycle
    if (tongueRef.current) {
      // Rapid intermittent flick cycle: active for 1.2s every 3s
      const cycle = t % 3.0;
      if (cycle < 1.2) {
        const flickSpeed = cycle * 18;
        tongueRef.current.visible = true;
        tongueRef.current.position.z = 0.45 + Math.sin(flickSpeed) * 0.18;
        tongueRef.current.position.y = -0.05 + Math.sin(flickSpeed * 2) * 0.06;
        tongueRef.current.rotation.x = Math.sin(flickSpeed * 2) * 0.25;
      } else {
        tongueRef.current.visible = selectedComponentId === 'snake-tongue';
        tongueRef.current.position.z = 0.35;
      }
    }
  });

  const getMaterial = (id: string, baseColor: string, emissiveColor: string = '#000000', metalness = 0.2, roughness = 0.35) => {
    const isSelected = selectedComponentId === id;
    const isHovered = hovered === id;
    return (
      <meshStandardMaterial
        color={isSelected ? '#38bdf8' : isHovered ? '#67e8f9' : baseColor}
        roughness={roughness}
        metalness={metalness}
        emissive={isSelected ? '#0284c7' : isHovered ? '#0891b2' : emissiveColor}
        emissiveIntensity={isSelected ? 0.85 : isHovered ? 0.45 : 0.15}
      />
    );
  };

  return (
    <group ref={rootGroupRef} position={[0, -0.2, 0]}>
      {/* ==============================================================
          1. SERPENT HEAD & CRANIAL APPARATUS
         ============================================================== */}
      <group
        ref={headGroupRef}
        position={[-1.95, 0.25, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('snake-jaw'); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('snake-jaw'); }}
        onPointerOut={() => setHovered(null)}
      >
        {/* Upper Cranial Skull (Broad Triangular Viper/Elapid Shape) */}
        <mesh position={[0, 0.08, 0.15]} rotation={[0.08, 0, 0]}>
          <coneGeometry args={[0.34, 0.65, 5]} />
          {getMaterial('snake-jaw', '#065f46', '#022c22', 0.25, 0.3)}
        </mesh>

        {/* Snout Apex Cap */}
        <mesh position={[0, 0.05, 0.48]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          {getMaterial('snake-jaw', '#047857')}
        </mesh>

        {/* ============================================================
            2. VENOM GLANDS & COMPRESSOR MUSCLES (Posterior Temporal)
           ============================================================ */}
        {[-0.24, 0.24].map((xSide, i) => (
          <group key={`gland-${i}`} position={[xSide, 0.12, -0.05]}>
            <mesh
              onClick={(e) => { e.stopPropagation(); onSelectComponent?.('snake-venom-glands'); }}
              onPointerOver={(e) => { e.stopPropagation(); setHovered('snake-venom-glands'); }}
              onPointerOut={() => setHovered(null)}
            >
              <sphereGeometry args={[0.14, 16, 16]} />
              {getMaterial('snake-venom-glands', '#9333ea', '#581c87', 0.3, 0.25)}
            </mesh>
            {/* Venom Delivery Duct leading towards fangs */}
            <mesh position={[-xSide * 0.25, -0.05, 0.22]} rotation={[0.4, 0, -xSide * 0.3]}>
              <cylinderGeometry args={[0.025, 0.025, 0.32, 8]} />
              {getMaterial('snake-venom-glands', '#c084fc', '#7e22ce')}
            </mesh>
          </group>
        ))}

        {/* ============================================================
            3. EYES & REPTILIAN SLIT PUPILS
           ============================================================ */}
        {[-0.22, 0.22].map((xSide, i) => (
          <group key={`eye-${i}`} position={[xSide, 0.14, 0.22]}>
            {/* Eyeball / Iris */}
            <mesh>
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.1} emissive="#d97706" emissiveIntensity={0.4} />
            </mesh>
            {/* Vertical Slit Pupil */}
            <mesh position={[xSide * 0.03, 0, 0.06]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.015, 0.09, 0.02]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            {/* Clear Spectacle Scale Shield */}
            <mesh position={[xSide * 0.01, 0, 0.04]}>
              <sphereGeometry args={[0.082, 16, 16]} />
              <meshPhysicalMaterial transparent opacity={0.35} roughness={0.05} transmission={0.9} />
            </mesh>
          </group>
        ))}

        {/* ============================================================
            4. INFRARED THERMAL HEAT PITS (Loreal Pit Organs)
           ============================================================ */}
        {[-0.18, 0.18].map((xSide, i) => (
          <group
            key={`pit-${i}`}
            position={[xSide, 0.06, 0.36]}
            onClick={(e) => { e.stopPropagation(); onSelectComponent?.('snake-heat-pits'); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered('snake-heat-pits'); }}
            onPointerOut={() => setHovered(null)}
          >
            {/* Recessed Thermal Cavity */}
            <mesh rotation={[0, xSide * 0.6, 0]}>
              <cylinderGeometry args={[0.04, 0.02, 0.06, 12]} />
              {getMaterial('snake-heat-pits', '#ef4444', '#b91c1c')}
            </mesh>
            {/* Internal Sensitive Infrared Thermal Receptor Membrane */}
            <mesh position={[0, 0, 0.01]}>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshStandardMaterial
                color="#f87171"
                emissive="#dc2626"
                emissiveIntensity={selectedComponentId === 'snake-heat-pits' ? 1.0 : 0.6}
              />
            </mesh>
          </group>
        ))}

        {/* ============================================================
            5. RETRACTABLE VENOM FANGS (Solenoglyphous Needle Teeth)
           ============================================================ */}
        {[-0.12, 0.12].map((xSide, i) => (
          <group
            key={`fang-${i}`}
            position={[xSide, -0.04, 0.34]}
            rotation={[0.3, 0, -xSide * 0.1]}
            onClick={(e) => { e.stopPropagation(); onSelectComponent?.('snake-fangs'); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered('snake-fangs'); }}
            onPointerOut={() => setHovered(null)}
          >
            {/* Curved Hollow Maxilla Needle Fang */}
            <mesh position={[0, -0.12, 0.04]} rotation={[-0.45, 0, 0]}>
              <coneGeometry args={[0.038, 0.28, 12]} />
              {getMaterial('snake-fangs', '#f8fafc', '#e2e8f0', 0.1, 0.1)}
            </mesh>
            {/* Glistening Venom Droplet at Fang Tip */}
            <mesh position={[0, -0.24, 0.1]}>
              <sphereGeometry args={[0.018, 12, 12]} />
              <meshStandardMaterial
                color="#a855f7"
                emissive="#9333ea"
                emissiveIntensity={selectedComponentId === 'snake-fangs' ? 1.2 : 0.6}
                transparent
                opacity={0.85}
              />
            </mesh>
          </group>
        ))}

        {/* ============================================================
            6. LOWER JAW (Unhinged Elastic Mandible)
           ============================================================ */}
        <group
          ref={jawRef}
          position={[0, -0.08, 0.02]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('snake-jaw'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('snake-jaw'); }}
          onPointerOut={() => setHovered(null)}
        >
          {/* Left Mandible */}
          <mesh position={[-0.12, 0, 0.22]} rotation={[-0.05, 0.18, 0]}>
            <capsuleGeometry args={[0.045, 0.42, 12, 16]} />
            {getMaterial('snake-jaw', '#047857')}
          </mesh>
          {/* Right Mandible */}
          <mesh position={[0.12, 0, 0.22]} rotation={[-0.05, -0.18, 0]}>
            <capsuleGeometry args={[0.045, 0.42, 12, 16]} />
            {getMaterial('snake-jaw', '#047857')}
          </mesh>
          {/* Elastic Mandibular Symphysis (Stretchable Chin Ligament) */}
          <mesh position={[0, 0, 0.42]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            {getMaterial('snake-jaw', '#eab308', '#ca8a04')}
          </mesh>
        </group>

        {/* ============================================================
            7. FORKED TONGUE & JACOBSON'S ORGAN
           ============================================================ */}
        <group
          ref={tongueRef}
          position={[0, -0.06, 0.38]}
          onClick={(e) => { e.stopPropagation(); onSelectComponent?.('snake-tongue'); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered('snake-tongue'); }}
          onPointerOut={() => setHovered(null)}
        >
          {/* Main Lingual Shaft */}
          <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.016, 0.022, 0.3, 8]} />
            {getMaterial('snake-tongue', '#dc2626', '#991b1b')}
          </mesh>
          {/* Left Bifurcated Fork Tip */}
          <mesh position={[-0.045, 0, 0.36]} rotation={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.008, 0.014, 0.16, 8]} />
            {getMaterial('snake-tongue', '#ef4444', '#b91c1c')}
          </mesh>
          {/* Right Bifurcated Fork Tip */}
          <mesh position={[0.045, 0, 0.36]} rotation={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.008, 0.014, 0.16, 8]} />
            {getMaterial('snake-tongue', '#ef4444', '#b91c1c')}
          </mesh>
        </group>
      </group>

      {/* ==============================================================
          8. ARTICULATED VERTEBRAL COLUMN & SCALED BODY SEGMENTS
         ============================================================== */}
      {segmentData.map((seg, i) => {
        const isSpineSelected = selectedComponentId === 'snake-spine';
        const isScalesSelected = selectedComponentId === 'snake-scales';
        const isDiamondMarking = i % 2 === 0;

        return (
          <group
            key={`seg-${i}`}
            ref={(el) => (segmentsRef.current[i] = el)}
            position={[seg.initialX, 0, seg.initialZ]}
          >
            {/* Main Muscular Vertebral Body Segment */}
            <mesh
              rotation={[0, 0, Math.PI / 2]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.(isSpineSelected ? 'snake-spine' : 'snake-scales');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered('snake-scales');
              }}
              onPointerOut={() => setHovered(null)}
            >
              <capsuleGeometry args={[seg.radius, seg.length, 14, 20]} />
              {getMaterial(
                'snake-scales',
                isDiamondMarking ? '#047857' : '#065f46',
                '#022c22',
                0.3,
                0.35
              )}
            </mesh>

            {/* Dorsal Diamond Scale Crest Pattern */}
            <mesh position={[0, seg.radius * 0.75, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[seg.length * 0.65, 0.04, seg.radius * 0.6]} />
              <meshStandardMaterial
                color={isDiamondMarking ? '#d97706' : '#78350f'}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>

            {/* Ventral Locomotion Belly Scutes (Smooth Traction Plates) */}
            <mesh position={[0, -seg.radius * 0.85, 0]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[seg.length * 0.9, 0.03, seg.radius * 1.3]} />
              <meshStandardMaterial
                color="#fef08a"
                roughness={0.25}
                metalness={0.15}
              />
            </mesh>

            {/* Visible Vertebral Joint Core & Rib Markers (When Snake Spine is inspected) */}
            {(isSpineSelected || hovered === 'snake-spine') && (
              <group position={[0, 0, 0]}>
                {/* Procoelous Vertebra Ball-and-Socket Centrum */}
                <mesh
                  onClick={(e) => { e.stopPropagation(); onSelectComponent?.('snake-spine'); }}
                >
                  <sphereGeometry args={[seg.radius * 0.48, 12, 12]} />
                  <meshStandardMaterial
                    color="#38bdf8"
                    emissive="#0284c7"
                    emissiveIntensity={0.8}
                    wireframe
                  />
                </mesh>
                {/* Bilateral Articulated Rib Pair */}
                {[-1, 1].map((side) => (
                  <mesh
                    key={`rib-${side}`}
                    position={[0, -seg.radius * 0.25, side * seg.radius * 0.65]}
                    rotation={[side * 0.6, 0, 0]}
                  >
                    <torusGeometry args={[seg.radius * 0.6, 0.02, 8, 16, Math.PI * 0.6]} />
                    <meshStandardMaterial color="#67e8f9" emissive="#0ea5e9" emissiveIntensity={0.6} />
                  </mesh>
                ))}
              </group>
            )}
          </group>
        );
      })}

      {/* ==============================================================
          9. GROUND SHADOW & REPTILIAN HABITAT SUBSTRATE
         ============================================================== */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.2, 48]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Soft Decorative Ambient Terrain Ripple */}
      <mesh position={[0, -0.055, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 3.2, 48]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.12} wireframe />
      </mesh>

      {/* Floating Active Inspector Badge */}
      {selectedComponentId && (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <group position={[0, 1.4, 0]}>
            <Text
              fontSize={0.18}
              color="#38bdf8"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#0284c7"
            >
              {selectedComponentId.replace('snake-', '').toUpperCase().replace('-', ' ')}
            </Text>
          </group>
        </Float>
      )}
    </group>
  );
};

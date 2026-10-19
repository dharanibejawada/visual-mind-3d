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

export const ButterflyVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const leftWingHingeRef = useRef<THREE.Group>(null);
  const rightWingHingeRef = useRef<THREE.Group>(null);
  const leftHindwingHingeRef = useRef<THREE.Group>(null);
  const rightHindwingHingeRef = useRef<THREE.Group>(null);
  const proboscisRef = useRef<THREE.Group>(null);
  const antennaeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Generate procedural organic wing shapes
  const { forewingShape, hindwingShape } = useMemo(() => {
    // Forewing: Large aerodynamic triangular dorsal wing with arched costa and rounded apex
    const fw = new THREE.Shape();
    fw.moveTo(0, 0);
    fw.bezierCurveTo(0.3, 0.8, 1.2, 2.2, 2.2, 2.5); // Arched coastal margin to apex
    fw.bezierCurveTo(2.4, 2.3, 2.3, 1.4, 1.8, 0.6); // Outer margin
    fw.bezierCurveTo(1.4, 0.1, 0.8, -0.2, 0, 0); // Inner margin back to thorax hinge

    // Hindwing: Smaller scalloped teardrop wing with aerodynamic anal fold
    const hw = new THREE.Shape();
    hw.moveTo(0, 0);
    hw.bezierCurveTo(0.4, -0.2, 1.4, -0.3, 1.6, -1.2); // Outer curved edge
    hw.bezierCurveTo(1.5, -1.8, 0.8, -2.0, 0.3, -1.6); // Scalloped lower margin
    hw.bezierCurveTo(0.1, -1.2, 0.05, -0.6, 0, 0); // Inner margin back to hinge

    return { forewingShape: fw, hindwingShape: hw };
  }, []);

  // Real-time biological wing flapping, antenna tremor, and gentle hovering
  useFrame(({ clock }) => {
    if (!isPlaying) return;
    const t = clock.getElapsedTime() * playbackSpeed;

    // Harmonic flapping stroke: 4 Hz frequency with natural aerodynamic flap angle (-45° to +65°)
    const flapFrequency = 5.5;
    const flapAngle = Math.sin(t * flapFrequency) * 0.85;
    const hindwingLag = Math.sin(t * flapFrequency - 0.35) * 0.75; // Phase lag between fore and hind wings

    if (leftWingHingeRef.current) {
      leftWingHingeRef.current.rotation.z = -flapAngle;
    }
    if (rightWingHingeRef.current) {
      rightWingHingeRef.current.rotation.z = flapAngle;
    }
    if (leftHindwingHingeRef.current) {
      leftHindwingHingeRef.current.rotation.z = -hindwingLag;
    }
    if (rightHindwingHingeRef.current) {
      rightHindwingHingeRef.current.rotation.z = hindwingLag;
    }

    // Micro-tremor on antennae (chemosensory air sniffing)
    if (antennaeRef.current) {
      antennaeRef.current.rotation.x = Math.sin(t * 8) * 0.05;
      antennaeRef.current.rotation.y = Math.cos(t * 7) * 0.04;
    }

    // Gentle vertical bobbing & pitch drift (natural airborne levitation)
    if (rootGroupRef.current) {
      rootGroupRef.current.position.y = Math.sin(t * 2.5) * 0.12;
      rootGroupRef.current.rotation.x = Math.sin(t * 1.8) * 0.04;
      rootGroupRef.current.rotation.y = Math.sin(t * 1.2) * 0.06;
    }
  });

  const getHighlightColor = (componentId: string, baseColor: string) => {
    if (selectedComponentId === componentId) return '#38bdf8';
    if (hovered === componentId) return '#7dd3fc';
    return baseColor;
  };

  const getEmissive = (componentId: string, defaultEmissive = '#000000') => {
    if (selectedComponentId === componentId) return '#0284c7';
    if (hovered === componentId) return '#0369a1';
    return defaultEmissive;
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Studio Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.3} castShadow />
      <directionalLight position={[-5, 4, -4]} intensity={0.6} color="#38bdf8" />
      <pointLight position={[0, 2, 3]} intensity={0.8} color="#f59e0b" distance={8} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={rootGroupRef} position={[0, 0, 0]}>

          {/* ================================================================ */}
          {/* 1. THORAX (CENTRAL FLIGHT MOTOR)                                */}
          {/* ================================================================ */}
          <group
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('thorax');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('thorax');
            }}
            onPointerOut={() => setHovered(null)}
          >
            {/* Chitinous Mesothorax / Metathorax */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <capsuleGeometry args={[0.22, 0.7, 16, 24]} />
              <meshStandardMaterial
                color={getHighlightColor('thorax', '#1e1b4b')}
                emissive={getEmissive('thorax', '#0f172a')}
                emissiveIntensity={selectedComponentId === 'thorax' ? 0.8 : 0.2}
                roughness={0.4}
                metalness={0.3}
              />
            </mesh>

            {/* Thoracic Flight Dorsal Shield (Notum) */}
            <mesh position={[0, 0.12, 0.1]} scale={[0.26, 0.5, 0.12]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial
                color={getHighlightColor('thorax', '#312e81')}
                roughness={0.5}
              />
            </mesh>

            {selectedComponentId === 'thorax' && (
              <Text position={[0, 0.75, 0]} fontSize={0.2} color="#38bdf8" anchorX="center" anchorY="middle">
                Thorax (Flight Powerhouse)
              </Text>
            )}
          </group>

          {/* ================================================================ */}
          {/* 2. HEAD & SENSORY STRUCTURES                                    */}
          {/* ================================================================ */}
          <group
            position={[0, 0.58, 0.05]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('head_eyes');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('head_eyes');
            }}
            onPointerOut={() => setHovered(null)}
          >
            {/* Cranial Capsule */}
            <mesh castShadow>
              <sphereGeometry args={[0.18, 20, 20]} />
              <meshStandardMaterial
                color={getHighlightColor('head_eyes', '#0f172a')}
                emissive={getEmissive('head_eyes')}
                roughness={0.3}
              />
            </mesh>

            {/* Left Compound Eye (Faceted Ommatidia) */}
            <mesh position={[-0.14, 0.04, 0.06]} rotation={[0, -0.4, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color={getHighlightColor('head_eyes', '#78350f')}
                emissive={selectedComponentId === 'head_eyes' ? '#b45309' : '#000000'}
                roughness={0.2}
                metalness={0.7}
              />
            </mesh>

            {/* Right Compound Eye */}
            <mesh position={[0.14, 0.04, 0.06]} rotation={[0, 0.4, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color={getHighlightColor('head_eyes', '#78350f')}
                emissive={selectedComponentId === 'head_eyes' ? '#b45309' : '#000000'}
                roughness={0.2}
                metalness={0.7}
              />
            </mesh>

            {selectedComponentId === 'head_eyes' && (
              <Text position={[0, 0.45, 0]} fontSize={0.18} color="#38bdf8" anchorX="center" anchorY="middle">
                Compound Eyes (Ommatidia)
              </Text>
            )}
          </group>

          {/* ================================================================ */}
          {/* 3. ANTENNAE (CHEMOSENSORY CLUBS)                                */}
          {/* ================================================================ */}
          <group
            ref={antennaeRef}
            position={[0, 0.72, 0.1]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('antennae');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('antennae');
            }}
            onPointerOut={() => setHovered(null)}
          >
            {/* Left Antenna Stem */}
            <mesh position={[-0.22, 0.35, 0.1]} rotation={[0.2, 0, 0.35]}>
              <cylinderGeometry args={[0.015, 0.012, 0.8, 12]} />
              <meshStandardMaterial color={getHighlightColor('antennae', '#0284c7')} />
            </mesh>
            {/* Left Antenna Club Tip */}
            <mesh position={[-0.38, 0.75, 0.22]} rotation={[0, 0, 0.3]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial color={getHighlightColor('antennae', '#f59e0b')} />
            </mesh>

            {/* Right Antenna Stem */}
            <mesh position={[0.22, 0.35, 0.1]} rotation={[0.2, 0, -0.35]}>
              <cylinderGeometry args={[0.015, 0.012, 0.8, 12]} />
              <meshStandardMaterial color={getHighlightColor('antennae', '#0284c7')} />
            </mesh>
            {/* Right Antenna Club Tip */}
            <mesh position={[0.38, 0.75, 0.22]} rotation={[0, 0, -0.3]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial color={getHighlightColor('antennae', '#f59e0b')} />
            </mesh>

            {selectedComponentId === 'antennae' && (
              <Text position={[0, 0.95, 0]} fontSize={0.18} color="#f59e0b" anchorX="center" anchorY="middle">
                Clubbed Antennae (Chemosensors)
              </Text>
            )}
          </group>

          {/* ================================================================ */}
          {/* 4. PROBOSCIS (COILED NECTAR FEEDING STRAW)                      */}
          {/* ================================================================ */}
          <group
            ref={proboscisRef}
            position={[0, 0.48, 0.2]}
            rotation={[Math.PI / 3, 0, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('proboscis');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('proboscis');
            }}
            onPointerOut={() => setHovered(null)}
          >
            {/* Coiled Spiral Spring representation */}
            <mesh>
              <torusGeometry args={[0.12, 0.025, 12, 32, Math.PI * 1.7]} />
              <meshStandardMaterial
                color={getHighlightColor('proboscis', '#f97316')}
                emissive={getEmissive('proboscis')}
                roughness={0.3}
              />
            </mesh>

            {selectedComponentId === 'proboscis' && (
              <Text position={[0, -0.3, 0]} fontSize={0.16} color="#f97316" anchorX="center" anchorY="middle">
                Coiled Proboscis (Nectar Suction)
              </Text>
            )}
          </group>

          {/* ================================================================ */}
          {/* 5. ABDOMEN (RESPIRATORY & DIGESTIVE TUBE)                      */}
          {/* ================================================================ */}
          <group
            position={[0, -0.7, -0.05]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('abdomen');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered('abdomen');
            }}
            onPointerOut={() => setHovered(null)}
          >
            {/* Tapered multi-segmented abdominal cylinder */}
            <mesh castShadow receiveShadow>
              <capsuleGeometry args={[0.16, 0.9, 16, 24]} />
              <meshStandardMaterial
                color={getHighlightColor('abdomen', '#1e293b')}
                emissive={getEmissive('abdomen', '#0f172a')}
                emissiveIntensity={selectedComponentId === 'abdomen' ? 0.8 : 0.2}
                roughness={0.5}
              />
            </mesh>

            {/* Abdominal segments segmentation rings */}
            {[-0.3, -0.15, 0, 0.15, 0.3].map((y, idx) => (
              <mesh key={idx} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.165, 0.015, 8, 24]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.6} />
              </mesh>
            ))}

            {selectedComponentId === 'abdomen' && (
              <Text position={[0, -0.75, 0]} fontSize={0.18} color="#38bdf8" anchorX="center" anchorY="middle">
                Segmented Abdomen (Spiracles & Digestion)
              </Text>
            )}
          </group>

          {/* ================================================================ */}
          {/* 6. SIX ARTICULATED WALKING LEGS                                */}
          {/* ================================================================ */}
          <group position={[0, -0.05, -0.15]}>
            {/* Left Legs */}
            {[-0.2, 0, 0.2].map((y, idx) => (
              <group key={`l-leg-${idx}`} position={[-0.15, y, 0]}>
                {/* Femur */}
                <mesh position={[-0.2, -0.1, 0]} rotation={[0, 0, 0.6]}>
                  <cylinderGeometry args={[0.02, 0.015, 0.45, 8]} />
                  <meshStandardMaterial color="#334155" />
                </mesh>
                {/* Tibia & Tarsus */}
                <mesh position={[-0.38, -0.32, 0]} rotation={[0, 0, -0.5]}>
                  <cylinderGeometry args={[0.015, 0.01, 0.5, 8]} />
                  <meshStandardMaterial color="#475569" />
                </mesh>
              </group>
            ))}

            {/* Right Legs */}
            {[-0.2, 0, 0.2].map((y, idx) => (
              <group key={`r-leg-${idx}`} position={[0.15, y, 0]}>
                {/* Femur */}
                <mesh position={[0.2, -0.1, 0]} rotation={[0, 0, -0.6]}>
                  <cylinderGeometry args={[0.02, 0.015, 0.45, 8]} />
                  <meshStandardMaterial color="#334155" />
                </mesh>
                {/* Tibia & Tarsus */}
                <mesh position={[0.38, -0.32, 0]} rotation={[0, 0, 0.5]}>
                  <cylinderGeometry args={[0.015, 0.01, 0.5, 8]} />
                  <meshStandardMaterial color="#475569" />
                </mesh>
              </group>
            ))}
          </group>

          {/* ================================================================ */}
          {/* 7. WINGS (LEFT & RIGHT FOREWINGS & HINDWINGS WITH FLAPPING HINGE) */}
          {/* ================================================================ */}

          {/* --- LEFT WINGS HINGE (Anchored at Left Thoracic Ridge) --- */}
          <group ref={leftWingHingeRef} position={[-0.18, 0.1, 0.05]}>
            {/* Left Forewing */}
            <group
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('forewing_left');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered('forewing_left');
              }}
              onPointerOut={() => setHovered(null)}
              position={[0, 0, 0]}
              rotation={[0, 0, 0.1]}
              scale={[-1, 1, 1]} // Mirrored left
            >
              {/* Main Membrane */}
              <mesh castShadow receiveShadow>
                <shapeGeometry args={[forewingShape]} />
                <meshStandardMaterial
                  color={getHighlightColor('forewing_left', '#ea580c')}
                  emissive={getEmissive('forewing_left', '#c2410c')}
                  emissiveIntensity={selectedComponentId === 'forewing_left' ? 0.7 : 0.25}
                  roughness={0.25}
                  side={THREE.DoubleSide}
                />
              </mesh>

              {/* Structural Black Marginal Border */}
              <mesh position={[0, 0, -0.002]}>
                <shapeGeometry args={[forewingShape]} />
                <meshStandardMaterial
                  color="#0f172a"
                  roughness={0.4}
                  wireframe
                  side={THREE.DoubleSide}
                />
              </mesh>

              {/* Monarch Vein Lines & Structural Tracheae */}
              {[
                [[0, 0, 0.005], [0.8, 1.2, 0.005], [1.8, 1.8, 0.005]],
                [[0, 0, 0.005], [1.1, 0.7, 0.005], [2.1, 1.1, 0.005]],
                [[0, 0, 0.005], [0.9, 0.2, 0.005], [1.7, 0.3, 0.005]],
              ].map((curvePoints, idx) => (
                <mesh key={`l-fw-vein-${idx}`}>
                  <tubeGeometry
                    args={[
                      new THREE.CatmullRomCurve3(curvePoints.map((p) => new THREE.Vector3(...p))),
                      16,
                      0.015,
                      6,
                      false,
                    ]}
                  />
                  <meshStandardMaterial color="#1e1b4b" roughness={0.3} />
                </mesh>
              ))}

              {/* White Marginal Apex Spots */}
              {[
                [1.9, 2.2, 0.008],
                [2.1, 1.9, 0.008],
                [2.0, 1.5, 0.008],
                [1.7, 1.0, 0.008],
              ].map((pos, idx) => (
                <mesh key={`l-fw-spot-${idx}`} position={pos as [number, number, number]}>
                  <sphereGeometry args={[0.045, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              ))}

              {selectedComponentId === 'forewing_left' && (
                <Text position={[1.2, 1.5, 0.1]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
                  Left Forewing (Chitinous Scales)
                </Text>
              )}
            </group>
          </group>

          {/* Left Hindwing Hinge */}
          <group ref={leftHindwingHingeRef} position={[-0.16, -0.15, 0.02]}>
            <group
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('hindwing_left');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered('hindwing_left');
              }}
              onPointerOut={() => setHovered(null)}
              position={[0, 0, 0]}
              scale={[-1, 1, 1]}
            >
              <mesh castShadow receiveShadow>
                <shapeGeometry args={[hindwingShape]} />
                <meshStandardMaterial
                  color={getHighlightColor('hindwing_left', '#f97316')}
                  emissive={getEmissive('hindwing_left', '#ea580c')}
                  emissiveIntensity={selectedComponentId === 'hindwing_left' ? 0.7 : 0.2}
                  roughness={0.28}
                  side={THREE.DoubleSide}
                />
              </mesh>

              {/* Scalloped Margin Trim */}
              <mesh position={[0, 0, -0.002]}>
                <shapeGeometry args={[hindwingShape]} />
                <meshStandardMaterial color="#020617" wireframe side={THREE.DoubleSide} />
              </mesh>

              {selectedComponentId === 'hindwing_left' && (
                <Text position={[0.8, -1.0, 0.1]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
                  Left Hindwing (Lift & Steering)
                </Text>
              )}
            </group>
          </group>

          {/* --- RIGHT WINGS HINGE (Anchored at Right Thoracic Ridge) --- */}
          <group ref={rightWingHingeRef} position={[0.18, 0.1, 0.05]}>
            {/* Right Forewing */}
            <group
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('forewing_right');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered('forewing_right');
              }}
              onPointerOut={() => setHovered(null)}
              position={[0, 0, 0]}
              rotation={[0, 0, -0.1]}
            >
              <mesh castShadow receiveShadow>
                <shapeGeometry args={[forewingShape]} />
                <meshStandardMaterial
                  color={getHighlightColor('forewing_right', '#ea580c')}
                  emissive={getEmissive('forewing_right', '#c2410c')}
                  emissiveIntensity={selectedComponentId === 'forewing_right' ? 0.7 : 0.25}
                  roughness={0.25}
                  side={THREE.DoubleSide}
                />
              </mesh>

              {/* Structural Black Marginal Border */}
              <mesh position={[0, 0, -0.002]}>
                <shapeGeometry args={[forewingShape]} />
                <meshStandardMaterial
                  color="#0f172a"
                  roughness={0.4}
                  wireframe
                  side={THREE.DoubleSide}
                />
              </mesh>

              {/* Monarch Vein Lines */}
              {[
                [[0, 0, 0.005], [0.8, 1.2, 0.005], [1.8, 1.8, 0.005]],
                [[0, 0, 0.005], [1.1, 0.7, 0.005], [2.1, 1.1, 0.005]],
                [[0, 0, 0.005], [0.9, 0.2, 0.005], [1.7, 0.3, 0.005]],
              ].map((curvePoints, idx) => (
                <mesh key={`r-fw-vein-${idx}`}>
                  <tubeGeometry
                    args={[
                      new THREE.CatmullRomCurve3(curvePoints.map((p) => new THREE.Vector3(...p))),
                      16,
                      0.015,
                      6,
                      false,
                    ]}
                  />
                  <meshStandardMaterial color="#1e1b4b" roughness={0.3} />
                </mesh>
              ))}

              {/* White Marginal Apex Spots */}
              {[
                [1.9, 2.2, 0.008],
                [2.1, 1.9, 0.008],
                [2.0, 1.5, 0.008],
                [1.7, 1.0, 0.008],
              ].map((pos, idx) => (
                <mesh key={`r-fw-spot-${idx}`} position={pos as [number, number, number]}>
                  <sphereGeometry args={[0.045, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              ))}

              {selectedComponentId === 'forewing_right' && (
                <Text position={[1.2, 1.5, 0.1]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
                  Right Forewing (Chitinous Scales)
                </Text>
              )}
            </group>
          </group>

          {/* Right Hindwing Hinge */}
          <group ref={rightHindwingHingeRef} position={[0.16, -0.15, 0.02]}>
            <group
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('hindwing_right');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered('hindwing_right');
              }}
              onPointerOut={() => setHovered(null)}
              position={[0, 0, 0]}
            >
              <mesh castShadow receiveShadow>
                <shapeGeometry args={[hindwingShape]} />
                <meshStandardMaterial
                  color={getHighlightColor('hindwing_right', '#f97316')}
                  emissive={getEmissive('hindwing_right', '#ea580c')}
                  emissiveIntensity={selectedComponentId === 'hindwing_right' ? 0.7 : 0.2}
                  roughness={0.28}
                  side={THREE.DoubleSide}
                />
              </mesh>

              <mesh position={[0, 0, -0.002]}>
                <shapeGeometry args={[hindwingShape]} />
                <meshStandardMaterial color="#020617" wireframe side={THREE.DoubleSide} />
              </mesh>

              {selectedComponentId === 'hindwing_right' && (
                <Text position={[0.8, -1.0, 0.1]} fontSize={0.18} color="#ffffff" anchorX="center" anchorY="middle">
                  Right Hindwing (Lift & Steering)
                </Text>
              )}
            </group>
          </group>

        </group>
      </Float>

      {/* Decorative Ground Shadow Ring */}
      <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.8, 36]} />
        <meshBasicMaterial color="#0369a1" transparent opacity={0.18} />
      </mesh>
    </group>
  );
};

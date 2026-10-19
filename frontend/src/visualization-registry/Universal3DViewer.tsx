import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { VisualizationSpec, SceneObject3D, SceneConnection3D, InteractiveElement } from '../types';

interface Props {
  visualization: VisualizationSpec;
  activeStepIndex?: number;
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  playbackSpeed?: number;
  isPlaying?: boolean;
}

export const Universal3DViewer: React.FC<Props> = ({
  visualization,
  activeStepIndex = 0,
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Extract scene specification from visualization.scene or parameters.scene
  const scene = useMemo(() => {
    if (visualization.scene && visualization.scene.objects && visualization.scene.objects.length > 0) {
      return visualization.scene;
    }
    if (visualization.parameters?.scene && visualization.parameters.scene.objects?.length > 0) {
      return visualization.parameters.scene;
    }

    // Fallback if no scene object was provided: construct a structured 3D conceptual scene
    // from interactiveElements and steps so it's NEVER empty and NEVER a flat 2D diagram!
    const elements = visualization.interactiveElements || [];
    const generatedObjects: SceneObject3D[] = elements.length > 0
      ? elements.map((el: InteractiveElement, idx: number) => {
          const total = elements.length;
          const angle = (idx / total) * Math.PI * 2;
          const radius = total === 1 ? 0 : total <= 3 ? 1.6 : 2.4;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const geometries: SceneObject3D['geometry'][] = ['box', 'sphere', 'cylinder', 'capsule', 'torus'];
          const geom = geometries[idx % geometries.length];

          return {
            id: el.id,
            name: el.label,
            geometry: geom,
            position: [x, 0.4, z],
            dimensions: [0.55, 0.7, 0.55],
            color: el.color || '#38bdf8',
            label: el.label,
            description: el.description,
            animation: {
              type: 'float',
              speed: 1.2 + idx * 0.2,
              amplitude: 0.08,
            },
          };
        })
      : [
          {
            id: 'central-concept',
            name: visualization.title || 'Core Concept',
            geometry: 'sphere',
            position: [0, 0.5, 0],
            dimensions: [0.8, 32, 32],
            color: '#38bdf8',
            label: visualization.title,
            description: visualization.description,
            animation: { type: 'pulse', speed: 1.5, amplitude: 0.1 },
          },
        ];

    const generatedConnections: SceneConnection3D[] = [];
    if (generatedObjects.length > 1) {
      for (let i = 0; i < generatedObjects.length; i++) {
        const nextIdx = (i + 1) % generatedObjects.length;
        generatedConnections.push({
          id: `conn-${i}-${nextIdx}`,
          fromId: generatedObjects[i].id,
          toId: generatedObjects[nextIdx].id,
          type: 'tube',
          color: '#38bdf8',
          animatedFlow: true,
        });
      }
    }

    return {
      category: 'conceptual_system' as const,
      topic: visualization.title,
      metaphor: '3D Spatial Conceptual System',
      cameraPreset: [0, 2.8, 7.5] as [number, number, number],
      environmentLighting: 'studio' as const,
      groundPlane: { show: true, type: 'circular_shadow' as const, color: '#0f172a' },
      objects: generatedObjects,
      connections: generatedConnections,
    };
  }, [visualization]);

  // Map of object IDs to positions for drawing connections
  const objectPositions = useMemo(() => {
    const map = new Map<string, [number, number, number]>();
    scene.objects.forEach((obj: SceneObject3D) => {
      map.set(obj.id, obj.position);
    });
    return map;
  }, [scene.objects]);

  // Current active step highlights
  const currentStep = visualization.steps[activeStepIndex] || visualization.steps[0];
  const stepHighlightIds = useMemo(() => {
    return new Set(currentStep?.highlightIds || []);
  }, [currentStep]);

  return (
    <group position={[0, -0.2, 0]}>
      {/* Dynamic Lighting Setup */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-6, 5, -5]} intensity={0.5} color="#818cf8" />
      <pointLight position={[0, 4, 0]} intensity={0.8} color="#38bdf8" distance={10} />

      {/* Render 3D Scene Objects */}
      {scene.objects.map((obj: SceneObject3D) => (
        <SceneObjectRenderer
          key={obj.id}
          object={obj}
          isSelected={selectedComponentId === obj.id}
          isStepHighlighted={stepHighlightIds.has(obj.id)}
          isHovered={hovered === obj.id}
          showLabel={showLabels}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          onSelect={() => onSelectComponent?.(obj.id)}
          onHover={(hover) => setHovered(hover ? obj.id : null)}
        />
      ))}

      {/* Render 3D Connections between Objects */}
      {scene.connections?.map((conn: SceneConnection3D) => {
        const fromPos = objectPositions.get(conn.fromId);
        const toPos = objectPositions.get(conn.toId);
        if (!fromPos || !toPos) return null;

        return (
          <SceneConnectionRenderer
            key={conn.id}
            connection={conn}
            fromPos={fromPos}
            toPos={toPos}
            isPlaying={isPlaying}
            playbackSpeed={playbackSpeed}
          />
        );
      })}

      {/* Ground Plane Support */}
      {scene.groundPlane?.show !== false && (
        <group position={[0, -0.05, 0]}>
          {scene.groundPlane?.type === 'grid' ? (
            <gridHelper args={[16, 16, '#0284c7', '#334155']} position={[0, 0, 0]} />
          ) : scene.groundPlane?.type === 'checkerboard' ? (
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[16, 16]} />
              <meshStandardMaterial color="#1e293b" roughness={0.8} />
            </mesh>
          ) : (
            <>
              {/* Circular soft ambient shadow */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <circleGeometry args={[4.2, 48]} />
                <meshStandardMaterial
                  color={scene.groundPlane?.color || '#090e17'}
                  roughness={0.9}
                  metalness={0.1}
                  transparent
                  opacity={0.65}
                />
              </mesh>
              {/* Decorative subtle ring */}
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3.2, 4.2, 48]} />
                <meshBasicMaterial color="#0284c7" transparent opacity={0.12} wireframe />
              </mesh>
            </>
          )}
        </group>
      )}
    </group>
  );
};

// ============================================================================
// INDIVIDUAL 3D OBJECT RENDERER WITH PROCEDURAL GEOMETRIES & ANIMATIONS
// ============================================================================
interface ObjectRendererProps {
  object: SceneObject3D;
  isSelected: boolean;
  isStepHighlighted: boolean;
  isHovered: boolean;
  showLabel: boolean;
  isPlaying: boolean;
  playbackSpeed: number;
  onSelect: () => void;
  onHover: (hover: boolean) => void;
}

const SceneObjectRenderer: React.FC<ObjectRendererProps> = ({
  object,
  isSelected,
  isStepHighlighted,
  isHovered,
  showLabel,
  isPlaying,
  playbackSpeed,
  onSelect,
  onHover,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const initialPos = useRef<[number, number, number]>(object.position);
  const initialRot = useRef<[number, number, number]>(object.rotation || [0, 0, 0]);

  // Execute real-time procedural animations based on object.animation specification
  useFrame(({ clock }) => {
    if (!isPlaying || !meshRef.current || !object.animation) return;
    const t = clock.getElapsedTime() * playbackSpeed * (object.animation.speed || 1);
    const amp = object.animation.amplitude ?? 0.15;
    const axis = object.animation.axis || 'y';

    switch (object.animation.type) {
      case 'rotate':
        if (axis === 'x') meshRef.current.rotation.x += 0.015 * playbackSpeed * (object.animation.speed || 1);
        else if (axis === 'z') meshRef.current.rotation.z += 0.015 * playbackSpeed * (object.animation.speed || 1);
        else meshRef.current.rotation.y += 0.015 * playbackSpeed * (object.animation.speed || 1);
        break;

      case 'oscillate':
        if (axis === 'x') meshRef.current.position.x = initialPos.current[0] + Math.sin(t) * amp;
        else if (axis === 'z') meshRef.current.position.z = initialPos.current[2] + Math.sin(t) * amp;
        else meshRef.current.position.y = initialPos.current[1] + Math.sin(t) * amp;
        break;

      case 'pulse': {
        const scale = 1 + Math.sin(t * 2) * (amp * 0.5);
        meshRef.current.scale.set(scale, scale, scale);
        break;
      }

      case 'piston':
        // Reciprocating linear stroke
        meshRef.current.position.y = initialPos.current[1] + Math.sin(t * 3) * (amp * 1.5);
        break;

      case 'orbit': {
        const r = amp || 2.0;
        meshRef.current.position.x = Math.cos(t) * r;
        meshRef.current.position.z = Math.sin(t) * r;
        break;
      }

      case 'float':
      default:
        meshRef.current.position.y = initialPos.current[1] + Math.sin(t * 1.8) * amp;
        break;
    }
  });

  // Calculate material appearance
  const material = useMemo(() => {
    let color = object.color || '#38bdf8';
    let emissive = object.emissive || '#000000';
    let emissiveIntensity = object.emissiveIntensity || 0.15;

    if (isSelected) {
      color = '#38bdf8';
      emissive = '#0284c7';
      emissiveIntensity = 0.9;
    } else if (isHovered) {
      color = '#67e8f9';
      emissive = '#0891b2';
      emissiveIntensity = 0.5;
    } else if (isStepHighlighted) {
      emissive = '#0284c7';
      emissiveIntensity = 0.7;
    }

    return (
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={object.roughness ?? 0.35}
        metalness={object.metalness ?? 0.25}
        opacity={object.opacity ?? 1}
        transparent={object.opacity !== undefined && object.opacity < 1}
        wireframe={object.wireframe || false}
      />
    );
  }, [object, isSelected, isHovered, isStepHighlighted]);

  const dims = object.dimensions || [];

  return (
    <group
      ref={meshRef}
      position={object.position}
      rotation={object.rotation || [0, 0, 0]}
      scale={object.scale || [1, 1, 1]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={() => onHover(false)}
    >
      {/* Geometry Dispatcher */}
      {object.geometry === 'box' && (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[dims[0] || 1, dims[1] || 1, dims[2] || 1]} />
          {material}
        </mesh>
      )}

      {object.geometry === 'sphere' && (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[dims[0] || 0.6, dims[1] || 24, dims[2] || 24]} />
          {material}
        </mesh>
      )}

      {object.geometry === 'cylinder' && (
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[dims[0] || 0.4, dims[1] || 0.4, dims[2] || 1.2, (dims[3] as number) || 24]} />
          {material}
        </mesh>
      )}

      {object.geometry === 'cone' && (
        <mesh castShadow receiveShadow>
          <coneGeometry args={[dims[0] || 0.5, dims[1] || 1.2, (dims[2] as number) || 24]} />
          {material}
        </mesh>
      )}

      {object.geometry === 'torus' && (
        <mesh castShadow receiveShadow>
          <torusGeometry args={[dims[0] || 0.6, dims[1] || 0.15, dims[2] || 16, dims[3] || 32]} />
          {material}
        </mesh>
      )}

      {object.geometry === 'capsule' && (
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[dims[0] || 0.35, dims[1] || 0.8, dims[2] || 16, dims[3] || 24]} />
          {material}
        </mesh>
      )}

      {object.geometry === 'ring' && (
        <mesh castShadow receiveShadow>
          <ringGeometry args={[dims[0] || 0.5, dims[1] || 0.8, dims[2] || 32]} />
          {material}
        </mesh>
      )}

      {object.geometry === 'plane' && (
        <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[dims[0] || 1.5, dims[1] || 1.5]} />
          {material}
        </mesh>
      )}

      {object.geometry === 'arrow' && (
        <group>
          {/* Stem */}
          <mesh position={[0, (dims[1] || 0.8) / 2, 0]}>
            <cylinderGeometry args={[(dims[0] || 0.08) / 2, (dims[0] || 0.08) / 2, dims[1] || 0.8, 16]} />
            {material}
          </mesh>
          {/* Cone Tip */}
          <mesh position={[0, dims[1] || 0.8, 0]}>
            <coneGeometry args={[(dims[0] || 0.08) * 1.8, (dims[1] || 0.8) * 0.35, 16]} />
            {material}
          </mesh>
        </group>
      )}

      {object.geometry === 'gear' && (
        <group>
          {/* Core Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[dims[0] || 0.6, dims[0] || 0.6, dims[1] || 0.2, 24]} />
            {material}
          </mesh>
          {/* Central Axle Bore */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[(dims[0] || 0.6) * 0.25, (dims[0] || 0.6) * 0.25, (dims[1] || 0.2) * 1.1, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
          {/* Radial Gear Teeth */}
          {Array.from({ length: (dims[2] as number) || 8 }).map((_, toothIdx) => {
            const count = (dims[2] as number) || 8;
            const angle = (toothIdx / count) * Math.PI * 2;
            const r = dims[0] || 0.6;
            return (
              <mesh
                key={toothIdx}
                position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry args={[0.18, 0.14, dims[1] || 0.2]} />
                {material}
              </mesh>
            );
          })}
        </group>
      )}

      {/* Floating 3D Text Label */}
      {showLabel && object.label && (
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.15}>
          <group position={[0, (dims[1] || 0.8) * 0.8 + 0.45, 0]}>
            <Text
              fontSize={0.16}
              color={isSelected ? '#38bdf8' : isHovered ? '#67e8f9' : '#e2e8f0'}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#0f172a"
            >
              {object.label}
            </Text>
          </group>
        </Float>
      )}
    </group>
  );
};

// ============================================================================
// 3D CONNECTION RENDERER (TUBES, ARROWS, PARTICLE FLOWS)
// ============================================================================
interface ConnectionRendererProps {
  connection: SceneConnection3D;
  fromPos: [number, number, number];
  toPos: [number, number, number];
  isPlaying: boolean;
  playbackSpeed: number;
}

const SceneConnectionRenderer: React.FC<ConnectionRendererProps> = ({
  connection,
  fromPos,
  toPos,
  isPlaying,
  playbackSpeed,
}) => {
  const particleRef = useRef<THREE.Mesh>(null);

  // Animate flowing particle along connection
  useFrame(({ clock }) => {
    if (!isPlaying || !particleRef.current || !connection.animatedFlow) return;
    const t = (clock.getElapsedTime() * playbackSpeed * 0.8) % 1; // 0 to 1 loop

    particleRef.current.position.x = THREE.MathUtils.lerp(fromPos[0], toPos[0], t);
    particleRef.current.position.y = THREE.MathUtils.lerp(fromPos[1], toPos[1], t);
    particleRef.current.position.z = THREE.MathUtils.lerp(fromPos[2], toPos[2], t);
  });

  const points = useMemo(() => {
    return [new THREE.Vector3(...fromPos), new THREE.Vector3(...toPos)];
  }, [fromPos, toPos]);

  return (
    <group>
      {/* Visual Connector Line */}
      <Line
        points={points}
        color={connection.color || '#38bdf8'}
        lineWidth={2}
        dashed={connection.type === 'dashed_line'}
        dashSize={0.2}
        gapSize={0.1}
      />

      {/* Animated Flow Particle */}
      {connection.animatedFlow && (
        <mesh ref={particleRef} position={fromPos}>
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshStandardMaterial
            color={connection.color || '#38bdf8'}
            emissive={connection.color || '#38bdf8'}
            emissiveIntensity={1.2}
          />
        </mesh>
      )}

      {/* Connection Label in 3D Space */}
      {connection.label && (
        <group
          position={[
            (fromPos[0] + toPos[0]) / 2,
            (fromPos[1] + toPos[1]) / 2 + 0.2,
            (fromPos[2] + toPos[2]) / 2,
          ]}
        >
          <Text
            fontSize={0.12}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#090d16"
          >
            {connection.label}
          </Text>
        </group>
      )}
    </group>
  );
};

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Cylinder, Torus, Ring, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  playbackSpeed?: number;
  isPlaying?: boolean;
  isSpeaking?: boolean;
  isThinking?: boolean;
  speechText?: string;
}

export const AgentVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
  playbackSpeed = 1,
  isPlaying = true,
  isSpeaking = false,
  isThinking = false,
  speechText,
}) => {
  const headRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const mouthWaveRef = useRef<THREE.Group>(null);
  const visorGlowRef = useRef<THREE.MeshStandardMaterial>(null);
  const soundWaveRef = useRef<THREE.Group>(null);

  const { mouse } = useThree();

  // Color tokens
  const primaryCyan = '#06b6d4';
  const violetAccent = '#8b5cf6';
  const thinkingAmber = '#f59e0b';
  const speakingEmerald = '#10b981';

  const activeColor = useMemo(() => {
    if (isThinking) return thinkingAmber;
    if (isSpeaking) return speakingEmerald;
    return primaryCyan;
  }, [isThinking, isSpeaking]);

  useFrame((state, delta) => {
    if (!isPlaying) return;

    const time = state.clock.getElapsedTime() * playbackSpeed;

    // Head subtle tracking of mouse cursor
    if (headRef.current) {
      const targetRotY = mouse.x * 0.45;
      const targetRotX = -mouse.y * 0.25;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.05);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.05);
    }

    // Floating core pulsation
    if (coreRef.current) {
      const pulseSpeed = isThinking ? 8 : isSpeaking ? 6 : 2.5;
      const pulseScale = 1 + Math.sin(time * pulseSpeed) * (isSpeaking ? 0.12 : 0.06);
      coreRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }

    // Outer and middle gyro rings rotate
    if (outerRingRef.current) {
      const speedMultiplier = isThinking ? 3.0 : 1.0;
      outerRingRef.current.rotation.x += delta * 0.7 * speedMultiplier;
      outerRingRef.current.rotation.y += delta * 0.5 * speedMultiplier;
    }
    if (middleRingRef.current) {
      const speedMultiplier = isThinking ? 3.2 : 1.0;
      middleRingRef.current.rotation.y -= delta * 0.8 * speedMultiplier;
      middleRingRef.current.rotation.z += delta * 0.6 * speedMultiplier;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 1.1;
      innerRingRef.current.rotation.z -= delta * 0.9;
    }

    // Mouth audio wave reaction
    if (mouthWaveRef.current) {
      const children = mouthWaveRef.current.children as THREE.Mesh[];
      children.forEach((bar, idx) => {
        if (isSpeaking) {
          const height = 0.05 + Math.abs(Math.sin(time * 12 + idx * 0.8)) * 0.22;
          bar.scale.y = height;
        } else if (isThinking) {
          const height = 0.05 + Math.abs(Math.sin(time * 6 + idx * 0.4)) * 0.08;
          bar.scale.y = height;
        } else {
          bar.scale.y = 0.04;
        }
      });
    }

    // Halo soundwave rings expand when speaking
    if (soundWaveRef.current) {
      if (isSpeaking) {
        soundWaveRef.current.scale.setScalar(1 + Math.sin(time * 8) * 0.15);
      } else {
        soundWaveRef.current.scale.setScalar(1);
      }
    }
  });

  const handleSelect = (id: string, e: any) => {
    e.stopPropagation();
    onSelectComponent?.(id);
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Background cyber starfield */}
      <Sparkles
        count={80}
        scale={[12, 10, 10]}
        size={2.5}
        speed={0.4}
        color={activeColor}
      />

      {/* Ambient and directional lights tailored for cyber materials */}
      <ambientLight intensity={0.7} />
      <pointLight position={[6, 6, 6]} intensity={1.8} color={primaryCyan} />
      <pointLight position={[-6, -4, -4]} intensity={1.5} color={violetAccent} />
      <pointLight position={[0, 3, 2]} intensity={isSpeaking ? 2.5 : 1.0} color={activeColor} />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={headRef}>
          {/* 3D Holographic Status Badge / Speech Bubble */}
          <Html position={[0, 2.3, 0]} center distanceFactor={7}>
            <div className="pointer-events-none select-none flex flex-col items-center">
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-xl transition-all duration-300 ${
                  isSpeaking
                    ? 'bg-emerald-950/85 border-emerald-400 text-emerald-300 shadow-emerald-500/20'
                    : isThinking
                    ? 'bg-amber-950/85 border-amber-400 text-amber-300 shadow-amber-500/20'
                    : 'bg-navy-900/85 border-brand-cyan/40 text-cyan-300 shadow-cyan-500/20'
                }`}
              >
                <span className="flex h-2 w-2 relative">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isSpeaking ? 'bg-emerald-400' : isThinking ? 'bg-amber-400' : 'bg-brand-cyan'
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isSpeaking ? 'bg-emerald-400' : isThinking ? 'bg-amber-400' : 'bg-brand-cyan'
                    }`}
                  ></span>
                </span>
                <span>
                  {isSpeaking ? 'Speaking to You...' : isThinking ? 'Agent is Thinking...' : '3D AI Agent Ready'}
                </span>
              </div>
            </div>
          </Html>

          {/* HEAD CHASSIS */}
          <Sphere
            args={[0.85, 32, 32]}
            position={[0, 0.4, 0]}
            onClick={(e) => handleSelect('agent-head', e)}
          >
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.85}
              roughness={0.2}
              wireframe={selectedComponentId === 'agent-head'}
            />
          </Sphere>

          {/* GLOWING CURVED VISOR */}
          <group position={[0, 0.48, 0.42]}>
            <Cylinder
              args={[0.72, 0.72, 0.35, 32, 1, false, -Math.PI / 3, (2 * Math.PI) / 3]}
              rotation={[0, 0, 0]}
              onClick={(e) => handleSelect('quantum-visor', e)}
            >
              <meshStandardMaterial
                ref={visorGlowRef}
                color={activeColor}
                emissive={activeColor}
                emissiveIntensity={isThinking ? 1.8 : isSpeaking ? 1.4 : 0.8}
                roughness={0.1}
                metalness={0.9}
                transparent
                opacity={0.88}
              />
            </Cylinder>

            {/* Visor Cyber Eyes (Dual glowing pupils) */}
            <Sphere position={[-0.24, 0.02, 0.42]} args={[0.07, 16, 16]}>
              <meshBasicMaterial color="#ffffff" />
            </Sphere>
            <Sphere position={[0.24, 0.02, 0.42]} args={[0.07, 16, 16]}>
              <meshBasicMaterial color="#ffffff" />
            </Sphere>
          </group>

          {/* AUDIO SYNTHESIZER / MOUTH WAVE BARS */}
          <group
            ref={mouthWaveRef}
            position={[0, 0.16, 0.78]}
            onClick={(e) => handleSelect('voice-synthesizer', e)}
          >
            {[-0.2, -0.12, -0.04, 0.04, 0.12, 0.2].map((x, i) => (
              <mesh key={i} position={[x, 0, 0]}>
                <boxGeometry args={[0.035, 1, 0.02]} />
                <meshStandardMaterial
                  color={activeColor}
                  emissive={activeColor}
                  emissiveIntensity={isSpeaking ? 2.0 : 0.5}
                />
              </mesh>
            ))}
          </group>

          {/* CYBER EARS / COMM BEACONS */}
          <group position={[-0.92, 0.4, 0]} onClick={(e) => handleSelect('audio-sensors', e)}>
            <Cylinder args={[0.18, 0.18, 0.12, 16]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
            </Cylinder>
            <Ring args={[0.08, 0.14, 16]} position={[-0.07, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <meshBasicMaterial color={activeColor} side={THREE.DoubleSide} />
            </Ring>
          </group>

          <group position={[0.92, 0.4, 0]} onClick={(e) => handleSelect('audio-sensors', e)}>
            <Cylinder args={[0.18, 0.18, 0.12, 16]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
            </Cylinder>
            <Ring args={[0.08, 0.14, 16]} position={[0.07, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <meshBasicMaterial color={activeColor} side={THREE.DoubleSide} />
            </Ring>
          </group>

          {/* LOWER TORSO / CHASSIS */}
          <group position={[0, -0.75, 0]} onClick={(e) => handleSelect('cyber-chassis', e)}>
            <Cylinder args={[0.45, 0.2, 0.65, 32]}>
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
            </Cylinder>
            {/* Chest Plate trim */}
            <Cylinder args={[0.47, 0.22, 0.1, 32]} position={[0, 0.15, 0]}>
              <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
            </Cylinder>
          </group>

          {/* FLOATING NEURAL QUANTUM CORE */}
          <group position={[0, -0.65, 0.28]} onClick={(e) => handleSelect('neural-core', e)}>
            <Sphere ref={coreRef} args={[0.18, 32, 32]}>
              <meshStandardMaterial
                color={activeColor}
                emissive={activeColor}
                emissiveIntensity={isThinking ? 3.0 : isSpeaking ? 2.2 : 1.2}
                roughness={0.1}
                metalness={0.5}
              />
            </Sphere>
            {/* Core outer protective glass ring */}
            <Torus args={[0.26, 0.025, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial color="#ffffff" wireframe />
            </Torus>
          </group>

          {/* CONCENTRIC GYRO ORBIT RINGS */}
          <group onClick={(e) => handleSelect('gyro-rings', e)}>
            <Torus
              ref={outerRingRef}
              args={[1.45, 0.025, 16, 64]}
              rotation={[Math.PI / 4, 0, 0]}
            >
              <meshStandardMaterial
                color={primaryCyan}
                emissive={primaryCyan}
                emissiveIntensity={0.6}
              />
            </Torus>

            <Torus
              ref={middleRingRef}
              args={[1.7, 0.02, 16, 64]}
              rotation={[-Math.PI / 4, Math.PI / 3, 0]}
            >
              <meshStandardMaterial
                color={violetAccent}
                emissive={violetAccent}
                emissiveIntensity={0.7}
              />
            </Torus>

            <Torus
              ref={innerRingRef}
              args={[1.95, 0.015, 16, 64]}
              rotation={[Math.PI / 6, -Math.PI / 4, 0]}
            >
              <meshStandardMaterial
                color={activeColor}
                emissive={activeColor}
                emissiveIntensity={0.8}
              />
            </Torus>
          </group>

          {/* EXPANDING SOUNDWAVE HALO (when speaking) */}
          <group ref={soundWaveRef} position={[0, 0.4, 0]}>
            <Torus args={[1.15, 0.012, 16, 48]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial
                color={speakingEmerald}
                transparent
                opacity={isSpeaking ? 0.75 : 0.0}
              />
            </Torus>
            <Torus args={[1.3, 0.012, 16, 48]} rotation={[Math.PI / 2, 0, 0]}>
              <meshBasicMaterial
                color={speakingEmerald}
                transparent
                opacity={isSpeaking ? 0.45 : 0.0}
              />
            </Torus>
          </group>
        </group>
      </Float>
    </group>
  );
};

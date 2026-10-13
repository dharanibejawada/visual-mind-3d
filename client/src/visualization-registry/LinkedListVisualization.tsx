import React from 'react';
import { Float, Text } from '@react-three/drei';

interface Props {
  selectedComponentId?: string;
  onSelectComponent?: (id: string) => void;
  playbackSpeed?: number;
  isPlaying?: boolean;
}

const NODES = [
  { id: 'node-head', value: '14', address: '0x10A' },
  { id: 'node-1', value: '32', address: '0x14C' },
  { id: 'node-2', value: '58', address: '0x19F' },
  { id: 'node-3', value: '91', address: '0x22B' },
];

export const LinkedListVisualization: React.FC<Props> = ({
  selectedComponentId,
  onSelectComponent,
}) => {
  return (
    <group position={[-3, 0, 0]}>
      {/* Head Label */}
      <Text position={[-0.8, 1.2, 0]} fontSize={0.24} color="#38bdf8">
        HEAD ➔
      </Text>

      {NODES.map((node, index) => {
        const x = index * 2.1;
        const isSelected = selectedComponentId === node.id;

        return (
          <group key={node.id} position={[x, 0, 0]}>
            {/* Node Box Container */}
            <group onClick={(e) => { e.stopPropagation(); onSelectComponent?.(node.id); }}>
              {/* Data Field (Left half of node) */}
              <mesh position={[-0.3, 0, 0]}>
                <boxGeometry args={[0.6, 0.9, 0.4]} />
                <meshStandardMaterial
                  color={isSelected ? '#38bdf8' : '#334155'}
                  metalness={0.2}
                  roughness={0.3}
                />
              </mesh>
              <Text position={[-0.3, 0, 0.25]} fontSize={0.24} color="#ffffff">
                {node.value}
              </Text>

              {/* Next Pointer Field (Right half of node) */}
              <mesh position={[0.3, 0, 0]}>
                <boxGeometry args={[0.5, 0.9, 0.4]} />
                <meshStandardMaterial
                  color={isSelected ? '#0284c7' : '#1e293b'}
                  metalness={0.4}
                />
              </mesh>
              <Text position={[0.3, 0, 0.25]} fontSize={0.16} color="#06b6d4">
                • next
              </Text>

              {/* Memory Address Tag */}
              <Text position={[0, -0.65, 0]} fontSize={0.15} color="#94a3b8">
                {node.address}
              </Text>
            </group>

            {/* Pointer Arrow linking to next node or NULL */}
            {index < NODES.length - 1 ? (
              <group position={[0.55, 0, 0]}>
                {/* Arrow shaft */}
                <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.8, 12]} />
                  <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.6} />
                </mesh>
                {/* Arrow tip */}
                <mesh position={[0.9, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                  <coneGeometry args={[0.1, 0.2, 12]} />
                  <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.6} />
                </mesh>
              </group>
            ) : (
              /* NULL Terminator */
              <group position={[0.9, 0, 0]}>
                <Text position={[0.4, 0, 0]} fontSize={0.22} color="#ef4444">
                  ➔ NULL
                </Text>
              </group>
            )}
          </group>
        );
      })}

      <Float speed={1} floatIntensity={0.1}>
        <Text position={[3, 1.8, 0]} fontSize={0.22} color="#e2e8f0">
          Singly Linked List: [Value | Next Pointer]
        </Text>
      </Float>
    </group>
  );
};

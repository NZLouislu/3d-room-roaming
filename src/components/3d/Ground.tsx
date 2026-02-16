import { ContactShadows } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useStore } from '../../hooks/useStore';

export const Ground = (props: JSX.IntrinsicElements['group']) => {
  const performanceTier = useStore((state) => state.performanceTier);
  const isMobile = useStore((state) => state.isMobile);

  return (
    <group {...props}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -5, 0]} receiveShadow={performanceTier !== 'low'}>
          <boxGeometry args={[500, 1, 500]} />
          {performanceTier === 'low' ? (
            <meshBasicMaterial
              color="#1a1a1a" // Professional Dark Neutral
              polygonOffset
              polygonOffsetFactor={1}
              polygonOffsetUnits={1}
            />
          ) : (
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.9}
              metalness={0.1}
              polygonOffset
              polygonOffsetFactor={1}
              polygonOffsetUnits={1}
            />
          )}
        </mesh>
      </RigidBody>
      {!isMobile && performanceTier === 'high' && (
        <ContactShadows
          opacity={0.4}
          scale={100}
          blur={2}
          far={10}
          resolution={1024}
          color="#000000"
          position={[0, -0.5, 0]}
        />
      )}
    </group>
  );
};

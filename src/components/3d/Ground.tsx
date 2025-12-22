import { ContactShadows } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useStore } from '../../hooks/useStore';

export const Ground = (props: JSX.IntrinsicElements['group']) => {
  const performanceTier = useStore((state) => state.performanceTier);
  const isMobile = useStore((state) => state.isMobile);

  return (
    <group {...props}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -0.5, 0]} receiveShadow={performanceTier !== 'low'}>
          <boxGeometry args={[150, 1, 150]} />
          {performanceTier === 'low' ? (
             <meshBasicMaterial color="#5d9e58" />
          ) : (
             <meshStandardMaterial color="#5d9e58" roughness={0.8} metalness={0.2} />
          )}
        </mesh>
      </RigidBody>
      {!isMobile && performanceTier === 'high' && (
        <ContactShadows
          opacity={0.4}
          scale={80}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
          position={[0, -0.49, 0]}
        />
      )}
    </group>
  );
};

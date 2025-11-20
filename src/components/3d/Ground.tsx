import { ContactShadows } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export const Ground = () => {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#5d9e58" roughness={0.8} metalness={0.2} />
        </mesh>
      </RigidBody>
      <ContactShadows
        opacity={0.4}
        scale={50}
        blur={1}
        far={10}
        resolution={256}
        color="#000000"
        position={[0, -0.49, 0]}
      />
    </group>
  );
};

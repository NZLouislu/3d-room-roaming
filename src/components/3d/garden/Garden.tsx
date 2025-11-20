import { Trees } from './Trees';
import { Fence } from './Fence';

export const Garden = () => {
  return (
    <group>
      <Trees count={30} />
      <Fence />
      <mesh position={[0, 0.01, 5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 8]} />
        <meshStandardMaterial color="#8B7355" roughness={0.9} />
      </mesh>
    </group>
  );
};

import { RigidBody } from '@react-three/rapier';

export const Room = () => {
  return (
    <>
      {/* Floor - Visual only, no collision (Ground component handles collision) */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial color="#e5e5e5" />
      </mesh>

      {/* Walls - With collision */}
      <RigidBody type="fixed" colliders="cuboid">
        {/* Wall 1 (Back) */}
        <mesh position={[0, 2.5, -10]} receiveShadow>
          <boxGeometry args={[20, 5, 1]} />
          <meshStandardMaterial color="#white" />
        </mesh>

        {/* Wall 2 (Front) - Split into two parts with doorway in center */}
        {/* Left part of front wall */}
        <mesh position={[-7, 2.5, 10]} receiveShadow>
          <boxGeometry args={[6, 5, 1]} />
          <meshStandardMaterial color="#white" />
        </mesh>
        
        {/* Right part of front wall */}
        <mesh position={[7, 2.5, 10]} receiveShadow>
          <boxGeometry args={[6, 5, 1]} />
          <meshStandardMaterial color="#white" />
        </mesh>
        
        {/* Top part of doorway (lintel) */}
        <mesh position={[0, 4.5, 10]} receiveShadow>
          <boxGeometry args={[8, 1, 1]} />
          <meshStandardMaterial color="#white" />
        </mesh>

        {/* Wall 3 (Left) */}
        <mesh position={[-10, 2.5, 0]} receiveShadow>
          <boxGeometry args={[1, 5, 20]} />
          <meshStandardMaterial color="#white" />
        </mesh>

        {/* Wall 4 (Right) */}
        <mesh position={[10, 2.5, 0]} receiveShadow>
          <boxGeometry args={[1, 5, 20]} />
          <meshStandardMaterial color="#white" />
        </mesh>
      </RigidBody>
    </>
  );
};

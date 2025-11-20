import { RigidBody } from '@react-three/rapier';

interface FurnitureItemProps {
  id: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  name: string;
  onInteract?: () => void;
}

export const FurnitureItem = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  color = '#888888',
  onInteract
}: FurnitureItemProps) => {
  return (
    <RigidBody type="fixed" colliders="cuboid" position={position}>
      <mesh
        rotation={rotation}
        scale={scale}
        onClick={onInteract}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  );
};

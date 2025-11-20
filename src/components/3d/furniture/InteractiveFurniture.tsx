import { useState } from 'react';
import { Text } from '@react-three/drei';

interface InteractiveFurnitureProps {
  id: string;
  position: [number, number, number];
  name: string;
  children: React.ReactNode;
  onInteract: () => void;
}

export const InteractiveFurniture = ({
  children,
  name,
  onInteract
}: InteractiveFurnitureProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onInteract}
    >
      {children}
      {hovered && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {name}
        </Text>
      )}
    </group>
  );
};

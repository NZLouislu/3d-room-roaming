import { useState } from 'react';
import { useStore } from '../../hooks/useStore';

interface FurnitureProps {
  position: [number, number, number];
  name: string;
  price: string;
  description: string;
  color?: string;
  onClick?: () => void;
}

export const Furniture = ({ position, name, price, description, color = 'orange', onClick }: FurnitureProps) => {
  const [hovered, setHover] = useState(false);
  const setSelectedObject = useStore((state) => state.setSelectedObject);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      setSelectedObject({ name, price, description });
    }
  };

  return (
    <mesh
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHover(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={handleClick}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
    </mesh>
  );
};
